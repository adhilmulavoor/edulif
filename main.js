// main.js - Interactivity for EDULIF Website

document.addEventListener('DOMContentLoaded', () => {
  // --- Sticky Navigation & Scroll Effects ---
  const navbar = document.getElementById('navbar');
  const scrollThreshold = 40;

  window.addEventListener('scroll', () => {
    // Desktop sticky class
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Mobile floating island class
    if (window.innerWidth <= 768 && window.scrollY > 20) {
      navbar.classList.add('floating-nav');
    } else {
      navbar.classList.remove('floating-nav');
    }
  });

  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Toggle icon
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
      body.style.overflow = 'hidden'; // Prevent scroll when menu is open
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
      body.style.overflow = '';
    }
  });

  // Close mobile menu when a link is clicked
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        body.style.overflow = '';
      }
    });
  });

  // --- Intersection Observer for Scroll Animations ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: Stop observing once element has animated
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => observer.observe(el));

  // --- Form Handling ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Simulate form submission
      submitBtn.textContent = 'Sending...';
      submitBtn.style.opacity = '0.7';
      
      setTimeout(() => {
        submitBtn.textContent = 'Message Sent Successfully!';
        submitBtn.style.background = 'var(--secondary)';
        submitBtn.style.color = '#fff';
        submitBtn.style.opacity = '1';
        
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = 'var(--primary)';
          submitBtn.style.color = '#ffffff';
        }, 3000);
      }, 1500);
    });
  }
});
