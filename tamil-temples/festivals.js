// ========================================
// Festival Calendar — Aggregates festival data from all temple sections
// ========================================
(function () {
  var calendarEl = document.getElementById('festivalCalendar');
  var filterEl = document.getElementById('festivalFilter');
  var searchEl = document.getElementById('festivalSearch');
  if (!calendarEl) return;

  // Tamil month festival data mapped to Gregorian months (approximate)
  var festivalData = [
    // January
    { month: 0, name: 'Pongal / Thai Pongal', desc: 'Harvest festival — special abhishekam at all temples. Surya Pongal dedicated to Sun God.', sections: ['navagraha', 'featured'], type: 'major' },
    { month: 0, name: 'Arudra Darshan', desc: 'Cosmic dance of Lord Nataraja at Chidambaram and all Shiva temples.', sections: ['panchabhootha', 'panchasabhai', 'sapthavidanga', 'pps'], type: 'major' },
    { month: 0, name: 'Vaikunta Ekadashi', desc: 'Opening of the Vaikunta Dwaram (Paradise Gate) at Divya Desam temples.', sections: ['dd', 'navatirupathi'], type: 'major' },

    // February
    { month: 1, name: 'Thai Poosam / Thaipusam', desc: 'Grand kavadi festival at all Murugan temples, especially Palani.', sections: ['murugan', 'sapthasthanam'], type: 'major' },
    { month: 1, name: 'Masi Magam', desc: 'Sacred bathing in temple tanks and rivers at all major temples.', sections: ['featured', 'kumbakonam'], type: 'major' },

    // March
    { month: 2, name: 'Maha Shivaratri', desc: 'Night-long worship of Lord Shiva at all Shiva temples across India.', sections: ['jyotirlinga', 'panchabhootha', 'pps', 'ashtaveerattanam', 'panchasabhai'], type: 'major' },
    { month: 2, name: 'Panguni Uthiram', desc: 'Divine wedding festival — celestial marriages celebrated at major temples.', sections: ['featured', 'murugan', 'dd'], type: 'major' },

    // April
    { month: 3, name: 'Tamil New Year (Puthandu)', desc: 'New Year celebrations with special darshan at all temples.', sections: ['featured', 'kumbakonam', 'kanchipuram'], type: 'major' },
    { month: 3, name: 'Chithirai Thiruvizha', desc: 'Meenakshi Thirukalyanam — grand 10-day festival at Madurai Meenakshi temple.', sections: ['featured', 'amman'], type: 'major' },
    { month: 3, name: 'Ram Navami', desc: 'Birthday of Lord Rama — celebrated at all Vishnu temples.', sections: ['dd', 'chardham'], type: 'festival' },

    // May
    { month: 4, name: 'Vaikasi Visakam', desc: 'Birthday of Lord Murugan — grand celebrations at all six Arupadaiveedu.', sections: ['murugan', 'sapthasthanam'], type: 'major' },
    { month: 4, name: 'Akshaya Tritiya', desc: 'Most auspicious day for new ventures — special darshan at all temples.', sections: ['featured', 'dd', 'vinayagar'], type: 'festival' },

    // June
    { month: 5, name: 'Aani Thirumanjanam', desc: 'Special abhishekam to Nataraja at Chidambaram and all Shiva temples.', sections: ['panchabhootha', 'panchasabhai'], type: 'festival' },

    // July
    { month: 6, name: 'Aadi Amavasai', desc: 'Ancestors worship day — special rituals at Rameswaram and sacred rivers.', sections: ['featured', 'chardham'], type: 'festival' },
    { month: 6, name: 'Aadi Pooram', desc: 'Andal Thiruvizha — grand festival for Goddess Andal at Srivilliputhur.', sections: ['dd', 'amman'], type: 'festival' },
    { month: 6, name: 'Aadi Perukku', desc: 'River festival celebrating Cauvery and other sacred rivers.', sections: ['kumbakonam', 'featured'], type: 'festival' },

    // August
    { month: 7, name: 'Vinayagar Chaturthi', desc: 'Birthday of Lord Ganesha — celebrated grandly at all Vinayagar temples.', sections: ['vinayagar', 'featured'], type: 'major' },
    { month: 7, name: 'Krishna Jayanthi', desc: 'Birthday of Lord Krishna — midnight celebrations at Vishnu temples.', sections: ['dd', 'chardham'], type: 'major' },
    { month: 7, name: 'Aavani Avittam', desc: 'Sacred thread ceremony — special rituals at all temples.', sections: ['featured', 'kumbakonam'], type: 'festival' },

    // September
    { month: 8, name: 'Navaratri Begins', desc: '9 nights of Devi worship — Golu dolls, Saraswati Pooja at Amman and Shakti temples.', sections: ['amman', 'shaktipeethas', 'kanchipuram'], type: 'major' },
    { month: 8, name: 'Vijayadashami', desc: '10th day victory festival — Vidyarambham (start of learning) for children.', sections: ['amman', 'shaktipeethas', 'vinayagar'], type: 'major' },

    // October
    { month: 9, name: 'Skanda Sashti', desc: '6-day war re-enactment — Soorasamharam at all Murugan temples.', sections: ['murugan', 'sapthasthanam'], type: 'major' },
    { month: 9, name: 'Deepavali', desc: 'Festival of lights — special darshan and abhishekam at all temples.', sections: ['featured', 'vinayagar', 'amman'], type: 'major' },
    { month: 9, name: 'Annabhishekam', desc: 'Cooked rice abhishekam to Shiva Lingam at all Shiva temples.', sections: ['jyotirlinga', 'panchabhootha', 'pps'], type: 'festival' },

    // November
    { month: 10, name: 'Karthigai Deepam', desc: 'Massive flame lit on Arunachala hill. Lamp festival at all Shiva temples.', sections: ['panchabhootha', 'jyotirlinga', 'featured'], type: 'major' },
    { month: 10, name: 'Sani Peyarchi', desc: 'Saturn transit — thousands flock to Thirunallar Sani temple.', sections: ['navagraha'], type: 'festival' },

    // December
    { month: 11, name: 'Margazhi Season', desc: 'Holiest month — Thiruppavai/Thiruvenbaavai recitals, early morning worship at all temples.', sections: ['dd', 'pps', 'featured'], type: 'major' },
    { month: 11, name: 'Thiruvaadhirai', desc: 'Arudra Darshan — Nataraja\'s cosmic dance celebrated at Chidambaram.', sections: ['panchasabhai', 'panchabhootha', 'sapthavidanga'], type: 'major' },
    { month: 11, name: 'Mahamaham (every 12 years)', desc: 'Kumbakonam Mahamaham tank sacred bath — next: 2028.', sections: ['kumbakonam'], type: 'special' }
  ];

  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Build section filter dropdown
  if (filterEl) {
    var allTypes = Object.keys(window.sectionMeta || {});
    filterEl.innerHTML = '<option value="">All Sections</option>';
    allTypes.forEach(function (type) {
      var title = (window.sectionMeta[type] || {}).title || type;
      filterEl.innerHTML += '<option value="' + type + '">' + title + '</option>';
    });
  }

  function render(filter, search) {
    var filtered = festivalData;
    if (filter) {
      filtered = filtered.filter(function (f) { return f.sections.indexOf(filter) !== -1; });
    }
    if (search) {
      var q = search.toLowerCase();
      filtered = filtered.filter(function (f) {
        return f.name.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q);
      });
    }

    // Group by month
    var grouped = {};
    filtered.forEach(function (f) {
      if (!grouped[f.month]) grouped[f.month] = [];
      grouped[f.month].push(f);
    });

    var currentMonth = new Date().getMonth();
    var html = '';
    // Start from current month
    for (var i = 0; i < 12; i++) {
      var m = (currentMonth + i) % 12;
      if (!grouped[m]) continue;
      html += '<div class="festival-month">';
      html += '<h3 class="festival-month-title">' + monthNames[m] + '</h3>';
      html += '<div class="festival-list">';
      grouped[m].forEach(function (f) {
        var typeClass = f.type === 'major' ? 'festival-major' : (f.type === 'special' ? 'festival-special' : '');
        var sectionTags = f.sections.map(function (s) {
          var title = (window.sectionMeta[s] || {}).title || s;
          return '<span class="festival-tag">' + title + '</span>';
        }).join('');
        html += '<div class="festival-item ' + typeClass + '">' +
          '<div class="festival-name">' + f.name + '</div>' +
          '<div class="festival-desc">' + f.desc + '</div>' +
          '<div class="festival-tags">' + sectionTags + '</div>' +
        '</div>';
      });
      html += '</div></div>';
    }

    calendarEl.innerHTML = html || '<p class="no-data">No festivals found for the selected filter.</p>';
  }

  if (filterEl) filterEl.addEventListener('change', function () { render(filterEl.value, searchEl ? searchEl.value : ''); });
  if (searchEl) searchEl.addEventListener('input', function () { render(filterEl ? filterEl.value : '', searchEl.value); });

  render('', '');
})();
