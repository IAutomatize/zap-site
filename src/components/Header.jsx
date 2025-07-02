export default function Header() {
  return (
    <header className="main-header">
      <div className="container">
        <nav className="navbar">
          <a href="/logo.png" className="logo">
            <img src={import.meta.env.BASE_URL + "logo.png"} alt="Logo Zap Empresarial" />
          </a>
          <ul className="nav-menu">
            <li><a href="#features">Funcionalidades</a></li>
            <li><a href="#how-it-works">Como Funciona</a></li>
            <li><a href="#cta">Começar Agora</a></li>
          </ul>
          <a href="https://app.zapempresarial.com/signup.html" className="cta-button nav-cta">Criar Conta Grátis</a>
        </nav>
      </div>
    </header>
  );
} 
