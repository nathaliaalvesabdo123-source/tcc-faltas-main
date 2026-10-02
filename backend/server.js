const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ===== CONEXÃO COM O BANCO =====
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'classflow_db'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Erro ao conectar no MySQL:', err);
        return;
    }
    console.log('✅ Conectado ao MySQL!');
});

// ============================================================
// ===== FUNÇÕES AUXILIARES ===================================
// ============================================================

function criarNotificacao(usuarioId, tipo, titulo, mensagem) {
    const sql = 'INSERT INTO notificacoes (usuario_id, tipo, titulo, mensagem) VALUES (?, ?, ?, ?)';
    db.query(sql, [usuarioId, tipo, titulo, mensagem], (err) => {
        if (err) console.error('Erro ao criar notificação:', err);
    });
}

function verificarAlertas(usuarioId) {
    db.query('SELECT turma, instituicao FROM usuarios WHERE id = ?', [usuarioId], (err, userResult) => {
        if (err || userResult.length === 0) return;

        const { turma, instituicao } = userResult[0];
        let instituicoes = instituicao === 'Sesi/Senai' ? ['Sesi', 'Senai'] : [instituicao];

        db.query(`
            SELECT COUNT(DISTINCT YEARWEEK(data)) as semanas
            FROM dias_letivos
            WHERE data <= CURDATE() AND tipo = 'letivo'
        `, (err, semanaResult) => {
            if (err) return;
            const semanas = semanaResult[0]?.semanas || 1;

            instituicoes.forEach((inst) => {
                db.query(
                    'SELECT id FROM turmas WHERE nome = ? AND instituicao = ? AND ano_letivo = YEAR(CURDATE())',
                    [turma, inst],
                    (err, turmaResult) => {
                        if (err || turmaResult.length === 0) return;
                        const turmaId = turmaResult[0].id;

                        db.query(`
                            SELECT disciplina, COUNT(*) as aulas_por_semana
                            FROM aulas WHERE turma_id = ? GROUP BY disciplina
                        `, [turmaId], (err, gradeResult) => {
                            if (err) return;

                            db.query(`
                                SELECT disciplina, COUNT(*) as total_faltas
                                FROM faltas WHERE usuario_id = ? AND instituicao = ?
                                GROUP BY disciplina
                            `, [usuarioId, inst], (err, faltasResult) => {
                                if (err) return;

                                const faltasMap = {};
                                faltasResult.forEach(f => faltasMap[f.disciplina] = f.total_faltas);

                                gradeResult.forEach(item => {
                                    const totalAulas = item.aulas_por_semana * semanas;
                                    const faltas = faltasMap[item.disciplina] || 0;
                                    const frequencia = totalAulas > 0
                                        ? Math.round(((totalAulas - faltas) / totalAulas) * 100)
                                        : 100;
                                    const percentualFaltas = 100 - frequencia;

                                    if (percentualFaltas >= 25) {
                                        db.query(
                                            `SELECT id FROM notificacoes 
                                             WHERE usuario_id = ? AND tipo = 'reprovacao' 
                                             AND mensagem LIKE ? 
                                             AND data_criacao > DATE_SUB(NOW(), INTERVAL 7 DAY)`,
                                            [usuarioId, `%${item.disciplina}%`],
                                            (err, verif) => {
                                                if (!err && verif.length === 0) {
                                                    criarNotificacao(
                                                        usuarioId,
                                                        'reprovacao',
                                                        '🚨 Reprovado por frequência',
                                                        `Você atingiu ${percentualFaltas}% de faltas em ${item.disciplina} (${inst}). Procure a coordenação.`
                                                    );
                                                }
                                            }
                                        );
                                    }
                                    else if (percentualFaltas >= 20) {
                                        db.query(
                                            `SELECT id FROM notificacoes 
                                             WHERE usuario_id = ? AND tipo = 'alerta' 
                                             AND mensagem LIKE ? 
                                             AND data_criacao > DATE_SUB(NOW(), INTERVAL 7 DAY)`,
                                            [usuarioId, `%${item.disciplina}%`],
                                            (err, verif) => {
                                                if (!err && verif.length === 0) {
                                                    criarNotificacao(
                                                        usuarioId,
                                                        'alerta',
                                                        '⚠️ Atenção à frequência',
                                                        `Você está com ${percentualFaltas}% de faltas em ${item.disciplina} (${inst}). Cuidado!`
                                                    );
                                                }
                                            }
                                        );
                                    }
                                });
                            });
                        });
                    }
                );
            });
        });
    });
}

// ============================================================
// ===== ROTAS ================================================
// ============================================================

app.get('/', (req, res) => {
    res.json({ mensagem: '🚀 API do ClassFlow rodando!' });
});

// ===== CADASTRO =====
app.post('/cadastrar', (req, res) => {
    const { nome, email, senha, instituicao, turma } = req.body;

    if (!nome || !email || !senha || !turma) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    const sql = 'INSERT INTO usuarios (nome, email, senha, instituicao, turma) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nome, email, senha, instituicao, turma], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ erro: 'Este email já está cadastrado' });
            }
            return res.status(500).json({ erro: err.message });
        }
        res.status(201).json({
            id: result.insertId,
            nome,
            email,
            instituicao,
            turma
        });
    });
});

// ===== LOGIN =====
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
    }

    const sql = 'SELECT id, nome, email, instituicao, turma, foto FROM usuarios WHERE email = ? AND senha = ?';
    db.query(sql, [email, senha], (err, results) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        if (results.length === 0) {
            return res.status(401).json({ erro: 'Email ou senha inválidos' });
        }

        verificarAlertas(results[0].id);

        res.json(results[0]);
    });
});

// ===== LISTAR USUÁRIOS =====
app.get('/usuarios', (req, res) => {
    db.query('SELECT id, nome, email, instituicao, turma FROM usuarios', (err, results) => {
        if (err) {
            res.status(500).json({ erro: err.message });
            return;
        }
        res.json(results);
    });
});

// ===== BUSCAR USUÁRIO COMPLETO =====
app.get('/usuario/:usuario_id', (req, res) => {
    const { usuario_id } = req.params;

    const sql = 'SELECT id, nome, email, instituicao, turma, foto FROM usuarios WHERE id = ?';
    db.query(sql, [usuario_id], (err, results) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (results.length === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });
        res.json(results[0]);
    });
});

// ===== SALVAR FOTO =====
app.post('/usuario/foto/:usuario_id', (req, res) => {
    const { usuario_id } = req.params;
    const { foto } = req.body;

    if (!foto) {
        return res.status(400).json({ erro: 'Foto é obrigatória' });
    }

    const sql = 'UPDATE usuarios SET foto = ? WHERE id = ?';
    db.query(sql, [foto, usuario_id], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json({ message: 'Foto salva com sucesso!' });
    });
});

// ===== DISCIPLINAS DA TURMA =====
app.get('/disciplinas/:usuario_id/:instituicao', (req, res) => {
    const { usuario_id, instituicao } = req.params;

    const sqlUsuario = 'SELECT turma FROM usuarios WHERE id = ?';
    db.query(sqlUsuario, [usuario_id], (err, userResult) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (userResult.length === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });

        const turma = userResult[0].turma;

        const sql = `
            SELECT DISTINCT a.disciplina
            FROM aulas a
            JOIN turmas t ON a.turma_id = t.id
            WHERE t.nome = ? AND t.instituicao = ? AND t.ano_letivo = YEAR(CURDATE())
            ORDER BY a.disciplina
        `;

        db.query(sql, [turma, instituicao], (err, results) => {
            if (err) return res.status(500).json({ erro: err.message });
            res.json(results.map(r => r.disciplina));
        });
    });
});

// ===== LANÇAR FALTA =====
app.post('/faltas', (req, res) => {
    const { usuario_id, disciplina, data, horario, justificativa, instituicao } = req.body;

    if (!usuario_id || !disciplina || !data || !instituicao) {
        return res.status(400).json({ erro: 'Usuário, disciplina, data e instituição são obrigatórios' });
    }

    const sql = 'INSERT INTO faltas (usuario_id, disciplina, data, horario, justificativa, instituicao) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [usuario_id, disciplina, data, horario || null, justificativa || null, instituicao], (err, result) => {
        if (err) {
            res.status(500).json({ erro: err.message });
            return;
        }

        criarNotificacao(
            usuario_id,
            'registro',
            '📝 Falta registrada',
            `Sua falta em ${disciplina} (${instituicao}) no dia ${data} foi registrada.`
        );

        verificarAlertas(usuario_id);

        res.status(201).json({
            id: result.insertId,
            message: 'Falta lançada com sucesso!'
        });
    });
});

// ===== LANÇAR FALTA EM DIA TODO =====
app.post('/faltas-dia-todo', (req, res) => {
    const { usuario_id, data, instituicao } = req.body;

    if (!usuario_id || !data || !instituicao) {
        return res.status(400).json({ erro: 'Usuário, data e instituição são obrigatórios' });
    }

    const dataObj = new Date(data + 'T00:00:00');
    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const diaSemana = diasSemana[dataObj.getDay()];

    if (diaSemana === 'Sábado' || diaSemana === 'Domingo') {
        return res.status(400).json({ erro: 'Não há aulas nos fins de semana' });
    }

    db.query('SELECT turma FROM usuarios WHERE id = ?', [usuario_id], (err, userResult) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (userResult.length === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });

        const turma = userResult[0].turma;

        const sqlAulas = `
            SELECT a.disciplina, a.bloco, a.horario_inicio, a.horario_fim
            FROM aulas a
            JOIN turmas t ON a.turma_id = t.id
            WHERE t.nome = ? AND t.instituicao = ? AND t.ano_letivo = YEAR(CURDATE())
                AND a.dia_semana = ?
            ORDER BY a.bloco
        `;

        db.query(sqlAulas, [turma, instituicao, diaSemana], (err, aulasResult) => {
            if (err) return res.status(500).json({ erro: err.message });
            if (aulasResult.length === 0) {
                return res.status(400).json({ erro: `Não há aulas de ${instituicao} nesse dia (${diaSemana})` });
            }

            const faltas = aulasResult.map(aula => [
                usuario_id,
                aula.disciplina,
                data,
                `${aula.horario_inicio} - ${aula.horario_fim}`,
                'Falta em dia todo',
                instituicao
            ]);

            const sqlInsert = 'INSERT INTO faltas (usuario_id, disciplina, data, horario, justificativa, instituicao) VALUES ?';

            db.query(sqlInsert, [faltas], (err, result) => {
                if (err) return res.status(500).json({ erro: err.message });

                criarNotificacao(
                    usuario_id,
                    'registro',
                    '📝 Falta em dia todo registrada',
                    `Sua falta em dia todo (${instituicao}) no dia ${data} foi registrada (${aulasResult.length} aulas).`
                );

                verificarAlertas(usuario_id);

                res.status(201).json({
                    message: `${aulasResult.length} faltas lançadas com sucesso!`,
                    total: aulasResult.length
                });
            });
        });
    });
});

// ===== LISTAR FALTAS DE UM USUÁRIO =====
app.get('/faltas/:usuario_id', (req, res) => {
    const sql = 'SELECT * FROM faltas WHERE usuario_id = ? ORDER BY data DESC';
    db.query(sql, [req.params.usuario_id], (err, results) => {
        if (err) {
            res.status(500).json({ erro: err.message });
            return;
        }
        res.json(results);
    });
});

// ===== HORÁRIO DO USUÁRIO =====
app.get('/horario/:usuario_id', (req, res) => {
    const usuarioId = req.params.usuario_id;

    const sqlUsuario = 'SELECT turma, instituicao FROM usuarios WHERE id = ?';
    db.query(sqlUsuario, [usuarioId], (err, userResult) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (userResult.length === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });

        const { turma, instituicao } = userResult[0];

        let instituicoes = instituicao === 'Sesi/Senai' ? ['Sesi', 'Senai'] : [instituicao];
        const placeholders = instituicoes.map(() => '?').join(',');

        const sql = `
            SELECT a.*, t.instituicao as turma_instituicao
            FROM aulas a
            JOIN turmas t ON a.turma_id = t.id
            WHERE t.nome = ? AND t.instituicao IN (${placeholders}) AND t.ano_letivo = YEAR(CURDATE())
            ORDER BY FIELD(a.dia_semana, 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'), a.bloco
        `;

        db.query(sql, [turma, ...instituicoes], (err, results) => {
            if (err) return res.status(500).json({ erro: err.message });
            res.json(results);
        });
    });
});

// ===== FREQUÊNCIA COMPLETA =====
app.get('/frequencia-completa/:usuario_id', (req, res) => {
    const usuarioId = req.params.usuario_id;

    const sqlUsuario = 'SELECT turma, instituicao FROM usuarios WHERE id = ?';
    db.query(sqlUsuario, [usuarioId], (err, userResult) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (userResult.length === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });

        const turma = userResult[0].turma;
        const instituicao = userResult[0].instituicao;

        let instituicoes = [];
        if (instituicao === 'Sesi/Senai') {
            instituicoes = ['Sesi', 'Senai'];
        } else {
            instituicoes = [instituicao];
        }

        const sqlSemanas = `
            SELECT COUNT(DISTINCT YEARWEEK(data)) as semanas
            FROM dias_letivos
            WHERE data <= CURDATE() AND tipo = 'letivo'
        `;
        db.query(sqlSemanas, (err, semanaResult) => {
            if (err) return res.status(500).json({ erro: err.message });
            const semanas = semanaResult[0]?.semanas || 1;

            let instituicoesResultado = [];
            let processados = 0;

            instituicoes.forEach((inst) => {
                const sqlTurma = 'SELECT id FROM turmas WHERE nome = ? AND instituicao = ? AND ano_letivo = YEAR(CURDATE())';
                db.query(sqlTurma, [turma, inst], (err, turmaResult) => {
                    if (err || turmaResult.length === 0) {
                        instituicoesResultado.push({
                            instituicao: inst,
                            total_aulas: 0,
                            total_faltas: 0,
                            presencas: 0,
                            frequencia: 0,
                            situacao: 'Sem turma cadastrada',
                            materias: []
                        });
                        processados++;
                        if (processados === instituicoes.length) finalizar();
                        return;
                    }

                    const turmaId = turmaResult[0].id;

                    const sqlGrade = `
                        SELECT disciplina, COUNT(*) as aulas_por_semana
                        FROM aulas
                        WHERE turma_id = ?
                        GROUP BY disciplina
                    `;
                    db.query(sqlGrade, [turmaId], (err, gradeResult) => {
                        if (err) {
                            processados++;
                            if (processados === instituicoes.length) finalizar();
                            return;
                        }

                        const sqlFaltas = `
                            SELECT disciplina, COUNT(*) as total_faltas
                            FROM faltas
                            WHERE usuario_id = ? AND instituicao = ?
                            GROUP BY disciplina
                        `;
                        db.query(sqlFaltas, [usuarioId, inst], (err, faltasResult) => {
                            if (err) {
                                processados++;
                                if (processados === instituicoes.length) finalizar();
                                return;
                            }

                            const faltasMap = {};
                            faltasResult.forEach(f => faltasMap[f.disciplina] = f.total_faltas);

                            let totalAulas = 0;
                            let totalFaltas = 0;
                            const materias = [];

                            gradeResult.forEach(item => {
                                const aulas = item.aulas_por_semana * semanas;
                                const faltas = faltasMap[item.disciplina] || 0;
                                const presencas = aulas - faltas;
                                const frequencia = aulas > 0 ? Math.round((presencas / aulas) * 100) : 0;

                                totalAulas += aulas;
                                totalFaltas += faltas;

                                materias.push({
                                    disciplina: item.disciplina,
                                    aulas_por_semana: item.aulas_por_semana,
                                    total_aulas: aulas,
                                    faltas: faltas,
                                    presencas: presencas,
                                    frequencia: frequencia,
                                    situacao: frequencia >= 75 ? 'Aprovado' : 'Reprovado por frequência'
                                });
                            });

                            const presencas = totalAulas - totalFaltas;
                            const frequencia = totalAulas > 0 ? Math.round((presencas / totalAulas) * 100) : 0;

                            instituicoesResultado.push({
                                instituicao: inst,
                                total_aulas: totalAulas,
                                total_faltas: totalFaltas,
                                presencas: presencas,
                                frequencia: frequencia,
                                situacao: frequencia >= 75 ? 'Aprovado' : 'Reprovado por frequência',
                                materias: materias
                            });

                            processados++;
                            if (processados === instituicoes.length) finalizar();
                        });
                    });
                });
            });

            function finalizar() {
                res.json({ instituicoes: instituicoesResultado });
            }
        });
    });
});

// ===== ESTATÍSTICAS POR DIAS =====
app.get('/estatisticas/:usuario_id', (req, res) => {
    const { usuario_id } = req.params;

    const sqlDiasLetivos = `
        SELECT COUNT(*) as total_dias
        FROM dias_letivos
        WHERE data <= CURDATE() AND tipo = 'letivo'
    `;

    db.query(sqlDiasLetivos, (err, diasResult) => {
        if (err) return res.status(500).json({ erro: err.message });

        const totalDiasLetivos = diasResult[0]?.total_dias || 0;

        const sqlDiasComFalta = `
            SELECT COUNT(DISTINCT data) as dias_com_falta
            FROM faltas
            WHERE usuario_id = ?
        `;

        db.query(sqlDiasComFalta, [usuario_id], (err, faltasResult) => {
            if (err) return res.status(500).json({ erro: err.message });

            const diasComFalta = faltasResult[0]?.dias_com_falta || 0;
            const diasPresentes = totalDiasLetivos - diasComFalta;

            res.json({
                totalDiasLetivos,
                diasComFalta,
                diasPresentes,
                frequencia: totalDiasLetivos > 0
                    ? Math.round((diasPresentes / totalDiasLetivos) * 100)
                    : 0
            });
        });
    });
});

// ===== FREQUÊNCIA MENSAL (CÁLCULO REAL) =====
app.get('/frequencia-mensal/:usuario_id', (req, res) => {
    const usuarioId = req.params.usuario_id;

    // Buscar últimas 4 meses
    const meses = [];
    const mesesNomes = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    for (let i = 3; i >= 0; i--) {
        const data = new Date();
        data.setMonth(data.getMonth() - i);
        const ano = data.getFullYear();
        const mes = data.getMonth() + 1;
        meses.push({
            ano,
            mes,
            mesAno: `${ano}-${String(mes).padStart(2, '0')}`,
            mesNome: mesesNomes[data.getMonth()]
        });
    }

    let resultados = [];
    let processados = 0;

    meses.forEach((m) => {
        // 1. Contar dias letivos do mês
        const sqlDiasLetivos = `
            SELECT COUNT(*) as total_dias
            FROM dias_letivos
            WHERE YEAR(data) = ? AND MONTH(data) = ? AND tipo = 'letivo'
        `;

        db.query(sqlDiasLetivos, [m.ano, m.mes], (err, diasResult) => {
            if (err) {
                processados++;
                if (processados === meses.length) finalizar();
                return;
            }

            const totalDiasLetivos = diasResult[0]?.total_dias || 0;

            // 2. Contar dias com falta do mês
            const sqlFaltasMes = `
                SELECT COUNT(DISTINCT data) as dias_com_falta
                FROM faltas
                WHERE usuario_id = ?
                    AND YEAR(data) = ?
                    AND MONTH(data) = ?
            `;

            db.query(sqlFaltasMes, [usuarioId, m.ano, m.mes], (err, faltasResult) => {
                if (err) {
                    processados++;
                    if (processados === meses.length) finalizar();
                    return;
                }

                const diasComFalta = faltasResult[0]?.dias_com_falta || 0;
                const diasPresentes = totalDiasLetivos - diasComFalta;
                const frequencia = totalDiasLetivos > 0
                    ? Math.round((diasPresentes / totalDiasLetivos) * 100)
                    : 100;

                resultados.push({
                    mes: m.mesNome,
                    mesAno: m.mesAno,
                    frequencia,
                    faltas: diasComFalta,
                    totalAulas: totalDiasLetivos
                });

                processados++;
                if (processados === meses.length) finalizar();
            });
        });
    });

    function finalizar() {
        res.json(resultados);
    }
});
// ===== CALENDÁRIO DO MÊS (COM FERIADOS POR ESCRITO) =====
app.get('/calendario/:usuario_id/:ano/:mes', (req, res) => {
    const { usuario_id, ano, mes } = req.params;

    const hoje = new Date();
    const diaHoje = hoje.getDate();
    const mesHoje = hoje.getMonth() + 1;
    const anoHoje = hoje.getFullYear();

    const sqlFaltas = `
        SELECT DAY(data) as dia, disciplina
        FROM faltas
        WHERE usuario_id = ? AND YEAR(data) = ? AND MONTH(data) = ?
    `;
    db.query(sqlFaltas, [usuario_id, ano, mes], (err, faltasResult) => {
        if (err) return res.status(500).json({ erro: err.message });

        const sqlDiasLetivos = `
            SELECT 
                DAY(data) as dia, 
                tipo,
                CASE
                    WHEN data = '2026-02-16' THEN 'Carnaval'
                    WHEN data = '2026-02-17' THEN 'Carnaval'
                    WHEN data = '2026-04-03' THEN 'Sexta-feira Santa'
                    WHEN data = '2026-04-21' THEN 'Tiradentes'
                    WHEN data = '2026-05-01' THEN 'Dia do Trabalhador'
                    WHEN data = '2026-06-04' THEN 'Corpus Christi'
                    WHEN data = '2026-09-07' THEN 'Independência do Brasil'
                    WHEN data = '2026-10-12' THEN 'Nossa Senhora Aparecida'
                    WHEN data = '2026-10-28' THEN 'Dia do Servidor Público'
                    WHEN data = '2026-11-02' THEN 'Finados'
                    WHEN data = '2026-11-15' THEN 'Proclamação da República'
                    WHEN data = '2026-11-20' THEN 'Consciência Negra'
                    WHEN data = '2026-12-25' THEN 'Natal'
                    WHEN tipo = 'recesso' THEN 'Recesso Escolar'
                    ELSE NULL
                END as nome
            FROM dias_letivos
            WHERE YEAR(data) = ? AND MONTH(data) = ?
        `;
        db.query(sqlDiasLetivos, [ano, mes], (err, diasResult) => {
            if (err) return res.status(500).json({ erro: err.message });

            const dias = {};
            const feriados = [];

            diasResult.forEach(d => {
                const ehFuturo =
                    parseInt(ano) > anoHoje ||
                    (parseInt(ano) === anoHoje && parseInt(mes) > mesHoje) ||
                    (parseInt(ano) === anoHoje && parseInt(mes) === mesHoje && d.dia > diaHoje);

                if (!ehFuturo) {
                    if (d.tipo === 'letivo') {
                        dias[d.dia] = 'presente';
                    } else if (d.tipo === 'feriado') {
                        dias[d.dia] = 'feriado';
                        feriados.push({ dia: d.dia, nome: d.nome, tipo: 'feriado' });
                    } else if (d.tipo === 'recesso') {
                        dias[d.dia] = 'recesso';
                        feriados.push({ dia: d.dia, nome: d.nome, tipo: 'recesso' });
                    }
                } else {
                    if (d.tipo === 'feriado' || d.tipo === 'recesso') {
                        feriados.push({ dia: d.dia, nome: d.nome, tipo: d.tipo });
                    }
                }
            });

            faltasResult.forEach(f => {
                dias[f.dia] = 'falta';
            });

            res.json({ dias, feriados });
        });
    });
});

// ===== NOTIFICAÇÕES =====
app.get('/notificacoes/:usuario_id', (req, res) => {
    const { usuario_id } = req.params;

    const sql = `
        SELECT * FROM notificacoes 
        WHERE usuario_id = ? 
        ORDER BY data_criacao DESC
        LIMIT 50
    `;

    db.query(sql, [usuario_id], (err, results) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(results);
    });
});

// ===== MARCAR NOTIFICAÇÃO COMO LIDA =====
app.put('/notificacoes/:id/lida', (req, res) => {
    const { id } = req.params;

    db.query('UPDATE notificacoes SET lida = TRUE WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json({ message: 'Notificação marcada como lida' });
    });
});
// ===== ROTA PARA VALIDAR SIMULAÇÃO =====
app.post('/validar-simulacao', (req, res) => {
    const { usuario_id, disciplina, data, instituicao } = req.body;

    if (!usuario_id || !data || !instituicao) {
        return res.status(400).json({ 
            valido: false, 
            motivo: 'Dados incompletos' 
        });
    }

    const dataObj = new Date(data + 'T00:00:00');
    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const diaSemana = diasSemana[dataObj.getDay()];

    if (diaSemana === 'Sábado' || diaSemana === 'Domingo') {
        return res.json({
            valido: false,
            motivo: `Não há aulas nos fins de semana. ${diaSemana} é fim de semana.`
        });
    }

    db.query('SELECT turma FROM usuarios WHERE id = ?', [usuario_id], (err, userResult) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (userResult.length === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });

        const turma = userResult[0].turma;

        const sqlInstituicao = `
            SELECT DISTINCT a.disciplina
            FROM aulas a
            JOIN turmas t ON a.turma_id = t.id
            WHERE t.nome = ? AND t.instituicao = ? AND t.ano_letivo = YEAR(CURDATE())
                AND a.dia_semana = ?
        `;

        db.query(sqlInstituicao, [turma, instituicao, diaSemana], (err, instResult) => {
            if (err) return res.status(500).json({ erro: err.message });

            if (instResult.length === 0) {
                return res.json({
                    valido: false,
                    motivo: `A instituição ${instituicao} não tem aula na ${diaSemana} para a turma ${turma}.`
                });
            }

            if (disciplina === 'DIA_TODO') {
                return res.json({
                    valido: true,
                    diaSemana,
                    disciplinas: instResult.map(r => r.disciplina),
                    totalAulas: instResult.length
                });
            }

            const disciplinasDoDia = instResult.map(r => r.disciplina);
            
            if (!disciplinasDoDia.includes(disciplina)) {
                return res.json({
                    valido: false,
                    motivo: `A disciplina "${disciplina}" não tem aula na ${diaSemana} no ${instituicao}. As disciplinas desse dia são: ${disciplinasDoDia.join(', ')}.`
                });
            }

            res.json({
                valido: true,
                diaSemana,
                disciplinas: [disciplina],
                totalAulas: 1
            });
        });
    });
});

// ===== INICIAR SERVIDOR =====
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});