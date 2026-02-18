// ========================================
// Temple Photos - Raw GitHub URLs with SVG Fallback
// ========================================

// Section theme colors: [bg gradient start, bg gradient end, accent, text]
var sectionThemes = {
    dd:              ['%235c1a1a','%233a0f0f','%23c9a84c','Vishnu'],
    pp:              ['%231a3a5c','%230f1f3a','%23c9a84c','Shiva'],
    featured:        ['%23b45a00','%23804000','%23FFD54F','Featured'],
    navagraha:       ['%231a1a5c','%23100f3a','%23FFD700','Navagraha'],
    panchabhootha:   ['%232d5c1a','%231a3a0f','%2390EE90','Pancha Bhootha'],
    vinayagar:       ['%235c1a3a','%233a0f20','%23FF9999','Vinayagar'],
    murugan:         ['%23cc3300','%23991a00','%23FFD54F','Murugan'],
    amman:           ['%238b0000','%23660000','%23FF6B6B','Amman'],
    jyotirlinga:     ['%234a2800','%23331a00','%23FFB300','Jyotirlinga'],
    sapthavidanga:   ['%231a4a5c','%230f2f3a','%2387CEEB','Saptha Vidanga'],
    sapthasthanam:   ['%23cc3300','%23801a00','%23FFCC80','Sapthasthanam'],
    ashtaveerattanam:['%234a1a2d','%23330f1a','%23DDA0DD','Ashtaveerattanam'],
    panchasabhai:    ['%232d1a4a','%231a0f33','%23D8BFD8','Pancha Sabhai'],
    panchaaranya:    ['%231a4a2d','%230f331a','%2398FB98','Panchaaranya'],
    chardham:        ['%23cc6600','%23994d00','%23FFE4B5','Char Dham'],
    shaktipeethas:   ['%238b0000','%23590000','%23FF69B4','Shakti Peethas'],
    navatirupathi:   ['%231a3a5c','%230f2040','%2387CEEB','Nava Tirupathi']
};

// Create SVG placeholder fallback with section theming
function createTempleImage(name, type) {
    var theme = sectionThemes[type] || sectionThemes['dd'];
    var bgStart = theme[0];
    var bgEnd = theme[1];
    var accent = theme[2];
    var label = theme[3] || 'Temple';
    var displayName = name.length > 15 ? name.substring(0, 15) + '..' : name;
    var encodedName = encodeURIComponent(displayName);

    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='220'%3E" +
        "%3Cdefs%3E%3ClinearGradient id='bg' x1='0' y1='0' x2='1' y2='1'%3E" +
        "%3Cstop offset='0' stop-color='" + bgStart + "'/%3E" +
        "%3Cstop offset='1' stop-color='" + bgEnd + "'/%3E" +
        "%3C/linearGradient%3E%3C/defs%3E" +
        "%3Crect width='400' height='220' fill='url(%23bg)'/%3E" +
        "%3Ccircle cx='200' cy='70' r='35' fill='none' stroke='" + accent + "' stroke-width='1.5' opacity='0.3'/%3E" +
        "%3Ctext x='200' y='65' font-family='serif' font-size='28' fill='" + accent + "' text-anchor='middle' opacity='0.5'%3E%E0%AE%93%E0%AE%AE%E0%AF%8D%3C/text%3E" +
        "%3Ctext x='200' y='130' font-family='sans-serif' font-size='16' fill='%23ffffff' text-anchor='middle' font-weight='600'%3E" + encodedName + "%3C/text%3E" +
        "%3Ctext x='200' y='155' font-family='sans-serif' font-size='11' fill='" + accent + "' text-anchor='middle' opacity='0.7'%3E" + encodeURIComponent(label) + "%3C/text%3E" +
        "%3Cline x1='160' y1='170' x2='240' y2='170' stroke='" + accent + "' stroke-width='1' opacity='0.2'/%3E" +
        "%3C/svg%3E";
}

// Temple names for 108 Divya Desam
const dd108Names = {
    1:'Srirangam',2:'Uraiyur',3:'Uttamar',4:'Vellarai',5:'Anbil',6:'Thirupper',7:'Thanjavur',8:'Kandiyur',9:'Koodaloor',10:'Kabisthalam',
    11:'Pullam',12:'Aadhanoor',13:'Sarangapani',14:'Oppiliappan',15:'Nachiyar',16:'Thiruccherai',17:'Kannamangai',18:'Nathan',19:'Velliyankudi',20:'Indhaloor',
    21:'Vazhunthoor',22:'Sirupuliyur',23:'Kannapuram',24:'Naagai',25:'Kannankudi',26:'Akkur',27:'Sirkazhi',28:'Nangur',29:'Devanaar',30:'Thiruvaali',
    31:'Kavalampaadi',32:'Manikkoodam',33:'Paarthanpalli',34:'Manimaada',35:'Arimeya',36:'Thetri',37:'Sempon',38:'Purushothaman',39:'Vaikunda',40:'Chidambaram',
    41:'Vaheendrapuram',42:'Thirukkoviloor',43:'Varadaraja',44:'Ashtabhuja',45:'Thiru Vekka',46:'Velukkai',47:'Thiruthanka',48:'Aadhi Varaha',49:'Ooragam',50:'Neeragam',
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

// Generate photos - use raw GitHub URLs with fallback to SVG
const divyaDesamPhotos = {};
const paadalPetraPhotos = {};

// Base URL for raw GitHub content
const githubRawBase = 'https://raw.githubusercontent.com/royalatr1973/rajarajan/main/tamil-temples';

// For Divya Desam: raw GitHub URLs
for (let i = 1; i <= 108; i++) {
    divyaDesamPhotos[i] = `${githubRawBase}/images/divyadesam/${i}.jpg`;
}

// For Paadal Petra: raw GitHub URLs
for (let i = 1; i <= 276; i++) {
    paadalPetraPhotos[i] = `${githubRawBase}/images/paadalpetra/${i}.jpg`;
}

// Default/fallback images
const defaultDDImage = createTempleImage('Temple', 'dd');
const defaultPPSImage = createTempleImage('Temple', 'pp');

function getDivyaDesamPhoto(n) {
    return divyaDesamPhotos[n] || defaultDDImage;
}

function getPaadalPetraPhoto(n) {
    return paadalPetraPhotos[n] || defaultPPSImage;
}

// Get fallback SVG for when image fails to load
function getDivyaDesamFallback(n) {
    return createTempleImage(dd108Names[n] || 'Temple', 'dd');
}

function getPaadalPetraFallback(n) {
    return createTempleImage(pps276Names[n] || 'Temple', 'pp');
}

// Section-specific fallback generator
function getSectionFallback(sectionType, templeName) {
    return createTempleImage(templeName || 'Temple', sectionType);
}

// Expose globally
window.divyaDesamPhotos = divyaDesamPhotos;
window.paadalPetraPhotos = paadalPetraPhotos;
window.getDivyaDesamPhoto = getDivyaDesamPhoto;
window.getPaadalPetraPhoto = getPaadalPetraPhoto;
window.getDivyaDesamFallback = getDivyaDesamFallback;
window.getPaadalPetraFallback = getPaadalPetraFallback;
window.getSectionFallback = getSectionFallback;
window.createTempleImage = createTempleImage;
window.defaultDDImage = defaultDDImage;
window.defaultPPSImage = defaultPPSImage;

console.log('Temple photos configured:', Object.keys(divyaDesamPhotos).length, 'Divya Desam,', Object.keys(paadalPetraPhotos).length, 'Paadal Petra');
