import React, { useState } from 'react';
import Header from '../components/Header';
import { 
  BookOpen, 
  Users, 
  CalendarDays, 
  Clock, 
  ArrowRight,
  GraduationCap,
  BarChart3,
  CheckCircle
} from 'lucide-react';

function Turmas() {
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);

  // Dados mockados (depois vem do backend)
  const turmas = [
    {
      id: 1,
      nome: 'Desenvolvimento de Sistemas',
      ano: '3º Ano',
      instituicao: 'SENAI Lorena',
      periodo: 'Manhã',
      cargaHoraria: 120,
      faltas: 4,
      presencas: 116,
      frequencia: 97,
      cor: '#00b4a0',
      professor: 'Prof. Carlos Silva',
      sala: 'Lab 01',
      dias: ['Segunda', 'Quarta', 'Sexta'],
    },
    {
      id: 2,
      nome: 'Matemática',
      ano: '3º Ano',
      instituicao: 'SESI Lorena',
      periodo: 'Manhã',
      cargaHoraria: 80,
      faltas: 6,
      presencas: 74,
      frequencia: 92,
      cor: '#3fb8a8',
      professor: 'Profa. Maria Santos',
      sala: 'Sala 12',
      dias: ['Segunda', 'Quarta'],
    },
    {
      id: 3,
      nome: 'Português',
      ano: '3º Ano',
      instituicao: 'SESI Lorena',
      periodo: 'Tarde',
      cargaHoraria: 80,
      faltas: 8,
      presencas: 72,
      frequencia: 90,
      cor: '#5ce0d0',
      professor: 'Prof. José Oliveira',
      sala: 'Sala 08',
      dias: ['Terça', 'Quinta'],
    },
    {
      id: 4,
      nome: 'História',
      ano: '3º Ano',
      instituicao: 'SESI Lorena',
      periodo: 'Tarde',
      cargaHoraria: 60,
      faltas: 10,
      presencas: 50,
      frequencia: 83,
      cor: '#7ae8d8',
      professor: 'Profa. Ana Costa',
      sala: 'Sala 15',
      dias: ['Terça', 'Quinta'],
    },
    {
      id: 5,
      nome: 'Física',
      ano: '3º Ano',
      instituicao: 'SENAI Lorena',
      periodo: 'Tarde',
      cargaHoraria: 80,
      faltas: 12,
      presencas: 68,
      frequencia: 85,
      cor: '#2ecc71',
      professor: 'Prof. Roberto Lima',
      sala: 'Lab 03',
      dias: ['Segunda', 'Quarta', 'Sexta'],
    },
  ];

  const coresFundo = ['#e8f8f5', '#d0f0ec', '#b8e8e0', '#a0e0d4', '#88d8c8'];

  const getStatusCor = (frequencia) => {
    if (frequencia >= 90) return '#00b4a0';
    if (frequencia >= 75) return '#f0b000';
    return '#e06060';
  };

  const getStatusLabel = (frequencia) => {
    if (frequencia >= 90) return 'Ótimo';
    if (frequencia >= 75) return 'Atenção';
    return 'Risco';
  };

  return (
    <>
      <Header />
      <div className="page-container">
        <div className="page-header">
          <div className="page-header-left">
            <h1>Minhas Turmas</h1>
            <p>Visualize suas turmas e seu desempenho em cada uma</p>
          </div>
        </div>

        {/* CARDS DE RESULTADO */}
        <div className="turmas-resumo">
          <div className="resumo-card-turmas">
            <div className="resumo-icon-turmas" style={{ backgroundColor: '#e8f8f5' }}>
              <BookOpen size={24} color="#00b4a0" />
            </div>
            <div className="resumo-info-turmas">
              <span className="resumo-valor-turmas">{turmas.length}</span>
              <span className="resumo-label-turmas">Turmas</span>
            </div>
          </div>

          <div className="resumo-card-turmas">
            <div className="resumo-icon-turmas" style={{ backgroundColor: '#d0f0ec' }}>
              <Users size={24} color="#00b4a0" />
            </div>
            <div className="resumo-info-turmas">
              <span className="resumo-valor-turmas">3</span>
              <span className="resumo-label-turmas">Instituições</span>
            </div>
          </div>

          <div className="resumo-card-turmas">
            <div className="resumo-icon-turmas" style={{ backgroundColor: '#e8f8f5' }}>
              <BarChart3 size={24} color="#00b4a0" />
            </div>
            <div className="resumo-info-turmas">
              <span className="resumo-valor-turmas">89%</span>
              <span className="resumo-label-turmas">Frequência média</span>
            </div>
          </div>

          <div className="resumo-card-turmas">
            <div className="resumo-icon-turmas" style={{ backgroundColor: '#fde8e8' }}>
              <Clock size={24} color="#e06060" />
            </div>
            <div className="resumo-info-turmas">
              <span className="resumo-valor-turmas">8</span>
              <span className="resumo-label-turmas">Faltas totais</span>
            </div>
          </div>
        </div>

        {/* LISTA DE TURMAS */}
        <div className="turmas-lista">
          {turmas.map((turma, index) => (
            <div 
              key={turma.id} 
              className="turma-card-expandido"
              style={{ borderLeftColor: turma.cor }}
            >
              <div className="turma-card-header">
                <div className="turma-card-left">
                  <div 
                    className="turma-card-icone"
                    style={{ backgroundColor: coresFundo[index % coresFundo.length] }}
                  >
                    <GraduationCap size={24} color={turma.cor} />
                  </div>
                  <div>
                    <h3>{turma.nome}</h3>
                    <span className="turma-card-sub">{turma.ano} • {turma.instituicao}</span>
                  </div>
                </div>
                <div className="turma-card-right">
                  <div className="turma-card-status">
                    <span 
                      className="status-badge"
                      style={{ 
                        backgroundColor: getStatusCor(turma.frequencia) + '20',
                        color: getStatusCor(turma.frequencia)
                      }}
                    >
                      {getStatusLabel(turma.frequencia)}
                    </span>
                    <span className="turma-card-frequencia">{turma.frequencia}%</span>
                  </div>
                </div>
              </div>

              <div className="turma-card-detalhes">
                <div className="turma-detalhe-item">
                  <CalendarDays size={16} color="#8ab8ae" />
                  <span>{turma.dias.join(' • ')}</span>
                </div>
                <div className="turma-detalhe-item">
                  <Clock size={16} color="#8ab8ae" />
                  <span>{turma.periodo}</span>
                </div>
                <div className="turma-detalhe-item">
                  <Users size={16} color="#8ab8ae" />
                  <span>{turma.professor}</span>
                </div>
                <div className="turma-detalhe-item">
                  <BookOpen size={16} color="#8ab8ae" />
                  <span>{turma.sala}</span>
                </div>
              </div>

              <div className="turma-card-progresso">
                <div className="turma-progresso-header">
                  <span>Progresso</span>
                  <span>{turma.presencas} de {turma.cargaHoraria} aulas</span>
                </div>
                <div className="turma-progresso-barra">
                  <div 
                    className="turma-progresso-preenchido"
                    style={{ 
                      width: `${turma.frequencia}%`,
                      backgroundColor: turma.cor
                    }}
                  />
                </div>
                <div className="turma-progresso-footer">
                  <span>✅ {turma.presencas} presenças</span>
                  <span>❌ {turma.faltas} faltas</span>
                </div>
              </div>

              <button 
                className="turma-card-btn"
                onClick={() => setTurmaSelecionada(turma.id === turmaSelecionada ? null : turma.id)}
              >
                Ver detalhes <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Turmas;