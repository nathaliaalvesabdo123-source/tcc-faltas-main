import React, { useState } from 'react';
import './App.css';
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import LayoutComSidebar from './pages/LayoutComSidebar';
import Dashboard from './pages/Dashboard';
import LancarFalta from './pages/LancarFalta';
import Simulacao from './pages/Simulacao';
import Frequencia from './pages/Frequencia';
import Turmas from './pages/Turmas';
import Notificacoes from './pages/Notificacoes';
import Perfil from './pages/Perfil';

function App() {
  const [tela, setTela] = useState('login');

  // Mapeamento de telas para o conteúdo que vai dentro da Sidebar
  const telasComSidebar = {
    dashboard: <Dashboard />,
    'lancar-falta': <LancarFalta />,
    simulacao: <Simulacao />,
    frequencia: <Frequencia />,
    turmas: <Turmas />,
    notificacoes: <Notificacoes />,
    perfil: <Perfil />,
  };

  return (
    <>
      {/* Telas SEM SIDEBAR */}
      {tela === 'login' && <Login mudarTela={setTela} />}
      {tela === 'cadastro' && <Cadastro mudarTela={setTela} />}

      {/* Telas COM SIDEBAR */}
      {telasComSidebar[tela] && (
        <LayoutComSidebar mudarTela={setTela}>
          {telasComSidebar[tela]}
        </LayoutComSidebar>
      )}
    </>
  );
}

export default App;