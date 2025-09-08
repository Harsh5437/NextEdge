// Initialize AOS
AOS.init({
  duration: 1000,
  once: true
});

// Canvas setup
const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");
let particlesArray;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// Mouse interaction
const mouse = { x: null, y: null, radius: 100 };
window.addEventListener("mousemove", function(e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

// Business-like icons
const icons = ["</>", "{ }", "∞", "✓", "01", "++"];

class Particle {
  constructor(x, y, size, speedX, speedY, icon) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.icon = icon;

    // Opacity breathing
    this.opacity = Math.random();
    this.fadeSpeed = Math.random() * 0.01 + 0.002;
    this.increasing = Math.random() > 0.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    // Repel effect
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius) {
      this.x -= dx / 10;
      this.y -= dy / 10;
    }

    // Breathing effect
    if (this.increasing) {
      this.opacity += this.fadeSpeed;
      if (this.opacity >= 1) this.increasing = false;
    } else {
      this.opacity -= this.fadeSpeed;
      if (this.opacity <= 0.3) this.increasing = true;
    }
  }
  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.font = `${this.size}px Poppins`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(255, 107, 53, 0.8)";
    ctx.shadowBlur = 25;
    ctx.fillStyle = "white";
    ctx.fillText(this.icon, this.x, this.y);
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
}

function init() {
  particlesArray = [];
  let numberOfParticles = 25;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 30 + 35; // Bigger particles
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let speedX = (Math.random() - 0.5) * 1;
    let speedY = (Math.random() - 0.5) * 1;
    let icon = icons[Math.floor(Math.random() * icons.length)];
    particlesArray.push(new Particle(x, y, size, speedX, speedY, icon));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(particle => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animate);
}

init();
animate();

// 🌐 Smooth scroll + active nav highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Navbar background change on scroll
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile hamburger toggle
const hamburger = document.querySelector(".hamburger");
const navLinksContainer = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinksContainer.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinksContainer.classList.remove("active");
  });
});
