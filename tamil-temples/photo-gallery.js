// ========================================
// Devotee Photo Gallery
// Community photo URLs stored in localStorage + curated Wikimedia links
// ========================================
(function () {
  var params = new URLSearchParams(window.location.search);
  var type = params.get('type');
  var id = params.get('id');
  if (!type || !id) return;

  var STORAGE_KEY = 'templePhotos';
  var data = window.getSectionData ? window.getSectionData(type) : [];
  var temple = data.find(function (t) { return String(t.id) === String(id); });
  if (!temple) return;

  function getPhotos() {
    try {
      var all = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      return (all[type + '_' + id]) || [];
    } catch (e) { return []; }
  }

  function savePhoto(url) {
    try {
      var all = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      var key = type + '_' + id;
      if (!all[key]) all[key] = [];
      if (all[key].indexOf(url) === -1) {
        all[key].push(url);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      }
      return true;
    } catch (e) { return false; }
  }

  function removePhoto(url) {
    try {
      var all = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      var key = type + '_' + id;
      if (all[key]) {
        all[key] = all[key].filter(function (u) { return u !== url; });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      }
    } catch (e) {}
  }

  // Insert after sthala varalaru or last detail section
  var insertAfter = document.querySelector('.pooja-booking-card') || document.querySelector('.weather-card') || document.querySelector('.sthala-varalaru') || document.querySelector('.detail-card');
  if (!insertAfter) return;

  var section = document.createElement('article');
  section.className = 'photo-gallery-card';

  function renderGallery() {
    var photos = getPhotos();
    var galleryHtml = '';
    if (photos.length) {
      galleryHtml = '<div class="photo-grid">' +
        photos.map(function (url) {
          return '<div class="photo-item">' +
            '<img src="' + url + '" alt="Community photo" onerror="this.parentNode.remove();" />' +
            '<button class="photo-remove" title="Remove" data-url="' + url + '">&times;</button>' +
          '</div>';
        }).join('') +
      '</div>';
    }

    var wikiQuery = encodeURIComponent(temple.name + ' temple ' + (temple.location || ''));
    section.innerHTML =
      '<h3>Photo Gallery</h3>' +
      galleryHtml +
      '<div class="photo-add-form">' +
        '<input type="url" id="photoUrlInput" placeholder="Paste image URL to add to gallery..." class="photo-input" />' +
        '<button id="photoAddBtn" class="photo-add-btn">Add Photo</button>' +
      '</div>' +
      '<div class="photo-external-links">' +
        '<a href="https://commons.wikimedia.org/w/index.php?search=' + wikiQuery + '&title=Special:MediaSearch&type=image" target="_blank" rel="noopener" class="photo-ext-link">Browse Wikimedia Commons</a>' +
        '<a href="https://www.google.com/search?tbm=isch&q=' + wikiQuery + '" target="_blank" rel="noopener" class="photo-ext-link">Google Images</a>' +
      '</div>';

    // Bind events
    var addBtn = section.querySelector('#photoAddBtn');
    var input = section.querySelector('#photoUrlInput');
    if (addBtn && input) {
      addBtn.addEventListener('click', function () {
        var url = input.value.trim();
        if (url && (url.indexOf('http') === 0)) {
          savePhoto(url);
          input.value = '';
          renderGallery();
        }
      });
    }

    section.querySelectorAll('.photo-remove').forEach(function (btn) {
      btn.addEventListener('click', function () {
        removePhoto(btn.dataset.url);
        renderGallery();
      });
    });
  }

  insertAfter.parentNode.insertBefore(section, insertAfter.nextSibling);
  renderGallery();
})();
