import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Reveal from './Reveal';
import Section from './Section';

export default function Hero() {
  const [stats, setStats] = useState({
    newMessages: 1,
    activeChats: 2,
    resolvedToday: 8
  });

  const [selectedChat, setSelectedChat] = useState(1);
  
  // Dados simplificados de mensagens
  const [messages] = useState([
    { 
      id: 1, 
      name: 'João Silva', 
      content: 'Olá, tem este produto em estoque?', 
      time: '09:45', 
      status: 'new',
      avatar: 'J',
      conversation: [
        { isOperator: false, content: 'Olá, tem este produto em estoque?', time: '09:45' },
        { isOperator: true, content: 'Olá João! Sim, temos disponível em todas as cores.', time: '09:47' },
        { isOperator: false, content: 'Ótimo! E qual o prazo de entrega para São Paulo?', time: '09:48' },
        { isOperator: true, content: 'Para São Paulo, a entrega é feita em até 3 dias úteis.', time: '09:50' }
      ]
    },
    { 
      id: 2, 
      name: 'Maria Oliveira', 
      content: 'Quero fazer um pedido para...', 
      time: '09:32', 
      status: 'ongoing',
      avatar: 'M',
      conversation: [
        { isOperator: false, content: 'Quero fazer um pedido para entrega em Belo Horizonte.', time: '09:32' },
        { isOperator: true, content: 'Olá Maria! Claro, podemos providenciar isso.', time: '09:35' }
      ]
    },
    { 
      id: 3, 
      name: 'Pedro Santos', 
      content: 'Qual o prazo de entrega?', 
      time: '09:27', 
      status: 'ongoing',
      avatar: 'P',
      conversation: [
        { isOperator: false, content: 'Qual o prazo de entrega?', time: '09:27' },
        { isOperator: true, content: 'Olá Pedro! O prazo depende da sua localização.', time: '09:29' }
      ]
    }
  ]);
  
  // Atualiza as estatísticas com animação
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeChats: prev.activeChats + Math.floor(Math.random() * 2),
        resolvedToday: prev.resolvedToday + Math.floor(Math.random() * 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  
  // Variantes para animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'new': return 'status-new';
      case 'ongoing': return 'status-ongoing';
      case 'resolved': return 'status-resolved';
      default: return '';
    }
  };

  return (
    <Section id="hero" className="hero gradient-section">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-dots"></div>
      </div>
      
      <div className="container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Reveal>
            <h1 className="hero-title">
              <span className="hero-highlight">Simplifique</span> sua 
              <br/>Comunicação no 
              <span className="hero-highlight-green">WhatsApp</span>
            </h1>
          </Reveal>
          
          <Reveal delay={0.1}>
            <p className="hero-description">
              Centralize, organize e automatize seu atendimento com a plataforma definitiva 
              para empresas que usam o WhatsApp para vender e atender.
            </p>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="hero-cta-container">
              <a href="https://app.zapempresarial.com/signup.html" className="cta-button hero-cta pulse">
                Quero Organizar Meu Zap
              </a>
            </div>
          </Reveal>
          
          <Reveal delay={0.3}>
            <div className="hero-image-container">
              <motion.div 
                className="hero-image"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                {/* Dashboard Frame Simplificado */}
                <div className="hero-dashboard-frame">
                  {/* Header do Dashboard */}
                  <div className="dashboard-header">
                    <div className="dashboard-logo">
                      <i className="fab fa-whatsapp"></i> ZAP Empresarial
                    </div>
                    <div className="dashboard-actions">
                      <span className="dashboard-user"><i className="fas fa-user-circle"></i></span>
                    </div>
                  </div>
                  
                  {/* Conteúdo do Dashboard */}
                  <div className="dashboard-content">
                    {/* Sidebar com lista de conversas */}
                    <div className="dashboard-sidebar">
                      <div className="dashboard-stats">
                        <div className="dash-stat">
                          <div className="dash-stat-value">{stats.newMessages}</div>
                          <div className="dash-stat-label">Novas</div>
                        </div>
                        <div className="dash-stat">
                          <div className="dash-stat-value">{stats.activeChats}</div>
                          <div className="dash-stat-label">Ativas</div>
                        </div>
                        <div className="dash-stat">
                          <div className="dash-stat-value">{stats.resolvedToday}</div>
                          <div className="dash-stat-label">Resolvidas</div>
                        </div>
                      </div>
                      
                      <div className="chat-list">
                        {messages.map(msg => (
                          <div 
                            key={msg.id}
                            className={`chat-item ${msg.id === selectedChat ? 'selected' : ''} ${getStatusClass(msg.status)}`}
                            onClick={() => setSelectedChat(msg.id)}
                          >
                            <div className="chat-avatar">
                              {msg.avatar}
                            </div>
                            <div className="chat-info">
                              <div className="chat-name">
                                {msg.name}
                                <span className="chat-time">{msg.time}</span>
                              </div>
                              <div className="chat-preview">{msg.content.slice(0, 25)}{msg.content.length > 25 ? '...' : ''}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Área de conversa */}
                    <div className="dashboard-chat">
                      {selectedChat && (
                        <>
                          <div className="chat-header">
                            <div className="chat-contact">
                              <div className="chat-avatar large">
                                {messages.find(m => m.id === selectedChat)?.avatar}
                              </div>
                              <div className="chat-contact-info">
                                <div className="chat-contact-name">
                                  {messages.find(m => m.id === selectedChat)?.name}
                                </div>
                                <div className="chat-contact-status">
                                  {messages.find(m => m.id === selectedChat)?.status === 'new' ? 'Nova mensagem' : 'Em atendimento'}
                                </div>
                              </div>
                            </div>
                            <div className="chat-actions">
                              <button className="chat-action resolve">
                                <i className="fas fa-check-circle"></i>
                              </button>
                            </div>
                          </div>
                          
                          <div className="chat-messages">
                            {messages.find(m => m.id === selectedChat)?.conversation.map((msg, index) => (
                              <div key={index} className={`message ${msg.isOperator ? 'operator' : 'customer'}`}>
                                <div className="message-bubble">
                                  {msg.content}
                                </div>
                                <div className="message-time">
                                  {msg.time}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="chat-input">
                            <div className="input-field">
                              <input type="text" placeholder="Digite sua mensagem..." />
                            </div>
                            <button className="send-button">
                              <i className="fas fa-paper-plane"></i>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>
          
          <div className="hero-stats">
            <Reveal delay={0.4}>
              <div className="stat-box">
                <span className="stat-number">10x</span>
                <span className="stat-text">Mais rápido</span>
              </div>
            </Reveal>
            <Reveal delay={0.5}>
              <div className="stat-box">
                <span className="stat-number">97%</span>
                <span className="stat-text">Satisfação</span>
              </div>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="stat-box">
                <span className="stat-number">24/7</span>
                <span className="stat-text">Disponibilidade</span>
              </div>
            </Reveal>
          </div>
        </motion.div>
      </div>
    </Section>
  );
} 
