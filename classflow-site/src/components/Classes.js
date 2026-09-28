import React, { useState, useEffect } from 'react';
import { GraduationCap, ArrowRight } from 'lucide-react';

function Classes() {
  const [materias, setMaterias] = useState([]);
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

      // Junta todas as disciplinas de todas as instituições
      const todasMaterias = [];
      data.instituicoes?.forEach(inst => {
        inst.materias?.forEach(mat => {
          todasMaterias.push({
            ...mat,
            instituicao: inst.instituicao
          });
        });
      });

      // Ordena por frequência (menor primeiro - mais em risco)
      todasMaterias.sort((a, b) => a.frequencia - b.frequencia);

      setMaterias(todasMaterias);
    } catch (error) {
      console.error('Erro ao buscar matérias:', error);
    } finally {
      setCarregando(false);
    }
  };

  const cores = ['#00b4a0', '#008f7d', '#6cd4c4', '#4ecdc4', '#2ecc71'];

  if (carregando) {
    return (
      <div className="classes-card">
        <h3>Minhas Turmas</h3>
        <p style={{ color: '#718096', padding: '20px 0' }}>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="classes-card">
      <h3>Minhas Turmas</h3>
      {materias.length === 0 ? (
        <p style={{ color: '#718096', padding: '20px 0', textAlign: 'center' }}>
          Nenhuma disciplina cadastrada
        </p>
      ) : (
        materias.slice(0, 5).map((materia, index) => (
          <div key={index} className="turma-item">
            <div className="turma-info">
              <div className="turma-icone" style={{ backgroundColor: cores[index % cores.length] }}>
                {materia.disciplina.charAt(0)}
              </div>
              <div className="turma-detalhes">
                <span className="turma-nome">{materia.disciplina}</span>
                <span className="turma-escola">
                  {materia.instituicao} • {materia.faltas} faltas
                </span>
              </div>
            </div>
            <div className="turma-progresso">
              <div className="turma-barra">
                <div 
                  className="turma-barra-preenchida" 
                  style={{ 
                    width: `${materia.frequencia}%`,
                    backgroundColor: materia.frequencia >= 75 ? '#00b4a0' : '#e06060'
                  }}
                ></div>
              </div>
              <span className="turma-porcentagem">{materia.frequencia}%</span>
              <ArrowRight className="turma-seta" color="#00b4a0" size={18} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Classes;