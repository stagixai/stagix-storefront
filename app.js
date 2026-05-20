/* ============================================
   STAGIX Data Vacuum — Interactive Engine
   Scroll animations, counters, nav effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll-based fade-in animations ---
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

  // --- Animated counters ---
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      const current = Math.floor(eased * target);

      if (target >= 1000000) {
        el.textContent = (current / 1000000).toFixed(1) + 'M';
      } else if (target >= 1000) {
        el.textContent = Math.floor(current).toLocaleString();
      } else {
        el.textContent = current;
      }

      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // --- Sticky nav scroll effect ---
  const nav = document.getElementById('nav');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Parallax orbs on mouse move ---
  const orbs = document.querySelectorAll('.orb');
  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animateOrbs() {
    currentX += (mouseX - currentX) * 0.02;
    currentY += (mouseY - currentY) * 0.02;
    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 15;
      orb.style.transform = `translate(${currentX * factor}px, ${currentY * factor}px)`;
    });
    requestAnimationFrame(animateOrbs);
  }
  animateOrbs();

  // --- Table row hover glow ---
  document.querySelectorAll('.comparison-table tbody tr').forEach(row => {
    row.addEventListener('mouseenter', () => {
      row.style.background = 'rgba(0, 210, 255, 0.03)';
    });
    row.addEventListener('mouseleave', () => {
      row.style.background = '';
    });
  });

  // --- CTA button pulse effect ---
  const buyBtn = document.getElementById('buy-now-cta');
  if (buyBtn) {
    setInterval(() => {
      buyBtn.style.transform = 'scale(1.03)';
      setTimeout(() => { buyBtn.style.transform = ''; }, 300);
    }, 4000);
  }

  // --- VSL Video Player click initialization ---
  const vslPlayer = document.getElementById('vsl-player');
  if (vslPlayer) {
    vslPlayer.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0';
      iframe.title = 'Stagix Data Vacuum Live Walkthrough';
      iframe.frameBorder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.className = 'vsl-iframe';

      vslPlayer.appendChild(iframe);
      vslPlayer.style.cursor = 'default';
    });
  }

  console.log('%c⚡ STAGIX AUTONOMOUS SYSTEMS — Engine Loaded', 'color: #00d2ff; font-weight: bold; font-size: 14px;');
});
