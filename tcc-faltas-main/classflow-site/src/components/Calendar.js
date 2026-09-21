import React, { useState } from 'react';

function Calendar() {
  const [mes, setMes] = useState(7); // Agosto = 7 (0-indexado)
  const [ano, setAno] = useState(2025);

  const dias = [
    { dia: 1, status: 'presente' },
    { dia: 2, status: 'presente' },
    { dia: 3, status: 'falta' },
    { dia: 4, status: 'presente' },
    { dia: 5, status: 'atraso' },
    { dia: 6, status: 'presente' },
    { dia: 7, status: 'presente' },
    { dia: 8, status: 'presente' },
    { dia: 9, status: 'falta' },
    { dia: 10, status: 'presente' },
    { dia: 11, status: 'presente' },
    { dia: 12, status: 'presente' },
    { dia: 13, status: 'presente' },
    { dia: 14, status: 'atraso' },
    { dia: 15, status: 'presente' },
    { dia: 16, status: 'presente' },
    { dia: 17, status: 'presente' },
    { dia: 18, status: 'presente' },
    { dia: 19, status: 'presente' },
    { dia: 20, status: 'presente' },
    { dia: 21, status: 'presente' },
    { dia: 22, status: 'presente' },
    { dia: 23, status: 'presente' },
    { dia: 24, status: 'presente' },
    { dia: 25, status: 'presente' },
    { dia: 26, status: 'presente' },
    { dia: 27, status: 'presente' },
    { dia: 28, status: 'presente' },
    { dia: 29, status: 'presente' },
    { dia: 30, status: 'presente' },
    { dia: 31, status: 'presente' },
  ];

  const nomeMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const mudarMes = (delta) => {
    let novoMes = mes + delta;
    let novoAno = ano;
    if (novoMes > 11) { novoMes = 0; novoAno++; }
    if (novoMes < 0) { novoMes = 11; novoAno--; }
    setMes(novoMes);
    setAno(novoAno);
  };

  const getStatusCor = (status) => {
    if (status === 'presente') return '#00b4a0';
    if (status === 'falta') return '#ff6b6b';
    if (status === 'atraso') return '#ffa94d';
    return '#e2e8f0';
  };

  const hoje = 15;

  return (
    <div className="calendar-card">
      <div className="calendar-header">
        <h3>Calendário</h3>
        <div className="calendar-mes-nav">
          <button onClick={() => mudarMes(-1)}>◀</button>
          <span>{nomeMeses[mes]} {ano}</span>
          <button onClick={() => mudarMes(1)}>▶</button>
        </div>
      </div>

      <div className="calendar-grid">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((dia, i) => (
          <span key={i} className="calendar-dia-semana">{dia}</span>
        ))}
        {dias.slice(0, 31).map((item, index) => (
          <div
            key={index}
            className={`calendar-dia ${item.dia === hoje ? 'hoje' : ''}`}
            style={{
              backgroundColor: item.dia === hoje ? '#00b4a0' : 'transparent',
              color: item.dia === hoje ? '#fff' : '#2d3748',
            }}
          >
            {item.dia}
            {item.dia !== hoje && (
              <span 
                className="calendar-status" 
                style={{ backgroundColor: getStatusCor(item.status) }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="calendar-legend">
        <span><span className="legenda-cor" style={{ backgroundColor: '#00b4a0' }}></span> Presente</span>
        <span><span className="legenda-cor" style={{ backgroundColor: '#ff6b6b' }}></span> Falta</span>
        <span><span className="legenda-cor" style={{ backgroundColor: '#ffa94d' }}></span> Atraso</span>
      </div>
    </div>
  );
}

export default Calendar;