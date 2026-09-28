import React, { useState } from 'react';
import Header from '../components/Header';
import { 
  TrendingUp, 
  CalendarDays, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Clock,
  ArrowRight,
  Info,
  BookOpen,
  Award,
  BarChart3
} from 'lucide-react';

function Simulacao() {
  const [disciplina, setDisciplina] = useState('Matemática');
  const [faltasAtuais, setFaltasAtuais] = useState(3);
  const [faltasFuturas, setFaltasFuturas] = useState(0);
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const disciplinas = [
    { nome: 'Matemática', totalAulas: 40, faltas: 3 },
    { nome: 'Português', totalAulas: 36, faltas: 2 },
    { nome: 'História', totalAulas: 32, faltas: 4 },
    { nome: 'Desenvolvimento de Sistemas', totalAulas: 44, faltas: 1 },
    { nome: 'Física', totalAulas: 40, faltas: 5 },
  ];

  const disciplinasOpcoes = disciplinas.map(d => d.nome);

  const handleDisciplinaChange = (e) => {
    const nome = e.target.value;
    setDisciplina(nome);
    const disc = disciplinas.find(d => d.nome === nome);
    if (disc) {
      setFaltasAtuais(disc.faltas);
    }
    setResultado(null);
  };

  const handleFaltasFuturasChange = (e) => {
    const valor = parseInt(e.target.value) || 0;
    setFaltasFuturas(Math.max(0, valor));
    setResultado(null);
  };

  const simular = () => {
    setCarregando(true);
    setResultado(null);

    setTimeout(() => {
      const disc = disciplinas.find(d => d.nome === disciplina);
      const totalAulas = disc ? disc.totalAulas : 40;
      const faltasTotais = faltasAtuais + faltasFuturas;
      const presencas = totalAulas - faltasTotais;
      const frequencia = Math.round((presencas / totalAulas) * 100);
      const limiteMinimo = 75; // 75% é o mínimo para aprovação
      const situacao = frequencia >= limiteMinimo ? 'aprovado' : 'reprovado';

      setResultado({
        totalAulas,
        faltasTotais,
        presencas,
        frequencia,
        limiteMinimo,
        situacao,
        faltasFuturas,
        faltasAtuais,
      });
      setCarregando(false);
    }, 800);
  };

  const limparSimulacao = () => {
    setResultado(null);
    setFaltasFuturas(0);
  };

  return (
    <>
      <Header />
      <div className="page-container">
        <div className="page-header">
          <div className="page-header-left">
            <h1>Simulação de Faltas</h1>
            <p>Veja como faltas futuras podem impactar sua frequência</p>
          </div>
        </div>

        <div className="simulacao-grid">
          {/* CARD DO FORMULÁRIO */}
          <div className="simulacao-form-card">
            <div className="form-card-header">
              <div className="form-card-icon">
                <TrendingUp size={24} color="#00b4a0" />
              </div>
              <div>
                <h3>Simular faltas</h3>
                <p>Calcule o risco de reprovação por falta</p>
              </div>
            </div>

            <div className="simulacao-form">
              <div className="form-group">
                <label>
                  <BookOpen size={18} className="form-icon" />
                  Disciplina <span className="required">*</span>
                </label>
                <select
                  value={disciplina}
                  onChange={handleDisciplinaChange}
                >
                  {disciplinasOpcoes.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <XCircle size={18} className="form-icon" />
                    Faltas atuais
                  </label>
                  <input
                    type="number"
                    value={faltasAtuais}
                    readOnly
                    className="campo-readonly"
                  />
                </div>

                <div className="form-group">
                  <label>
                    <AlertCircle size={18} className="form-icon" />
                    Faltas futuras
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={faltasFuturas}
                    onChange={handleFaltasFuturasChange}
                    placeholder="0"
                  />
                </div>
              </div>

              <button 
                className="btn-simular"
                onClick={simular}
                disabled={carregando}
              >
                {carregando ? (
                  <>Carregando...</>
                ) : (
                  <>
                    <BarChart3 size={18} />
                    Simular
                  </>
                )}
              </button>

              <button 
                className="btn-limpar"
                onClick={limparSimulacao}
                disabled={!resultado}
              >
                Limpar simulação
              </button>
            </div>
          </div>

          {/* CARD DO RESULTADO */}
          <div className="simulacao-resultado-card">
            <div className="resultado-header">
              <h3>Resultado da simulação</h3>
              {resultado && (
                <span className={`resultado-status ${resultado.situacao}`}>
                  {resultado.situacao === 'aprovado' ? (
                    <CheckCircle size={16} />
                  ) : (
                    <XCircle size={16} />
                  )}
                  {resultado.situacao === 'aprovado' ? 'Aprovado' : 'Reprovado'}
                </span>
              )}
            </div>

            {resultado ? (
              <div className="resultado-content">
                <div className="resultado-frequencia">
                  <div className="frequencia-circular">
                    <div className="frequencia-circle">
                      <span className="frequencia-valor">{resultado.frequencia}%</span>
                      <span className="frequencia-label">Frequência</span>
                    </div>
                  </div>
                  <div className="frequencia-detalhes">
                    <div className="detalhe-item">
                      <span className="detalhe-label">Total de aulas</span>
                      <span className="detalhe-valor">{resultado.totalAulas}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">Faltas totais</span>
                      <span className="detalhe-valor">{resultado.faltasTotais}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">Faltas atuais</span>
                      <span className="detalhe-valor">{resultado.faltasAtuais}</span>
                    </div>
                    <div className="detalhe-item">
                      <span className="detalhe-label">Faltas futuras</span>
                      <span className="detalhe-valor">{resultado.faltasFuturas}</span>
                    </div>
                    <div className="detalhe-item destaque">
                      <span className="detalhe-label">Limite mínimo</span>
                      <span className="detalhe-valor">{resultado.limiteMinimo}%</span>
                    </div>
                  </div>
                </div>

                <div className="resultado-mensagem">
                  {resultado.situacao === 'aprovado' ? (
                    <div className="mensagem-sucesso">
                      <CheckCircle size={24} color="#00b4a0" />
                      <div>
                        <strong>Você está dentro do limite!</strong>
                        <p>Com {resultado.faltasFuturas} falta(s) futura(s), sua frequência seria de {resultado.frequencia}%, 
                        acima do limite mínimo de {resultado.limiteMinimo}%.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="mensagem-risco">
                      <XCircle size={24} color="#e06060" />
                      <div>
                        <strong>Alerta de reprovação!</strong>
                        <p>Com {resultado.faltasFuturas} falta(s) futura(s), sua frequência seria de {resultado.frequencia}%, 
                        abaixo do limite mínimo de {resultado.limiteMinimo}%.</p>
                        <p className="dica">⚠️ Procure a coordenação para regularizar sua situação.</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="resultado-barra">
                  <div className="barra-label">
                    <span>Frequência atual: {100 - (resultado.faltasAtuais / resultado.totalAulas * 100).toFixed(0)}%</span>
                    <span>Frequência simulada: {resultado.frequencia}%</span>
                  </div>
                  <div className="barra-container">
                    <div 
                      className="barra-preenchida"
                      style={{ 
                        width: `${resultado.frequencia}%`,
                        backgroundColor: resultado.situacao === 'aprovado' ? '#00b4a0' : '#e06060'
                      }}
                    />
                    <div 
                      className="barra-limite"
                      style={{ left: `${resultado.limiteMinimo}%` }}
                    />
                  </div>
                  <div className="barra-legenda">
                    <span>0%</span>
                    <span>Limite: {resultado.limiteMinimo}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="resultado-vazio">
                <Info size={48} color="#a0aec0" />
                <p>Preencha os dados e clique em "Simular"</p>
                <span>Veja como faltas futuras impactam sua frequência</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Simulacao;