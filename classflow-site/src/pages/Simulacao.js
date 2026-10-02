import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import {
  TrendingUp,
  CalendarDays,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  BookOpen,
  School,
  BarChart3
} from 'lucide-react';

function Simulacao() {
  const [usuario, setUsuario] = useState(null);
  const [instituicao, setInstituicao] = useState('Sesi');
  const [disciplina, setDisciplina] = useState('');
  const [data, setData] = useState('');
  const [disciplinas, setDisciplinas] = useState([]);
  const [carregandoDisciplinas, setCarregandoDisciplinas] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const isDiaTodo = disciplina === 'DIA_TODO';

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      const user = JSON.parse(usuarioSalvo);
      setUsuario(user);
    }
  }, []);

  useEffect(() => {
    if (usuario && instituicao) {
      buscarDisciplinas(usuario.id, instituicao);
    }
  }, [instituicao, usuario]);

  const buscarDisciplinas = async (usuarioId, inst) => {
    setCarregandoDisciplinas(true);
    setDisciplina('');
    setResultado(null);
    setErro('');
    try {
      const response = await fetch(`http://localhost:3000/disciplinas/${usuarioId}/${inst}`);
      const data = await response.json();
      setDisciplinas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error);
      setDisciplinas([]);
    } finally {
      setCarregandoDisciplinas(false);
    }
  };

  const simular = async () => {
    setErro('');
    setResultado(null);

    if (!disciplina) {
      setErro('Selecione uma disciplina para simular.');
      return;
    }
    if (!data) {
      setErro('Selecione a data da falta.');
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch('http://localhost:3000/validar-simulacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: usuario.id,
          disciplina,
          data,
          instituicao
        })
      });

      const validacao = await response.json();

      if (!validacao.valido) {
        setErro(validacao.motivo);
        setCarregando(false);
        return;
      }

      setTimeout(() => {
        const frequenciaAtual = 95;
        const totalFaltasSimuladas = validacao.totalAulas;
        const frequenciaSimulada = Math.max(0, frequenciaAtual - totalFaltasSimuladas);

        const resultadoSimulado = {
          totalDisciplinas: validacao.disciplinas.length,
          disciplinas: validacao.disciplinas,
          data: data,
          instituicao,
          diaSemana: validacao.diaSemana,
          tipo: isDiaTodo ? 'Dia Todo' : 'Disciplina específica',
          frequenciaAtual,
          frequenciaSimulada,
          situacao: frequenciaSimulada >= 75 ? 'aprovado' : 'reprovado'
        };

        setResultado(resultadoSimulado);
        setCarregando(false);
      }, 600);

    } catch (error) {
      console.error('Erro:', error);
      setErro('Erro ao verificar. Verifique se o backend está rodando.');
      setCarregando(false);
    }
  };

  const limparSimulacao = () => {
    setResultado(null);
    setDisciplina('');
    setData('');
    setErro('');
  };

  const getCorFrequencia = (frequencia) => {
    if (frequencia >= 90) return '#00b4a0';
    if (frequencia >= 75) return '#ed8936';
    return '#e53e3e';
  };

  if (!usuario) {
    return (
      <>
        <Header />
        <div className="page-container">
          <div style={{ padding: '40px', textAlign: 'center' }}>Carregando...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="page-container">
        <div className="page-header">
          <h1>Simulação de Faltas</h1>
          <p>Veja como faltas futuras podem impactar sua frequência</p>
        </div>

        <div className="simulacao-grid">
          {/* CARD DO FORMULÁRIO */}
          <div className="simulacao-form-card">
            <div className="form-card-header">
              <div className="form-card-icon">
                <TrendingUp size={24} color="#00b4a0" />
              </div>
              <div>
                <h3>Simular faltas</h3>
                <p>Calcule o risco de reprovação por falta</p>
              </div>
            </div>

            <div className="simulacao-form">
              <div className="form-group">
                <label>
                  <School size={18} className="form-icon" />
                  Instituição <span className="required">*</span>
                </label>
                <select
                  value={instituicao}
                  onChange={(e) => setInstituicao(e.target.value)}
                  className="preenchido"
                >
                  <option value="Sesi">Sesi</option>
                  <option value="Senai">Senai</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  <BookOpen size={18} className="form-icon" />
                  Disciplina <span className="required">*</span>
                </label>
                <select
                  value={disciplina}
                  onChange={(e) => setDisciplina(e.target.value)}
                  disabled={carregandoDisciplinas}
                  className={disciplina ? 'preenchido' : ''}
                >
                  <option value="">
                    {carregandoDisciplinas ? 'Carregando...' : 'Selecione uma disciplina'}
                  </option>
                  <option value="DIA_TODO">📅 Dia Todo (todas as disciplinas do dia)</option>
                  {disciplinas.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>
                  <CalendarDays size={18} className="form-icon" />
                  Data da falta <span className="required">*</span>
                </label>
                <input
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className={data ? 'preenchido' : ''}
                />
              </div>

              {isDiaTodo && (
                <div style={{
                  background: '#e8f8f5',
                  border: '1px solid #00b4a0',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  marginBottom: '16px',
                  fontSize: '14px',
                  color: '#1a202c'
                }}>
                  <strong>📅 Dia Todo selecionado</strong>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#4a5568' }}>
                    Serão simuladas faltas em <strong>todas as disciplinas</strong> do dia escolhido.
                  </p>
                </div>
              )}

              <button
                className="btn-simular"
                onClick={simular}
                disabled={carregando}
              >
                {carregando ? (
                  <>Verificando...</>
                ) : (
                  <>
                    <BarChart3 size={18} />
                    Simular
                  </>
                )}
              </button>

              <button
                className="btn-limpar"
                onClick={limparSimulacao}
                disabled={!resultado && !erro}
              >
                Limpar simulação
              </button>
            </div>
          </div>

          {/* CARD DO RESULTADO */}
          <div className="simulacao-resultado-card">
            <div className="resultado-header">
              <h3>Resultado da simulação</h3>
              {resultado && !erro && (
                <span className={`resultado-status ${resultado.situacao}`}>
                  {resultado.situacao === 'aprovado' ? (
                    <CheckCircle size={16} />
                  ) : (
                    <XCircle size={16} />
                  )}
                  {resultado.situacao === 'aprovado' ? 'Aprovado' : 'Reprovado'}
                </span>
              )}
            </div>

            {/* ERRO BONITO */}
            {erro ? (
              <div className="resultado-erro">
                <div className="resultado-erro-icon">
                  <AlertCircle size={32} color="#e53e3e" />
                </div>
                <h4>Não foi possível simular</h4>
                <p>{erro}</p>
                <div className="resultado-erro-dica">
                  <Info size={14} />
                  <span>Verifique a instituição, a disciplina e a data escolhidas.</span>
                </div>
              </div>
            ) : resultado ? (
              <div className="resultado-content">
                <div className="resultado-frequencia">
                  <div className="frequencia-circular">
                    <div
                      className="frequencia-circle"
                      style={{
                        borderColor: getCorFrequencia(resultado.frequenciaSimulada)
                      }}
                    >
                      <span className="frequencia-valor">{resultado.frequenciaSimulada}%</span>
                      <span className="frequencia-label">Frequência</span>
                    </div>
                  </div>
                  <div className="frequencia-detalhes">
                    <div className="detalhe-item">
                      <span className="detalhe-label">Frequência atual</span>
                      <span className="detalhe-valor">{resultado.frequenciaAtual}%</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">Faltas simuladas</span>
                      <span className="detalhe-valor">{resultado.totalDisciplinas}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">Instituição</span>
                      <span className="detalhe-valor">{resultado.instituicao}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">Dia da semana</span>
                      <span className="detalhe-valor">{resultado.diaSemana}</span>
                    </div>
                    <div className="detalhe-item destaque">
                      <span className="detalhe-label">Limite mínimo</span>
                      <span className="detalhe-valor">75%</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '14px', color: '#4a5568', marginBottom: '8px' }}>
                    Disciplinas afetadas:
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {resultado.disciplinas.map((d, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          background: '#f0f7f6',
                          color: '#00b4a0',
                          fontSize: '13px',
                          fontWeight: '500'
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`mensagem-${resultado.situacao === 'aprovado' ? 'sucesso' : 'risco'}`}>
                  {resultado.situacao === 'aprovado' ? (
                    <>
                      <CheckCircle size={24} color="#00b4a0" />
                      <div>
                        <strong>Você está dentro do limite!</strong>
                        <p>Mesmo com essas faltas, sua frequência ficaria em {resultado.frequenciaSimulada}%.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle size={24} color="#e06060" />
                      <div>
                        <strong>Alerta de reprovação!</strong>
                        <p>Com essas faltas, sua frequência ficaria em {resultado.frequenciaSimulada}%, abaixo do limite mínimo de 75%.</p>
                        <p className="dica">⚠️ Procure a coordenação para regularizar sua situação.</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="resultado-vazio">
                <Info size={48} color="#a0aec0" />
                <p>Preencha os dados e clique em "Simular"</p>
                <span>Veja quais disciplinas seriam afetadas pela sua falta</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Simulacao;