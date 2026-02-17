// ============================================================
// Temple Map Engine - Reusable animated route map for any section
// Reads temple data from window.extraSections[sectionType]
// Supports Orthodox and Practical Area Coverage routes
// ============================================================

(function () {
  window.TempleMapEngine = {
    init: function (sectionType) {
      var mapContainer = document.getElementById('ddRouteMap');
      if (!mapContainer) return;

      var data = window.extraSections && window.extraSections[sectionType];
      if (!data || !data.length) return;

      // --- Build temple arrays ---
      var allTemples = data.map(function (t, i) {
        return [t.lat, t.lng, i + 1, t.name + ', ' + t.location];
      });

      // --- Haversine distance ---
      function haversineKm(lat1, lon1, lat2, lon2) {
        var R = 6371;
        var dLat = (lat2 - lat1) * Math.PI / 180;
        var dLon = (lon2 - lon1) * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      }

      function computeDistances(route) {
        var km = [0];
        for (var i = 1; i < route.length; i++) {
          km.push(km[i - 1] + haversineKm(route[i - 1][0], route[i - 1][1], route[i][0], route[i][1]) * 1.3);
        }
        return km;
      }

      // --- Nearest-neighbor practical route ---
      function nearestNeighborRoute(temples) {
        if (temples.length <= 2) return temples.slice();
        var remaining = temples.slice();
        // Start from northernmost temple
        remaining.sort(function (a, b) { return b[0] - a[0]; });
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
        return result.map(function (t, i) {
          return [t[0], t[1], i + 1, t[3]];
        });
      }

      // --- Build both routes ---
      var orthodoxRoute = allTemples;
      var practicalRoute = nearestNeighborRoute(allTemples);
      var orthodoxKm = computeDistances(orthodoxRoute);
      var practicalKm = computeDistances(practicalRoute);

      var temples = orthodoxRoute;
      var cumulativeKm = orthodoxKm;
      var routeType = 'orthodox';

      // --- Compute map center and zoom from bounds ---
      function computeView(route) {
        var minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
        route.forEach(function (t) {
          if (t[0] < minLat) minLat = t[0];
          if (t[0] > maxLat) maxLat = t[0];
          if (t[1] < minLng) minLng = t[1];
          if (t[1] > maxLng) maxLng = t[1];
        });
        return {
          center: [(minLat + maxLat) / 2, (minLng + maxLng) / 2],
          bounds: [[minLat - 0.5, minLng - 0.5], [maxLat + 0.5, maxLng + 0.5]]
        };
      }

      var view = computeView(orthodoxRoute);

      // --- Initialize Leaflet map ---
      var map = L.map('ddRouteMap', {
        center: view.center,
        zoom: 5,
        scrollWheelZoom: false,
        attributionControl: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18
      }).addTo(map);

      // Fit to bounds
      map.fitBounds(view.bounds, { padding: [30, 30] });

      // --- Marker icons ---
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

      // --- State variables ---
      var markers = [];
      var routeCoords = [];
      var faintLine = null;
      var animatedLine = null;
      var movingDot = null;
      var dotIcon = L.divIcon({
        className: 'dd-map-dot',
        html: '<span></span>',
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });
      var tableBody = document.getElementById('ddRouteTableBody');
      var tableContainer = document.getElementById('ddRouteTableContainer');
      var infoEl = document.getElementById('ddRouteInfo');
      var prevActiveRow = null;
      var currentSegment = 0;
      var progress = 0;
      var SPEED = 0.04;
      var animFrame = null;
      var paused = false;
      var needsScroll = temples.length > 12;

      // --- Build map elements for current route ---
      function buildMapElements() {
        // Clear existing
        markers.forEach(function (m) { map.removeLayer(m); });
        markers = [];
        if (faintLine) map.removeLayer(faintLine);
        if (animatedLine) map.removeLayer(animatedLine);
        if (movingDot) map.removeLayer(movingDot);

        routeCoords = temples.map(function (t) { return [t[0], t[1]]; });

        // Markers
        temples.forEach(function (t) {
          var marker = L.marker([t[0], t[1]], { icon: templeIcon })
            .addTo(map)
            .bindPopup('<strong>#' + t[2] + '</strong><br>' + t[3]);
          markers.push(marker);
        });

        // Faint full route
        faintLine = L.polyline(routeCoords, {
          color: '#90CAF9', weight: 2, opacity: 0.35, dashArray: '4 6'
        }).addTo(map);

        // Animated route
        animatedLine = L.polyline([], {
          color: '#1565C0', weight: 3.5, opacity: 0.85
        }).addTo(map);

        // Moving dot
        movingDot = L.marker(routeCoords[0], { icon: dotIcon, zIndexOffset: 1000 }).addTo(map);

        // Fit bounds
        var v = computeView(temples);
        map.flyToBounds(v.bounds, { padding: [30, 30], duration: 0.8 });
      }

      // --- Table ---
      function buildTable() {
        if (!tableBody) return;
        var html = '';
        for (var i = 0; i < temples.length; i++) {
          html += '<tr data-idx="' + i + '"><td>' + temples[i][2] + '</td><td>' + temples[i][3] + '</td><td>' + Math.round(cumulativeKm[i]) + '</td></tr>';
        }
        tableBody.innerHTML = html;
        prevActiveRow = null;
      }

      function updateTableRow(segIdx) {
        if (!tableBody || !tableContainer) return;
        if (prevActiveRow) prevActiveRow.classList.remove('active');
        var row = tableBody.querySelector('tr[data-idx="' + segIdx + '"]');
        if (row) {
          row.classList.add('active');
          if (needsScroll) {
            var rowTop = row.offsetTop;
            var rowHeight = row.offsetHeight;
            var containerHeight = tableContainer.clientHeight;
            tableContainer.scrollTop = rowTop - (containerHeight / 2) + (rowHeight / 2);
          }
          prevActiveRow = row;
        }
      }

      // --- Animation ---
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
          if (currentSegment < temples.length && currentSegment > 0) {
            markers[currentSegment - 1].setIcon(templeIcon);
          }
          if (currentSegment >= routeCoords.length - 1) {
            // Highlight last temple
            updateTableRow(temples.length - 1);
            markers[temples.length - 1].setIcon(activeIcon);
            if (infoEl) {
              var last = temples[temples.length - 1];
              infoEl.textContent = '#' + last[2] + ' ' + last[3] + ' — Pilgrimage complete. Restarting...';
            }
            setTimeout(function () {
              currentSegment = 0;
              progress = 0;
              animatedLine.setLatLngs([]);
              markers[temples.length - 1].setIcon(templeIcon);
              updateTableRow(0);
              var firstT = temples[0];
              if (infoEl) infoEl.textContent = 'Starting from ' + firstT[3] + '...';
              animate();
            }, 2000);
            return;
          }
        }

        var from = routeCoords[currentSegment];
        var to = routeCoords[currentSegment + 1];
        var current = lerp(from, to, progress);

        var pathSoFar = routeCoords.slice(0, currentSegment + 1).concat([current]);
        animatedLine.setLatLngs(pathSoFar);
        movingDot.setLatLng(current);

        if (progress < SPEED * 2) {
          markers[currentSegment].setIcon(activeIcon);
          if (currentSegment > 0) markers[currentSegment - 1].setIcon(templeIcon);
          updateTableRow(currentSegment);
        }

        if (infoEl) {
          var t = temples[currentSegment];
          var next = temples[Math.min(currentSegment + 1, temples.length - 1)];
          infoEl.textContent = '#' + t[2] + ' ' + t[3] + '  \u2192  #' + next[2] + ' ' + next[3];
        }

        animFrame = requestAnimationFrame(animate);
      }

      // --- Switch route ---
      function switchRoute(type) {
        if (type === routeType) return;
        routeType = type;
        if (animFrame) cancelAnimationFrame(animFrame);
        animFrame = null;

        if (type === 'practical') {
          temples = practicalRoute;
          cumulativeKm = practicalKm;
        } else {
          temples = orthodoxRoute;
          cumulativeKm = orthodoxKm;
        }
        needsScroll = temples.length > 12;
        currentSegment = 0;
        progress = 0;
        paused = false;

        var playBtn = document.getElementById('ddRoutePlay');
        if (playBtn) playBtn.textContent = 'Pause';

        buildMapElements();
        buildTable();
        updateTableRow(0);
        var firstT = temples[0];
        if (infoEl) infoEl.textContent = 'Starting from ' + firstT[3] + '...';
        animate();
      }

      // --- Route selector buttons ---
      var selectorEl = document.getElementById('routeSelector');
      if (selectorEl) {
        var btns = selectorEl.querySelectorAll('.dd-route-sel-btn');
        btns.forEach(function (btn) {
          btn.addEventListener('click', function () {
            btns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            switchRoute(btn.getAttribute('data-route'));
          });
        });
      }

      // --- Play / Speed controls ---
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

      // --- Start ---
      buildMapElements();
      buildTable();
      updateTableRow(0);
      var firstT = temples[0];
      if (infoEl) infoEl.textContent = 'Starting from ' + firstT[3] + '...';
      animate();

      map.on('click', function () {
        map.scrollWheelZoom.enable();
      });
    }
  };
})();
