// ============================================
// MAISON NOIR — Interactive Features
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation Toggle ---
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // --- Scroll Animations (Intersection Observer) ---
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation for sibling elements
        const siblings = entry.target.parentElement.querySelectorAll('[data-animate]');
        let delay = 0;
        siblings.forEach((sibling, i) => {
          if (sibling === entry.target) {
            delay = i * 100;
          }
        });

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});

// --- Newsletter Form Handler ---
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const input = form.querySelector('input');
  const btn = form.querySelector('button');

  btn.textContent = 'Subscribed!';
  btn.style.background = '#2a7d3f';
  input.value = '';

  setTimeout(() => {
    btn.textContent = 'Subscribe';
    btn.style.background = '';
  }, 3000);
}

// --- Contact Form Handler ---
function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button');

  btn.textContent = 'Message Sent!';
  btn.style.background = '#2a7d3f';
  form.reset();

  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
  }, 3000);
}
