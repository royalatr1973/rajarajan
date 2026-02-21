/* Temple Architecture Explorer */
(function () {
  var styles = {
    dravidian: {
      name: 'Dravidian (South Indian)',
      desc: 'Predominant in Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh. Characterized by pyramid-shaped towers (Gopurams) over gateways, flat-roofed mandapams, and elaborate sculptural decoration.',
      examples: 'Meenakshi Amman (Madurai), Brihadeeswarar (Thanjavur), Ranganathaswamy (Srirangam)',
      elements: [
        { name: 'Gopuram', tamil: 'Gopuram', purpose: 'Monumental gateway tower at temple entrances', symbolism: 'Represents the feet of God — the tallest structure visible from afar, inviting devotees. The gateway symbolizes the transition from the mundane to the sacred.', position: 'Entrance gates (usually 4 directional)', details: 'Dravidian gopurams are pyramidal with multiple tiers (tala). Each tier has miniature shrines. The tallest gopurams exceed 200 feet. Srirangam has the tallest at 236 ft.' },
        { name: 'Vimana', tamil: 'Vimanam', purpose: 'Tower directly above the sanctum (Garbhagriha)', symbolism: 'Represents Mount Meru, the cosmic axis. It is the crown of the deity and symbolizes the heavenly abode.', position: 'Directly above the main deity', details: 'In Dravidian style, the Vimana is shorter than the Gopuram, unlike Nagara style. Brihadeeswarar Vimana is 216 ft with an 80-ton capstone.' },
        { name: 'Garbhagriha', tamil: 'Karuvarai', purpose: 'The innermost sanctum housing the main deity', symbolism: 'Represents the cosmic womb (Hiranyagarbha). The dark chamber symbolizes the formless divine from which creation emerges.', position: 'Center/core of the temple', details: 'A small, dark, square chamber. Only priests enter. The deity faces east (usually). No windows — illuminated only by oil lamps.' },
        { name: 'Mandapa', tamil: 'Mandapam', purpose: 'Pillared hall for congregation, rituals, and music', symbolism: 'The gathering space where devotees assemble represents the community\'s connection to the divine.', position: 'Between Gopuram and Garbhagriha', details: 'Types: Mukha Mandapa (front), Maha Mandapa (great hall), Kalyana Mandapa (wedding), Nrithya Mandapa (dance). Famous: 1000-pillar halls.' },
        { name: 'Dwajasthambam', tamil: 'Kodimaram', purpose: 'Flagstaff pillar in front of the sanctum', symbolism: 'The vertical axis connecting Earth and Heaven. The flag (Dwaja) represents the deity\'s emblem — Nandi for Shiva, Garuda for Vishnu.', position: 'Directly in front of the Garbhagriha, on axis', details: 'Usually made of wood covered with gold/copper. Temple festivals begin by hoisting the flag (Kodiyettram) on this staff.' },
        { name: 'Nandi / Vahana', tamil: 'Nandi / Vahanam', purpose: 'Mount/vehicle of the deity, placed facing the sanctum', symbolism: 'Nandi (bull) represents dharma, devotion, and meditation. Garuda (eagle) represents speed and Vedic knowledge.', position: 'Between Dwajasthambam and Garbhagriha', details: 'Usually carved from single stone. Thanjavur Nandi weighs 25 tons. Always faces the deity.' },
        { name: 'Prakaram', tamil: 'Pirakaram', purpose: 'Concentric enclosure walls with corridors', symbolism: 'Each wall represents a layer of creation. Moving inward = moving from outer world to inner divinity.', position: 'Concentric rectangles around Garbhagriha', details: 'Srirangam has 7 prakarams (the most of any temple). Each prakaram has its own gopuram entrance.' },
        { name: 'Temple Tank', tamil: 'Kulam / Theertham', purpose: 'Sacred water body for ritual bathing', symbolism: 'Represents the primordial waters of creation. Bathing purifies the devotee before worship.', position: 'Usually within or adjacent to the temple complex', details: 'Called Kalyani, Pushkarini, or Theertham. Some have curative properties. Rameswaram has 22 theerthams.' },
        { name: 'Bali Peetham', tamil: 'Pali Peedam', purpose: 'Sacrificial altar/platform', symbolism: 'Represents the surrender of ego. Originally for offerings, now for placing flowers and coconuts.', position: 'In front of Nandi/Vahana, on the central axis', details: 'A small stone platform. Part of the Panchaprakara (5 essential elements on the temple axis).' }
      ]
    },
    nagara: {
      name: 'Nagara (North Indian)',
      desc: 'Predominant in North India, from Gujarat to Bengal. Characterized by curvilinear Shikhara towers above the sanctum, no boundary walls, and beehive-shaped superstructures.',
      examples: 'Kandariya Mahadeva (Khajuraho), Lingaraja (Bhubaneswar), Kedarnath, Somnath',
      elements: [
        { name: 'Shikhara', tamil: 'Sikaram', purpose: 'Curvilinear tower above the sanctum', symbolism: 'Represents Mount Meru. The upward curve symbolizes the soul\'s ascent to liberation.', position: 'Above the Garbhagriha', details: 'In Nagara style, the Shikhara is the tallest structure (unlike Dravidian where Gopuram is taller). Types: Latina (single curve), Phamsana (stepped), Valabhi (barrel-roof).' },
        { name: 'Garbhagriha', tamil: 'Karuvarai', purpose: 'Innermost sanctum housing the main deity', symbolism: 'Same as Dravidian — the cosmic womb of creation.', position: 'Center of the temple', details: 'Often has an ambulatory path (Pradakshinapatha) around it for circumambulation.' },
        { name: 'Mandapa', tamil: 'Mandapam', purpose: 'Assembly hall in front of the sanctum', symbolism: 'Space for community gathering and ritual performance.', position: 'Before the Garbhagriha', details: 'Nagara temples often have multiple mandapas — Ardha Mandapa (half hall), Mukha Mandapa (entrance hall), and Maha Mandapa (great hall).' },
        { name: 'Amalaka', tamil: 'Amalakam', purpose: 'Ribbed disc-like stone atop the Shikhara', symbolism: 'Represents the Sun, the lotus, or the cycle of creation. It is the crown jewel of the tower.', position: 'Topmost part of the Shikhara', details: 'Made from a single stone, notched like an amla (gooseberry) fruit — hence the name. Supports the Kalasha finial.' },
        { name: 'Kalasha', tamil: 'Kalasam', purpose: 'Metal pot/finial at the very top', symbolism: 'Represents fullness, abundance, and the summit of spiritual achievement.', position: 'Above the Amalaka', details: 'Usually gold or copper. Contains sacred grains and gems. Replacement ceremony (Kumbhabhishekam) is a major event.' },
        { name: 'Jagati', tamil: 'Athishtanam', purpose: 'Raised platform/plinth on which the temple stands', symbolism: 'Elevates the temple above the earthly plane, creating a sacred space.', position: 'Base of the entire temple', details: 'In Nagara style, temples are often raised on high platforms (pitha). Khajuraho temples stand on platforms 3-4 meters high.' }
      ]
    },
    vesara: {
      name: 'Vesara (Hybrid/Deccan)',
      desc: 'A hybrid style combining Dravidian and Nagara elements, found primarily in Karnataka and parts of Andhra Pradesh. Developed by Chalukya, Hoysala, and Rashtrakuta dynasties.',
      examples: 'Hoysaleswara (Halebidu), Chennakeshava (Belur), Virupaksha (Pattadakal)',
      elements: [
        { name: 'Stellate Plan', tamil: 'Natchathira Vadivu', purpose: 'Star-shaped or polygonal ground plan', symbolism: 'Represents cosmic geometry and divine perfection. The star shape allows maximum sculptural surface.', position: 'Ground plan of the entire temple', details: 'Hoysala temples are famous for their star-shaped platforms. Each point creates a niche for sculpture, maximizing the narrative surface.' },
        { name: 'Lathe-turned Pillars', tamil: 'Kadasarai Thoon', purpose: 'Intricately carved pillars resembling lathe-turned wood', symbolism: 'Demonstrates mastery over stone — making stone flow like turned wood.', position: 'Interior mandapas', details: 'Hoysala artisans carved soapstone (chloritic schite) into incredibly detailed pillars. The Belur Chennakeshava temple has the finest examples.' },
        { name: 'Frieze Bands', tamil: 'Suraiveli Pattai', purpose: 'Horizontal sculptural bands running around the temple base', symbolism: 'Each band tells stories from the epics, representing layers of the cosmos.', position: 'Exterior walls, from base to top', details: 'Usually 6-8 bands: elephants (stability), horses (speed), floral scrolls (life), Puranic scenes, Yalis (power), Hamsas (wisdom), Makaras (water).' },
        { name: 'Vimana (Low Profile)', tamil: 'Vimanam', purpose: 'Tower above sanctum — shorter and more ornate than Dravidian/Nagara', symbolism: 'Same cosmic axis symbolism but emphasizes width and detail over height.', position: 'Above the Garbhagriha', details: 'Vesara vimanas blend the stepped Dravidian approach with the curved Nagara shikhara, creating a unique transitional form.' },
        { name: 'Sukhanasi', tamil: 'Sukanasi', purpose: 'Projecting tower/nose over the vestibule connecting mandapa to sanctum', symbolism: 'A bridge between the outer world (mandapa) and inner sanctum, marking the transition space.', position: 'Between mandapa and garbhagriha', details: 'Unique to Vesara style. Acts as an architectural transition. Often has a miniature tower that echoes the main vimana.' },
        { name: 'Madanikas', tamil: 'Madanikaikal', purpose: 'Bracket figures of celestial women on pillars', symbolism: 'Represent apsaras (celestial dancers) welcoming devotees. Celebrate the beauty of divine creation.', position: 'Pillar brackets in mandapas', details: 'Belur temple has 42 Madanika figures, each in a unique pose — playing instruments, dancing, looking in mirrors, killing snakes. No two are alike.' }
      ]
    }
  };

  var currentStyle = 'dravidian';

  function render() {
    var style = styles[currentStyle];
    var diagramEl = document.getElementById('archDiagram');
    var elementsEl = document.getElementById('archElements');
    var detailEl = document.getElementById('archDetail');
    detailEl.style.display = 'none';

    diagramEl.innerHTML =
      '<div class="arch-info-card">' +
        '<h2>' + style.name + '</h2>' +
        '<p>' + style.desc + '</p>' +
        '<p style="font-size:13px;color:var(--muted);margin-top:6px"><strong>Examples:</strong> ' + style.examples + '</p>' +
      '</div>';

    elementsEl.innerHTML = style.elements.map(function (el, i) {
      return '<article class="temple-card arch-element-card" data-idx="' + i + '">' +
        '<div class="content" style="padding:16px;cursor:pointer">' +
          '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">' +
            '<span class="arch-num">' + (i + 1) + '</span>' +
            '<div><h3 style="margin:0">' + el.name + '</h3><span style="font-size:12px;color:var(--muted)">' + el.tamil + '</span></div>' +
          '</div>' +
          '<p style="font-size:13px;color:var(--muted);margin:0">' + el.purpose + '</p>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  // Style selector
  document.querySelector('.arch-style-selector').addEventListener('click', function (e) {
    var btn = e.target.closest('.dd-route-sel-btn');
    if (!btn) return;
    document.querySelectorAll('.arch-style-selector .dd-route-sel-btn').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    currentStyle = btn.dataset.style;
    render();
  });

  // Element click
  document.getElementById('archElements').addEventListener('click', function (e) {
    var card = e.target.closest('.arch-element-card');
    if (!card) return;
    var idx = parseInt(card.dataset.idx);
    var el = styles[currentStyle].elements[idx];
    var detailEl = document.getElementById('archDetail');

    detailEl.innerHTML =
      '<div class="arch-detail-content">' +
        '<div style="display:flex;justify-content:space-between;align-items:start">' +
          '<h2>' + el.name + ' <span style="font-weight:400;color:var(--muted);font-size:0.7em">(' + el.tamil + ')</span></h2>' +
          '<button onclick="document.getElementById(\'archDetail\').style.display=\'none\'" class="trip-btn">Close</button>' +
        '</div>' +
        '<div class="detail-grid" style="margin-top:12px">' +
          '<div><strong>Purpose</strong>' + el.purpose + '</div>' +
          '<div><strong>Position</strong>' + el.position + '</div>' +
        '</div>' +
        '<div style="margin-top:14px"><strong style="color:var(--saffron);font-size:13px;display:block">Symbolism</strong><p style="margin:4px 0;line-height:1.7">' + el.symbolism + '</p></div>' +
        '<div style="margin-top:14px"><strong style="color:var(--saffron);font-size:13px;display:block">Details</strong><p style="margin:4px 0;line-height:1.7;color:var(--muted)">' + el.details + '</p></div>' +
      '</div>';
    detailEl.style.display = '';
    detailEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  render();
})();
