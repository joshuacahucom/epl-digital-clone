// EPL site scripts: Mobile menu, dropdowns, animations, situation picker, team filter
function initSite() {
  if (typeof document === 'undefined') return;

  // Mobile menu
  const btn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  if (btn && nav && !btn.dataset.bound) {
    btn.dataset.bound = 'true';
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Close' : 'Menu';
    });
  }

  // Services dropdown
  const dropBtn = document.querySelector('.has-drop > button');
  if (dropBtn && !dropBtn.dataset.bound) {
    dropBtn.dataset.bound = 'true';
    dropBtn.addEventListener('click', () => {
      const li = dropBtn.parentElement;
      const open = li.classList.toggle('open');
      dropBtn.setAttribute('aria-expanded', String(open));
    });
  }

  if (!window._eplDocClickBound) {
    window._eplDocClickBound = true;
    document.addEventListener('click', (e) => {
      const activeDropBtn = document.querySelector('.has-drop > button');
      const li = activeDropBtn?.parentElement;
      if (li && !li.contains(e.target) && li.classList.contains('open')) {
        li.classList.remove('open');
        activeDropBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Section entrances (.rise animation)
  const rises = document.querySelectorAll('.rise:not(.in)');
  if (rises.length) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((list) => {
        list.forEach((x) => {
          if (x.isIntersecting) {
            x.target.classList.add('in');
            io.unobserve(x.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px' });
      rises.forEach((r) => io.observe(r));

      // Fast check for elements already in viewport
      requestAnimationFrame(() => {
        rises.forEach((r) => {
          const rect = r.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            r.classList.add('in');
            io.unobserve(r);
          }
        });
      });

      // Safety fallback: ensure visible elements are revealed
      setTimeout(() => {
        rises.forEach((r) => {
          const rect = r.getBoundingClientRect();
          if (rect.top < window.innerHeight + 150) {
            r.classList.add('in');
            io.unobserve(r);
          }
        });
      }, 300);
    } else {
      rises.forEach((r) => r.classList.add('in'));
    }
  }

  // Situation picker. Without JavaScript every panel stays visible.
  const tabs = [...document.querySelectorAll('.tabs [role=tab]')];
  if (tabs.length) {
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach((tab, i) => {
      if (!tab.dataset.bound) {
        tab.dataset.bound = 'true';
        tab.addEventListener('click', () => select(tab));
        tab.addEventListener('keydown', (e) => {
          const keys = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
          if (e.key in keys) {
            e.preventDefault();
            select(tabs[(keys[e.key] + tabs.length) % tabs.length], true);
          }
        });
      }
    });
    // Ensure selected tab's panel is visible and others hidden
    const active = tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0];
    if (active) select(active);
  }

  // Team filter
  const fbtns = document.querySelectorAll('.filters button');
  fbtns.forEach((b) => {
    if (!b.dataset.bound) {
      b.dataset.bound = 'true';
      b.addEventListener('click', () => {
        fbtns.forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
        document.querySelectorAll('.team li').forEach((li) => {
          li.hidden = b.dataset.f !== 'all' && !li.dataset.g.split(' ').includes(b.dataset.f);
        });
      });
    }
  });

  // Contact form
  const form = document.querySelector('#contact-form');
  if (form && !form.dataset.bound) {
    form.dataset.bound = 'true';
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.querySelector('#form-status');
      if (status) {
        status.hidden = false;
        status.focus();
      }
    });
  }
}

// Expose globally so React router navigations can call it
window.initSite = initSite;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSite);
} else {
  initSite();
}
