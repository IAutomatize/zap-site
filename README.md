# Zap Empresarial - Landing Page

Esta é a landing page para o "Zap Empresarial", uma plataforma SaaS fictícia projetada para centralizar, organizar e automatizar o atendimento ao cliente via WhatsApp. O site foi construído com React e Vite, focando em uma experiência de usuário moderna, interativa e totalmente responsiva.

## 🚀 Acesso ao Site

O site está hospedado no GitHub Pages e pode ser acessado através do seguinte link:

**[https://iautomatize.github.io/zap-site/](https://iautomatize.github.io/zap-site/)**

## ✨ Funcionalidades do Site

- **Design Responsivo**: Totalmente adaptável para desktops, tablets e celulares.
- **Animações Interativas**: Utiliza `Framer Motion` para criar animações fluidas que melhoram a experiência do usuário.
- **Componentes Reutilizáveis**: Estruturado com componentes React para fácil manutenção e escalabilidade.
- **Seções Detalhadas**:
    - **Hero**: Apresenta a proposta de valor com um dashboard animado de conversas.
    - **Features**: Grade de funcionalidades com ícones e descrições.
    - **Campaign Animation**: Visualização animada do disparo de mensagens em massa.
    - **Kanban Board**: Demonstração de um painel Kanban para gerenciamento de chats.
    - **Performance Chart**: Gráficos de desempenho dinâmicos criados com `Chart.js`.
- **Deploy Automatizado**: O deploy é feito automaticamente para o GitHub Pages a cada push na branch `main` usando GitHub Actions.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)
- **Gráficos**: [Chart.js](https://www.chartjs.org/) com [react-chartjs-2](https://react-chartjs-2.js.org/)
- **Roteamento**: [React Router](https://reactrouter.com/) (usando `HashRouter` para compatibilidade com GitHub Pages)
- **Estilização**: CSS puro com foco em responsividade (Flexbox e Grid).
- **Ícones**: [Font Awesome](https://fontawesome.com/)

## 📂 Estrutura de Arquivos

A estrutura de arquivos do projeto é organizada para separar as responsabilidades. Para uma visão detalhada, consulte o arquivo `file_structure.txt`.

- **`/.github/workflows/`**: Contém o workflow de deploy para o GitHub Actions.
- **`/dist`**: Diretório de saída do build de produção (gerado automaticamente).
- **`/public`**: Contém arquivos estáticos que são copiados para a raiz do diretório de build.
- **`/src`**: Contém todo o código-fonte da aplicação.
    - **`/src/components`**: Componentes React reutilizáveis.
    - **`/src/pages`**: Componentes que representam as páginas do site.
    - **`/src/main.jsx`**: Ponto de entrada da aplicação React.
    - **`/src/App.jsx`**: Componente principal que define as rotas.

## ⚙️ Instalação e Execução Local

Para rodar este projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/IAutomatize/zap-site.git
    cd zap-site
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O site estará disponível em `http://localhost:5173` (ou outra porta indicada no terminal).

## 🚀 Deploy

O deploy é gerenciado automaticamente pelo GitHub Actions configurado no arquivo `.github/workflows/deploy.yml`. Qualquer push na branch `main` irá acionar o processo de build e deploy para o GitHub Pages. 