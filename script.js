(function () {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const revealItems = document.querySelectorAll('.reveal-text');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (toggle && nav) {
    function setMenuState(isOpen) {
      nav.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    }

    toggle.addEventListener('click', function () {
      const isOpen = !nav.classList.contains('is-open');
      setMenuState(isOpen);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 720) {
        setMenuState(false);
      }
    });
  }

  if (!revealItems.length) return;

  if (prefersReducedMotion.matches) {
    revealItems.forEach(function (item) {
      item.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  revealItems.forEach(function (item) {
    observer.observe(item);
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const transitionDuration = 700;

  // Add the transition element if it does not already exist
  if (!document.querySelector(".page-transition")) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div class="page-transition" aria-hidden="true">
          <div class="page-transition__circle"></div>
        </div>
      `
    );
  }

  // On the new page, shrink the circle back into the middle
  root.classList.add("is-entering");

  window.setTimeout(() => {
    root.classList.remove("is-entering");
  }, transitionDuration);

  // Animate internal links before navigating away
  document.querySelectorAll('a[href]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const url = new URL(link.href, window.location.href);

      const isInternalLink = url.origin === window.location.origin;
      const isSamePage = url.href === window.location.href;
      const isAnchorLink = url.hash && url.pathname === window.location.pathname;
      const opensNewTab = link.target === "_blank";
      const isDownload = link.hasAttribute("download");
      const isModifiedClick =
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

      // Do not interfere with external links, anchors, downloads, etc.
      if (
        !isInternalLink ||
        isSamePage ||
        isAnchorLink ||
        opensNewTab ||
        isDownload ||
        isModifiedClick
      ) {
        return;
      }

      event.preventDefault();

      // Prevent double-clicks during the transition
      if (root.classList.contains("is-leaving")) return;

      root.classList.add("is-leaving");

      window.setTimeout(() => {
        window.location.href = url.href;
      }, transitionDuration);
    });
  });

  // Restore the page if the visitor returns with the browser Back button
  window.addEventListener("pageshow", () => {
    root.classList.remove("is-leaving");
  });
});
