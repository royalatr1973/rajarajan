// ========================================
// Temple Comparison View
// Select 2-3 temples from any section for side-by-side comparison
// ========================================
(function () {
  var compareEl = document.getElementById('compareContainer');
  var searchEl = document.getElementById('compareSearch');
  var resultEl = document.getElementById('compareResults');
  var tableEl = document.getElementById('compareTable');
  if (!compareEl) return;

  var selected = [];
  var maxCompare = 3;

  // Build search index across all sections
  var allTemples = [];
  var allTypes = Object.keys(window.sectionMeta || {});
  allTypes.forEach(function (type) {
    var data = window.getSectionData(type);
    if (!data) return;
    data.forEach(function (t) {
      allTemples.push({
        name: t.name, location: t.location || '', deity: t.deity || '',
        district: t.district || '', id: t.id, type: type,
        section: (window.sectionMeta[type] || {}).title || type,
        raw: t.raw || {}, summary: t.summary || '', image: t.image || ''
      });
    });
  });

  if (searchEl) {
    searchEl.addEventListener('input', function () {
      var q = searchEl.value.toLowerCase().trim();
      if (q.length < 2) { resultEl.innerHTML = ''; return; }

      var matches = allTemples.filter(function (t) {
        return t.name.toLowerCase().includes(q) || t.location.toLowerCase().includes(q) || t.deity.toLowerCase().includes(q);
      }).slice(0, 10);

      resultEl.innerHTML = matches.map(function (t) {
        var isSelected = selected.some(function (s) { return s.type === t.type && s.id === t.id; });
        return '<div class="compare-result-item' + (isSelected ? ' selected' : '') + '" data-type="' + t.type + '" data-id="' + t.id + '">' +
          '<strong>' + t.name + '</strong>' +
          '<span>' + t.section + ' &bull; ' + t.location + '</span>' +
        '</div>';
      }).join('');

      resultEl.querySelectorAll('.compare-result-item').forEach(function (item) {
        item.addEventListener('click', function () {
          var tType = item.dataset.type;
          var tId = item.dataset.id;
          var already = selected.findIndex(function (s) { return s.type === tType && String(s.id) === String(tId); });
          if (already !== -1) {
            selected.splice(already, 1);
          } else if (selected.length < maxCompare) {
            var t = allTemples.find(function (x) { return x.type === tType && String(x.id) === String(tId); });
            if (t) selected.push(t);
          }
          renderSelected();
          searchEl.dispatchEvent(new Event('input'));
        });
      });
    });
  }

  function renderSelected() {
    var selectedEl = document.getElementById('compareSelected');
    if (selectedEl) {
      selectedEl.innerHTML = selected.length ?
        '<div class="compare-chips">' +
          selected.map(function (t) {
            return '<span class="compare-chip">' + t.name +
              '<button data-type="' + t.type + '" data-id="' + t.id + '">&times;</button>' +
            '</span>';
          }).join('') +
          (selected.length >= 2 ? '<button id="compareNowBtn" class="trip-btn trip-btn-primary">Compare Now</button>' : '') +
        '</div>' : '';

      selectedEl.querySelectorAll('.compare-chip button').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var idx = selected.findIndex(function (s) { return s.type === btn.dataset.type && String(s.id) === String(btn.dataset.id); });
          if (idx !== -1) selected.splice(idx, 1);
          renderSelected();
          if (searchEl) searchEl.dispatchEvent(new Event('input'));
        });
      });

      var compareBtn = document.getElementById('compareNowBtn');
      if (compareBtn) {
        compareBtn.addEventListener('click', renderComparison);
      }
    }
  }

  function renderComparison() {
    if (selected.length < 2 || !tableEl) return;

    var fields = [
      { key: 'section', label: 'Section' },
      { key: 'location', label: 'Location' },
      { key: 'district', label: 'District' },
      { key: 'deity', label: 'Deity' },
      { key: 'consort', label: 'Consort', fn: function (t) { return t.raw.thayar || t.raw.amman || '-'; } },
      { key: 'theertham', label: 'Theertham', fn: function (t) { return t.raw.theertham || '-'; } },
      { key: 'timings', label: 'Timings', fn: function (t) { return t.raw.timings || 'Check locally'; } },
      { key: 'festivals', label: 'Festivals', fn: function (t) { return t.raw.festivals || '-'; } },
      { key: 'significance', label: 'Significance', fn: function (t) { return t.raw.significance || '-'; } },
      { key: 'coords', label: 'Coordinates', fn: function (t) { return (t.raw.lat && t.raw.lng) ? t.raw.lat.toFixed(4) + ', ' + t.raw.lng.toFixed(4) : '-'; } }
    ];

    var headerCols = selected.map(function (t) {
      var fallback = window.getSectionFallback ? window.getSectionFallback(t.type, t.name) : '';
      return '<th>' +
        '<img src="' + (t.image || fallback) + '" alt="' + t.name + '" onerror="this.onerror=null;this.src=\'' + fallback.replace(/'/g, "\\'") + '\';" class="compare-img" />' +
        '<strong>' + t.name + '</strong>' +
      '</th>';
    }).join('');

    var bodyRows = fields.map(function (f) {
      var cells = selected.map(function (t) {
        var val = f.fn ? f.fn(t) : (t[f.key] || '-');
        return '<td>' + val + '</td>';
      }).join('');
      return '<tr><th>' + f.label + '</th>' + cells + '</tr>';
    }).join('');

    tableEl.innerHTML =
      '<table class="compare-table">' +
        '<thead><tr><th>Feature</th>' + headerCols + '</tr></thead>' +
        '<tbody>' + bodyRows + '</tbody>' +
      '</table>';
    tableEl.style.display = '';
  }
})();
