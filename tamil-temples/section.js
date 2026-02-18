(function () {
  const type = document.body.dataset.sectionType;
  const listEl = document.getElementById('templeList');
  const searchEl = document.getElementById('sectionSearch');
  const titleEl = document.getElementById('pageTitle');
  const descEl = document.getElementById('pageDesc');
  const breadcrumbEl = document.getElementById('breadcrumbTitle');
  if (!type || !listEl || !searchEl) return;

  const meta = window.sectionMeta[type] || { title: 'Temples' };
  titleEl.textContent = meta.title;
  if (breadcrumbEl) breadcrumbEl.textContent = meta.title;
  descEl.textContent = meta.desc || 'Search and open any temple to view full details on a dedicated page.';

  const data = window.getSectionData(type);

  function render(items) {
    if (!items.length) {
      listEl.innerHTML = '<p class="no-data">No temples available yet. You can populate this section data later.</p>';
      return;
    }

    listEl.innerHTML = items.map(t => {
      var fallback = window.getSectionFallback ? window.getSectionFallback(type, t.name) : '';
      var imgSrc = t.image || fallback;
      return `
      <article class="temple-card">
        <a href="temple.html?type=${encodeURIComponent(type)}&id=${encodeURIComponent(t.id)}">
          <img src="${imgSrc}" alt="${t.name}" onerror="this.onerror=null;this.src='${fallback.replace(/'/g, "\\'")}';" />
          <div class="content">
            <h3>${t.name}</h3>
            <p>${t.location || ''}${t.district ? ', ' + t.district : ''}</p>
            <span class="badge">${t.deity || 'Temple'}</span>
          </div>
        </a>
      </article>`;
    }).join('');
  }

  searchEl.addEventListener('input', () => {
    const q = searchEl.value.toLowerCase().trim();
    const filtered = !q ? data : data.filter(t =>
      (t.name || '').toLowerCase().includes(q) ||
      (t.location || '').toLowerCase().includes(q) ||
      (t.deity || '').toLowerCase().includes(q)
    );
    render(filtered);
  });

  render(data);
})();
