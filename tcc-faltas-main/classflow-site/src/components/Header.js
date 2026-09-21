import React, { useState } from 'react';
import { FiSearch, FiBell, FiChevronDown, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

function Header() {
  const [notificacoesAbertas, setNotificacoesAbertas] = useState(false);
  const { tema, alternarTema } = useTheme();

  return (
    <header className="header">
      <div className="header-search">
        <FiSearch className="search-icon" size={18} color="#00b4a0" />
        <input type="text" placeholder="Buscar turma, disciplina, aluno..." />
      </div>

      <div className="header-right">
    
<button 
  className="header-tema-btn"
  onClick={alternarTema}
  title={tema === 'claro' ? 'Ativar modo escuro' : 'Ativar modo claro'}
>
  {tema === 'claro' ? <FiMoon size={20} /> : <FiSun size={20} />}
</button>
        <button 
          className="header-notificacao"
          onClick={() => setNotificacoesAbertas(!notificacoesAbertas)}
        >
          <FiBell size={20} color="#00b4a0" />
          <span className="notificacao-badge">3</span>
        </button>

        <div className="header-perfil">
          <div className="avatar">AA</div>
          <div className="perfil-info">
            <span className="perfil-nome">Ana Alves</span>
            <span className="perfil-cargo">Aluno</span>
          </div>
          <FiChevronDown className="perfil-seta" size={16} color="#00b4a0" />
        </div>
      </div>
    </header>
  );
}

export default Header;