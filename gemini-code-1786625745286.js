(function() {
  // Sprawdzamy, czy użytkownik widział już okno w tej sesji/pamięci
  if (localStorage.getItem('pi_archive_seen') === 'true') {
    return; // Jeśli tak, nic nie robimy
  }

  // Tworzymy strukturę HTML w locie, żeby PhotoDeck nie musiał jej zawierać w szablonie
  var modalHtml = `
    <div id="pi-archive-update-modal">
      <div class="pi-update-card">
        <div class="pi-update-header">
          <span class="pi-upd-id">SYS.UPD.26.08</span>
          <span class="pi-upd-tag">NEW RECORDS ADDED</span>
        </div>
        <div class="pi-update-content">
          <h2 class="pi-update-heading">ARCHIVE<br>EXPANDED</h2>
          <div class="pi-update-specs">
            <div class="pi-spec-row">
              <span>TIMESTAMP</span>
              <span>13 AUG 2026 / 22:12</span>
            </div>
            <div class="pi-spec-row">
              <span>VOLUME</span>
              <span>+ 4 FILES</span>
            </div>
          </div>
          <div class="pi-update-thumbnails">
            <div class="pi-thumb-title">ATTACHED VISUAL DATA</div>
            <div class="pi-thumb-matrix">
              <img src="https://raw.githubusercontent.com/sproutssorbets/bne-urban-index/main/photos/PX-20260620-0100.jpg" alt="Record">
              <img src="https://raw.githubusercontent.com/sproutssorbets/bne-urban-index/main/photos/PX-20260620-0077.jpg" alt="Record">
              <img src="https://raw.githubusercontent.com/sproutssorbets/bne-urban-index/main/photos/PX-20260620-0041.jpg" alt="Record">
              <img src="https://raw.githubusercontent.com/sproutssorbets/bne-urban-index/main/photos/PX-20260620-0083.jpg" alt="Record">
            </div>
          </div>
        </div>
        <button id="pi-update-close-btn">ACKNOWLEDGE</button>
      </div>
    </div>
  `;

  // Wstrzykujemy style bezpośrednio, żeby nie dotykać CSS w PhotoDeck
  var styleCss = `
    #pi-archive-update-modal {
      position: fixed; inset: 0; background: #FFFFFF; display: flex;
      align-items: center; justify-content: center; z-index: 99999999; padding: 20px;
      font-family: 'Inter', system-ui, sans-serif;
    }
    .pi-update-card {
      width: 100%; max-width: 760px; background: #FFFFFF; border: 1px solid #111111;
      border-top: 8px solid #111111; display: flex; flex-direction: column; color: #111111;
    }
    .pi-update-header {
      display: flex; justify-content: space-between; padding: 14px 20px;
      border-bottom: 1px solid #111111; font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
    }
    .pi-update-content { padding: 28px 20px; }
    .pi-update-heading {
      margin: 0 0 28px 0; font-size: 38px; font-weight: 400; line-height: 0.95; letter-spacing: -0.03em; text-transform: uppercase;
    }
    .pi-update-specs { display: flex; flex-direction: column; border-top: 1px solid #111111; }
    .pi-spec-row {
      display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #111111;
      font-size: 11px; text-transform: uppercase; color: #6B6B6B; font-weight: 500;
    }
    .pi-spec-row span:last-child { color: #111111; font-weight: 600; }
    .pi-update-thumbnails { margin-top: 28px; border-top: 1px solid #111111; padding-top: 16px; }
    .pi-thumb-title { font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 14px; }
    .pi-thumb-matrix { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: #111111; border: 1px solid #111111; }
    .pi-thumb-matrix img { width: 100%; aspect-ratio: 1 / 1; object-fit: cover; display: block; filter: grayscale(100%) contrast(1.1); transition: filter 0.15s ease; }
    .pi-thumb-matrix img:hover { filter: grayscale(0%) contrast(1); }
    #pi-update-close-btn {
      width: 100%; border: none; border-top: 1px solid #111111; background: #111111; color: #FFFFFF;
      padding: 18px; font-size: 12px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; cursor: pointer; transition: background 0.15s, color 0.15s;
    }
    #pi-update-close-btn:hover { background: #FFFFFF; color: #111111; }
  `;

  var styleEl = document.createElement('style');
  styleEl.innerHTML = styleCss;
  document.head.appendChild(styleEl);

  var divEl = document.createElement('div');
  divEl.innerHTML = modalHtml;
  document.body.appendChild(divEl);

  // Obsługa przycisku potwierdzenia
  document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('pi-archive-update-modal');
    var btn = document.getElementById('pi-update-close-btn');
    if (btn && modal) {
      btn.addEventListener('click', function() {
        modal.style.display = 'none';
        localStorage.setItem('pi_archive_seen', 'true');
      });
    }
  });
})();