import { motion } from 'framer-motion';
import Reveal from './Reveal';
import Section from './Section';

export default function PromoSection() {
  return (
    <Section id="promo" className="promo-section gradient-section accent" gradientType="accent">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Transforme seu <span className="title-highlight">Atendimento</span></h2>
          <p className="promo-subtitle">Soluções que realmente funcionam para o seu negócio</p>
        </Reveal>
        
        <div className="promo-grid">
          <Reveal delay={0.1}>
            <div className="promo-content">
              <h3>Por que escolher nossa plataforma?</h3>
              <p className="promo-text">
                Em um mercado digital cada vez mais acelerado, o <strong>atendimento ágil</strong> faz toda a diferença. 
                Nossa plataforma foi desenvolvida por especialistas em comunicação digital e gestão de relacionamento, 
                integrando as melhores práticas do mercado com a tecnologia mais avançada.
              </p>
              
              <div className="promo-highlights">
                <div className="promo-highlight-item">
                  <div className="highlight-icon"><i className="fas fa-rocket"></i></div>
                  <div className="highlight-content">
                    <h4>Aumente suas vendas</h4>
                    <p>Clientes atendidos mais rapidamente têm 78% mais chance de concretizar a compra.</p>
                  </div>
                </div>
                
                <div className="promo-highlight-item">
                  <div className="highlight-icon"><i className="fas fa-users"></i></div>
                  <div className="highlight-content">
                    <h4>Escale seu atendimento</h4>
                    <p>Atenda 10x mais clientes com a mesma equipe e mantenha a qualidade.</p>
                  </div>
                </div>
                
                <div className="promo-highlight-item">
                  <div className="highlight-icon"><i className="fas fa-chart-line"></i></div>
                  <div className="highlight-content">
                    <h4>Dados em tempo real</h4>
                    <p>Monitore métricas importantes e tome decisões baseadas em dados.</p>
                  </div>
                </div>
              </div>
              
              <div className="promo-cta">
                <a href="https://app.zapempresarial.com/signup.html" className="cta-button">Começar agora</a>
                <div className="promo-customers">
                  <div className="customer-avatars">
                    <div className="customer-avatar">M</div>
                    <div className="customer-avatar">S</div>
                    <div className="customer-avatar">K</div>
                    <div className="customer-avatar">+</div>
                  </div>
                  <p>Mais de 2.000 empresas já utilizam</p>
                </div>
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={0.3}>
            <div className="promo-stats">
              <motion.div 
                className="stats-card"
                whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}
              >
                <div className="stats-header">
                  <div className="stats-title">Resultados reais</div>
                  <div className="stats-icon"><i className="fas fa-star"></i></div>
                </div>
                <div className="stats-content">
                  <div className="stats-number">87%</div>
                  <div className="stats-description">dos clientes aumentaram suas conversões em até 3 meses</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="stats-card"
                whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}
              >
                <div className="stats-header">
                  <div className="stats-title">Tempo de resposta</div>
                  <div className="stats-icon"><i className="fas fa-bolt"></i></div>
                </div>
                <div className="stats-content">
                  <div className="stats-number">2.5min</div>
                  <div className="stats-description">é o tempo médio de resposta após implementar nossa solução</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="stats-card"
                whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}
              >
                <div className="stats-header">
                  <div className="stats-title">Satisfação do cliente</div>
                  <div className="stats-icon"><i className="fas fa-heart"></i></div>
                </div>
                <div className="stats-content">
                  <div className="stats-number">4.9/5</div>
                  <div className="stats-description">avaliação média de satisfação dos clientes atendidos</div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
} 
