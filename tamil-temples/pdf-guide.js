// ========================================
// PDF Guide Generator
// Uses jsPDF (CDN) to generate downloadable circuit guides
// ========================================
(function () {
  var type = document.body.dataset.sectionType;
  if (!type) return;

  var listEl = document.getElementById('templeList');
  if (!listEl) return;

  // Wait for section.js to render
  var observer = new MutationObserver(function () {
    if (listEl.querySelector('.temple-card')) {
      observer.disconnect();
      addDownloadBtn();
    }
  });
  observer.observe(listEl, { childList: true });
  if (listEl.querySelector('.temple-card')) addDownloadBtn();

  function addDownloadBtn() {
    var existing = document.getElementById('pdfDownloadBtn');
    if (existing) return;

    var meta = (window.sectionMeta || {})[type] || { title: 'Temples' };
    var btn = document.createElement('button');
    btn.id = 'pdfDownloadBtn';
    btn.className = 'pdf-download-btn';
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download PDF Guide';
    btn.addEventListener('click', function () { generatePDF(type, meta.title); });

    var header = document.querySelector('.page-header');
    if (header) header.appendChild(btn);
  }

  function generatePDF(sectionType, title) {
    // Check if jsPDF is loaded
    if (!window.jspdf || !window.jspdf.jsPDF) {
      // Load jsPDF dynamically
      var script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      script.onload = function () { buildPDF(sectionType, title); };
      document.head.appendChild(script);
    } else {
      buildPDF(sectionType, title);
    }
  }

  function buildPDF(sectionType, title) {
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    var data = window.getSectionData(sectionType);
    if (!data || !data.length) return;

    var pageW = 210;
    var margin = 15;
    var y = margin;
    var lineH = 5;

    // Title page
    doc.setFontSize(24);
    doc.setTextColor(230, 81, 0);
    doc.text(title, pageW / 2, 40, { align: 'center' });

    doc.setFontSize(12);
    doc.setTextColor(109, 76, 65);
    doc.text('Pilgrimage Guide', pageW / 2, 52, { align: 'center' });
    doc.text(data.length + ' Temples', pageW / 2, 60, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('Generated from Temples of Tamil Nadu', pageW / 2, 75, { align: 'center' });
    doc.text(new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }), pageW / 2, 82, { align: 'center' });

    // Temple list
    doc.addPage();
    y = margin;

    doc.setFontSize(16);
    doc.setTextColor(230, 81, 0);
    doc.text('Temple Directory', margin, y);
    y += 10;

    data.forEach(function (temple, i) {
      if (y > 270) { doc.addPage(); y = margin; }

      // Temple number and name
      doc.setFontSize(11);
      doc.setTextColor(62, 39, 35);
      doc.text((i + 1) + '. ' + temple.name, margin, y);
      y += lineH;

      // Location
      doc.setFontSize(9);
      doc.setTextColor(109, 76, 65);
      var loc = (temple.location || '') + (temple.district ? ', ' + temple.district : '');
      if (loc) { doc.text('Location: ' + loc, margin + 4, y); y += lineH; }

      // Deity
      if (temple.deity) { doc.text('Deity: ' + temple.deity, margin + 4, y); y += lineH; }

      // Timings
      var raw = temple.raw || {};
      if (raw.timings) { doc.text('Timings: ' + raw.timings, margin + 4, y); y += lineH; }

      // Coordinates
      if (raw.lat && raw.lng) {
        doc.text('GPS: ' + raw.lat + ', ' + raw.lng, margin + 4, y);
        y += lineH;
      }

      y += 3; // gap between temples
    });

    // Quick reference table
    doc.addPage();
    y = margin;
    doc.setFontSize(16);
    doc.setTextColor(230, 81, 0);
    doc.text('Quick Reference', margin, y);
    y += 10;

    doc.setFontSize(8);
    doc.setTextColor(62, 39, 35);
    // Table header
    doc.setFont(undefined, 'bold');
    doc.text('#', margin, y);
    doc.text('Temple', margin + 8, y);
    doc.text('Location', margin + 80, y);
    doc.text('Deity', margin + 130, y);
    doc.setFont(undefined, 'normal');
    y += lineH;

    data.forEach(function (t, i) {
      if (y > 280) { doc.addPage(); y = margin; }
      doc.text(String(i + 1), margin, y);
      doc.text((t.name || '').substring(0, 35), margin + 8, y);
      doc.text((t.location || '').substring(0, 25), margin + 80, y);
      doc.text((t.deity || '').substring(0, 20), margin + 130, y);
      y += 4;
    });

    doc.save(sectionType + '-pilgrimage-guide.pdf');
  }
})();
