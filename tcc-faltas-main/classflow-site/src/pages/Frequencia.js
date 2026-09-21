import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Search, XCircle, CalendarDays, CheckCircle, XCircle as XIcon, Clock, BookOpen } from 'lucide-react';

function Frequencia() {
  const [instituicoes, setInstituicoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      const user = JSON.parse(usuarioSalvo);
      buscarDados(user.id);
    }
  }, []);

  const buscarDados = async (usuarioId) => {
    try {
      const response = await fetch(`http://localhost:3000/frequencia-completa/${usuarioId}`);
      const data = await response.json();
      setInstituicoes(data.instituicoes || []);
    } catch (error) {
      console.error('Erro ao buscar frequência:', error);
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) {
    return (
      <>
        <Header />
        <div className="page-container">
          <div className="page-header">
            <h1>Frequência</h1>
            <p>Carregando...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="page-container">
        <div className="page-header">
          <h1>Frequência</h1>
          <p>Visualize sua frequência separada por instituição</p>
        </div>

        {instituicoes.length === 0 ? (
          <div className="empty-state">
            <BookOpen size={48} color="#a0aec0" />
            <p>Nenhuma informação encontrada</p>
            <span>Verifique se sua turma está cadastrada</span>
          </div>
        ) : (
          instituicoes.map((inst, index) => (
            <div key={index} style={{ marginBottom: '40px' }}>
              {/* TÍTULO DA INSTITUIÇÃO */}
              <h2 style={{ 
                fontSize: '22px', 
                fontWeight: '700', 
                color: '#1a202c',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <BookOpen size={24} color="#00b4a0" />
                {inst.instituicao}
              </h2>

              {/* CARDS DE RESUMO */}
              <div className="frequencia-resumo">
                <div className="resumo-card">
                  <div className="resumo-icon" style={{ backgroundColor: '#e8f8f5' }}>
                    <CalendarDays size={24} color="#00b4a0" />
                  </div>
                  <div className="resumo-info">
                    <span className="resumo-valor">{inst.total_aulas}</span>
                    <span className="resumo-label">Total de aulas</span>
                  </div>
                </div>

                <div className="resumo-card">
                  <div className="resumo-icon" style={{ backgroundColor: '#fde8e8' }}>
                    <XIcon size={24} color="#e53e3e" />
                  </div>
                  <div className="resumo-info">
                    <span className="resumo-valor">{inst.total_faltas}</span>
                    <span className="resumo-label">Faltas</span>
                  </div>
                </div>

                <div className="resumo-card">
                  <div className="resumo-icon" style={{ backgroundColor: '#e8f8f5' }}>
                    <CheckCircle size={24} color="#00b4a0" />
                  </div>
                  <div className="resumo-info">
                    <span className="resumo-valor">{inst.presencas}</span>
                    <span className="resumo-label">Presenças</span>
                  </div>
                </div>

                <div className="resumo-card destaque">
                  <div className="resumo-icon" style={{ backgroundColor: '#d0f0ec' }}>
                    <Clock size={24} color="#00b4a0" />
                  </div>
                  <div className="resumo-info">
                    <span className="resumo-valor">{inst.frequencia}%</span>
                    <span className="resumo-label">Frequência</span>
                  </div>
                </div>
              </div>

              {/* STATUS */}
              <div style={{
                padding: '12px 20px',
                borderRadius: '12px',
                background: inst.frequencia >= 75 ? '#e8f8f5' : '#fde8e8',
                borderLeft: `4px solid ${inst.frequencia >= 75 ? '#00b4a0' : '#e53e3e'}`,
                marginBottom: '20px',
                fontWeight: '600',
                color: '#1a202c'
              }}>
                Situação: {inst.situacao}
              </div>

              {/* FREQUÊNCIA POR MATÉRIA */}
              <div className="frequencia-materias">
                <h3 style={{ fontSize: '16px', color: '#4a5568', marginBottom: '12px' }}>
                  Frequência por disciplina
                </h3>
                <div className="materias-grid">
                  {inst.materias.length === 0 ? (
                    <p style={{ color: '#718096' }}>Nenhuma disciplina encontrada.</p>
                  ) : (
                    inst.materias.map((item, i) => (
                      <div key={i} className="materia-card">
                        <div className="materia-header">
                          <span className="materia-nome">{item.disciplina}</span>
                          <span className="materia-porcentagem">{item.frequencia}%</span>
                        </div>
                        <div className="materia-bar">
                          <div 
                            className="materia-bar-preenchida" 
                            style={{ 
                              width: `${item.frequencia}%`,
                              backgroundColor: item.frequencia >= 75 ? '#00b4a0' : '#e53e3e'
                            }}
                          />
                        </div>
                        <div className="materia-detalhes">
                          <span>{item.faltas} faltas</span>
                          <span>{item.total_aulas} aulas</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Frequencia;