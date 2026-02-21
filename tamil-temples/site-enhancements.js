/* site-enhancements.js — Dark mode, back-to-top, hamburger, skeleton, JSON-LD */
(function () {
  'use strict';

  // ===== 1. Dark Mode Toggle =====
  var savedTheme = localStorage.getItem('temple-theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  function initDarkMode() {
    var toggles = document.querySelectorAll('.dark-mode-toggle');
    toggles.forEach(function (btn) {
      updateToggleIcon(btn);
      btn.addEventListener('click', function () {
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
          document.documentElement.removeAttribute('data-theme');
          localStorage.setItem('temple-theme', 'light');
        } else {
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('temple-theme', 'dark');
        }
        toggles.forEach(updateToggleIcon);
      });
    });
  }

  function updateToggleIcon(btn) {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.innerHTML = isDark ? '&#9788;' : '&#9790;';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.title = isDark ? 'Light mode' : 'Dark mode';
  }

  // ===== 2. Back to Top Button =====
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== 3. Hamburger Menu =====
  function initHamburger() {
    var hamburger = document.querySelector('.hamburger');
    var nav = document.querySelector('.nav nav');
    if (!hamburger || !nav) return;
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      nav.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove('open');
      }
    });
  }

  // ===== 4. Skeleton Loading for Temple Cards =====
  window.showSkeleton = function (containerId, count) {
    var el = document.getElementById(containerId);
    if (!el) return;
    count = count || 8;
    var html = '';
    for (var i = 0; i < count; i++) {
      html += '<div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-body"><div class="skeleton-line"></div><div class="skeleton-line"></div><div class="skeleton-line"></div></div></div>';
    }
    el.className = 'skeleton-grid';
    el.innerHTML = html;
  };

  window.hideSkeleton = function (containerId) {
    var el = document.getElementById(containerId);
    if (!el) return;
    if (el.classList.contains('skeleton-grid')) {
      el.className = 'grid';
      el.innerHTML = '';
    }
  };

  // ===== 5. JSON-LD Structured Data for Temple Detail =====
  function initJsonLd() {
    if (!window.location.pathname.includes('temple.html')) return;
    // Wait for detail.js to populate the page
    setTimeout(function () {
      var name = document.getElementById('templeTitle');
      var img = document.getElementById('templeImage');
      var summary = document.getElementById('templeSummary');
      if (!name || !name.textContent || name.textContent === 'Temple') return;

      var metaGrid = document.getElementById('templeMeta');
      var location = '';
      var deity = '';
      if (metaGrid) {
        var divs = metaGrid.querySelectorAll('div');
        divs.forEach(function (d) {
          var strong = d.querySelector('strong');
          if (!strong) return;
          if (strong.textContent === 'Location') location = d.textContent.replace('Location', '').trim();
          if (strong.textContent === 'Deity') deity = d.textContent.replace('Deity', '').trim();
        });
      }

      var ld = {
        '@context': 'https://schema.org',
        '@type': 'HinduTemple',
        'name': name.textContent,
        'description': summary ? summary.textContent : '',
        'image': img ? img.src : '',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': location
        }
      };
      if (deity) ld['additionalProperty'] = { '@type': 'PropertyValue', 'name': 'Deity', 'value': deity };

      var script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(ld);
      document.head.appendChild(script);
    }, 100);
  }

  // ===== 6. Lazy Loading Images =====
  function initLazyLoading() {
    // Add loading="lazy" to all images that don't already have it
    document.querySelectorAll('img:not([loading])').forEach(function (img) {
      img.setAttribute('loading', 'lazy');
    });

    // Observe dynamically added images
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType !== 1) return;
          if (node.tagName === 'IMG' && !node.getAttribute('loading')) {
            node.setAttribute('loading', 'lazy');
          }
          var imgs = node.querySelectorAll ? node.querySelectorAll('img:not([loading])') : [];
          imgs.forEach(function (img) { img.setAttribute('loading', 'lazy'); });
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ===== Initialize =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initDarkMode();
    initBackToTop();
    initHamburger();
    initLazyLoading();
    initJsonLd();
  }
})();
