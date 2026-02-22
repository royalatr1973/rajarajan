// ========================================
// Churches of India — Section Page Script
// Reads data-section-type from <body> and renders church cards
// ========================================

(function() {
    'use strict';

    var sectionType = document.body.getAttribute('data-section-type');
    if (!sectionType) return;

    var meta = window.sectionMeta ? window.sectionMeta[sectionType] : null;
    var churches = window.getSectionData ? window.getSectionData(sectionType) : [];

    // --- Render section hero ---
    function renderHero() {
        var heroEl = document.getElementById('sectionHero');
        if (!heroEl || !meta) return;
        heroEl.querySelector('h1').textContent = meta.title;
        heroEl.querySelector('p').textContent = meta.description;

        var countEl = document.getElementById('churchCount');
        if (countEl) countEl.textContent = churches.length + ' Churches';
    }

    // --- Build a church card ---
    function buildCard(church) {
        var imgSrc = church.image || window.getSectionFallback(sectionType, church.name);
        var escapedName = church.name.replace(/'/g, "\\'");
        return '<a href="church.html?type=' + sectionType + '&id=' + church.id + '" class="card" style="text-decoration:none;color:inherit;">' +
            '<div class="card-img">' +
                '<img src="' + imgSrc + '" alt="' + church.name + '" loading="lazy" onerror="handleImageError(this,\'' + sectionType + '\',\'' + escapedName + '\')">' +
                (church.yearBuilt ? '<span class="card-badge">' + church.yearBuilt + '</span>' : '') +
            '</div>' +
            '<div class="card-body">' +
                '<h3>' + church.name + '</h3>' +
                '<div class="location">&#128205; ' + church.location + '</div>' +
                '<p class="summary">' + (church.summary || '') + '</p>' +
            '</div>' +
        '</a>';
    }

    // --- Render all church cards ---
    function renderChurches(list) {
        var grid = document.getElementById('churchGrid');
        var noResults = document.getElementById('noResults');
        if (!grid) return;

        if (list.length === 0) {
            grid.innerHTML = '';
            if (noResults) noResults.style.display = '';
            return;
        }

        if (noResults) noResults.style.display = 'none';
        var html = '';
        list.forEach(function(church) {
            html += buildCard(church);
        });
        grid.innerHTML = html;
    }

    // --- Build filter tabs from districts ---
    function renderFilters() {
        var container = document.getElementById('filterTabs');
        if (!container || churches.length < 5) return;

        var districts = {};
        churches.forEach(function(c) {
            var d = c.district || 'Other';
            districts[d] = (districts[d] || 0) + 1;
        });

        var districtKeys = Object.keys(districts).sort();
        if (districtKeys.length < 2) return;

        var html = '<button class="filter-tab active" data-filter="all">All (' + churches.length + ')</button>';
        districtKeys.forEach(function(d) {
            html += '<button class="filter-tab" data-filter="' + d + '">' + d + ' (' + districts[d] + ')</button>';
        });
        container.innerHTML = html;

        // Event delegation
        container.addEventListener('click', function(e) {
            var btn = e.target.closest('.filter-tab');
            if (!btn) return;

            container.querySelectorAll('.filter-tab').forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');

            var filter = btn.getAttribute('data-filter');
            if (filter === 'all') {
                renderChurches(churches);
            } else {
                renderChurches(churches.filter(function(c) { return c.district === filter; }));
            }
        });
    }

    // --- Search ---
    function initSearch() {
        var input = document.getElementById('sectionSearch');
        if (!input) return;

        var debounceTimer;
        input.addEventListener('input', function() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(function() {
                var query = input.value.trim().toLowerCase();
                if (!query || query.length < 2) {
                    renderChurches(churches);
                    return;
                }
                var filtered = churches.filter(function(c) {
                    var searchable = (c.name + ' ' + c.location + ' ' + (c.denomination || '') + ' ' + (c.summary || '') + ' ' + (c.district || '')).toLowerCase();
                    return searchable.indexOf(query) !== -1;
                });
                renderChurches(filtered);
            }, 300);
        });
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
        renderHero();
        renderChurches(churches);
        renderFilters();
        initSearch();
        initBackToTop();
    });
})();
