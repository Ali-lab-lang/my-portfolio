(() => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const backToTop = document.querySelector(".back-to-top");
  const year = document.getElementById("current-year");

  // Automatically update the copyright year.
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Mobile navigation menu.
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");

      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    // Close the menu after selecting a section.
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation");
      });
    });

    // Close the menu when clicking outside it.
    document.addEventListener("click", (event) => {
      if (
        !navLinks.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation");
      }
    });
  }

  // Reveal sections while scrolling.
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            activeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });
  }

  // Show the back-to-top button after scrolling.
  const updateBackToTop = () => {
    if (backToTop) {
      backToTop.classList.toggle("visible", window.scrollY > 500);
    }
  };

  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  updateBackToTop();
})();
