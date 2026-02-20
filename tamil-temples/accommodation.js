// ========================================
// Accommodation Finder — Hotels/Dharamshalas near temple
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
  var lat = raw.lat;
  var lng = raw.lng;
  var location = temple.location || '';
  var name = temple.name || '';
  var q = encodeURIComponent(name + ' ' + location);

  // Known temple trust accommodations
  var trustAccom = {
    'Srirangam':      { name: 'Sri Ranganathaswamy Temple Trust', type: 'Temple Trust Guest House', note: 'Rooms available near temple. Book at temple office.' },
    'Rameswaram':     { name: 'Devasthanam Guest House', type: 'Temple Trust', note: 'Multiple choultries near Ramanathaswamy Temple. Very affordable.' },
    'Palani':         { name: 'Arulmigu Dhandayuthapani Swamy Temple Trust', type: 'Temple Cottages', note: 'Cottages on hilltop & base. Book via temple website.' },
    'Tirumala':       { name: 'TTD Guest Houses', type: 'Temple Trust', note: 'Book via ttdevasthanams.ap.gov.in. Multiple options at hilltop.' },
    'Chidambaram':    { name: 'Nataraja Temple Trust', type: 'Choultry', note: 'Dharamshalas available near East Gopuram.' },
    'Madurai':        { name: 'Meenakshi Temple Trust', type: 'Choultry', note: 'Affordable rooms near temple. Also many lodges on West Masi St.' },
    'Kumbakonam':     { name: 'Various Mutt Guest Houses', type: 'Mutt Stay', note: 'Shankaracharya Mutt, Ahobila Mutt — free/nominal charges.' },
    'Varanasi':       { name: 'Kashi Vishwanath Trust', type: 'Dharamshala', note: 'Many dharamshalas in Godowlia area. Book via YatraDham.org.' },
    'Somnath':        { name: 'Somnath Trust Guest House', type: 'Temple Trust', note: 'Lilavati Guest House, Shri Mannarayan Dharamshala near temple.' },
    'Dwarka':         { name: 'Dwarkadhish Trust', type: 'Dharamshala', note: 'Birla Dharamshala and temple trust rooms near Gomti Ghat.' },
    'Badrinath':      { name: 'BKTC Guest House', type: 'Temple Trust', note: 'Badrinath-Kedarnath Temple Committee runs budget rooms.' },
    'Kanchipuram':    { name: 'Various Mutt Guest Houses', type: 'Mutt Stay', note: 'Kanchi Kamakoti Mutt and Varadharaja Mutt guest houses available.' },
    'Tiruvannamalai': { name: 'Sri Ramanasramam', type: 'Ashram Stay', note: 'Free stay at Ramanasramam. Multiple dharamshalas near Arunachaleswarar temple.' }
  };

  var accom = null;
  var searchTerms = [location, temple.name];
  for (var key in trustAccom) {
    for (var i = 0; i < searchTerms.length; i++) {
      if (searchTerms[i] && searchTerms[i].toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        accom = trustAccom[key];
        break;
      }
    }
    if (accom) break;
  }

  var insertAfter = document.querySelector('.how-to-reach-card') || document.querySelector('.timings-card') || document.querySelector('.detail-card');
  if (!insertAfter) return;

  var section = document.createElement('article');
  section.className = 'accommodation-card';

  var trustHtml = '';
  if (accom) {
    trustHtml =
      '<div class="accom-trust">' +
        '<div class="accom-trust-name">' + accom.name + '</div>' +
        '<span class="accom-trust-type">' + accom.type + '</span>' +
        '<p>' + accom.note + '</p>' +
      '</div>';
  }

  var mapsBase = lat && lng ? (lat + ',' + lng) : q;
  section.innerHTML =
    '<h3>Stay Near This Temple</h3>' +
    trustHtml +
    '<div class="accom-links">' +
      '<a href="https://www.google.com/maps/search/dharamshala+near+' + q + '" target="_blank" rel="noopener" class="accom-link">Dharamshalas</a>' +
      '<a href="https://www.google.com/maps/search/hotels+near+' + q + '" target="_blank" rel="noopener" class="accom-link">Hotels</a>' +
      '<a href="https://www.google.com/maps/search/lodge+near+' + q + '" target="_blank" rel="noopener" class="accom-link">Budget Lodges</a>' +
      '<a href="https://yatradham.org/" target="_blank" rel="noopener" class="accom-link">YatraDham.org</a>' +
    '</div>';

  insertAfter.parentNode.insertBefore(section, insertAfter.nextSibling);
})();
