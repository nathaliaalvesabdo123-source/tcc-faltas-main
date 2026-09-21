import React, { useState } from 'react';
import './../App.css';
import { 
  FaEnvelope, 
  FaLock, 
  FaChartLine, 
  FaBell, 
  FaClipboardCheck,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';

function Login({ mudarTela }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    if (!email || !senha) {
      setErro('Preencha todos os campos!');
      setCarregando(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // Salva os dados do usuário no localStorage
        localStorage.setItem('usuario', JSON.stringify(data));
        mudarTela('dashboard');
      } else {
        setErro(data.erro || 'Email ou senha inválidos');
      }
    } catch (error) {
      setErro('Erro ao conectar com o servidor. Verifique se o backend está rodando.');
      console.error(error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div 
      className="login-page"
      style={{
        backgroundImage: `url('/background-login.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}
    >
      <div className="login-wrapper">
        {/* ========== LADO ESQUERDO ========== */}
        <div className="login-left">
          <div className="brand">
            <div className="logo-container">
              <img src="/logo1.png" alt="ClassFlow" className="logo-icon-img" />
              <span className="logo-text"></span>
            </div>
          </div>

          <div className="hero-content">
            <h1 className="hero-title">
              Juntos por uma <span className="highlight">melhor jornada escolar</span>
            </h1>
            <p className="hero-description">
              Acompanhe a frequência, visualize o desempenho e receba alertas. Tudo em um só lugar.
            </p>

            <div className="features-grid">
              <div className="feature-item">
                <FaClipboardCheck className="feature-icon" />
                <span>Controle de faltas</span>
              </div>
              <div className="feature-item">
                <FaChartLine className="feature-icon" />
                <span>Relatórios e gráficos</span>
              </div>
              <div className="feature-item">
                <FaBell className="feature-icon" />
                <span>Alertas e notificações</span>
              </div>
            </div>
          </div>

          <div className="hero-footer">
            <span>✨ Mais presença, mais conquistas!</span>
          </div>
        </div>

        {/* ========== LADO DIREITO ========== */}
        <div className="login-right">
          <div className="login-card">
            <div className="card-logo">
              <span className="card-logo-text">ClassFlow</span>
            </div>

            <h2 className="card-title">Bem-vindo de volta!</h2>
            <p className="card-subtitle">Faça login para acessar sua conta.</p>

            {/* MENSAGEM DE ERRO */}
            {erro && (
              <div className="mensagem-login erro">
                <span>{erro}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  placeholder="Usuário ou e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <FaLock className="input-icon" />
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                  {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button type="submit" className="login-btn" disabled={carregando}>
                {carregando ? 'Entrando...' : 'Entrar →'}
              </button>

              <div className="options-row">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={lembrar}
                    onChange={() => setLembrar(!lembrar)}
                  />
                  Lembrar meu login
                </label>
                <a href="#" className="forgot-password">Esqueci minha senha?</a>
              </div>

              <p className="signup-link">
                Não tem conta ainda? <a href="#" onClick={(e) => { e.preventDefault(); mudarTela('cadastro'); }}>Crie agora</a>
              </p>

              <div className="divider">
                <span>ou</span>
              </div>

              <button type="button" className="google-btn">
                <img src="/google-logo.png" alt="Google" className="google-logo-img" />
                Entrar com o Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;