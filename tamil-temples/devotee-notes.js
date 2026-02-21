/* Community Devotee Notes & Tips — renders on temple detail page */
(function () {
  // Curated tips per temple (keyed by temple name substring for flexible matching)
  var tips = {
    'Brihadeeswarar': [
      { tip: 'Best visited during early morning (6 AM) to avoid tourist crowds. The sunlight through the east gopuram is magnificent.', author: 'Devotee', category: 'timing' },
      { tip: 'Don\'t miss the shadow of the vimana — at noon, the 216-ft tower casts no shadow on the ground (architectural marvel).', author: 'Guide', category: 'hidden-gem' },
      { tip: 'The Nandi mandapam has a separate entrance. Many visitors miss this — walk around the main temple to find it.', author: 'Regular Visitor', category: 'hidden-gem' }
    ],
    'Meenakshi': [
      { tip: 'Skip the regular queue — buy the special darshan ticket (Rs. 50-100) for much faster access, especially on weekends.', author: 'Frequent Visitor', category: 'timing' },
      { tip: 'The musical pillars in the Aayirakaal Mandapam produce different notes. Ask the guide to demonstrate — truly magical.', author: 'Devotee', category: 'hidden-gem' },
      { tip: 'Amma Mess and Murugan Idli Shop near the East Tower serve excellent traditional Madurai food.', author: 'Food Lover', category: 'food' },
      { tip: 'Night ceremony (Ekantha Seva) at 9 PM — Lord Sundareswarar is taken to Meenakshi\'s chamber. Most tourists miss this beautiful ritual.', author: 'Scholar', category: 'timing' }
    ],
    'Ranganathaswamy': [
      { tip: 'Start from the 7th prakaram (outermost) and walk inward. Each layer reveals more beauty. Give yourself 3-4 hours minimum.', author: 'Temple Expert', category: 'timing' },
      { tip: 'The rooftop near the Rajagopuram offers a panoramic view of all 7 prakarams. Ask at the office — they sometimes allow access.', author: 'Photographer', category: 'hidden-gem' },
      { tip: 'Vaikunta Ekadasi (Dec/Jan) — arrive 2 days early. The Paramapada Vasal (Gate of Heaven) opens only for this festival.', author: 'Annual Visitor', category: 'timing' }
    ],
    'Ramanathaswamy': [
      { tip: 'Bathe in all 22 theerthams before darshan. Start early (5 AM). Each well has unique mineral properties. Takes about 2 hours.', author: 'Pilgrim', category: 'ritual' },
      { tip: 'The longest corridor walk is spectacular in early morning light. Best photos at sunrise.', author: 'Photographer', category: 'hidden-gem' },
      { tip: 'Agni Theertham beach next to the temple is perfect for the ritual dip before temple entry.', author: 'Regular Pilgrim', category: 'ritual' }
    ],
    'Nataraja': [
      { tip: 'The Chidambara Rahasyam — when the curtain is drawn, observe the empty space with golden bilva leaves. This IS the deity — the formless divine.', author: 'Scholar', category: 'hidden-gem' },
      { tip: 'Visit during Natyanjali festival (Feb) for classical dance performances in front of Nataraja.', author: 'Art Lover', category: 'timing' }
    ],
    'Arunachaleswarar': [
      { tip: 'Full Moon Girivalam (14 km walk around Arunachala hill) is a life-changing experience. Start at 6 PM, finish by midnight.', author: 'Devotee', category: 'ritual' },
      { tip: 'Visit Ramana Maharshi Ashram (free entry) on the hill slope. Morning meditation sessions are open to all.', author: 'Spiritual Seeker', category: 'hidden-gem' },
      { tip: 'Karthigai Deepam (Nov/Dec) — the massive flame atop the hill is visible for 30+ km. Arrive 3 days early.', author: 'Annual Visitor', category: 'timing' }
    ],
    'Palani': [
      { tip: 'Use the winch (rope car) for Rs. 25 — saves a steep 600-step climb. Available 6 AM to 8 PM.', author: 'Family Visitor', category: 'practical' },
      { tip: 'Buy Panchamirtham (divine prasadam) at the counter — it\'s unique to Palani and cannot be found elsewhere.', author: 'Devotee', category: 'food' }
    ],
    'Thirunallar': [
      { tip: 'Saturdays are extremely crowded (Saturn temple). Visit on Thursday or Friday for peaceful darshan.', author: 'Regular Visitor', category: 'timing' },
      { tip: 'Bathe in Nala Theertham before entering the temple — the ritual is important for Saturn relief.', author: 'Astrologer', category: 'ritual' }
    ],
    'Suryanar': [
      { tip: 'Visit all 9 Navagraha temples in a single day — they\'re within 30 km radius. Start here at Suryanar at sunrise.', author: 'Circuit Pilgrim', category: 'practical' }
    ],
    'Kapaleeshwarar': [
      { tip: 'The Mylapore tank (Kapali Theertham) festival procession is best watched from the tea shops on Tank Street.', author: 'Local', category: 'hidden-gem' }
    ]
  };

  var categoryIcons = {
    'timing': '&#9200;',
    'hidden-gem': '&#128142;',
    'food': '&#127858;',
    'ritual': '&#128591;',
    'practical': '&#128161;',
    'default': '&#128172;'
  };

  function init() {
    var titleEl = document.getElementById('templeTitle');
    if (!titleEl || !titleEl.textContent || titleEl.textContent === 'Temple') return;

    var templeName = titleEl.textContent;
    var matchedTips = [];

    Object.keys(tips).forEach(function (key) {
      if (templeName.toLowerCase().includes(key.toLowerCase())) {
        matchedTips = matchedTips.concat(tips[key]);
      }
    });

    if (!matchedTips.length) return;

    var detailSection = document.querySelector('.detail');
    if (!detailSection) return;

    var card = document.createElement('article');
    card.className = 'devotee-notes-card';
    card.innerHTML =
      '<h3>Devotee Tips & Notes</h3>' +
      '<p style="font-size:13px;color:var(--muted);margin-bottom:12px">Practical tips from fellow devotees and regular visitors.</p>' +
      '<div class="devotee-notes-list">' +
      matchedTips.map(function (t) {
        var icon = categoryIcons[t.category] || categoryIcons['default'];
        return '<div class="devotee-note">' +
          '<span class="devotee-icon">' + icon + '</span>' +
          '<div>' +
            '<p class="devotee-tip-text">' + t.tip + '</p>' +
            '<span class="devotee-author">— ' + t.author + '</span>' +
          '</div>' +
        '</div>';
      }).join('') +
      '</div>';

    detailSection.appendChild(card);
  }

  // Wait for detail.js to populate
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 150); });
  } else {
    setTimeout(init, 150);
  }
})();
