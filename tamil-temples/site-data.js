window.extraSections = {
  featured: [
    { id: 'f1', name: 'Brihadeeswarar Temple', location: 'Thanjavur', district: 'Thanjavur', deity: 'Lord Shiva', image: 'images/featured/brihadeeswarar.jpg', summary: 'Great Living Chola Temple and UNESCO site.' },
    { id: 'f2', name: 'Meenakshi Amman Temple', location: 'Madurai', district: 'Madurai', deity: 'Meenakshi & Sundareswarar', image: 'https://raw.githubusercontent.com/royalatr1973/rajarajan/main/tamil-temples/images/featured/meenakshi.jpg?v=2', summary: 'Iconic Madurai complex with towering gopurams.' },
    { id: 'f3', name: 'Ramanathaswamy Temple', location: 'Rameswaram', district: 'Ramanathapuram', deity: 'Lord Shiva', image: 'images/featured/rameswaram.jpg', summary: 'Pilgrimage center known for long corridors.' }
  ],
  navagraha: [
    { id: 'n1', name: 'Suryanar Kovil', location: 'Aduthurai', district: 'Thanjavur', deity: 'Surya', image: 'images/navagraha/1.jpg', summary: 'Sun temple among Navagraha circuit.' },
    { id: 'n2', name: 'Thingalur Kailasanathar', location: 'Thingalur', district: 'Thanjavur', deity: 'Chandra', image: 'images/navagraha/2.jpg', summary: 'Moon-associated temple.' }
  ],
  panchabhootha: [
    { id: 'p1', name: 'Ekambareswarar Temple', location: 'Kanchipuram', district: 'Kanchipuram', deity: 'Prithvi (Earth)', image: 'images/panchabhootha/1.jpg', summary: 'Earth element among Pancha Bhootha temples.' },
    { id: 'p2', name: 'Jambukeswarar Temple', location: 'Thiruvanaikaval', district: 'Trichy', deity: 'Water', image: 'images/panchabhootha/2.jpg', summary: 'Water element temple in Trichy.' }
  ],
  vinayagar: [],
  murugan: []
};

window.sectionMeta = {
  dd: { title: '108 Divya Desam Temples', page: 'divyadesam.html' },
  pps: { title: '276 Paadal Petra Sthalams', page: 'paadalpetra.html' },
  featured: { title: 'Featured Temples', page: 'featured.html' },
  navagraha: { title: 'Navagraha Temples', page: 'navagraha.html' },
  panchabhootha: { title: 'Pancha Bhootha Temples', page: 'panchabhootha.html' },
  vinayagar: { title: 'Vinayagar Temples', page: 'vinayagar.html' },
  murugan: { title: 'Murugan Temples', page: 'murugan.html' }
};

window.getSectionData = function(type) {
  if (type === 'dd') return (typeof divyaDesams !== 'undefined' ? divyaDesams : []).map(d => ({
    id: String(d.n), n: d.n, name: d.temple, location: d.location, district: d.district, deity: d.deity,
    summary: d.significance || d.legend || '', image: window.getDivyaDesamPhoto ? window.getDivyaDesamPhoto(d.n) : '', raw: d
  }));

  if (type === 'pps') return (typeof paadalPetraSthalams !== 'undefined' ? paadalPetraSthalams : []).map(t => ({
    id: String(t.n), n: t.n, name: t.temple, location: t.location, district: t.district, deity: t.deity,
    summary: t.significance || t.legend || '', image: window.getPaadalPetraPhoto ? window.getPaadalPetraPhoto(t.n) : '', raw: t
  }));

  return (window.extraSections[type] || []).map((t, idx) => ({
    id: t.id || String(idx + 1), name: t.name, location: t.location || '', district: t.district || '', deity: t.deity || '',
    summary: t.summary || '', image: t.image || '', raw: t
  }));
};
