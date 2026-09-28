import React from 'react';
import { TrendingUp, Award, BookOpen, ArrowRight } from 'lucide-react';

function MotivationCard() {
  return (
    <div className="motivation-card">
      <div className="motivation-content">
        <div className="motivation-icons">
          <Award size={24} color="#ffffff" strokeWidth={1.5} />
          <BookOpen size={24} color="#ffffff" strokeWidth={1.5} />
          <TrendingUp size={24} color="#ffffff" strokeWidth={1.5} />
        </div>
        <h3>Seu esforço faz a diferença!</h3>
        <p>Continue assim, você está no caminho certo para alcançar seus objetivos!</p>
        <button className="motivation-btn">
          Ver meu desempenho
          <ArrowRight size={18} className="motivation-btn-icon" />
        </button>
      </div>
    </div>
  );
}

export default MotivationCard;