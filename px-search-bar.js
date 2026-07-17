(function () {
  var CSS = [
    '.px-search-bar {',
    '  position: fixed;',
    '  left: 0;',
    '  right: 0;',
    '  bottom: 0;',
    '  z-index: 999;',
    '  background: #F7F7F5;',
    '  border-top: 1px solid #111111;',
    '  padding: 14px 24px;',
    '  display: flex;',
    '  justify-content: flex-end;',
    '  align-items: center;',
    '}',
    '.px-search-bar a {',
    "  font-family: 'Inter', sans-serif;",
    '  font-size: 11px;',
    '  font-weight: 500;',
    '  letter-spacing: 0.14em;',
    '  text-transform: uppercase;',
    '  color: #111111;',
    '  text-decoration: none;',
    '}',
    '.px-search-bar a:hover {',
    '  color: #6B6B6B;',
    '}',
    'body {',
    '  padding-bottom: 60px;',
    '}'
  ].join('\n');

  function inject() {
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var links = document.querySelectorAll('a');
    var target = null;
    for (var i = 0; i < links.length; i++) {
      var t = links[i].textContent.trim().toLowerCase();
      if (t.indexOf('go to search') !== -1 || t.indexOf('back to search') !== -1) {
        target = links[i];
        break;
      }
    }
    if (!target) return;

    target.textContent = 'Search the archive \u2192';

    var bar = document.createElement('div');
    bar.className = 'px-search-bar';
    target.parentNode.removeChild(target);
    bar.appendChild(target);
    document.body.appendChild(bar);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
