(function () {
  const input = document.getElementById('globalSearch');
  const results = document.getElementById('globalResults');
  if (!input || !results) return;

  // Build search index from all sections with data
  var sources = [];
  var allTypes = Object.keys(window.sectionMeta || {});
  allTypes.forEach(function (type) {
    try {
      var data = window.getSectionData(type);
      if (data && data.length) {
        data.forEach(function (t) { sources.push(Object.assign({}, t, { type: type })); });
      }
    } catch (e) { /* skip sections without data */ }
  });

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
