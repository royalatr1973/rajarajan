/* Nakshatra/Birth Star Temple Recommender */
(function () {
  var nakshatras = [
    { id: 1, name: 'Ashwini', tamil: 'Aswini', deity: 'Ashwini Kumaras', temple: 'Thirukadaiyur Amritaghateswarar Temple', location: 'Thirukadaiyur, Nagapattinam', district: 'Nagapattinam', bestDays: 'Tuesdays and during Ashwini nakshatra days', remedy: 'Worship Lord Shiva for longevity and health', lat: 10.9780, lng: 79.8330 },
    { id: 2, name: 'Bharani', tamil: 'Bharani', deity: 'Yama', temple: 'Thirunallar Dharbaranyeswarar Temple', location: 'Thirunallar, Karaikal', district: 'Karaikal', bestDays: 'Saturdays and Bharani nakshatra days', remedy: 'Worship Lord Shiva to overcome Saturn afflictions', lat: 10.8433, lng: 79.8131 },
    { id: 3, name: 'Krittika', tamil: 'Karthigai', deity: 'Agni', temple: 'Kilvelur Kottravaleswarar Temple', location: 'Kilvelur, Nagapattinam', district: 'Nagapattinam', bestDays: 'Sundays and Krittika nakshatra days', remedy: 'Light lamps and worship Lord Shiva', lat: 10.9167, lng: 79.7500 },
    { id: 4, name: 'Rohini', tamil: 'Rohini', deity: 'Brahma', temple: 'Thiruvidaimarudur Mahalinga Swamy Temple', location: 'Thiruvidaimarudur, Thanjavur', district: 'Thanjavur', bestDays: 'Mondays and Rohini nakshatra days', remedy: 'Worship Lord Shiva for prosperity and creativity', lat: 10.9920, lng: 79.4550 },
    { id: 5, name: 'Mrigashira', tamil: 'Mrigaseerisham', deity: 'Soma (Moon)', temple: 'Thiruvenkadu Swetharanyeswarar Temple', location: 'Thiruvenkadu, Mayiladuthurai', district: 'Mayiladuthurai', bestDays: 'Mondays and Mrigashira nakshatra days', remedy: 'Worship Lord Shiva for intellectual growth', lat: 11.2507, lng: 79.7417 },
    { id: 6, name: 'Ardra', tamil: 'Thiruvaathirai', deity: 'Rudra (Shiva)', temple: 'Thirumanancheri Umamaheswarar Temple', location: 'Thirumanancheri, Mayiladuthurai', district: 'Mayiladuthurai', bestDays: 'Mondays, Thiruvaathirai and Ardra days', remedy: 'Worship Lord Shiva in Nataraja form', lat: 11.1500, lng: 79.7000 },
    { id: 7, name: 'Punarvasu', tamil: 'Punarpoosam', deity: 'Aditi', temple: 'Srirangam Ranganathaswamy Temple', location: 'Srirangam, Trichy', district: 'Tiruchirapalli', bestDays: 'Thursdays and Punarvasu nakshatra days', remedy: 'Worship Lord Ranganatha for renewal and restoration', lat: 10.8627, lng: 78.6873 },
    { id: 8, name: 'Pushya', tamil: 'Poosam', deity: 'Brihaspati', temple: 'Alangudi Apatsahayeswarar Temple', location: 'Alangudi, Thiruvarur', district: 'Thiruvarur', bestDays: 'Thursdays and Pushya nakshatra days', remedy: 'Worship Lord Shiva for wisdom and children', lat: 10.6680, lng: 79.4010 },
    { id: 9, name: 'Ashlesha', tamil: 'Aayilyam', deity: 'Nagas (Serpent)', temple: 'Kumbakonam Nageswaran Temple', location: 'Kumbakonam', district: 'Thanjavur', bestDays: 'Aayilyam days and Rahu kalam', remedy: 'Worship Naga deities for removal of serpent curses', lat: 10.9617, lng: 79.3880 },
    { id: 10, name: 'Magha', tamil: 'Magam', deity: 'Pitris (Ancestors)', temple: 'Thirupugalur Agneeswarar Temple', location: 'Thirupugalur, Nagapattinam', district: 'Nagapattinam', bestDays: 'Amavasya and Magha nakshatra days', remedy: 'Perform ancestral rites and worship Shiva', lat: 10.9500, lng: 79.7833 },
    { id: 11, name: 'Purva Phalguni', tamil: 'Pooram', deity: 'Bhaga', temple: 'Thirunageswaram Naganathaswamy Temple', location: 'Thirunageswaram, Thanjavur', district: 'Thanjavur', bestDays: 'Saturdays and during Rahu kalam', remedy: 'Worship Lord Shiva and Rahu for material happiness', lat: 10.9428, lng: 79.3146 },
    { id: 12, name: 'Uttara Phalguni', tamil: 'Uthiram', deity: 'Aryaman', temple: 'Thirunaraiyur Nachiyar Koil', location: 'Nachiyar Koil, Thanjavur', district: 'Thanjavur', bestDays: 'Fridays and Uttara Phalguni days', remedy: 'Worship Lord Vishnu for marriage and partnerships', lat: 10.9833, lng: 79.4167 },
    { id: 13, name: 'Hasta', tamil: 'Hastham', deity: 'Savitar (Sun)', temple: 'Suryanar Kovil', location: 'Suryanar Kovil, Mayiladuthurai', district: 'Mayiladuthurai', bestDays: 'Sundays and Hasta nakshatra days', remedy: 'Worship Surya for skill and dexterity', lat: 11.0012, lng: 79.4040 },
    { id: 14, name: 'Chitra', tamil: 'Chithirai', deity: 'Vishwakarma', temple: 'Sirkazhi Sattainathar Temple', location: 'Sirkazhi, Mayiladuthurai', district: 'Mayiladuthurai', bestDays: 'Wednesdays and Chitra nakshatra days', remedy: 'Worship Lord Shiva for creativity and arts', lat: 11.2373, lng: 79.7366 },
    { id: 15, name: 'Swati', tamil: 'Swathi', deity: 'Vayu', temple: 'Thiruvenkadu Swetharanyeswarar Temple', location: 'Thiruvenkadu, Mayiladuthurai', district: 'Mayiladuthurai', bestDays: 'Saturdays and Swati nakshatra days', remedy: 'Worship Lord Shiva for independence and freedom', lat: 11.2507, lng: 79.7417 },
    { id: 16, name: 'Vishakha', tamil: 'Visakam', deity: 'Indra-Agni', temple: 'Thirunelvayil Arathurai Aranvalleswarar Temple', location: 'Thirunelvayil, Mayiladuthurai', district: 'Mayiladuthurai', bestDays: 'Thursdays and Vishakha nakshatra days', remedy: 'Worship Lord Shiva for purpose and determination', lat: 11.1833, lng: 79.7333 },
    { id: 17, name: 'Anuradha', tamil: 'Anusham', deity: 'Mitra', temple: 'Thirualavai Choleswarar Temple', location: 'Thirualavai, Mayiladuthurai', district: 'Mayiladuthurai', bestDays: 'Saturdays and Anuradha nakshatra days', remedy: 'Worship Lord Shiva for friendship and devotion', lat: 11.2000, lng: 79.7167 },
    { id: 18, name: 'Jyeshtha', tamil: 'Kettai', deity: 'Indra', temple: 'Achalpuram Neelakandeswarar Temple', location: 'Achalpuram, Nagapattinam', district: 'Nagapattinam', bestDays: 'Mondays and Jyeshtha nakshatra days', remedy: 'Worship Lord Shiva for courage and seniority', lat: 10.9333, lng: 79.7667 },
    { id: 19, name: 'Mula', tamil: 'Moolam', deity: 'Nirrti', temple: 'Thiruveezhimizhalai Veezhimizhalai Nathar Temple', location: 'Thiruveezhimizhalai, Thanjavur', district: 'Thanjavur', bestDays: 'Tuesdays and Mula nakshatra days', remedy: 'Worship Lord Shiva for removal of root obstacles', lat: 10.9500, lng: 79.5167 },
    { id: 20, name: 'Purva Ashadha', tamil: 'Pooraadam', deity: 'Apas (Water)', temple: 'Thiruvarur Thyagaraja Temple', location: 'Thiruvarur', district: 'Thiruvarur', bestDays: 'Fridays and Purva Ashadha nakshatra days', remedy: 'Worship Lord Thyagaraja for invincibility', lat: 10.7706, lng: 79.6345 },
    { id: 21, name: 'Uttara Ashadha', tamil: 'Uthiraadam', deity: 'Vishvedevas', temple: 'Vaitheeswaran Koil', location: 'Vaitheeswaran Koil, Mayiladuthurai', district: 'Mayiladuthurai', bestDays: 'Tuesdays and Uttara Ashadha nakshatra days', remedy: 'Worship Lord Vaitheeswaran for victory and healing', lat: 11.2340, lng: 79.6640 },
    { id: 22, name: 'Shravana', tamil: 'Thiruvonam', deity: 'Vishnu', temple: 'Oppiliappan Temple', location: 'Thirunageswaram, Thanjavur', district: 'Thanjavur', bestDays: 'Wednesdays and Shravana nakshatra days', remedy: 'Worship Lord Vishnu for knowledge through listening', lat: 10.9533, lng: 79.3000 },
    { id: 23, name: 'Dhanishta', tamil: 'Avittam', deity: 'Vasus', temple: 'Thiruppampuram Pampureshwarar Temple', location: 'Thiruppampuram, Thanjavur', district: 'Thanjavur', bestDays: 'Saturdays and Dhanishta nakshatra days', remedy: 'Worship Lord Shiva for wealth and abundance', lat: 10.8833, lng: 79.5333 },
    { id: 24, name: 'Shatabhisha', tamil: 'Sadhayam', deity: 'Varuna', temple: 'Poombuhar Dharmalingeshwarar Temple', location: 'Poombuhar, Mayiladuthurai', district: 'Mayiladuthurai', bestDays: 'Saturdays and Shatabhisha days', remedy: 'Worship Lord Shiva for healing and mystical powers', lat: 11.1500, lng: 79.8500 },
    { id: 25, name: 'Purva Bhadrapada', tamil: 'Poorattathi', deity: 'Aja Ekapada', temple: 'Thirukkandiyur Brahmasirankandeswarar Temple', location: 'Thirukkandiyur, Thanjavur', district: 'Thanjavur', bestDays: 'Thursdays and Purva Bhadrapada days', remedy: 'Worship Lord Shiva for spiritual fire and penances', lat: 10.9667, lng: 79.3833 },
    { id: 26, name: 'Uttara Bhadrapada', tamil: 'Uthrattadhi', deity: 'Ahir Budhnya', temple: 'Kanjanur Agneeswarar Temple', location: 'Kanjanur, Thanjavur', district: 'Thanjavur', bestDays: 'Fridays and Uttara Bhadrapada days', remedy: 'Worship Lord Shiva for deep wisdom', lat: 10.9894, lng: 79.3969 },
    { id: 27, name: 'Revati', tamil: 'Revathi', deity: 'Pushan', temple: 'Mahalingeswarar Temple', location: 'Thiruvidaimarudur, Thanjavur', district: 'Thanjavur', bestDays: 'Wednesdays and Revati nakshatra days', remedy: 'Worship Lord Shiva for safe journeys and nourishment', lat: 10.9920, lng: 79.4550 }
  ];

  var select = document.getElementById('nakshatraSelect');
  var resultEl = document.getElementById('nakshatraResult');
  var gridEl = document.getElementById('nakshatraGrid');

  // Populate dropdown
  nakshatras.forEach(function (n) {
    var opt = document.createElement('option');
    opt.value = n.id;
    opt.textContent = n.id + '. ' + n.name + ' (' + n.tamil + ')';
    select.appendChild(opt);
  });

  // Show all nakshatras as a grid
  gridEl.innerHTML = nakshatras.map(function (n) {
    return '<div class="nakshatra-card" data-id="' + n.id + '">' +
      '<div class="nakshatra-num">' + n.id + '</div>' +
      '<h4>' + n.name + '</h4>' +
      '<span class="nakshatra-tamil">' + n.tamil + '</span>' +
      '<p class="nakshatra-temple-name">' + n.temple + '</p>' +
      '<span class="nakshatra-loc">' + n.location + '</span>' +
    '</div>';
  }).join('');

  // Click on card
  gridEl.addEventListener('click', function (e) {
    var card = e.target.closest('.nakshatra-card');
    if (!card) return;
    var id = parseInt(card.dataset.id);
    select.value = id;
    showResult(id);
  });

  select.addEventListener('change', function () {
    var id = parseInt(select.value);
    if (id) showResult(id);
    else resultEl.style.display = 'none';
  });

  function showResult(id) {
    var n = nakshatras.find(function (x) { return x.id === id; });
    if (!n) return;
    var mapsUrl = n.lat ? 'https://www.google.com/maps/dir/?api=1&destination=' + n.lat + ',' + n.lng : 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(n.temple);

    resultEl.innerHTML =
      '<div class="nakshatra-result-card">' +
        '<div class="nakshatra-result-header">' +
          '<div><h2>' + n.name + ' <span>(' + n.tamil + ')</span></h2>' +
          '<p class="nakshatra-deity">Ruling Deity: <strong>' + n.deity + '</strong></p></div>' +
          '<div class="nakshatra-num-large">#' + n.id + '</div>' +
        '</div>' +
        '<div class="nakshatra-result-body">' +
          '<div class="nakshatra-info-block">' +
            '<strong>Parihara Sthalam</strong>' +
            '<h3>' + n.temple + '</h3>' +
            '<p>' + n.location + ', ' + n.district + '</p>' +
          '</div>' +
          '<div class="nakshatra-info-block">' +
            '<strong>Best Days to Visit</strong>' +
            '<p>' + n.bestDays + '</p>' +
          '</div>' +
          '<div class="nakshatra-info-block">' +
            '<strong>Remedy</strong>' +
            '<p>' + n.remedy + '</p>' +
          '</div>' +
        '</div>' +
        '<a class="maps-btn" href="' + mapsUrl + '" target="_blank" rel="noopener">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
          'Get Directions' +
        '</a>' +
      '</div>';
    resultEl.style.display = '';
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
})();
