import React, { useState, useEffect } from 'react';
import { FiSearch, FiBell, FiChevronDown, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

function Header() {
  const [usuario, setUsuario] = useState(null);
  const [busca, setBusca] = useState('');
  const { tema, alternarTema } = useTheme();

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  // Pega as iniciais do nome
  const getIniciais = (nome) => {
    if (!nome) return '??';
    const partes = nome.trim().split(' ');
    if (partes.length === 1) return partes[0].substring(0, 2).toUpperCase();
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  };

  // Pega a foto do usuário (se tiver)
  const fotoPerfil = usuario?.foto;

  // Abre notificações
  const handleNotificacoesClick = () => {
    window.dispatchEvent(new CustomEvent('mudarTela', { detail: 'notificacoes' }));
  };

  // Abre perfil
  const handlePerfilClick = () => {
    window.dispatchEvent(new CustomEvent('mudarTela', { detail: 'perfil' }));
  };

  // Busca em tempo real (dispara evento global)
  const handleBusca = (valor) => {
    setBusca(valor);
    window.dispatchEvent(new CustomEvent('buscar', { detail: valor }));
  };

  return (
    <header className="header">
      <div className="header-search">
        <FiSearch className="search-icon" size={18} color="#00b4a0" />
        <input 
          type="text" 
          placeholder="Buscar turma, disciplina, aluno..." 
          value={busca}
          onChange={(e) => handleBusca(e.target.value)}
        />
      </div>

      <div className="header-right">
        <button 
          className={`header-tema-btn ${tema === 'escuro' ? 'escuro' : ''}`}
          onClick={alternarTema}
          title={tema === 'claro' ? 'Ativar modo escuro' : 'Ativar modo claro'}
        >
          {tema === 'claro' ? <FiMoon size={20} /> : <FiSun size={20} />}
        </button>

        <button 
          className="header-notificacao"
          onClick={handleNotificacoesClick}
          title="Ver notificações"
        >
          <FiBell size={20} color="#00b4a0" />
          <span className="notificacao-badge">3</span>
        </button>

        <div 
          className="header-perfil" 
          onClick={handlePerfilClick}
          style={{ cursor: 'pointer' }}
        >
          {/* SE TIVER FOTO, MOSTRA A FOTO, SENÃO AS INICIAIS */}
          {fotoPerfil ? (
            <img src={fotoPerfil} alt="Perfil" className="avatar avatar-img" />
          ) : (
            <div className="avatar">{getIniciais(usuario?.nome)}</div>
          )}
          <div className="perfil-info">
            <span className="perfil-nome">{usuario?.nome || 'Carregando...'}</span>
            <span className="perfil-cargo">
              {usuario?.turma ? `Aluno • ${usuario.turma}` : 'Aluno'}
            </span>
          </div>
          <FiChevronDown className="perfil-seta" size={16} color="#00b4a0" />
        </div>
      </div>
    </header>
  );
}

export default Header;