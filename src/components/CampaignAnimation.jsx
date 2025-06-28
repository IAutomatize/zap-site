import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Section from './Section';
import Reveal from './Reveal';

export default function CampaignAnimation() {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    // Gerar novas mensagens periodicamente
    const interval = setInterval(() => {
      if (messages.length < 15) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          x: Math.random() * 80,
          y: Math.random() * 60 + 10,
          scale: Math.random() * 0.3 + 0.7
        }]);
      } else {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages.shift();
          return [...newMessages, {
            id: Date.now(),
            x: Math.random() * 80,
            y: Math.random() * 60 + 10,
            scale: Math.random() * 0.3 + 0.7
          }];
        });
      }
    }, 600);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <Section id="campaign" className="campaign-section">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Disparos em Massa</h2>
          <p className="campaign-subtitle">Alcance milhares de clientes em segundos com nossa ferramenta de envio em massa</p>
        </Reveal>

        <div className="campaign-animation-container">
          {/* Telefone origem */}
          <div className="phone-container phone-source">
            <div className="phone">
              <div className="phone-header">
                <span className="phone-title">Seu Negócio</span>
              </div>
              <div className="phone-body">
                <div className="message-list">
                  <div className="message-outgoing">Promoção Especial! 🎉</div>
                  <div className="message-outgoing">50% de desconto hoje!</div>
                  <div className="message-outgoing">Visite nossa loja!</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mensagens voando */}
          <div className="messages-flying">
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                className="flying-message"
                initial={{ 
                  x: 0, 
                  y: 50, 
                  scale: 1, 
                  opacity: 0 
                }}
                animate={{ 
                  x: `${msg.x}%`, 
                  y: `${msg.y}%`, 
                  scale: msg.scale, 
                  opacity: [0, 1, 1, 0] 
                }}
                transition={{ 
                  duration: 2.5, 
                  ease: "easeInOut" 
                }}
              >
                <div className="message-bubble">
                  <div className="message-content">
                    <span className="message-emoji">✉️</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Telefones destino */}
          <div className="phones-destination">
            {[1, 2, 3].map(index => (
              <Reveal key={index} delay={index * 0.2}>
                <div className="phone-mini">
                  <div className="phone-header-mini">
                    <span className="phone-title-mini">Cliente {index}</span>
                  </div>
                  <div className="phone-body-mini">
                    <div className="message-incoming-mini">Promoção Especial! 🎉</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
} 