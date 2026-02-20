// ========================================
// Emergency & Helpline Contacts
// Shows safety info per temple town + universal helplines
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
  var location = temple.location || '';
  var district = temple.district || raw.state || '';

  // Local contacts by temple town
  var localContacts = {
    'Madurai':        { police: '0452-2534312', hospital: 'GRH Madurai: 0452-2532535', templeOffice: 'Meenakshi Temple: 0452-2334360' },
    'Rameswaram':     { police: '04573-221226', hospital: 'GH Rameswaram: 04573-221206', templeOffice: 'Ramanathaswamy: 04573-221223' },
    'Kumbakonam':     { police: '0435-2400100', hospital: 'GH Kumbakonam: 0435-2400485', templeOffice: 'Tourism: 0435-2403510' },
    'Kanchipuram':    { police: '044-27222401', hospital: 'GH Kanchipuram: 044-27222502', templeOffice: 'Tourism: 044-27222603' },
    'Chidambaram':    { police: '04144-222100', hospital: 'RMMCH: 04144-220071', templeOffice: 'Nataraja Temple: 04144-222638' },
    'Tiruvannamalai': { police: '04175-222100', hospital: 'GH Tiruvannamalai: 04175-232300', templeOffice: 'Arunachaleswarar: 04175-252438' },
    'Palani':         { police: '04545-241100', hospital: 'GH Palani: 04545-241105', templeOffice: 'Murugan Temple: 04545-241463' },
    'Thanjavur':      { police: '04362-231500', hospital: 'Thanjavur Medical College: 04362-231031', templeOffice: 'Big Temple: 04362-274476' },
    'Tiruchirappalli':{ police: '0431-2414100', hospital: 'GH Trichy: 0431-2407151', templeOffice: 'Tourism: 0431-2460136' },
    'Tirunelveli':    { police: '0462-2501500', hospital: 'Tirunelveli Medical College: 0462-2572736', templeOffice: 'Nellaiappar Temple: 0462-2502103' },
    'Varanasi':       { police: '0542-2505570', hospital: 'BHU Hospital: 0542-2307001', templeOffice: 'Kashi Vishwanath: 0542-2392629' },
    'Puri':           { police: '06752-222035', hospital: 'District HQ Hospital: 06752-222063', templeOffice: 'Jagannath Temple: 06752-222002' },
    'Ujjain':         { police: '0734-2555400', hospital: 'District Hospital: 0734-2510212', templeOffice: 'Mahakaleshwar: 0734-2550563' }
  };

  var localInfo = null;
  var searchTerms = [location, district];
  for (var key in localContacts) {
    for (var i = 0; i < searchTerms.length; i++) {
      if (searchTerms[i] && searchTerms[i].toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        localInfo = localContacts[key];
        localInfo._city = key;
        break;
      }
    }
    if (localInfo) break;
  }

  var insertAfter = document.querySelector('.photo-gallery-card') || document.querySelector('.pooja-booking-card') || document.querySelector('.weather-card') || document.querySelector('.detail-card');
  if (!insertAfter) return;

  var section = document.createElement('article');
  section.className = 'emergency-card';

  var localHtml = '';
  if (localInfo) {
    localHtml =
      '<div class="emergency-local">' +
        '<h4>' + localInfo._city + ' Local Contacts</h4>' +
        '<div class="emergency-local-grid">' +
          '<div><strong>Police</strong><a href="tel:' + localInfo.police.replace(/[^0-9+]/g, '') + '">' + localInfo.police + '</a></div>' +
          '<div><strong>Hospital</strong><a href="tel:' + localInfo.hospital.split(':')[1].trim().replace(/[^0-9+]/g, '') + '">' + localInfo.hospital + '</a></div>' +
          '<div><strong>Temple Office</strong><a href="tel:' + localInfo.templeOffice.split(':')[1].trim().replace(/[^0-9+]/g, '') + '">' + localInfo.templeOffice + '</a></div>' +
        '</div>' +
      '</div>';
  }

  section.innerHTML =
    '<h3>Emergency & Helpline</h3>' +
    localHtml +
    '<div class="emergency-universal">' +
      '<div class="emergency-item emergency-critical"><span>🚨</span><div><strong>Emergency</strong><a href="tel:112">112</a></div></div>' +
      '<div class="emergency-item"><span>🚑</span><div><strong>Ambulance</strong><a href="tel:108">108</a></div></div>' +
      '<div class="emergency-item"><span>👮</span><div><strong>Police</strong><a href="tel:100">100</a></div></div>' +
      '<div class="emergency-item"><span>🔥</span><div><strong>Fire</strong><a href="tel:101">101</a></div></div>' +
      '<div class="emergency-item"><span>👩</span><div><strong>Women Helpline</strong><a href="tel:181">181</a></div></div>' +
      '<div class="emergency-item"><span>🏛️</span><div><strong>Tourist Helpline</strong><a href="tel:1800-425-4747">1800-425-4747</a></div></div>' +
      '<div class="emergency-item"><span>🏥</span><div><strong>TTDC Helpline</strong><a href="tel:1800-425-1076">1800-425-1076</a></div></div>' +
    '</div>';

  insertAfter.parentNode.insertBefore(section, insertAfter.nextSibling);
})();
