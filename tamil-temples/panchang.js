// ========================================
// Daily Panchang Widget
// Computes Tithi, Nakshatra, Yoga, Karana, Rahu Kalam
// Based on simplified Surya Siddhanta approximations
// ========================================
(function () {
  var container = document.getElementById('panchangWidget');
  if (!container) return;

  var now = new Date();
  var dayOfWeek = now.getDay();
  var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var tamilDays = ['Nyaayitru Kizhamai', 'Thingal Kizhamai', 'Chevvaai Kizhamai', 'Budhan Kizhamai', 'Vyaazha Kizhamai', 'Velli Kizhamai', 'Sani Kizhamai'];

  // Tithi calculation (synodic month approximation)
  var tithiNames = [
    'Prathama', 'Dvitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dvadashi', 'Trayodashi', 'Chaturdashi', 'Purnima',
    'Prathama', 'Dvitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dvadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya'
  ];

  var nakshatraNames = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
    'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
    'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
    'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purvashadha',
    'Uttarashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
    'Uttara Bhadrapada', 'Revati'
  ];

  var yogaNames = [
    'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana',
    'Atiganda', 'Sukarma', 'Dhriti', 'Shula', 'Ganda',
    'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra',
    'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva',
    'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma',
    'Indra', 'Vaidhriti'
  ];

  // Julian Day Number
  var y = now.getFullYear();
  var m = now.getMonth() + 1;
  var d = now.getDate();
  if (m <= 2) { y--; m += 12; }
  var jdn = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d - 1524.5;
  var daysSinceEpoch = jdn - 2451545.0;

  // Sun and Moon mean longitudes (simplified)
  var sunLong = (280.466 + 0.9856474 * daysSinceEpoch) % 360;
  var moonLong = (218.316 + 13.176396 * daysSinceEpoch) % 360;
  if (sunLong < 0) sunLong += 360;
  if (moonLong < 0) moonLong += 360;

  var diff = moonLong - sunLong;
  if (diff < 0) diff += 360;

  var tithiIndex = Math.floor(diff / 12) % 30;
  var nakshatraIndex = Math.floor(moonLong / (360 / 27)) % 27;
  var yogaIndex = Math.floor((sunLong + moonLong) / (360 / 27)) % 27;
  var paksha = tithiIndex < 15 ? 'Shukla Paksha (Waxing)' : 'Krishna Paksha (Waning)';

  // Rahu Kalam by day of week (IST) — fixed schedule
  var rahuKalam = [
    '4:30 PM - 6:00 PM', // Sunday
    '7:30 AM - 9:00 AM', // Monday
    '3:00 PM - 4:30 PM', // Tuesday
    '12:00 PM - 1:30 PM', // Wednesday
    '1:30 PM - 3:00 PM', // Thursday
    '10:30 AM - 12:00 PM', // Friday
    '9:00 AM - 10:30 AM'  // Saturday
  ];

  var yamagandam = [
    '12:00 PM - 1:30 PM', // Sunday
    '10:30 AM - 12:00 PM', // Monday
    '9:00 AM - 10:30 AM', // Tuesday
    '7:30 AM - 9:00 AM', // Wednesday
    '6:00 AM - 7:30 AM', // Thursday
    '3:00 PM - 4:30 PM', // Friday
    '1:30 PM - 3:00 PM'  // Saturday
  ];

  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var dateStr = dayNames[dayOfWeek] + ', ' + months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();

  container.innerHTML =
    '<div class="panchang-card">' +
      '<div class="panchang-header">' +
        '<h3>Daily Panchang</h3>' +
        '<span class="panchang-date">' + dateStr + '</span>' +
      '</div>' +
      '<div class="panchang-grid">' +
        '<div class="panchang-item"><span class="panchang-label">Day</span><span class="panchang-value">' + tamilDays[dayOfWeek] + '</span></div>' +
        '<div class="panchang-item"><span class="panchang-label">Tithi</span><span class="panchang-value">' + tithiNames[tithiIndex] + '</span></div>' +
        '<div class="panchang-item"><span class="panchang-label">Paksha</span><span class="panchang-value">' + paksha + '</span></div>' +
        '<div class="panchang-item"><span class="panchang-label">Nakshatra</span><span class="panchang-value">' + nakshatraNames[nakshatraIndex] + '</span></div>' +
        '<div class="panchang-item"><span class="panchang-label">Yoga</span><span class="panchang-value">' + yogaNames[yogaIndex] + '</span></div>' +
        '<div class="panchang-item panchang-warn"><span class="panchang-label">Rahu Kalam</span><span class="panchang-value">' + rahuKalam[dayOfWeek] + '</span></div>' +
        '<div class="panchang-item panchang-warn"><span class="panchang-label">Yamagandam</span><span class="panchang-value">' + yamagandam[dayOfWeek] + '</span></div>' +
      '</div>' +
    '</div>';
})();
