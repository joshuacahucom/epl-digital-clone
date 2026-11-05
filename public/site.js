// Mobile menu and Services dropdown
function initSite() {
  const btn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  btn?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Close' : 'Menu';
  });
  const dropBtn = document.querySelector('.has-drop > button');
  dropBtn?.addEventListener('click', () => {
    const li = dropBtn.parentElement;
    const open = li.classList.toggle('open');
    dropBtn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (e) => {
    const li = dropBtn?.parentElement;
    if (li && !li.contains(e.target) && li.classList.contains('open')) {
      li.classList.remove('open');
      dropBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Section entrances
  const rises = document.querySelectorAll('.rise');
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
  } else {
    rises.forEach((r) => r.classList.add('in'));
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
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', (e) => {
        const keys = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
        if (e.key in keys) {
          e.preventDefault();
          select(tabs[(keys[e.key] + tabs.length) % tabs.length], true);
        }
      });
    });
    select(tabs[0]);
  }

  // Team filter
  const fbtns = document.querySelectorAll('.filters button');
  fbtns.forEach((b) => b.addEventListener('click', () => {
    fbtns.forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
    document.querySelectorAll('.team li').forEach((li) => {
      li.hidden = b.dataset.f !== 'all' && !li.dataset.g.split(' ').includes(b.dataset.f);
    });
  }));

  // Contact form: this concept does not send anything.
  const form = document.querySelector('#contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = document.querySelector('#form-status');
    if (status) {
      status.hidden = false;
      status.focus();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSite);
} else {
  initSite();
}
