/* =========================================
   AOS (Animate On Scroll) INITIALIZATION
========================================= */
AOS.init({
  duration: 1000, // animation duration in ms
  once: true      // animate only once
});

/* =========================================
   HERO CANVAS
   Floating icons with mouse interaction
========================================= */
const heroCanvas = document.getElementById("heroCanvas");
const ctxHero = heroCanvas.getContext("2d");
let heroParticles = [];

heroCanvas.width = window.innerWidth;
heroCanvas.height = window.innerHeight;

const mouseHero = { x: null, y: null, radius: 100 };

// Track mouse position
window.addEventListener("mousemove", (e) => {
  mouseHero.x = e.x;
  mouseHero.y = e.y;
});

// Icons for hero particles
const heroIcons = ["</>", "{ }", "∞", "✓", "01", "++"];

// Particle class
class HeroParticle {
  constructor(x, y, size, speedX, speedY, icon) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.icon = icon;
    this.opacity = Math.random();
    this.fadeSpeed = Math.random() * 0.01 + 0.002;
    this.increasing = Math.random() > 0.5;
  }

  update() {
    // Move particle
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off edges
    if (this.x < 0 || this.x > heroCanvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > heroCanvas.height) this.speedY *= -1;

    // Repel from mouse
    const dx = mouseHero.x - this.x;
    const dy = mouseHero.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouseHero.radius) {
      this.x -= dx / 10;
      this.y -= dy / 10;
    }

    // Fade in/out
    if (this.increasing) {
      this.opacity += this.fadeSpeed;
      if (this.opacity >= 1) this.increasing = false;
    } else {
      this.opacity -= this.fadeSpeed;
      if (this.opacity <= 0.3) this.increasing = true;
    }
  }

  draw() {
    ctxHero.globalAlpha = this.opacity;
    ctxHero.font = `${this.size}px Poppins`;
    ctxHero.textAlign = "center";
    ctxHero.textBaseline = "middle";
    ctxHero.shadowColor = "rgba(255,107,53,0.8)";
    ctxHero.shadowBlur = 25;
    ctxHero.fillStyle = "white";
    ctxHero.fillText(this.icon, this.x, this.y);
    ctxHero.shadowBlur = 0;
    ctxHero.globalAlpha = 1;
  }
}

// Initialize hero particles
function initHeroParticles() {
  heroParticles = [];
  for (let i = 0; i < 25; i++) {
    const size = Math.random() * 30 + 35;
    const x = Math.random() * heroCanvas.width;
    const y = Math.random() * heroCanvas.height;
    const speedX = (Math.random() - 0.5) * 1;
    const speedY = (Math.random() - 0.5) * 1;
    const icon = heroIcons[Math.floor(Math.random() * heroIcons.length)];
    heroParticles.push(new HeroParticle(x, y, size, speedX, speedY, icon));
  }
}

// Animate hero particles
function animateHero() {
  ctxHero.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
  heroParticles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateHero);
}

initHeroParticles();
animateHero();

/* =========================================
   ABOUT SECTION QUOTE ANIMATION
========================================= */
const aboutQuote = document.querySelector(".about-quote");
let floatAngle = 0;
let opacityDir = 1;
let currentOpacity = 0.05;

function animateQuote() {
  floatAngle += 0.02;

  const xOffset = Math.sin(floatAngle) * 20;
  const yOffset = Math.cos(floatAngle / 2) * 15;
  const rotation = Math.sin(floatAngle / 3) * 5;

  // Animate opacity
  currentOpacity += 0.0008 * opacityDir;
  if (currentOpacity >= 0.08 || currentOpacity <= 0.03) opacityDir *= -1;

  aboutQuote.style.transform = `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px)) rotate(${rotation}deg)`;
  aboutQuote.style.color = `rgba(0,0,0,${currentOpacity})`;

  requestAnimationFrame(animateQuote);
}

animateQuote();

/* =========================================
   COUNT-UP ANIMATION (STATS)
========================================= */

const counters = document.querySelectorAll('.count');

counters.forEach(counter => {
  counter.innerText = '0';

  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const current = +counter.innerText;
    const increment = Math.ceil(target / 100); // smaller step for slower count

    if (current < target) {
      counter.innerText = Math.min(current + increment, target);
      setTimeout(updateCount, 50); // slower update
    } else {
      counter.innerText = target; // ensure exact target
    }
  }

  // Start counting when visible
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateCount();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(counter);
});


/* =========================================
   NAVBAR SCROLL AND ACTIVE LINK
========================================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  // Highlight current section
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) current = section.getAttribute("id");
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) link.classList.add("active");
  });

  // Navbar background
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");

  // Close mobile menu if open
  if (navMenu.classList.contains('show')) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('show');
  }
});

/* =========================================
   HAMBURGER MENU (MOBILE)
========================================= */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');

// Toggle menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('show');
});

// Close menu when clicking a link
links.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('show');
  });
});

/* =========================================
   SERVICES BUTTON HOVER EFFECT
========================================= */
const serviceButtons = document.querySelectorAll(".btn");

serviceButtons.forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    btn.style.backgroundColor = "var(--button-hover)";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.backgroundColor = "var(--primary-color)";
  });
});
