document.addEventListener("DOMContentLoaded", function () {
  // Enhanced Navigation
  const navbar = document.querySelector(".navbar");
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  const header = document.querySelector(".hero");

  // Intersection Observer for navbar
  const navObserver = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
    },
    { threshold: 0.9 }
  );

  if (header) {
    navObserver.observe(header);
  }

  // Enhanced Mobile Navigation
  if (burger) {
    burger.addEventListener("click", () => {
      // Toggle Nav
      nav.classList.toggle("nav-active");

      // Animate Links with Stagger Effect
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = "";
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`;
        }
      });

      // Animate Burger
      burger.classList.toggle("toggle");

      // Prevent body scroll when menu is open
      document.body.classList.toggle("nav-open");
    });
  }

  // Smooth Scrolling with Offset
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    // Skip anchors with href exactly '#'
    if (anchor.getAttribute("href") === "#") return;
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close mobile menu if open
        if (nav.classList.contains("nav-active")) {
          nav.classList.remove("nav-active");
          burger.classList.remove("toggle");
          document.body.classList.remove("nav-open");
          navLinks.forEach((link) => {
            link.style.animation = "";
          });
        }

        // Calculate scroll position with navbar offset
        const navbarHeight = navbar.offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
          top: targetPosition - navbarHeight,
          behavior: "smooth",
        });
      }
    });
  });

  // Enhanced Scroll Animations (with stagger)
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      // Staggered animation for grid/list containers
      if (entry.target.classList.contains("animate-stagger")) {
        const children = Array.from(entry.target.children);
        children.forEach((child, idx) => {
          setTimeout(() => {
            child.classList.add("appear");
          }, idx * 120);
          observer.unobserve(child);
        });
      } else {
        entry.target.classList.add("appear");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add .initially-hidden to all children of .animate-stagger
  document.querySelectorAll(".animate-stagger").forEach((container) => {
    Array.from(container.children).forEach((child) => {
      child.classList.add("initially-hidden");
      appearOnScroll.observe(child);
    });
  });

  // Observe .animate-on-scroll sections
  document.querySelectorAll(".animate-on-scroll").forEach((element) => {
    element.classList.add("initially-hidden");
    appearOnScroll.observe(element);
  });

  // Project Filtering with Smooth Transitions
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update active button with ripple effect
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.blur();
      });
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      // Filter projects with smooth transitions
      projectCards.forEach((card) => {
        card.classList.add("transitioning");

        setTimeout(() => {
          if (
            filterValue === "all" ||
            card.getAttribute("data-category") === filterValue
          ) {
            card.style.display = "block";
            setTimeout(() => {
              card.classList.remove("transitioning");
            }, 50);
          } else {
            card.style.display = "none";
            card.classList.remove("transitioning");
          }
        }, 300);
      });
    });
  });

  // Add Material Ripple Effect to Buttons
  const buttons = document.querySelectorAll(".btn, .filter-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = button.getBoundingClientRect();

      ripple.className = "ripple";
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  initTerminal();
  initParticles();
  initTyping();

  // Add the additional styles
  const style = document.createElement("style");
  style.textContent = additionalStyles;
  document.head.appendChild(style);

  // Back to Top smooth scroll
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- Resume Accordion Functionality ---
  document
    .querySelectorAll(".resume-accordion .accordion-header")
    .forEach((header) => {
      header.addEventListener("click", function () {
        const item = this.parentElement;
        const allItems = document.querySelectorAll(
          ".resume-accordion .accordion-item"
        );
        allItems.forEach((i) => i.classList.remove("active"));
        item.classList.toggle("active");
      });
    });

  // --- Animated Achievement Counters ---
  animateCounters();

  // --- Gauge Chart for Skill Proficiency ---
  if (window.Chart) renderGaugeChart();
});

// Add dynamic styles for animations
const style = document.createElement("style");
style.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .initially-hidden {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .appear {
        opacity: 1;
        transform: translateY(0);
    }
    
    .transitioning {
        opacity: 0;
        transform: scale(0.95);
        transition: opacity 0.3s ease-out, transform 0.3s ease-out;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-open {
        overflow: hidden;
    }
    
    .navbar-scrolled {
        padding: calc(var(--spacing-unit)) 0;
        background-color: rgba(255, 255, 255, 0.98);
    }
`;

document.head.appendChild(style);

// Add to DOMContentLoaded event
// Terminal typing effect
function initTerminal() {
  const terminal = document.querySelector(".terminal-content");
  if (!terminal) return;

  const commands = [
    { cmd: "whoami", output: "Muneeb Shoukat - DevOps Engineer & SRE" },
    {
      cmd: "skills --list",
      output: "AWS, Azure, GCP, Kubernetes, Terraform, CI/CD",
    },
    { cmd: "contact --email", output: "muneebshoukat111@gmail.com" },
    { cmd: "projects --recent", output: "Testfuse, Levvy, Crewnetics" },
  ];

  let html = "";
  commands.forEach(({ cmd, output }, i) => {
    html += `<div class="command-line" style="animation-delay: ${i * 0.5}s">`;
    html += `<span class="prompt">$ </span><span class="command">${cmd}</span><br>`;
    html += `<span class="output">${output}</span>`;
    html += "</div>";
  });

  terminal.innerHTML = html;
}

// Initialize particle background
function initParticles() {
  const canvas = document.getElementById("hero-particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = document.querySelector(".hero").offsetHeight);
  let particles = [];
  const num = Math.floor(w / 70);
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = document.querySelector(".hero").offsetHeight;
  }
  window.addEventListener("resize", resize);
  for (let i = 0; i < num; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 4 + Math.random() * 6,
      dx: 0.1 + Math.random() * 0.15,
      dy: 0.05 + Math.random() * 0.1,
      alpha: 0.06 + Math.random() * 0.09,
    });
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (let p of particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = "#2196F3";
      ctx.shadowColor = "#2196F3";
      ctx.shadowBlur = 10;
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

// Add to your existing style element
const additionalStyles = `
    .particles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: -1;
    }
    
    .particle {
      position: absolute;
      background: rgba(33, 150, 243, 0.15);
      border-radius: 50%;
      filter: blur(1px);
    }
    
    @keyframes float {
      0% { transform: translateY(0) translateX(0); }
      50% { transform: translateY(-50px) translateX(20px); }
      100% { transform: translateY(0) translateX(0); }
    }
    
    .command-line {
      opacity: 0;
      animation: fadeIn 0.5s ease forwards;
    }
  `;
function initTypingEffect() {
  const typingText = document.querySelector(".typing-text");
  if (!typingText) return;

  const text = "Transforming Ideas into";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      typingText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  // Start typing after a brief delay
  setTimeout(typeWriter, 500);
}

// 2. Typing Effect for Headline
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
      setTimeout(type, 70);
    }
  }
  type();
}

// 5. Project Card Tech Overlay
function initProjectCardOverlays() {
  document.querySelectorAll(".project-card").forEach((card) => {
    if (card.querySelector(".tech-overlay")) return;
    const tags = Array.from(card.querySelectorAll(".project-tags span")).map(
      (s) => s.textContent.trim()
    );
    const iconMap = {
      AWS: "fab fa-aws",
      Azure: "fab fa-microsoft",
      GCP: "fab fa-google",
      Terraform: "fas fa-code",
      Kubernetes: "fas fa-dharmachakra",
      Docker: "fab fa-docker",
      Prometheus: "fas fa-fire",
      Grafana: "fas fa-chart-bar",
      ELK: "fas fa-chart-line",
      Argo: "fas fa-code-branch",
      Vault: "fas fa-vault",
      Airflow: "fas fa-wind",
      Jenkins: "fab fa-jenkins",
      GitLab: "fab fa-gitlab",
      GitHub: "fab fa-github",
      Ansible: "fas fa-cogs",
      Helm3: "fas fa-ship",
      AKS: "fab fa-microsoft",
      EKS: "fab fa-aws",
      GKE: "fab fa-google",
      "GitLab CI": "fab fa-gitlab",
      "GitHub Actions": "fab fa-github",
      Open: "fas fa-code",
      DevOps: "fas fa-server",
      Infrastructure: "fas fa-network-wired",
      Automation: "fas fa-robot",
    };
    // Only show unique icons
    const uniqueTags = Array.from(new Set(tags));
    const overlay = document.createElement("div");
    overlay.className = "tech-overlay";
    uniqueTags.forEach((tag) => {
      const i = document.createElement("i");
      i.className = iconMap[tag] || "fas fa-cube";
      i.title = tag;
      overlay.appendChild(i);
    });
    // Move Visit Website button above overlay for clickability
    const visitBtn = card.querySelector(".project-links");
    if (visitBtn) {
      card.appendChild(visitBtn);
    }
    card.appendChild(overlay);
  });
}

// --- Animated Achievement Counters ---
function animateCounters() {
  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const current = +counter.innerText.replace(/\D/g, "") || 0;
      const increment = Math.ceil(target / 60);
      if (current < target) {
        counter.innerText =
          current + increment > target ? target : current + increment;
        setTimeout(updateCount, 18);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

// Only animate when achievements section is in view
function initAchievementObserver() {
  const section = document.getElementById("achievements");
  if (!section) return;
  let animated = false;
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !animated) {
        animateCounters();
        animated = true;
      }
    },
    { threshold: 0.3 }
  );
  observer.observe(section);
}

// --- Gauge Chart for Skill Proficiency ---
function renderGaugeChart() {
  if (!window.Chart) return;
  const ctx = document.getElementById("skill-gauge");
  if (!ctx) return;
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Proficiency", "Remaining"],
      datasets: [
        {
          data: [85, 15], // 85% proficiency
          backgroundColor: ["#2196F3", "#e0e0e0"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      cutout: "75%",
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      rotation: -90,
      circumference: 180,
    },
  });
}
