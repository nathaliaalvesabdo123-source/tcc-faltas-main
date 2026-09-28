import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  Bell, 
  User, 
  LogOut,
  PlusCircle,
  TrendingUp
} from 'lucide-react';

function Sidebar({ mudarTela }) {
  const [ativo, setAtivo] = useState('dashboard');  // ← MUDOU AQUI

  const menuItems = [
    { id: 'dashboard', icone: <LayoutDashboard size={20} />, label: 'Início' },  // ← MUDOU AQUI
    { id: 'frequencia', icone: <CalendarDays size={20} />, label: 'Frequência' },
    { id: 'turmas', icone: <Users size={20} />, label: 'Turmas' },
    { id: 'notificacoes', icone: <Bell size={20} />, label: 'Notificações' },
    { id: 'perfil', icone: <User size={20} />, label: 'Perfil' },
    { id: 'lancar-falta', icone: <PlusCircle size={20} />, label: 'Lançar Falta' },
    { id: 'simulacao', icone: <TrendingUp size={20} />, label: 'Simulação' },
  ];

  const handleClick = (id) => {
    setAtivo(id);
    mudarTela(id);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="/logo-classflow.png" alt="ClassFlow" className="sidebar-logo-img" />
        <span className="logo-class">Class</span><span className="logo-flow">Flow</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div key={item.id} className="sidebar-item-wrapper">
            <button
              className={`sidebar-item ${ativo === item.id ? 'ativo' : ''}`}
              onClick={() => handleClick(item.id)}
            >
              <span className="sidebar-icone">{item.icone}</span>
              {item.label}
            </button>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-item-wrapper">
          <button 
            className="sidebar-item sair"
            onClick={() => mudarTela('login')}
          >
            <span className="sidebar-icone"><LogOut size={20} /></span> Sair
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;