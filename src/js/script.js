/* ===> For all sections  <=== */
document.addEventListener("DOMContentLoaded", function () {
  if (
    window.screen.width >= 1920 &&
    (navigator.userAgent.includes("SmartTV") ||
      navigator.userAgent.includes("Tizen") ||
      navigator.userAgent.includes("WebOS"))
  ) {
    document.body.classList.add("is-tv");
  } else {
    document.body.classList.add("is-laptop");
  }
});

/* Custom Scroll Bar */
let progress = document.getElementById("progressBar");
let totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function () {
  let progressHeight = (window.pageYOffset / totalHeight) * 100;
  progress.style.height = progressHeight + "%";
};

/* Flashing Title */
const titles = [
  "Engenharia de Software",
  "Atividade - Front-End",
  "Menu Responsivo",
];
let currentIndex = 0;

setInterval(() => {
  document.title = titles[currentIndex];
  currentIndex = (currentIndex + 1) % titles.length;
}, 1000);

/* ===> Navbar - Home  <=== */
document.addEventListener("DOMContentLoaded", function () {
  function updateNavbarState() {
    const navbar = document.querySelector(".navbar");
    const logo = document.querySelector(".logo_img__nav");
    const anchors = document.querySelectorAll(".anchor__nav");
    const submenus = document.querySelectorAll(".submenu.active");
    const menuNav = document.querySelector(".menu__nav");

    if (window.scrollY > 20) {
      navbar.classList.add("navbar_min");
      logo.classList.add("logo_img__nav_min");
      anchors.forEach((element) => {
        element.classList.add("anchor__nav_scroll");
      });
      submenus.forEach((submenu) => {
        submenu.classList.add("submenu_min");
      });
      if (menuNav.classList.contains("active")) {
        menuNav.classList.add("menu__nav_min");
      }
    } else {
      navbar.classList.remove("navbar_min");
      logo.classList.remove("logo_img__nav_min");
      anchors.forEach((element) => {
        element.classList.remove("anchor__nav_scroll");
      });
      submenus.forEach((submenu) => {
        submenu.classList.remove("submenu_min");
      });
      menuNav.classList.remove("menu__nav_min");
    }
  }

  window.addEventListener("scroll", updateNavbarState);

  /* ===> Navbar - Submenu  <=== */
  const navItems = document.querySelectorAll(".nav-item");
  const navLinks = document.querySelectorAll(".anchor__nav");
  const submenuLinks = document.querySelectorAll(".submenu__anchor");

  function closeAllSubmenus() {
    document.querySelectorAll(".submenu").forEach((submenu) => {
      submenu.classList.remove("active");
    });
  }

  function setActiveLink(link) {
    document
      .querySelectorAll(".anchor__nav, .submenu__anchor")
      .forEach((el) => {
        el.classList.remove("active-link");
      });
    link.classList.add("active-link");
  }

  // Main links * except "About"
  navLinks.forEach((link) => {
    if (!link.parentElement.classList.contains("nav-item")) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        setActiveLink(this);
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const elementRect = targetElement.getBoundingClientRect();
          const offset =
            elementRect.top +
            window.pageYOffset -
            window.innerHeight / 2 +
            elementRect.height / 2;
          $("html, body").animate(
            { scrollTop: offset },
            1000,
            "easeInOutCubic",
            () => {
              updateNavbarState();
            }
          );
        }

        if (window.innerWidth <= 885) {
          document.querySelector(".menu__nav").classList.remove("active");
          document
            .querySelector(".btn_menu__nav")
            .classList.remove("btn_menu__nav_disable");
        }
      });
    }
  });

  // Submenu links
  submenuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      setActiveLink(this);
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const elementRect = targetElement.getBoundingClientRect();
        const offset =
          elementRect.top +
          window.pageYOffset -
          window.innerHeight / 2 +
          elementRect.height / 2;
        $("html, body").animate(
          { scrollTop: offset },
          1000,
          "easeInOutCubic",
          () => {
            updateNavbarState();
          }
        );
      }

      if (window.innerWidth <= 885) {
        document.querySelector(".menu__nav").classList.remove("active");
        document
          .querySelector(".btn_menu__nav")
          .classList.remove("btn_menu__nav_disable");
      }

      if (window.innerWidth > 885) {
        closeAllSubmenus();
      }
    });
  });

  // Desktop submenu control
  navItems.forEach((item) => {
    const anchor = item.querySelector(".anchor__nav");
    const submenu = item.querySelector(".submenu");

    anchor.addEventListener("click", function (e) {
      if (window.innerWidth > 885) {
        e.preventDefault();
        const isActive = submenu.classList.contains("active");
        closeAllSubmenus();
        if (!isActive) {
          requestAnimationFrame(() => {
            if (window.scrollY > 20) {
              submenu.classList.add("submenu_min");
            } else {
              submenu.classList.remove("submenu_min");
            }
            submenu.classList.add("active");
          });
        }
      }
    });
  });

  // Close submenus click outside
  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".nav-item") &&
      !e.target.closest(".submenu__anchor") &&
      window.innerWidth > 885
    ) {
      closeAllSubmenus();
    }
  });
});

/* Menu - Mobile */
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".btn_menu__nav")
    .addEventListener("click", function () {
      const menuNav = document.querySelector(".menu__nav");
      menuNav.classList.toggle("active");
      document
        .querySelector(".btn_menu__nav")
        .classList.toggle("btn_menu__nav_disable");
      // Update the mobile menu status
      requestAnimationFrame(() => {
        if (window.scrollY > 20 && menuNav.classList.contains("active")) {
          menuNav.classList.add("menu__nav_min");
        } else {
          menuNav.classList.remove("menu__nav_min");
        }
      });
    });

  document.querySelectorAll(".submenu-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const submenu = this.parentElement.querySelector(".submenu");
      submenu.classList.toggle("active");
      const icon = this.querySelector("ion-icon");
      icon.setAttribute(
        "name",
        submenu.classList.contains("active")
          ? "chevron-up-outline"
          : "chevron-down-outline"
      );
      // Update submenu status on mobile
      requestAnimationFrame(() => {
        if (window.scrollY > 20) {
          submenu.classList.add("submenu_min");
        } else {
          submenu.classList.remove("submenu_min");
        }
      });
    });
  });
});

/* ===> Section - Home  <=== */
var typingEffect = new Typed(".multitext_h1__home", {
  strings: [
    "- Edmar Radanovis",
    "Atividade - unid-3 - aula-2",
    "Front-End Baseado em Framework",
    "Construção do Menu Responsivo ...",
    "... e Interativo com => HTML + CSS + JS",
  ],
  loop: true,
  typeSpeed: 70,
  backSpeed: 20,
  backDelay: 1000,
});
