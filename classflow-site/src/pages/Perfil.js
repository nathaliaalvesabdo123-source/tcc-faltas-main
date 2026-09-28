import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { 
  User, 
  Mail, 
  School, 
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
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [stats, setStats] = useState({ frequenciaGeral: 0, faltasTotais: 0 });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      const user = JSON.parse(usuarioSalvo);
      setUsuario(user);
      setDadosEditaveis({
        nome: user.nome,
        email: user.email,
      });
      buscarUsuario(user.id);
      buscarStats(user.id);
    }
  }, []);

  // Busca os dados atualizados do usuário (com foto) no backend
  const buscarUsuario = async (usuarioId) => {
    try {
      const response = await fetch(`http://localhost:3000/usuario/${usuarioId}`);
      const data = await response.json();
      if (data.foto) {
        setFotoPerfil(data.foto);
        // Atualiza o localStorage com a foto pra aparecer no header
        const usuarioAtualizado = { ...usuario, foto: data.foto };
        localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
        setUsuario(usuarioAtualizado);
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
  };

  // Busca a frequência geral e as faltas totais
  const buscarStats = async (usuarioId) => {
    try {
      const response = await fetch(`http://localhost:3000/frequencia-completa/${usuarioId}`);
      const data = await response.json();

      let totalAulas = 0;
      let totalFaltas = 0;

      data.instituicoes?.forEach(inst => {
        totalAulas += inst.total_aulas || 0;
        totalFaltas += inst.total_faltas || 0;
      });

      const presencas = totalAulas - totalFaltas;
      const frequenciaGeral = totalAulas > 0 ? Math.round((presencas / totalAulas) * 100) : 0;

      setStats({ frequenciaGeral, faltasTotais: totalFaltas });
    } catch (error) {
      console.error('Erro ao buscar stats:', error);
    }
  };

  const handleFotoClick = () => {
    fileInputRef.current.click();
  };

  const handleFotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setMensagem({ texto: 'A imagem deve ter no máximo 2MB', tipo: 'erro' });
      setTimeout(() => setMensagem(null), 3000);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;
      setFotoPerfil(base64);

      // Salva no backend
      try {
        const response = await fetch(`http://localhost:3000/usuario/foto/${usuario.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ foto: base64 }),
        });

        if (response.ok) {
          // Atualiza o localStorage com a nova foto
          const usuarioAtualizado = { ...usuario, foto: base64 };
          localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
          setUsuario(usuarioAtualizado);

          setMensagem({ texto: 'Foto atualizada com sucesso!', tipo: 'sucesso' });
        } else {
          setMensagem({ texto: 'Erro ao salvar foto no servidor', tipo: 'erro' });
        }
      } catch (error) {
        setMensagem({ texto: 'Erro ao salvar foto', tipo: 'erro' });
      }

      setTimeout(() => setMensagem(null), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const usuarioAtualizado = { ...usuario, ...dadosEditaveis };
    localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
    setUsuario(usuarioAtualizado);
    setEditando(false);
    setMensagem({ texto: 'Perfil atualizado com sucesso!', tipo: 'sucesso' });
    setTimeout(() => setMensagem(null), 3000);
  };

  const handleSair = () => {
    localStorage.removeItem('usuario');
    window.location.href = '/';
  };

  if (!usuario) {
    return (
      <>
        <Header />
        <div className="page-container">
          <div style={{ padding: '40px', textAlign: 'center' }}>Carregando...</div>
        </div>
      </>
    );
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
                {fotoPerfil ? (
                  <img src={fotoPerfil} alt="Perfil" className="perfil-foto" />
                ) : (
                  <div className="perfil-foto-placeholder">
                    <User size={48} color="#00b4a0" />
                  </div>
                )}
                <button 
                  className="perfil-foto-btn"
                  onClick={handleFotoClick}
                  title="Alterar foto"
                  type="button"
                >
                  <Camera size={18} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFotoChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
              <h2 className="perfil-nome-destaque">{usuario.nome}</h2>
              <p className="perfil-email-destaque">{usuario.email}</p>
              <span className="perfil-badge">{usuario.instituicao}</span>
            </div>

            <div className="perfil-stats-card">
              <div className="perfil-stat-item">
                <Award size={20} color="#00b4a0" />
                <div>
                  <span className="perfil-stat-valor">{stats.frequenciaGeral}%</span>
                  <span className="perfil-stat-label">Frequência geral</span>
                </div>
              </div>
              <div className="perfil-stat-item">
                <Clock size={20} color="#00b4a0" />
                <div>
                  <span className="perfil-stat-valor">{stats.faltasTotais}</span>
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

              <button className="perfil-sair-btn" onClick={handleSair}>
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