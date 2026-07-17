// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const navHeight = navbar ? navbar.offsetHeight : 0;
            // Updated window.pageYOffset to window.scrollY for modern browser standards
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

// Safe Guard: Only run form logic if the HTML element actually exists on the page
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');
        const messageInput = this.querySelector('textarea');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        if (!name || !email || !message) {
            showFormFeedback('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormFeedback('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate sending
        const button = this.querySelector('button');
        if (button) {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            button.disabled = true;

            setTimeout(() => {
                showFormFeedback('Message sent successfully! I\'ll get back to you soon.', 'success');
                button.innerHTML = originalText;
                button.disabled = false;
                this.reset();
            }, 1500);
        }
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormFeedback(message, type) {
    if (!contactForm) return;

    // Remove existing feedback
    const existing = document.querySelector('.form-feedback');
    if (existing) existing.remove();

    const feedback = document.createElement('div');
    feedback.className = `form-feedback ${type}`;
    feedback.textContent = message;
    feedback.style.cssText = `
        padding: 12px 18px;
        border-radius: 12px;
        font-size: 0.9rem;
        margin-top: 4px;
        background: ${type === 'success' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)'};
        color: ${type === 'success' ? '#4ade80' : '#f87171'};
        border: 1px solid ${type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
    `;

    const submitBtn = contactForm.querySelector('button');
    if (submitBtn) {
        contactForm.insertBefore(feedback, submitBtn);
    } else {
        contactForm.appendChild(feedback);
    }

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.style.opacity = '0';
            feedback.style.transition = 'opacity 0.4s ease';
            setTimeout(() => feedback.remove(), 400);
        }
    }, 5000);
}

// ===== INTERSECTION OBSERVER — FADE IN SECTIONS =====
const sections = document.querySelectorAll('section');

if (sections.length > 0) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(24px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
}

// ===== KEYBOARD ACCESSIBILITY =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && hamburger) {
        if (navLinks.classList.contains('open')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        }
    }
});

// ===== CONSOLE EASTER EGG =====
console.log('%c👋 Hey there!', 'font-size: 24px; font-weight: bold; color: #4f46e5;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 16px;');