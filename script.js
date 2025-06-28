document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA PARA ANIMAÇÃO AO ROLAR A PÁGINA ---
    
    // Seleciona todos os elementos que devem ser animados
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Se não houver elementos para animar, não faz nada
    if (animatedElements.length === 0) return;

    // Cria um 'observador' de interseção
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Se o elemento está visível na tela (isIntersecting)
            if (entry.isIntersecting) {
                // Adiciona a classe 'is-visible' que ativa a animação no CSS
                entry.target.classList.add('is-visible');
                // Para a observação deste elemento para não animar novamente
                observer.unobserve(entry.target);
            }
        });
    }, {
        // A animação começa quando 20% do elemento estiver visível
        threshold: 0.2 
    });

    // Pede ao observador para 'observar' cada um dos elementos selecionados
    animatedElements.forEach(element => {
        observer.observe(element);
    });


    // --- BÔNUS: LÓGICA PARA HEADER FICAR SÓLIDO AO ROLAR ---
    
    const header = document.querySelector('.main-header');
    
    // Essa lógica está contida no CSS com backdrop-filter, mas caso prefira
    // uma mudança de cor sólida, você pode descomentar o código abaixo
    // e adicionar uma classe .header-scrolled no CSS.
    /*
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    */

});