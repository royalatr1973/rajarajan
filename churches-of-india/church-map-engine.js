// ========================================
// Churches of India — Generic Map Engine
// Auto-initializes on section pages with coordinate data
// ========================================

var ChurchMapEngine = (function() {
    'use strict';

    function init(sectionType) {
        if (typeof L === 'undefined') return;

        var churches = window.getSectionData ? window.getSectionData(sectionType) : [];
        var withCoords = churches.filter(function(c) { return c.lat && c.lng; });

        if (withCoords.length === 0) {
            var container = document.getElementById('mapContainer');
            if (container) container.style.display = 'none';
            return;
        }

        var mapEl = document.getElementById('map');
        if (!mapEl) return;

        var map = L.map('map');

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);

        var bounds = L.latLngBounds();
        var theme = window.sectionThemes ? window.sectionThemes[sectionType] : null;
        var markerColor = theme ? theme.bg : '#1B3A5C';

        withCoords.forEach(function(church, idx) {
            var latlng = L.latLng(church.lat, church.lng);
            bounds.extend(latlng);

            var marker = L.circleMarker(latlng, {
                radius: 8,
                fillColor: markerColor,
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.85
            }).addTo(map);

            var popup = '<div style="min-width:180px;">' +
                '<strong style="font-size:1rem;">' + church.name + '</strong><br>' +
                '<span style="color:#666;font-size:0.85rem;">' + church.location + '</span>' +
                (church.yearBuilt ? '<br><span style="font-size:0.8rem;color:#888;">Built: ' + church.yearBuilt + '</span>' : '') +
                '<br><a href="church.html?type=' + sectionType + '&id=' + church.id + '" style="font-size:0.85rem;margin-top:4px;display:inline-block;">View details &rarr;</a>' +
            '</div>';
            marker.bindPopup(popup);
        });

        map.fitBounds(bounds, { padding: [30, 30] });

        // Draw route lines (sequential order)
        if (withCoords.length > 1) {
            var coords = withCoords.map(function(c) { return [c.lat, c.lng]; });
            L.polyline(coords, {
                color: markerColor,
                weight: 2,
                opacity: 0.3,
                dashArray: '8, 8'
            }).addTo(map);
        }
    }

    // Auto-init on DOM load
    document.addEventListener('DOMContentLoaded', function() {
        var sectionType = document.body.getAttribute('data-section-type');
        if (sectionType && document.getElementById('map')) {
            // Delay to let Leaflet load
            setTimeout(function() { init(sectionType); }, 300);
        }
    });

    return { init: init };
})();
