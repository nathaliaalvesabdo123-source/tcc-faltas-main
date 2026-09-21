import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { 
  User, 
  Mail, 
  School, 
  CalendarDays, 
  Award, 
  Camera, 
  Edit2, 
  Save,
  LogOut, 
  CheckCircle, 
  XCircle, 
  Clock 
} from 'lucide-react';

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [dadosEditaveis, setDadosEditaveis] = useState({});
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      const user = JSON.parse(usuarioSalvo);
      setUsuario(user);
      setDadosEditaveis({
        nome: user.nome,
        email: user.email,
      });
    }
  }, []);

  const handleSave = () => {
    const usuarioAtualizado = { ...usuario, ...dadosEditaveis };
    localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
    setUsuario(usuarioAtualizado);
    setEditando(false);
    setMensagem({ texto: 'Perfil atualizado com sucesso!', tipo: 'sucesso' });
    setTimeout(() => setMensagem(null), 3000);
  };

  if (!usuario) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Carregando...</div>;
  }

  return (
    <>
      <Header />
      <div className="page-container">
        <div className="page-header">
          <h1>Meu Perfil</h1>
          <p>Gerencie suas informações pessoais</p>
        </div>

        {mensagem && (
          <div className={`mensagem ${mensagem.tipo}`}>
            {mensagem.tipo === 'sucesso' ? <CheckCircle size={20} /> : <XCircle size={20} />}
            <span>{mensagem.texto}</span>
          </div>
        )}

        <div className="perfil-grid">
          {/* COLUNA ESQUERDA */}
          <div className="perfil-coluna-esquerda">
            <div className="perfil-foto-card">
              <div className="perfil-foto-container">
                <div className="perfil-foto-placeholder">
                  <User size={48} color="#00b4a0" />
                </div>
                <button className="perfil-foto-btn" title="Alterar foto">
                  <Camera size={18} />
                </button>
              </div>
              <h2 className="perfil-nome-destaque">{usuario.nome}</h2>
              <p className="perfil-email-destaque">{usuario.email}</p>
              <span className="perfil-badge">{usuario.instituicao}</span>
            </div>

            <div className="perfil-stats-card">
              <div className="perfil-stat-item">
                <Award size={20} color="#00b4a0" />
                <div>
                  <span className="perfil-stat-valor">--</span>
                  <span className="perfil-stat-label">Frequência geral</span>
                </div>
              </div>
              <div className="perfil-stat-item">
                <Clock size={20} color="#00b4a0" />
                <div>
                  <span className="perfil-stat-valor">--</span>
                  <span className="perfil-stat-label">Faltas totais</span>
                </div>
              </div>
              <div className="perfil-stat-item">
                <School size={20} color="#00b4a0" />
                <div>
                  <span className="perfil-stat-valor">{usuario.turma || 'Não definida'}</span>
                  <span className="perfil-stat-label">Turma</span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA */}
          <div className="perfil-coluna-direita">
            <div className="perfil-dados-card">
              <div className="perfil-card-header">
                <h3>Dados pessoais</h3>
                {!editando ? (
                  <button className="perfil-edit-btn" onClick={() => setEditando(true)}>
                    <Edit2 size={16} /> Editar
                  </button>
                ) : (
                  <div className="perfil-edit-actions">
                    <button className="perfil-edit-btn cancelar" onClick={() => setEditando(false)}>
                      Cancelar
                    </button>
                    <button className="perfil-edit-btn salvar" onClick={handleSave}>
                      <Save size={16} /> Salvar
                    </button>
                  </div>
                )}
              </div>

              <div className="perfil-campos">
                <div className="perfil-campo">
                  <label><User size={16} className="campo-icon" /> Nome completo</label>
                  {editando ? (
                    <input 
                      type="text" 
                      value={dadosEditaveis.nome} 
                      onChange={(e) => setDadosEditaveis({...dadosEditaveis, nome: e.target.value})} 
                    />
                  ) : (
                    <p className="campo-valor">{usuario.nome}</p>
                  )}
                </div>

                <div className="perfil-campo">
                  <label><Mail size={16} className="campo-icon" /> E-mail</label>
                  {editando ? (
                    <input 
                      type="email" 
                      value={dadosEditaveis.email} 
                      onChange={(e) => setDadosEditaveis({...dadosEditaveis, email: e.target.value})} 
                    />
                  ) : (
                    <p className="campo-valor">{usuario.email}</p>
                  )}
                </div>

                <div className="perfil-campo">
                  <label><School size={16} className="campo-icon" /> Instituição</label>
                  <p className="campo-valor">{usuario.instituicao}</p>
                </div>

                <div className="perfil-campo">
                  <label><School size={16} className="campo-icon" /> Turma</label>
                  <p className="campo-valor">{usuario.turma || 'Não definida'}</p>
                </div>
              </div>

              <button 
                className="perfil-sair-btn" 
                onClick={() => { 
                  localStorage.removeItem('usuario'); 
                  window.location.href = '/'; 
                }}
              >
                <LogOut size={18} /> Sair da conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Perfil;