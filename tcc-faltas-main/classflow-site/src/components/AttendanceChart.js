import React from 'react';
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
  const data = {
    labels: ['Maio', 'Junho', 'Julho', 'Agosto'],
    datasets: [
      {
        label: 'Frequência (%)',
        data: [42, 55, 72, 87],
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
          label: function(context) {
            return context.parsed.y + '%';
          }
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: (value) => value + '%',
          font: {
            size: 12,
            weight: '500',
          },
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
          font: {
            size: 13,
            weight: '600',
          },
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
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default AttendanceChart;