import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { 
  BookOpen, 
  Users, 
  CalendarDays, 
  Clock, 
  ArrowRight,
  GraduationCap,
  BarChart3,
  CheckCircle
} from 'lucide-react';

function Turmas() {
  const [instituicoes, setInstituicoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      const user = JSON.parse(usuarioSalvo);
      setUsuario(user);
      buscarDados(user.id);
    } else {
      setCarregando(false);
    }
  }, []);

  const buscarDados = async (usuarioId) => {
    try {
      const response = await fetch(`http://localhost:3000/frequencia-completa/${usuarioId}`);
      const data = await response.json();
      setInstituicoes(data.instituicoes || []);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setCarregando(false);
    }
  };

  const coresFundo = ['#e8f8f5', '#d0f0ec', '#b8e8e0', '#a0e0d4', '#88d8c8'];
  const coresIcone = ['#00b4a0', '#008f7d', '#3fb8a8', '#5ce0d0', '#7ae8d8'];

  const getStatusCor = (frequencia) => {
    if (frequencia >= 90) return '#00b4a0';
    if (frequencia >= 75) return '#f0b000';
    return '#e06060';
  };

  const getStatusLabel = (frequencia) => {
    if (frequencia >= 90) return 'Ótimo';
    if (frequencia >= 75) return 'Atenção';
    return 'Risco';
  };

  if (carregando) {
    return (
      <>
        <Header />
        <div className="page-container">
          <div className="page-header">
            <h1>Minhas Turmas</h1>
            <p>Carregando...</p>
          </div>
        </div>
      </>
    );
  }

  if (instituicoes.length === 0) {
    return (
      <>
        <Header />
        <div className="page-container">
          <div className="page-header">
            <h1>Minhas Turmas</h1>
            <p>Visualize suas turmas e seu desempenho em cada uma</p>
          </div>
          <div className="empty-state">
            <BookOpen size={48} color="#a0aec0" />
            <p>Nenhuma turma encontrada</p>
            <span>Verifique se sua turma está cadastrada</span>
          </div>
        </div>
      </>
    );
  }

  // Calcular estatísticas gerais
  let totalTurmas = 0;
  let totalAulas = 0;
  let totalFaltas = 0;

  instituicoes.forEach(inst => {
    totalTurmas += inst.materias?.length || 0;
    totalAulas += inst.total_aulas || 0;
    totalFaltas += inst.total_faltas || 0;
  });

  const presencas = totalAulas - totalFaltas;
  const frequenciaMedia = totalAulas > 0 ? Math.round((presencas / totalAulas) * 100) : 0;

  return (
    <>
      <Header />
      <div className="page-container">
        <div className="page-header">
          <h1>Minhas Turmas</h1>
          <p>Visualize suas turmas e seu desempenho em cada uma</p>
        </div>

        {/* CARDS DE RESUMO */}
        <div className="turmas-resumo">
          <div className="resumo-card-turmas">
            <div className="resumo-icon-turmas" style={{ backgroundColor: '#e8f8f5' }}>
              <BookOpen size={24} color="#00b4a0" />
            </div>
            <div className="resumo-info-turmas">
              <span className="resumo-valor-turmas">{totalTurmas}</span>
              <span className="resumo-label-turmas">Disciplinas</span>
            </div>
          </div>

          <div className="resumo-card-turmas">
            <div className="resumo-icon-turmas" style={{ backgroundColor: '#d0f0ec' }}>
              <Users size={24} color="#00b4a0" />
            </div>
            <div className="resumo-info-turmas">
              <span className="resumo-valor-turmas">{instituicoes.length}</span>
              <span className="resumo-label-turmas">Instituições</span>
            </div>
          </div>

          <div className="resumo-card-turmas">
            <div className="resumo-icon-turmas" style={{ backgroundColor: '#e8f8f5' }}>
              <BarChart3 size={24} color="#00b4a0" />
            </div>
            <div className="resumo-info-turmas">
              <span className="resumo-valor-turmas">{frequenciaMedia}%</span>
              <span className="resumo-label-turmas">Frequência média</span>
            </div>
          </div>

          <div className="resumo-card-turmas">
            <div className="resumo-icon-turmas" style={{ backgroundColor: '#fde8e8' }}>
              <Clock size={24} color="#e06060" />
            </div>
            <div className="resumo-info-turmas">
              <span className="resumo-valor-turmas">{totalFaltas}</span>
              <span className="resumo-label-turmas">Faltas totais</span>
            </div>
          </div>
        </div>

        {/* LISTA DE TURMAS POR INSTITUIÇÃO */}
        {instituicoes.map((inst, instIndex) => (
          <div key={instIndex} style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              fontSize: '22px', 
              fontWeight: '700', 
              color: '#1a202c',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <GraduationCap size={24} color="#00b4a0" />
              {inst.instituicao}
            </h2>

            <div className="turmas-lista">
              {inst.materias && inst.materias.length > 0 ? (
                inst.materias.map((materia, index) => (
                  <div 
                    key={index} 
                    className="turma-card-expandido"
                    style={{ borderLeftColor: coresIcone[index % coresIcone.length] }}
                  >
                    <div className="turma-card-header">
                      <div className="turma-card-left">
                        <div 
                          className="turma-card-icone"
                          style={{ backgroundColor: coresFundo[index % coresFundo.length] }}
                        >
                          <GraduationCap size={24} color={coresIcone[index % coresIcone.length]} />
                        </div>
                        <div>
                          <h3>{materia.disciplina}</h3>
                          <span className="turma-card-sub">
                            {usuario?.turma} • {inst.instituicao}
                          </span>
                        </div>
                      </div>
                      <div className="turma-card-right">
                        <div className="turma-card-status">
                          <span 
                            className="status-badge"
                            style={{ 
                              backgroundColor: getStatusCor(materia.frequencia) + '20',
                              color: getStatusCor(materia.frequencia)
                            }}
                          >
                            {getStatusLabel(materia.frequencia)}
                          </span>
                          <span className="turma-card-frequencia">{materia.frequencia}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="turma-card-detalhes">
                      <div className="turma-detalhe-item">
                        <CalendarDays size={16} color="#8ab8ae" />
                        <span>{materia.aulas_por_semana} aulas/semana</span>
                      </div>
                      <div className="turma-detalhe-item">
                        <BookOpen size={16} color="#8ab8ae" />
                        <span>{materia.total_aulas} aulas no total</span>
                      </div>
                      <div className="turma-detalhe-item">
                        <Users size={16} color="#8ab8ae" />
                        <span>{inst.instituicao}</span>
                      </div>
                      <div className="turma-detalhe-item">
                        <Clock size={16} color="#8ab8ae" />
                        <span>{materia.faltas} faltas</span>
                      </div>
                    </div>

                    <div className="turma-card-progresso">
                      <div className="turma-progresso-header">
                        <span>Progresso</span>
                        <span>{materia.presencas} de {materia.total_aulas} aulas</span>
                      </div>
                      <div className="turma-progresso-barra">
                        <div 
                          className="turma-progresso-preenchido"
                          style={{ 
                            width: `${materia.frequencia}%`,
                            backgroundColor: coresIcone[index % coresIcone.length]
                          }}
                        />
                      </div>
                      <div className="turma-progresso-footer">
                        <span>✅ {materia.presencas} presenças</span>
                        <span>❌ {materia.faltas} faltas</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <BookOpen size={32} color="#a0aec0" />
                  <p>Nenhuma disciplina cadastrada nessa instituição</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Turmas;