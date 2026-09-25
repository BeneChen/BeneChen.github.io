(() => {
  const root = document.documentElement;
  try {
    if (localStorage.getItem('bene-theme') === 'dark') root.dataset.theme = 'dark';
  } catch (_) { /* The page also works when browser storage is unavailable. */ }
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme-toggle');
    const updateThemeButton = () => {
      const dark = root.dataset.theme === 'dark';
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
      document.querySelector('meta[name="theme-color"]').content = dark ? '#0f172a' : '#fefffe';
    };
    button.hidden = false;
    updateThemeButton();
    button.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('bene-theme', root.dataset.theme); } catch (_) {}
      updateThemeButton();
    });
    const links = [...document.querySelectorAll('.nav-link')];
    const sections = links.map(link => document.querySelector(link.hash));
    const updateNavigation = () => {
      const offset = document.querySelector('.site-header').offsetHeight + 70;
      let active = sections[0];
      sections.forEach(section => { if (section.getBoundingClientRect().top <= offset) active = section; });
      if (window.scrollY > 0 && Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 2) active = sections[sections.length - 1];
      links.forEach(link => {
        const selected = link.hash === `#${active.id}`;
        link.classList.toggle('active', selected);
        if (selected) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };
    window.addEventListener('scroll', updateNavigation, { passive: true });
    window.addEventListener('resize', updateNavigation);
    updateNavigation();
  });
})();
