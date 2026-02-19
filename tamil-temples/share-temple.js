// ========================================
// Share Temple + Audio Hymns
// Adds WhatsApp/Copy link share buttons + audio links on detail page
// ========================================
(function () {
  // === Share Buttons ===
  var titleEl = document.getElementById('templeTitle');
  if (!titleEl) return;

  var params = new URLSearchParams(window.location.search);
  var type = params.get('type');
  var id = params.get('id');
  if (!type || !id) return;

  var shareUrl = window.location.href;
  var templeName = titleEl.textContent || 'Temple';

  var shareBar = document.createElement('div');
  shareBar.className = 'share-bar';
  shareBar.innerHTML =
    '<button class="share-btn share-whatsapp" title="Share on WhatsApp">' +
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
      ' WhatsApp' +
    '</button>' +
    '<button class="share-btn share-copy" title="Copy link">' +
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>' +
      ' Copy Link' +
    '</button>';

  titleEl.parentNode.insertBefore(shareBar, titleEl.nextSibling);

  shareBar.querySelector('.share-whatsapp').addEventListener('click', function () {
    var text = 'Check out ' + templeName + ' on Temples of Tamil Nadu!\n' + shareUrl;
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
  });

  shareBar.querySelector('.share-copy').addEventListener('click', function () {
    navigator.clipboard.writeText(shareUrl).then(function () {
      var btn = shareBar.querySelector('.share-copy');
      btn.textContent = 'Copied!';
      setTimeout(function () {
        btn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy Link';
      }, 2000);
    });
  });

  // === Audio Hymns Section ===
  var data = window.getSectionData ? window.getSectionData(type) : [];
  var temple = data.find(function (t) { return String(t.id) === String(id); });
  if (!temple) return;

  var raw = temple.raw || {};
  var hymns = [];

  // Auto-detect which hymns apply based on section type
  if (type === 'dd') {
    hymns.push({ label: 'Azhwar Pasurams for ' + temple.name, query: temple.name + ' divya prabandham pasuram' });
    if (raw.azhwars) hymns.push({ label: 'Sung by: ' + raw.azhwars, query: raw.azhwars + ' pasuram ' + temple.name });
  } else if (type === 'pps') {
    hymns.push({ label: 'Thevaram Pathigam for ' + temple.name, query: temple.name + ' thevaram pathigam' });
    if (raw.nayanmars) hymns.push({ label: 'Sung by: ' + raw.nayanmars, query: raw.nayanmars + ' thevaram ' + temple.name });
  } else if (type === 'murugan' || type === 'sapthasthanam') {
    hymns.push({ label: 'Thiruppugazh for ' + temple.name, query: temple.name + ' thiruppugazh arunagirinathar' });
  } else if (type === 'navagraha') {
    hymns.push({ label: 'Navagraha Stotram', query: 'navagraha stotram ' + (temple.deity || '') });
  } else if (type === 'jyotirlinga') {
    hymns.push({ label: 'Dwadasha Jyotirlinga Stotram', query: 'dwadasha jyotirlinga stotram ' + temple.name });
  } else if (type === 'amman' || type === 'shaktipeethas') {
    hymns.push({ label: 'Lalitha Sahasranamam', query: 'lalitha sahasranamam ' + temple.name });
  } else if (type === 'vinayagar') {
    hymns.push({ label: 'Vinayagar Agaval', query: 'vinayagar agaval avvaiyar' });
  }

  // General stotram for any Shiva temple
  if (['panchabhootha', 'sapthavidanga', 'ashtaveerattanam', 'panchasabhai', 'panchaaranya'].indexOf(type) !== -1) {
    hymns.push({ label: 'Thevaram for ' + temple.name, query: temple.name + ' thevaram' });
  }

  if (!hymns.length) return;

  var sthalaEl = document.getElementById('sthalaVaralaru');
  var insertAfter = sthalaEl || document.querySelector('.timings-card') || document.querySelector('.detail-card');
  if (!insertAfter) return;

  var hymnSection = document.createElement('article');
  hymnSection.className = 'hymns-section';
  hymnSection.innerHTML =
    '<h3>Sacred Hymns & Chants</h3>' +
    '<div class="hymns-list">' +
      hymns.map(function (h) {
        var ytUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(h.query);
        return '<a href="' + ytUrl + '" target="_blank" rel="noopener" class="hymn-link">' +
          '<svg viewBox="0 0 24 24" width="20" height="20" fill="#E65100"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>' +
          '<span>' + h.label + '</span>' +
        '</a>';
      }).join('') +
    '</div>';

  insertAfter.parentNode.insertBefore(hymnSection, insertAfter.nextSibling);
})();
