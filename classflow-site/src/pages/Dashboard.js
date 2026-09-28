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
  const [dadosFrequencia, setDadosFrequencia] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      const user = JSON.parse(usuarioSalvo);
      setUsuario(user);
      buscarDadosFrequencia(user.id);
    } else {
      // Se não tiver usuário, redireciona para o login
      window.location.href = '/';
    }
  }, []);

  const buscarDadosFrequencia = async (usuarioId) => {
    try {
      const response = await fetch(`http://localhost:3000/frequencia/${usuarioId}`);
      const data = await response.json();
      setDadosFrequencia(data);
    } catch (error) {
      console.error('Erro ao buscar frequência:', error);
    } finally {
      setCarregando(false);
    }
  };

  if (carregando || !usuario) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#718096'
      }}>
        Carregando...
      </div>
    );
  }

  const totalAulas = dadosFrequencia?.total_aulas || 0;
  const totalFaltas = dadosFrequencia?.total_faltas || 0;
  const presencas = totalAulas - totalFaltas;
  const frequencia = totalAulas > 0 ? Math.round((presencas / totalAulas) * 100) : 0;

  return (
    <>
      <Header />
      <div className="dashboard-content">
        <WelcomeSection nome={usuario.nome} />

        <div className="stats-grid">
          <StatCard 
            icone="calendar" 
            cor="#e8f8f5" 
            titulo="Total de aulas" 
            valor={totalAulas} 
            subtitulo="registradas" 
          />
          <StatCard 
            icone="check" 
            cor="#d0f0ec" 
            titulo="Aulas presentes" 
            valor={presencas} 
            subtitulo={`${frequencia}% de frequência`} 
          />
          <StatCard 
            icone="x" 
            cor="#fde8e8" 
            titulo="Faltas" 
            valor={totalFaltas} 
            subtitulo={`${totalAulas > 0 ? Math.round((totalFaltas / totalAulas) * 100) : 0}% de faltas`} 
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