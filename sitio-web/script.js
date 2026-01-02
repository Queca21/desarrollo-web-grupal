/* ==================== SISTEMA DE NAVEGACIÓN ==================== */
function showSection(sectionId) {
    document.querySelectorAll('.section-page').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        showSection(this.getAttribute('data-section'));
    });
});

document.querySelectorAll('.footer-links a[data-section]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        showSection(this.getAttribute('data-section'));
    });
});

document.querySelectorAll('a[href="#contacto"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('contacto');
    });
});

document.querySelector('.logo').addEventListener('click', () => {
    showSection('inicio');
});

/* ==================== EFECTOS DEL HEADER ==================== */
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    header.style.boxShadow = currentScroll <= 0 ? 'none' : '0 2px 30px rgba(0, 0, 0, 0.8)';
});

/* ==================== EFECTOS PÁGINA INICIO ==================== */
const heroImages = document.querySelectorAll('.hero-image');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const currentSection = document.querySelector('.section-page.active');
    
    if (currentSection && currentSection.id === 'inicio') {
        heroImages.forEach((image, index) => {
            const speed = 0.5 + (index * 0.1);
            image.style.transform = `translateY(${-(scrolled * speed)}px)`;
        });
        
        const logoText = document.querySelector('.logo-text');
        const logoDivider = document.querySelector('.logo-divider');
        
        if (logoText) {
            logoText.style.opacity = Math.max(1 - (scrolled / 500), 0.3);
            logoText.style.transform = `scale(${Math.min(1 + (scrolled / 2000), 1.1)})`;
        }
        
        if (logoDivider) {
            logoDivider.style.height = `${Math.max(80 - (scrolled / 10), 40)}px`;
        }
    }
});

heroImages.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const deltaX = ((e.clientX - rect.left) - rect.width / 2) / (rect.width / 2);
        const deltaY = ((e.clientY - rect.top) - rect.height / 2) / (rect.height / 2);
        
        item.querySelector('img').style.transform = `scale(1.05) translate(${deltaX * 8}px, ${deltaY * 8}px)`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('img').style.transform = 'scale(1)';
    });
});

/* ==================== EFECTOS PÁGINA GALERÍA ==================== */
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const deltaX = ((e.clientX - rect.left) - rect.width / 2) / (rect.width / 2);
        const deltaY = ((e.clientY - rect.top) - rect.height / 2) / (rect.height / 2);
        
        item.querySelector('img').style.transform = `scale(1.1) translate(${deltaX * 10}px, ${deltaY * 10}px)`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('img').style.transform = 'scale(1)';
    });
});

/* ==================== LAZY LOADING ==================== */
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

/* ==================== PROTECCIÓN DE IMÁGENES ==================== */
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => e.preventDefault());
    img.addEventListener('dragstart', (e) => e.preventDefault());
});

/* ==================== NAVEGACIÓN POR TECLADO ==================== */
document.addEventListener('keydown', (e) => {
    const sections = ['inicio', 'servicios', 'galeria', 'nosotros', 'contacto'];
    const currentSection = document.querySelector('.section-page.active');
    const currentIndex = sections.indexOf(currentSection.id);
    
    if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
        showSection(sections[currentIndex + 1]);
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        showSection(sections[currentIndex - 1]);
    }
});

/* ==================== ANIMACIÓN CSS PARA RIPPLE ==================== */
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        from { transform: scale(0); opacity: 1; }
        to { transform: scale(2); opacity: 0; }
    }
`;
document.head.appendChild(style);