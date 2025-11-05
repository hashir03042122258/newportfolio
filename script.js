// Sidebar toggle for mobile
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebar = document.querySelector('.sidebar');

hamburgerBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Optional: Close sidebar when a link is clicked (on mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 700) {
      sidebar.classList.remove('active');
    }
  });
});

// Dropdown toggle for sidebar
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', function(e) {
    e.preventDefault();
    const parent = this.parentElement;
    // Close other open dropdowns
    document.querySelectorAll('.dropdown').forEach(drop => {
      if (drop !== parent) drop.classList.remove('open');
    });
    parent.classList.toggle('open');
  });
});

// Close dropdown on outside click
window.addEventListener('click', function(e) {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown').forEach(drop => drop.classList.remove('open'));
  }
});

// Prevent closing when clicking inside dropdown
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(drop => {
  drop.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});

// Typing effect for home page
const typingText = document.getElementById('typing-text');
if (typingText) {
  const text = "Hi, I'm MUHAMMAD HASHIR";
  let idx = 0;
  function type() {
    if (idx <= text.length) {
      typingText.textContent = text.slice(0, idx);
      idx++;
      setTimeout(type, 80);
    }
  }
  type();
}

// Bee flying with text for home page
const beeText = document.querySelector('.bee-text');
const bee = document.querySelector('.bee-text .bee');
const beeMsg = document.querySelector('.bee-text .bee-message');
if (beeText && bee && beeMsg) {
  bee.textContent = '🐝';
  beeMsg.textContent = 'I am Muhammad Hashir. Welcome to my portfolio dashboard!';
  beeText.classList.add('fly-in');
  setTimeout(() => {
    beeText.classList.remove('fly-in');
    beeText.classList.add('fly-out');
    setTimeout(() => {
      beeText.style.display = 'none';
    }, 1200);
  }, 10000);
}

// Animated role typewriter effect
const roles = [
  'Web Designer',
  'Frontend Developer',
  'Problem Solver',
  'Freelancer'
];
const roleText = document.getElementById('role-text');
let roleIdx = 0, charIdx = 0, isDeleting = false;
function typeRole() {
  if (!roleText) return;
  const current = roles[roleIdx];
  if (isDeleting) {
    roleText.textContent = current.substring(0, charIdx--);
    if (charIdx < 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(typeRole, 600);
    } else {
      setTimeout(typeRole, 40);
    }
  } else {
    roleText.textContent = current.substring(0, charIdx++);
    if (charIdx > current.length) {
      isDeleting = true;
      setTimeout(typeRole, 1200);
    } else {
      setTimeout(typeRole, 80);
    }
  }
}
typeRole();

// Animated quick stats numbers
const statNums = document.querySelectorAll('.stat-num');
statNums.forEach(num => {
  const target = +num.getAttribute('data-target');
  let count = 0;
  const increment = Math.ceil(target / 60);
  function updateNum() {
    if (count < target) {
      count += increment;
      if (count > target) count = target;
      num.textContent = count;
      setTimeout(updateNum, 24);
    } else {
      num.textContent = target;
    }
  }
  updateNum();
});

// Animated background dots
const bg = document.querySelector('.animated-bg');
if (bg) {
  for (let i = 0; i < 22; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.width = dot.style.height = `${16 + Math.random()*24}px`;
    dot.style.left = `${Math.random()*100}%`;
    dot.style.top = `${Math.random()*100}%`;
    dot.style.animationDuration = `${6 + Math.random()*6}s`;
    bg.appendChild(dot);
  }
}

// Section fade-in on scroll
const fadeSections = document.querySelectorAll('.about-section, .projects-preview-section, .quote-section, .tools-section, .funfact-section');
function checkFadeSections() {
  fadeSections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      sec.classList.add('fade-in-section', 'visible');
    }
  });
}
window.addEventListener('scroll', checkFadeSections);
window.addEventListener('load', checkFadeSections);

// Profile image parallax hover
const tilt = document.querySelector('[data-tilt]');
if (tilt) {
  tilt.addEventListener('mousemove', e => {
    const rect = tilt.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    tilt.style.transform = `rotateY(${x/18}deg) rotateX(${-y/18}deg) scale(1.04)`;
  });
  tilt.addEventListener('mouseleave', () => {
    tilt.style.transform = '';
  });
}

// Project card 3D tilt
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  const inner = document.createElement('div');
  while(card.firstChild) inner.appendChild(card.firstChild);
  inner.className = 'project-card-inner';
  card.appendChild(inner);
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    inner.style.transform = `rotateY(${x/18}deg) scale(1.04)`;
  });
  card.addEventListener('mouseleave', () => {
    inner.style.transform = '';
  });
});

// Button ripple effect
function addRipple(e) {
  const btn = e.currentTarget;
  const ripple = btn.querySelector('::after');
  btn.classList.add('ripple');
  setTimeout(() => btn.classList.remove('ripple'), 400);
}
document.querySelectorAll('.cta-btn, .project-btn').forEach(btn => {
  btn.addEventListener('click', addRipple);
});

// Contact form validation and feedback
const contactForm = document.getElementById('mainContactForm');
const formMsg = document.getElementById('formMessage');
if (contactForm && formMsg) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name) {
      formMsg.textContent = 'Please enter your name.';
      formMsg.className = 'form-message error';
      return;
    }
    if (!email || !emailRegex.test(email)) {
      formMsg.textContent = 'Please enter a valid email address.';
      formMsg.className = 'form-message error';
      return;
    }
    if (!message) {
      formMsg.textContent = 'Please enter your message.';
      formMsg.className = 'form-message error';
      return;
    }
    // Success
    formMsg.textContent = 'Thank you! Your message has been received.';
    formMsg.className = 'form-message success';
    contactForm.reset();
    setTimeout(() => { formMsg.textContent = ''; }, 4000);
  });
} 