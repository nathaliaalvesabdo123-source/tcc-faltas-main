import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { 
  CalendarDays, 
  BookOpen, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Send,
  School,
  Info
} from 'lucide-react';

function LancarFalta() {
  const [disciplina, setDisciplina] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [justificativa, setJustificativa] = useState('');
  const [instituicao, setInstituicao] = useState('Sesi');
  const [disciplinas, setDisciplinas] = useState([]);
  const [carregandoDisciplinas, setCarregandoDisciplinas] = useState(false);
  const [status, setStatus] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const horarios = [
    { value: 'dia-todo', label: 'Dia todo' },
    { value: 'manha', label: 'Período da manhã' },
    { value: 'tarde', label: 'Período da tarde' },
    { value: 'aula-1', label: '1ª aula' },
    { value: 'aula-2', label: '2ª aula' },
    { value: 'aula-3', label: '3ª aula' },
    { value: 'aula-4', label: '4ª aula' },
    { value: 'aula-5', label: '5ª aula' },
    { value: 'aula-6', label: '6ª aula' },
    { value: 'aula-7', label: '7ª aula' },
    { value: 'aula-8', label: '8ª aula' },
    { value: 'aula-9', label: '9ª aula' },
    { value: 'aula-10', label: '10ª aula' },
  ];

  // Verifica se escolheu "Dia Todo"
  const isDiaTodo = disciplina === 'DIA_TODO';

  // Buscar disciplinas sempre que a instituição mudar
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo && instituicao) {
      const user = JSON.parse(usuarioSalvo);
      buscarDisciplinas(user.id, instituicao);
    }
  }, [instituicao]);

  const buscarDisciplinas = async (usuarioId, inst) => {
    setCarregandoDisciplinas(true);
    setDisciplina('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setMensagem('');

    // Validação
    if (!disciplina || !data || !instituicao) {
      setStatus('error');
      setMensagem('Preencha todos os campos obrigatórios!');
      return;
    }

    // Se não for dia todo, precisa de horário
    if (!isDiaTodo && !horario) {
      setStatus('error');
      setMensagem('Selecione o horário!');
      return;
    }

    setCarregando(true);

    try {
      const usuarioSalvo = localStorage.getItem('usuario');
      const user = JSON.parse(usuarioSalvo);

      let response;
      let result;

      if (isDiaTodo) {
        // Rota especial para dia todo
        response = await fetch('http://localhost:3000/faltas-dia-todo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usuario_id: user.id,
            data,
            instituicao
          }),
        });
        result = await response.json();

        if (response.ok) {
          setStatus('success');
          setMensagem(`Faltas em dia todo (${instituicao}) lançadas com sucesso! (${result.total} aulas)`);
        } else {
          setStatus('error');
          setMensagem(result.erro || 'Erro ao lançar faltas');
        }
      } else {
        // Rota normal (disciplina específica)
        response = await fetch('http://localhost:3000/faltas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usuario_id: user.id,
            disciplina,
            data,
            horario,
            justificativa,
            instituicao
          }),
        });
        result = await response.json();

        if (response.ok) {
          setStatus('success');
          setMensagem(`Falta em ${disciplina} (${instituicao}) lançada com sucesso!`);
        } else {
          setStatus('error');
          setMensagem(result.erro || 'Erro ao lançar falta');
        }
      }

      // Limpar formulário
      setDisciplina('');
      setData('');
      setHorario('');
      setJustificativa('');

    } catch (error) {
      setStatus('error');
      setMensagem('Erro ao conectar com o servidor');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <Header />
      <div className="page-container">
        <div className="page-header">
          <h1>Lançar Falta</h1>
          <p>Registre uma nova falta para acompanhamento</p>
        </div>

        {status === 'success' && (
          <div className="mensagem sucesso">
            <CheckCircle size={20} />
            <span>{mensagem}</span>
          </div>
        )}
        {status === 'error' && (
          <div className="mensagem erro">
            <XCircle size={20} />
            <span>{mensagem}</span>
          </div>
        )}

        <div className="lancar-falta-grid">
          <div className="form-card">
            <div className="form-card-header">
              <div className="form-card-icon">
                <School size={24} color="#00b4a0" />
              </div>
              <div>
                <h3>Nova Falta</h3>
                <p>Preencha os dados abaixo</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* INSTITUIÇÃO */}
              <div className="form-group">
                <label>
                  <School size={18} className="form-icon" />
                  Instituição <span className="required">*</span>
                </label>
                <select
                  value={instituicao}
                  onChange={(e) => setInstituicao(e.target.value)}
                  required
                  className="preenchido"
                >
                  <option value="Sesi">Sesi</option>
                  <option value="Senai">Senai</option>
                </select>
              </div>

              {/* DISCIPLINA */}
              <div className="form-group">
                <label>
                  <BookOpen size={18} className="form-icon" />
                  Disciplina <span className="required">*</span>
                </label>
                <select
                  value={disciplina}
                  onChange={(e) => setDisciplina(e.target.value)}
                  required
                  className={disciplina ? 'preenchido' : ''}
                  disabled={carregandoDisciplinas}
                >
                  <option value="">
                    {carregandoDisciplinas ? 'Carregando disciplinas...' : 'Selecione uma disciplina'}
                  </option>
                  <option value="DIA_TODO">📅 Dia Todo (todas as disciplinas do dia)</option>
                  {disciplinas.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* DATA */}
              <div className="form-row">
                <div className="form-group">
                  <label>
                    <CalendarDays size={18} className="form-icon" />
                    Data <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    required
                    className={data ? 'preenchido' : ''}
                  />
                </div>

                {/* HORÁRIO - SÓ SE NÃO FOR DIA TODO */}
                {!isDiaTodo && (
                  <div className="form-group">
                    <label>
                      <Clock size={18} className="form-icon" />
                      Horário <span className="required">*</span>
                    </label>
                    <select
                      value={horario}
                      onChange={(e) => setHorario(e.target.value)}
                      required={!isDiaTodo}
                      className={horario ? 'preenchido' : ''}
                    >
                      <option value="">Selecione</option>
                      {horarios.map((h) => (
                        <option key={h.value} value={h.value}>{h.label}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* AVISO DE DIA TODO */}
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
                    Serão lançadas faltas em <strong>todas as disciplinas</strong> que têm aula nesse dia na instituição escolhida.
                  </p>
                </div>
              )}

              {/* JUSTIFICATIVA - SÓ SE NÃO FOR DIA TODO */}
              {!isDiaTodo && (
                <div className="form-group">
                  <label>
                    <AlertCircle size={18} className="form-icon" />
                    Justificativa
                  </label>
                  <textarea
                    value={justificativa}
                    onChange={(e) => setJustificativa(e.target.value)}
                    placeholder="Descreva o motivo da falta (opcional)"
                    rows={3}
                  />
                </div>
              )}

              <button 
                type="submit" 
                className="btn-primary btn-lancar"
                disabled={carregando}
              >
                {carregando ? (
                  <>Enviando...</>
                ) : (
                  <>
                    <Send size={18} />
                    {isDiaTodo ? 'Lançar Dia Todo' : 'Lançar Falta'}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* CARD DE INFORMAÇÕES */}
          <div className="info-card">
            <div className="info-card-header">
              <h3>Informações importantes</h3>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <Info size={18} color="#00b4a0" />
              </div>
              <div>
                <strong>Dia Todo</strong>
                <p>Escolha "Dia Todo" para lançar falta em todas as aulas do dia automaticamente.</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <CheckCircle size={18} color="#00b4a0" />
              </div>
              <div>
                <strong>Faltas justificadas</strong>
                <p>Faltas com atestado médico não contam para o limite.</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <School size={18} color="#00b4a0" />
              </div>
              <div>
                <strong>Sesi ou Senai?</strong>
                <p>Escolha a instituição para ver as disciplinas corretas.</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <Clock size={18} color="#00b4a0" />
              </div>
              <div>
                <strong>Limite de faltas</strong>
                <p>Você pode faltar até 25% do total de aulas por disciplina.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LancarFalta;