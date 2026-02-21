/* Offline Temple Pocket Card — Canvas-based shareable card generator */
(function () {
  // Only run on temple detail page
  if (!window.location.search.includes('type=')) return;

  function init() {
    var titleEl = document.getElementById('templeTitle');
    if (!titleEl || !titleEl.textContent || titleEl.textContent === 'Temple') return;

    var detailSection = document.querySelector('.detail');
    if (!detailSection) return;

    // Gather temple data
    var name = titleEl.textContent;
    var metaGrid = document.getElementById('templeMeta');
    var location = '', deity = '', district = '', timings = '';
    if (metaGrid) {
      var divs = metaGrid.querySelectorAll('div');
      divs.forEach(function (d) {
        var strong = d.querySelector('strong');
        if (!strong) return;
        var label = strong.textContent.trim();
        var val = d.textContent.replace(label, '').trim();
        if (label === 'Location') location = val;
        if (label === 'Deity') deity = val;
        if (label === 'District') district = val;
      });
    }
    var timingsText = document.getElementById('timingsText');
    if (timingsText) timings = timingsText.textContent;

    // Create pocket card button
    var btnWrap = document.createElement('div');
    btnWrap.className = 'pocket-card-section';
    btnWrap.innerHTML =
      '<button id="genPocketCard" class="pdf-download-btn">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>' +
        ' Save Temple Pocket Card' +
      '</button>' +
      '<canvas id="pocketCanvas" style="display:none" width="600" height="400"></canvas>';
    detailSection.appendChild(btnWrap);

    document.getElementById('genPocketCard').addEventListener('click', function () {
      var canvas = document.getElementById('pocketCanvas');
      var ctx = canvas.getContext('2d');
      var W = 600, H = 400;

      // Background gradient
      var grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, '#FFF8E1');
      grad.addColorStop(1, '#FFE0B2');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Saffron header bar
      var headerGrad = ctx.createLinearGradient(0, 0, W, 0);
      headerGrad.addColorStop(0, '#E65100');
      headerGrad.addColorStop(1, '#FF6F00');
      ctx.fillStyle = headerGrad;
      ctx.fillRect(0, 0, W, 70);

      // Header text
      ctx.fillStyle = '#FFF8E1';
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.fillText('\u0BD5 Temples of Tamil Nadu', 20, 28);
      ctx.font = '11px Inter, sans-serif';
      ctx.fillText('Temple Pocket Card', 20, 48);

      // Temple name
      ctx.fillStyle = '#3E2723';
      ctx.font = 'bold 22px Playfair Display, serif';
      wrapText(ctx, name, 20, 105, W - 40, 28);

      // Info section
      var y = name.length > 30 ? 145 : 135;
      ctx.font = '12px Inter, sans-serif';
      ctx.fillStyle = '#E65100';
      ctx.fillText('LOCATION', 20, y);
      ctx.fillStyle = '#3E2723';
      ctx.font = '14px Inter, sans-serif';
      ctx.fillText(location + (district && district !== '-' ? ', ' + district : ''), 20, y + 18);

      y += 45;
      ctx.font = '12px Inter, sans-serif';
      ctx.fillStyle = '#E65100';
      ctx.fillText('DEITY', 20, y);
      ctx.fillStyle = '#3E2723';
      ctx.font = '14px Inter, sans-serif';
      ctx.fillText(deity || '-', 20, y + 18);

      // Right column
      var ry = name.length > 30 ? 145 : 135;
      if (timings) {
        ctx.font = '12px Inter, sans-serif';
        ctx.fillStyle = '#E65100';
        ctx.fillText('TIMINGS', 310, ry);
        ctx.fillStyle = '#6D4C41';
        ctx.font = '12px Inter, sans-serif';
        var timingLines = timings.split('|');
        timingLines.forEach(function (line, i) {
          ctx.fillText(line.trim(), 310, ry + 18 + (i * 16));
        });
      }

      // Divider
      ctx.strokeStyle = '#FFCC80';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(20, H - 80);
      ctx.lineTo(W - 20, H - 80);
      ctx.stroke();

      // Google Maps link hint
      ctx.fillStyle = '#6D4C41';
      ctx.font = '11px Inter, sans-serif';
      ctx.fillText('Scan QR or search "' + name + '" on Google Maps for directions', 20, H - 55);

      // URL
      ctx.fillStyle = '#E65100';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText(window.location.href.substring(0, 70), 20, H - 30);

      // Footer bar
      ctx.fillStyle = 'rgba(230,81,0,0.1)';
      ctx.fillRect(0, H - 15, W, 15);
      ctx.fillStyle = '#E65100';
      ctx.font = '9px Inter, sans-serif';
      ctx.fillText('Generated from Temples of Tamil Nadu | templesofindia.in', 20, H - 5);

      // Convert to blob and share/download
      canvas.toBlob(function (blob) {
        var fileName = name.replace(/[^a-zA-Z0-9]/g, '_') + '_card.png';

        // Try Web Share API first
        if (navigator.share && navigator.canShare) {
          var file = new File([blob], fileName, { type: 'image/png' });
          var shareData = { files: [file], title: name + ' - Temple Card', text: name + ' temple details - timings, location, deity info.' };
          if (navigator.canShare(shareData)) {
            navigator.share(shareData).catch(function () { downloadFallback(blob, fileName); });
            return;
          }
        }
        downloadFallback(blob, fileName);
      }, 'image/png');
    });
  }

  function downloadFallback(blob, fileName) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    setTimeout(function () { URL.revokeObjectURL(url); }, 5000);
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';
    for (var i = 0; i < words.length; i++) {
      var testLine = line + words[i] + ' ';
      if (ctx.measureText(testLine).width > maxWidth && i > 0) {
        ctx.fillText(line, x, y);
        line = words[i] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  }

  // Wait for detail.js
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 200); });
  } else {
    setTimeout(init, 200);
  }
})();
