(function () {
  const input = document.getElementById('globalSearch');
  const results = document.getElementById('globalResults');
  if (!input || !results) return;

  const sources = [
    ...window.getSectionData('dd').map(t => ({ ...t, type: 'dd' })),
    ...window.getSectionData('pps').map(t => ({ ...t, type: 'pps' })),
    ...window.getSectionData('featured').map(t => ({ ...t, type: 'featured' })),
    ...window.getSectionData('navagraha').map(t => ({ ...t, type: 'navagraha' })),
    ...window.getSectionData('panchabhootha').map(t => ({ ...t, type: 'panchabhootha' })),
    ...window.getSectionData('vinayagar').map(t => ({ ...t, type: 'vinayagar' })),
    ...window.getSectionData('murugan').map(t => ({ ...t, type: 'murugan' })),
    ...window.getSectionData('kumbakonam').map(t => ({ ...t, type: 'kumbakonam' })),
    ...window.getSectionData('kanchipuram').map(t => ({ ...t, type: 'kanchipuram' }))
  ];

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    if (q.length < 2) {
      results.innerHTML = '';
      return;
    }

    const matched = sources.filter(t =>
      t.name.toLowerCase().includes(q) ||
      (t.location || '').toLowerCase().includes(q) ||
      (t.deity || '').toLowerCase().includes(q)
    ).slice(0, 12);

    if (!matched.length) {
      results.innerHTML = '<div class="result-item"><a href="#">No temples found</a></div>';
      return;
    }

    results.innerHTML = matched.map(t => {
      const sectionTitle = (window.sectionMeta[t.type] || {}).title || t.type;
      return `<div class="result-item"><a href="temple.html?type=${encodeURIComponent(t.type)}&id=${encodeURIComponent(t.id)}"><strong>${t.name}</strong><div class="result-meta">${sectionTitle} • ${t.location || ''}</div></a></div>`;
    }).join('');
  });
})();
