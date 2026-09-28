import React from 'react';

function WelcomeSection({ nome }) {
  return (
    <div className="welcome-section">
      <div className="welcome-texto">
        <h1>Olá, {nome || 'Aluno'}! </h1>
        <p>Aqui está um resumo da sua frequência e desempenho escolar.</p>
        <span className="welcome-frase">"Disciplina hoje, grandes conquistas amanhã!"</span>
      </div>
      <div className="welcome-ilustracao">
        <img 
          src="/ilustracao-educacao.png" 
          alt="Ilustração educacional" 
          className="welcome-imagem"
        />
      </div>
    </div>
  );
}

export default WelcomeSection;