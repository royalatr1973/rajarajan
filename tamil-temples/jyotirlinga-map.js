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

  // Add markers for all temples
  var markers = [];
  temples.forEach(function (t) {
    var marker = L.marker([t[0], t[1]], { icon: templeIcon })
      .addTo(map)
      .bindPopup('<strong>#' + t[2] + '</strong><br>' + t[3]);
    markers.push(marker);
  });

  // Build the full route coordinates
  var routeCoords = temples.map(function (t) { return [t[0], t[1]]; });

  // Static faint route (full path shown lightly)
  L.polyline(routeCoords, {
    color: '#90CAF9',
    weight: 2,
    opacity: 0.35,
    dashArray: '4 6'
  }).addTo(map);

  // Animated blue route line
  var animatedLine = L.polyline([], {
    color: '#1565C0',
    weight: 3.5,
    opacity: 0.85
  }).addTo(map);

  // Moving dot marker
  var dotIcon = L.divIcon({
    className: 'dd-map-dot',
    html: '<span></span>',
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });
  var movingDot = L.marker(routeCoords[0], { icon: dotIcon, zIndexOffset: 1000 }).addTo(map);

  // Info display
  var infoEl = document.getElementById('ddRouteInfo');

  // Populate the side table with all 12 rows on init
  var tableBody = document.getElementById('ddRouteTableBody');
  if (tableBody) {
    var html = '';
    temples.forEach(function (t, idx) {
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

    progress += SPEED;

    if (progress >= 1) {
      progress = 0;
      currentSegment++;

      // Update marker style for reached temple
      if (currentSegment < temples.length && currentSegment > 0) {
        markers[currentSegment - 1].setIcon(templeIcon);
      }

      if (currentSegment >= routeCoords.length - 1) {
        // Highlight last temple before looping
        highlightRow(temples.length - 1);
        markers[temples.length - 1].setIcon(activeIcon);
        if (infoEl) {
          var last = temples[temples.length - 1];
          infoEl.textContent = '#' + last[2] + ' ' + last[3] + ' — Pilgrimage complete. Restarting...';
        }

        // Loop: reset after a brief pause
        setTimeout(function () {
          currentSegment = 0;
          progress = 0;
          animatedLine.setLatLngs([]);
          markers[temples.length - 1].setIcon(templeIcon);
          highlightRow(0);
          if (infoEl) infoEl.textContent = 'Starting pilgrimage from Somnath...';
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
      var t = temples[currentSegment];
      var next = temples[Math.min(currentSegment + 1, temples.length - 1)];
      infoEl.textContent = '#' + t[2] + ' ' + t[3] + '  \u2192  #' + next[2] + ' ' + next[3];
    }

    animFrame = requestAnimationFrame(animate);
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

  // Start animation
  highlightRow(0);
  if (infoEl) infoEl.textContent = 'Starting pilgrimage from Somnath...';
  animate();

  // Enable scroll zoom when map is clicked
  map.on('click', function () {
    map.scrollWheelZoom.enable();
  });
})();
