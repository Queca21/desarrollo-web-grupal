/* ==================== SISTEMA DE NAVEGACIÓN ==================== */
// Función para cambiar entre secciones
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section-page').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Scroll al inicio de la página
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Actualizar clase active en navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Event listeners para los enlaces de navegación
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section');
        showSection(sectionId);
    });
});

// Logo también lleva a inicio
document.querySelector('.logo').addEventListener('click', () => {
    showSection('inicio');
});

/* ==================== EFECTOS DEL HEADER ==================== */
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
    } else {
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.8)';
    }
    
    lastScroll = currentScroll;
});

/* ==================== EFECTOS PÁGINA INICIO ==================== */
// Efecto parallax en imágenes de inicio
const heroImages = document.querySelectorAll('.hero-image');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const currentSection = document.querySelector('.section-page.active');
    
    // Solo aplicar parallax si estamos en la sección de inicio
    if (currentSection && currentSection.id === 'inicio') {
        heroImages.forEach((image, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            image.style.transform = `translateY(${yPos}px)`;
        });
        
        // Animación del logo al hacer scroll
        const logoText = document.querySelector('.logo-text');
        const logoDivider = document.querySelector('.logo-divider');
        
        if (logoText) {
            const opacity = 1 - (scrolled / 500);
            const scale = 1 + (scrolled / 2000);
            logoText.style.opacity = Math.max(opacity, 0.3);
            logoText.style.transform = `scale(${Math.min(scale, 1.1)})`;
        }
        
        if (logoDivider) {
            const dividerHeight = 80 - (scrolled / 10);
            logoDivider.style.height = `${Math.max(dividerHeight, 40)}px`;
        }
    }
});

// Efecto hover en imágenes de inicio con movimiento suave
heroImages.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        const img = item.querySelector('img');
        img.style.transform = `scale(1.05) translate(${deltaX * 8}px, ${deltaY * 8}px)`;
    });
    
    item.addEventListener('mouseleave', () => {
        const img = item.querySelector('img');
        img.style.transform = 'scale(1)';
    });
});

/* ==================== EFECTOS PÁGINA GALERÍA ==================== */
// Efecto parallax en galería
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        const img = item.querySelector('img');
        img.style.transform = `scale(1.1) translate(${deltaX * 10}px, ${deltaY * 10}px)`;
    });
    
    item.addEventListener('mouseleave', () => {
        const img = item.querySelector('img');
        img.style.transform = 'scale(1)';
    });
});

/* ==================== LAZY LOADING ==================== */
// Lazy loading para todas las imágenes
const allImages = document.querySelectorAll('img');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '1';
            observer.unobserve(img);
        }
    });
}, {
    threshold: 0.1
});

allImages.forEach(img => {
    imageObserver.observe(img);
});

/* ==================== PROTECCIÓN DE IMÁGENES ==================== */
// Prevenir clic derecho en todas las imágenes
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    
    // Prevenir arrastrar imágenes
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});

/* ==================== EFECTO RIPPLE EN BOTÓN CTA ==================== */
const ctaButton = document.querySelector('.cta-button');

if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

/* ==================== ANIMACIÓN DE CARGA ==================== */
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-out';

/* ==================== OBSERVER PARA ANIMACIONES ==================== */
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

/* ==================== NAVEGACIÓN POR TECLADO ==================== */
// Navegación con teclas de flecha
document.addEventListener('keydown', (e) => {
    const sections = ['inicio', 'servicios', 'galeria', 'nosotros'];
    const currentSection = document.querySelector('.section-page.active');
    const currentIndex = sections.indexOf(currentSection.id);
    
    if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
        showSection(sections[currentIndex + 1]);
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        showSection(sections[currentIndex - 1]);
    }
});

/* ==================== CURSOR PERSONALIZADO ==================== */
// Cursor pointer en elementos interactivos
document.querySelectorAll('.gallery-item, .hero-image, .cta-button').forEach(item => {
    item.style.cursor = 'pointer';
});

/* ==================== CONSOLE LOG ==================== */
console.log('%c📸 SG CONTE - Fotografía Profesional', 'font-size: 20px; font-weight: bold; color: #FF9800;');
console.log('%cSitio web cargado correctamente ✓', 'font-size: 14px; color: #4CAF50;');
console.log('%cNavegación: Inicio | Servicios | Galería | Nosotros', 'font-size: 12px; color: #999;');

/* ==================== ANIMACIÓN CSS PARA RIPPLE ==================== */
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);