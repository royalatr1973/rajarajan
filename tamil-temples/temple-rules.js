// ========================================
// Temple Rules & Dress Code Guide
// Per-section etiquette, dress code, photography rules
// ========================================
(function () {
  // Works on both section pages and detail page
  var sectionType = document.body.dataset.sectionType;
  var params = new URLSearchParams(window.location.search);
  var type = sectionType || params.get('type');
  if (!type) return;

  var rules = {
    dd: {
      title: 'Divya Desam Visiting Guide',
      dress: 'Men: Dhoti/veshti with upper cloth or formal trousers with shirt. Women: Saree, half-saree, or salwar kameez. Avoid shorts, sleeveless tops.',
      etiquette: [
        'Remove footwear before entering temple premises',
        'Vaishnava temples — Thirumann (white U mark) is traditional but not mandatory for visitors',
        'Walk clockwise (pradakshina) around the sanctum',
        'Accept theertham (holy water) with right hand',
        'Reciting Divya Prabandham pasurams is encouraged'
      ],
      photography: 'Photography prohibited inside sanctum sanctorum. Allowed in outer corridors and gopurams at most temples.',
      offerings: 'Tulasi garlands, butter, curd rice, and fruits are traditional Vaishnavite offerings.'
    },
    pps: {
      title: 'Paadal Petra Sthalams Visiting Guide',
      dress: 'Men: Dhoti preferred for abhishekam. Regular modest clothing otherwise. Women: Saree or churidar. Avoid western wear inside.',
      etiquette: [
        'Remove footwear at the temple entrance',
        'Vibhuti (sacred ash) is the traditional Shaivite mark',
        'Walk clockwise around the Shiva lingam',
        'Do not touch the lingam without permission from priest',
        'Singing Thevaram pathigams is the traditional practice'
      ],
      photography: 'No photography inside the main shrine. Most temples allow photos in the outer prakaram.',
      offerings: 'Bilva leaves, flowers, milk, honey, and vibhuti are traditional Shiva offerings.'
    },
    jyotirlinga: {
      title: 'Jyotirlinga Temple Visiting Guide',
      dress: 'Men: Traditional dhoti/veshti for abhishekam (mandatory at most Jyotirlingas). Regular modest clothing for darshan. Women: Traditional Indian wear.',
      etiquette: [
        'Strict dress code for abhishekam — dhoti only, no shirt',
        'Each Jyotirlinga has specific rituals — inquire at the temple office',
        'Queue times can be 2-6 hours during peak season',
        'VIP darshan tickets available at some temples',
        'Carry ID proof — required at Somnath and Mahakaleshwar'
      ],
      photography: 'Strictly prohibited inside all Jyotirlinga sanctums. Heavy fines for violations at some temples.',
      offerings: 'Milk, bel patra, and flowers. Bhasma aarti at Mahakaleshwar requires advance booking.'
    },
    murugan: {
      title: 'Murugan Temple Visiting Guide',
      dress: 'Men: Dhoti or modest clothing. Kavadi bearers follow specific dress requirements. Women: Saree or churidar.',
      etiquette: [
        'Hilltop temples (Palani, Thiruthani) — wear comfortable walking footwear to the base',
        'Tonsuring (head shaving) is common at Murugan temples',
        'Kavadi carrying during Thai Poosam has strict fasting rules',
        'Panchamirtham prasadam at Palani is famous — collect after darshan',
        'Vel abhishekam is the signature ritual'
      ],
      photography: 'Generally not allowed inside sanctum. Palani hilltop allows photos in outer areas.',
      offerings: 'Vel (lance), peacock feathers, fruits, and sweet pongal.'
    },
    amman: {
      title: 'Amman Temple Visiting Guide',
      dress: 'Men: Modest clothing. Women: Saree or churidar, red/yellow colors considered auspicious.',
      etiquette: [
        'Friday and Tuesday are auspicious days for Amman temples',
        'Kumkum archana is the signature Shakti temple ritual',
        'Breaking coconuts at the entrance is a common practice',
        'Do not point feet toward the deity',
        'Navaratri (9 nights) is the most important festival season'
      ],
      photography: 'Varies by temple. Usually allowed in outer areas. Ask permission.',
      offerings: 'Kumkum, turmeric, lemons, coconuts, sarees, and bangles.'
    },
    vinayagar: {
      title: 'Vinayagar Temple Visiting Guide',
      dress: 'Modest Indian or western clothing acceptable. No strict dress code at most Vinayagar temples.',
      etiquette: [
        'Vinayagar is worshipped first before any other deity',
        'Knock both sides of the head gently with knuckles (thoppukaranam)',
        'Circumambulate 3 times clockwise',
        'Chaturthi (4th day of each lunar fortnight) is special puja day',
        'Arugampul (bermuda grass) garlands are traditional'
      ],
      photography: 'Generally more relaxed than other temples. Ask locally.',
      offerings: 'Modak/kozhukattai, arugampul, coconut, and fruits (especially bananas).'
    },
    navagraha: {
      title: 'Navagraha Temple Visiting Guide',
      dress: 'Modest clothing. Some devotees wear specific colors matching the planet being worshipped.',
      etiquette: [
        'Each planet has a specific day — visiting on that day is most auspicious',
        'Oil lamps with specific oils are offered to each planet',
        'Complete all 9 temples in one day for full circuit benefit',
        'Surya (Sun): Sunday, Chandra (Moon): Monday, etc.',
        'Sesame oil lamps for Sani (Saturn) at Thirunallar'
      ],
      photography: 'Allowed in most Navagraha temples outside the sanctum.',
      offerings: 'Oil lamps, specific grains for each planet, flowers. Black sesame for Sani.'
    },
    panchabhootha: {
      title: 'Pancha Bhootha Sthalams Visiting Guide',
      dress: 'Men: Dhoti for special poojas. Regular modest clothing for darshan. Women: Traditional wear preferred.',
      etiquette: [
        'These are among the holiest Shiva temples — maintain silence in sanctum',
        'Girivalam (hill circumambulation) at Tiruvannamalai — 14 km barefoot walk',
        'Chidambaram — Akasa Lingam (space) is invisible; worship the empty space',
        'Kanchipuram Ekambareswarar — ancient mango tree in the premises',
        'Each temple represents an element: Earth, Water, Fire, Air, Space'
      ],
      photography: 'No photography inside. Tiruvannamalai allows hill photos. Chidambaram is very strict.',
      offerings: 'Bilva leaves, flowers, milk abhishekam. Element-specific offerings at each temple.'
    },
    chardham: {
      title: 'Char Dham Yatra Guide',
      dress: 'Warm woolen clothing for Himalayan dhams (Badrinath, Kedarnath). Light cotton for Rameswaram, Puri. Traditional wear preferred inside temples.',
      etiquette: [
        'Char Dham Yatra traditionally starts from Badrinath and ends at Rameswaram',
        'Himalayan dhams open only May-November due to snow',
        'Physical fitness required for Kedarnath trek (16 km) — pony/helicopter available',
        'Registration mandatory for Kedarnath trek',
        'Carry warm clothes, rain gear, and basic medicines for Himalayan dhams'
      ],
      photography: 'Varies. Badrinath and Rameswaram allow outer photos. Kedarnath sanctum prohibited.',
      offerings: 'Prasadam varies by dham. Flowers, fruits, and ghee lamps are universal.'
    },
    shaktipeethas: {
      title: 'Shakti Peethas Visiting Guide',
      dress: 'Women: Red/yellow traditional wear is auspicious. Men: Modest Indian clothing.',
      etiquette: [
        'These are extremely powerful temples — approach with reverence',
        'Navaratri is the most sacred period for Shakti Peethas',
        'Animal sacrifice is practiced at some peethas (Kamakhya, Kalighat)',
        'Menstruating women are welcomed at Kamakhya temple specifically',
        'Each peetha represents a body part of Goddess Sati'
      ],
      photography: 'Strictly prohibited inside most Shakti Peethas. Kamakhya has very strict rules.',
      offerings: 'Red hibiscus flowers, kumkum, sindoor, coconut, and red cloth.'
    }
  };

  // Default rules for sections without specific data
  var defaultRules = {
    title: 'Temple Visiting Guide',
    dress: 'Men: Modest clothing — avoid shorts and sleeveless tops. Women: Saree, churidar, or modest western wear covering shoulders and knees.',
    etiquette: [
      'Remove footwear before entering temple premises',
      'Walk clockwise (pradakshina) around the sanctum',
      'Maintain silence and reverence inside the temple',
      'Do not sit with feet pointing toward the deity',
      'Accept prasadam with your right hand'
    ],
    photography: 'Photography generally prohibited inside sanctum sanctorum. Allowed in outer areas at most temples.',
    offerings: 'Flowers, fruits, coconut, and incense sticks are universally accepted offerings.'
  };

  var sectionRules = rules[type] || defaultRules;

  // On section page — add rules section after page header
  if (sectionType) {
    var pageHeader = document.querySelector('.page-header');
    if (!pageHeader) return;

    var rulesEl = document.createElement('section');
    rulesEl.className = 'temple-rules-section';
    rulesEl.innerHTML =
      '<details class="rules-accordion">' +
        '<summary><h3>' + sectionRules.title + '</h3></summary>' +
        '<div class="rules-content">' +
          '<div class="rules-grid">' +
            '<div class="rules-item">' +
              '<h4>👗 Dress Code</h4>' +
              '<p>' + sectionRules.dress + '</p>' +
            '</div>' +
            '<div class="rules-item">' +
              '<h4>📸 Photography</h4>' +
              '<p>' + sectionRules.photography + '</p>' +
            '</div>' +
            '<div class="rules-item">' +
              '<h4>🙏 Offerings</h4>' +
              '<p>' + sectionRules.offerings + '</p>' +
            '</div>' +
          '</div>' +
          '<div class="rules-etiquette">' +
            '<h4>Temple Etiquette</h4>' +
            '<ul>' + sectionRules.etiquette.map(function (e) { return '<li>' + e + '</li>'; }).join('') + '</ul>' +
          '</div>' +
        '</div>' +
      '</details>';

    pageHeader.parentNode.insertBefore(rulesEl, pageHeader.nextSibling);
  }

  // On detail page — add compact rules card
  if (window.location.pathname.indexOf('temple.html') !== -1) {
    var insertAfter = document.querySelector('.accommodation-card') || document.querySelector('.how-to-reach-card') || document.querySelector('.timings-card');
    if (!insertAfter) return;

    var card = document.createElement('article');
    card.className = 'rules-detail-card';
    card.innerHTML =
      '<h3>Visiting Rules</h3>' +
      '<div class="rules-detail-grid">' +
        '<div><strong>Dress Code</strong><p>' + sectionRules.dress + '</p></div>' +
        '<div><strong>Photography</strong><p>' + sectionRules.photography + '</p></div>' +
        '<div><strong>Offerings</strong><p>' + sectionRules.offerings + '</p></div>' +
      '</div>';

    insertAfter.parentNode.insertBefore(card, insertAfter.nextSibling);
  }
})();
