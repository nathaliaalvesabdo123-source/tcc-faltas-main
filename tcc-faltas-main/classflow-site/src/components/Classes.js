import React from 'react';

function Classes() {
  const turmas = [
    { nome: 'Desenvolvimento de Sistemas', ano: '3º Ano', escola: 'SENAI Lorena', progresso: 92 },
    { nome: 'Matemática', ano: '3º Ano', escola: 'SENAI Lorena', progresso: 88 },
    { nome: 'Português', ano: '3º Ano', escola: 'SENAI Lorena', progresso: 85 },
    { nome: 'História', ano: '3º Ano', escola: 'SENAI Lorena', progresso: 80 },
    { nome: 'Física', ano: '3º Ano', escola: 'SENAI Lorena', progresso: 78 },
  ];

  const cores = ['#00b4a0', '#008f7d', '#6cd4c4', '#4ecdc4', '#2ecc71'];

  return (
    <div className="classes-card">
      <h3>Minhas Turmas</h3>
      {turmas.map((turma, index) => (
        <div key={index} className="turma-item">
          <div className="turma-info">
            <div className="turma-icone" style={{ backgroundColor: cores[index % cores.length] }}>
              {turma.nome.charAt(0)}
            </div>
            <div className="turma-detalhes">
              <span className="turma-nome">{turma.nome}</span>
              <span className="turma-escola">{turma.ano} | {turma.escola}</span>
            </div>
          </div>
          <div className="turma-progresso">
            <div className="turma-barra">
              <div className="turma-barra-preenchida" style={{ width: `${turma.progresso}%` }}></div>
            </div>
            <span className="turma-porcentagem">{turma.progresso}%</span>
            <span className="turma-seta">→</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Classes;