document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  const header = document.querySelector(".hero");

  // Navbar scrolled effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });

  // Mobile Navigation toggle
  if (burger) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("nav-active");
      burger.classList.toggle("toggle");
      document.body.classList.toggle("nav-open");
    });
  }

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    if (anchor.getAttribute("href") === "#") return;
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        if (nav.classList.contains("nav-active")) {
          nav.classList.remove("nav-active");
          burger.classList.remove("toggle");
          document.body.classList.remove("nav-open");
        }
        const navbarHeight = navbar ? navbar.offsetHeight : 70;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: targetPosition - navbarHeight,
          behavior: "smooth",
        });
      }
    });
  });

  // Project Filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      projectCards.forEach((card) => {
        if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  initTerminal();
  initParticles();
  initTyping();
});

// Terminal Initializer with high-contrast text
function initTerminal() {
  const terminal = document.querySelector(".terminal-content");
  if (!terminal) return;

  const commands = [
    { cmd: "whoami", output: "Muneeb Shoukat — Senior DevOps Engineer & SRE" },
    { cmd: "skills --list", output: "AWS, Azure, GCP, Kubernetes, Terraform, Docker, CI/CD" },
    { cmd: "contact --email", output: "muneebshoukat111@gmail.com" },
    { cmd: "status --availability", output: "Open for High-Impact DevOps & SRE Roles" }
  ];

  let html = "";
  commands.forEach(({ cmd, output }) => {
    html += `<div class="command-line">`;
    html += `<span class="prompt">$ </span><span class="command">${cmd}</span><br>`;
    html += `<span class="output">${output}</span>`;
    html += `</div>`;
  });

  terminal.innerHTML = html;
}

// Particle Background on Hero
function initParticles() {
  const canvas = document.getElementById("hero-particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = document.querySelector(".hero").offsetHeight || 600);

  function resize() {
    w = canvas.width = window.innerWidth;
    const heroEl = document.querySelector(".hero");
    if (heroEl) h = canvas.height = heroEl.offsetHeight;
  }
  window.addEventListener("resize", resize);

  let particles = [];
  const num = Math.floor(w / 60);
  for (let i = 0; i < num; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 3 + Math.random() * 5,
      dx: 0.15 + Math.random() * 0.2,
      dy: 0.1 + Math.random() * 0.15,
      alpha: 0.08 + Math.random() * 0.12,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (let p of particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = "#4f46e5";
      ctx.shadowColor = "#06b6d4";
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x > w) p.x = 0;
      if (p.y > h) p.y = 0;
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// Typing Effect
function initTyping() {
  const el = document.querySelector(".typing-text");
  if (!el) return;
  const text = "Transforming Ideas into";
  let i = 0;
  el.textContent = "";
  function type() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 75);
    }
  }
  type();
}
