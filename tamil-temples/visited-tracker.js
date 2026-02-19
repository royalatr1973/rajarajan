// ========================================
// Pilgrimage Progress Tracker
// Uses localStorage to track visited temples per section
// ========================================
(function () {
  var STORAGE_KEY = 'templeVisited';

  function getVisited() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { return {}; }
  }

  function saveVisited(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
  }

  function isVisited(type, id) {
    var data = getVisited();
    return data[type] && data[type].indexOf(String(id)) !== -1;
  }

  function toggleVisited(type, id) {
    var data = getVisited();
    if (!data[type]) data[type] = [];
    var sid = String(id);
    var idx = data[type].indexOf(sid);
    if (idx === -1) { data[type].push(sid); } else { data[type].splice(idx, 1); }
    saveVisited(data);
  }

  function getVisitedCount(type) {
    var data = getVisited();
    return (data[type] || []).length;
  }

  // Expose globally for other scripts
  window.TempleTracker = {
    isVisited: isVisited,
    toggle: toggleVisited,
    getCount: getVisitedCount,
    getAll: getVisited
  };

  // === Section Page: Add progress bar + checkboxes ===
  var sectionType = document.body.dataset.sectionType;
  if (!sectionType) return;

  var listEl = document.getElementById('templeList');
  if (!listEl) return;

  // Wait for section.js to render first
  var observer = new MutationObserver(function () {
    if (listEl.querySelector('.temple-card')) {
      observer.disconnect();
      injectSectionUI();
    }
  });
  observer.observe(listEl, { childList: true });
  // Also check if already rendered
  if (listEl.querySelector('.temple-card')) injectSectionUI();

  function injectSectionUI() {
    var data = window.getSectionData ? window.getSectionData(sectionType) : [];
    var total = data.length;
    if (!total) return;

    var visited = getVisitedCount(sectionType);

    // Insert progress bar above temple list
    var existing = document.getElementById('visitedProgressBar');
    if (existing) existing.remove();

    var pct = Math.round((visited / total) * 100);
    var bar = document.createElement('div');
    bar.id = 'visitedProgressBar';
    bar.className = 'visited-progress';
    bar.innerHTML =
      '<div class="visited-progress-header">' +
        '<span class="visited-progress-label">Pilgrimage Progress</span>' +
        '<span class="visited-progress-count">' + visited + ' / ' + total + ' visited</span>' +
      '</div>' +
      '<div class="visited-progress-track">' +
        '<div class="visited-progress-fill" style="width:' + pct + '%"></div>' +
      '</div>' +
      '<p class="visited-progress-hint">Click the check mark on any temple card to mark it as visited.</p>';
    listEl.parentNode.insertBefore(bar, listEl);

    // Add checkboxes to each temple card
    var cards = listEl.querySelectorAll('.temple-card');
    cards.forEach(function (card) {
      var link = card.querySelector('a');
      if (!link) return;
      var href = link.getAttribute('href') || '';
      var match = href.match(/id=([^&]+)/);
      if (!match) return;
      var templeId = decodeURIComponent(match[1]);

      var btn = document.createElement('button');
      btn.className = 'visited-check' + (isVisited(sectionType, templeId) ? ' checked' : '');
      btn.title = 'Mark as visited';
      btn.setAttribute('aria-label', 'Mark temple as visited');
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleVisited(sectionType, templeId);
        btn.classList.toggle('checked');
        updateProgressBar();
      });
      card.style.position = 'relative';
      card.appendChild(btn);
    });
  }

  function updateProgressBar() {
    var data = window.getSectionData ? window.getSectionData(sectionType) : [];
    var total = data.length;
    var visited = getVisitedCount(sectionType);
    var pct = Math.round((visited / total) * 100);
    var countEl = document.querySelector('.visited-progress-count');
    var fillEl = document.querySelector('.visited-progress-fill');
    if (countEl) countEl.textContent = visited + ' / ' + total + ' visited';
    if (fillEl) fillEl.style.width = pct + '%';
  }

  // === Detail Page: Add visited button ===
  if (window.location.pathname.indexOf('temple.html') !== -1) {
    var params = new URLSearchParams(window.location.search);
    var type = params.get('type');
    var id = params.get('id');
    if (type && id) {
      var titleEl = document.getElementById('templeTitle');
      if (titleEl) {
        var btn = document.createElement('button');
        btn.className = 'visited-detail-btn' + (isVisited(type, id) ? ' checked' : '');
        btn.innerHTML = (isVisited(type, id) ? 'Visited' : 'Mark as Visited');
        btn.addEventListener('click', function () {
          toggleVisited(type, id);
          var nowVisited = isVisited(type, id);
          btn.classList.toggle('checked', nowVisited);
          btn.textContent = nowVisited ? 'Visited' : 'Mark as Visited';
        });
        titleEl.parentNode.insertBefore(btn, titleEl.nextSibling);
      }
    }
  }
})();
