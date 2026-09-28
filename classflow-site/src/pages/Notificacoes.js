import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Bell, AlertCircle, CheckCircle, Info, Clock, XCircle } from 'lucide-react';

function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [filtro, setFiltro] = useState('todas');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      const user = JSON.parse(usuarioSalvo);
      buscarNotificacoes(user.id);
    }
  }, []);

  const buscarNotificacoes = async (usuarioId) => {
    try {
      const response = await fetch(`http://localhost:3000/notificacoes/${usuarioId}`);
      const data = await response.json();
      setNotificacoes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
    } finally {
      setCarregando(false);
    }
  };

  const marcarComoLida = async (id) => {
    try {
      await fetch(`http://localhost:3000/notificacoes/${id}/lida`, { method: 'PUT' });
      setNotificacoes(notificacoes.map(n => n.id === id ? { ...n, lida: 1 } : n));
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const notificacoesFiltradas = notificacoes.filter(n => {
    if (filtro === 'todas') return true;
    if (filtro === 'nao-lidas') return !n.lida;
    if (filtro === 'lidas') return n.lida;
    return true;
  });

  const getIcon = (tipo) => {
    switch (tipo) {
      case 'reprovacao': return <XCircle size={20} color="#e53e3e" />;
      case 'alerta': return <AlertCircle size={20} color="#ed8936" />;
      case 'registro': return <Info size={20} color="#3182ce" />;
      case 'sucesso': return <CheckCircle size={20} color="#00b4a0" />;
      default: return <Bell size={20} color="#718096" />;
    }
  };

  const getTipoLabel = (tipo) => {
    switch (tipo) {
      case 'reprovacao': return 'Reprovação';
      case 'alerta': return 'Alerta';
      case 'registro': return 'Registro';
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
      return `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`;
    }
  };

  const contarNaoLidas = notificacoes.filter(n => !n.lida).length;

  if (carregando) {
    return (
      <>
        <Header />
        <div className="page-container">
          <div className="page-header">
            <h1>Notificações</h1>
            <p>Carregando...</p>
          </div>
        </div>
      </>
    );
  }

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
                onClick={() => !not.lida && marcarComoLida(not.id)}
                style={{ cursor: !not.lida ? 'pointer' : 'default' }}
              >
                <div className="notificacao-icon">
                  {getIcon(not.tipo)}
                </div>

                <div className="notificacao-conteudo">
                  <div className="notificacao-header">
                    <span className="notificacao-tipo">{getTipoLabel(not.tipo)}</span>
                
                  </div>
                  <p><strong>{not.titulo}</strong></p>
                  <p>{not.mensagem}</p>
                  <div className="notificacao-footer">
                    <span className="notificacao-data">
                      <Clock size={14} />
                      {formatarData(not.data_criacao)}
                    </span>
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