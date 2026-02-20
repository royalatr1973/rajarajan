// ========================================
// How to Reach — Travel info on detail page
// Shows nearest railway, bus, airport + distance
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
  var location = temple.location || '';
  var district = temple.district || raw.state || '';
  var lat = raw.lat;
  var lng = raw.lng;

  // Transport hub database for major temple towns
  var transportData = {
    'Kumbakonam':     { railway: 'Kumbakonam Railway Station (0.5 km)', bus: 'Kumbakonam Bus Stand (1 km)', airport: 'Trichy Airport (96 km)', tip: 'Well connected by train from Chennai, Trichy, and Thanjavur.' },
    'Kanchipuram':    { railway: 'Kanchipuram Railway Station (2 km)', bus: 'Kanchipuram Bus Stand (1 km)', airport: 'Chennai Airport (72 km)', tip: 'Regular buses from Chennai CMBT (every 15 min). Train from Chennai Egmore.' },
    'Chidambaram':    { railway: 'Chidambaram Railway Station (1 km)', bus: 'Chidambaram Bus Stand (0.5 km)', airport: 'Trichy Airport (138 km)', tip: 'On the Chennai-Trichy main line. SETC buses from Chennai.' },
    'Thanjavur':      { railway: 'Thanjavur Junction (2 km)', bus: 'Thanjavur New Bus Stand (3 km)', airport: 'Trichy Airport (56 km)', tip: 'Well connected by train from Chennai, Trichy, and Madurai.' },
    'Madurai':        { railway: 'Madurai Junction (2 km)', bus: 'Mattuthavani Bus Stand (6 km)', airport: 'Madurai Airport (12 km)', tip: 'Major rail junction with direct trains from all metros. Airport has domestic flights.' },
    'Tiruchirappalli':{ railway: 'Trichy Junction (3 km)', bus: 'Chatram Bus Stand (2 km)', airport: 'Trichy Airport (8 km)', tip: 'Central hub for temple circuits. Trains to all major cities.' },
    'Srirangam':      { railway: 'Srirangam Railway Station (1 km)', bus: 'Srirangam Bus Stop (0.5 km)', airport: 'Trichy Airport (12 km)', tip: 'Short train ride from Trichy Junction. Local buses available.' },
    'Rameswaram':     { railway: 'Rameswaram Railway Station (1.5 km)', bus: 'Rameswaram Bus Stand (1 km)', airport: 'Madurai Airport (170 km)', tip: 'Train via Pamban Bridge from Madurai. TNSTC buses from Madurai.' },
    'Tirunelveli':    { railway: 'Tirunelveli Junction (2 km)', bus: 'Tirunelveli Bus Stand (1.5 km)', airport: 'Tuticorin Airport (32 km)', tip: 'Major junction. Nava Tirupathi temples accessible by local buses.' },
    'Tiruvannamalai': { railway: 'Tiruvannamalai Railway Station (2 km)', bus: 'Tiruvannamalai Bus Stand (1.5 km)', airport: 'Chennai Airport (185 km)', tip: 'Trains from Villupuram Junction. Buses from Chennai, Bangalore.' },
    'Palani':         { railway: 'Palani Railway Station (2 km)', bus: 'Palani Bus Stand (1 km)', airport: 'Madurai Airport (120 km)', tip: 'Winch/ropeway to hilltop temple. Trains from Dindigul.' },
    'Chennai':        { railway: 'Chennai Central / Egmore (varies)', bus: 'CMBT Koyambedu (varies)', airport: 'Chennai Airport (varies)', tip: 'Metro city with all transport. Local buses and metro rail.' },
    'Varanasi':       { railway: 'Varanasi Junction (6 km)', bus: 'Varanasi Bus Stand (4 km)', airport: 'Lal Bahadur Shastri Airport (25 km)', tip: 'Well connected by train and air from all major cities.' },
    'Puri':           { railway: 'Puri Railway Station (2 km)', bus: 'Puri Bus Stand (2 km)', airport: 'Biju Patnaik Airport, Bhubaneswar (60 km)', tip: 'Direct trains from Delhi, Kolkata, Chennai.' },
    'Dwarka':         { railway: 'Dwarka Railway Station (1 km)', bus: 'Dwarka Bus Stand (0.5 km)', airport: 'Jamnagar Airport (137 km)', tip: 'Trains from Ahmedabad and Rajkot.' },
    'Badrinath':      { railway: 'Rishikesh Railway Station (297 km)', bus: 'Badrinath Bus Stand (0.5 km)', airport: 'Jolly Grant Airport, Dehradun (317 km)', tip: 'Road journey from Rishikesh (10-12 hours). Helicopter service available.' },
    'Somnath':        { railway: 'Veraval Junction (6 km)', bus: 'Somnath Bus Stand (1 km)', airport: 'Diu Airport (85 km)', tip: 'Trains from Ahmedabad via Junagadh. ST buses from Veraval.' },
    'Ujjain':         { railway: 'Ujjain Junction (3 km)', bus: 'Ujjain Bus Stand (2 km)', airport: 'Devi Ahilya Bai Holkar Airport, Indore (55 km)', tip: 'Well connected by train from Delhi, Mumbai, Bhopal.' },
    'Srisailam':      { railway: 'Markapur Road Station (85 km)', bus: 'Srisailam Bus Stand (1 km)', airport: 'Hyderabad Airport (213 km)', tip: 'APSRTC buses from Hyderabad (5 hrs). Road through Nallamala hills.' },
    'Tirumala':       { railway: 'Tirupati Railway Station (22 km)', bus: 'Tirupati Bus Stand → Tirumala (20 km)', airport: 'Tirupati Airport (15 km)', tip: 'APSRTC buses to Tirumala every 5 min. Free bus from railway station.' },
    'Deoghar':        { railway: 'Jasidih Junction (7 km)', bus: 'Deoghar Bus Stand (1 km)', airport: 'Deoghar Airport (5 km)', tip: 'Trains from Kolkata, Patna, Delhi via Jasidih. Auto-rickshaws to temple.' },
    'Nashik':         { railway: 'Nashik Road Junction (8 km)', bus: 'Nashik CBS (3 km)', airport: 'Nashik Airport (domestic, 20 km)', tip: 'Trains from Mumbai (4 hrs). ST buses from Mumbai, Pune.' },
    'Suchindram':     { railway: 'Nagercoil Junction (12 km)', bus: 'Suchindram Bus Stop (0.5 km)', airport: 'Trivandrum Airport (65 km)', tip: 'Buses from Nagercoil and Kanyakumari.' }
  };

  // Find matching transport info
  var transport = null;
  var searchTerms = [location, district, temple.name];
  for (var key in transportData) {
    for (var i = 0; i < searchTerms.length; i++) {
      if (searchTerms[i] && searchTerms[i].toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        transport = transportData[key];
        break;
      }
    }
    if (transport) break;
  }

  // Build the section
  var insertAfter = document.querySelector('.timings-card') || document.querySelector('.detail-card');
  if (!insertAfter) return;

  var section = document.createElement('article');
  section.className = 'how-to-reach-card';

  if (transport) {
    section.innerHTML =
      '<h3>How to Reach</h3>' +
      '<div class="reach-grid">' +
        '<div class="reach-item"><span class="reach-icon">🚂</span><div><strong>Railway</strong><p>' + transport.railway + '</p></div></div>' +
        '<div class="reach-item"><span class="reach-icon">🚌</span><div><strong>Bus Stand</strong><p>' + transport.bus + '</p></div></div>' +
        '<div class="reach-item"><span class="reach-icon">✈️</span><div><strong>Airport</strong><p>' + transport.airport + '</p></div></div>' +
      '</div>' +
      '<p class="reach-tip">' + transport.tip + '</p>';
  } else {
    // Fallback: Google Maps search links
    var q = encodeURIComponent(temple.name + ' ' + location);
    section.innerHTML =
      '<h3>How to Reach</h3>' +
      '<div class="reach-links">' +
        '<a href="https://www.google.com/maps/search/railway+station+near+' + q + '" target="_blank" rel="noopener" class="reach-link-btn">🚂 Nearest Railway</a>' +
        '<a href="https://www.google.com/maps/search/bus+stand+near+' + q + '" target="_blank" rel="noopener" class="reach-link-btn">🚌 Nearest Bus Stand</a>' +
        '<a href="https://www.google.com/maps/search/airport+near+' + q + '" target="_blank" rel="noopener" class="reach-link-btn">✈️ Nearest Airport</a>' +
      '</div>' +
      '<p class="reach-tip">Search results powered by Google Maps for ' + (location || temple.name) + '.</p>';
  }

  insertAfter.parentNode.insertBefore(section, insertAfter.nextSibling);
})();
