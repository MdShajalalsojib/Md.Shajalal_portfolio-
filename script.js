// ===== Loader =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => (loader.style.display = "none"), 400);
  }, 600);
});

// ===== Custom Cursor =====
const dot = document.querySelector(".cursor-dot");
const glow = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", (e) => {
  dot.style.left = e.clientX + "px";
  dot.style.top = e.clientY + "px";
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// ===== Theme Toggle =====
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const icon = themeToggle.querySelector("i");
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
});

// ===== Sticky Navbar + Scroll Progress + Back to Top =====
const navbar = document.getElementById("navbar");
const progress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  backToTop.classList.toggle("show", window.scrollY > 400);
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = scrolled + "%";
});
backToTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

// ===== Hamburger Menu =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => navLinks.classList.toggle("show"));
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("show"));
});

// ===== Smooth Scroll + Active Nav =====
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.getAttribute("id");
  });
  navItems.forEach((item) => {
    item.classList.toggle(
      "active",
      item.getAttribute("href") === `#${current}`,
    );
  });
});

// ===== Typing Animation =====
const typedEl = document.getElementById("typed");
const words = [
  "Frontend Developer",
  "CSE Student",
  "UI Designer",
  "Problem Solver",
];
let wIndex = 0,
  cIndex = 0,
  deleting = false;
function typeEffect() {
  const current = words[wIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++cIndex);
    if (cIndex === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --cIndex);
    if (cIndex === 0) {
      deleting = false;
      wIndex = (wIndex + 1) % words.length;
    }
  }
  setTimeout(typeEffect, deleting ? 50 : 100);
}
typeEffect();

// ===== Scroll Reveal =====
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("active");
    });
  },
  { threshold: 0.15 },
);
revealEls.forEach((el) => revealObserver.observe(el));

// ===== Animated Skill Circles =====
const skillCircles = document.querySelectorAll(".skill-circle");
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const circle = entry.target;
        const percent = circle.getAttribute("data-percent");
        const progressCircle = circle.querySelector(".progress");
        const percentText = circle.querySelector(".skill-percent");
        const circumference = 339.3;
        const offset = circumference - (percent / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
        let count = 0;
        const step = setInterval(() => {
          count++;
          percentText.textContent = count + "%";
          if (count >= percent) clearInterval(step);
        }, 15);
        skillObserver.unobserve(circle);
      }
    });
  },
  { threshold: 0.5 },
);
skillCircles.forEach((c) => skillObserver.observe(c));

// ===== Animated Counters =====
const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const increment = Math.ceil(target / 60);
        const update = () => {
          count += increment;
          if (count >= target) {
            counter.textContent = target;
          } else {
            counter.textContent = count;
            requestAnimationFrame(update);
          }
        };
        update();
        counterObserver.unobserve(counter);
      }
    });
  },
  { threshold: 0.5 },
);
counters.forEach((c) => counterObserver.observe(c));

// ===== Project Filtering =====
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.getAttribute("data-filter");
    projectCards.forEach((card) => {
      const show =
        filter === "all" || card.getAttribute("data-category") === filter;
      card.style.display = show ? "block" : "none";
    });
  });
});

// ===== Project Search =====
const searchInput = document.getElementById("projectSearch");
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  projectCards.forEach((card) => {
    const title = card.getAttribute("data-title").toLowerCase();
    card.style.display = title.includes(query) ? "block" : "none";
  });
});

// ===== Project Details Popup =====
const popupOverlay = document.getElementById("popupOverlay");
const popupClose = document.getElementById("popupClose");
const popupTitle = document.getElementById("popupTitle");
const popupDesc = document.getElementById("popupDesc");
const popupTech = document.getElementById("popupTech");
document.querySelectorAll(".view-details").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".project-card");
    popupTitle.textContent = card.getAttribute("data-title");
    popupDesc.textContent = card.getAttribute("data-desc");
    popupTech.textContent = card.getAttribute("data-tech");
    popupOverlay.classList.add("active");
  });
});
popupClose.addEventListener("click", () =>
  popupOverlay.classList.remove("active"),
);
popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) popupOverlay.classList.remove("active");
});

// ===== Image Lightbox (Certificates) =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
document.querySelectorAll(".lightbox-img").forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxImg.src = img.src;
  });
});
lightboxClose.addEventListener("click", () =>
  lightbox.classList.remove("active"),
);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("active");
});

// ===== Contact Form Validation =====
const contactForm = document.getElementById("contactForm");
const formError = document.getElementById("formError");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !subject || !message) {
    formError.textContent = "Please fill in all required fields.";
    return;
  }
  if (!emailRegex.test(email)) {
    formError.textContent = "Please enter a valid email address.";
    return;
  }
  formError.style.color = "var(--accent)";
  formError.textContent = "✅ Message sent successfully!";
  contactForm.reset();
  setTimeout(() => {
    formError.textContent = "";
    formError.style.color = "#f87171";
  }, 3000);
});

// ===== Floating Particles Background =====
const particlesContainer = document.getElementById("particles");
for (let i = 0; i < 40; i++) {
  const p = document.createElement("div");
  const size = Math.random() * 4 + 2;
  p.style.position = "absolute";
  p.style.width = size + "px";
  p.style.height = size + "px";
  p.style.background = "rgba(37,99,235,0.4)";
  p.style.borderRadius = "50%";
  p.style.left = Math.random() * 100 + "%";
  p.style.top = Math.random() * 100 + "%";
  p.style.animation = `floatParticle ${Math.random() * 10 + 8}s linear infinite`;
  particlesContainer.appendChild(p);
}
const style = document.createElement("style");
style.textContent = `
@keyframes floatParticle{
  0%{transform:translateY(0) translateX(0);opacity:0;}
  10%{opacity:1;}
  90%{opacity:1;}
  100%{transform:translateY(-100vh) translateX(30px);opacity:0;}
}`;
document.head.appendChild(style);

// ===== Footer Year =====
document.getElementById("year").textContent = new Date().getFullYear();
