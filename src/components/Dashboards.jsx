import { useState, useEffect, useRef } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import Reveal from './Reveal';
import Section from './Section';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  ArcElement, 
  BarElement,
  Filler, 
  Tooltip, 
  Legend
);

export default function Dashboards() {
  const [activeTab, setActiveTab] = useState('mensagens');
  const [isHovering, setIsHovering] = useState(null);
  
  // Dados para os gráficos
  const [messagesData, setMessagesData] = useState({
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Mensagens Enviadas',
        data: [120, 190, 300, 250, 270, 400, 350],
        borderColor: '#25D366',
        backgroundColor: 'rgba(37,211,102,0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  });

  const [responseData, setResponseData] = useState({
    labels: ['Respondidas', 'Pendentes', 'Expiradas'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: ['#25D366', '#FFD166', '#EF476F'],
        borderWidth: 0,
      },
    ],
  });

  const [conversionData, setConversionData] = useState({
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Taxa de Conversão (%)',
        data: [4.5, 5.2, 4.8, 6.5, 7.2, 8.4],
        backgroundColor: '#D90429',
      },
    ],
  });

  // Estado para métricas dinâmicas
  const [stats, setStats] = useState({
    mensagens: [
      { label: 'Mensagens', value: '1,543', growth: '+12%', rawValue: 1543 },
      { label: 'Abertas', value: '1,207', growth: '+8%', rawValue: 1207 },
      { label: 'Taxa', value: '78%', growth: '+2%', rawValue: 78 },
    ],
    respostas: [
      { label: 'Respondidas', value: '65%', growth: '+5%', rawValue: 65 },
      { label: 'Tempo Médio', value: '45min', growth: '-10%', rawValue: 45 },
      { label: 'Satisfação', value: '4.8/5', growth: '+0.2', rawValue: 4.8 },
    ],
    conversoes: [
      { label: 'Conversões', value: '304', growth: '+24%', rawValue: 304 },
      { label: 'Valor Médio', value: 'R$175', growth: '+12%', rawValue: 175 },
      { label: 'ROI', value: '320%', growth: '+15%', rawValue: 320 },
    ]
  });

  // Referências para os gráficos
  const lineChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  const barChartRef = useRef(null);
  
  // Função para atualizar dados de forma dinâmica
  useEffect(() => {
    // Atualiza dados de mensagens a cada 5 segundos
    const messagesInterval = setInterval(() => {
      if (activeTab === 'mensagens') {
        // Atualizando dados do gráfico de linha
        setMessagesData(prev => {
          const newData = [...prev.datasets[0].data];
          newData.shift();
          newData.push(Math.floor(Math.random() * 200) + 250);
          
          return {
            ...prev,
            datasets: [{
              ...prev.datasets[0],
              data: newData
            }]
          };
        });
        
        // Atualiza estatísticas de mensagens
        setStats(prev => {
          const mensagensUpdate = [...prev.mensagens];
          const novasMensagens = Math.floor(Math.random() * 50) + 10;
          const novasAbertas = Math.floor(Math.random() * 40) + 8;
          
          mensagensUpdate[0].rawValue += novasMensagens;
          mensagensUpdate[0].value = mensagensUpdate[0].rawValue.toLocaleString();
          
          mensagensUpdate[1].rawValue += novasAbertas;
          mensagensUpdate[1].value = mensagensUpdate[1].rawValue.toLocaleString();
          
          // Calcula nova taxa
          const novaTaxa = Math.min(Math.round((mensagensUpdate[1].rawValue / mensagensUpdate[0].rawValue) * 100), 100);
          mensagensUpdate[2].rawValue = novaTaxa;
          mensagensUpdate[2].value = `${novaTaxa}%`;
          
          return {
            ...prev,
            mensagens: mensagensUpdate
          };
        });
      }
    }, 5000);

    // Atualiza dados de respostas a cada 7 segundos
    const responsesInterval = setInterval(() => {
      if (activeTab === 'respostas') {
        // Atualizando dados do gráfico de donut
        setResponseData(prev => {
          const respondidas = Math.floor(Math.random() * 10) + 60;
          const pendentes = Math.floor(Math.random() * 10) + 20;
          const expiradas = 100 - respondidas - pendentes;
          
          return {
            ...prev,
            datasets: [{
              ...prev.datasets[0],
              data: [respondidas, pendentes, expiradas]
            }]
          };
        });
        
        // Atualiza estatísticas de respostas
        setStats(prev => {
          const respostasUpdate = [...prev.respostas];
          
          // Taxa de resposta
          const novaResponsasTaxa = Math.min(respostasUpdate[0].rawValue + (Math.random() < 0.7 ? 1 : -1), 100);
          respostasUpdate[0].rawValue = novaResponsasTaxa;
          respostasUpdate[0].value = `${novaResponsasTaxa}%`;
          
          // Tempo médio
          const novoTempoMedio = Math.max(respostasUpdate[1].rawValue + (Math.random() < 0.5 ? 2 : -3), 30);
          respostasUpdate[1].rawValue = novoTempoMedio;
          respostasUpdate[1].value = `${novoTempoMedio}min`;
          respostasUpdate[1].growth = novoTempoMedio < 45 ? '-' + Math.abs(45 - novoTempoMedio) + '%' : '+' + Math.abs(novoTempoMedio - 45) + '%';
          
          return {
            ...prev,
            respostas: respostasUpdate
          };
        });
      }
    }, 7000);

    // Atualiza dados de conversões a cada 8 segundos
    const conversionsInterval = setInterval(() => {
      if (activeTab === 'conversoes') {
        // Atualizando dados do gráfico de barras
        setConversionData(prev => {
          const newData = [...prev.datasets[0].data];
          for (let i = 0; i < newData.length; i++) {
            if (Math.random() > 0.7) {
              newData[i] = parseFloat((newData[i] + (Math.random() * 0.5)).toFixed(1));
            }
          }
          
          return {
            ...prev,
            datasets: [{
              ...prev.datasets[0],
              data: newData
            }]
          };
        });
        
        // Atualiza estatísticas de conversões
        setStats(prev => {
          const conversoesUpdate = [...prev.conversoes];
          
          // Número de conversões
          const novasConversoes = conversoesUpdate[0].rawValue + Math.floor(Math.random() * 5);
          conversoesUpdate[0].rawValue = novasConversoes;
          conversoesUpdate[0].value = novasConversoes.toString();
          
          // Valor médio
          const novoValorMedio = Math.round(conversoesUpdate[1].rawValue * (1 + (Math.random() * 0.04 - 0.02)));
          conversoesUpdate[1].rawValue = novoValorMedio;
          conversoesUpdate[1].value = `R$${novoValorMedio}`;
          
          return {
            ...prev,
            conversoes: conversoesUpdate
          };
        });
      }
    }, 8000);

    return () => {
      clearInterval(messagesInterval);
      clearInterval(responsesInterval);
      clearInterval(conversionsInterval);
    };
  }, [activeTab]);

  // Interatividade do dashboard
  const handleDataPointClick = (index) => {
    if (activeTab === 'mensagens') {
      // Destacar um ponto de dados específico
      const chart = lineChartRef.current;
      if (chart) {
        const datasetIndex = 0;
        chart.setActiveElements([{ datasetIndex, index }]);
        chart.update();
        
        setTimeout(() => {
          chart.setActiveElements([]);
          chart.update();
        }, 1000);
      }
    }
  };

  // Opções para os gráficos
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 0.3,
        to: 0.4,
        loop: true
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#b3b3b3',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#b3b3b3',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#f5f5f5',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Enviadas: ${context.raw}`;
          }
        }
      }
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        handleDataPointClick(elements[0].index);
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#f5f5f5',
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true
    },
    cutout: '70%'
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#b3b3b3',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#b3b3b3',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#f5f5f5',
        },
      },
    },
    animation: {
      duration: 2000
    }
  };

  return (
    <Section className="dashboards gradient-section">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Seu Painel de Controle</h2>
          <p className="campaign-subtitle">
            Monitore suas campanhas, mensagens e resultados em tempo real
          </p>
        </Reveal>

        {/* Tabs de navegação */}
        <Reveal delay={0.1}>
          <div className="dashboard-tabs">
            <button 
              className={`tab-button ${activeTab === 'mensagens' ? 'active' : ''}`}
              onClick={() => setActiveTab('mensagens')}
            >
              <span className="tab-icon">📊</span> Mensagens
            </button>
            <button 
              className={`tab-button ${activeTab === 'respostas' ? 'active' : ''}`}
              onClick={() => setActiveTab('respostas')}
            >
              <span className="tab-icon">📱</span> Respostas
            </button>
            <button 
              className={`tab-button ${activeTab === 'conversoes' ? 'active' : ''}`}
              onClick={() => setActiveTab('conversoes')}
            >
              <span className="tab-icon">💰</span> Conversões
            </button>
          </div>
        </Reveal>

        {/* Conteúdo das tabs */}
        <div className="tab-content">
          {activeTab === 'mensagens' && (
            <div className="dashboard-grid">
              <Reveal delay={0.2}>
                <motion.div 
                  className="dashboard-card"
                  whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}
                  onHoverStart={() => setIsHovering('mensagens')}
                  onHoverEnd={() => setIsHovering(null)}
                >
                  <h3>
                    <span className="dashboard-icon">📈</span>
                    Desempenho de Mensagens
                    <span className="dashboard-update-badge">
                      <span className="pulse-dot"></span> Atualização em tempo real
                    </span>
                  </h3>
                  <div className="chart-container">
                    <Line 
                      data={messagesData} 
                      options={lineOptions} 
                      ref={lineChartRef}
                    />
                  </div>
                  <div className="stats-row">
                    {stats.mensagens.map((stat, index) => (
                      <motion.div 
                        className="stat-item" 
                        key={index}
                        whileHover={{ y: -3, scale: 1.05 }}
                      >
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                        <div className={`stat-growth ${stat.growth.startsWith('+') ? 'positive' : 'negative'}`}>
                          {stat.growth}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="dashboard-interaction-hint">
                    <span>Clique nos pontos do gráfico para detalhes</span>
                  </div>
                </motion.div>
              </Reveal>
            </div>
          )}
          
          {activeTab === 'respostas' && (
            <div className="dashboard-grid">
              <Reveal delay={0.2}>
                <motion.div 
                  className="dashboard-card"
                  whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}
                  onHoverStart={() => setIsHovering('respostas')}
                  onHoverEnd={() => setIsHovering(null)}
                >
                  <h3>
                    <span className="dashboard-icon">🔄</span>
                    Status de Respostas
                    <span className="dashboard-update-badge">
                      <span className="pulse-dot"></span> Atualização em tempo real
                    </span>
                  </h3>
                  <div className="chart-container doughnut-container">
                    <Doughnut 
                      data={responseData} 
                      options={doughnutOptions} 
                      ref={doughnutChartRef}
                    />
                    <div className="doughnut-center-text">
                      {responseData.datasets[0].data[0]}%
                      <div className="doughnut-center-label">Respondidas</div>
                    </div>
                  </div>
                  <div className="stats-row">
                    {stats.respostas.map((stat, index) => (
                      <motion.div 
                        className="stat-item" 
                        key={index}
                        whileHover={{ y: -3, scale: 1.05 }}
                      >
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                        <div className={`stat-growth ${stat.growth.startsWith('+') ? 'positive' : stat.growth.startsWith('-') ? 'negative' : ''}`}>
                          {stat.growth}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            </div>
          )}
          
          {activeTab === 'conversoes' && (
            <div className="dashboard-grid">
              <Reveal delay={0.2}>
                <motion.div 
                  className="dashboard-card"
                  whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}
                  onHoverStart={() => setIsHovering('conversoes')}
                  onHoverEnd={() => setIsHovering(null)}
                >
                  <h3>
                    <span className="dashboard-icon">💎</span>
                    Taxa de Conversão
                    <span className="dashboard-update-badge">
                      <span className="pulse-dot"></span> Atualização em tempo real
                    </span>
                  </h3>
                  <div className="chart-container">
                    <Bar 
                      data={conversionData} 
                      options={barOptions}
                      ref={barChartRef}
                    />
                  </div>
                  <div className="stats-row">
                    {stats.conversoes.map((stat, index) => (
                      <motion.div 
                        className="stat-item" 
                        key={index}
                        whileHover={{ y: -3, scale: 1.05 }}
                      >
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                        <div className={`stat-growth ${stat.growth.startsWith('+') ? 'positive' : 'negative'}`}>
                          {stat.growth}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
} 