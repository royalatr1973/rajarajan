// ========================================
// Trip Planner / Route Builder
// Interactive temple selector with optimized route generation
// ========================================
(function () {
  var type = document.body.dataset.sectionType;
  if (!type) return;

  var listEl = document.getElementById('templeList');
  if (!listEl) return;

  // Only show for sections with coordinates
  var data = window.getSectionData ? window.getSectionData(type) : [];
  var withCoords = data.filter(function (t) {
    return (t.raw && t.raw.lat && t.raw.lng) || (t.lat && t.lng);
  });
  if (withCoords.length < 3) return;

  // Wait for section.js to render
  var observer = new MutationObserver(function () {
    if (listEl.querySelector('.temple-card')) {
      observer.disconnect();
      addPlannerUI();
    }
  });
  observer.observe(listEl, { childList: true });
  if (listEl.querySelector('.temple-card')) addPlannerUI();

  var selected = {};

  function addPlannerUI() {
    var existing = document.getElementById('tripPlannerSection');
    if (existing) return;

    var meta = (window.sectionMeta || {})[type] || { title: 'Temples' };
    var section = document.createElement('section');
    section.id = 'tripPlannerSection';
    section.className = 'trip-planner-section';
    section.innerHTML =
      '<h2>Build Your Own Yatra</h2>' +
      '<p class="trip-planner-desc">Select temples below to build a custom pilgrimage route. The planner will optimize your travel path.</p>' +
      '<div class="trip-planner-controls">' +
        '<button id="tripSelectAll" class="trip-btn">Select All</button>' +
        '<button id="tripClearAll" class="trip-btn">Clear All</button>' +
        '<button id="tripGenerate" class="trip-btn trip-btn-primary" disabled>Generate Route (0 selected)</button>' +
      '</div>' +
      '<div id="tripChecklist" class="trip-checklist"></div>' +
      '<div id="tripResult" class="trip-result" style="display:none;"></div>';

    listEl.parentNode.insertBefore(section, listEl);

    // Build checklist
    var checklist = document.getElementById('tripChecklist');
    withCoords.forEach(function (t) {
      var lat = t.raw ? t.raw.lat : t.lat;
      var lng = t.raw ? t.raw.lng : t.lng;
      var div = document.createElement('label');
      div.className = 'trip-check-item';
      div.innerHTML =
        '<input type="checkbox" value="' + t.id + '" data-lat="' + lat + '" data-lng="' + lng + '" data-name="' + t.name + '" />' +
        '<span>' + t.name + '</span>' +
        '<small>' + (t.location || '') + '</small>';
      checklist.appendChild(div);

      div.querySelector('input').addEventListener('change', function () {
        if (this.checked) {
          selected[t.id] = { name: t.name, lat: lat, lng: lng, location: t.location };
        } else {
          delete selected[t.id];
        }
        updateCount();
      });
    });

    document.getElementById('tripSelectAll').addEventListener('click', function () {
      checklist.querySelectorAll('input').forEach(function (cb) {
        cb.checked = true;
        var id = cb.value;
        selected[id] = { name: cb.dataset.name, lat: +cb.dataset.lat, lng: +cb.dataset.lng };
      });
      updateCount();
    });

    document.getElementById('tripClearAll').addEventListener('click', function () {
      checklist.querySelectorAll('input').forEach(function (cb) { cb.checked = false; });
      selected = {};
      updateCount();
      document.getElementById('tripResult').style.display = 'none';
    });

    document.getElementById('tripGenerate').addEventListener('click', generateRoute);
  }

  function updateCount() {
    var count = Object.keys(selected).length;
    var btn = document.getElementById('tripGenerate');
    btn.textContent = 'Generate Route (' + count + ' selected)';
    btn.disabled = count < 2;
  }

  function haversine(lat1, lng1, lat2, lng2) {
    var R = 6371;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLng = (lng2 - lng1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function nearestNeighbor(points) {
    var remaining = points.slice();
    var route = [remaining.shift()];
    while (remaining.length) {
      var last = route[route.length - 1];
      var nearest = 0;
      var minDist = Infinity;
      for (var i = 0; i < remaining.length; i++) {
        var d = haversine(last.lat, last.lng, remaining[i].lat, remaining[i].lng);
        if (d < minDist) { minDist = d; nearest = i; }
      }
      route.push(remaining.splice(nearest, 1)[0]);
    }
    return route;
  }

  function generateRoute() {
    var points = Object.keys(selected).map(function (id) {
      return { id: id, name: selected[id].name, lat: selected[id].lat, lng: selected[id].lng, location: selected[id].location };
    });

    var optimized = nearestNeighbor(points);
    var totalDist = 0;
    for (var i = 1; i < optimized.length; i++) {
      totalDist += haversine(optimized[i - 1].lat, optimized[i - 1].lng, optimized[i].lat, optimized[i].lng);
    }

    var resultEl = document.getElementById('tripResult');
    resultEl.style.display = '';

    // Build Google Maps directions URL
    var mapsUrl = 'https://www.google.com/maps/dir/';
    optimized.forEach(function (p) { mapsUrl += p.lat + ',' + p.lng + '/'; });

    resultEl.innerHTML =
      '<h3>Optimized Route (' + optimized.length + ' temples, ~' + totalDist.toFixed(0) + ' km)</h3>' +
      '<ol class="trip-route-list">' +
        optimized.map(function (p, i) {
          var segDist = i > 0 ? haversine(optimized[i - 1].lat, optimized[i - 1].lng, p.lat, p.lng).toFixed(1) : '—';
          return '<li><strong>' + p.name + '</strong> <span class="trip-location">' + (p.location || '') + '</span>' +
            (i > 0 ? ' <span class="trip-dist">' + segDist + ' km from previous</span>' : ' <span class="trip-dist">Start</span>') +
          '</li>';
        }).join('') +
      '</ol>' +
      '<a href="' + mapsUrl + '" target="_blank" rel="noopener" class="trip-maps-link">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
        ' Open Full Route in Google Maps' +
      '</a>';
  }
})();
