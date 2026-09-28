import React from 'react';
import { CalendarDays, CheckCircle2, XCircle, Clock } from 'lucide-react';

function StatCard({ icone, cor, titulo, valor, subtitulo }) {
  const icones = {
    'calendar': <CalendarDays size={28} color="#00b4a0" strokeWidth={1.5} />,
    'check': <CheckCircle2 size={28} color="#00b4a0" strokeWidth={1.5} />,
    'x': <XCircle size={28} color="#ff6b6b" strokeWidth={1.5} />,
    'clock': <Clock size={28} color="#ffa94d" strokeWidth={1.5} />,
  };

  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ backgroundColor: cor }}>
        {icones[icone]}
      </div>
      <div className="stat-info">
        <span className="stat-titulo">{titulo}</span>
        <span className="stat-valor">{valor}</span>
        <span className="stat-subtitulo">{subtitulo}</span>
      </div>
    </div>
  );
}

export default StatCard;