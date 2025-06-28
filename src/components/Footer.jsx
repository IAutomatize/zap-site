import { motion } from 'framer-motion';
import Reveal from './Reveal';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-logo-col">
              <div className="footer-logo">
                <i className="fab fa-whatsapp"></i> ZAP Empresarial
              </div>
              <p className="footer-slogan">
                Simplifique sua comunicação. Potencialize seus resultados.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-link" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
            
            <div className="footer-links-col">
              <h4>Navegação</h4>
              <ul className="footer-links">
                <li><a href="#">Início</a></li>
                <li><a href="#features">Recursos</a></li>
                <li><a href="#promo">Por que escolher</a></li>
                <li><a href="#kanban">Como funciona</a></li>
                <li><a href="#performance">Desempenho</a></li>
              </ul>
            </div>
            
            <div className="footer-links-col">
              <h4>Recursos</h4>
              <ul className="footer-links">
                <li><a href="#">Painel de Controle</a></li>
                <li><a href="#">Kanban de Atendimento</a></li>
                <li><a href="#">Disparo em Massa</a></li>
                <li><a href="#">Chatbot com IA</a></li>
                <li><a href="#">Integrações</a></li>
              </ul>
            </div>
            
            <div className="footer-links-col">
              <h4>Suporte</h4>
              <ul className="footer-links">
                <li><a href="#">Central de Ajuda</a></li>
                <li><a href="#">Base de Conhecimento</a></li>
                <li><a href="#">Tutoriais em Vídeo</a></li>
                <li><a href="#">Status do Sistema</a></li>
                <li><a href="#">Contato</a></li>
              </ul>
            </div>
            
            <div className="footer-newsletter">
              <h4>Receba nossas atualizações</h4>
              <p>Dicas, novidades e ofertas exclusivas direto no seu e-mail.</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Seu e-mail" className="newsletter-input" />
                <button className="newsletter-button">Inscrever</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="copyright">&copy; 2025 Zap Empresarial. Todos os direitos reservados.</p>
            <div className="footer-bottom-links">
              <a href="#">Termos de Serviço</a>
              <a href="#">Política de Privacidade</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-decoration">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 70">
          <path fill="#1e1e1e" fillOpacity="1" d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>
    </footer>
  );
} 