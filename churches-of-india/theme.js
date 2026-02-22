// ========================================
// Churches of India — Dark Mode Toggle
// ========================================

(function() {
    'use strict';

    var THEME_KEY = 'churches-india-theme';

    function getPreferred() {
        var saved = localStorage.getItem(THEME_KEY);
        if (saved) return saved;
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem(THEME_KEY, theme);
    }

    // Apply on load
    applyTheme(getPreferred());

    // Global toggle
    window.toggleTheme = function() {
        var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        applyTheme(current === 'dark' ? 'light' : 'dark');
    };
})();
