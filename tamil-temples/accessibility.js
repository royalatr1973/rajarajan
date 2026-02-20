// ========================================
// Accessibility & Elderly-Friendly Info
// Shows wheelchair access, step count, ramps, special queues
// ========================================
(function () {
  // Works on detail page
  var params = new URLSearchParams(window.location.search);
  var type = params.get('type');
  var id = params.get('id');
  if (!type || !id) return;

  var data = window.getSectionData ? window.getSectionData(type) : [];
  var temple = data.find(function (t) { return String(t.id) === String(id); });
  if (!temple) return;

  var raw = temple.raw || {};
  var name = (temple.name || '').toLowerCase();
  var location = (temple.location || '').toLowerCase();

  // Accessibility database for known temples
  var accessDB = {
    'srirangam':      { wheelchair: 'partial', steps: '~50 steps in inner prakarams', ramp: 'Available at main entrance', queue: 'Senior citizen queue available', ropeway: null, tip: 'Electric vehicles available for outer prakarams. Inner sanctum has steps.' },
    'rameswaram':     { wheelchair: 'partial', steps: '~20 steps to main corridor', ramp: 'Ramp at east entrance', queue: 'Senior citizen counter available', ropeway: null, tip: 'Corridor is very long (197m). Wheelchair can navigate outer corridor.' },
    'palani':         { wheelchair: 'yes', steps: '697 steps via footpath', ramp: 'Winch (funicular railway) available', queue: 'Senior citizen priority', ropeway: 'Winch railway & rope car to hilltop (Rs. 25-75)', tip: 'Winch is comfortable for elderly. Avoid peak festival days.' },
    'tirumala':       { wheelchair: 'partial', steps: '~3550 steps via footpath from Alipiri', ramp: 'Ramps at key points on hilltop', queue: 'Senior/disabled darshan available', ropeway: 'Bus service (free & paid). No ropeway yet.', tip: 'Apply for special darshan for wheelchair users via TTD website.' },
    'madurai':        { wheelchair: 'partial', steps: '~30 steps total', ramp: 'Ramp at south entrance', queue: 'Senior citizen queue at main sanctum', ropeway: null, tip: 'Meenakshi temple is mostly flat. Inner sanctum has a few steps.' },
    'chidambaram':    { wheelchair: 'partial', steps: '~15 steps to sanctum', ramp: 'No ramp to inner sanctum', queue: 'No special queue', ropeway: null, tip: 'Outer prakarams are wheelchair-friendly. Inner sanctum requires steps.' },
    'tiruvannamalai': { wheelchair: 'partial', steps: '~20 steps to sanctum', ramp: 'Ramp at main entrance', queue: 'Senior queue during festivals', ropeway: null, tip: 'Girivalam path (14 km) is flat road. Temple sanctum has some steps.' },
    'thanjavur':      { wheelchair: 'yes', steps: '~10 steps, gradual', ramp: 'Ramp available', queue: 'Low crowd, manageable', ropeway: null, tip: 'Big Temple (Brihadeeswara) is very accessible. Flat open campus.' },
    'thiruthani':     { wheelchair: 'partial', steps: '365 steps to hilltop', ramp: 'No ramp to hilltop', queue: 'Senior priority at top', ropeway: 'Bus road to hilltop available', tip: 'Take the bus road to avoid steps. Parking available at hilltop.' },
    'sabarimala':     { wheelchair: 'no', steps: '18 holy steps + 5 km trek', ramp: 'No ramp', queue: 'No special queue', ropeway: 'No ropeway. Trek only.', tip: 'Not recommended for wheelchair users or elderly with mobility issues. Trek is steep.' },
    'varanasi':       { wheelchair: 'partial', steps: 'Ghats have many steps', ramp: 'Ramp at new Kashi Vishwanath corridor', queue: 'Special darshan for disabled', ropeway: null, tip: 'New corridor has good accessibility. Ghats remain challenging.' },
    'somnath':        { wheelchair: 'yes', steps: '~10 steps', ramp: 'Ramp at main entrance', queue: 'Senior citizen priority', ropeway: null, tip: 'Temple is well-maintained and mostly accessible. Light & sound show area is flat.' },
    'badrinath':      { wheelchair: 'partial', steps: '~30 steps', ramp: 'Limited ramps', queue: 'VIP darshan for elderly', ropeway: null, tip: 'Challenging terrain. Helicopter from Dehradun recommended for elderly.' }
  };

  var accessInfo = null;
  var searchTerms = [name, location];
  for (var key in accessDB) {
    for (var i = 0; i < searchTerms.length; i++) {
      if (searchTerms[i].indexOf(key) !== -1) {
        accessInfo = accessDB[key];
        break;
      }
    }
    if (accessInfo) break;
  }

  // Default info for temples without specific data
  if (!accessInfo) {
    accessInfo = {
      wheelchair: 'unknown',
      steps: 'Varies — most temples have some steps',
      ramp: 'Check locally',
      queue: 'Senior citizen priority available at major temples',
      ropeway: null,
      tip: 'Contact temple office in advance for accessibility arrangements.'
    };
  }

  var insertAfter = document.querySelector('.emergency-card') || document.querySelector('.photo-gallery-card') || document.querySelector('.detail-card');
  if (!insertAfter) return;

  var wheelchairIcon = { yes: '✅', partial: '⚠️', no: '❌', unknown: '❓' };
  var wheelchairLabel = { yes: 'Wheelchair Accessible', partial: 'Partially Accessible', no: 'Not Accessible', unknown: 'Check Locally' };

  var section = document.createElement('article');
  section.className = 'accessibility-card';
  section.innerHTML =
    '<h3>Accessibility & Elderly Info</h3>' +
    '<div class="access-grid">' +
      '<div class="access-item">' +
        '<span class="access-icon">' + (wheelchairIcon[accessInfo.wheelchair] || '❓') + '</span>' +
        '<div><strong>Wheelchair</strong><p>' + (wheelchairLabel[accessInfo.wheelchair] || 'Unknown') + '</p></div>' +
      '</div>' +
      '<div class="access-item">' +
        '<span class="access-icon">🪜</span>' +
        '<div><strong>Steps</strong><p>' + accessInfo.steps + '</p></div>' +
      '</div>' +
      '<div class="access-item">' +
        '<span class="access-icon">♿</span>' +
        '<div><strong>Ramp</strong><p>' + accessInfo.ramp + '</p></div>' +
      '</div>' +
      '<div class="access-item">' +
        '<span class="access-icon">👴</span>' +
        '<div><strong>Senior Queue</strong><p>' + accessInfo.queue + '</p></div>' +
      '</div>' +
      (accessInfo.ropeway ? '<div class="access-item"><span class="access-icon">🚡</span><div><strong>Ropeway/Transport</strong><p>' + accessInfo.ropeway + '</p></div></div>' : '') +
    '</div>' +
    '<p class="access-tip">' + accessInfo.tip + '</p>';

  insertAfter.parentNode.insertBefore(section, insertAfter.nextSibling);

  // Also add accessibility badges on section page temple cards
  if (document.body.dataset.sectionType) {
    var listEl = document.getElementById('templeList');
    if (!listEl) return;
    var obs = new MutationObserver(function () {
      if (listEl.querySelector('.temple-card')) {
        obs.disconnect();
        addAccessBadges();
      }
    });
    obs.observe(listEl, { childList: true });
    if (listEl.querySelector('.temple-card')) addAccessBadges();
  }

  function addAccessBadges() {
    var cards = document.querySelectorAll('.temple-card');
    cards.forEach(function (card) {
      var link = card.querySelector('a');
      if (!link) return;
      var href = link.getAttribute('href') || '';
      var idMatch = href.match(/id=([^&]+)/);
      if (!idMatch) return;
      var tid = decodeURIComponent(idMatch[1]);
      var t = data.find(function (x) { return String(x.id) === String(tid); });
      if (!t) return;

      var tName = (t.name || '').toLowerCase();
      var tLoc = (t.location || '').toLowerCase();
      for (var key in accessDB) {
        if (tName.indexOf(key) !== -1 || tLoc.indexOf(key) !== -1) {
          var info = accessDB[key];
          var badge = document.createElement('span');
          badge.className = 'access-badge access-badge-' + info.wheelchair;
          badge.title = wheelchairLabel[info.wheelchair];
          badge.textContent = wheelchairIcon[info.wheelchair] + ' ' + wheelchairLabel[info.wheelchair];
          var content = card.querySelector('.content');
          if (content) content.appendChild(badge);
          break;
        }
      }
    });
  }
})();
