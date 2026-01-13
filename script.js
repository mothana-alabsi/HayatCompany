// Hero Slider
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));
    
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;
    if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
}

// Auto slide
let autoSlideInterval = setInterval(() => {
    changeSlide(1);
}, 6000);

// Pause auto slide on hover
document.querySelector('.hero-section').addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

document.querySelector('.hero-section').addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 6000);
});

// Navbar Scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    const body = document.body;
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        body.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
        body.classList.remove('scrolled');
    }
});

// Language Toggle
let currentLang = 'en';
const langToggle = document.getElementById('langToggle');

langToggle.addEventListener('click', function() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', currentLang === 'ar');
    
    updateContent();
    updateAboutText();
    updateMissionItems();
    updateHeroArrows(); // 🔴 مهم
});

function updateContent() {
    document.querySelectorAll('[data-en]').forEach(element => {
        const text = currentLang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-ar');
        
        // Handle different element types
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else {
            element.textContent = text;
        }
    });
}

function updateAboutText() {
    const enElements = document.querySelectorAll('.about-text-en');
    const arElements = document.querySelectorAll('.about-text-ar');
    
    if (currentLang === 'en') {
        enElements.forEach(el => el.style.display = 'block');
        arElements.forEach(el => el.style.display = 'none');
    } else {
        enElements.forEach(el => el.style.display = 'none');
        arElements.forEach(el => el.style.display = 'block');
    }
}

function updateMissionItems() {
    const enItems = document.querySelectorAll('.mission-item-en');
    const arItems = document.querySelectorAll('.mission-item-ar');
    
    if (currentLang === 'en') {
        enItems.forEach(el => el.style.display = 'flex');
        arItems.forEach(el => el.style.display = 'none');
    } else {
        enItems.forEach(el => el.style.display = 'none');
        arItems.forEach(el => el.style.display = 'flex');
    }
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 100;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.stat-box, .process-card, .product-card, .contact-card, .mission-card, .value-card, .export-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

function updateHeroArrows() {
    const prevArrow = document.getElementById('arrowPrev');
    const nextArrow = document.getElementById('arrowNext');

    prevArrow.onclick = null;
    nextArrow.onclick = null;

    if (currentLang === 'ar') {
        // RTL: عكس الاتجاه
        prevArrow.onclick = () => changeSlide(1);
        nextArrow.onclick = () => changeSlide(-1);
    } else {
        // LTR: الاتجاه الطبيعي
        prevArrow.onclick = () => changeSlide(-1);
        nextArrow.onclick = () => changeSlide(1);
    }
}