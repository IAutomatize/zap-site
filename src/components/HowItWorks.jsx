import Reveal from './Reveal';
import Section from './Section';

const steps = [
  { num: '1', title: 'Conecte seu WhatsApp', desc: 'Leia um QR Code e sua conta estará pronta para operar na nossa plataforma.' },
  { num: '2', title: 'Organize seus Times', desc: 'Crie equipes, defina permissões e distribua os atendimentos de forma inteligente.' },
  { num: '3', title: 'Automatize e Venda', desc: 'Configure o chatbot, crie seu Kanban e veja sua produtividade decolar.' },
];

export default function HowItWorks() {
  return (
    <Section id="how-it-works" className="how-it-works">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Comece em 3 passos simples</h2>
        </Reveal>
        <div className="steps-container">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.05}>
              <div className="step">
                <div className="step-number">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
} 