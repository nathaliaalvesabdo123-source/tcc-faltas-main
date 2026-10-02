import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiCalendar } from 'react-icons/fi';

function Calendar() {
  const [mes, setMes] = useState(new Date().getMonth());
  const [ano, setAno] = useState(new Date().getFullYear());
  const [dias, setDias] = useState({});
  const [feriados, setFeriados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      try {
        const user = JSON.parse(usuarioSalvo);
        buscarCalendario(user.id, ano, mes + 1);
      } catch (e) {
        console.error('Erro ao ler usuário:', e);
        setCarregando(false);
      }
    } else {
      setCarregando(false);
    }
  }, [mes, ano]);

  const buscarCalendario = async (usuarioId, anoAtual, mesAtual) => {
    setCarregando(true);
    try {
      const response = await fetch(`http://localhost:3000/calendario/${usuarioId}/${anoAtual}/${mesAtual}`);
      const data = await response.json();
      setDias(data.dias || {});
      setFeriados(data.feriados || []);
    } catch (error) {
      console.error('Erro ao buscar calendário:', error);
      setDias({});
      setFeriados([]);
    } finally {
      setCarregando(false);
    }
  };

  const nomeMeses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

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

  const hoje = new Date();
  const diaHoje = hoje.getDate();
  const mesHoje = hoje.getMonth();
  const anoHoje = hoje.getFullYear();

  const totalDiasMes = new Date(ano, mes + 1, 0).getDate();
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  const diasArray = [];

  for (let i = 0; i < primeiroDiaSemana; i++) {
    diasArray.push(null);
  }

  for (let i = 1; i <= totalDiasMes; i++) {
    diasArray.push(i);
  }

  return (
    <div className="calendar-card">
      <div className="calendar-header">
        <h3>Calendário</h3>
        <div className="calendar-mes-nav">
          <button onClick={() => mudarMes(-1)} style={{ color: '#00b4a0' }}>
            <FiChevronLeft size={18} />
          </button>
          <span>{nomeMeses[mes]} {ano}</span>
          <button onClick={() => mudarMes(1)} style={{ color: '#00b4a0' }}>
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((dia, i) => (
          <span key={i} className="calendar-dia-semana">{dia}</span>
        ))}
        {diasArray.map((dia, index) => {
          if (dia === null) {
            return <div key={`empty-${index}`} className="calendar-dia vazio"></div>;
          }

          const status = dias[dia];
          const ehHoje = dia === diaHoje && mes === mesHoje && ano === anoHoje;
          const ehFeriado = status === 'feriado' || status === 'recesso';

          return (
            <div
              key={dia}
              className={`calendar-dia ${ehHoje ? 'hoje' : ''} ${ehFeriado ? 'feriado' : ''}`}
              style={{
                backgroundColor: ehHoje ? '#00b4a0' : ehFeriado ? '#f0f0f0' : 'transparent',
                color: ehHoje ? '#fff' : ehFeriado ? '#999' : '#2d3748',
              }}
            >
              {dia}
              {!ehHoje && !ehFeriado && status && (
                <span
                  className="calendar-status"
                  style={{ backgroundColor: getStatusCor(status) }}
                />
              )}
            </div>
          );
        })}
      </div>

      {feriados.length > 0 && (
        <div className="calendar-feriados">
          <div className="calendar-feriados-titulo">
            <FiCalendar size={14} />
            <span>Feriados e Recessos de {nomeMeses[mes]}</span>
          </div>
          <ul className="calendar-feriados-lista">
            {feriados
              .sort((a, b) => a.dia - b.dia)
              .map((f, i) => (
                <li key={i} className={f.tipo === 'recesso' ? 'recesso' : 'feriado'}>
                  <strong>{String(f.dia).padStart(2, '0')}/{String(mes + 1).padStart(2, '0')}</strong>
                  <span>{f.nome || 'Feriado'}</span>
                </li>
              ))}
          </ul>
        </div>
      )}

      <div className="calendar-legend">
        <span><span className="legenda-cor" style={{ backgroundColor: '#00b4a0' }}></span> Presente</span>
        <span><span className="legenda-cor" style={{ backgroundColor: '#ff6b6b' }}></span> Falta</span>
        <span><span className="legenda-cor" style={{ backgroundColor: '#d0d0d0' }}></span> Feriado/Recesso</span>
      </div>
    </div>
  );
}

export default Calendar;