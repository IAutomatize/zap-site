export default function Header() {
  return (
    <header className="main-header">
      <div className="container">
        <nav className="navbar">
          <a href="/logo.png" className="logo">
            <img src="/logo.png" alt="Logo Zap Empresarial" />
          </a>
          <ul className="nav-menu">
            <li><a href="#features">Funcionalidades</a></li>
            <li><a href="#how-it-works">Como Funciona</a></li>
            <li><a href="#cta">Começar Agora</a></li>
          </ul>
          <a href="http://192.168.15.7:3001/signup.html" className="cta-button nav-cta">Criar Conta Grátis</a>
        </nav>
      </div>
    </header>
  );
} 
