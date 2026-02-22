// ========================================
// Churches of India — Home Page Script
// ========================================

(function() {
    'use strict';

    // --- Section icons ---
    var sectionIcons = {
        basilica: '⛪', heritage: '🏛️', goa: '🌴', kerala: '🌿',
        tamilnadu: '🕌', northeast: '⛰️', catholic: '✝️', orthodox: '☦️',
        csi: '✝️', protestant: '✝️', pilgrimage: '🙏', featured: '⭐'
    };

    // --- Render section cards ---
    function renderSectionCards() {
        var container = document.getElementById('sectionCards');
        if (!container || !window.sectionMeta) return;

        var html = '';
        for (var type in window.sectionMeta) {
            if (type === 'featured') continue;
            var meta = window.sectionMeta[type];
            var data = window.getSectionData(type);
            var count = data.length || meta.count || 0;
            var icon = sectionIcons[type] || '⛪';

            html += '<a href="' + meta.link + '" class="card section-card" style="text-decoration:none;">' +
                '<div class="card-img" style="background:linear-gradient(135deg,var(--primary),var(--primary-light));display:flex;align-items:center;justify-content:center;">' +
                    '<span style="font-size:3rem;">' + icon + '</span>' +
                '</div>' +
                '<div class="card-body">' +
                    '<h3>' + meta.title + '</h3>' +
                    '<p class="summary">' + meta.description + '</p>' +
                    '<span class="card-count">' + count + ' churches</span>' +
                '</div>' +
            '</a>';
        }
        container.innerHTML = html;
    }

    // --- Render featured churches ---
    function renderFeatured() {
        var container = document.getElementById('featuredGrid');
        if (!container) return;

        var featured = window.getSectionData('featured') || [];
        var html = '';
        featured.forEach(function(church) {
            html += buildChurchCard(church, 'featured');
        });
        container.innerHTML = html;
    }

    // --- Build a church card ---
    function buildChurchCard(church, sectionType) {
        var imgSrc = church.image || window.getSectionFallback(sectionType, church.name);
        return '<a href="church.html?type=' + sectionType + '&id=' + church.id + '" class="card" style="text-decoration:none;color:inherit;">' +
            '<div class="card-img">' +
                '<img src="' + imgSrc + '" alt="' + church.name + '" onerror="handleImageError(this,\'' + sectionType + '\',\'' + church.name.replace(/'/g, "\\'") + '\')">' +
                (church.denomination ? '<span class="card-badge">' + church.denomination + '</span>' : '') +
            '</div>' +
            '<div class="card-body">' +
                '<h3>' + church.name + '</h3>' +
                '<div class="location">&#128205; ' + church.location + '</div>' +
                '<p class="summary">' + (church.summary || '') + '</p>' +
            '</div>' +
        '</a>';
    }

    // --- Global search ---
    function initSearch() {
        var input = document.getElementById('globalSearch');
        if (!input) return;

        var debounceTimer;
        input.addEventListener('input', function() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(function() {
                performSearch(input.value.trim());
            }, 300);
        });
    }

    function performSearch(query) {
        var resultsSection = document.getElementById('searchResults');
        var sectionsGrid = document.getElementById('sectionsGrid');
        var featuredSection = document.getElementById('featuredSection');
        var searchGrid = document.getElementById('searchGrid');
        var noResults = document.getElementById('noResults');
        var titleEl = document.getElementById('searchResultsTitle');

        if (!query || query.length < 2) {
            resultsSection.style.display = 'none';
            sectionsGrid.style.display = '';
            featuredSection.style.display = '';
            return;
        }

        var lowerQuery = query.toLowerCase();
        var results = [];

        for (var type in window.extraSections) {
            var churches = window.extraSections[type];
            churches.forEach(function(church) {
                var searchable = (church.name + ' ' + church.location + ' ' + (church.denomination || '') + ' ' + (church.summary || '') + ' ' + (church.district || '')).toLowerCase();
                if (searchable.indexOf(lowerQuery) !== -1) {
                    results.push({ church: church, type: type });
                }
            });
        }

        // De-duplicate by name + location
        var seen = {};
        results = results.filter(function(r) {
            var key = r.church.name + '|' + r.church.location;
            if (seen[key]) return false;
            seen[key] = true;
            return true;
        });

        sectionsGrid.style.display = 'none';
        featuredSection.style.display = 'none';
        resultsSection.style.display = '';

        if (results.length === 0) {
            searchGrid.innerHTML = '';
            noResults.style.display = '';
            titleEl.textContent = 'No results for "' + query + '"';
        } else {
            noResults.style.display = 'none';
            titleEl.textContent = results.length + ' result' + (results.length > 1 ? 's' : '') + ' for "' + query + '"';
            var html = '';
            results.forEach(function(r) {
                html += buildChurchCard(r.church, r.type);
            });
            searchGrid.innerHTML = html;
        }
    }

    // --- Update stats ---
    function updateStats() {
        var el = document.getElementById('statChurches');
        if (el && window.getTotalChurchCount) {
            // De-duplicate count
            var allChurches = [];
            var seen = {};
            for (var type in window.extraSections) {
                window.extraSections[type].forEach(function(c) {
                    var key = c.name + '|' + c.location;
                    if (!seen[key]) {
                        seen[key] = true;
                        allChurches.push(c);
                    }
                });
            }
            el.textContent = allChurches.length + '+';
        }
    }

    // --- Back to top ---
    function initBackToTop() {
        var btn = document.getElementById('backToTop');
        if (!btn) return;
        window.addEventListener('scroll', function() {
            btn.classList.toggle('show', window.scrollY > 400);
        });
    }

    // --- Init ---
    document.addEventListener('DOMContentLoaded', function() {
        renderSectionCards();
        renderFeatured();
        initSearch();
        updateStats();
        initBackToTop();
    });
})();
