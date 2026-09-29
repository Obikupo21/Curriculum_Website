const SHOW_HIDDEN_SOCIALS = false;

const HIDDEN_SOCIALS = [
  {
    name: "TikTok",
    handle: "@obikupo",
    url: "https://www.tiktok.com/@obikupo",
    icon: '<svg viewBox="0 0 24 24"><path d="M16.6 5.82c-.9-.98-1.4-2.25-1.4-3.57h-3.19v13.44a2.6 2.6 0 1 1-1.85-2.49V9.9a5.77 5.77 0 0 0-.75-.05A5.83 5.83 0 1 0 15.24 15.68V9.03a7.6 7.6 0 0 0 4.42 1.41V7.27a4.85 4.85 0 0 1-3.06-1.45z"/></svg>'
  },
  {
    name: "YouTube",
    handle: "canal",
    url: "https://www.youtube.com/channel/UCucxlFjEHsEmnV-yfiIUhxA",
    icon: '<svg viewBox="0 0 24 24"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z"/></svg>'
  }
];

const sidebar = document.getElementById("sidebar");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");
const hamburger = document.getElementById("hamburger");

function closeMobileNav() {
  sidebar?.classList.remove("open");
  sidebarBackdrop?.classList.remove("open");
  hamburger?.setAttribute("aria-expanded", "false");
}

hamburger?.addEventListener("click", () => {
  const isOpen = sidebar?.classList.toggle("open");
  sidebarBackdrop?.classList.toggle("open", !!isOpen);
  hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
});
sidebarBackdrop?.addEventListener("click", closeMobileNav);

const themeToggle = document.getElementById("themeToggle");

function applyStoredTheme() {
  try {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "light") document.documentElement.setAttribute("data-theme", "light");
  } catch (e) {
    /* localStorage unavailable — fall back to system/dark default */
  }
}

themeToggle?.addEventListener("click", () => {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  if (isLight) {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
  try {
    localStorage.setItem("portfolio-theme", isLight ? "dark" : "light");
  } catch (e) {
    /* ignore */
  }
});

applyStoredTheme();

const clockEl = document.getElementById("statusClock");

function tickClock() {
  if (!clockEl) return;
  const now = new Date();
  const formatted = new Intl.DateTimeFormat("es-ES", {
    timeZone: "Europe/Madrid",
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);
  clockEl.textContent = formatted;
}
tickClock();
setInterval(tickClock, 30000);

if (SHOW_HIDDEN_SOCIALS) {
  const container = document.getElementById("hiddenSocials");
  if (container) {
    container.hidden = false;
    container.innerHTML = HIDDEN_SOCIALS.map(
      (s) => `
      <a class="contact-card" href="${s.url}" target="_blank" rel="noopener">
        ${s.icon}
        <div>
          <h4>${s.name}</h4>
          <span>${s.handle}</span>
        </div>
      </a>`
    ).join("");
  }
}
