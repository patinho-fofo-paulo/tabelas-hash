/* Guia visual de tabelas de hash */

/* ---------- alternância de tema ---------- */
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  const isLight = theme === "light";
  themeToggle.setAttribute("aria-pressed", String(isLight));
  themeToggle.setAttribute("aria-label", isLight ? "Ativar tema escuro" : "Ativar tema claro");
  themeToggle.title = isLight ? "Ativar tema escuro" : "Ativar tema claro";
}

let savedTheme = null;
try {
  savedTheme = localStorage.getItem("hash-theme");
} catch (error) {
  /* armazenamento indisponível: mantém o padrão escuro */
}

applyTheme(savedTheme === "light" ? "light" : "dark");

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  applyTheme(next);
  try {
    localStorage.setItem("hash-theme", next);
  } catch (error) {
    /* preferência não persistida neste navegador */
  }
});

/* ---------- decoração do hero ---------- */
const heroGrid = document.getElementById("heroGrid");
for (let i = 0; i < 32; i++) {
  const cell = document.createElement("span");
  if (i === 4) cell.classList.add("on");
  else if ([3, 12, 20, 29].includes(i)) cell.classList.add("hi");
  heroGrid.appendChild(cell);
}

/* ---------- animação de entrada ---------- */
const sections = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  sections.forEach((el) => observer.observe(el));
} else {
  sections.forEach((el) => el.classList.add("visible"));
}
