document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll suave para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Usa scrollIntoView para un desplazamiento suave
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Efecto de cabecera (header) al hacer scroll
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Animación de las secciones al hacer scroll
    const sections = document.querySelectorAll('.section, .hero-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target); // Dejar de observar después de la primera animación
            }
        });
    }, {
        threshold: 0.1,
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});