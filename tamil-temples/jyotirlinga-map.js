// ============================================================
// Jyotirlinga Pilgrimage Route Map - Animated Blue Trace
// Orthodox pilgrimage sequence: 12 Jyotirlinga temples
// Uses Leaflet.js (OpenStreetMap, no API key needed)
// ============================================================

(function () {
  var mapContainer = document.getElementById('ddRouteMap');
  if (!mapContainer) return;

  // All 12 Jyotirlinga temples in orthodox pilgrimage sequence
  // [lat, lng, number, short name, cumulative distance km]
  var temples = [
    [20.8880, 70.4012, 1, "Somnath, Gujarat", 0],
    [16.0744, 78.8686, 2, "Mallikarjuna, Srisailam, AP", 780],
    [23.1828, 75.7682, 3, "Mahakaleshwar, Ujjain, MP", 1540],
    [22.2452, 76.1510, 4, "Omkareshwar, MP", 1650],
    [30.7352, 79.0669, 5, "Kedarnath, Uttarakhand", 2760],
    [19.0720, 73.5360, 6, "Bhimashankar, Maharashtra", 3900],
    [25.3109, 83.0107, 7, "Kashi Vishwanath, Varanasi, UP", 4800],
    [19.9322, 73.5300, 8, "Trimbakeshwar, Nasik, MH", 5600],
    [24.4920, 86.6997, 9, "Vaidyanath, Deoghar, Jharkhand", 6350],
    [22.3320, 68.9667, 10, "Nageshwar, Dwarka, Gujarat", 7800],
    [9.2881, 79.3174, 11, "Rameshwaram, Tamil Nadu", 9200],
    [20.0263, 75.1790, 12, "Grishneshwar, Ellora, MH", 10200]
  ];

  // --- Haversine for practical route ---
  function haversineKm(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function computeDistances(route) {
    var km = [0];
    for (var i = 1; i < route.length; i++) {
      km.push(km[i-1] + haversineKm(route[i-1][0], route[i-1][1], route[i][0], route[i][1]) * 1.3);
    }
    return km;
  }

  function nearestNeighborRoute(tmps) {
    var remaining = tmps.slice();
    remaining.sort(function(a, b) { return b[0] - a[0]; });
    var result = [remaining.shift()];
    while (remaining.length > 0) {
      var last = result[result.length - 1];
      var bestDist = Infinity, bestIdx = 0;
      for (var i = 0; i < remaining.length; i++) {
        var d = haversineKm(last[0], last[1], remaining[i][0], remaining[i][1]);
        if (d < bestDist) { bestDist = d; bestIdx = i; }
      }
      result.push(remaining.splice(bestIdx, 1)[0]);
    }
    return result.map(function(t, i) {
      return [t[0], t[1], i + 1, t[3], 0]; // distances recomputed below
    });
  }

  var orthodoxRoute = temples;
  var practicalRouteBase = nearestNeighborRoute(temples);
  var practicalKm = computeDistances(practicalRouteBase);
  practicalRouteBase.forEach(function(t, i) { t[4] = Math.round(practicalKm[i]); });
  var routeType = 'orthodox';

  // Initialize Leaflet map centered on India
  var map = L.map('ddRouteMap', {
    center: [22.5, 78.0],
    zoom: 5,
    scrollWheelZoom: false,
    attributionControl: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
  }).addTo(map);

  // Custom small marker icon
  var templeIcon = L.divIcon({
    className: 'dd-map-marker',
    html: '<span></span>',
    iconSize: [10, 10],
    iconAnchor: [5, 5]
  });

  var activeIcon = L.divIcon({
    className: 'dd-map-marker active',
    html: '<span></span>',
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });

  // Moving dot marker icon
  var dotIcon = L.divIcon({
    className: 'dd-map-dot',
    html: '<span></span>',
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });

  // Shared state for map elements
  var markers = [];
  var routeCoords = [];
  var faintLine = null;
  var animatedLine = null;
  var movingDot = null;

  // Info display
  var infoEl = document.getElementById('ddRouteInfo');
  var tableBody = document.getElementById('ddRouteTableBody');

  // --- Reusable build functions ---

  function getActiveTemples() {
    return routeType === 'orthodox' ? orthodoxRoute : practicalRouteBase;
  }

  function buildMapElements() {
    var activeTemples = getActiveTemples();

    // Remove old markers
    markers.forEach(function(m) { map.removeLayer(m); });
    markers = [];

    // Remove old lines
    if (faintLine) { map.removeLayer(faintLine); faintLine = null; }
    if (animatedLine) { map.removeLayer(animatedLine); animatedLine = null; }
    if (movingDot) { map.removeLayer(movingDot); movingDot = null; }

    // Build route coordinates
    routeCoords = activeTemples.map(function(t) { return [t[0], t[1]]; });

    // Add markers for all temples
    activeTemples.forEach(function(t) {
      var marker = L.marker([t[0], t[1]], { icon: templeIcon })
        .addTo(map)
        .bindPopup('<strong>#' + t[2] + '</strong><br>' + t[3]);
      markers.push(marker);
    });

    // Static faint route (full path shown lightly)
    faintLine = L.polyline(routeCoords, {
      color: '#90CAF9',
      weight: 2,
      opacity: 0.35,
      dashArray: '4 6'
    }).addTo(map);

    // Animated blue route line
    animatedLine = L.polyline([], {
      color: '#1565C0',
      weight: 3.5,
      opacity: 0.85
    }).addTo(map);

    // Moving dot marker
    movingDot = L.marker(routeCoords[0], { icon: dotIcon, zIndexOffset: 1000 }).addTo(map);
  }

  function buildTable() {
    if (!tableBody) return;
    var activeTemples = getActiveTemples();
    var html = '';
    activeTemples.forEach(function(t, idx) {
      html += '<tr data-idx="' + idx + '">'
            + '<td>' + t[2] + '</td>'
            + '<td>' + t[3] + '</td>'
            + '<td>' + t[4] + '</td>'
            + '</tr>';
    });
    tableBody.innerHTML = html;
  }

  // Highlight the active row in the table
  function highlightRow(idx) {
    if (!tableBody) return;
    var rows = tableBody.querySelectorAll('tr');
    for (var i = 0; i < rows.length; i++) {
      rows[i].classList.remove('active');
    }
    if (rows[idx]) {
      rows[idx].classList.add('active');
    }
  }

  // Animation state
  var currentSegment = 0;
  var progress = 0;
  var SPEED = 0.04; // progress per frame (0 to 1 per segment)
  var animFrame = null;
  var paused = false;

  function lerp(a, b, t) {
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  }

  function animate() {
    if (paused) {
      animFrame = requestAnimationFrame(animate);
      return;
    }

    var activeTemples = getActiveTemples();

    progress += SPEED;

    if (progress >= 1) {
      progress = 0;
      currentSegment++;

      // Update marker style for reached temple
      if (currentSegment < activeTemples.length && currentSegment > 0) {
        markers[currentSegment - 1].setIcon(templeIcon);
      }

      if (currentSegment >= routeCoords.length - 1) {
        // Highlight last temple before looping
        highlightRow(activeTemples.length - 1);
        markers[activeTemples.length - 1].setIcon(activeIcon);
        if (infoEl) {
          var last = activeTemples[activeTemples.length - 1];
          infoEl.textContent = '#' + last[2] + ' ' + last[3] + ' — Pilgrimage complete. Restarting...';
        }

        // Loop: reset after a brief pause
        setTimeout(function () {
          currentSegment = 0;
          progress = 0;
          animatedLine.setLatLngs([]);
          markers[activeTemples.length - 1].setIcon(templeIcon);
          highlightRow(0);
          if (infoEl) infoEl.textContent = 'Starting pilgrimage from ' + activeTemples[0][3] + '...';
          animate();
        }, 2000);
        return;
      }
    }

    var from = routeCoords[currentSegment];
    var to = routeCoords[currentSegment + 1];
    var current = lerp(from, to, progress);

    // Build path up to current point
    var pathSoFar = routeCoords.slice(0, currentSegment + 1).concat([current]);
    animatedLine.setLatLngs(pathSoFar);

    // Move dot
    movingDot.setLatLng(current);

    // Highlight current temple marker and table row
    if (progress < SPEED * 2) {
      markers[currentSegment].setIcon(activeIcon);
      highlightRow(currentSegment);
      if (currentSegment > 0) markers[currentSegment - 1].setIcon(templeIcon);
    }

    // Update info text
    if (infoEl) {
      var t = activeTemples[currentSegment];
      var next = activeTemples[Math.min(currentSegment + 1, activeTemples.length - 1)];
      infoEl.textContent = '#' + t[2] + ' ' + t[3] + '  \u2192  #' + next[2] + ' ' + next[3];
    }

    animFrame = requestAnimationFrame(animate);
  }

  // --- Switch route ---
  function switchRoute(type) {
    // Cancel current animation
    if (animFrame) {
      cancelAnimationFrame(animFrame);
      animFrame = null;
    }

    routeType = type;

    // Reset animation state
    currentSegment = 0;
    progress = 0;
    paused = false;

    // Update play button text
    var playBtn = document.getElementById('ddRoutePlay');
    if (playBtn) playBtn.textContent = 'Pause';

    // Rebuild everything
    buildMapElements();
    buildTable();
    highlightRow(0);

    var activeTemples = getActiveTemples();
    if (infoEl) infoEl.textContent = 'Starting pilgrimage from ' + activeTemples[0][3] + '...';

    // Restart animation
    animate();
  }

  // Controls
  var playBtn = document.getElementById('ddRoutePlay');
  if (playBtn) {
    playBtn.addEventListener('click', function () {
      paused = !paused;
      playBtn.textContent = paused ? 'Resume' : 'Pause';
    });
  }

  var speedBtn = document.getElementById('ddRouteSpeed');
  var speeds = [0.02, 0.04, 0.08, 0.16];
  var speedLabels = ['0.5x', '1x', '2x', '4x'];
  var speedIdx = 1;
  if (speedBtn) {
    speedBtn.addEventListener('click', function () {
      speedIdx = (speedIdx + 1) % speeds.length;
      SPEED = speeds[speedIdx];
      speedBtn.textContent = speedLabels[speedIdx];
    });
  }

  // Route selector
  var selectorEl = document.getElementById('routeSelector');
  if (selectorEl) {
    var btns = selectorEl.querySelectorAll('.dd-route-sel-btn');
    btns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        btns.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        switchRoute(btn.getAttribute('data-route'));
      });
    });
  }

  // Initial build and start animation
  buildMapElements();
  buildTable();
  highlightRow(0);
  if (infoEl) infoEl.textContent = 'Starting pilgrimage from Somnath...';
  animate();

  // Enable scroll zoom when map is clicked
  map.on('click', function () {
    map.scrollWheelZoom.enable();
  });
})();
