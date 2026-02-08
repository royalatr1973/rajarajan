// ========================================
// Temple Photos - Enhanced SVG Temple Icons
// ========================================

// Create temple gopuram SVG icon
function createTempleIcon(name, type, isSpecial = false) {
    const bgColor = type === 'shiva' ? '#5c1a1a' : '#1e3a5f';
    const accentColor = type === 'shiva' ? '#8b2323' : '#2d5a8f';
    const goldColor = '#c9a84c';
    const displayName = name.length > 10 ? name.substring(0, 10) : name;

    // Special colorful design for famous temples
    if (isSpecial) {
        return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#87CEEB"/>
      <stop offset="100%" style="stop-color:#f0f8ff"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" fill="url(#sky)"/>
  <!-- Base -->
  <rect x="20" y="75" width="60" height="15" fill="#8B4513" stroke="#654321" stroke-width="1"/>
  <!-- Main tower body -->
  <polygon points="25,75 30,35 70,35 75,75" fill="#c9a84c" stroke="#8b7355" stroke-width="1"/>
  <!-- Tower tiers -->
  <rect x="28" y="55" width="44" height="5" fill="#e74c3c"/>
  <rect x="30" y="45" width="40" height="5" fill="#3498db"/>
  <rect x="32" y="35" width="36" height="5" fill="#2ecc71"/>
  <!-- Top structure -->
  <polygon points="35,35 50,10 65,35" fill="#9b59b6" stroke="#8e44ad" stroke-width="1"/>
  <!-- Kalasam -->
  <ellipse cx="50" cy="8" rx="4" ry="3" fill="#FFD700"/>
  <!-- Windows/details -->
  <rect x="38" y="60" width="8" height="10" fill="#2c3e50"/>
  <rect x="54" y="60" width="8" height="10" fill="#2c3e50"/>
  <rect x="45" y="42" width="10" height="8" fill="#2c3e50"/>
  <!-- Temple name -->
  <text x="50" y="96" font-family="Arial" font-size="8" fill="#333" text-anchor="middle" font-weight="bold">${displayName}</text>
</svg>`)}`;
    }

    // Standard temple gopuram design
    return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="${bgColor}"/>
  <!-- Gopuram outline -->
  <polygon points="25,85 30,40 50,15 70,40 75,85" fill="${accentColor}" stroke="${goldColor}" stroke-width="1.5"/>
  <!-- Tiers -->
  <line x1="28" y1="55" x2="72" y2="55" stroke="${goldColor}" stroke-width="1"/>
  <line x1="30" y1="45" x2="70" y2="45" stroke="${goldColor}" stroke-width="1"/>
  <line x1="35" y1="35" x2="65" y2="35" stroke="${goldColor}" stroke-width="1"/>
  <line x1="40" y1="25" x2="60" y2="25" stroke="${goldColor}" stroke-width="1"/>
  <!-- Kalasam -->
  <ellipse cx="50" cy="12" rx="5" ry="4" fill="${goldColor}"/>
  <!-- Base -->
  <rect x="20" y="80" width="60" height="10" fill="${accentColor}" stroke="${goldColor}" stroke-width="1"/>
  <!-- Door -->
  <rect x="40" y="65" width="20" height="20" fill="#1a1a1a" rx="2"/>
  <!-- Temple name -->
  <text x="50" y="96" font-family="Arial" font-size="7" fill="${goldColor}" text-anchor="middle">${displayName}</text>
</svg>`)}`;
}

// Special famous temples list (indices)
const famousDivyaDesams = [1, 13, 14, 15, 43, 58, 67, 72, 85, 96]; // Srirangam, Sarangapani, etc.
const famousPaadalPetra = [3, 34, 66, 70, 71, 72, 74, 75, 78, 81, 82]; // Chidambaram, Jambukeswarar, Meenakshi, etc.

// Temple names for 108 Divya Desam
const dd108Names = {
    1:'Srirangam',2:'Uraiyur',3:'Uttamar',4:'Vellarai',5:'Anbil',6:'Thirupper',7:'Thanjavur',8:'Kandiyur',9:'Koodaloor',10:'Kabisthalam',
    11:'Pullam',12:'Aadhanoor',13:'Sarangapani',14:'Oppiliappan',15:'Nachiyar',16:'Thiruccherai',17:'Kannamangai',18:'Nathan',19:'Velliyankudi',20:'Indhaloor',
    21:'Vazhunthoor',22:'Sirupuliyur',23:'Kannapuram',24:'Naagai',25:'Kannankudi',26:'Akkur',27:'Sirkazhi',28:'Nangur',29:'Devanaar',30:'Thiruvaali',
    31:'Kavalampaadi',32:'Manikkoodam',33:'Paarthanpalli',34:'Manimaada',35:'Arimeya',36:'Thetri',37:'Sempon',38:'Purushothaman',39:'Vaikunda',40:'Chidambaram',
    41:'Vaheendrapuram',42:'Thirukkoviloor',43:'Varadharaja',44:'Ashtabhuja',45:'Thiru Vekka',46:'Velukkai',47:'Thiruthanka',48:'Aadhi Varaha',49:'Ooragam',50:'Neeragam',
    51:'Kaaragam',52:'Kaar Vaanam',53:'Vaikunda',54:'Pavala',55:'Nilathingal',56:'Pandava',57:'Thiruputkuzhi',58:'Parthasarathy',59:'Thiruneermalai',60:'Thiruvedanthai',
    61:'Mahabalipuram',62:'Thirunindravur',63:'Tiruvallur',64:'Sholingur',65:'Koodal',66:'Moghur',67:'Alagar Kovil',68:'Thirukottiyur',69:'Thirumayam',70:'Thiruppullani',
    71:'Sivakasi',72:'Srivilliputhur',73:'Vaikundam',74:'Varagunamangai',75:'Pulingudu',76:'Kulanthai',77:'Villimangalam',78:'Thirupperai',79:'Kurungudi',80:'Thiruvankadu',
    81:'Thiruvaramangai',82:'Thirukulandhai',83:'Thiru Ther',84:'Thiruchithirakudam',85:'Padmanabha',86:'Thirukatkarai',87:'Thirumoozhikalam',88:'Thirunavai',89:'Thiruvittuvacode',90:'Thiruvanparisaram',
    91:'Thiruvaranvillai',92:'Thiruvattaru',93:'Thiruvananthapuram',94:'Ahobilam',95:'Simhachalam',96:'Tirupati',97:'Thiruvenkatam',98:'Thirunarayanapuram',99:'Srirangapatnam',100:'Thiruppadi',
    101:'Dwaraka',102:'Mathura',103:'Gokul',104:'Ayodhya',105:'Badrinath',106:'Naimisaranya',107:'Jagannath',108:'Thirupparkadal'
};

// Temple names for 276 Paadal Petra Sthalams
const pps276Names = {
    1:'Thirumazhapadi',2:'Keezhapaluvur',3:'Chidambaram',4:'Thiruvedikalam',5:'Sivapuri',6:'Thirukkazhippalai',7:'Omampuliyur',8:'Kanattampuliyur',9:'Thirunaraiyur',10:'Melakkadambur',
    11:'Panthanallur',12:'Kanjanur',13:'Thirukkodikaval',14:'Thirumangalakudi',15:'Thiruppanandal',16:'Thiruvaiyapadi',17:'Senganoor',18:'Thirundudevankudi',19:'Thiruvisanallur',20:'Kottaiyur',
    21:'Innamboor',22:'Thiruppurambiyam',23:'Thiruvijayamangai',24:'Thiruvaikavoor',25:'Vadakurangaduthurai',26:'Thirupazhanam',27:'Thiruvaiyaru',28:'Thillaisthanam',29:'Thiruperumpuliyur',30:'Thirukkanur',
    31:'Anbil',32:'Mandurai',33:'Thiruppatthurai',34:'Jambukeswarar',35:'Thiruppainjeeli',36:'Thiruvasi',37:'Ingoimalai',38:'Achalpuram',39:'Makendrapalli',40:'Thirumullaivasal',
    41:'Annapanpettai',42:'Saiyavanam',43:'Poompukar',44:'Thiruvenkadu',45:'Thirukkattupalli',46:'Thirukuruvaikavoor',47:'Sirkazhi',48:'Thirukolakka',49:'Vaitheeswaran',50:'Kurumanakkudi',
    51:'Keelaiyur',52:'Thirunindriyur',53:'Thiruppunkoor',54:'Needur',55:'Ponnoor',56:'Thiruvelvikudi',57:'Melathirumananjeri',58:'Thirumananjeri',59:'Korukkai',60:'Thalainayiru',
    61:'Thirukkurakka',62:'Thiruvalapputhur',63:'Iluppai',64:'Kulithalai',65:'Ayyar Malai',66:'Thirunallaru',67:'Kumbakonam',68:'Thirunageswaram',69:'Thiruvidaimarudur',70:'Rockfort',
    71:'Thiruvarur',72:'Thirukadaiyur',73:'Mayiladuthurai',74:'Ekambareswarar',75:'Srikalahasti',76:'Kapaleeswarar',77:'Marundeeswarar',78:'Arunachaleswarar',79:'Thiruvalangadu',80:'Thiruverkadu',
    81:'Meenakshi',82:'Rameswaram',83:'Nellaiappar',84:'Courtallam',85:'Thiruparankundram',86:'Avinashi',87:'Thirumuruganpundi',88:'Bhavani',89:'Arthanareeswarar',90:'Kodumudi',
    91:'Karur',92:'Srisailam',93:'Kedarnath',94:'Koneswaram',95:'Ketheeswaram'
};

// Generate all photos
const divyaDesamPhotos = {};
const paadalPetraPhotos = {};

for (let i = 1; i <= 108; i++) {
    const isSpecial = famousDivyaDesams.includes(i);
    divyaDesamPhotos[i] = createTempleIcon(dd108Names[i] || 'Temple', 'vishnu', isSpecial);
}

for (let i = 1; i <= 276; i++) {
    const isSpecial = famousPaadalPetra.includes(i);
    paadalPetraPhotos[i] = createTempleIcon(pps276Names[i] || 'Temple', 'shiva', isSpecial);
}

const defaultTempleImage = createTempleIcon('Temple', 'vishnu', false);

function getDivyaDesamPhoto(n) {
    return divyaDesamPhotos[n] || defaultTempleImage;
}

function getPaadalPetraPhoto(n) {
    return paadalPetraPhotos[n] || defaultTempleImage;
}

// Expose globally
window.divyaDesamPhotos = divyaDesamPhotos;
window.paadalPetraPhotos = paadalPetraPhotos;
window.getDivyaDesamPhoto = getDivyaDesamPhoto;
window.getPaadalPetraPhoto = getPaadalPetraPhoto;
window.defaultTempleImage = defaultTempleImage;

console.log('Temple photos loaded!', Object.keys(divyaDesamPhotos).length, 'Divya Desam,', Object.keys(paadalPetraPhotos).length, 'Paadal Petra');
