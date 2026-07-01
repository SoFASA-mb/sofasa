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
