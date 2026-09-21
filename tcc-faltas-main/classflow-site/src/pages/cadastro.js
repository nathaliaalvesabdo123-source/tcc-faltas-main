import React, { useState } from 'react';
import './../App.css';

function Cadastro({ mudarTela }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [instituicao, setInstituicao] = useState('Sesi');
  const [turma, setTurma] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const turmas = [
    '1º Ano A',
    '1º Ano B',
    '2º Ano A',
    '2º Ano B',
    '3º Ano A',
    '3º Ano B'
  ];

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (!nome || !email || !senha || !confirmarSenha || !turma) {
      setErro('Preencha todos os campos!');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem!');
      return;
    }

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres!');
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch('http://localhost:3000/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nome, 
          email, 
          senha, 
          instituicao,
          turma
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSucesso('Cadastro realizado com sucesso!');
        setNome('');
        setEmail('');
        setSenha('');
        setConfirmarSenha('');
        setInstituicao('Sesi');
        setTurma('');
        setTimeout(() => {
          // Recarrega a página para forçar o reset das imagens
          window.location.href = '/';
        }, 1500);
      } else {
        setErro(data.erro || 'Erro ao cadastrar. Tente novamente.');
      }
    } catch (error) {
      setErro('Erro ao conectar com o servidor. Verifique se o backend está rodando.');
      console.error(error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ 
      backgroundImage: "url('/background-login.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
        maxWidth: '420px',
        width: '100%'
      }}>
        <h1 style={{ fontSize: '28px', color: '#00b4a0', textAlign: 'center' }}>Criar Conta</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '25px' }}>Preencha os dados abaixo para se cadastrar</p>

        {erro && (
          <div style={{ 
            background: '#fde8e8', 
            color: '#e53e3e', 
            padding: '12px 16px', 
            borderRadius: '10px', 
            marginBottom: '16px',
            fontSize: '14px',
            fontWeight: '500',
            border: '1px solid #f8d0d0'
          }}>
            {erro}
          </div>
        )}

        {sucesso && (
          <div style={{ 
            background: '#e8f8f5', 
            color: '#008f7d', 
            padding: '12px 16px', 
            borderRadius: '10px', 
            marginBottom: '16px',
            fontSize: '14px',
            fontWeight: '500',
            border: '1px solid #00b4a0'
          }}>
            {sucesso}
          </div>
        )}

        <form onSubmit={handleCadastro}>
          <input 
            type="text" 
            placeholder="Nome completo" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
            style={{ width: '100%', padding: '14px', marginBottom: '15px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '16px' }} 
          />
          
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '14px', marginBottom: '15px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '16px' }} 
          />
          
          <input 
            type="password" 
            placeholder="Senha (mínimo 6 caracteres)" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required 
            style={{ width: '100%', padding: '14px', marginBottom: '15px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '16px' }} 
          />
          
          <input 
            type="password" 
            placeholder="Confirmar senha" 
            value={confirmarSenha} 
            onChange={(e) => setConfirmarSenha(e.target.value)} 
            required 
            style={{ width: '100%', padding: '14px', marginBottom: '15px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '16px' }} 
          />

          <select 
            value={instituicao} 
            onChange={(e) => setInstituicao(e.target.value)} 
            required 
            style={{ width: '100%', padding: '14px', marginBottom: '15px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '16px', background: 'white' }}
          >
            <option value="Sesi">Sesi</option>
            <option value="Senai">Senai</option>
            <option value="Sesi/Senai">Sesi / Senai</option>
          </select>

          <select 
            value={turma} 
            onChange={(e) => setTurma(e.target.value)} 
            required 
            style={{ width: '100%', padding: '14px', marginBottom: '20px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '16px', background: 'white' }}
          >
            <option value="">Selecione sua turma</option>
            {turmas.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <button 
            type="submit" 
            disabled={carregando}
            style={{ 
              width: '100%', 
              padding: '14px', 
              background: carregando ? '#a0c4c0' : 'linear-gradient(135deg, #00b4a0, #008f7d)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '10px', 
              fontSize: '18px', 
              fontWeight: 'bold', 
              cursor: carregando ? 'not-allowed' : 'pointer',
              opacity: carregando ? 0.7 : 1
            }}
          >
            {carregando ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#555' }}>
          Já tem conta? <a href="#" onClick={(e) => { e.preventDefault(); mudarTela('login'); }} style={{ color: '#00b4a0', fontWeight: 'bold', textDecoration: 'none' }}>Faça login</a>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;