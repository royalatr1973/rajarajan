/* Live Darshan & Virtual Tour Links Hub */
(function () {
  var temples = [
    { name: 'Tirumala Tirupati Balaji', location: 'Tirupati, Andhra Pradesh', liveStream: 'https://www.youtube.com/@TirupatiTTD/live', virtualTour: null, channel: 'TTD Official', status: 'live-24x7', notes: 'TTD provides 24/7 live darshan. Multiple camera angles including Garbhagriha.' },
    { name: 'Sri Ranganathaswamy Temple', location: 'Srirangam, Trichy', liveStream: 'https://www.youtube.com/@SrirangamTemple/live', virtualTour: null, channel: 'Temple Official', status: 'live-puja', notes: 'Live streaming during major pujas and Vaikunta Ekadasi.' },
    { name: 'Meenakshi Amman Temple', location: 'Madurai', liveStream: 'https://www.youtube.com/results?search_query=meenakshi+amman+temple+live+darshan', virtualTour: null, channel: 'Various', status: 'live-puja', notes: 'Live during major festivals. Check Dinamalar or temple channels for schedules.' },
    { name: 'Ramanathaswamy Temple', location: 'Rameswaram', liveStream: 'https://www.youtube.com/results?search_query=rameswaram+temple+live+darshan', virtualTour: null, channel: 'Temple Trust', status: 'live-puja', notes: 'Live streaming during Maha Shivaratri and special occasions.' },
    { name: 'Chidambaram Nataraja Temple', location: 'Chidambaram', liveStream: 'https://www.youtube.com/results?search_query=chidambaram+nataraja+live', virtualTour: null, channel: 'Dikshithar Trust', status: 'live-puja', notes: 'Live during Margazhi season and Natyanjali festival.' },
    { name: 'Arunachaleswarar Temple', location: 'Thiruvannamalai', liveStream: 'https://www.youtube.com/results?search_query=thiruvannamalai+temple+live', virtualTour: null, channel: 'Various', status: 'live-puja', notes: 'Live streaming during Karthigai Deepam and Girivalam days.' },
    { name: 'Palani Murugan Temple', location: 'Palani, Dindigul', liveStream: 'https://www.youtube.com/@PalaniTemple/live', virtualTour: null, channel: 'Temple Official', status: 'live-puja', notes: 'Live darshan during Thai Poosam and Panguni Uthiram.' },
    { name: 'Sabarimala Ayyappan Temple', location: 'Pathanamthitta, Kerala', liveStream: 'https://www.youtube.com/results?search_query=sabarimala+live+darshan', virtualTour: null, channel: 'Devaswom Board', status: 'seasonal', notes: 'Live during Mandalam-Makaravilakku season (Nov-Jan). Makara Jyothi live coverage.' },
    { name: 'Vaishno Devi Temple', location: 'Katra, Jammu', liveStream: 'https://www.youtube.com/@VaishnoDevi/live', virtualTour: null, channel: 'Shrine Board', status: 'live-24x7', notes: 'SMVDSB provides live darshan feed. Multiple cameras on trekking route.' },
    { name: 'Somnath Temple', location: 'Somnath, Gujarat', liveStream: 'https://www.youtube.com/@SomnathTrust/live', virtualTour: null, channel: 'Somnath Trust', status: 'live-puja', notes: 'Live Aarti streaming every evening. Sound and light show also streamed.' },
    { name: 'Kashi Vishwanath Temple', location: 'Varanasi, UP', liveStream: 'https://www.youtube.com/results?search_query=kashi+vishwanath+live+darshan', virtualTour: null, channel: 'Temple Trust', status: 'live-puja', notes: 'Live Ganga Aarti and temple darshan during major festivals.' },
    { name: 'Jagannath Temple', location: 'Puri, Odisha', liveStream: 'https://www.youtube.com/results?search_query=jagannath+puri+live+darshan', virtualTour: null, channel: 'Temple Admin', status: 'live-puja', notes: 'Live during Rath Yatra and major pujas. Non-Hindus cannot enter physically.' },
    { name: 'Guruvayur Sri Krishna Temple', location: 'Guruvayur, Kerala', liveStream: 'https://www.youtube.com/results?search_query=guruvayur+temple+live', virtualTour: null, channel: 'Devaswom', status: 'live-puja', notes: 'Live streaming during major utsavams. Online prasadam booking available.' },
    { name: 'Thanjavur Brihadeeswarar Temple', location: 'Thanjavur', liveStream: 'https://www.youtube.com/results?search_query=thanjavur+big+temple+live', virtualTour: null, channel: 'ASI / HR&CE', status: 'occasional', notes: 'UNESCO World Heritage Site. Live during Maha Shivaratri. Virtual tour via ASI.' },
    { name: 'Kedarnath Temple', location: 'Kedarnath, Uttarakhand', liveStream: 'https://www.youtube.com/results?search_query=kedarnath+live+darshan', virtualTour: null, channel: 'Devasthanam', status: 'seasonal', notes: 'Open May-November only. Live stream during opening/closing ceremonies.' }
  ];

  var statusLabels = {
    'live-24x7': { label: 'LIVE 24/7', color: '#2E7D32' },
    'live-puja': { label: 'Live During Pujas', color: '#E65100' },
    'seasonal': { label: 'Seasonal', color: '#6A1B9A' },
    'occasional': { label: 'Occasional', color: '#1565C0' }
  };

  var searchEl = document.getElementById('darshanSearch');
  var listEl = document.getElementById('darshanList');

  function render(items) {
    if (!items.length) {
      listEl.innerHTML = '<p class="no-data">No matching temples found.</p>';
      return;
    }
    listEl.innerHTML = '<div class="grid">' + items.map(function (t) {
      var s = statusLabels[t.status] || statusLabels['occasional'];
      return '<article class="temple-card"><div class="content" style="padding:16px">' +
        '<div style="display:flex;justify-content:space-between;align-items:start;gap:8px">' +
          '<h3 style="margin:0">' + t.name + '</h3>' +
          '<span style="white-space:nowrap;font-size:11px;padding:3px 8px;border-radius:999px;background:' + s.color + ';color:#fff;font-weight:600">' + s.label + '</span>' +
        '</div>' +
        '<p style="margin:4px 0">' + t.location + '</p>' +
        '<p style="font-size:13px;color:var(--muted);margin:6px 0">' + t.notes + '</p>' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">' +
          (t.liveStream ? '<a href="' + t.liveStream + '" target="_blank" rel="noopener" class="badge" style="text-decoration:none;background:rgba(211,47,47,.1);color:#C62828">&#9654; Live Darshan</a>' : '') +
          (t.virtualTour ? '<a href="' + t.virtualTour + '" target="_blank" rel="noopener" class="badge" style="text-decoration:none;background:rgba(21,101,192,.1);color:#1565C0">&#127760; Virtual Tour</a>' : '') +
        '</div>' +
      '</div></article>';
    }).join('') + '</div>';
  }

  searchEl.addEventListener('input', function () {
    var q = searchEl.value.toLowerCase().trim();
    var filtered = !q ? temples : temples.filter(function (t) {
      return t.name.toLowerCase().includes(q) || t.location.toLowerCase().includes(q);
    });
    render(filtered);
  });

  render(temples);
})();
