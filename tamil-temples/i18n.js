// ========================================
// Tamil/English Bilingual Toggle
// Adds a language switcher to the header
// ========================================
(function () {
  var STORAGE_KEY = 'templeLang';
  var currentLang = 'en';
  try { currentLang = localStorage.getItem(STORAGE_KEY) || 'en'; } catch (e) {}

  // Tamil translations for UI labels
  var translations = {
    en: {
      home: 'Home',
      search: 'Search temple name, location, deity...',
      sectionSearch: 'Search temples in this section...',
      browseTitle: 'Browse by Sacred Tradition',
      browseDesc: 'Each category opens as a separate page with section-specific temple search and card listing.',
      categories: 'Temple Categories',
      globalSearch: 'Global Temple Search',
      globalSearchDesc: 'Search across all available sections from one place.',
      heroTitle: 'Experience Timeless Temple Grandeur',
      heroText: 'A curated temple discovery portal with global search, dedicated section pages, and detailed temple profiles with gopuram images.',
      explore1: 'Explore Divya Desam',
      explore2: 'Explore Shiva Temples',
      sacred: 'Sacred Heritage of South India',
      pilgrimage: 'Pilgrimage Progress',
      visited: 'visited',
      visitedHint: 'Click the check mark on any temple card to mark it as visited.',
      markVisited: 'Mark as Visited',
      visitedLabel: 'Visited',
      downloadPdf: 'Download PDF Guide',
      tourTitle: 'Pilgrimage Tour Packages',
      tourDesc: 'Curated packages from popular tour operators for this temple circuit.',
      viewPackage: 'View Package',
      festivalTitle: 'Festival Calendar',
      nearbyTitle: 'Temples Near You',
      findNearby: 'Find Nearby Temples',
      panchang: 'Daily Panchang',
      langLabel: 'EN'
    },
    ta: {
      home: 'முகப்பு',
      search: 'கோயில் பெயர், இடம், தெய்வம் தேடுங்கள்...',
      sectionSearch: 'இந்தப் பிரிவில் கோயில்களைத் தேடுங்கள்...',
      browseTitle: 'புனித மரபின்படி உலாவுங்கள்',
      browseDesc: 'ஒவ்வொரு வகையும் பிரிவு வாரியான கோயில் தேடல் மற்றும் அட்டை பட்டியலுடன் தனிப் பக்கமாகத் திறக்கிறது.',
      categories: 'கோயில் வகைகள்',
      globalSearch: 'உலகளாவிய கோயில் தேடல்',
      globalSearchDesc: 'அனைத்து பிரிவுகளிலும் ஒரே இடத்தில் தேடுங்கள்.',
      heroTitle: 'காலத்தை வென்ற கோயில் மாட்சிமையை அனுபவியுங்கள்',
      heroText: 'உலகளாவிய தேடல், பிரிவு பக்கங்கள் மற்றும் கோபுர படங்களுடன் விரிவான கோயில் சுயவிவரங்கள் கொண்ட கோயில் கண்டுபிடிப்பு தளம்.',
      explore1: 'திவ்ய தேசம் காண்க',
      explore2: 'சிவன் கோயில்கள் காண்க',
      sacred: 'தென்னிந்தியாவின் புனித பாரம்பரியம்',
      pilgrimage: 'யாத்திரை முன்னேற்றம்',
      visited: 'வருகை தந்தது',
      visitedHint: 'வருகை தந்ததாகக் குறிக்க எந்த கோயில் அட்டையிலும் சரிகுறியை கிளிக் செய்யவும்.',
      markVisited: 'வருகை குறிக்கவும்',
      visitedLabel: 'வருகை தந்தது',
      downloadPdf: 'PDF வழிகாட்டி பதிவிறக்கம்',
      tourTitle: 'யாத்திரை சுற்றுலா தொகுப்புகள்',
      tourDesc: 'இந்த கோயில் சுற்றுக்கான பிரபலமான சுற்றுலா நிறுவனங்களின் தொகுப்புகள்.',
      viewPackage: 'தொகுப்பைக் காண்க',
      festivalTitle: 'திருவிழா நாட்காட்டி',
      nearbyTitle: 'அருகிலுள்ள கோயில்கள்',
      findNearby: 'அருகிலுள்ள கோயில்களைக் கண்டறிக',
      panchang: 'தினசரி பஞ்சாங்கம்',
      langLabel: 'தமிழ்'
    }
  };

  // Section name translations
  var sectionTranslations = {
    ta: {
      '108 Divya Desam': '108 திவ்ய தேசம்',
      '276 Paadal Petra Sthalams': '276 பாடல் பெற்ற ஸ்தலங்கள்',
      '12 Jyotirlinga': '12 ஜோதிர்லிங்கம்',
      'Murugan Temples': 'முருகன் கோயில்கள்',
      'Amman Temples': 'அம்மன் கோயில்கள்',
      'Vinayagar Temples': 'விநாயகர் கோயில்கள்',
      'Navagraha Temples': 'நவக்கிரக கோயில்கள்',
      'Pancha Bhootha Temples': 'பஞ்ச பூத ஸ்தலங்கள்',
      'Featured Temples': 'சிறப்பு கோயில்கள்',
      'Char Dham': 'சார் தாம்',
      'Shakti Peethas': 'சக்தி பீடங்கள்',
      'Nava Tirupathi': 'நவ திருப்பதி',
      'Saptha Vidanga': 'சப்த விடங்க ஸ்தலங்கள்',
      'Saptha Sthanam': 'சப்த ஸ்தானம்',
      'Ashta Veerattanam': 'அஷ்ட வீரட்டானம்',
      'Pancha Sabhai': 'பஞ்ச சபை',
      'Pancha Aranya': 'பஞ்ச ஆரண்யம்',
      'Kumbakonam Temples': 'கும்பகோணம் கோயில்கள்',
      'Kanchipuram Temples': 'காஞ்சிபுரம் கோயில்கள்'
    }
  };

  // Inject language toggle button into nav
  var navEl = document.querySelector('.nav nav') || document.querySelector('nav');
  if (navEl) {
    var toggle = document.createElement('button');
    toggle.id = 'langToggle';
    toggle.className = 'lang-toggle';
    toggle.textContent = currentLang === 'en' ? 'தமிழ்' : 'EN';
    toggle.title = currentLang === 'en' ? 'Switch to Tamil' : 'Switch to English';
    toggle.addEventListener('click', function () {
      currentLang = currentLang === 'en' ? 'ta' : 'en';
      try { localStorage.setItem(STORAGE_KEY, currentLang); } catch (e) {}
      toggle.textContent = currentLang === 'en' ? 'தமிழ்' : 'EN';
      toggle.title = currentLang === 'en' ? 'Switch to Tamil' : 'Switch to English';
      applyTranslations();
    });
    navEl.appendChild(toggle);
  }

  function applyTranslations() {
    var t = translations[currentLang] || translations.en;
    document.documentElement.lang = currentLang === 'ta' ? 'ta' : 'en';

    // Home page elements
    var el;
    el = document.getElementById('globalSearch');
    if (el) el.placeholder = t.search;

    el = document.getElementById('sectionSearch');
    if (el) el.placeholder = t.sectionSearch;

    // Hero
    el = document.querySelector('.hero h1');
    if (el && el.closest('.hero-home')) el.textContent = t.heroTitle;

    el = document.querySelector('.hero-text');
    if (el) el.textContent = t.heroText;

    el = document.querySelector('.hero .eyebrow');
    if (el) el.textContent = t.sacred;

    // Hero buttons
    var btns = document.querySelectorAll('.hero-btn');
    if (btns.length >= 2) {
      btns[0].textContent = t.explore1;
      btns[1].textContent = t.explore2;
    }

    // Browse section
    el = document.querySelector('.page-header .eyebrow');
    if (el && el.textContent.match(/Temple Categories|கோயில் வகைகள்/)) el.textContent = t.categories;

    var h2 = document.querySelector('.page-header h2');
    if (h2 && h2.textContent.match(/Browse|உலாவுங்கள்/)) h2.textContent = t.browseTitle;

    // Search card
    el = document.querySelector('.hero-search-card h3');
    if (el) el.textContent = t.globalSearch;
    el = document.querySelector('.hero-search-card p');
    if (el) el.textContent = t.globalSearchDesc;

    // Nav links
    var homeLinks = document.querySelectorAll('nav a[href="index.html"]');
    homeLinks.forEach(function (a) { a.textContent = t.home; });

    // Section cards (home page)
    if (currentLang === 'ta' && sectionTranslations.ta) {
      document.querySelectorAll('.section-card h3').forEach(function (h3) {
        var tamilName = sectionTranslations.ta[h3.textContent];
        if (tamilName) h3.textContent = tamilName;
      });
    } else if (currentLang === 'en') {
      // Restore English names from sectionMeta
      document.querySelectorAll('.section-card').forEach(function (card) {
        var href = card.getAttribute('href') || '';
        var types = Object.keys(window.sectionMeta || {});
        types.forEach(function (tp) {
          var meta = window.sectionMeta[tp];
          if (meta && meta.page === href) {
            var h3 = card.querySelector('h3');
            if (h3) h3.textContent = meta.title;
          }
        });
      });
    }

    // Visited tracker elements
    el = document.querySelector('.visited-progress-label');
    if (el) el.textContent = t.pilgrimage;
    el = document.querySelector('.visited-progress-hint');
    if (el) el.textContent = t.visitedHint;

    // PDF button
    el = document.getElementById('pdfDownloadBtn');
    if (el) el.lastChild.textContent = ' ' + t.downloadPdf;

    // Tour packages
    el = document.querySelector('.tour-packages-header h2');
    if (el) el.textContent = t.tourTitle;
    el = document.querySelector('.tour-packages-header p');
    if (el) el.textContent = t.tourDesc;
    document.querySelectorAll('.tour-pkg-btn').forEach(function (b) { b.textContent = t.viewPackage; });

    // Panchang
    el = document.querySelector('.panchang-header h3');
    if (el) el.textContent = t.panchang;
  }

  // Apply on load
  if (currentLang === 'ta') applyTranslations();

  window.i18n = { translations: translations, current: function () { return currentLang; } };
})();
