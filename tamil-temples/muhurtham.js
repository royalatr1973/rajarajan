/* Auspicious Date Finder (Muhurtham Lookup) */
(function () {
  var tithis = ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Pournami/Amavasya'];
  var nakshatras = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'P.Phalguni', 'U.Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'P.Ashadha', 'U.Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'P.Bhadra', 'U.Bhadra', 'Revati'];
  var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Auspicious combinations per activity
  var rules = {
    'temple-visit': {
      goodTithis: [2, 3, 5, 7, 10, 11, 13],
      goodNakshatras: [0, 3, 6, 7, 12, 16, 21, 26],
      goodDays: [1, 4, 5], // Mon, Thu, Fri
      badDays: [],
      label: 'Temple Visit'
    },
    'pooja': {
      goodTithis: [2, 3, 5, 7, 10, 11],
      goodNakshatras: [0, 3, 6, 7, 12, 14, 21, 26],
      goodDays: [1, 3, 4, 5],
      badDays: [2],
      label: 'Special Pooja'
    },
    'grihapravesham': {
      goodTithis: [1, 2, 3, 5, 6, 7, 10, 11, 12],
      goodNakshatras: [0, 3, 6, 7, 11, 12, 14, 21, 26],
      goodDays: [1, 3, 4, 5],
      badDays: [2, 6],
      label: 'Grihapravesham'
    },
    'wedding': {
      goodTithis: [1, 2, 3, 5, 6, 7, 10, 11, 12],
      goodNakshatras: [0, 3, 6, 7, 11, 12, 21, 26],
      goodDays: [1, 3, 4, 5],
      badDays: [2, 6],
      label: 'Wedding/Engagement'
    },
    'travel': {
      goodTithis: [2, 3, 5, 7, 10, 11, 12],
      goodNakshatras: [0, 3, 6, 7, 12, 14, 21, 26],
      goodDays: [1, 3, 5],
      badDays: [2, 6],
      label: 'Pilgrimage Travel'
    },
    'business': {
      goodTithis: [1, 2, 3, 5, 6, 10, 11],
      goodNakshatras: [0, 3, 6, 7, 11, 12, 14, 21],
      goodDays: [1, 3, 4, 5],
      badDays: [2, 6],
      label: 'Business/New Venture'
    }
  };

  // Approximate tithi and nakshatra for a given date (simplified astronomical calculation)
  function getTithi(date) {
    var refNew = new Date(2026, 0, 29); // approximate new moon
    var daysDiff = Math.floor((date - refNew) / 86400000);
    var lunarDay = ((daysDiff % 30) + 30) % 30;
    return lunarDay % 15;
  }

  function getNakshatra(date) {
    var refDate = new Date(2026, 0, 1);
    var daysDiff = Math.floor((date - refDate) / 86400000);
    // Each nakshatra lasts ~1 day (27 nakshatras in ~27.3 days)
    return ((daysDiff % 27) + 27) % 27;
  }

  function getRahuKalam(dow) {
    var rahu = ['4:30-6:00 PM', '7:30-9:00 AM', '3:00-4:30 PM', '12:00-1:30 PM', '1:30-3:00 PM', '10:30-12:00 PM', '9:00-10:30 AM'];
    return rahu[dow];
  }

  // Set default dates
  var today = new Date();
  var nextMonth = new Date(today);
  nextMonth.setDate(today.getDate() + 30);
  document.getElementById('muhStart').value = today.toISOString().split('T')[0];
  document.getElementById('muhEnd').value = nextMonth.toISOString().split('T')[0];

  document.getElementById('muhFind').addEventListener('click', function () {
    var activity = document.getElementById('muhActivity').value;
    var startStr = document.getElementById('muhStart').value;
    var endStr = document.getElementById('muhEnd').value;
    var resultsEl = document.getElementById('muhResults');

    if (!startStr || !endStr) {
      resultsEl.innerHTML = '<p class="no-data">Please select both start and end dates.</p>';
      return;
    }

    var start = new Date(startStr);
    var end = new Date(endStr);
    var rule = rules[activity];
    var results = [];

    for (var d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      var dow = d.getDay();
      var tithi = getTithi(d);
      var nak = getNakshatra(d);

      var score = 0;
      var reasons = [];

      // Check if it's a bad day
      if (rule.badDays.indexOf(dow) >= 0) continue;

      // Good day of week
      if (rule.goodDays.indexOf(dow) >= 0) { score += 2; reasons.push('Auspicious weekday (' + dayNames[dow] + ')'); }

      // Good tithi
      if (rule.goodTithis.indexOf(tithi) >= 0) { score += 3; reasons.push('Favorable tithi: ' + tithis[tithi]); }

      // Good nakshatra
      if (rule.goodNakshatras.indexOf(nak) >= 0) { score += 3; reasons.push('Auspicious nakshatra: ' + nakshatras[nak]); }

      // Avoid Ashtami (7), Navami (8), Chaturdashi (13), Amavasya (14 on Shukla)
      if (tithi === 7 || tithi === 8 || tithi === 13) { score -= 2; }

      if (score >= 4) {
        results.push({
          date: new Date(d),
          dow: dow,
          tithi: tithis[tithi],
          nakshatra: nakshatras[nak],
          rahuKalam: getRahuKalam(dow),
          score: score,
          reasons: reasons
        });
      }
    }

    // Sort by score
    results.sort(function (a, b) { return b.score - a.score; });

    if (!results.length) {
      resultsEl.innerHTML = '<p class="no-data">No highly auspicious dates found in this range for ' + rule.label + '. Try expanding the date range.</p>';
      return;
    }

    resultsEl.innerHTML =
      '<h2 style="color:var(--saffron);margin-bottom:14px">Auspicious Dates for ' + rule.label + '</h2>' +
      '<p style="color:var(--muted);font-size:13px;margin-bottom:16px">Found ' + results.length + ' favorable dates. Ranked by auspiciousness.</p>' +
      '<div class="muhurtham-list">' +
      results.map(function (r, i) {
        var dateStr = r.date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        var stars = r.score >= 8 ? '&#9733;&#9733;&#9733;' : r.score >= 6 ? '&#9733;&#9733;' : '&#9733;';
        var levelClass = r.score >= 8 ? 'muh-excellent' : r.score >= 6 ? 'muh-good' : 'muh-fair';
        return '<div class="muhurtham-item ' + levelClass + '">' +
          '<div class="muh-header">' +
            '<div><strong>' + dateStr + '</strong>' +
            '<span class="muh-stars">' + stars + '</span></div>' +
            '<span class="muh-rank">#' + (i + 1) + '</span>' +
          '</div>' +
          '<div class="detail-grid" style="margin-top:8px">' +
            '<div><strong>Tithi</strong>' + r.tithi + '</div>' +
            '<div><strong>Nakshatra</strong>' + r.nakshatra + '</div>' +
            '<div><strong>Rahu Kalam</strong>' + r.rahuKalam + ' (avoid)</div>' +
          '</div>' +
          '<div class="muh-reasons">' + r.reasons.map(function (reason) { return '<span class="badge">' + reason + '</span>'; }).join(' ') + '</div>' +
        '</div>';
      }).join('') +
      '</div>' +
      '<p style="color:var(--muted);font-size:12px;margin-top:14px;font-style:italic">Note: These are approximate calculations based on simplified astronomical models. For precise muhurthams, consult a qualified astrologer or panchangam.</p>';
  });
})();
