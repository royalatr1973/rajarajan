(function () {
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type');
  const id = params.get('id');

  const titleEl = document.getElementById('templeTitle');
  const imgEl = document.getElementById('templeImage');
  const summaryEl = document.getElementById('templeSummary');
  const metaEl = document.getElementById('templeMeta');
  const breadcrumbSection = document.getElementById('breadcrumbSection');
  if (!type || !id || !titleEl) return;

  const data = window.getSectionData(type);
  const temple = data.find(t => String(t.id) === String(id));
  const meta = window.sectionMeta[type] || { title: 'Section', page: 'index.html' };

  breadcrumbSection.textContent = meta.title;
  breadcrumbSection.href = meta.page;

  if (!temple) {
    titleEl.textContent = 'Temple not found';
    summaryEl.textContent = 'Please go back and open a temple from the section list.';
    return;
  }

  titleEl.textContent = temple.name;
  imgEl.src = temple.image || '';
  imgEl.alt = temple.name;
  summaryEl.textContent = temple.summary || 'Details can be expanded as you populate this dataset.';

  const raw = temple.raw || {};
  const pairs = [
    ['Temple Number', temple.n || temple.id],
    ['Location', temple.location || '-'],
    ['District', temple.district || raw.state || '-'],
    ['Deity', temple.deity || '-'],
    ['Consort', raw.thayar || raw.amman || '-'],
    ['Theertham', raw.theertham || '-'],
    ['Legend', raw.legend || '-'],
    ['Festivals', raw.festivals || '-'],
    ['Significance', raw.significance || '-']
  ];

  metaEl.innerHTML = pairs.map(([k, v]) => `<div><strong>${k}</strong>${v}</div>`).join('');
})();
