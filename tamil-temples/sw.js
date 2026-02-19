// ========================================
// Service Worker for Temples of Tamil Nadu PWA
// Caches all static assets for offline use
// ========================================
var CACHE_NAME = 'tn-temples-v1';
var ASSETS = [
  './',
  './index.html',
  './temple.html',
  './styles.css',
  './temple-photos.js',
  './divyadesam-data.js',
  './paadal-petra-data.js',
  './site-data.js',
  './home.js',
  './section.js',
  './detail.js',
  './tour-packages.js',
  './visited-tracker.js',
  './panchang.js',
  './pdf-guide.js',
  './i18n.js',
  './share-temple.js',
  './festivals.js',
  './nearby.js',
  './trip-planner.js',
  './temple-map-engine.js',
  './festivals.html',
  './nearby.html',
  './divyadesam.html',
  './paadalpetra.html',
  './navagraha.html',
  './panchabhootha.html',
  './kumbakonam.html',
  './kanchipuram.html',
  './featured.html',
  './murugan.html',
  './amman.html',
  './vinayagar.html',
  './jyotirlinga.html',
  './chardham.html',
  './shaktipeethas.html',
  './navatirupathi.html',
  './sapthavidanga.html',
  './sapthasthanam.html',
  './ashtaveerattanam.html',
  './panchasabhai.html',
  './panchaaranya.html'
];

// Install — cache all assets
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names.filter(function (name) { return name !== CACHE_NAME; })
             .map(function (name) { return caches.delete(name); })
      );
    })
  );
  self.clients.claim();
});

// Fetch — network first, fallback to cache
self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).then(function (response) {
      // Cache successful responses
      if (response && response.status === 200) {
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, clone);
        });
      }
      return response;
    }).catch(function () {
      return caches.match(event.request);
    })
  );
});
