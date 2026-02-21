/* Annadanam (Free Meal) Finder */
(function () {
  var annadanamData = [
    { temple: 'Sri Ranganathaswamy Temple', location: 'Srirangam, Trichy', district: 'Tiruchirapalli', meals: ['lunch'], timing: 'Lunch: 12:00 PM - 2:00 PM', capacity: '~5,000 daily', notes: 'Largest free meal service in Tamil Nadu. Run by temple trust. Meals served on banana leaves.', type: 'dd' },
    { temple: 'Meenakshi Amman Temple', location: 'Madurai', district: 'Madurai', meals: ['lunch', 'dinner'], timing: 'Lunch: 12:00 - 2:00 PM | Dinner: 7:30 - 9:00 PM', capacity: '~3,000 daily', notes: 'Run by HR&CE. Vegetarian meals with rice, sambar, rasam, poriyal, buttermilk.', type: 'featured' },
    { temple: 'Brihadeeswarar Temple', location: 'Thanjavur', district: 'Thanjavur', meals: ['lunch'], timing: 'Lunch: 12:30 PM - 1:30 PM', capacity: '~1,000 daily', notes: 'Served in the temple dining hall. Simple traditional meals.', type: 'featured' },
    { temple: 'Ramanathaswamy Temple', location: 'Rameswaram', district: 'Ramanathapuram', meals: ['lunch', 'breakfast'], timing: 'Breakfast: 8:00 - 9:30 AM | Lunch: 12:00 - 2:00 PM', capacity: '~2,000 daily', notes: 'Managed by temple devasthanam. Increased capacity during festivals.', type: 'featured' },
    { temple: 'Palani Dhandayuthapani Temple', location: 'Palani', district: 'Dindigul', meals: ['breakfast', 'lunch', 'dinner'], timing: 'Breakfast: 7:30 AM | Lunch: 12:00 PM | Dinner: 8:00 PM', capacity: '~10,000 daily', notes: 'One of the largest Annadanam in India. Famous Panchamirtham prasadam.', type: 'murugan' },
    { temple: 'Kapaleeshwarar Temple', location: 'Mylapore, Chennai', district: 'Chennai', meals: ['lunch'], timing: 'Lunch: 12:00 - 1:30 PM', capacity: '~500 daily', notes: 'Run by temple administration. Traditional meals on weekdays.', type: 'featured' },
    { temple: 'Nataraja Temple', location: 'Chidambaram', district: 'Cuddalore', meals: ['lunch'], timing: 'Lunch: 12:30 - 2:00 PM', capacity: '~800 daily', notes: 'Managed by Dikshithar community. Served during all puja days.', type: 'featured' },
    { temple: 'Arunachaleswarar Temple', location: 'Thiruvannamalai', district: 'Thiruvannamalai', meals: ['breakfast', 'lunch', 'dinner'], timing: 'Breakfast: 7:00 AM | Lunch: 12:00 PM | Dinner: 7:30 PM', capacity: '~8,000 daily', notes: 'Multiple Annadanam halls. Huge increase during Girivalam days and Karthigai.', type: 'panchabhootha' },
    { temple: 'Thirupathi Balaji Temple (Tirumala)', location: 'Tirupati', district: 'Tirupati (AP)', meals: ['breakfast', 'lunch', 'dinner'], timing: 'All day: 3:00 AM - 11:00 PM', capacity: '~100,000 daily', notes: 'TTD runs the world\'s largest free kitchen. Serves 3 meals plus special prasadams.', type: 'dd' },
    { temple: 'Golden Temple (Harmandir Sahib)', location: 'Amritsar', district: 'Amritsar (Punjab)', meals: ['all-day'], timing: '24 hours, 365 days', capacity: '~100,000 daily', notes: 'The world\'s largest community kitchen (Langar). Open to all, regardless of religion.', type: 'featured' },
    { temple: 'Dharbaranyeswarar Temple', location: 'Thirunallar, Karaikal', district: 'Karaikal', meals: ['lunch'], timing: 'Lunch: 12:00 - 1:30 PM', capacity: '~1,500 on Saturdays', notes: 'Increased Annadanam on Saturdays (Saturn temple). Major crowds during Sani peyarchi.', type: 'navagraha' },
    { temple: 'Vaitheeswaran Koil', location: 'Vaitheeswaran Koil', district: 'Mayiladuthurai', meals: ['lunch'], timing: 'Lunch: 12:00 - 1:30 PM', capacity: '~700 on Tuesdays', notes: 'Increased meals on Tuesdays (Mars day). Also has Annadanam trusts.', type: 'navagraha' },
    { temple: 'Sarangapani Temple', location: 'Kumbakonam', district: 'Thanjavur', meals: ['lunch'], timing: 'Lunch: 12:30 - 1:30 PM', capacity: '~400 daily', notes: 'Run by temple trust. Traditional meals served on banana leaves.', type: 'dd' },
    { temple: 'Ekambareswarar Temple', location: 'Kanchipuram', district: 'Kanchipuram', meals: ['lunch'], timing: 'Lunch: 12:00 - 2:00 PM', capacity: '~1,000 daily', notes: 'Multiple donors sponsor meals. Large capacity during Panguni Uthiram.', type: 'panchabhootha' },
    { temple: 'Nellaiappar Temple', location: 'Tirunelveli', district: 'Tirunelveli', meals: ['lunch'], timing: 'Lunch: 12:00 - 1:30 PM', capacity: '~600 daily', notes: 'Run by temple administration with donor support.', type: 'pps' },
    { temple: 'Thiruchendur Murugan Temple', location: 'Thiruchendur', district: 'Thoothukudi', meals: ['lunch', 'dinner'], timing: 'Lunch: 12:00 PM | Dinner: 8:00 PM', capacity: '~3,000 daily', notes: 'One of the Arupadaiveedu. Major Annadanam during Skanda Sashti.', type: 'murugan' },
    { temple: 'Kamakshi Amman Temple', location: 'Kanchipuram', district: 'Kanchipuram', meals: ['lunch'], timing: 'Lunch: 12:00 - 1:30 PM', capacity: '~500 daily', notes: 'Managed by Kanchi Matham trust. Served in adjacent choultry.', type: 'amman' },
    { temple: 'Suchindram Thanumalayan Temple', location: 'Suchindram', district: 'Kanyakumari', meals: ['lunch'], timing: 'Lunch: 12:30 - 1:30 PM', capacity: '~300 daily', notes: 'Run by temple committee. Meals during festivals can serve 2,000+.', type: 'featured' }
  ];

  var searchEl = document.getElementById('annadanamSearch');
  var filterEl = document.getElementById('annadanamFilter');
  var listEl = document.getElementById('annadanamList');

  function render(items) {
    if (!items.length) {
      listEl.innerHTML = '<p class="no-data">No matching Annadanam services found.</p>';
      return;
    }
    listEl.innerHTML = items.map(function (a) {
      var mealBadges = a.meals.map(function (m) {
        return '<span class="badge">' + m.charAt(0).toUpperCase() + m.slice(1) + '</span>';
      }).join(' ');
      return '<article class="temple-card"><div class="content" style="padding:16px">' +
        '<h3>' + a.temple + '</h3>' +
        '<p>' + a.location + ', ' + a.district + '</p>' +
        '<div style="margin:8px 0">' + mealBadges + '</div>' +
        '<div class="detail-grid" style="margin-top:8px">' +
          '<div><strong>Timing</strong>' + a.timing + '</div>' +
          '<div><strong>Capacity</strong>' + a.capacity + '</div>' +
        '</div>' +
        '<p style="margin-top:8px;font-size:13px;color:var(--muted)">' + a.notes + '</p>' +
      '</div></article>';
    }).join('');
  }

  function filterData() {
    var q = (searchEl.value || '').toLowerCase().trim();
    var mealType = filterEl.value;
    var filtered = annadanamData.filter(function (a) {
      var matchText = !q || a.temple.toLowerCase().includes(q) || a.district.toLowerCase().includes(q) || a.location.toLowerCase().includes(q);
      var matchMeal = !mealType || a.meals.indexOf(mealType) >= 0 || (mealType === 'all-day' && a.meals.indexOf('all-day') >= 0);
      return matchText && matchMeal;
    });
    render(filtered);
  }

  searchEl.addEventListener('input', filterData);
  filterEl.addEventListener('change', filterData);
  render(annadanamData);
})();
