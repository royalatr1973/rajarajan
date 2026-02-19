// ========================================
// Nearby Temples — Geolocation-based finder
// Shows temples from ALL sections sorted by distance
// ========================================
(function () {
  var listEl = document.getElementById('nearbyList');
  var statusEl = document.getElementById('nearbyStatus');
  var btnEl = document.getElementById('nearbyBtn');
  if (!listEl || !statusEl || !btnEl) return;

  function haversine(lat1, lng1, lat2, lng2) {
    var R = 6371;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLng = (lng2 - lng1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function getAllTemples() {
    var allTypes = Object.keys(window.sectionMeta || {});
    var temples = [];
    allTypes.forEach(function (type) {
      var data = window.getSectionData(type);
      if (!data) return;
      data.forEach(function (t) {
        var lat = t.raw && t.raw.lat ? t.raw.lat : (t.lat || null);
        var lng = t.raw && t.raw.lng ? t.raw.lng : (t.lng || null);
        if (lat && lng) {
          temples.push({
            name: t.name, location: t.location, deity: t.deity,
            lat: lat, lng: lng, type: type, id: t.id, image: t.image,
            section: (window.sectionMeta[type] || {}).title || type
          });
        }
      });
    });
    return temples;
  }

  function renderResults(temples, userLat, userLng) {
    temples.forEach(function (t) {
      t.distance = haversine(userLat, userLng, t.lat, t.lng);
    });
    temples.sort(function (a, b) { return a.distance - b.distance; });

    var top50 = temples.slice(0, 50);
    if (!top50.length) {
      listEl.innerHTML = '<p class="no-data">No temples with coordinates found in the database.</p>';
      return;
    }

    statusEl.innerHTML = 'Showing ' + top50.length + ' nearest temples from your location (' + userLat.toFixed(4) + ', ' + userLng.toFixed(4) + ')';

    listEl.innerHTML = top50.map(function (t) {
      var fallback = window.getSectionFallback ? window.getSectionFallback(t.type, t.name) : '';
      var imgSrc = t.image || fallback;
      var distStr = t.distance < 1 ? (t.distance * 1000).toFixed(0) + ' m' : t.distance.toFixed(1) + ' km';
      return '<article class="temple-card">' +
        '<a href="temple.html?type=' + encodeURIComponent(t.type) + '&id=' + encodeURIComponent(t.id) + '">' +
          '<img src="' + imgSrc + '" alt="' + t.name + '" onerror="this.onerror=null;this.src=\'' + fallback.replace(/'/g, "\\'") + '\';" />' +
          '<div class="content">' +
            '<h3>' + t.name + '</h3>' +
            '<p>' + (t.location || '') + '</p>' +
            '<span class="badge">' + distStr + '</span> ' +
            '<span class="badge">' + t.section + '</span>' +
          '</div>' +
        '</a>' +
      '</article>';
    }).join('');
  }

  btnEl.addEventListener('click', function () {
    if (!navigator.geolocation) {
      statusEl.textContent = 'Geolocation is not supported by your browser.';
      return;
    }

    statusEl.textContent = 'Detecting your location...';
    btnEl.disabled = true;

    navigator.geolocation.getCurrentPosition(
      function (pos) {
        var temples = getAllTemples();
        renderResults(temples, pos.coords.latitude, pos.coords.longitude);
        btnEl.textContent = 'Refresh Location';
        btnEl.disabled = false;
      },
      function (err) {
        statusEl.textContent = 'Location access denied. Please enable location permission and try again.';
        btnEl.disabled = false;
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });

  // Search filter
  var searchEl = document.getElementById('nearbySearch');
  if (searchEl) {
    searchEl.addEventListener('input', function () {
      var q = searchEl.value.toLowerCase().trim();
      var cards = listEl.querySelectorAll('.temple-card');
      cards.forEach(function (card) {
        var text = card.textContent.toLowerCase();
        card.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }
})();
