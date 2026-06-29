// AOS

//AOS ANIMATION
AOS.init();

// SCROLLREVEA
var swiper1 = new Swiper(".album-slide", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  autoplay: {
    delay: 3000,
  },
});

var invitationSlider = new Swiper(".invitation-card-slider", {
  slidesPerView: 1,
  spaceBetween: 20,
  centeredSlides: false,
  grabCursor: true,
  pagination: {
    el: ".invitation-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 32,
      allowTouchMove: false,
      grabCursor: false,
    },
  },
});

// FANCY BOX
(function () {
  const menuSelectors = ".desktop-menu, .mobile-menu";
  const menus = Array.from(document.querySelectorAll(menuSelectors));
  const setMenusVisible = (visible) => {
    menus.forEach((menu) => {
      if (menu) {
        menu.style.display = visible ? "" : "none";
      }
    });
  };

  // Keep track of the page hash before Fancybox opens so we can restore it
  // without causing an anchor jump on close.
  let savedHash = window.location.hash || "";

  // Capture the current hash before any [data-fancybox] link is activated.
  document.addEventListener(
    "click",
    (e) => {
      const el =
        e.target && e.target.closest && e.target.closest("[data-fancybox]");
      if (el) savedHash = window.location.hash || "";
    },
    true,
  );

  Fancybox.bind("[data-fancybox]", {
    // Try to disable built-in hash handling (some Fancybox builds use `hash`).
    Hash: false,
    hash: false,
    on: {
      init: () => setMenusVisible(false),
      closing: () => {
        setMenusVisible(true);
        try {
          const url = savedHash
            ? window.location.pathname + window.location.search + savedHash
            : window.location.pathname + window.location.search;
          history.replaceState(null, "", url);
        } catch (err) {}
      },
      destroy: () => setMenusVisible(true),
    },
  });

  document.addEventListener("fancybox:show", () => setMenusVisible(false));
  document.addEventListener("fancybox:closing", () => {
    setMenusVisible(true);
    try {
      const url = savedHash
        ? window.location.pathname + window.location.search + savedHash
        : window.location.pathname + window.location.search;
      history.replaceState(null, "", url);
    } catch (err) {}
  });
  document.addEventListener("fancybox:destroy", () => setMenusVisible(true));
})();

//AUDIO
$(".toggleAudio").on("click", function () {
  let audio = $("#audio")[0];
  audio.paused ? audio.play() : audio.pause();
  $(this).toggleClass("playing");
});
