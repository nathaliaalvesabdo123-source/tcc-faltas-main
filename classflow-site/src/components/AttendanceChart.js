import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function AttendanceChart() {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      const user = JSON.parse(usuarioSalvo);
      buscarDados(user.id);
    } else {
      setCarregando(false);
    }
  }, []);

  const buscarDados = async (usuarioId) => {
    try {
      const response = await fetch(`http://localhost:3000/frequencia-mensal/${usuarioId}`);
      const data = await response.json();
      setDados(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao buscar frequência mensal:', error);
      setDados([]);
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) {
    return (
      <div className="chart-card">
        <h3>Sua frequência nos últimos 4 meses</h3>
        <div
          className="chart-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: '#718096' }}>Carregando...</span>
        </div>
      </div>
    );
  }

  if (dados.length === 0) {
    return (
      <div className="chart-card">
        <h3>Sua frequência nos últimos 4 meses</h3>
        <div
          className="chart-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: '#718096' }}>Sem dados disponíveis</span>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: dados.map((d) => d.mes),
    datasets: [
      {
        label: 'Frequência (%)',
        data: dados.map((d) => d.frequencia),
        borderColor: '#00b4a0',
        backgroundColor: 'rgba(0, 180, 160, 0.10)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#00b4a0',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255,255,255,0.92)',
        titleColor: '#1a202c',
        bodyColor: '#2d3748',
        borderColor: '#00b4a0',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const mes = dados[index];
            return [
              `Frequência: ${context.parsed.y}%`,
              `Faltas: ${mes.faltas} dia(s)`,
              `Dias letivos: ${mes.totalAulas}`,
            ];
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: (value) => value + '%',
          font: { size: 12, weight: '500' },
          color: '#718096',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.04)',
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 13, weight: '600' },
          color: '#4a5568',
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
    },
  };

  return (
    <div className="chart-card">
      <h3>Sua frequência nos últimos 4 meses</h3>
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default AttendanceChart;