import React, { useState } from 'react';
import Header from '../components/Header';
import { 
  Bell, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  XCircle,
  Filter,
  Clock
} from 'lucide-react';

function Notificacoes() {
  const [filtro, setFiltro] = useState('todas');

  // Dados mockados (depois vem do backend)
  const notificacoes = [
    { 
      id: 1, 
      tipo: 'alerta', 
      mensagem: 'Você está com 20% de faltas em Matemática. Atenção!', 
      data: '2025-08-15T08:30:00', 
      lida: false,
      link: '/frequencia'
    },
    { 
      id: 2, 
      tipo: 'informativo', 
      mensagem: 'A prova de Português foi remarcada para o dia 20/08.', 
      data: '2025-08-14T14:20:00', 
      lida: false,
      link: null
    },
    { 
      id: 3, 
      tipo: 'alerta', 
      mensagem: 'Você atingiu 25% de faltas em Física. Procure a coordenação.', 
      data: '2025-08-12T09:15:00', 
      lida: true,
      link: '/frequencia'
    },
    { 
      id: 4, 
      tipo: 'informativo', 
      mensagem: 'Aulas normais na próxima semana. Confira o calendário.', 
      data: '2025-08-10T16:00:00', 
      lida: true,
      link: null
    },
    { 
      id: 5, 
      tipo: 'alerta', 
      mensagem: 'Você está com 18% de faltas em Química. Fique atento!', 
      data: '2025-08-08T07:45:00', 
      lida: false,
      link: '/frequencia'
    },
    { 
      id: 6, 
      tipo: 'sucesso', 
      mensagem: 'Sua falta em História foi justificada com sucesso.', 
      data: '2025-08-07T11:30:00', 
      lida: true,
      link: null
    },
  ];

  const notificacoesFiltradas = notificacoes.filter(not => {
    if (filtro === 'todas') return true;
    if (filtro === 'nao-lidas') return !not.lida;
    if (filtro === 'lidas') return not.lida;
    return true;
  });

  const getIcon = (tipo) => {
    switch (tipo) {
      case 'alerta':
        return <AlertCircle size={20} color="#e53e3e" />;
      case 'informativo':
        return <Info size={20} color="#3182ce" />;
      case 'sucesso':
        return <CheckCircle size={20} color="#00b4a0" />;
      default:
        return <Bell size={20} color="#4a5568" />;
    }
  };

  const getTipoLabel = (tipo) => {
    switch (tipo) {
      case 'alerta': return 'Alerta';
      case 'informativo': return 'Informativo';
      case 'sucesso': return 'Sucesso';
      default: return 'Notificação';
    }
  };

  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(ontem.getDate() - 1);

    if (data.toDateString() === hoje.toDateString()) {
      return `Hoje às ${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')}`;
    } else if (data.toDateString() === ontem.toDateString()) {
      return `Ontem às ${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')}`;
    } else {
      return `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth()+1).toString().padStart(2, '0')}/${data.getFullYear()}`;
    }
  };

  const contarNaoLidas = notificacoes.filter(n => !n.lida).length;

  return (
    <>
      <Header />
      <div className="page-container">
        <div className="page-header">
          <div className="page-header-left">
            <h1>Notificações</h1>
            <p>Alertas e informativos sobre sua frequência</p>
          </div>
          <div className="page-header-right">
            {contarNaoLidas > 0 && (
              <span className="badge-notificacoes">
                <Bell size={16} />
                {contarNaoLidas} novas
              </span>
            )}
          </div>
        </div>

        {/* FILTROS */}
        <div className="filtros-container">
          <div className="filtros-botoes">
            <button 
              className={`filtro-btn ${filtro === 'todas' ? 'ativo' : ''}`}
              onClick={() => setFiltro('todas')}
            >
              Todas
            </button>
            <button 
              className={`filtro-btn ${filtro === 'nao-lidas' ? 'ativo' : ''}`}
              onClick={() => setFiltro('nao-lidas')}
            >
              Não lidas {contarNaoLidas > 0 && `(${contarNaoLidas})`}
            </button>
            <button 
              className={`filtro-btn ${filtro === 'lidas' ? 'ativo' : ''}`}
              onClick={() => setFiltro('lidas')}
            >
              Lidas
            </button>
          </div>
        </div>

        {/* LISTA DE NOTIFICAÇÕES */}
        <div className="notificacoes-lista">
          {notificacoesFiltradas.length === 0 ? (
            <div className="empty-state">
              <Bell size={48} color="#a0aec0" />
              <p>Nenhuma notificação</p>
              <span>Você está em dia!</span>
            </div>
          ) : (
            notificacoesFiltradas.map((not) => (
              <div 
                key={not.id} 
                className={`notificacao-item ${!not.lida ? 'nao-lida' : ''}`}
              >
                <div className="notificacao-icon">
                  {getIcon(not.tipo)}
                </div>

                <div className="notificacao-conteudo">
                  <div className="notificacao-header">
                    <span className="notificacao-tipo">{getTipoLabel(not.tipo)}</span>
                    {!not.lida && <span className="notificacao-badge">Nova</span>}
                  </div>
                  <p>{not.mensagem}</p>
                  <div className="notificacao-footer">
                    <span className="notificacao-data">
                      <Clock size={14} />
                      {formatarData(not.data)}
                    </span>
                    {not.link && (
                      <a href={not.link} className="notificacao-link">
                        Ver detalhes →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Notificacoes;