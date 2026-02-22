// ========================================
// Church Photos — Fallback SVG Generator & Section Themes
// ========================================

// Section color themes for fallback images
window.sectionThemes = {
    basilica:    { bg: '#1B3A5C', accent: '#C9A84C', icon: '⛪' },
    heritage:    { bg: '#5C3A1B', accent: '#D4A84C', icon: '🏛️' },
    goa:         { bg: '#2E7D32', accent: '#FFF176', icon: '⛪' },
    kerala:      { bg: '#1565C0', accent: '#FFB74D', icon: '⛪' },
    tamilnadu:   { bg: '#C62828', accent: '#FFD54F', icon: '⛪' },
    northeast:   { bg: '#4A148C', accent: '#CE93D8', icon: '⛪' },
    catholic:    { bg: '#880E4F', accent: '#F8BBD0', icon: '✝️' },
    orthodox:    { bg: '#1A237E', accent: '#90CAF9', icon: '☦️' },
    csi:         { bg: '#004D40', accent: '#80CBC4', icon: '✝️' },
    protestant:  { bg: '#E65100', accent: '#FFE0B2', icon: '✝️' },
    pilgrimage:  { bg: '#4E342E', accent: '#BCAAA4', icon: '🙏' },
    featured:    { bg: '#1B3A5C', accent: '#C9A84C', icon: '⭐' }
};

// Generate themed SVG fallback for a church
window.getSectionFallback = function(sectionType, name) {
    const theme = window.sectionThemes[sectionType] || window.sectionThemes.featured;
    const displayName = (name || 'Church').substring(0, 30);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
        <rect width="400" height="300" fill="${theme.bg}"/>
        <rect x="0" y="0" width="400" height="300" fill="url(#grad)" opacity="0.3"/>
        <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${theme.accent};stop-opacity:0.3"/>
                <stop offset="100%" style="stop-color:${theme.bg};stop-opacity:0"/>
            </linearGradient>
        </defs>
        <!-- Cross symbol -->
        <line x1="200" y1="60" x2="200" y2="160" stroke="${theme.accent}" stroke-width="4" opacity="0.4"/>
        <line x1="170" y1="90" x2="230" y2="90" stroke="${theme.accent}" stroke-width="4" opacity="0.4"/>
        <!-- Church silhouette -->
        <rect x="160" y="130" width="80" height="70" fill="${theme.accent}" opacity="0.15" rx="2"/>
        <polygon points="200,100 160,130 240,130" fill="${theme.accent}" opacity="0.15"/>
        <!-- Text -->
        <text x="200" y="240" text-anchor="middle" fill="${theme.accent}" font-family="Georgia,serif" font-size="16" opacity="0.9">${displayName}</text>
        <text x="200" y="265" text-anchor="middle" fill="${theme.accent}" font-family="sans-serif" font-size="11" opacity="0.5">Churches of India</text>
    </svg>`;

    return 'data:image/svg+xml,' + encodeURIComponent(svg);
};

// Image error handler
window.handleImageError = function(img, sectionType, name) {
    img.onerror = null;
    img.src = window.getSectionFallback(sectionType, name);
};
