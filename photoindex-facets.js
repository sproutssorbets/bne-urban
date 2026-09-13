/* ------------------------------------------------------------------
   PHOTOINDEX — FACET PANEL (client)

   Runs on the real PhotoDeck grid page. It renders a filter bar above
   the grid and hides the tiles that do not match. It never rebuilds a
   tile, never draws its own buy or selection button, and never calls a
   PhotoDeck endpoint. Every tile on the page stays PhotoDeck's own, so
   "add to selection", "buy", the header counter and the logged-in
   client state keep working exactly as before.

   Load order: photoindex-facets-vocab.js first, then this file.

   ES5 on purpose. Same convention as the rest of the injected code.
------------------------------------------------------------------ */

(function () {
  'use strict';

  var CFG = {
    api: '/api/facet-search',

    /* Confirmed from the live grid at /-/archive/brisbane/index:
       each tile is div.media[data-media-id] inside div.medias-list.
       UUID is read straight from data-media-id, not from the link —
       PhotoDeck's tile links use "/medias/<uuid>-<slug>" (plural,
       slug glued on with no separator), which the old regex-on-href
       approach could not reliably match. */
    tileSelector: '.media[data-media-id]',
    gridSelector: '.medias-list',

    /* Container watched for PhotoDeck ajax navigation */
    ajaxRoot: '#main_content',

    /* Part II groups start collapsed and sit behind one toggle */
    archivalCollapsed: true
  };

  /* Kept only as a last-resort fallback for pages where a tile has no
     data-media-id for some reason. Accepts both "/media/" and the
     real "/medias/" (plural, slug glued directly after the uuid). */
  var MEDIA_RE = /\/medias?\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i;

  var state = {};        // groupId -> [term, term]
  var slugToTerm = {};   // groupId -> { slug: term }
  var termToSlug = {};
  var lastCounts = { '*': {} };
  var mounted = false;

  /* ---------- helpers ---------- */

  function slug(t) {
    return String(t).toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function eachTerm(group, fn) {
    for (var i = 0; i < group.terms.length; i++) {
      var item = group.terms[i];
      if (item.t) fn(item, i);
    }
  }

  function buildLookups() {
    for (var i = 0; i < PI_VOCAB.groups.length; i++) {
      var g = PI_VOCAB.groups[i];
      slugToTerm[g.id] = {};
      termToSlug[g.id] = {};
      eachTerm(g, function (item) {
        var s = slug(item.t);
        slugToTerm[g.id][s] = piNormTerm(item.t);
        termToSlug[g.id][piNormTerm(item.t)] = s;
      });
    }
  }

  function readHash() {
    state = {};
    var h = window.location.hash || '';
    var m = h.match(/pi=([^&]*)/);
    if (!m) return;
    decodeURIComponent(m[1]).split('|').forEach(function (chunk) {
      var sep = chunk.indexOf(':');
      if (sep < 1) return;
      var gid = chunk.slice(0, sep);
      if (!slugToTerm[gid]) return;
      var terms = [];
      chunk.slice(sep + 1).split(',').forEach(function (s) {
        var t = slugToTerm[gid][s];
        if (t) terms.push(t);
      });
      if (terms.length) state[gid] = terms;
    });
  }

  function writeHash() {
    var parts = [];
    for (var gid in state) {
      if (!state[gid] || !state[gid].length) continue;
      var slugs = state[gid].map(function (t) { return termToSlug[gid][t]; });
      parts.push(gid + ':' + slugs.join(','));
    }
    var value = parts.join('|');
    var target = value ? '#pi=' + encodeURIComponent(value) : '#';
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search + target);
    } else {
      window.location.hash = target;
    }
  }

  function activeGroupCount() {
    var n = 0;
    for (var gid in state) if (state[gid] && state[gid].length) n++;
    return n;
  }

  function isSelected(gid, term) {
    return !!(state[gid] && state[gid].indexOf(term) !== -1);
  }

  function toggle(gid, term) {
    if (!state[gid]) state[gid] = [];
    var i = state[gid].indexOf(term);
    if (i === -1) state[gid].push(term);
    else state[gid].splice(i, 1);
    if (!state[gid].length) delete state[gid];
  }

  /* ---------- tiles ---------- */

  function indexOfChild(el) {
    var i = 0, s = el;
    while ((s = s.previousElementSibling)) i++;
    return i;
  }

  /* Primary path: read data-media-id straight off the tile, scoped to
     CFG.tileSelector. This is what the live grid actually gives us —
     no href parsing, no regex, no guessing about URL shape. */
  function findTilesByDataAttr() {
    var out = [];
    var seen = {};
    var nodes = document.querySelectorAll(CFG.tileSelector);
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var uuid = (el.getAttribute('data-media-id') || '').toLowerCase();
      if (!uuid) continue;
      var key = uuid + '::' + indexOfChild(el);
      if (seen[key]) continue;
      seen[key] = true;
      out.push({ uuid: uuid, el: el });
    }
    return out;
  }

  /* Fallback path: the original href-based detection, kept only for
     pages where CFG.tileSelector finds nothing (e.g. a layout that
     doesn't carry data-media-id). */
  function findTilesByHref() {
    var out = [];
    var seen = {};
    var links = document.querySelectorAll('a[href*="/media"]');

    for (var i = 0; i < links.length; i++) {
      var m = links[i].getAttribute('href').match(MEDIA_RE);
      if (!m) continue;
      var uuid = m[1].toLowerCase();

      var el = outermostUnique(links[i]);
      if (!el) continue;

      var key = uuid + '::' + indexOfChild(el);
      if (seen[key]) continue;
      seen[key] = true;
      out.push({ uuid: uuid, el: el });
    }
    return out;
  }

  /* Walk up while the ancestor still contains exactly one media link.
     That gives the outermost element belonging to this tile alone. */
  function outermostUnique(link) {
    var el = link;
    var guard = 0;
    while (el.parentNode && el.parentNode !== document.body && guard < 8) {
      var p = el.parentNode;
      if (countMediaLinks(p) !== 1) break;
      el = p;
      guard++;
    }
    return el === link ? link.parentNode : el;
  }

  /* Counts distinct media UUIDs, not links. A tile usually carries two
     links to the same photo, the thumbnail and the caption, and both
     must still read as one tile. */
  function countMediaLinks(el) {
    var links = el.querySelectorAll ? el.querySelectorAll('a[href*="/media"]') : [];
    var seen = {};
    var n = 0;
    for (var i = 0; i < links.length; i++) {
      var m = links[i].getAttribute('href').match(MEDIA_RE);
      if (!m) continue;
      var u = m[1].toLowerCase();
      if (seen[u]) continue;
      seen[u] = true;
      n++;
    }
    return n;
  }

  function findTiles() {
    if (CFG.tileSelector) {
      var byData = findTilesByDataAttr();
      if (byData.length) return byData;
    }
    return findTilesByHref();
  }

  function findGrid(tiles) {
    if (CFG.gridSelector) return document.querySelector(CFG.gridSelector);
    if (!tiles.length) return null;
    return tiles[0].el.parentNode;
  }

  /* ---------- panel ---------- */

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function buildPanel() {
    var root = el('section', 'pi-facets');
    root.id = 'pi-facets';

    /* top bar */
    var bar = el('div', 'pi-bar');

    var form = el('form', 'pi-search');
    form.setAttribute('action', '/');
    form.setAttribute('method', 'get');
    form.setAttribute('accept-charset', 'UTF-8');
    var input = el('input', 'pi-search-input');
    input.setAttribute('type', 'search');
    input.setAttribute('name', 'search');
    input.setAttribute('placeholder', 'Suburb, frame ID, or keyword');
    var submit = el('button', 'pi-search-go', 'Search');
    submit.setAttribute('type', 'submit');
    form.appendChild(input);
    form.appendChild(submit);

    var status = el('div', 'pi-status');
    status.id = 'pi-status';

    var clear = el('button', 'pi-clear', 'Clear filters');
    clear.setAttribute('type', 'button');
    clear.addEventListener('click', function () {
      state = {};
      writeHash();
      renderChecks();
      refresh();
    });

    bar.appendChild(form);
    bar.appendChild(status);
    bar.appendChild(clear);
    root.appendChild(bar);

    /* groups */
    var partOne = el('div', 'pi-groups');
    var partTwo = el('div', 'pi-groups pi-groups-archival');
    partTwo.id = 'pi-archival';
    if (CFG.archivalCollapsed) partTwo.style.display = 'none';

    var lastSection = null;
    for (var i = 0; i < PI_VOCAB.groups.length; i++) {
      var g = PI_VOCAB.groups[i];
      var host = g.part === 1 ? partOne : partTwo;
      if (g.section !== lastSection) {
        host.appendChild(el('div', 'pi-section', g.section));
        lastSection = g.section;
      }
      host.appendChild(buildGroup(g));
    }

    root.appendChild(partOne);

    var archToggle = el('button', 'pi-arch-toggle', 'Archival tags (Part II)');
    archToggle.setAttribute('type', 'button');
    archToggle.addEventListener('click', function () {
      var open = partTwo.style.display !== 'none';
      partTwo.style.display = open ? 'none' : 'block';
      this.classList.toggle('open', !open);
    });
    root.appendChild(archToggle);
    root.appendChild(partTwo);

    return root;
  }

  function buildGroup(g) {
    var sec = el('div', 'pi-group');
    sec.setAttribute('data-group', g.id);

    var header = el('div', 'pi-group-head');
    header.appendChild(el('span', 'pi-group-label', g.label));
    var meta = el('span', 'pi-group-meta');
    meta.appendChild(el('span', 'pi-group-count'));
    meta.appendChild(el('span', 'pi-chevron', '\u2193'));
    header.appendChild(meta);
    header.addEventListener('click', function () {
      sec.classList.toggle('open');
    });
    sec.appendChild(header);

    var body = el('div', 'pi-group-body');
    if (g.note) body.appendChild(el('div', 'pi-group-note', g.note));

    var list = el('div', 'pi-terms');
    for (var i = 0; i < g.terms.length; i++) {
      var item = g.terms[i];
      if (item.head) {
        list.appendChild(el('div', 'pi-subhead', item.head));
        continue;
      }
      list.appendChild(buildTerm(g, item));
    }
    body.appendChild(list);
    sec.appendChild(body);
    return sec;
  }

  function buildTerm(g, item) {
    var term = piNormTerm(item.t);
    var label = el('label', 'pi-term');
    label.setAttribute('data-term', term);
    label.setAttribute('data-group', g.id);

    var box = document.createElement('input');
    box.type = 'checkbox';
    box.className = 'pi-box';
    box.addEventListener('change', function () {
      toggle(g.id, term);
      writeHash();
      renderChecks();
      refresh();
    });

    var text = el('span', 'pi-term-text', item.t);
    var count = el('span', 'pi-term-count');

    label.appendChild(box);
    label.appendChild(text);
    if (item.note) {
      var note = el('span', 'pi-term-note', item.note);
      label.appendChild(note);
    }
    label.appendChild(count);
    return label;
  }

  function renderChecks() {
    var labels = document.querySelectorAll('#pi-facets .pi-term');
    for (var i = 0; i < labels.length; i++) {
      var l = labels[i];
      var gid = l.getAttribute('data-group');
      var term = l.getAttribute('data-term');
      var on = isSelected(gid, term);
      l.querySelector('.pi-box').checked = on;
      l.classList.toggle('on', on);
    }

    var groups = document.querySelectorAll('#pi-facets .pi-group');
    for (var k = 0; k < groups.length; k++) {
      var gid2 = groups[k].getAttribute('data-group');
      var n = state[gid2] ? state[gid2].length : 0;
      groups[k].querySelector('.pi-group-count').textContent = n ? String(n) : '';
      groups[k].classList.toggle('has-selection', n > 0);
      if (n > 0) groups[k].classList.add('open');
    }
  }

  function renderCounts() {
    var labels = document.querySelectorAll('#pi-facets .pi-term');
    for (var i = 0; i < labels.length; i++) {
      var l = labels[i];
      var gid = l.getAttribute('data-group');
      var term = l.getAttribute('data-term');
      var table = lastCounts[gid] || lastCounts['*'] || {};
      var n = table[term] || 0;
      l.querySelector('.pi-term-count').textContent = String(n);
      l.classList.toggle('empty', n === 0 && !isSelected(gid, term));
      l.querySelector('.pi-box').disabled = (n === 0 && !isSelected(gid, term));
    }
  }

  /* ---------- filtering ---------- */

  function applyToTiles(uuidSet) {
    var tiles = findTiles();
    var shown = 0;
    for (var i = 0; i < tiles.length; i++) {
      var keep = !uuidSet || uuidSet[tiles[i].uuid];
      tiles[i].el.classList.toggle('pi-hidden', !keep);
      if (keep) shown++;
    }

    /* PhotoDeck's thumbs_wall computes each tile's position once, as an
       inline transform: translate(x,y), in a masonry layout. Hiding a
       tile with display:none does not make it recompute — the gap just
       sits there. Dispatching resize is a cheap first experiment: many
       masonry engines relayout on it. If PhotoDeck's does too, this is
       enough; if not, we need to find its actual relayout hook. */
    if (window.dispatchEvent) {
      setTimeout(function () {
        window.dispatchEvent(new Event('resize'));
      }, 0);
    }

    return { shown: shown, onPage: tiles.length };
  }

  function setStatus(text, warn) {
    var s = document.getElementById('pi-status');
    if (!s) return;
    s.textContent = text;
    s.classList.toggle('warn', !!warn);
  }

  function refresh() {
    var params = [];
    for (var gid in state) {
      if (!state[gid] || !state[gid].length) continue;
      params.push('g=' + encodeURIComponent(gid + ':' + state[gid].join(',')));
    }
    var url = CFG.api + (params.length ? '?' + params.join('&') : '');

    setStatus('Filtering\u2026');

    fetch(url, { credentials: 'same-origin' })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.error) {
          setStatus('Filter index unavailable. ' + data.error, true);
          applyToTiles(null);
          return;
        }
        lastCounts = data.counts || { '*': {} };
        renderCounts();

        var set = null;
        if (activeGroupCount() > 0) {
          set = {};
          for (var i = 0; i < data.uuids.length; i++) set[data.uuids[i].toLowerCase()] = true;
        }
        var res = applyToTiles(set);

        if (!set) {
          setStatus(res.onPage + ' frames on this page \u00b7 ' + data.archive + ' in the archive');
        } else if (data.total > res.shown) {
          setStatus(res.shown + ' of ' + data.total + ' matches shown on this page \u00b7 '
            + (data.total - res.shown) + ' on later pages', true);
        } else {
          setStatus(res.shown + ' of ' + data.archive + ' frames match');
        }
      })
      .catch(function (err) {
        setStatus('Filter index unreachable.', true);
        applyToTiles(null);
      });
  }

  /* ---------- mount ---------- */

  function mount() {
    if (typeof PI_VOCAB === 'undefined') return;
    var tiles = findTiles();
    var grid = findGrid(tiles);
    if (!grid || !grid.parentNode) return;
    if (document.getElementById('pi-facets')) { mounted = true; return; }

    buildLookups();
    readHash();

    var panel = buildPanel();
    grid.parentNode.insertBefore(panel, grid);
    mounted = true;

    renderChecks();
    refresh();
  }

  function watchAjax() {
    var root = document.querySelector(CFG.ajaxRoot) || document.body;
    if (!window.MutationObserver) return;
    var pending = null;
    var obs = new MutationObserver(function () {
      clearTimeout(pending);
      pending = setTimeout(function () {
        if (!document.getElementById('pi-facets')) { mounted = false; mount(); }
        else if (mounted) refresh();
      }, 120);
    });
    obs.observe(root, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { mount(); watchAjax(); });
  } else {
    mount();
    watchAjax();
  }
})();
