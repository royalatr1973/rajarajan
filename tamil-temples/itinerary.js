// ========================================
// Day-Wise Itinerary Generator
// Groups temples into days with overnight stop suggestions
// ========================================
(function () {
  var type = document.body.dataset.sectionType;
  if (!type) return;

  var data = window.getSectionData ? window.getSectionData(type) : [];
  var withCoords = data.filter(function (t) {
    return (t.raw && t.raw.lat && t.raw.lng) || (t.lat && t.lng);
  });
  if (withCoords.length < 4) return;

  var tripResult = document.getElementById('tripResult');
  if (!tripResult) return;

  // Watch for trip planner results to add itinerary button
  var observer = new MutationObserver(function () {
    if (tripResult.querySelector('.trip-route-list') && !document.getElementById('itineraryBtn')) {
      addItineraryBtn();
    }
  });
  observer.observe(tripResult, { childList: true, subtree: true });

  function addItineraryBtn() {
    var btn = document.createElement('button');
    btn.id = 'itineraryBtn';
    btn.className = 'trip-btn trip-btn-primary';
    btn.style.marginTop = '12px';
    btn.textContent = 'Generate Day-Wise Itinerary';
    btn.addEventListener('click', generateItinerary);
    tripResult.appendChild(btn);
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

  function generateItinerary() {
    var routeItems = tripResult.querySelectorAll('.trip-route-list li');
    if (!routeItems.length) return;

    // Parse temple list from trip planner
    var temples = [];
    routeItems.forEach(function (li) {
      var strong = li.querySelector('strong');
      var locSpan = li.querySelector('.trip-location');
      var distSpan = li.querySelector('.trip-dist');
      if (strong) {
        var name = strong.textContent;
        var loc = locSpan ? locSpan.textContent : '';
        var distText = distSpan ? distSpan.textContent : '';
        var distKm = parseFloat(distText) || 0;
        temples.push({ name: name, location: loc, distFromPrev: distKm });
      }
    });

    if (temples.length < 2) return;

    // Group into days: max 150 km driving or 4 temples per day
    var days = [];
    var currentDay = { temples: [], totalKm: 0 };
    var maxKmPerDay = 150;
    var maxTemplesPerDay = 4;

    temples.forEach(function (t, i) {
      if (i === 0) {
        currentDay.temples.push(t);
        return;
      }

      if (currentDay.totalKm + t.distFromPrev > maxKmPerDay || currentDay.temples.length >= maxTemplesPerDay) {
        days.push(currentDay);
        currentDay = { temples: [], totalKm: 0 };
      }
      currentDay.totalKm += t.distFromPrev;
      currentDay.temples.push(t);
    });
    if (currentDay.temples.length) days.push(currentDay);

    // Render itinerary
    var existing = document.getElementById('itineraryResult');
    if (existing) existing.remove();

    var div = document.createElement('div');
    div.id = 'itineraryResult';
    div.className = 'itinerary-result';
    div.innerHTML =
      '<h3>Day-Wise Itinerary (' + days.length + ' Days, ' + temples.length + ' Temples)</h3>' +
      days.map(function (day, di) {
        var lastTemple = day.temples[day.temples.length - 1];
        return '<div class="itinerary-day">' +
          '<div class="itinerary-day-header">' +
            '<strong>Day ' + (di + 1) + '</strong>' +
            '<span>' + day.temples.length + ' temples, ~' + Math.round(day.totalKm) + ' km driving</span>' +
          '</div>' +
          '<ol class="itinerary-temples">' +
            day.temples.map(function (t, ti) {
              var timeSlot = ['6:00 AM - Morning darshan', '9:30 AM - Mid-morning visit', '12:00 PM - Noon darshan', '3:00 PM - Afternoon visit'][ti] || '4:30 PM - Evening darshan';
              return '<li><span class="itinerary-time">' + timeSlot + '</span> <strong>' + t.name + '</strong> <span class="trip-location">' + t.location + '</span></li>';
            }).join('') +
          '</ol>' +
          '<div class="itinerary-overnight">🏨 Overnight: ' + (lastTemple.location || lastTemple.name) + '</div>' +
        '</div>';
      }).join('') +
      '<p class="itinerary-note">Estimated ~45 min per temple for darshan. Adjust based on queue times and personal pace. Start early (5:30 AM) for best experience.</p>';

    tripResult.appendChild(div);
  }
})();
