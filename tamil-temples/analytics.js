// Vercel Web Analytics
// This script initializes Vercel Web Analytics for the Tamil Temples site
// Import from node_modules for local development, but Vercel will inject the production script automatically

(function() {
  'use strict';
  
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return;
  
  // Initialize Vercel Analytics using the inject method
  // The script will automatically detect the environment and track page views
  window.va = window.va || function () { 
    (window.vaq = window.vaq || []).push(arguments); 
  };
  
  // Queue script loading
  var script = document.createElement('script');
  script.defer = true;
  
  // When deployed on Vercel, the analytics script will be automatically injected
  // This ensures compatibility with both local development and production
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // In development, we can add debug mode
    script.src = '/_vercel/insights/script.js';
    console.log('Vercel Analytics: Development mode');
  } else {
    // Production - Vercel will automatically inject the correct script
    script.src = '/_vercel/insights/script.js';
  }
  
  script.onerror = function() {
    console.log('Vercel Analytics: Script not loaded (may not be deployed yet)');
  };
  
  document.head.appendChild(script);
})();
