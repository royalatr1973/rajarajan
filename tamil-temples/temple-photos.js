// ========================================
// Temple Photos Configuration
// ========================================

// Using placeholder images that are guaranteed to work
// Replace these with actual temple photos when available

// Placeholder image generator function
function getPlaceholderImage(name, color) {
    // Using a simple colored placeholder with temple name
    const colors = {
        vishnu: '1e3a5f',  // Dark blue for Vishnu temples
        shiva: '5c1a1a'    // Dark maroon for Shiva temples
    };
    const bgColor = colors[color] || '2d2d2d';
    const text = encodeURIComponent(name.substring(0, 20));
    return `https://placehold.co/320x320/${bgColor}/c9a84c?text=${text}&font=playfair-display`;
}

// 108 Divya Desam Photos
const divyaDesamPhotos = {
    1: getPlaceholderImage('Srirangam', 'vishnu'),
    7: getPlaceholderImage('Thanjavur', 'vishnu'),
    13: getPlaceholderImage('Sarangapani', 'vishnu'),
    40: getPlaceholderImage('Chidambaram', 'vishnu'),
    43: getPlaceholderImage('Varadaraja', 'vishnu'),
    58: getPlaceholderImage('Parthasarathy', 'vishnu'),
    65: getPlaceholderImage('Koodal Azhagar', 'vishnu'),
    67: getPlaceholderImage('Alagar Kovil', 'vishnu'),
    72: getPlaceholderImage('Andal Temple', 'vishnu'),
    85: getPlaceholderImage('Padmanabhaswamy', 'vishnu'),
    96: getPlaceholderImage('Tirupati', 'vishnu'),
    105: getPlaceholderImage('Badrinath', 'vishnu'),
    107: getPlaceholderImage('Jagannath Puri', 'vishnu')
};

// 276 Paadal Petra Sthalams Photos
const paadalPetraPhotos = {
    3: getPlaceholderImage('Chidambaram', 'shiva'),
    34: getPlaceholderImage('Jambukeswarar', 'shiva'),
    49: getPlaceholderImage('Vaitheeswaran', 'shiva'),
    66: getPlaceholderImage('Thirunallaru', 'shiva'),
    67: getPlaceholderImage('Kumbeswarar', 'shiva'),
    70: getPlaceholderImage('Rockfort', 'shiva'),
    71: getPlaceholderImage('Thyagarajar', 'shiva'),
    74: getPlaceholderImage('Ekambareswarar', 'shiva'),
    75: getPlaceholderImage('Srikalahasti', 'shiva'),
    76: getPlaceholderImage('Kapaleeswarar', 'shiva'),
    78: getPlaceholderImage('Arunachaleswarar', 'shiva'),
    81: getPlaceholderImage('Meenakshi', 'shiva'),
    82: getPlaceholderImage('Rameswaram', 'shiva'),
    83: getPlaceholderImage('Nellaiappar', 'shiva'),
    92: getPlaceholderImage('Srisailam', 'shiva'),
    93: getPlaceholderImage('Kedarnath', 'shiva'),
    94: getPlaceholderImage('Koneswaram', 'shiva')
};

// Default temple image - Om symbol placeholder
const defaultTempleImage = getPlaceholderImage('Temple', 'vishnu');

// Get photo for Divya Desam
function getDivyaDesamPhoto(n) {
    return divyaDesamPhotos[n] || getPlaceholderImage('Temple ' + n, 'vishnu');
}

// Get photo for Paadal Petra Sthalam
function getPaadalPetraPhoto(n) {
    return paadalPetraPhotos[n] || getPlaceholderImage('Temple ' + n, 'shiva');
}

// Expose globally
window.divyaDesamPhotos = divyaDesamPhotos;
window.paadalPetraPhotos = paadalPetraPhotos;
window.getDivyaDesamPhoto = getDivyaDesamPhoto;
window.getPaadalPetraPhoto = getPaadalPetraPhoto;
window.defaultTempleImage = defaultTempleImage;
