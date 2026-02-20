// ========================================
// Weather Widget & Best Season to Visit
// Uses Open-Meteo free API (no key) + static best-season data
// ========================================
(function () {
  var params = new URLSearchParams(window.location.search);
  var type = params.get('type');
  var id = params.get('id');
  if (!type || !id) return;

  var data = window.getSectionData ? window.getSectionData(type) : [];
  var temple = data.find(function (t) { return String(t.id) === String(id); });
  if (!temple) return;

  var raw = temple.raw || {};
  var lat = raw.lat;
  var lng = raw.lng;

  // Best season data by region/type
  var bestSeasons = {
    chardham:      { season: 'May - October', note: 'Himalayan dhams closed Nov-Apr due to heavy snowfall.' },
    jyotirlinga:   { season: 'October - March', note: 'Varies by location. Kedarnath open May-Nov only.' },
    shaktipeethas: { season: 'October - March', note: 'Navaratri (Sep/Oct) is the best time to visit.' },
    _himalayan:    { season: 'May - June, Sep - Oct', note: 'Monsoon (Jul-Aug) causes landslides. Winter is extremely cold.' },
    _south:        { season: 'October - March', note: 'South India temples best visited in winter. Avoid Apr-Jun (extreme heat).' },
    _default:      { season: 'October - March', note: 'Temple festivals are concentrated in Nov-Mar (Margazhi to Panguni).' }
  };

  var seasonInfo = bestSeasons[type] || bestSeasons._south;
  // Override for specific northern temples
  var location = (temple.location || '').toLowerCase();
  if (['badrinath', 'kedarnath', 'amarnath', 'vaishno devi'].some(function (p) { return location.indexOf(p) !== -1; })) {
    seasonInfo = bestSeasons._himalayan;
  }

  var insertAfter = document.querySelector('.rules-detail-card') || document.querySelector('.accommodation-card') || document.querySelector('.how-to-reach-card') || document.querySelector('.timings-card');
  if (!insertAfter) return;

  var section = document.createElement('article');
  section.className = 'weather-card';
  section.innerHTML =
    '<h3>Weather & Best Time to Visit</h3>' +
    '<div class="weather-content">' +
      '<div class="weather-season">' +
        '<span class="weather-season-label">Best Season</span>' +
        '<span class="weather-season-value">' + seasonInfo.season + '</span>' +
        '<p class="weather-season-note">' + seasonInfo.note + '</p>' +
      '</div>' +
      '<div id="weatherLive" class="weather-live">' +
        (lat && lng ? '<p class="weather-loading">Loading current weather...</p>' : '<p class="weather-na">Enable coordinates for live weather data.</p>') +
      '</div>' +
    '</div>';

  insertAfter.parentNode.insertBefore(section, insertAfter.nextSibling);

  // Fetch live weather if coordinates available
  if (lat && lng) {
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lng +
              '&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m' +
              '&timezone=Asia%2FKolkata';

    fetch(url)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data.current) return;
        var temp = data.current.temperature_2m;
        var humidity = data.current.relative_humidity_2m;
        var wind = data.current.wind_speed_10m;
        var code = data.current.weather_code;

        var weatherDesc = {
          0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
          45: 'Foggy', 48: 'Depositing rime fog',
          51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
          61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
          71: 'Slight snowfall', 73: 'Moderate snowfall', 75: 'Heavy snowfall',
          80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
          95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Thunderstorm with heavy hail'
        };

        var desc = weatherDesc[code] || 'N/A';
        var liveEl = document.getElementById('weatherLive');
        if (liveEl) {
          liveEl.innerHTML =
            '<div class="weather-current">' +
              '<div class="weather-temp">' + Math.round(temp) + '°C</div>' +
              '<div class="weather-desc">' + desc + '</div>' +
            '</div>' +
            '<div class="weather-details">' +
              '<span>Humidity: ' + humidity + '%</span>' +
              '<span>Wind: ' + wind + ' km/h</span>' +
            '</div>';
        }
      })
      .catch(function () {
        var liveEl = document.getElementById('weatherLive');
        if (liveEl) liveEl.innerHTML = '<p class="weather-na">Weather data unavailable.</p>';
      });
  }
})();
