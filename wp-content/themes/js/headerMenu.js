/* header.js */
function onePageOpenNav() {
  var element = document.getElementById("mobile-menu-area");
  if (element) {
    element.classList.add("menu-open");
  }
}

function onePageCloseNav() {
  var element = document.getElementById("mobile-menu-area");
  if (element) {
    element.classList.remove("menu-open");
  }
}

if (document.readyState !== "loading") {
  attachHeaderEvents();
} else {
  document.addEventListener("DOMContentLoaded", attachHeaderEvents);
}

function attachHeaderEvents() {
  var overlay = document.querySelector(".mobile-menu__overlay");
  var closeBtn = document.querySelector(".closebtn");
  var openBtn = document.querySelector(".toggle-btn");

  if (overlay) {
    overlay.addEventListener("click", onePageCloseNav);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", onePageCloseNav);
  }

  if (openBtn) {
    openBtn.addEventListener("click", onePageOpenNav);
  }

  updateHeaderMenuScroll();
  window.addEventListener("scroll", updateHeaderMenuScroll, { passive: true });
  window.addEventListener("resize", updateHeaderMenuScroll);
}

function updateHeaderMenuScroll() {
  var headerMenu = document.getElementById("headerMenu");
  var banner = document.getElementById("banner");
  if (!headerMenu || !banner) {
    return;
  }

  var bannerBottom = banner.getBoundingClientRect().bottom;
  var isScrolled =
    bannerBottom <= 0 || window.scrollY > banner.offsetHeight - 20;
  headerMenu.classList.toggle("scrolled", isScrolled);
}
