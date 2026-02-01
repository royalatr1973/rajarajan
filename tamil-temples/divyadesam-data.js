// ========================================
// 108 Divya Desam - Complete Data & Logic
// ========================================

const divyaDesams = [
    // Tamil Nadu - Tiruchirapalli (1-6)
    {n:1, tamilName:"Thiruvarangam (Sri Rangam)", temple:"Sri Ranganathaswamy Temple", location:"Sri Rangam, Trichy", district:"Tiruchirapalli", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Tiruchirapalli", distance:"9-10 km from Trichy bus/railway station", route:"Within city limits. Use special queue (Rs.50/Rs.30) if crowded. Best time: 7AM-11AM. Plan half a day for first visit.", travelBase:"Tiruchirapalli"},
    {n:2, tamilName:"Thirukkozhi (Uraiyur)", temple:"Sri Azhagiya Manavala Perumal Temple", location:"Uraiyur, Trichy", district:"Tiruchirapalli", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Tiruchirapalli", distance:"6-7 km from Trichy bus station; 7-9 km from Sri Rangam", route:"Within Trichy city limits. Consult taxi/auto driver.", travelBase:"Tiruchirapalli"},
    {n:3, tamilName:"Thirukkarambanoor", temple:"Sri Purushothaman Perumal Temple", location:"Uttamar Kovil, Trichy", district:"Tiruchirapalli", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Tiruchirapalli", distance:"14 km from Trichy bus station; 5-6 km from Sri Rangam", route:"From Trichy/Sri Rangam join Trichy-Chennai Trunk road to toll gate. Left turn to SH-25 (Thuraiyur road). Temple is on right, next to the fly over.", travelBase:"Tiruchirapalli"},
    {n:4, tamilName:"Thiruvellarai", temple:"Sri Pundarikashan Perumal Temple", location:"Thiruvellarai, Trichy", district:"Tiruchirapalli", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Tiruchirapalli", distance:"21 km from Sri Rangam; 27 km from Trichy bus station", route:"From toll gate on SH-25, take right to SH-62 towards Thuraiyur via Manachanallur. Watch for temple arch on left.", travelBase:"Tiruchirapalli"},
    {n:5, tamilName:"Thiru Anbil", temple:"Sri Vadivazhagiya Nambi Perumal Temple", location:"Anbil, near Lalgudi, Trichy", district:"Tiruchirapalli", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Tiruchirapalli", distance:"32-36 km from Trichy bus station", route:"From Trichy, join Trichy-Chennai Trunk road to toll gate. Right turn towards Lalgudi via Velayuthapuram, Mandurai. Temple is on north shore of river Kollidam.", travelBase:"Tiruchirapalli"},
    {n:6, tamilName:"Thirupper Nagar", temple:"Sri Appakkudathaan Perumal Temple", location:"Thirupper Nagar, near Koviladi, Trichy", district:"Tiruchirapalli", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Tiruchirapalli", distance:"13 km from Thiru Anbil; 35 km from Trichy", route:"From Thiru Anbil, cross river Kollidam (ask locals). From Trichy via Sarkarpalayam-Kalanai road, Grand Anicut. From Thanjavur via Thiruvaiyur, Kallanai, Koviladi.", travelBase:"Tiruchirapalli"},

    // Tamil Nadu - Thanjavur & Kumbakonam (7-19)
    {n:7, tamilName:"Thiru Thanjaimaamani Koil", temple:"Sri Neelamega Perumal Temple", location:"Vennaththankarai, Thanjavur", district:"Thanjavur", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Thanjavur & Kumbakonam", distance:"5 km from Thanjavur old bus station", route:"From Thanjavur travel towards Thiruvaiyur. (Do not confuse Thiruvaiyur with Thuraiyur)", travelBase:"Thanjavur"},
    {n:8, tamilName:"Thirukkandiyur", temple:"Sri Hara Saabha Vimocchana Perumal Temple", location:"Kandiyur, Thanjavur", district:"Thanjavur", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Thanjavur & Kumbakonam", distance:"11 km from Thanjavur; 4 km from Thiruvaiyur", route:"From Thanjavur travel towards Thiruvaiyur (don't go up to Thiruvaiyur). From Thiruvaiyur travel south 4 km towards Thanjavur.", travelBase:"Thanjavur"},
    {n:9, tamilName:"Thirukkoodaloor", temple:"Sri Aaduthurai Perumal Temple", location:"Between Thiruvaiyaru & Kabisthalam on SH-22", district:"Thanjavur", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Thanjavur & Kumbakonam", distance:"18 km from Thirukkandiyur; 29 km from Kumbakonam", route:"From Thanjavur via Thiruvaiyaru, right turn on SH-22 towards Kabisthalam. Or from Kumbakonam via Swamimalai & Kabisthalam.", travelBase:"Kumbakonam or Thanjavur"},
    {n:10, tamilName:"Thirukkavithalam (Kabisthalam)", temple:"Sri Gajendra Varadha Perumal Temple", location:"Kabisthalam, near Swamimalai", district:"Thanjavur", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Thanjavur & Kumbakonam", distance:"20 km from Kumbakonam via Swamimalai", route:"From Kumbakonam use SH-22, travel via Swamimalai to Kabisthalam.", travelBase:"Kumbakonam"},
    {n:11, tamilName:"Thiruppullam Boothankudi", temple:"Sri Valvil Ramar Perumal Temple", location:"Near Swamimalai, Kumbakonam", district:"Thanjavur", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Thanjavur & Kumbakonam", distance:"14-15 km from Kumbakonam; 5 km from Swamimalai", route:"From Kumbakonam towards Swamimalai. Stay on main road, right turn towards Thiruvaikavur road.", travelBase:"Kumbakonam"},
    {n:12, tamilName:"Thiru Aadhanoor", temple:"Sri Aandu Alakkum Ayan Perumal Temple", location:"Near Swamimalai, Kumbakonam", district:"Thanjavur", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Thanjavur & Kumbakonam", distance:"1.5 km from Thiruppullam Boothankudi", route:"From Thiruppullam Boothankudi travel east.", travelBase:"Kumbakonam"},
    {n:13, tamilName:"Thirukkudanthai", temple:"Sri Saarangapani Perumal Temple", location:"Kumbakonam city limits", district:"Thanjavur", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Thanjavur & Kumbakonam", distance:"1.6 km from Kumbakonam bus station", route:"Within Kumbakonam city limits.", travelBase:"Kumbakonam"},
    {n:14, tamilName:"Thiru Vinnagar", temple:"Sri Oppiliappa Perumal Temple", location:"Oppiliappan Kovil, near Thirunageswaram", district:"Thanjavur", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Thanjavur & Kumbakonam", distance:"8 km from Kumbakonam on SH-147", route:"From Kumbakonam via Cauvery Nagar, Thirunageswaram. Temple is next to Thirunageswaram temple.", travelBase:"Kumbakonam"},
    {n:15, tamilName:"Thirunarayoor (Naachchiyaar Koil)", temple:"Sri Thirunarayoor Nambi Perumal Temple", location:"Nachchiyar Kovil, near Kumbakonam", district:"Thanjavur", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Thanjavur & Kumbakonam", distance:"12 km from Kumbakonam; 8 km from Oppiliappan Kovil", route:"From Kumbakonam towards Kodavasal via Sakkottai.", travelBase:"Kumbakonam"},
    {n:16, tamilName:"Thiruccherai", temple:"Sri Saranathan Perumal Temple", location:"Thiruccherai, Kumbakonam", district:"Thanjavur", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Thanjavur & Kumbakonam", distance:"17 km from Kumbakonam; 5 km from Nachchiyar Kovil", route:"From Kumbakonam via Sakkottai, Nachiyar Koil towards Kodavasal.", travelBase:"Kumbakonam"},
    {n:17, tamilName:"Thirukkannamangai", temple:"Sri Bhaktavatsala Perumal Temple", location:"Near Thiruvarur", district:"Thiruvarur", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Thanjavur & Kumbakonam", distance:"38 km from Kumbakonam; 8 km from Thiruvarur", route:"From Kumbakonam via Sakkottai, Nachiyar Koil, Thiruccherai, Kodavasal.", travelBase:"Kumbakonam"},
    {n:18, tamilName:"Thirunandhipura Vinnagaram (Nathan Koil)", temple:"Sri Jaganatha Perumal Temple", location:"Nathan Kovil, Kumbakonam", district:"Thanjavur", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Thanjavur & Kumbakonam", distance:"10-16 km from Kumbakonam", route:"Via Darasuram, Keezha Pazhaiyarai. Or via Sakkottai, Tippirajpuram.", travelBase:"Kumbakonam"},
    {n:19, tamilName:"Thiruvelliyankudi", temple:"Sri Kola Valvilli Ramar Perumal Temple", location:"Near Senganur, Kumbakonam", district:"Thanjavur", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Thanjavur & Kumbakonam", distance:"22 km from Kumbakonam", route:"From Kumbakonam on NH-45C towards Chennai up to Sozhapuram, right turn towards Thiruvelliyankudi.", travelBase:"Kumbakonam"},

    // Tamil Nadu - Mayiladuturai (20-26)
    {n:20, tamilName:"Thiru Indhaloor", temple:"Sri Parimala Ranganatha Perumal Temple", location:"Mayiladuturai town", district:"Nagappattinam", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Mayiladuturai", distance:"1.5 km from Mayavaram bus stand", route:"Within town limits, two crosses from bus stand.", travelBase:"Mayiladuturai"},
    {n:21, tamilName:"Thiruvazhunthoor", temple:"Sri Devaadi Raja Perumal Temple", location:"Near Kuttalam, Mayavaram", district:"Nagappattinam", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Mayiladuturai", distance:"16 km from Mayavaram", route:"From Mayavaram towards Kuttalam. Look for left turn to Komal road.", travelBase:"Mayiladuturai"},
    {n:22, tamilName:"Thiru Sirupuliyur", temple:"Sri Arulmaakadal Perumal Temple", location:"Sirupuliyur, near Peralam", district:"Tiruvarur", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Mayiladuturai", distance:"18 km from Mayavaram", route:"From Mayavaram towards Peralam, left turn towards Pavattakudi.", travelBase:"Mayiladuturai"},
    {n:23, tamilName:"Thirukkannapuram", temple:"Sri Sowrirajan Neelamega Perumal Temple", location:"Near Nannilam", district:"Nagappattinam", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Mayiladuturai", distance:"36 km from Mayavaram", route:"From Mayavaram via Peralam to Sannanallur. Left turn, drive 7.5 km to temple.", travelBase:"Mayiladuturai"},
    {n:24, tamilName:"Thiru Naagai", temple:"Sri Soundaryarajan Neelamega Perumal Temple", location:"Nagappattinam city limits", district:"Nagappattinam", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Mayiladuturai", distance:"2 km from Nagappattinam bus stand", route:"Within Nagappattinam city limits.", travelBase:"Mayiladuturai"},
    {n:25, tamilName:"Thirukkannankudi", temple:"Sri Loganatha Perumal Temple", location:"Near Sikkal, Nagappattinam", district:"Nagappattinam", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Mayiladuturai", distance:"14 km from Nagappattinam", route:"From Nagappattinam towards Tiruvarur via Sikkal to Aliyur. Left turn towards temple. Muddy road.", travelBase:"Mayiladuturai"},
    {n:26, tamilName:"Thiru Thalaicchanga Naanmathiyam", temple:"Sri Naan Madhiya Perumal Temple", location:"Akkur, near Mayavaram", district:"Nagappattinam", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Mayiladuturai", distance:"22 km from Mayavaram", route:"From Mayavaram via Sembanarkoil, Ponsei to Karuvi Junction. Right turn towards Thirukadaiyur.", travelBase:"Mayiladuturai"},

    // Tamil Nadu - Sirkazhi (27-39)
    {n:27, tamilName:"Kaazhicheeraama Vinnagaram (Seerkazhi)", temple:"Thadalar Seerkazhi Thirivikaraman Perumal Temple", location:"Sirkazhi", district:"Nagappattinam", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Sirkazhi", distance:"1.8 km from Sirkazhi bus station", route:"Within Sirkazhi city limits.", travelBase:"Sirkazhi"},
    {n:28, tamilName:"Thiruvellakkulam (Annan Kovil)", temple:"Sri Srinivasa Perumal Temple", location:"Nangur, near Sirkazhi", district:"Nagappattinam", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Sirkazhi (Nangur)", distance:"8 km from Sirkazhi; 0.6 km from Nangur arch", route:"From Sirkazhi on NH-45A to Nangur temple arch. Straight road to temple. (12+1 Divya Desams cluster around Nangur)", travelBase:"Sirkazhi"},
    {n:29, tamilName:"Thiru Devanaar Thogai", temple:"Sri Deiva Naayaga Perumal Temple", location:"Nangur, near Sirkazhi", district:"Nagappattinam", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Sirkazhi (Nangur)", distance:"2 km from Jamia Masjid on NH-45A", route:"On NH-45A, 500m before Nangur arch. Left turn after Jamia Masjid, drive 2 km.", travelBase:"Sirkazhi"},
    {n:30, tamilName:"Thiruvaali Thirunagari", temple:"Sri Lakshmi Narashima Perumal Temple", location:"Nangur, near Sirkazhi", district:"Nagappattinam", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Sirkazhi (Nangur)", distance:"1.3 km from Thiru Devanaar Thogai", route:"Ask priest at previous temple or local villagers.", travelBase:"Sirkazhi"},
    {n:31, tamilName:"Thiru Kavalampaadi", temple:"Sri Gopala Krishna Perumal Temple", location:"Nangur, near Sirkazhi", district:"Nagappattinam", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Sirkazhi (Nangur)", distance:"4.5 km from Thiruvaali", route:"Ask priest or local villagers.", travelBase:"Sirkazhi"},
    {n:32, tamilName:"Thiru Manikkoodam", temple:"Sri Varadharaja Perumal Temple", location:"Nangur, near Sirkazhi", district:"Nagappattinam", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Sirkazhi (Nangur)", distance:"3 km from Thiru Kavalampaadi", route:"Ask priest or local villagers.", travelBase:"Sirkazhi"},
    {n:33, tamilName:"Thiru Paarthanpalli", temple:"Sri Thamaraiyal Kelvan Perumal Temple", location:"Nangur, near Sirkazhi", district:"Nagappattinam", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Sirkazhi (Nangur)", distance:"6 km from Thiru Manikkoodam", route:"Ask priest or local villagers.", travelBase:"Sirkazhi"},
    {n:34, tamilName:"Thiru Manimaada Kovil", temple:"Sri Narayana Perumal Temple", location:"Nangur, near Sirkazhi", district:"Nagappattinam", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Sirkazhi (Nangur)", distance:"3.5 km from Thiru Paarthanpalli", route:"Ask priest or local villagers.", travelBase:"Sirkazhi"},
    {n:35, tamilName:"Thiru Arimeya Vinnagaram", temple:"Sri Kuda Maadu Koothan Perumal Temple", location:"Nangur, near Sirkazhi", district:"Nagappattinam", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Sirkazhi (Nangur)", distance:"0.5 km from Thiru Manimaada Kovil", route:"5 Divya Desams (#35-39) within 500m of each other. Ask locals.", travelBase:"Sirkazhi"},
    {n:36, tamilName:"Thiru Thetri Aambalam", temple:"Sri Seganmaal Ranganatha Perumal Temple", location:"Nangur, near Sirkazhi", district:"Nagappattinam", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Sirkazhi (Nangur)", distance:"0.4 km from previous temple", route:"Ask priest or local villagers.", travelBase:"Sirkazhi"},
    {n:37, tamilName:"Thiru Sempon Sei Kovil", temple:"Sri Per Arulaalan Perumal Temple", location:"Nangur, near Sirkazhi", district:"Nagappattinam", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Sirkazhi (Nangur)", distance:"0.6 km from previous temple", route:"Ask priest or local villagers.", travelBase:"Sirkazhi"},
    {n:38, tamilName:"Thiru Vann Purushothamam", temple:"Sri Purushothama Perumal Temple", location:"Nangur, near Sirkazhi", district:"Nagappattinam", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Sirkazhi (Nangur)", distance:"0.4 km from previous temple", route:"Ask priest or local villagers.", travelBase:"Sirkazhi"},
    {n:39, tamilName:"Thiru VaiKunda Vinnagaram", temple:"Sri Vaigundha Nathan Perumal Temple", location:"Nangur, near Sirkazhi", district:"Nagappattinam", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Sirkazhi (Nangur)", distance:"0.3 km from previous temple", route:"Ask priest or local villagers.", travelBase:"Sirkazhi"},

    // Tamil Nadu - Cuddalore (40-42)
    {n:40, tamilName:"Thiruchitrakootam (Chidambaram)", temple:"Sri Govindaraja Perumal Temple", location:"Inside Chidambaram Nataraja Temple", district:"Cuddalore", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Cuddalore", distance:"1.5 km from Chidambaram bus station", route:"Within city limits. Located inside the famous Nataraja Temple complex.", travelBase:"Chidambaram or Cuddalore"},
    {n:41, tamilName:"Thiruvaheendrapuram", temple:"Sri Deyva Nayaga Perumal Temple", location:"Thiruvaheendrapuram, Cuddalore", district:"Cuddalore", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Cuddalore", distance:"6 km from Cuddalore bus station", route:"From Cuddalore towards Nellikkuppam (don't go all the way).", travelBase:"Cuddalore"},
    {n:42, tamilName:"Thirukkoviloor", temple:"Sri Thiruvikrama Perumal Temple", location:"Thirukkoviloor, near Tiruvannamalai", district:"Viluppuram", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Cuddalore", distance:"0.3 km from Thirukkoviloor bus station", route:"Within town limits.", travelBase:"Tiruvannamalai"},

    // Tamil Nadu - Kanchipuram (43-57)
    {n:43, tamilName:"Thirukkachchi", temple:"Sri Varadharaja Perumal Temple", location:"Kanchipuram", district:"Kanchipuram", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Kanchipuram", distance:"4 km from Kanchipuram bus station", route:"15 Divya Desams in Kanchipuram. All 14 can be visited 7AM-12PM. See the Golden & Silver Lizard here.", travelBase:"Kanchipuram"},
    {n:44, tamilName:"Ashtabhuyakaram", temple:"Sri Aadhikesava Perumal Temple", location:"Kanchipuram", district:"Kanchipuram", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Kanchipuram", distance:"2 km from Thirukkachchi", route:"Drive back towards bus station from Varadharaja Perumal Temple.", travelBase:"Kanchipuram"},
    {n:45, tamilName:"Thiru Vekka", temple:"Sri Yathothakaari Temple", location:"Kanchipuram", district:"Kanchipuram", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Kanchipuram", distance:"0.3 km from Ashtabhuyakaram", route:"Ask priest at previous temple.", travelBase:"Kanchipuram"},
    {n:46, tamilName:"Thiru Velukkai", temple:"Sri Azhagiya Singar Perumal Temple", location:"Kanchipuram", district:"Kanchipuram", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Kanchipuram", distance:"1.2 km from Thiru Vekka", route:"Via Vilakadi Kovil Street to Singara Perumal Street. Car/bus cannot reach — walk from Vallai Pachiappan Street.", travelBase:"Kanchipuram"},
    {n:47, tamilName:"Thiruthanka", temple:"Sri Deepa Prakasar Perumal Temple", location:"Kanchipuram", district:"Kanchipuram", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Kanchipuram", distance:"0.4 km from Thiru Velukkai", route:"On Vilakadi Kovil Street. Ask locals.", travelBase:"Kanchipuram"},
    {n:48, tamilName:"ThirukKalvanoor", temple:"Sri Aadhi Varaha Perumal Temple", location:"Inside Kamakshiamman Temple, Kanchipuram", district:"Kanchipuram", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Kanchipuram", distance:"2 km from Thiruthanka; 0.9 km from bus station", route:"Inside the famous Kanchi Kamakshiamman Temple. Ask the priest to show Sri Aadhi Varaha Perumal.", travelBase:"Kanchipuram"},
    {n:49, tamilName:"Thiru Ooragam", temple:"Sri Ulagalantha Perumal Temple", location:"Kanchipuram", district:"Kanchipuram", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Kanchipuram", distance:"0.4 km from ThirukKalvanoor and bus station", route:"Ask local people.", travelBase:"Kanchipuram"},
    {n:50, tamilName:"Thiru Neeragam", temple:"Sri Jagadeeshwarar Temple", location:"Inside Ulagalantha Perumal Temple", district:"Kanchipuram", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Kanchipuram", distance:"Inside temple #49", route:"Located inside Sri Ulagalantha Perumal Temple.", travelBase:"Kanchipuram"},
    {n:51, tamilName:"Thiru Kaaragam", temple:"Sri Karunakara Perumal Temple", location:"Inside Ulagalantha Perumal Temple", district:"Kanchipuram", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Kanchipuram", distance:"Inside temple #49", route:"Located inside Sri Ulagalantha Perumal Temple.", travelBase:"Kanchipuram"},
    {n:52, tamilName:"Thirukkaar Vaanam", temple:"Sri Thirukkaar Vaanar Temple", location:"Inside Ulagalantha Perumal Temple", district:"Kanchipuram", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Kanchipuram", distance:"Inside temple #49", route:"Located inside Sri Ulagalantha Perumal Temple.", travelBase:"Kanchipuram"},
    {n:53, tamilName:"Thiruparameshwara Vinnagaram", temple:"Sri Vaikunda Perumal Temple", location:"Kanchipuram", district:"Kanchipuram", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Kanchipuram", distance:"0.7 km from Ulagalantha Perumal Temple", route:"Ask local people.", travelBase:"Kanchipuram"},
    {n:54, tamilName:"Thiru Pavala Vannan", temple:"Sri Pavala Vannar Temple", location:"Kanchipuram", district:"Kanchipuram", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Kanchipuram", distance:"1.3 km from previous temple", route:"Ask local people.", travelBase:"Kanchipuram"},
    {n:55, tamilName:"Thiru Nilathingal Thundam", temple:"Sri Nilathingal Thundathan Perumal Temple", location:"Inside Ekambeshwarar Temple, Kanchipuram", district:"Kanchipuram", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Kanchipuram", distance:"1.2 km from Thiru Pavala Vannan", route:"Located inside the Ekambeshwarar Temple complex.", travelBase:"Kanchipuram"},
    {n:56, tamilName:"Thiru Paadagam", temple:"Sri Pandava Thoodhar Temple", location:"Kanchipuram", district:"Kanchipuram", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Kanchipuram", distance:"0.6 km from previous temple", route:"Ask local people.", travelBase:"Kanchipuram"},
    {n:57, tamilName:"Thiruputkuzhi", temple:"Sri Vijayaraghava Perumal Temple", location:"Kanchipuram", district:"Kanchipuram", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Kanchipuram", distance:"16 km from Kanchipuram bus station", route:"From Kanchipuram on NH-4 towards Bangalore. Visit between 4PM-7PM (after other 14 temples).", travelBase:"Kanchipuram"},

    // Tamil Nadu - Chennai (58-64)
    {n:58, tamilName:"Thiruvallikkeni", temple:"Sri Parthasarathy Temple", location:"Triplicane, Chennai", district:"Chennai", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Chennai", distance:"6 km from Chennai Central Railway station", route:"Within Chennai city limits. Reach Triplicane.", travelBase:"Chennai"},
    {n:59, tamilName:"Thiruneermalai", temple:"Sri Neervanna Perumal Temple", location:"Near Pallavaram, Chennai", district:"Chennai", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Chennai", distance:"8 km from Pallavaram Railway Station", route:"From Pallavaram on Southern Great Trunk road, right turn to Thiruneermalai main road.", travelBase:"Chennai"},
    {n:60, tamilName:"Thiruvedanthai", temple:"Sri Nithya Kalyana Perumal Temple", location:"Near Mahabalipuram", district:"Kanchipuram", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Chennai", distance:"52 km from Chennai", route:"From Chennai on East Coast Road towards Mahabalipuram. Temple is on the main road.", travelBase:"Chennai"},
    {n:61, tamilName:"Thiru Kadalmalai (Mahabalipuram)", temple:"Sri Sthala Sayana Perumal Temple", location:"Mahabalipuram", district:"Kanchipuram", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Chennai", distance:"20 km from Thiruvedanthai; 72 km from Chennai", route:"On East Coast Road to Mahabalipuram. Temple is behind Mahabalipuram bus station.", travelBase:"Chennai"},
    {n:62, tamilName:"Thiru Nindravoor (Thirunindravur)", temple:"Sri Bhatavatsala Perumal Temple", location:"Thirunindravur, near Tiruvallur", district:"Tiruvallur", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Chennai", distance:"45 km from Chennai Central", route:"Chennai-Tiruvallur highway. From railway station travel south 2 km to temple.", travelBase:"Chennai"},
    {n:63, tamilName:"Thiruevvuloor (Tiruvallur)", temple:"Sri Veeraraghava Perumal Temple", location:"Tiruvallur", district:"Tiruvallur", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Chennai", distance:"5 km from Tiruvallur railway station", route:"Within Tiruvallur city limits.", travelBase:"Chennai"},
    {n:64, tamilName:"Thirukkatikai (Sholingur)", temple:"Sri Yoga Narasimha Swamy Temple", location:"Sholingur, near Arakonnam", district:"Vellore", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Chennai", distance:"25 km from Arakkonam", route:"Visit morning 8AM-12PM only. Climb 1305 steps. Carry water, walk in groups of 5+. Beware of monkeys — walk empty-handed. Rs.600 coolie service available.", travelBase:"Chennai"},

    // Tamil Nadu - Madurai (65-72)
    {n:65, tamilName:"Thirukkoodal", temple:"Sri Koodal Azhagar Perumal Temple", location:"Near Madurai Periyar Bus Stand", district:"Madurai", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Madurai", distance:"0.4 km from Madurai Periyar bus station", route:"Ask local people.", travelBase:"Madurai"},
    {n:66, tamilName:"Thiru Moghur", temple:"Sri Kaalamegha Perumal Temple", location:"Thiru Moghur, near Madurai", district:"Madurai", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Madurai", distance:"12 km from Mattuthavani bus station", route:"Via Mattuthavani, NH-45B towards Tirchy-Thoothukudi. Right turn to Thiruvathavur road.", travelBase:"Madurai"},
    {n:67, tamilName:"Thirumaalirunsolai (Alagar Kovil)", temple:"Sri Kallazhagar Perumal Temple", location:"Alagar Kovil, Madurai", district:"Madurai", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Madurai", distance:"35 km from Madurai Periyar bus station", route:"From Madurai on SH-72, right turn to Alanganallur-Alagarkovil road. Bus #44 from Periyar bus station.", travelBase:"Madurai"},
    {n:68, tamilName:"Thirukkotiyoor", temple:"Sri Uraga Mellanayaan Perumal Temple", location:"Tirukostiyur, near Tiruppatur", district:"Sivaganga", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Madurai", distance:"75 km from Madurai", route:"Via Mattuthavani, Melur, Tirupattur, Tirukostiyur.", travelBase:"Madurai"},
    {n:69, tamilName:"Thirumeyyam", temple:"Sri Sathyagiri Natha Perumal Temple", location:"Tirumayam, near Pudukkottai", district:"Pudukkottai", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Madurai", distance:"110 km from Madurai; 3 km from Tirumayam bus station", route:"Via Mattuthavani, Melur, Tirupattur, K. Palliavasal, Tirumayam.", travelBase:"Madurai"},
    {n:70, tamilName:"Thiruppullanni", temple:"Sri Kalyana Jagannatha Perumal Temple", location:"Thiruppulani, near Ramanathapuram", district:"Ramanathapuram", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Madurai", distance:"115 km from Madurai; 12 km from Ramanathapuram", route:"From Madurai on NH-49 towards Rameshwaram via Manamadurai. From Ramanathapuram south on Kilakarai road.", travelBase:"Madurai"},
    {n:71, tamilName:"Thiruthankaal (Sivakasi)", temple:"Sri Nindra Narayana Perumal Temple", location:"Near Sivakasi", district:"Virudunagar", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Madurai", distance:"80 km from Madurai; 1 km from Sivakasi", route:"From Madurai via Thiruparankundram, Tirumangalam, Virudhunagar, Sivakasi. Temple comes before Sivakasi bus station.", travelBase:"Madurai (check out, proceed to Tirunelveli)"},
    {n:72, tamilName:"Thiruvilliputtur (Sri Villiputhoor)", temple:"Sri Vadabhatra Saayi Perumal Temple", location:"Sri Villiputhoor", district:"Virudunagar", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Madurai", distance:"25 km from Sivakasi; 85 km from Madurai", route:"From Madurai via Tirumangalam towards Rajapalayam. Or from Sivakasi on Sivakasi-Sri Villiputhur road.", travelBase:"Madurai (proceed to Tirunelveli)"},

    // Tamil Nadu - Tirunelveli / Nava Tirupathis (73-84)
    {n:73, tamilName:"Thiruvaikuntham (Sri Vaikundam)", temple:"Sri Vaikundanatha Perumal Temple", location:"Sri Vaikundam", district:"Tuticorin", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Tirunelveli (Nava Tirupathis)", distance:"27 km from Tirunelveli", route:"9 Nava Tirupathis can be seen in half a day (7AM-11:45AM). ~100km round trip from Tirunelveli. Via Palayankottai on Tirunelveli-Tiruchchendur road.", travelBase:"Tirunelveli"},
    {n:74, tamilName:"Thiruvaragunamangai", temple:"Sri Vijayaasana Perumal Temple", location:"Near Sri Vaikundam", district:"Tuticorin", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Tirunelveli (Nava Tirupathis)", distance:"2 km from Sri Vaikundam", route:"Straight road from Sri Vaikundam.", travelBase:"Tirunelveli"},
    {n:75, tamilName:"Thiruppulingudu", temple:"Sri Kaaichina Vendha Perumal Temple", location:"Near Thiruvaragunamangai", district:"Tuticorin", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Tirunelveli (Nava Tirupathis)", distance:"1 km from Thiruvaragunamangai", route:"Straight road from previous temple.", travelBase:"Tirunelveli"},
    {n:76, tamilName:"Thirukkulanthai", temple:"Sri Srinivasa Perumal Temple", location:"Near Perunkulam", district:"Tuticorin", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Tirunelveli (Nava Tirupathis)", distance:"10 km from Thiruppulingudu", route:"Via Sivakalai to Thirukkulanthai.", travelBase:"Tirunelveli"},
    {n:77, tamilName:"Thiruttholai Villimangalam", temple:"Sri Aravindha Lochana Perumal Temple", location:"Near Mangalapuram", district:"Tuticorin", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Tirunelveli (Nava Tirupathis)", distance:"8 km from Thirukkulanthai", route:"Via Mangalamkurichi, right turn towards Mangalapuram.", travelBase:"Tirunelveli"},
    {n:78, tamilName:"Thirupperai", temple:"Sri Magara NedungKuzhai Kaathar Perumal Temple", location:"Then Thiruppaerai", district:"Tuticorin", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Tirunelveli (Nava Tirupathis)", distance:"5 km from Thiruttholai Villimangalam", route:"Drive back to Mangalapuram, cross bridge to muddy road, join tar road. Right turn to Thirupperai.", travelBase:"Tirunelveli"},
    {n:79, tamilName:"Thirukkoloor", temple:"Sri Vaitha Maanitha Perumal Temple", location:"Near Alwar Thirunagiri", district:"Tuticorin", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Tirunelveli (Nava Tirupathis)", distance:"5 km from Thirupperai", route:"From Thirupperai on SH-40 towards Alwar Thirunagiri. Left turn at Thirukkoloor.", travelBase:"Tirunelveli"},
    {n:80, tamilName:"Thirukkurugur (Alwar Thirunagiri)", temple:"Sri Aadhinatha Swamy Temple", location:"Near Thirukkoloor", district:"Tuticorin", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Tirunelveli (Nava Tirupathis)", distance:"3.5 km from Thirukkoloor", route:"From Thirukkoloor back to state highway, straight to Alwar Thirunagiri.", travelBase:"Tirunelveli"},
    {n:81, tamilName:"Thiruvaramangai Vaanamaamalai (Nanguneri)", temple:"Sri Thothatrinatha Perumal Temple", location:"Nanguneri, near Tirunelveli", district:"Tirunelveli", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Tirunelveli", distance:"40 km from Tirunelveli", route:"From Tirunelveli on NH-7 via Ponnakudi, Perinbapuram. Check out from lodge and head towards Nanguneri.", travelBase:"Tirunelveli (proceed south)"},
    {n:82, tamilName:"Thirukkurungudi", temple:"Sri Nindra Nambi Perumal Temple", location:"Near Nanguneri", district:"Tirunelveli", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Tirunelveli", distance:"20 km from Nanguneri", route:"From Nanguneri on NH-7 via Veerankulam, Ervadi, Thalavaipuram.", travelBase:"Tirunelveli"},
    {n:83, tamilName:"Thiruvanparisaaram (Nagercoil)", temple:"Sri Kuralappa Perumal Temple", location:"Near Nagercoil", district:"Kanyakumari", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Tirunelveli", distance:"5 km from Nagercoil; 55 km from Thirukkurungudi", route:"From Thirukkurungudi via Aralvaimozhi, Thovalai to Vellamadam. Right turn 2 km to temple.", travelBase:"Nagercoil"},
    {n:84, tamilName:"Thiru Vattaaru (near Marthandam)", temple:"Sri Aadhikesava Perumal Temple", location:"Near Marthandam, Nagercoil", district:"Kanyakumari", state:"Tamil Nadu", region:"tamil-nadu", subRegion:"Tirunelveli", distance:"40-60 km from Nagercoil", route:"Route 1: NH-47 to Marthandam, right turn on Pechiparai road. Route 2: NH-47 to Azahiamandapam, right to SH-180.", travelBase:"Nagercoil (proceed to Kerala)"},

    // Kerala (85-95)
    {n:85, tamilName:"Thiruvananthapuram", temple:"Sri Anantha Padmanabhaswamy Temple", location:"Thiruvananthapuram city", district:"Thiruvananthapuram", state:"Kerala", region:"kerala", subRegion:"Kerala", distance:"1.5 km from bus/railway station; 90 km from Nagercoil", route:"From Thiru Vattaaru via Marthandam. NOTE: Wear white veshti/dhothi to enter. No cell phones or cameras inside.", travelBase:"Thiruvananthapuram"},
    {n:86, tamilName:"Thirupuliyoor (near Chengannur)", temple:"Sri Maayapiran Perumal Temple", location:"Puliyoor, near Chengannur", district:"Alappuzha", state:"Kerala", region:"kerala", subRegion:"Kerala", distance:"5 km from Chengannur railway station", route:"6 Divya Desams around Chengannur in one day (~95 km round trip). From Chengannur on Kollakadavu road.", travelBase:"Chengannur"},
    {n:87, tamilName:"Thirucchenkundroor", temple:"Sri Imayavarappa Perumal Temple", location:"Near Chengannur", district:"Alappuzha", state:"Kerala", region:"kerala", subRegion:"Kerala", distance:"1.7 km from Chengannur railway station", route:"From station on MC road 900m, after railway bridge left turn.", travelBase:"Chengannur"},
    {n:88, tamilName:"Thiruvaaran Vilai (Aranmulla)", temple:"Sri Parthasarathy Perumal Temple", location:"Aranmula, near Chengannur", district:"Pathanamthitta", state:"Kerala", region:"kerala", subRegion:"Kerala", distance:"12 km from Chengannur railway station", route:"From Chengannur towards Kozhencheri to Aranmula.", travelBase:"Chengannur"},
    {n:89, tamilName:"Thiruvanvandoor", temple:"Sri Paambanaiyappa Perumal Temple", location:"Near Chengannur", district:"Alappuzha", state:"Kerala", region:"kerala", subRegion:"Kerala", distance:"7 km from Chengannur railway station", route:"On MC road 5 km to Pravumkood (Dove House). Left turn to Thiruvanvandoor.", travelBase:"Chengannur"},
    {n:90, tamilName:"Thiruvalvaazh (Thiruvalla)", temple:"Sri Kolapira Perumal Temple", location:"Thiruvalla, near Chengannassery", district:"Pathanamthitta", state:"Kerala", region:"kerala", subRegion:"Kerala", distance:"12 km from Chengannur; 6 km from Thiruvanvandoor", route:"From Thiruvanvandoor back to MC road. After Thirumoolapuram left turn on Kavumbhagam Idinjillam road.", travelBase:"Chengannur"},
    {n:91, tamilName:"Thirukkadithaanam", temple:"Sri Athpudha Narayana Perumal Temple", location:"Near Changanassery", district:"Kottayam", state:"Kerala", region:"kerala", subRegion:"Kerala", distance:"10 km from Thiruvalla", route:"On MC road towards Changanassery to Perumthuruthy. Right turn on Changanassery-Kaviyoor road.", travelBase:"Chengannur"},
    {n:92, tamilName:"Thirukkaatkarai (Thrikkakara)", temple:"Sri Kaatkarai Appa Perumal Temple", location:"Near Edapally, Ernakulam", district:"Ernakulam", state:"Kerala", region:"kerala", subRegion:"Kerala", distance:"126 km from Chengannur; 3 km from Edapally toll", route:"From Chengannur/Changanassery via Kottayam to Ernakulam. On NH-47 right turn at Edapally toll to Pukkattupady road.", travelBase:"Ernakulam"},
    {n:93, tamilName:"Thirumoozhikkalam", temple:"Sri Moozhikkalathaan Perumal Temple", location:"Near Cochin Airport, Aluva", district:"Ernakulam", state:"Kerala", region:"kerala", subRegion:"Kerala", distance:"30 km from Thrikkakara; 10 km from Cochin Airport junction", route:"Back to NH-47, towards Aluva/Cochin Airport junction. Left turn on Chengamanad Elavoor road.", travelBase:"Ernakulam"},
    {n:94, tamilName:"Thiruvithuvakkodu", temple:"Sri Uyyavantha Perumal Temple", location:"Near Pattambi, Palakkad", district:"Palakkad", state:"Kerala", region:"kerala", subRegion:"Kerala", distance:"130 km from Moozhikulam; 55 km from Thrissur", route:"Via Thrissur, towards Shoranur via Wadackanchery to Cheruthuruthy. Left turn on Perumpilavu road.", travelBase:"Thrissur"},
    {n:95, tamilName:"Thiru Naavaay", temple:"Sri Naavaay Mugundha Perumal Temple", location:"Near Kuttippuram", district:"Malappuram", state:"Kerala", region:"kerala", subRegion:"Kerala", distance:"7 km from Thiruvithuvakkodu; 90 km from Thrissur", route:"Via Edappal, Kuttippuram, on Tirur-Kuttippuram road. Return to Thrissur ~90 km.", travelBase:"Thrissur"},

    // Andhra Pradesh (96-97)
    {n:96, tamilName:"Thirupathi (Tirumala)", temple:"Sri Srinivasa Perumal Temple", location:"Tirumala, Tirupathi", district:"Chittoor", state:"Andhra Pradesh", region:"andhra-pradesh", subRegion:"Andhra Pradesh", distance:"24 km from Tirupathi to Tirumala", route:"World-famous temple. Advance planning required. Free/Rs.50/Rs.300 darshan options. Visit tirumala.org for details.", travelBase:"Tirupathi or Tirumala"},
    {n:97, tamilName:"Thiru Singavel Kundram (Ahobilam)", temple:"Sri Nava Narasimhar Temple", location:"Ahobilam, near Nandyal", district:"Kurnool", state:"Andhra Pradesh", region:"andhra-pradesh", subRegion:"Andhra Pradesh", distance:"30 km from Allagadda; 240 km from Tirupathi", route:"From Chennai via Tiruttani, Tirupathi, Kadappa, Allagadda. From Bangalore via Madanapalle, Kadappa.", travelBase:"Ahobilam"},

    // Gujarat (98)
    {n:98, tamilName:"Thiru Dwaraka", temple:"Sri Kalyana Narayana Perumal Temple", location:"Dwaraka", district:"Devbhoomi Dwarka", state:"Gujarat", region:"gujarat", subRegion:"Gujarat", distance:"234 km from Rajkot; 148 km from Jamnagar", route:"From Rajkot via Jamnagar to Dwaraka.", travelBase:"Dwaraka"},

    // Uttar Pradesh (99-102)
    {n:99, tamilName:"Thiru Ayodhi", temple:"Sri Ramar Temple", location:"Ayodhya, near Faizabad", district:"Ayodhya", state:"Uttar Pradesh", region:"uttar-pradesh", subRegion:"Uttar Pradesh", distance:"145 km from Lucknow; 8 km from Faizabad", route:"From Lucknow via Faizabad on Faizabad road.", travelBase:"Lucknow or Ayodhya"},
    {n:100, tamilName:"Thiru Naimisaranyam", temple:"Sri Devaraja Perumal Temple", location:"Naimisaranya (Neemsar), near Sitapur", district:"Sitapur", state:"Uttar Pradesh", region:"uttar-pradesh", subRegion:"Uttar Pradesh", distance:"105 km from Lucknow via Sandila", route:"From Lucknow to Neemsar via Sandila.", travelBase:"Lucknow or Neemsar"},
    {n:101, tamilName:"Thiruvaaipadi (Aayarpadi)", temple:"Sri Navamohana Krishna Perumal Temple", location:"Gokul, near Mathura", district:"Mathura", state:"Uttar Pradesh", region:"uttar-pradesh", subRegion:"Uttar Pradesh", distance:"18 km from Mathura", route:"From Mathura via Tank Chauraha, across Gokul Bridge.", travelBase:"Mathura"},
    {n:102, tamilName:"Thiru Vadamathura (Govardhanesan)", temple:"Sri Govardhana Nesa Perumal Temple", location:"Vrindavan & Mathura", district:"Mathura", state:"Uttar Pradesh", region:"uttar-pradesh", subRegion:"Uttar Pradesh", distance:"18 km from Mathura to Vrindavan", route:"Visit Sri Krishna Janma Boomi (Mathura) first, then Sri Ranganatha Temple (Vrindavan) via Pagal Baba Road.", travelBase:"Mathura"},

    // Uttarakhand (103-105)
    {n:103, tamilName:"Thirukkandam (Devaprayag)", temple:"Sri Neelamega Perumal Temple", location:"Devaprayag (Kadinagar)", district:"Tehri Garhwal", state:"Uttarakhand", region:"uttarakhand", subRegion:"Uttarakhand", distance:"105 km from Haridwar via Rishikesh", route:"Via Rishikesh to Devaprayag. Temple at confluence of Alakananda and Bhagirathi rivers forming the Ganga. Scenic journey — sit on driver's side.", travelBase:"Haridwar (proceed to Badrinath)"},
    {n:104, tamilName:"Thiruppirudhi (Joshimutt)", temple:"Sri Paramapurusha Perumal Temple", location:"Joshimath", district:"Chamoli", state:"Uttarakhand", region:"uttarakhand", subRegion:"Uttarakhand", distance:"180 km from Devaprayag; 275 km from Haridwar", route:"Via Srinagar, Rudraprayag, Karnaprayag, Nandaprayag, Chamoli. Visit Narasimha Mandir and Vasudev Mandir.", travelBase:"Joshimath"},
    {n:105, tamilName:"Thiruvadhari Ashramam (Badrinath)", temple:"Sri Badri Narayana Perumal Temple", location:"Badrinath", district:"Chamoli", state:"Uttarakhand", region:"uttarakhand", subRegion:"Uttarakhand", distance:"46 km from Joshimath; 320 km from Haridwar", route:"From Joshimath via Pandukeshwar and Hanuman Chatti.", travelBase:"Badrinath"},

    // Nepal (106)
    {n:106, tamilName:"Thiru Salagramam (Mukthinath)", temple:"Sri Moorthy Perumal Temple", location:"Mukthinath, near Jomsom", district:"Mustang", state:"Nepal", region:"nepal", subRegion:"Nepal", distance:"From India via Gorakhpur to Bhairawa, Pokhara, Jomsom", route:"Pokhara to Jomsom by flight (~Rs.2000). Jomsom to Mukthinath by jeep + 2 km walk. Stay one night in Jomsom to prevent altitude sickness. Avoid monsoon (Jun-Sep). Indian Voter ID/DL needed. No Rs.500/1000 notes accepted.", travelBase:"Pokhara and Jomsom"},

    // Celestial (107-108)
    {n:107, tamilName:"ThirupPaarkadal (Vyugam)", temple:"Celestial Abode — Kshira Sagara (Milky Ocean)", location:"Celestial Abode", district:"—", state:"Celestial", region:"celestial", subRegion:"Celestial Abodes", distance:"Beyond the earthly realm", route:"The abode of Lord Vishnu reclining on Adisesha in the cosmic Milky Ocean (Kshira Sagara). Accessible through devotion and meditation.", travelBase:"—"},
    {n:108, tamilName:"ThirupParamapadham (Parathuvam)", temple:"Celestial Abode — Sri Vaikuntham", location:"Celestial Abode", district:"—", state:"Celestial", region:"celestial", subRegion:"Celestial Abodes", distance:"Beyond the earthly realm", route:"The supreme abode of Lord Vishnu — Sri Vaikuntham (Paramapada). The ultimate destination of every devotee's spiritual journey.", travelBase:"—"}
];

// ========================================
// 108 Divya Desam - Rendering & Interaction
// ========================================
(function() {
    const dd108List = document.getElementById('dd108List');
    const dd108SearchInput = document.getElementById('dd108SearchInput');
    const dd108Tabs = document.querySelectorAll('.dd108-tab');
    const dd108NoResults = document.getElementById('dd108NoResults');

    if (!dd108List) return;

    let activeRegion = 'all';
    let dd108Query = '';

    function renderDD108() {
        dd108List.innerHTML = '';
        const query = dd108Query.toLowerCase().trim();

        const filtered = divyaDesams.filter(d => {
            const matchRegion = activeRegion === 'all' || d.region === activeRegion;
            const matchSearch = !query ||
                String(d.n).includes(query) ||
                d.tamilName.toLowerCase().includes(query) ||
                d.temple.toLowerCase().includes(query) ||
                d.location.toLowerCase().includes(query) ||
                d.district.toLowerCase().includes(query) ||
                d.state.toLowerCase().includes(query) ||
                d.subRegion.toLowerCase().includes(query);
            return matchRegion && matchSearch;
        });

        if (filtered.length === 0) {
            dd108NoResults.style.display = 'block';
            return;
        }
        dd108NoResults.style.display = 'none';

        let currentSubRegion = '';
        filtered.forEach(d => {
            // Add sub-region header
            if (d.subRegion !== currentSubRegion) {
                currentSubRegion = d.subRegion;
                const header = document.createElement('div');
                header.className = 'dd108-region-header';
                header.innerHTML = `<h3>${currentSubRegion}</h3><span class="dd108-region-state">${d.state}</span>`;
                dd108List.appendChild(header);
            }

            const item = document.createElement('div');
            item.className = 'dd108-item';
            if (d.region === 'celestial') item.classList.add('dd108-celestial');

            item.innerHTML = `
                <div class="dd108-item-header">
                    <span class="dd108-num">${d.n}</span>
                    <div class="dd108-item-info">
                        <div class="dd108-item-tamil">${d.tamilName}</div>
                        <div class="dd108-item-temple">${d.temple}</div>
                        <div class="dd108-item-loc">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            ${d.location}${d.district !== '—' ? ', ' + d.district : ''}
                        </div>
                    </div>
                    <button class="dd108-expand" aria-label="Show details">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </button>
                </div>
                <div class="dd108-item-details">
                    <div class="dd108-detail-row">
                        <span class="dd108-detail-label">Distance</span>
                        <span class="dd108-detail-value">${d.distance}</span>
                    </div>
                    <div class="dd108-detail-row">
                        <span class="dd108-detail-label">Route / Tips</span>
                        <span class="dd108-detail-value">${d.route}</span>
                    </div>
                    <div class="dd108-detail-row">
                        <span class="dd108-detail-label">Travel Base</span>
                        <span class="dd108-detail-value">${d.travelBase}</span>
                    </div>
                </div>
            `;

            // Toggle expand
            const header = item.querySelector('.dd108-item-header');
            header.addEventListener('click', () => {
                item.classList.toggle('expanded');
            });

            dd108List.appendChild(item);
        });
    }

    // Region tabs
    dd108Tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            dd108Tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activeRegion = tab.dataset.region;
            renderDD108();
        });
    });

    // Search
    let dd108SearchTimeout;
    dd108SearchInput.addEventListener('input', (e) => {
        clearTimeout(dd108SearchTimeout);
        dd108SearchTimeout = setTimeout(() => {
            dd108Query = e.target.value;
            renderDD108();
        }, 200);
    });

    // Also handle divyadesam category card click
    const ddCategoryCard = document.querySelector('.category-card[data-category="divyadesam"]');
    if (ddCategoryCard) {
        ddCategoryCard.addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('divyadesam-108').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Initial render
    renderDD108();
})();
