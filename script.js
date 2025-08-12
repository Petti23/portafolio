// Obtiene el elemento canvas del DOM
const canvas = document.getElementById('background-canvas');
// Obtiene el contexto 2D para dibujar en el canvas
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];
// Número de partículas, puedes ajustar este valor
const numParticles = 100;
// Paleta de colores extraída del CSS
const colors = ['#6c63ff', '#5548c8', '#f4f7f9'];

// Clase para representar cada partícula
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1; // Tamaño aleatorio entre 1 y 4
        this.speedX = (Math.random() - 0.5) * 0.5; // Velocidad horizontal lenta
        this.speedY = (Math.random() - 0.5) * 0.5; // Velocidad vertical lenta
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    // Actualiza la posición de la partícula
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    // Dibuja la partícula en el canvas
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

// Inicializa las partículas
function initParticles() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

// Función principal de animación
function animate() {
    // Limpia el canvas en cada frame
    ctx.clearRect(0, 0, width, height);
    // Actualiza y dibuja cada partícula
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    // Solicita el próximo frame de animación
    requestAnimationFrame(animate);
}

// Redimensiona el canvas para que ocupe toda la ventana
function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles(); // Reinicia las partículas al redimensionar
}

// Escucha el evento de redimensionamiento de la ventana para que el fondo sea siempre responsive
window.addEventListener('resize', resizeCanvas);

// Inicia todas las funcionalidades cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Inicia el fondo animado
    resizeCanvas();
    animate();

    // 1. Scroll suave para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
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

    // 4. Funcionalidad para el menú de hamburguesa
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Cierra el menú cuando se hace clic en un enlace (para móviles)
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
        }
    });
});
