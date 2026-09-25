lucide.createIcons();

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

$('#year').textContent = new Date().getFullYear();

const menuBtn = $('#menuBtn');
const mobileMenu = $('#mobileMenu');
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  menuBtn.innerHTML = mobileMenu.classList.contains('hidden')
    ? '<i data-lucide="menu"></i>'
    : '<i data-lucide="x"></i>';
  lucide.createIcons();
});

$$('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${Math.min(i * 35, 180)}ms`;
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.08});

$$('.reveal').forEach(el => revealObserver.observe(el));

const sections = [...$$('main section[id]')];
const navLinks = [...$$('.nav-link')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, {rootMargin: '-35% 0px -55% 0px'});

sections.forEach(section => sectionObserver.observe(section));

const cursorDot = $('#cursorDot');
window.addEventListener('pointermove', (e) => {
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
});

$('#themeBtn').addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const light = document.body.classList.contains('light-mode');
  document.body.style.background = light
    ? '#eef8f4'
    : '';
  document.body.style.color = light
    ? '#07130f'
    : '';
  $('#themeBtn').innerHTML = light
    ? '<i data-lucide="moon" class="w-4"></i>'
    : '<i data-lucide="sun" class="w-4"></i>';
  lucide.createIcons();
});

$('#contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const text = [
    'Hello Suraj, I found your portfolio.',
    '',
    `Name: ${form.get('name')}`,
    `Email: ${form.get('email')}`,
    `Project: ${form.get('type')}`,
    `Message: ${form.get('message')}`
  ].join('\n');

  $('#toast').classList.add('show');
  setTimeout(() => {
    window.open(`https://wa.me/9779767166467?text=${encodeURIComponent(text)}`, '_blank');
  }, 500);
  setTimeout(() => $('#toast').classList.remove('show'), 3200);
});
