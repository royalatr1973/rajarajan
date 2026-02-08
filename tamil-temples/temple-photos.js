// ========================================
// Temple Photos - Embedded SVG Images
// These images are embedded directly and will always work
// ========================================

// Create SVG placeholder with temple name
function createTempleImage(name, type) {
    const bgColor = type === 'shiva' ? '#5c1a1a' : '#1e3a5f';
    const textColor = '#c9a84c';
    const displayName = name.length > 15 ? name.substring(0, 15) + '...' : name;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
        <rect width="320" height="320" fill="${bgColor}"/>
        <text x="160" y="140" font-family="Georgia, serif" font-size="20" fill="${textColor}" text-anchor="middle">🕉️</text>
        <text x="160" y="180" font-family="Georgia, serif" font-size="16" fill="${textColor}" text-anchor="middle" font-weight="bold">${displayName}</text>
        <text x="160" y="210" font-family="Georgia, serif" font-size="12" fill="${textColor}" text-anchor="middle" opacity="0.7">${type === 'shiva' ? 'Shiva Temple' : 'Vishnu Temple'}</text>
    </svg>`;

    return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

// 108 Divya Desam Photos (Vishnu Temples)
const divyaDesamPhotos = {};
const divyaDesamNames = {
    1: 'Srirangam', 2: 'Uraiyur', 3: 'Uttamar Kovil', 4: 'Thiruvellarai', 5: 'Anbil',
    6: 'Thirupper Nagar', 7: 'Thanjavur', 8: 'Kandiyur', 9: 'Koodaloor', 10: 'Kabisthalam',
    11: 'Pullam Boothankudi', 12: 'Aadhanoor', 13: 'Sarangapani', 14: 'Oppiliappan', 15: 'Nachiyar Kovil',
    16: 'Thiruccherai', 17: 'Kannamangai', 18: 'Nathan Kovil', 19: 'Velliyankudi', 20: 'Indhaloor',
    21: 'Vazhunthoor', 22: 'Sirupuliyur', 23: 'Kannapuram', 24: 'Naagai', 25: 'Kannankudi',
    26: 'Akkur', 27: 'Sirkazhi', 28: 'Nangur', 29: 'Devanaar Thogai', 30: 'Thiruvaali',
    31: 'Kavalampaadi', 32: 'Manikkoodam', 33: 'Paarthanpalli', 34: 'Manimaada Kovil', 35: 'Arimeya Vinnagaram',
    36: 'Thetri Aambalam', 37: 'Sempon Sei', 38: 'Purushothaman', 39: 'Vaikunda Vinnagaram', 40: 'Chidambaram',
    41: 'Thiruvaheendrapuram', 42: 'Thirukkoviloor', 43: 'Varadaraja Perumal', 44: 'Ashtabhuyakaram', 45: 'Thiru Vekka',
    46: 'Thiru Velukkai', 47: 'Thiruthanka', 48: 'Aadhi Varaha', 49: 'Thiru Ooragam', 50: 'Thiru Neeragam',
    51: 'Thiru Kaaragam', 52: 'Thirukkaar Vaanam', 53: 'Vaikunda Perumal', 54: 'Pavala Vannan', 55: 'Nilathingal',
    56: 'Pandava Thoothar', 57: 'Thiruputkuzhi', 58: 'Parthasarathy', 59: 'Thiruneermalai', 60: 'Thiruvedanthai',
    61: 'Mahabalipuram', 62: 'Thirunindravur', 63: 'Tiruvallur', 64: 'Sholingur', 65: 'Koodal Azhagar',
    66: 'Thiru Moghur', 67: 'Alagar Kovil', 68: 'Thirukottiyur', 69: 'Thirumayam', 70: 'Thiruppullani',
    71: 'Sivakasi', 72: 'Srivilliputhur', 73: 'Sri Vaikundam', 74: 'Varagunamangai', 75: 'Pulingudu',
    76: 'Kulanthai', 77: 'Villimangalam', 78: 'Thirupperai', 79: 'Thirukkurungudi', 80: 'Thiruvankadu',
    81: 'Thiruvaramangai', 82: 'Thirukulandhai', 83: 'Thiru Ther', 84: 'Thiruchithirakudam', 85: 'Padmanabhaswamy',
    86: 'Thirukatkarai', 87: 'Thirumoozhikalam', 88: 'Thirunavai', 89: 'Thiruvittuvacode', 90: 'Thiruvanparisaram',
    91: 'Thiruvaranvillai', 92: 'Thiruvattaru', 93: 'Thiruvananthapuram', 94: 'Ahobilam', 95: 'Simhachalam',
    96: 'Tirupati', 97: 'Thiruvenkatam', 98: 'Thirunarayanapuram', 99: 'Srirangapatnam', 100: 'Thiruppadi',
    101: 'Dwaraka', 102: 'Mathura', 103: 'Gokul', 104: 'Ayodhya', 105: 'Badrinath',
    106: 'Naimisaranya', 107: 'Jagannath Puri', 108: 'Thirupparkadal'
};

for (let i = 1; i <= 108; i++) {
    divyaDesamPhotos[i] = createTempleImage(divyaDesamNames[i] || 'Temple ' + i, 'vishnu');
}

// 276 Paadal Petra Sthalams Photos (Shiva Temples)
const paadalPetraPhotos = {};
const paadalPetraNames = {
    1: 'Thirumazhapadi', 2: 'Keezhapaluvur', 3: 'Chidambaram', 4: 'Thiruvedikalam', 5: 'Sivapuri',
    6: 'Thirukkazhippalai', 7: 'Omampuliyur', 8: 'Kanattampuliyur', 9: 'Thirunaraiyur', 10: 'Melakkadambur',
    11: 'Panthanallur', 12: 'Kanjanur', 13: 'Thirukkodikaval', 14: 'Thirumangalakudi', 15: 'Thiruppanandal',
    16: 'Thiruvaiyapadi', 17: 'Senganoor', 18: 'Thirundudevankudi', 19: 'Thiruvisanallur', 20: 'Kottaiyur',
    21: 'Innamboor', 22: 'Thiruppurambiyam', 23: 'Thiruvijayamangai', 24: 'Thiruvaikavoor', 25: 'Vadakurangaduthurai',
    26: 'Thirupazhanam', 27: 'Thiruvaiyaru', 28: 'Thillaisthanam', 29: 'Thiruperumpuliyur', 30: 'Thirukkanur',
    31: 'Anbil', 32: 'Mandurai', 33: 'Thiruppatthurai', 34: 'Jambukeswarar', 35: 'Thiruppainjeeli',
    36: 'Thiruvasi', 37: 'Ingoimalai', 38: 'Achalpuram', 39: 'Makendrapalli', 40: 'Thirumullaivasal',
    41: 'Annapanpettai', 42: 'Saiyavanam', 43: 'Poompukar', 44: 'Thiruvenkadu', 45: 'Thirukkattupalli',
    46: 'Thirukuruvaikavoor', 47: 'Sirkazhi', 48: 'Thirukolakka', 49: 'Vaitheeswaran', 50: 'Kurumanakkudi',
    51: 'Keelaiyur', 52: 'Thirunindriyur', 53: 'Thiruppunkoor', 54: 'Needur', 55: 'Ponnoor',
    56: 'Thiruvelvikudi', 57: 'Melathirumananjeri', 58: 'Thirumananjeri', 59: 'Korukkai', 60: 'Thalainayiru',
    61: 'Thirukkurakka', 62: 'Thiruvalapputhur', 63: 'Iluppai Pattu', 64: 'Kulithalai', 65: 'Ayyar Malai',
    66: 'Thirunallaru', 67: 'Kumbakonam', 68: 'Thirunageswaram', 69: 'Thiruvidaimarudur', 70: 'Rockfort Trichy',
    71: 'Thiruvarur', 72: 'Thirukadaiyur', 73: 'Mayiladuthurai', 74: 'Ekambareswarar', 75: 'Srikalahasti',
    76: 'Kapaleeswarar', 77: 'Marundeeswarar', 78: 'Arunachaleswarar', 79: 'Thiruvalangadu', 80: 'Thiruverkadu',
    81: 'Meenakshi Temple', 82: 'Rameswaram', 83: 'Nellaiappar', 84: 'Courtallam', 85: 'Thiruparankundram',
    86: 'Avinashi', 87: 'Thirumuruganpundi', 88: 'Bhavani', 89: 'Arthanareeswarar', 90: 'Kodumudi',
    91: 'Karur', 92: 'Srisailam', 93: 'Kedarnath', 94: 'Koneswaram', 95: 'Ketheeswaram'
};

for (let i = 1; i <= 276; i++) {
    paadalPetraPhotos[i] = createTempleImage(paadalPetraNames[i] || 'Temple ' + i, 'shiva');
}

// Default temple image
const defaultTempleImage = createTempleImage('Temple', 'vishnu');

// Get photo for Divya Desam
function getDivyaDesamPhoto(n) {
    return divyaDesamPhotos[n] || createTempleImage('Temple ' + n, 'vishnu');
}

// Get photo for Paadal Petra Sthalam
function getPaadalPetraPhoto(n) {
    return paadalPetraPhotos[n] || createTempleImage('Temple ' + n, 'shiva');
}

// Expose globally
window.divyaDesamPhotos = divyaDesamPhotos;
window.paadalPetraPhotos = paadalPetraPhotos;
window.getDivyaDesamPhoto = getDivyaDesamPhoto;
window.getPaadalPetraPhoto = getPaadalPetraPhoto;
window.defaultTempleImage = defaultTempleImage;

console.log('Temple photos loaded successfully!');
