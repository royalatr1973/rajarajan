// ========================================
// Churches of India — Detail Page Script
// Reads ?type=TYPE&id=ID from URL
// ========================================

(function() {
    'use strict';

    var params = new URLSearchParams(window.location.search);
    var sectionType = params.get('type');
    var churchId = parseInt(params.get('id'), 10);

    if (!sectionType || isNaN(churchId)) {
        document.getElementById('churchName').textContent = 'Church not found';
        return;
    }

    var churches = window.getSectionData ? window.getSectionData(sectionType) : [];
    var church = null;
    for (var i = 0; i < churches.length; i++) {
        if (churches[i].id === churchId) { church = churches[i]; break; }
    }

    if (!church) {
        document.getElementById('churchName').textContent = 'Church not found';
        return;
    }

    var meta = window.sectionMeta ? window.sectionMeta[sectionType] : null;

    // --- Page title ---
    document.title = church.name + ' — Churches of India';

    // --- Hero image ---
    var heroImg = document.getElementById('heroImage');
    heroImg.src = church.image || window.getSectionFallback(sectionType, church.name);
    heroImg.alt = church.name;
    heroImg.onerror = function() { window.handleImageError(this, sectionType, church.name); };

    // --- Breadcrumb & name ---
    document.getElementById('churchName').textContent = church.name;
    document.getElementById('churchNameBreadcrumb').textContent = church.name;
    document.getElementById('churchLocation').innerHTML = '&#128205; ' + church.location;

    if (meta) {
        var sectionLink = document.getElementById('sectionLink');
        sectionLink.textContent = meta.title;
        sectionLink.href = meta.link;

        var backLink = document.getElementById('backLink');
        backLink.href = meta.link;
        backLink.innerHTML = '&#8592; Back to ' + meta.title;
    }

    // --- Summary ---
    document.getElementById('churchSummary').textContent = church.summary || church.significance || '';

    // --- Significance ---
    if (church.significance) {
        document.getElementById('significanceSection').style.display = '';
        document.getElementById('churchSignificance').textContent = church.significance;
    }

    // --- Meta cards ---
    var metaHtml = '';
    var metaFields = [
        { label: 'Denomination', value: church.denomination },
        { label: 'Year Built', value: church.yearBuilt },
        { label: 'Architectural Style', value: church.style },
        { label: 'District', value: church.district },
        { label: 'Patron Saint', value: church.patron },
        { label: 'Timings', value: church.timings },
        { label: 'Heritage Status', value: church.designation }
    ];

    metaFields.forEach(function(f) {
        if (f.value) {
            metaHtml += '<div class="meta-item">' +
                '<div class="label">' + f.label + '</div>' +
                '<div class="value">' + f.value + '</div>' +
            '</div>';
        }
    });
    document.getElementById('detailMeta').innerHTML = metaHtml;

    // --- Festivals ---
    if (church.festivals && church.festivals.length > 0) {
        document.getElementById('festivalsSection').style.display = '';
        var festHtml = '';
        church.festivals.forEach(function(f) {
            festHtml += '<li style="padding:8px 0;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px;">' +
                '<span style="font-size:1.2rem;">&#127881;</span> ' + f + '</li>';
        });
        document.getElementById('churchFestivals').innerHTML = festHtml;
    }

    // --- Map ---
    if (church.lat && church.lng) {
        document.getElementById('mapSection').style.display = '';

        // Wait for Leaflet to load
        function initMap() {
            if (typeof L === 'undefined') {
                setTimeout(initMap, 200);
                return;
            }
            var map = L.map('map').setView([church.lat, church.lng], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
                maxZoom: 19
            }).addTo(map);

            L.marker([church.lat, church.lng])
                .addTo(map)
                .bindPopup('<strong>' + church.name + '</strong><br>' + church.location)
                .openPopup();
        }
        initMap();
    }

    // --- Back to top ---
    var btn = document.getElementById('backToTop');
    if (btn) {
        window.addEventListener('scroll', function() {
            btn.classList.toggle('show', window.scrollY > 400);
        });
    }
})();
