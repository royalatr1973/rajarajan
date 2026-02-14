(function () {
  var params = new URLSearchParams(window.location.search);
  var type = params.get('type');
  var id = params.get('id');

  var titleEl = document.getElementById('templeTitle');
  var imgEl = document.getElementById('templeImage');
  var summaryEl = document.getElementById('templeSummary');
  var metaEl = document.getElementById('templeMeta');
  var breadcrumbSection = document.getElementById('breadcrumbSection');
  var sthalaEl = document.getElementById('sthalaVaralaru');
  var sthalaText = document.getElementById('sthalaVaralaruText');
  var timingsCard = document.getElementById('timingsCard');
  var timingsText = document.getElementById('timingsText');
  var mapsBtn = document.getElementById('mapsBtn');
  if (!type || !id || !titleEl) return;

  var data = window.getSectionData(type);
  var temple = data.find(function(t) { return String(t.id) === String(id); });
  var meta = window.sectionMeta[type] || { title: 'Section', page: 'index.html' };

  breadcrumbSection.textContent = meta.title;
  breadcrumbSection.href = meta.page;

  if (!temple) {
    titleEl.textContent = 'Temple not found';
    summaryEl.textContent = 'Please go back and open a temple from the section list.';
    return;
  }

  titleEl.textContent = temple.name;
  document.title = temple.name + ' - Temples of Tamil Nadu';
  imgEl.src = temple.image || '';
  imgEl.alt = temple.name;
  summaryEl.textContent = temple.summary || 'Details can be expanded as you populate this dataset.';

  var raw = temple.raw || {};
  var pairs = [
    ['Temple Number', temple.n || temple.id],
    ['Location', temple.location || '-'],
    ['District', temple.district || raw.state || '-'],
    ['Deity', temple.deity || '-'],
    ['Consort', raw.thayar || raw.amman || '-'],
    ['Theertham', raw.theertham || '-'],
    ['Festivals', raw.festivals || '-'],
    ['Significance', raw.significance || '-']
  ];

  metaEl.innerHTML = pairs.map(function(p) {
    return '<div><strong>' + p[0] + '</strong>' + p[1] + '</div>';
  }).join('');

  // Temple Timings
  var timings = raw.timings || '';
  if (timings && timingsCard && timingsText) {
    timingsText.textContent = timings;
    timingsCard.style.display = '';
  }

  // Google Maps Directions
  var lat = raw.lat;
  var lng = raw.lng;
  if (lat && lng && mapsBtn) {
    mapsBtn.href = 'https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng;
    mapsBtn.style.display = '';
  } else if (mapsBtn) {
    // Fallback: use temple name for search
    mapsBtn.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(temple.name + ' ' + (temple.location || ''));
    mapsBtn.style.display = '';
  }

  // Show timings card if we have maps even without timings
  if (!timings && timingsCard) {
    timingsCard.style.display = '';
    if (timingsText) timingsText.textContent = 'Timings vary by season. Please check locally.';
  }

  // Sthala Varalaru (Temple History)
  var varalaru = raw.sthalaVaralaru || raw.legend || '';
  if (varalaru && sthalaEl && sthalaText) {
    sthalaText.textContent = varalaru;
    sthalaEl.style.display = '';
  }
})();
