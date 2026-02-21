/* Crowd/Queue Density Calendar */
(function () {
  var currentDate = new Date();
  var viewMonth = currentDate.getMonth();
  var viewYear = currentDate.getFullYear();

  // Auspicious recurring days that draw crowds
  var weekdayFactors = { 0: 1.3, 1: 1.0, 2: 1.2, 3: 1.0, 4: 1.1, 5: 1.2, 6: 1.5 }; // Sun=1.3, Sat=1.5, Tue=1.2

  // Major festival dates (approximate — these shift yearly by Hindu calendar)
  var festivals2026 = [
    { month: 0, day: 14, name: 'Pongal / Makar Sankranti', level: 'extreme' },
    { month: 0, day: 15, name: 'Pongal Day 2', level: 'extreme' },
    { month: 0, day: 26, name: 'Republic Day', level: 'high' },
    { month: 1, day: 26, name: 'Maha Shivaratri', level: 'extreme' },
    { month: 2, day: 14, name: 'Panguni Uthiram', level: 'extreme' },
    { month: 2, day: 30, name: 'Ugadi / Tamil New Year', level: 'high' },
    { month: 3, day: 14, name: 'Tamil New Year (Puthandu)', level: 'extreme' },
    { month: 3, day: 10, name: 'Ram Navami', level: 'high' },
    { month: 4, day: 1, name: 'May Day', level: 'moderate' },
    { month: 4, day: 12, name: 'Vaigasi Visakam', level: 'high' },
    { month: 5, day: 15, name: 'Aani Thirumanjanam', level: 'high' },
    { month: 7, day: 15, name: 'Independence Day', level: 'high' },
    { month: 7, day: 26, name: 'Krishna Jayanthi', level: 'extreme' },
    { month: 8, day: 5, name: 'Vinayaka Chaturthi', level: 'extreme' },
    { month: 8, day: 19, name: 'Navaratri Begins', level: 'extreme' },
    { month: 8, day: 28, name: 'Vijayadashami', level: 'extreme' },
    { month: 9, day: 2, name: 'Gandhi Jayanthi', level: 'moderate' },
    { month: 9, day: 20, name: 'Deepavali', level: 'extreme' },
    { month: 9, day: 29, name: 'Skanda Sashti', level: 'high' },
    { month: 10, day: 15, name: 'Karthigai Deepam', level: 'extreme' },
    { month: 11, day: 16, name: 'Vaikunta Ekadasi', level: 'extreme' },
    { month: 11, day: 25, name: 'Christmas Holiday', level: 'moderate' },
    { month: 11, day: 31, name: 'New Year Eve', level: 'high' }
  ];

  // Temple-specific high days
  var templeSpecific = {
    tirupati: [{ month: 8, day: 28, name: 'Brahmotsavam', level: 'extreme' }, { month: 11, day: 16, name: 'Vaikunta Ekadasi', level: 'extreme' }],
    meenakshi: [{ month: 3, day: 14, name: 'Chithirai Thiruvizha', level: 'extreme' }],
    srirangam: [{ month: 11, day: 16, name: 'Vaikunta Ekadasi (20-day)', level: 'extreme' }],
    rameswaram: [{ month: 1, day: 26, name: 'Maha Shivaratri', level: 'extreme' }],
    palani: [{ month: 0, day: 25, name: 'Thai Poosam', level: 'extreme' }],
    thiruvannamalai: [{ month: 10, day: 15, name: 'Karthigai Deepam', level: 'extreme' }]
  };

  var levelColors = { low: '#4CAF50', moderate: '#FFC107', high: '#FF9800', extreme: '#F44336' };
  var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function getLevel(year, month, day) {
    var temple = document.getElementById('crowdTemple').value;
    var date = new Date(year, month, day);
    var dow = date.getDay();

    // Check festivals
    var allFestivals = festivals2026.slice();
    if (templeSpecific[temple]) allFestivals = allFestivals.concat(templeSpecific[temple]);

    var festivalMatch = allFestivals.find(function (f) { return f.month === month && f.day === day; });
    if (festivalMatch) return { level: festivalMatch.level, reason: festivalMatch.name };

    // Pradosham (13th tithi ~ 13th & 28th of each month approximately)
    if (day === 13 || day === 28) return { level: 'high', reason: 'Pradosham day' };
    // Pournami (full moon ~ 15th)
    if (day === 15) return { level: 'high', reason: 'Pournami (Full Moon)' };
    // Amavasya (new moon ~ 30th/1st)
    if (day === 30 || day === 1) return { level: 'moderate', reason: 'Amavasya (New Moon)' };
    // Ekadashi (~11th and 26th)
    if (day === 11 || day === 26) return { level: 'high', reason: 'Ekadashi' };

    // Weekday factor
    if (dow === 6 || dow === 0) return { level: 'moderate', reason: 'Weekend' };
    return { level: 'low', reason: 'Regular weekday' };
  }

  function renderCalendar() {
    var calEl = document.getElementById('crowdCalendar');
    var labelEl = document.getElementById('crowdMonthLabel');
    labelEl.textContent = monthNames[viewMonth] + ' ' + viewYear;

    var firstDay = new Date(viewYear, viewMonth, 1).getDay();
    var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    var html = '<div class="crowd-grid"><div class="crowd-header-row">';
    dayNames.forEach(function (d) { html += '<div class="crowd-day-name">' + d + '</div>'; });
    html += '</div><div class="crowd-days">';

    // Empty cells
    for (var e = 0; e < firstDay; e++) html += '<div class="crowd-cell empty"></div>';

    for (var d = 1; d <= daysInMonth; d++) {
      var info = getLevel(viewYear, viewMonth, d);
      var isToday = (d === currentDate.getDate() && viewMonth === currentDate.getMonth() && viewYear === currentDate.getFullYear());
      html += '<div class="crowd-cell" style="background:' + levelColors[info.level] + '20;border-color:' + levelColors[info.level] + '"' +
        ' title="' + info.reason + '">' +
        '<span class="crowd-day-num' + (isToday ? ' today' : '') + '">' + d + '</span>' +
        '<span class="crowd-level-dot" style="background:' + levelColors[info.level] + '"></span>' +
        (info.reason !== 'Regular weekday' && info.reason !== 'Weekend' ? '<span class="crowd-reason">' + info.reason + '</span>' : '') +
      '</div>';
    }
    html += '</div></div>';
    calEl.innerHTML = html;
  }

  document.getElementById('crowdPrev').addEventListener('click', function () {
    viewMonth--;
    if (viewMonth < 0) { viewMonth = 11; viewYear--; }
    renderCalendar();
  });
  document.getElementById('crowdNext').addEventListener('click', function () {
    viewMonth++;
    if (viewMonth > 11) { viewMonth = 0; viewYear++; }
    renderCalendar();
  });
  document.getElementById('crowdTemple').addEventListener('change', renderCalendar);

  renderCalendar();
})();
