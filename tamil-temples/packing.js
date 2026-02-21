/* Pilgrimage Packing Checklist Generator */
(function () {
  var STORAGE_KEY = 'temple-packing-checked';
  var categories = {
    clothing: {
      label: 'Clothing & Dress Code',
      base: ['Dhoti / Saree / Salwar Kameez (temple-appropriate)', 'Comfortable walking footwear', 'Extra set of clean clothes'],
      south: ['Light cotton clothes (white preferred)', 'Towel for post-theertham bath'],
      north: ['Warm woolen layers', 'Thermal innerwear'],
      hill: ['Trekking shoes with grip', 'Warm jacket / shawl', 'Rain poncho'],
      coastal: ['Quick-dry clothes', 'Beach/water shoes', 'Light shawl for sea breeze'],
      summer: ['Sunhat / cap', 'Sunglasses', 'Light-colored breathable fabrics'],
      monsoon: ['Umbrella', 'Raincoat / waterproof jacket', 'Waterproof bag cover', 'Extra socks (2 pairs)'],
      winter: ['Sweater / fleece', 'Warm shawl for early morning puja', 'Warm socks']
    },
    spiritual: {
      label: 'Spiritual & Pooja Items',
      base: ['Vibhuti / Kumkum / Turmeric', 'Camphor and matchbox', 'Flowers (or plan to buy at temple)', 'Coconut for breaking', 'Incense sticks'],
      extras: ['Betel leaves and nuts', 'Sandalwood paste', 'Small oil lamp', 'Sacred thread (janeu/poonal)', 'Archana/108 names book', 'Donation money in small denominations']
    },
    documents: {
      label: 'Documents & Money',
      base: ['ID proof (Aadhaar / Passport)', 'Temple booking confirmation (if any)', 'Cash in small denominations', 'UPI-enabled phone', 'Travel tickets / boarding pass'],
      extras: ['Travel insurance papers', 'Emergency contact list (printed)', 'Hotel booking confirmation']
    },
    health: {
      label: 'Health & First Aid',
      base: ['Personal medications', 'Basic first aid kit', 'Hand sanitizer', 'Reusable water bottle', 'ORS packets'],
      elderly: ['Blood pressure monitor', 'Walking stick / mobility aid', 'Cushion for sitting', 'Extra prescription copies'],
      summer: ['Sunscreen SPF 50+', 'Electrolyte drinks', 'Cooling towel'],
      hill: ['Altitude sickness tablets', 'Pain relief gel for joints', 'Energy bars / dry fruits'],
      family: ['Child medications', 'Baby food / formula', 'Diapers and wet wipes', 'Child carrier / stroller (if path allows)']
    },
    tech: {
      label: 'Electronics & Essentials',
      base: ['Phone + charger', 'Power bank (fully charged)', 'Camera (check temple photo policy)'],
      long: ['Universal adapter', 'Earphones', 'Offline maps downloaded'],
      extras: ['Flashlight / torch', 'Ziplock bags for phone (rain/water)']
    },
    food: {
      label: 'Food & Snacks',
      base: ['Dry snacks (murukku, thattai, mixture)', 'Biscuits / energy bars', 'Water bottles'],
      long: ['Instant meals / ready-to-eat packets', 'Tea / coffee sachets', 'Reusable containers'],
      family: ['Kids snacks and juice boxes', 'Feeding bottle']
    }
  };

  var checked = {};
  try { checked = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (e) { checked = {}; }

  function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(checked)); }

  function generate() {
    var dest = document.getElementById('packDest').value;
    var season = document.getElementById('packSeason').value;
    var duration = document.getElementById('packDuration').value;
    var profile = document.getElementById('packProfile').value;
    var listEl = document.getElementById('packingList');

    var html = '';
    Object.keys(categories).forEach(function (catKey) {
      var cat = categories[catKey];
      var items = (cat.base || []).slice();

      // Add destination-specific
      if (cat[dest]) items = items.concat(cat[dest]);
      // Add season-specific
      if (cat[season]) items = items.concat(cat[season]);
      // Add profile-specific
      if (cat[profile]) items = items.concat(cat[profile]);
      // Add duration-specific
      if (duration === 'long' && cat.long) items = items.concat(cat.long);
      if (duration !== 'day' && cat.extras) items = items.concat(cat.extras);

      // Deduplicate
      items = items.filter(function (item, i) { return items.indexOf(item) === i; });

      var total = items.length;
      var checkedCount = items.filter(function (item) { return checked[catKey + ':' + item]; }).length;

      html += '<div class="packing-category">' +
        '<div class="packing-cat-header">' +
          '<h3>' + cat.label + '</h3>' +
          '<span class="packing-progress">' + checkedCount + '/' + total + '</span>' +
        '</div>' +
        '<div class="packing-items">' +
        items.map(function (item) {
          var key = catKey + ':' + item;
          var isChecked = checked[key] ? ' checked' : '';
          return '<label class="packing-item' + (isChecked ? ' done' : '') + '">' +
            '<input type="checkbox"' + isChecked + ' data-key="' + key.replace(/"/g, '&quot;') + '" />' +
            '<span>' + item + '</span>' +
          '</label>';
        }).join('') +
        '</div></div>';
    });

    listEl.innerHTML = html;
  }

  document.getElementById('packGenerate').addEventListener('click', generate);
  document.getElementById('packReset').addEventListener('click', function () {
    checked = {};
    save();
    generate();
  });

  document.getElementById('packingList').addEventListener('change', function (e) {
    if (e.target.type !== 'checkbox') return;
    var key = e.target.dataset.key;
    if (e.target.checked) {
      checked[key] = true;
      e.target.closest('.packing-item').classList.add('done');
    } else {
      delete checked[key];
      e.target.closest('.packing-item').classList.remove('done');
    }
    save();
    // Update progress count
    var cat = e.target.closest('.packing-category');
    var total = cat.querySelectorAll('input[type=checkbox]').length;
    var done = cat.querySelectorAll('input[type=checkbox]:checked').length;
    cat.querySelector('.packing-progress').textContent = done + '/' + total;
  });

  generate();
})();
