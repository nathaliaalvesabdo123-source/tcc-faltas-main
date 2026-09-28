import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Verifica se há uma preferência salva no localStorage
  const [tema, setTema] = useState(() => {
    const salvo = localStorage.getItem('tema');
    return salvo || 'claro';
  });

  useEffect(() => {
    localStorage.setItem('tema', tema);
    // Aplica a classe no body para estilos globais
    if (tema === 'escuro') {
      document.body.classList.add('tema-escuro');
    } else {
      document.body.classList.remove('tema-escuro');
    }
  }, [tema]);

  const alternarTema = () => {
    setTema(prev => prev === 'claro' ? 'escuro' : 'claro');
  };

  return (
    <ThemeContext.Provider value={{ tema, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}