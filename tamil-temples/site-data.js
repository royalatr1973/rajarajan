window.extraSections = {
  featured: [
    { id: 'f1', name: 'Brihadeeswarar Temple', location: 'Thanjavur', district: 'Thanjavur', deity: 'Lord Shiva', image: 'images/featured/brihadeeswarar.jpg', summary: 'Great Living Chola Temple and UNESCO site.' },
    { id: 'f2', name: 'Meenakshi Amman Temple', location: 'Madurai', district: 'Madurai', deity: 'Meenakshi & Sundareswarar', image: 'https://raw.githubusercontent.com/royalatr1973/rajarajan/main/tamil-temples/images/featured/meenakshi.jpg?v=2', summary: 'Iconic Madurai complex with towering gopurams.' },
    { id: 'f3', name: 'Ramanathaswamy Temple', location: 'Rameswaram', district: 'Ramanathapuram', deity: 'Lord Shiva', image: 'images/featured/rameswaram.jpg', summary: 'Pilgrimage center known for long corridors.' }
  ],
  navagraha: [
    { id: 'n1', name: 'Suryanar Kovil', location: 'Aduthurai', district: 'Mayiladuthurai', deity: 'Surya', image: 'images/navagraha/1.jpg', summary: 'Dedicated Surya sthalam in the Navagraha circuit.' },
    { id: 'n2', name: 'Thingalur Kailasanathar Temple', location: 'Thingalur', district: 'Thanjavur', deity: 'Chandra', image: 'images/navagraha/2.jpg', summary: 'Moon-associated temple in the Navagraha route.' },
    { id: 'n3', name: 'Vaitheeswaran Koil', location: 'Vaitheeswaran Koil', district: 'Mayiladuthurai', deity: 'Angaraka (Sevvai)', image: 'images/navagraha/3.jpg', summary: 'Mars (Sevvai) sthalam; also famed Shiva temple.' },
    { id: 'n4', name: 'Thiruvenkadu Swetharanyeswarar Temple', location: 'Thiruvenkadu', district: 'Mayiladuthurai', deity: 'Budhan', image: 'images/navagraha/4.jpg', summary: 'Mercury (Budhan) sthalam with rich sthala puranam.' },
    { id: 'n5', name: 'Alangudi Apatsahayeswarar Temple', location: 'Alangudi', district: 'Thiruvarur', deity: 'Guru', image: 'images/navagraha/5.jpg', summary: 'Jupiter (Guru) sthalam in Kumbakonam belt.' },
    { id: 'n6', name: 'Kanjanur Agneeswarar Temple', location: 'Kanjanur', district: 'Thanjavur', deity: 'Sukran', image: 'images/navagraha/6.jpg', summary: 'Venus (Sukran) sthalam near Aduthurai.' },
    { id: 'n7', name: 'Thirunallar Dharbaranyeswarar Temple', location: 'Thirunallar', district: 'Karaikal', deity: 'Sani', image: 'images/navagraha/7.jpg', summary: 'Saturn (Sani) sthalam, one of the most visited.' },
    { id: 'n8', name: 'Thirunageswaram Naganathaswamy Temple', location: 'Thirunageswaram', district: 'Thanjavur', deity: 'Rahu', image: 'images/navagraha/8.jpg', summary: 'Rahu sthalam known for milk abhishekam phenomenon.' },
    { id: 'n9', name: 'Keezhaperumpallam Naganathar Temple', location: 'Keezhaperumpallam', district: 'Mayiladuthurai', deity: 'Ketu', image: 'images/navagraha/9.jpg', summary: 'Ketu sthalam completing the Navagraha nine.' }
  ],
  panchabhootha: [
    { id: 'p1', name: 'Ekambareswarar Temple', location: 'Kanchipuram', district: 'Kanchipuram', deity: 'Prithvi (Earth)', image: 'images/panchabhootha/1.jpg', summary: 'Earth element (Prithvi Lingam) among Pancha Bhootha temples.' },
    { id: 'p2', name: 'Jambukeswarar Temple', location: 'Thiruvanaikaval', district: 'Tiruchirapalli', deity: 'Appu (Water)', image: 'images/panchabhootha/2.jpg', summary: 'Water element (Appu Lingam) temple near Srirangam.' },
    { id: 'p3', name: 'Arunachaleswarar Temple', location: 'Thiruvannamalai', district: 'Thiruvannamalai', deity: 'Agni (Fire)', image: 'images/panchabhootha/3.jpg', summary: 'Fire element (Agni Lingam), famed for Karthigai Deepam.' },
    { id: 'p4', name: 'Srikalahasteeswara Temple', location: 'Srikalahasti', district: 'Tirupati Region', deity: 'Vayu (Air)', image: 'images/panchabhootha/4.jpg', summary: 'Air element (Vayu Lingam), ancient Shaivite shrine.' },
    { id: 'p5', name: 'Thillai Natarajar Temple', location: 'Chidambaram', district: 'Cuddalore', deity: 'Akasha (Space)', image: 'images/panchabhootha/5.jpg', summary: 'Space element (Akasha Lingam) at Chidambaram.' }
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
