import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import WelcomeSection from '../components/WelcomeSection';
import StatCard from '../components/StatCard';
import AttendanceChart from '../components/AttendanceChart';
import Calendar from '../components/Calendar';
import Classes from '../components/Classes';
import MotivationCard from '../components/MotivationCard';

function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [stats, setStats] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      const user = JSON.parse(usuarioSalvo);
      setUsuario(user);
      buscarEstatisticas(user.id);
    } else {
      window.location.href = '/';
    }
  }, []);

  const buscarEstatisticas = async (usuarioId) => {
    try {
      const response = await fetch(`http://localhost:3000/estatisticas/${usuarioId}`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    } finally {
      setCarregando(false);
    }
  };

  if (carregando || !usuario || !stats) {
    return (
      <>
        <Header />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          fontSize: '18px',
          color: '#718096'
        }}>
          Carregando...
        </div>
      </>
    );
  }

  const { totalDiasLetivos, diasComFalta, diasPresentes, frequencia } = stats;
  const percentualFaltas = totalDiasLetivos > 0 
    ? Math.round((diasComFalta / totalDiasLetivos) * 100) 
    : 0;

  return (
    <>
      <Header />
      <div className="dashboard-content">
        <WelcomeSection nome={usuario.nome} />

        <div className="stats-grid">
          <StatCard
            icone="calendar"
            cor="#e8f8f5"
            titulo="Total de dias letivos"
            valor={totalDiasLetivos}
            subtitulo="até hoje"
          />
          <StatCard
            icone="check"
            cor="#d0f0ec"
            titulo="Dias presentes"
            valor={diasPresentes}
            subtitulo={`${frequencia}% de frequência`}
          />
          <StatCard
            icone="x"
            cor="#fde8e8"
            titulo="Dias com falta"
            valor={diasComFalta}
            subtitulo={`${percentualFaltas}% de faltas`}
          />
          <StatCard
            icone="clock"
            cor="#fff3e0"
            titulo="Atrasos"
            valor="0"
            subtitulo="0% de atrasos"
          />
        </div>

        <div className="charts-grid">
          <AttendanceChart />
          <Calendar />
        </div>

        <div className="bottom-grid">
          <Classes instituicao={usuario.instituicao} />
          <MotivationCard />
        </div>
      </div>
    </>
  );
}

export default Dashboard;