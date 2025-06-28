import { motion } from 'framer-motion';
import Reveal from './Reveal';
import Section from './Section';

const cards = [
  { 
    icon: 'fa-brands fa-whatsapp', 
    title: 'Múltiplos Atendentes', 
    desc: 'Conecte um único número de WhatsApp a vários atendentes, sem perder o controle das conversas.',
    color: '#25D366',
    delay: 0.1
  },
  { 
    icon: 'fa-solid fa-table-columns', 
    title: 'Kanban de Atendimento', 
    desc: 'Visualize e gerencie todos os seus chats em um painel Kanban intuitivo. Nunca mais perca um cliente de vista.',
    color: '#D90429',
    delay: 0.2
  },
  { 
    icon: 'fa-solid fa-robot', 
    title: 'Atendimento com IA', 
    desc: 'Configure um chatbot com Inteligência Artificial para qualificar leads e responder dúvidas 24/7.',
    color: '#0496FF',
    delay: 0.3
  },
  { 
    icon: 'fa-solid fa-paper-plane', 
    title: 'Campanhas em Massa', 
    desc: 'Envie campanhas e notificações para sua base de contatos de forma segmentada e eficiente.',
    color: '#FF9F1C',
    delay: 0.4
  },
  { 
    icon: 'fa-solid fa-gears', 
    title: 'Status Automáticos', 
    desc: 'Automatize a atualização de status do cliente no funil de vendas conforme a conversa avança.',
    color: '#7B2CBF',
    delay: 0.5
  },
  { 
    icon: 'fa-solid fa-chart-line', 
    title: 'Relatórios Completos', 
    desc: 'Acompanhe o desempenho da sua equipe com relatórios detalhados de tempo de resposta e volume de chats.',
    color: '#3A86FF',
    delay: 0.6
  },
];

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Section id="features" className="features gradient-section accent" gradientType="accent">
      <div className="container">
        <Reveal>
          <h2 className="section-title">
            Recursos <span className="title-highlight">Poderosos</span>
          </h2>
          <p className="features-subtitle">
            Todas as ferramentas que você precisa para transformar seu WhatsApp em um verdadeiro centro de negócios
          </p>
        </Reveal>
        
        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {cards.map((card, i) => (
            <motion.div 
              key={card.title} 
              className="feature-card"
              variants={itemVariants}
              transition={{ duration: 0.4, ease: "easeOut", delay: card.delay }}
              whileHover={{ 
                y: -10, 
                boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                transition: { duration: 0.2 }
              }}
            >
              <div className="feature-icon-wrapper" style={{ backgroundColor: `${card.color}20` }}>
                <i className={card.icon} style={{ color: card.color }}></i>
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <div className="feature-card-gradient" style={{ background: `linear-gradient(135deg, ${card.color}10, transparent 80%)` }}></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
} 