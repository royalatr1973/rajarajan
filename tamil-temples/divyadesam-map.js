// ============================================================
// Divya Desam Pilgrimage Route Map - Animated Blue Trace
// Orthodox sequence: Temples 1-106 (earthly temples only)
// Practical route: Nearest-neighbor area coverage
// Uses Leaflet.js (OpenStreetMap, no API key needed)
// ============================================================

(function () {
  var mapContainer = document.getElementById('ddRouteMap');
  if (!mapContainer) return;

  // All 106 earthly Divya Desam temples in orthodox pilgrimage sequence
  // [lat, lng, number, short name]
  var temples = [
    [10.8627, 78.6868, 1, "Sri Ranganathaswamy, Srirangam"],
    [10.8160, 78.7020, 2, "Azhagiya Manavala, Uraiyur"],
    [10.8730, 78.7410, 3, "Purushothaman, Uttamar Kovil"],
    [10.9380, 78.7680, 4, "Pundarikashan, Thiruvellarai"],
    [10.9380, 78.8330, 5, "Vadivazhagiya Nambi, Anbil"],
    [10.9540, 78.8810, 6, "Appakkudathaan, Thirupper Nagar"],
    [10.7870, 79.1380, 7, "Neelamega, Thanjavur"],
    [10.8310, 79.1080, 8, "Hara Saabha Vimocchana, Kandiyur"],
    [10.8800, 79.1300, 9, "Aaduthurai, Thirukkoodaloor"],
    [10.9150, 79.1600, 10, "Gajendra Varadha, Kabisthalam"],
    [10.9480, 79.2100, 11, "Valvil Ramar, near Swamimalai"],
    [10.9530, 79.2200, 12, "Aandu Alakkum Ayan, Aadhanoor"],
    [10.9617, 79.3763, 13, "Saarangapani, Kumbakonam"],
    [10.9428, 79.3146, 14, "Oppiliappan, Thirunageswaram"],
    [10.9180, 79.4220, 15, "Thirunarayoor Nambi, Nachiyar Kovil"],
    [10.9010, 79.4610, 16, "Saranathan, Thiruccherai"],
    [10.7800, 79.6010, 17, "Bhaktavatsala, Thirukkannamangai"],
    [10.9420, 79.2380, 18, "Jaganatha, Nathan Kovil"],
    [10.9680, 79.3020, 19, "Kola Valvilli Ramar, Thiruvelliyankudi"],
    [11.1010, 79.6510, 20, "Parimala Ranganatha, Mayiladuturai"],
    [11.0500, 79.5800, 21, "Devaadi Raja, Thiruvazhunthoor"],
    [10.8700, 79.6240, 22, "Arulmaakadal, Sirupuliyur"],
    [10.8200, 79.6900, 23, "Sowrirajan, Thirukkannapuram"],
    [10.7650, 79.8420, 24, "Soundaryarajan, Nagappattinam"],
    [10.8070, 79.7610, 25, "Loganatha, Thirukkannankudi"],
    [11.0360, 79.7240, 26, "Naan Madhiya, Akkur"],
    [11.2150, 79.7350, 27, "Trivikraman, Sirkazhi"],
    [11.1900, 79.7700, 28, "Srinivasa, Thiruvellakkulam"],
    [11.1870, 79.7750, 29, "Deiva Naayaga, Nangur"],
    [11.1860, 79.7780, 30, "Lakshmi Narasimha, Nangur"],
    [11.1830, 79.7810, 31, "Gopala Krishna, Nangur"],
    [11.1810, 79.7830, 32, "Varadharaja, Nangur"],
    [11.1790, 79.7860, 33, "Thamaraiyal Kelvan, Nangur"],
    [11.1770, 79.7880, 34, "Narayana, Nangur"],
    [11.1750, 79.7900, 35, "Kuda Maadu Koothan, Nangur"],
    [11.1740, 79.7910, 36, "Seganmaal Ranganatha, Nangur"],
    [11.1735, 79.7915, 37, "Per Arulaalan, Nangur"],
    [11.1730, 79.7920, 38, "Purushothama, Nangur"],
    [11.1725, 79.7925, 39, "Vaigundha Nathan, Nangur"],
    [11.3994, 79.6937, 40, "Govindaraja, Chidambaram"],
    [11.4510, 79.5080, 41, "Deyva Naayaga, Thiruvaheendrapuram"],
    [11.7770, 79.2040, 42, "Thiruvikrama, Thirukkoviloor"],
    [12.7830, 79.7036, 43, "Varadharaja, Kanchipuram"],
    [12.7850, 79.7100, 44, "Aadhikesava, Kanchipuram"],
    [12.7900, 79.7060, 45, "Yathothakaari, Kanchipuram"],
    [12.7870, 79.7020, 46, "Azhagiya Singar, Kanchipuram"],
    [12.7860, 79.6990, 47, "Deepa Prakasar, Kanchipuram"],
    [12.7840, 79.7150, 48, "Aadhi Varaha, Kanchipuram"],
    [12.7910, 79.7070, 49, "Ulagalantha, Kanchipuram"],
    [12.7912, 79.7072, 50, "Jagadeeshwarar, Kanchipuram"],
    [12.7914, 79.7074, 51, "Karunakara, Kanchipuram"],
    [12.7916, 79.7076, 52, "Thirukkaar Vaanar, Kanchipuram"],
    [12.8160, 79.6930, 53, "Vaikunda Perumal, Kanchipuram"],
    [12.8040, 79.6870, 54, "Pavala Vannar, Kanchipuram"],
    [12.8520, 79.7006, 55, "Nilathingal Thundathan, Kanchipuram"],
    [12.8100, 79.6920, 56, "Pandava Thoodhar, Kanchipuram"],
    [12.7360, 79.7870, 57, "Vijayaraghava, Thiruputkuzhi"],
    [13.0443, 80.2757, 58, "Parthasarathy, Triplicane, Chennai"],
    [12.9530, 80.1570, 59, "Neervanna, Thiruneermalai"],
    [12.6180, 80.2260, 60, "Nithya Kalyana, Thiruvedanthai"],
    [12.6170, 80.1970, 61, "Sthala Sayana, Mahabalipuram"],
    [13.1250, 80.0560, 62, "Bhatavatsala, Thirunindravur"],
    [13.1430, 79.9070, 63, "Veeraraghava, Tiruvallur"],
    [12.5960, 79.3230, 64, "Yoga Narasimha, Sholingur"],
    [9.9200, 78.1190, 65, "Koodal Azhagar, Madurai"],
    [9.9640, 78.1610, 66, "Kaalamegha, Thiru Moghur"],
    [10.0660, 78.1000, 67, "Kallazhagar, Alagar Kovil"],
    [10.2830, 78.4770, 68, "Uraga Mellanayaan, Tirukostiyur"],
    [10.2370, 78.8330, 69, "Sathyagiri Natha, Tirumayam"],
    [9.2880, 79.2280, 70, "Kalyana Jagannatha, Thiruppulani"],
    [9.4500, 77.8120, 71, "Nindra Narayana, near Sivakasi"],
    [9.5120, 77.6340, 72, "Vadabhatra Saayi, Sri Villiputhur"],
    [8.7370, 77.8600, 73, "Vaikundanatha, Sri Vaikundam"],
    [8.7260, 77.8700, 74, "Vijayaasana, Thiruvaragunamangai"],
    [8.7200, 77.8750, 75, "Kaaichina Vendha, Thiruppulingudu"],
    [8.6850, 77.8560, 76, "Srinivasa, Thirukkulanthai"],
    [8.6300, 77.8680, 77, "Aravindha Lochana, Thiruttholai"],
    [8.6100, 77.8550, 78, "Magara NedungKuzhai, Thirupperai"],
    [8.5400, 77.6400, 79, "Vaitha Maanitha, Thirukkoloor"],
    [8.5240, 77.6160, 80, "Aadhinatha, Alwar Thirunagiri"],
    [8.3720, 77.4730, 81, "Thothatrinatha, Nanguneri"],
    [8.3030, 77.4260, 82, "Nindra Nambi, Thirukkurungudi"],
    [8.2470, 77.3630, 83, "Kuralappa, Thiruvanparisaaram"],
    [8.3480, 77.2530, 84, "Aadhikesava, Thiru Vattaaru"],
    [8.4855, 76.9448, 85, "Anantha Padmanabha, Thiruvananthapuram"],
    [9.2470, 76.5680, 86, "Maayapiran, Puliyoor"],
    [9.2880, 76.6140, 87, "Imayavarappa, Chenkundroor"],
    [9.3170, 76.6830, 88, "Parthasarathy, Aranmula"],
    [9.2590, 76.6480, 89, "Paambanaiyappa, Thiruvanvandoor"],
    [9.3820, 76.5730, 90, "Kolapira, Thiruvalla"],
    [9.4430, 76.5560, 91, "Athpudha Narayana, Thirukkadithaanam"],
    [10.0150, 76.3050, 92, "Kaatkarai Appa, Thrikkakara"],
    [10.0980, 76.3730, 93, "Moozhikkalathaan, Thirumoozhikkalam"],
    [10.7250, 76.0560, 94, "Uyyavantha, Thiruvithuvakkodu"],
    [10.8680, 75.9620, 95, "Naavaay Mugundha, Thiru Naavaay"],
    [13.6833, 79.3472, 96, "Srinivasa, Tirumala/Tirupathi"],
    [15.4800, 78.7220, 97, "Nava Narasimhar, Ahobilam"],
    [22.2374, 68.9672, 98, "Kalyana Narayana, Dwaraka"],
    [26.8008, 82.2040, 99, "Sri Ramar, Ayodhya"],
    [27.0650, 80.4260, 100, "Devaraja, Naimisaranya"],
    [27.4380, 77.7120, 101, "Navamohana Krishna, Gokul"],
    [27.5830, 77.6930, 102, "Govardhana Nesa, Mathura/Vrindavan"],
    [30.1467, 78.5947, 103, "Neelamega, Devaprayag"],
    [30.5570, 79.5610, 104, "Paramapurusha, Joshimath"],
    [30.7441, 79.4930, 105, "Badri Narayana, Badrinath"],
    [28.8186, 83.8714, 106, "Sri Moorthy, Mukthinath, Nepal"]
  ];

  // ---------- Haversine distance ----------
  function haversineKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Earth radius in km
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  // ---------- Nearest-neighbor practical route ----------
  function nearestNeighborRoute(srcTemples) {
    // Start from the northernmost temple
    var startIdx = 0;
    for (var i = 1; i < srcTemples.length; i++) {
      if (srcTemples[i][0] > srcTemples[startIdx][0]) startIdx = i;
    }

    var visited = [];
    var remaining = srcTemples.slice(); // shallow copy
    var current = remaining.splice(startIdx, 1)[0];
    visited.push(current);

    while (remaining.length > 0) {
      var nearestIdx = 0;
      var nearestDist = Infinity;
      for (var j = 0; j < remaining.length; j++) {
        var dist = haversineKm(current[0], current[1], remaining[j][0], remaining[j][1]);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestIdx = j;
        }
      }
      current = remaining.splice(nearestIdx, 1)[0];
      visited.push(current);
    }
    return visited;
  }

  // Precompute routes
  var orthodoxRoute = temples;
  var practicalRoute = nearestNeighborRoute(temples);
  var routeType = 'orthodox';
  var activeTemples = orthodoxRoute;

  // Compute cumulative distances for a given route
  function computeCumulativeKm(routeTemples) {
    var km = [0];
    for (var d = 1; d < routeTemples.length; d++) {
      var segKm = haversineKm(routeTemples[d - 1][0], routeTemples[d - 1][1], routeTemples[d][0], routeTemples[d][1]) * 1.3;
      km.push(km[d - 1] + segKm);
    }
    return km;
  }

  var cumulativeKm = computeCumulativeKm(activeTemples);

  // Initialize Leaflet map centered on India
  var map = L.map('ddRouteMap', {
    center: [20.5, 79.0],
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

  // Moving dot icon
  var dotIcon = L.divIcon({
    className: 'dd-map-dot',
    html: '<span></span>',
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });

  // Map layer references (rebuilt on route switch)
  var markers = [];
  var faintLine = null;
  var animatedLine = null;
  var movingDot = null;
  var routeCoords = [];

  // ---------- Build map elements (markers, polylines, dot) ----------
  function buildMapElements() {
    // Remove existing markers
    markers.forEach(function (m) { map.removeLayer(m); });
    markers = [];

    // Remove existing polylines and dot
    if (faintLine) map.removeLayer(faintLine);
    if (animatedLine) map.removeLayer(animatedLine);
    if (movingDot) map.removeLayer(movingDot);

    // Build route coordinates from active temples
    routeCoords = activeTemples.map(function (t) { return [t[0], t[1]]; });

    // Add markers for all temples in route order
    activeTemples.forEach(function (t, idx) {
      var marker = L.marker([t[0], t[1]], { icon: templeIcon })
        .addTo(map)
        .bindPopup('<strong>#' + (idx + 1) + '</strong><br>' + t[3]);
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

  // ---------- Populate route table ----------
  var tableBody = document.getElementById('ddRouteTableBody');
  var tableContainer = document.getElementById('ddRouteTableContainer');

  function buildTable() {
    if (!tableBody) return;
    var html = '';
    for (var r = 0; r < activeTemples.length; r++) {
      html += '<tr data-idx="' + r + '"><td>' + (r + 1) + '</td><td>' + activeTemples[r][3] + '</td><td>' + Math.round(cumulativeKm[r]) + '</td></tr>';
    }
    tableBody.innerHTML = html;
  }

  // Helper: highlight active row in table and scroll it into view
  var prevActiveRow = null;
  function updateTableRow(segIdx) {
    if (!tableBody || !tableContainer) return;
    if (prevActiveRow) prevActiveRow.classList.remove('active');
    var row = tableBody.querySelector('tr[data-idx="' + segIdx + '"]');
    if (row) {
      row.classList.add('active');
      // Center the active row in the visible area
      var rowTop = row.offsetTop;
      var rowHeight = row.offsetHeight;
      var containerHeight = tableContainer.clientHeight;
      tableContainer.scrollTop = rowTop - (containerHeight / 2) + (rowHeight / 2);
      prevActiveRow = row;
    }
  }

  // ---------- Auto-zoom regions (orthodox route only) ----------
  // Tamil Nadu temples: index 0-83 (temples 1-84)
  // Kerala temples: index 84-94 (temples 85-95)
  // Rest of India: index 95-105 (temples 96-106)
  var currentRegion = null;

  function getRegion(segIdx) {
    if (segIdx <= 83) return 'TN';
    if (segIdx <= 94) return 'KERALA';
    return 'INDIA';
  }

  function autoZoom(segIdx) {
    // Only apply region-based auto-zoom for the orthodox route
    if (routeType !== 'orthodox') return;

    var region = getRegion(segIdx);
    if (region === currentRegion) return;
    currentRegion = region;

    if (region === 'TN') {
      map.flyToBounds([[8.0, 77.0], [13.5, 80.5]], { padding: [30, 30], duration: 1.5, maxZoom: 7 });
    } else if (region === 'KERALA') {
      map.flyToBounds([[8.2, 75.5], [11.0, 77.2]], { padding: [30, 30], duration: 1.5, maxZoom: 8 });
    } else {
      map.flyTo([20.5, 79.0], 5, { duration: 1.5 });
    }
  }

  // Info display
  var infoEl = document.getElementById('ddRouteInfo');

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
      if (currentSegment < activeTemples.length && currentSegment > 0) {
        markers[currentSegment - 1].setIcon(templeIcon);
      }

      if (currentSegment >= routeCoords.length - 1) {
        // Loop: reset after a brief pause
        setTimeout(function () {
          currentSegment = 0;
          progress = 0;
          currentRegion = null;
          animatedLine.setLatLngs([]);
          if (infoEl) infoEl.textContent = 'Starting pilgrimage from ' + activeTemples[0][3].split(',')[0] + '...';
          updateTableRow(0);
          autoZoom(0);
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

    // Highlight current temple marker, update table row, and auto-zoom
    if (progress < SPEED * 2) {
      markers[currentSegment].setIcon(activeIcon);
      if (currentSegment > 0) markers[currentSegment - 1].setIcon(templeIcon);
      updateTableRow(currentSegment);
      autoZoom(currentSegment);
    }

    // Update info text
    if (infoEl) {
      var t = activeTemples[currentSegment];
      var nextIdx = Math.min(currentSegment + 1, activeTemples.length - 1);
      infoEl.textContent = '#' + (currentSegment + 1) + ' ' + t[3] + '  \u2192  #' + (nextIdx + 1) + ' ' + activeTemples[nextIdx][3];
    }

    animFrame = requestAnimationFrame(animate);
  }

  // ---------- Route switching ----------
  function switchRoute(type) {
    if (type === routeType) return;
    routeType = type;

    // Cancel current animation
    if (animFrame) {
      cancelAnimationFrame(animFrame);
      animFrame = null;
    }

    // Switch active temples and recompute distances
    activeTemples = (routeType === 'orthodox') ? orthodoxRoute : practicalRoute;
    cumulativeKm = computeCumulativeKm(activeTemples);

    // Reset animation state
    currentSegment = 0;
    progress = 0;
    currentRegion = null;
    prevActiveRow = null;

    // Rebuild map elements and table
    buildMapElements();
    buildTable();

    // Fit map to show all temples for practical route; zoom to TN for orthodox
    if (routeType === 'practical') {
      var bounds = L.latLngBounds(routeCoords);
      map.flyToBounds(bounds, { padding: [30, 30], duration: 1.5, maxZoom: 6 });
    } else {
      autoZoom(0);
    }

    // Restart animation
    if (infoEl) infoEl.textContent = 'Starting pilgrimage from ' + activeTemples[0][3].split(',')[0] + '...';
    updateTableRow(0);
    paused = false;
    var playBtn = document.getElementById('ddRoutePlay');
    if (playBtn) playBtn.textContent = 'Pause';
    animate();
  }

  // ---------- Route selector button handling ----------
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

  // ---------- Initial build and start ----------
  buildMapElements();
  buildTable();
  if (infoEl) infoEl.textContent = 'Starting pilgrimage from Srirangam...';
  autoZoom(0);
  animate();

  // Enable scroll zoom when map is clicked
  map.on('click', function () {
    map.scrollWheelZoom.enable();
  });
})();
