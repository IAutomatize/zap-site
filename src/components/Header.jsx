export default function Header() {
  return (
    <header className="main-header">
      <div className="container">
        <nav className="navbar">
          <a href="#/" className="logo">
            <img src="./logo.png" alt="Logo Zap Empresarial" />
          </a>
          <ul className="nav-menu">
            <li><a href="#features">Funcionalidades</a></li>
            <li><a href="#how-it-works">Como Funciona</a></li>
            <li><a href="#cta">Começar Agora</a></li>
          </ul>
          <a href="#/signup" className="cta-button nav-cta">Criar Conta Grátis</a>
        </nav>
      </div>
    </header>
  );
} 