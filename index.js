// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active')
  } else {
    smallMenu.classList.add('header__sm-menu--active')
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  } else {
    headerHamMenuBtn.classList.add('d-none')
    headerHamMenuCloseBtn.classList.remove('d-none')
  }
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

// ---
const headerLogoConatiner = document.querySelector('.header__logo-container')

headerLogoConatiner.addEventListener('click', () => {
  location.href = 'index.html'
})

// IntersectionObserver for fade-in sections
function fadeInSections() {
  const sections = document.querySelectorAll('.section-fade');
  const observer = new window.IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.animationPlayState = 'running';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  sections.forEach(section => {
    observer.observe(section);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fadeInSections();
  setupThemeSwitcher();
  setupMobileMenuFocusTrap();
});

// Theme switcher logic
function setupThemeSwitcher() {
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  let theme = localStorage.getItem('theme') || 'light';
  root.setAttribute('data-theme', theme);
  if (themeToggle) {
    themeToggle.checked = theme === 'dark';
    themeToggle.addEventListener('change', () => {
      theme = themeToggle.checked ? 'dark' : 'light';
      root.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    });
  }
}

// Focus trap for mobile menu
function setupMobileMenuFocusTrap() {
  const menu = document.querySelector('.header__sm-menu');
  if (!menu) return;
  menu.addEventListener('keydown', function(e) {
    if (e.key !== 'Tab') return;
    const focusable = menu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      last.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus();
      e.preventDefault();
    }
  });
}

document.querySelectorAll('.home-hero__social').forEach(social => {
  social.addEventListener('click', function(e) {
    // Remove fixed from all
    document.querySelectorAll('.home-hero__social').forEach(s => {
      s.classList.remove('social-fixed');
      const closeBtn = s.querySelector('.social-fixed__close');
      if (closeBtn) closeBtn.remove();
    });
    // Add fixed to clicked
    this.classList.add('social-fixed');
    // Add close button if not present
    if (!this.querySelector('.social-fixed__close')) {
      const btn = document.createElement('button');
      btn.className = 'social-fixed__close';
      btn.setAttribute('aria-label', 'Unfix social icon');
      btn.type = 'button';
      btn.innerHTML = '&times;';
      btn.tabIndex = 0;
      btn.onclick = (ev) => {
        ev.stopPropagation();
        this.classList.remove('social-fixed');
        btn.remove();
      };
      btn.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          this.classList.remove('social-fixed');
          btn.remove();
        }
      });
      this.appendChild(btn);
    }
  });
});

// 1. Make the dark/light mode toggle draggable
(function() {
  var btn = document.querySelector('.unique-toggle-btn.header-toggle-right');
  if (!btn) return;
  var isDragging = false, startX, startY, origX, origY;
  var touchId = null;
  function setPosition(x, y) {
    // Keep within viewport
    var minX = 0, minY = 0;
    var maxX = window.innerWidth - btn.offsetWidth;
    var maxY = window.innerHeight - btn.offsetHeight;
    x = Math.max(minX, Math.min(x, maxX));
    y = Math.max(minY, Math.min(y, maxY));
    btn.style.position = 'fixed';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
    btn.style.right = '';
    btn.style.transform = '';
  }
  function onDragStart(e) {
    isDragging = true;
    btn.classList.add('dragging');
    if (e.type === 'touchstart') {
      var touch = e.touches[0];
      touchId = touch.identifier;
      startX = touch.clientX;
      startY = touch.clientY;
    } else {
      startX = e.clientX;
      startY = e.clientY;
    }
    var rect = btn.getBoundingClientRect();
    origX = rect.left;
    origY = rect.top;
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
    document.addEventListener('touchmove', onDragMove, {passive:false});
    document.addEventListener('touchend', onDragEnd);
    e.preventDefault();
  }
  function onDragMove(e) {
    if (!isDragging) return;
    var clientX, clientY;
    if (e.type === 'touchmove') {
      var touch = Array.from(e.touches).find(t => t.identifier === touchId) || e.touches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    var dx = clientX - startX;
    var dy = clientY - startY;
    setPosition(origX + dx, origY + dy);
    e.preventDefault();
  }
  function onDragEnd(e) {
    isDragging = false;
    btn.classList.remove('dragging');
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup', onDragEnd);
    document.removeEventListener('touchmove', onDragMove);
    document.removeEventListener('touchend', onDragEnd);
    touchId = null;
  }
  btn.addEventListener('mousedown', onDragStart);
  btn.addEventListener('touchstart', onDragStart, {passive:false});
})();

// 2. Contact form burst animation: always show during typing/focus on mobile
(function() {
  var box = document.querySelector('.contact-animated-box');
  var form = document.querySelector('.contact-form-burst');
  if (!box || !form) return;
  var inputs = form.querySelectorAll('input, textarea');
  function showForm() {
    form.classList.add('burst-in');
  }
  function hideForm() {
    form.classList.remove('burst-in');
  }
  // Always show animation while any input is focused or being typed in
  inputs.forEach(function(input) {
    input.addEventListener('focus', showForm);
    input.addEventListener('input', showForm);
    input.addEventListener('blur', function() {
      // If no other input is focused, hide after a short delay
      setTimeout(function() {
        var stillFocused = Array.from(inputs).some(i => document.activeElement === i);
        if (!stillFocused) hideForm();
      }, 100);
    });
  });
  // On mobile, also show on touchstart
  box.addEventListener('touchstart', function(e) {
    showForm();
  });
  // Optionally, always show burst-in on mobile while keyboard is up
  // (No need to hide on mouseleave/blur for mobile)
})();
