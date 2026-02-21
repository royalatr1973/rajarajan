/* Sthalapuranam Story Reader with Read Aloud using SpeechSynthesis API */
(function () {
  var sthalaEl = document.getElementById('sthalaVaralaru');
  if (!sthalaEl) return;

  // Wait for detail.js to populate
  var observer = new MutationObserver(function () {
    if (sthalaEl.style.display !== 'none' && !document.getElementById('storyReaderBar')) {
      initReader();
      observer.disconnect();
    }
  });
  observer.observe(sthalaEl, { attributes: true, attributeFilter: ['style'] });
  // Also check immediately
  if (sthalaEl.style.display !== 'none') {
    setTimeout(initReader, 200);
  }

  function initReader() {
    if (document.getElementById('storyReaderBar')) return;
    var textEl = document.getElementById('sthalaVaralaruText');
    if (!textEl || !textEl.textContent.trim()) return;

    // Style the text for reading
    textEl.style.lineHeight = '1.9';
    textEl.style.fontSize = '15px';

    // Add reader controls bar
    var bar = document.createElement('div');
    bar.id = 'storyReaderBar';
    bar.className = 'story-reader-bar';
    bar.innerHTML =
      '<button id="storyReadBtn" class="story-btn story-play-btn" title="Read Aloud">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polygon points="5 3 19 12 5 21 5 3"/></svg>' +
        ' Read Aloud' +
      '</button>' +
      '<button id="storyPauseBtn" class="story-btn" style="display:none" title="Pause">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>' +
        ' Pause' +
      '</button>' +
      '<button id="storyStopBtn" class="story-btn" style="display:none" title="Stop">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="6" y="6" width="12" height="12"/></svg>' +
        ' Stop' +
      '</button>' +
      '<select id="storyVoiceSelect" class="story-voice-select">' +
        '<option value="">Default Voice</option>' +
      '</select>' +
      '<label class="story-speed"><span>Speed:</span>' +
        '<input id="storySpeed" type="range" min="0.5" max="2" step="0.1" value="0.9" />' +
        '<span id="storySpeedVal">0.9x</span>' +
      '</label>';

    sthalaEl.querySelector('h2').after(bar);

    // Populate voices
    var voiceSelect = document.getElementById('storyVoiceSelect');
    function loadVoices() {
      var voices = speechSynthesis.getVoices();
      var enVoices = voices.filter(function (v) { return v.lang.startsWith('en'); });
      voiceSelect.innerHTML = '<option value="">Default Voice</option>';
      enVoices.forEach(function (v, i) {
        var opt = document.createElement('option');
        opt.value = i;
        opt.textContent = v.name + ' (' + v.lang + ')';
        opt.dataset.voiceName = v.name;
        voiceSelect.appendChild(opt);
      });
    }
    speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();

    var readBtn = document.getElementById('storyReadBtn');
    var pauseBtn = document.getElementById('storyPauseBtn');
    var stopBtn = document.getElementById('storyStopBtn');
    var speedInput = document.getElementById('storySpeed');
    var speedVal = document.getElementById('storySpeedVal');
    var utterance = null;
    var isPaused = false;

    speedInput.addEventListener('input', function () {
      speedVal.textContent = speedInput.value + 'x';
    });

    readBtn.addEventListener('click', function () {
      if (isPaused) {
        speechSynthesis.resume();
        isPaused = false;
        readBtn.style.display = 'none';
        pauseBtn.style.display = '';
        return;
      }
      speechSynthesis.cancel();
      utterance = new SpeechSynthesisUtterance(textEl.textContent);
      utterance.rate = parseFloat(speedInput.value);

      var voices = speechSynthesis.getVoices();
      var enVoices = voices.filter(function (v) { return v.lang.startsWith('en'); });
      var selectedIdx = parseInt(voiceSelect.value);
      if (!isNaN(selectedIdx) && enVoices[selectedIdx]) {
        utterance.voice = enVoices[selectedIdx];
      }

      utterance.onend = function () {
        readBtn.style.display = '';
        readBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polygon points="5 3 19 12 5 21 5 3"/></svg> Read Aloud';
        pauseBtn.style.display = 'none';
        stopBtn.style.display = 'none';
        isPaused = false;
      };

      speechSynthesis.speak(utterance);
      readBtn.style.display = 'none';
      pauseBtn.style.display = '';
      stopBtn.style.display = '';
    });

    pauseBtn.addEventListener('click', function () {
      speechSynthesis.pause();
      isPaused = true;
      pauseBtn.style.display = 'none';
      readBtn.style.display = '';
      readBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polygon points="5 3 19 12 5 21 5 3"/></svg> Resume';
    });

    stopBtn.addEventListener('click', function () {
      speechSynthesis.cancel();
      isPaused = false;
      readBtn.style.display = '';
      readBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polygon points="5 3 19 12 5 21 5 3"/></svg> Read Aloud';
      pauseBtn.style.display = 'none';
      stopBtn.style.display = 'none';
    });
  }
})();
