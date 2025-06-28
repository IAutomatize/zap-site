import Reveal from './Reveal';
import Section from './Section';

export default function FinalCTA() {
  return (
    <Section id="cta" className="final-cta">
      <div className="container">
        <Reveal>
          <h2>Pronto para transformar seu atendimento?</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p>Crie sua conta e experimente o poder do Zap Empresarial. Não requer cartão de crédito.</p>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="/signup" className="cta-button">Começar Agora, de Graça!</a>
        </Reveal>
      </div>
    </Section>
  );
} 