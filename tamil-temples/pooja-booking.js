// ========================================
// Online Pooja Booking Links
// Links to official temple portals & aggregators for pooja/seva
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
  var location = (temple.location || '').toLowerCase();
  var name = (temple.name || '').toLowerCase();

  // Known official booking portals
  var portals = [];

  // Match by temple name/location
  if (name.indexOf('tirupati') !== -1 || name.indexOf('venkateshwara') !== -1 || name.indexOf('tirumala') !== -1 || location.indexOf('tirumala') !== -1) {
    portals.push({ name: 'TTD Official Portal', url: 'https://ttdevasthanams.ap.gov.in/', desc: 'Book darshan, seva, accommodation via Tirumala Tirupati Devasthanams' });
  }
  if (name.indexOf('srirangam') !== -1 || name.indexOf('ranganatha') !== -1) {
    portals.push({ name: 'Srirangam Temple Official', url: 'https://srirangam.org/', desc: 'Online pooja and archana booking' });
  }
  if (name.indexOf('meenakshi') !== -1 || location.indexOf('madurai') !== -1) {
    portals.push({ name: 'Meenakshi Temple Trust', url: 'https://maduraimeenakshi.org/', desc: 'Archana and special pooja booking' });
  }
  if (name.indexOf('chidambaram') !== -1 || name.indexOf('nataraja') !== -1) {
    portals.push({ name: 'Chidambaram Temple', url: 'https://www.natarajatemple.in/', desc: 'Abhishekam and special darshan booking' });
  }
  if (name.indexOf('rameswaram') !== -1 || name.indexOf('ramanathaswamy') !== -1) {
    portals.push({ name: 'Rameswaram Temple Trust', url: 'https://www.rameswaramtemple.tn.gov.in/', desc: 'Online pooja and theertham booking' });
  }
  if (name.indexOf('kashi') !== -1 || name.indexOf('vishwanath') !== -1 || location.indexOf('varanasi') !== -1) {
    portals.push({ name: 'Shri Kashi Vishwanath', url: 'https://shrikashivishwanath.org/', desc: 'Online aarti, pooja, and sugam darshan booking' });
  }
  if (name.indexOf('somnath') !== -1) {
    portals.push({ name: 'Somnath Temple Trust', url: 'https://somnath.org/', desc: 'Aarti, pooja, and darshan booking' });
  }
  if (name.indexOf('mahakaleshwar') !== -1 || location.indexOf('ujjain') !== -1) {
    portals.push({ name: 'Mahakaleshwar Temple', url: 'https://shrimahakaleshwar.com/', desc: 'Bhasma Aarti and special darshan booking' });
  }
  if (name.indexOf('palani') !== -1 || name.indexOf('dhandayuthapani') !== -1) {
    portals.push({ name: 'Palani Temple Official', url: 'https://palanimurugantemple.tn.gov.in/', desc: 'Online archana and abhishekam booking' });
  }
  if (name.indexOf('sabarimala') !== -1 || name.indexOf('ayyappa') !== -1) {
    portals.push({ name: 'Sabarimala Virtual Queue', url: 'https://sabarimalaonline.org/', desc: 'Virtual queue booking mandatory for darshan' });
  }
  if (name.indexOf('siddhivinayak') !== -1) {
    portals.push({ name: 'Siddhivinayak Temple', url: 'https://www.siddhivinayak.org/', desc: 'Online pooja and darshan booking' });
  }

  // Always add aggregator platforms
  portals.push({ name: 'Devaseva', url: 'https://www.devaseva.com/', desc: 'Book sevas at 100+ temples with prasadam delivery' });
  portals.push({ name: 'MyPoojaBooking', url: 'https://mypoojabooking.com/', desc: 'Online pooja booking at temples across India' });

  if (!portals.length) return;

  var insertAfter = document.querySelector('.weather-card') || document.querySelector('.rules-detail-card') || document.querySelector('.accommodation-card') || document.querySelector('.timings-card');
  if (!insertAfter) return;

  var section = document.createElement('article');
  section.className = 'pooja-booking-card';
  section.innerHTML =
    '<h3>Book Pooja / Seva Online</h3>' +
    '<div class="pooja-links">' +
      portals.map(function (p) {
        var isOfficial = p.url.indexOf('devaseva') === -1 && p.url.indexOf('mypooja') === -1;
        return '<a href="' + p.url + '" target="_blank" rel="noopener" class="pooja-link' + (isOfficial ? ' pooja-official' : '') + '">' +
          '<div class="pooja-link-name">' + p.name + (isOfficial ? ' <span class="pooja-badge">Official</span>' : '') + '</div>' +
          '<div class="pooja-link-desc">' + p.desc + '</div>' +
        '</a>';
      }).join('') +
    '</div>';

  insertAfter.parentNode.insertBefore(section, insertAfter.nextSibling);
})();
