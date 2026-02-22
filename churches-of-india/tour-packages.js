// ========================================
// Churches of India — Tour Packages
// ========================================

window.tourPackages = {
    basilica: [
        { name: 'Basilica Trail – Goa', duration: '3 Days / 2 Nights', price: '₹8,500', highlights: ['Bom Jesus', 'Se Cathedral', 'St. Francis of Assisi', 'Holy Spirit Margao'], operator: 'Sacred India Tours' },
        { name: 'South India Basilica Circuit', duration: '5 Days / 4 Nights', price: '₹14,000', highlights: ['San Thome Chennai', 'Velankanni', 'Thrissur Dolours', 'Vallarpadam Kochi'], operator: 'Pilgrimage Journeys' }
    ],
    goa: [
        { name: 'Old Goa Heritage Walk', duration: '1 Day', price: '₹2,500', highlights: ['Bom Jesus', 'Se Cathedral', 'St. Cajetan', 'St. Augustine Tower', 'Chapel of St. Catherine'], operator: 'Goa Heritage Tours' },
        { name: 'Complete Goa Churches Tour', duration: '3 Days / 2 Nights', price: '₹9,000', highlights: ['Old Goa circuit', 'Panaji churches', 'South Goa churches', 'Village chapels'], operator: 'Sacred Goa' }
    ],
    kerala: [
        { name: 'St. Thomas Trail – Kerala', duration: '5 Days / 4 Nights', price: '₹16,000', highlights: ['Kodungallur', 'Palayur', 'Malayattoor', 'Niranam', 'Champakulam', 'Fort Kochi'], operator: 'Kerala Pilgrimage Tours' },
        { name: 'Orthodox Heritage Tour', duration: '3 Days / 2 Nights', price: '₹10,000', highlights: ['Parumala', 'Manarcad', 'Cherpunkal', 'Kottayam churches'], operator: 'Orthodox Yathra' }
    ],
    tamilnadu: [
        { name: 'Chennai Church Heritage Walk', duration: '1 Day', price: '₹2,000', highlights: ['San Thome Basilica', 'Little Mount', 'St. Mary\'s Fort', 'St. George\'s Cathedral', 'St. Andrew\'s Kirk'], operator: 'Chennai Walks' },
        { name: 'Tamil Nadu Pilgrimage Tour', duration: '4 Days / 3 Nights', price: '₹12,000', highlights: ['Chennai churches', 'Velankanni', 'Tranquebar', 'Thanjavur', 'Pondicherry'], operator: 'Sacred South Tours' }
    ],
    northeast: [
        { name: 'Northeast Church Circuit', duration: '6 Days / 5 Nights', price: '₹22,000', highlights: ['Shillong Cathedral', 'Don Bosco Museum', 'Kohima Cathedral', 'Mokokchung', 'Aizawl'], operator: 'Northeast Pilgrim Tours' }
    ],
    pilgrimage: [
        { name: 'All India Christian Pilgrimage', duration: '10 Days / 9 Nights', price: '₹35,000', highlights: ['Velankanni', 'San Thome', 'Old Goa', 'Kochi', 'Malayattoor', 'Shillong'], operator: 'Sacred India Pilgrimages' }
    ]
};

// --- Auto-render tour packages on section pages ---
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        var sectionType = document.body.getAttribute('data-section-type');
        if (!sectionType) return;

        var packages = window.tourPackages[sectionType];
        if (!packages || packages.length === 0) return;

        var churchList = document.querySelector('.church-list');
        if (!churchList) return;

        var section = document.createElement('div');
        section.className = 'tour-section';
        section.style.marginTop = '40px';

        var html = '<h2 style="color:var(--primary);margin-bottom:20px;">Tour Packages</h2><div class="tour-grid">';
        packages.forEach(function(pkg) {
            html += '<div class="tour-card">' +
                '<h4>' + pkg.name + '</h4>' +
                '<div class="price">' + pkg.price + '</div>' +
                '<div class="duration" style="margin-bottom:10px;">' + pkg.duration + '</div>' +
                '<ul style="list-style:none;padding:0;margin:0;">';
            pkg.highlights.forEach(function(h) {
                html += '<li style="padding:3px 0;font-size:0.85rem;color:var(--muted);">&#10003; ' + h + '</li>';
            });
            html += '</ul>' +
                '<div style="margin-top:10px;font-size:0.8rem;color:var(--muted);">by ' + pkg.operator + '</div>' +
            '</div>';
        });
        html += '</div>';
        section.innerHTML = html;
        churchList.parentNode.insertBefore(section, churchList.nextSibling);
    });
})();
