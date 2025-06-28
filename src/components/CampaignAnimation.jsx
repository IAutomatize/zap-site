import { motion } from 'framer-motion';
import Section from './Section';
import Reveal from './Reveal';

const messages = Array.from({ length: 15 });

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const messageVariants = (i) => ({
  initial: { opacity: 0, x: 0, y: 0 },
  animate: {
    opacity: [0, 1, 1, 0],
    x: [0, 200, 400, 600], // Ajuste a distância do percurso
    y: [0, -50 + (i % 3) * 50, -50 + (i % 3) * 50, -50 + (i % 3) * 50], // Direciona para clientes
    transition: {
      duration: 2.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 3,
      delay: i * 0.2,
    },
  },
});

export default function CampaignAnimation() {
  return (
    <Section id="campaign-section" className="campaign-section">
      <div className="container">
        <Reveal>
          <h2 className="section-title">
            Alcance Milhares de Clientes em Segundos
          </h2>
          <p className="campaign-subtitle">
            Envie campanhas, notificações e promoções para toda sua base de contatos de forma segmentada e eficiente.
          </p>
        </Reveal>

        <div className="campaign-animation-container">
          {/* Plataforma de Envio */}
          <motion.div className="platform-hub">
            <div className="platform-icon-container">
              <i className="fa-solid fa-paper-plane"></i>
            </div>
            <div className="platform-text">
              <h4>Plataforma</h4>
              <span>Central de Envios</span>
            </div>
          </motion.div>

          {/* Área de Animação */}
          <div className="animation-area">
            <motion.div
              className="messages-wrapper"
              variants={containerVariants}
              initial="initial"
              animate="animate"
            >
              {messages.map((_, i) => (
                <motion.div
                  key={i}
                  className="flying-message-bubble"
                  variants={messageVariants(i)}
                />
              ))}
            </motion.div>
          </div>

          {/* Clientes */}
          <div className="clients-group">
            {['Cliente 1', 'Cliente 2', 'Cliente 3'].map((name, i) => (
              <motion.div className="client-bubble" key={i}>
                <div className="client-icon-container">
                  <i className="fa-solid fa-user"></i>
                </div>
                <div className="client-text">
                  <h4>{name}</h4>
                  <span>Recebendo...</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
} 