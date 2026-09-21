import React from 'react';
import Sidebar from '../components/Sidebar';

function LayoutComSidebar({ children, mudarTela }) {
  return (
    <div 
      className="dashboard-page"
      style={{
        backgroundImage: `url('/background-login.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        display: 'flex',
      }}
    >
      {/* SIDEBAR FIXA - Aparece em todas as telas */}
      <Sidebar mudarTela={mudarTela} />
      
      {/* CONTEÚDO QUE MUDA - Cada tela coloca o seu aqui */}
      <div className="dashboard-main">
        {children}
      </div>
    </div>
  );
}

export default LayoutComSidebar;