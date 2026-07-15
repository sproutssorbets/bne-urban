/* ═══════════════════════════════════════════
   CONFIGURATION — edit only this block
═══════════════════════════════════════════ */
const ACTIVE = {
  suburbs: {
    'fortitude-valley': ['ann-street'],
    'west-end': ['montague-road'],
    'brisbane-city': ['roma-street', 'north-quay'],
    'kelvin-grove': ['victoria-park-road']
  },
  tags: ['2026']
};
/* ═══════════════════════════════════════════ */

const vocab = {
  'list-year': [
    {key:'2026',active:true}
  ],
  'list-viewtype': [
    {key:'building-exterior',active:false},{key:'building-facade',active:false},{key:'building-interior',active:false},
    {key:'streetscape',active:false},{key:'street-level',active:false},{key:'intersection',active:false},
    {key:'laneway',active:false},{key:'shopfront',active:false},{key:'bridge',active:false},
    {key:'river',active:false},{key:'park',active:false},{key:'public-space',active:false},
    {key:'aerial',active:false},{key:'cityscape',active:false},{key:'skyline',active:false},
    {key:'urban-detail',active:false},{key:'construction-site',active:false},{key:'demolition-site',active:false}
  ],
  'list-buildingtype': [
    {key:'residential-building',active:false},{key:'residential-tower',active:false},{key:'apartment-building',active:false},
    {key:'mixed-use-building',active:false},{key:'commercial-building',active:false},{key:'office-building',active:false},
    {key:'retail-building',active:false},{key:'hospitality-building',active:false},{key:'heritage-building',active:false},
    {key:'public-building',active:false},{key:'civic-building',active:false},{key:'industrial-building',active:false},
    {key:'warehouse',active:false},{key:'parking-structure',active:false},{key:'development-site',active:false}
  ],
  'list-housing': [
    {key:'queenslander',active:false},{key:'highset-house',active:false},{key:'lowset-house',active:false},
    {key:'workers-cottage',active:false},{key:'post-war-house',active:false},{key:'terrace',active:false},
    {key:'duplex',active:false},{key:'social-housing',active:false},{key:'student-housing',active:false}
  ],
  'list-publicrealm': [
    {key:'footpath',active:false},{key:'pavement',active:false},{key:'crossing',active:false},
    {key:'bike-lane',active:false},{key:'kerb',active:false},{key:'median',active:false},
    {key:'street-light',active:false},{key:'traffic-light',active:false},{key:'signage',active:false},
    {key:'wayfinding',active:false},{key:'bollard',active:false},{key:'fence',active:false},
    {key:'wall',active:false},{key:'awning',active:false},{key:'veranda',active:false},
    {key:'balcony',active:false},{key:'arcade',active:false},{key:'canopy',active:false},
    {key:'stairs',active:false},{key:'ramp',active:false},{key:'tree',active:false},
    {key:'planting',active:false},{key:'lawn',active:false},{key:'garden-bed',active:false},
    {key:'public-art',active:false},{key:'mural',active:false},{key:'monument',active:false},
    {key:'bus-stop',active:false},{key:'rail-infrastructure',active:false},{key:'outdoor-dining',active:false},
    {key:'street-trading',active:false},{key:'pedestrian-zone',active:false},{key:'shared-zone',active:false},
    {key:'shade-structure',active:false},{key:'gate',active:false},{key:'door',active:false},
    {key:'window',active:false},{key:'roof',active:false},{key:'entry',active:false},
    {key:'handrail',active:false},{key:'bench',active:false},{key:'seat',active:false},
    {key:'table',active:false},{key:'fountain',active:false},{key:'pool',active:false},
    {key:'playground',active:false},{key:'sports-court',active:false},{key:'amenity-deck',active:false}
  ],
  'list-arch': [
    {key:'high-rise',active:false},{key:'mid-rise',active:false},{key:'low-rise',active:false},
    {key:'tower',active:false},{key:'podium',active:false},{key:'corner-building',active:false},
    {key:'corner-tower',active:false},{key:'curved-facade',active:false},{key:'glass-facade',active:false},
    {key:'concrete-facade',active:false},{key:'brick-facade',active:false},{key:'face-brick',active:false},
    {key:'painted-brick',active:false},{key:'metal-facade',active:false},{key:'stone-facade',active:false},
    {key:'screen-facade',active:false},{key:'grid-facade',active:false},{key:'timber-facade',active:false},
    {key:'corrugated-iron',active:false},{key:'render',active:false},{key:'modern-architecture',active:false},
    {key:'contemporary-architecture',active:false},{key:'heritage-architecture',active:false},
    {key:'postwar-architecture',active:false},{key:'industrial-architecture',active:false},{key:'adaptive-reuse',active:false}
  ],
  'list-context': [
    {key:'heritage',active:false},{key:'demolition',active:false},{key:'scheduled-demolition',active:false},
    {key:'threatened-building',active:false},{key:'pre-construction',active:false},{key:'under-construction',active:false},
    {key:'construction-impact',active:false},{key:'site-hoarding',active:false},{key:'temporary-fencing',active:false},
    {key:'post-demolition',active:false},{key:'completed-development',active:false},{key:'development-site',active:false},
    {key:'vacant-site',active:false},{key:'urban-renewal',active:false},{key:'urban-intensification',active:false},
    {key:'urban-consolidation',active:false},{key:'waterfront',active:false},{key:'riverfront',active:false},
    {key:'transport-corridor',active:false},{key:'commercial-strip',active:false},{key:'night-economy',active:false},
    {key:'street-activation',active:false},{key:'flood-resilience',active:false},{key:'infrastructure',active:false},
    {key:'public-realm',active:false},{key:'hoarding-art',active:false}
  ],
  'list-use': [
    {key:'retail',active:false},{key:'shopping-centre',active:false},{key:'market',active:false},
    {key:'supermarket',active:false},{key:'showroom',active:false},{key:'cafe',active:false},
    {key:'restaurant',active:false},{key:'bar',active:false},{key:'pub',active:false},
    {key:'hotel',active:false},{key:'nightclub',active:false},{key:'food-hall',active:false},
    {key:'cinema',active:false},{key:'theatre',active:false},{key:'gallery',active:false},
    {key:'museum',active:false},{key:'library',active:false},{key:'performance-venue',active:false},
    {key:'concert-hall',active:false},{key:'exhibition-space',active:false},{key:'education',active:false},
    {key:'university',active:false},{key:'school',active:false},{key:'health',active:false},
    {key:'hospital',active:false},{key:'clinic',active:false},{key:'government',active:false},
    {key:'courthouse',active:false},{key:'place-of-worship',active:false},{key:'community-centre',active:false},
    {key:'stadium',active:false},{key:'arena',active:false},{key:'sports-facility',active:false},
    {key:'aquatic-centre',active:false},{key:'recreation',active:false},{key:'transport',active:false},
    {key:'train-station',active:false},{key:'bus-station',active:false},{key:'ferry-terminal',active:false},
    {key:'parking',active:false},{key:'residential',active:false},{key:'social-housing',active:false},
    {key:'office',active:false},{key:'commercial',active:false},{key:'mixed-use',active:false},{key:'public-use',active:false}
  ],
  'list-light': [
    {key:'morning',active:false},{key:'midday',active:false},{key:'afternoon',active:false},
    {key:'evening',active:false},{key:'night',active:false},{key:'golden-hour',active:false},
    {key:'blue-hour',active:false},{key:'sunset-light',active:false},{key:'city-lights',active:false},
    {key:'daylight',active:false},{key:'overcast',active:false},{key:'clear-sky',active:false},
    {key:'wet-weather',active:false},{key:'after-rain',active:false},{key:'neon-signage',active:false},
    {key:'artificial-light',active:false},{key:'reflection',active:false},{key:'shadow',active:false}
  ],
  'list-comp': [
    {key:'wide-view',active:false},{key:'close-view',active:false},{key:'detail-view',active:false},
    {key:'street-view',active:false},{key:'elevated-view',active:false},{key:'upward-perspective',active:false},
    {key:'frontal-view',active:false},{key:'oblique-view',active:false},{key:'architectural-elevation',active:false},
    {key:'context-view',active:false}
  ],
  'list-status': [
    {key:'existing-condition',active:false},{key:'under-construction',active:false},{key:'post-demolition',active:false},
    {key:'completed-development',active:false},{key:'vacant-site',active:false},
    {key:'scheduled-demolition',active:false},{key:'threatened-building',active:false}
  ],
  'list-olympic': [
    {key:'olympic-venue',active:false},{key:'olympic-infrastructure',active:false},{key:'transport-upgrade',active:false},
    {key:'athlete-village',active:false},{key:'temporary-structure',active:false},{key:'legacy-project',active:false}
  ]
};

/* ─────────────────────────────────────────
   SEARCH LOGIC
───────────────────────────────────────── */
function fmtLabel(k){ return k.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ') }
function getTerms(){ return document.getElementById('vocabState').value.trim().split(/\s+/).filter(Boolean) }

/* Address term lives separately from vocab terms — free text vs. controlled keys
   can't share one space-split field without breaking chip/accordion matching. */
let currentAddressTerm = '';

function syncRefineField(){
  const rawParts = [];
  const prettyParts = [];
  if(currentAddressTerm){ rawParts.push(currentAddressTerm); prettyParts.push(currentAddressTerm); }
  getTerms().forEach(t => { rawParts.push(t); prettyParts.push(fmtLabel(t)); });
  document.getElementById('refineInput').value = prettyParts.join(' · ');
  document.getElementById('searchSubmitValue').value = prettyParts.join(' ');
}

function setSearch(terms){
  document.getElementById('vocabState').value = terms.join(' ');
  renderTags();
  refreshAllLists();
  syncRefineField();
  document.getElementById('btnClear').style.display = terms.length ? 'block' : 'none';
}

/* A "location" term is a suburb key or a street key — these form a single
   mutually-exclusive group (pick one location at a time), separate from every
   other filter category which stays multi-select. */
function isLocationKey(key){
  if(typeof suburbLabels !== 'undefined' && suburbLabels[key]) return true;
  if(typeof streetsBySuburb !== 'undefined'){
    return Object.values(streetsBySuburb).some(list => list.some(s => s.key === key));
  }
  return false;
}

function toggleTerm(t){
  const terms = getTerms();
  if(isLocationKey(t)){
    if(terms.includes(t)){
      setSearch(terms.filter(x => x !== t));
    } else {
      const kept = terms.filter(x => !isLocationKey(x));
      currentAddressTerm = '';
      document.getElementById('smartInput').value = '';
      setSearch([...kept, t]);
    }
    return;
  }
  setSearch(terms.includes(t) ? terms.filter(x => x !== t) : [...terms, t]);
}

function renderTags(){
  const terms = getTerms();
  const container = document.getElementById('active-terms');
  const addressChip = currentAddressTerm
    ? `<div class="active-term"><span>${currentAddressTerm}</span><button onclick="clearAddressTerm()">×</button></div>`
    : '';
  const termChips = terms.map(t =>
    `<div class="active-term"><span>${fmtLabel(t)}</span><button onclick="toggleTerm('${t}')">×</button></div>`
  ).join('');
  container.innerHTML = addressChip + termChips;
  document.getElementById('btnClear').style.display = (terms.length || currentAddressTerm) ? 'block' : 'none';
}

function clearAddressTerm(){
  currentAddressTerm = '';
  document.getElementById('smartInput').value = '';
  renderTags();
  syncRefineField();
}

function buildList(listId, terms){
  const el = document.getElementById(listId);
  if(!el) return;
  el.innerHTML = (vocab[listId]||[]).map(item => {
    const t = item.key;
    const label = fmtLabel(t);
    if(!item.active){
      return `<li><a class="term-missing" tabindex="-1">${label} <span class="ind">·</span></a></li>`;
    }
    const sel = terms.includes(t) ? 'is-selected' : '';
    const sign = terms.includes(t) ? '−' : '+';
    return `<li><a class="${sel}" onclick="toggleTerm('${t}');return false;">${label} <span class="ind">${sign}</span></a></li>`;
  }).join('');
}

function clearAll(){
  currentAddressTerm = '';
  setSearch([]);
  activeSuburb = null;
  renderSuburbList([]);
  document.getElementById('smartInput').value = '';
  closeDropdown();
}


function doSearch(){
  const q = document.getElementById('searchSubmitValue').value.trim();
  if(q.length === 0) return;
  document.getElementById('searchForm').submit();
}

/* Called from a documented-pin popup: adds that location's suburb to the
   active filters and scrolls the visitor to the filter section to refine further. */
function addLocationToSearch(addressText){
  if(addressText){
    currentAddressTerm = addressText;
    document.getElementById('smartInput').value = addressText;
  }
  const kept = getTerms().filter(t => !isLocationKey(t));
  document.getElementById('vocabState').value = kept.join(' ');
  activeSuburb = null;
  renderSuburbList(kept);
  refreshAllLists();
  renderTags();
  syncRefineField();
  if(window._activePopup) window._activePopup.remove();
  if(window._searchPopup) { window._searchPopup.remove(); window._searchPopup = null; }
  const target = document.getElementById('filters-label');
  if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
}

function toggleAcc(id){
  document.getElementById(id).classList.toggle('open');
}

/* ─────────────────────────────────────────
   SMART DROPDOWN
───────────────────────────────────────── */
let geocoderSuggestions = [];
let ddVisible = false;
let mapInstance = null;

function openDropdown(){ document.getElementById('smart-dropdown').style.display='block'; ddVisible=true; }
function closeDropdown(){ document.getElementById('smart-dropdown').style.display='none'; ddVisible=false; }

function buildAddrList(suggestions){
  const ddAddr = document.getElementById('dd-addr');
  const ddAddrList = document.getElementById('dd-addr-list');
  if(!suggestions||suggestions.length===0){ ddAddr.style.display='none'; return; }
  ddAddr.style.display='';
  ddAddrList.innerHTML = suggestions.slice(0,6).map((s,i) => {
    const name = s.name || '';
    const sub = s.place_formatted || '';
    const badge = s.kind === 'alias' ? 'Place' : (s.feature_type === 'poi' ? 'Place' : 'Map');
    return `<div class="dd-item" onclick="pickAddress(${i})">
      <div class="dd-item-left">
        <svg style="width:12px;height:12px;flex-shrink:0;opacity:0.35" viewBox="0 0 12 12"><path d="M6 1C4.34 1 3 2.34 3 4c0 2.5 3 7 3 7s3-4.5 3-7c0-1.66-1.34-3-3-3z" stroke="#111" stroke-width="1.1" fill="none"/><circle cx="6" cy="4" r="1" fill="#111"/></svg>
        <div style="min-width:0;flex:1">
          <div class="dd-item-text">${name}</div>
          <div class="dd-item-sub">${sub}</div>
        </div>
      </div>
      <span class="dd-badge">${badge}</span>
    </div>`;
  }).join('');
}

async function pickAddress(idx){
  const s = geocoderSuggestions[idx];
  if(!s||!mapInstance) return;

  let center, title, sub;

  if(s.kind === 'alias'){
    center = s.center;
    title = s.name;
    sub = s.place_formatted;
  } else {
    /* Search Box: retrieve coordinates for the chosen suggestion.
       This retrieve closes the billing session. */
    try {
      const token = sbSessionToken();
      const url = `https://api.mapbox.com/search/searchbox/v1/retrieve/${s.mapbox_id}`
        + `?access_token=${mapboxgl.accessToken}&session_token=${token}`;
      const res = await fetch(url);
      const data = await res.json();
      const feat = (data.features||[])[0];
      if(!feat) { sbSessionEnd(); return; }
      center = feat.geometry.coordinates;
      title = feat.properties.name || s.name;
      sub = feat.properties.place_formatted || s.place_formatted || '';
    } catch(e){ sbSessionEnd(); return; }
  }
  sbSessionEnd();

  document.getElementById('smartInput').value = title;
  closeDropdown();

  currentAddressTerm = title;
  const keptTerms = getTerms().filter(t => !isLocationKey(t));
  document.getElementById('vocabState').value = keptTerms.join(' ');
  activeSuburb = null;
  renderSuburbList(keptTerms);
  refreshAllLists();
  renderTags();
  syncRefineField();
  document.getElementById('btnClear').style.display = 'block';

  mapInstance.flyTo({center:center, zoom:16, duration:800});

  if(window._searchMarker) { window._searchMarker.remove(); window._searchMarker = null; }
  if(window._searchPopup) { window._searchPopup.remove(); window._searchPopup = null; }
  if(window._activePopup) { window._activePopup.remove(); window._activePopup = null; }

  const el = document.createElement('div');
  el.style.cssText = 'width:16px;height:16px;border-radius:50%;border:2px dashed #6B6B6B;background:rgba(247,247,245,0.8);cursor:pointer;';
  window._searchMarker = new mapboxgl.Marker({element:el}).setLngLat(center).addTo(mapInstance);

  const buildPopup = () => {
    const nearby = locations.filter(l => {
      if(!l.documented || isNaN(l.coords[0])) return false;
      const dx = (l.coords[0] - center[0]) * 111320 * Math.cos(center[1] * Math.PI / 180);
      const dy = (l.coords[1] - center[1]) * 110540;
      return Math.sqrt(dx * dx + dy * dy) < 400;
    });
    const nearbyHtml = nearby.length > 0
      ? `<div style="margin-top:8px;padding-top:8px;border-top:1px solid #DADADA;font-size:10px;color:#6B6B6B;font-family:Inter,sans-serif;">${nearby.length} documented location${nearby.length > 1 ? 's' : ''} nearby</div>`
      : `<div style="margin-top:8px;padding-top:8px;border-top:1px solid #DADADA;font-size:10px;color:#AAAAAA;font-family:Inter,sans-serif;">No photos at this location yet</div>`;
    return new mapboxgl.Popup({closeButton:true, maxWidth:'240px', offset:16})
      .setLngLat(center)
      .setHTML(`<div style="padding:10px 12px 12px;font-family:Inter,sans-serif;">
        <div style="font-size:9px;font-weight:500;letter-spacing:0.16em;text-transform:uppercase;color:#6B6B6B;margin-bottom:4px;">Search result</div>
        <div style="font-size:13px;color:#111;line-height:1.4;">${title}</div>
        <div style="font-size:11px;color:#6B6B6B;margin-top:1px;">${sub}</div>
        ${nearbyHtml}
      </div>`);
  };

  el.addEventListener('click', () => {
    /* Mobile keeps only the documented-pin popup (has the "add to filters"
       action) — the plain search-marker popup is redundant screen space there. */
    if (window.matchMedia('(max-width: 900px)').matches) return;
    if(window._searchPopup) window._searchPopup.remove();
    if(window._activePopup) { window._activePopup.remove(); window._activePopup = null; }
    window._searchPopup = buildPopup().addTo(mapInstance);
  });
}

/* Local place aliases — names Mapbox does not index (e.g. Indigenous names).
   Checked before Mapbox, no API call, no cost. */
const PLACE_ALIASES = [
  {
    match: ['barrambin','victoria park barrambin','victoria park / barrambin'],
    name: 'Victoria Park / Barrambin',
    context: 'Herston, Brisbane',
    center: [153.02936, -27.45651]
  }
];

function aliasMatches(q){
  const qq = q.toLowerCase().trim();
  return PLACE_ALIASES.filter(a => a.match.some(m => m.includes(qq) || qq.includes(m)));
}

/* Search Box session — one token per search, reset after a pick or 3 min idle.
   Keeping one token per search (not per keystroke) is what keeps this within
   the free session tier. */
let sbSession = null;
let sbSessionTimer = null;
function sbSessionToken(){
  if(!sbSession){
    sbSession = 'pi-' + Date.now() + '-' + Math.random().toString(36).slice(2,8);
  }
  clearTimeout(sbSessionTimer);
  sbSessionTimer = setTimeout(()=>{ sbSession = null; }, 180000);
  return sbSession;
}
function sbSessionEnd(){ sbSession = null; clearTimeout(sbSessionTimer); }

let ddTimer;
function onSmartInput(){
  const q = document.getElementById('smartInput').value.trim();
  document.getElementById('btnClear').style.display = (q.length>0||getTerms().length>0) ? 'block' : 'none';
  clearTimeout(ddTimer);
  ddTimer = setTimeout(async () => {
    if(q.length >= 2 && mapboxgl.accessToken){
      try {
        const token = sbSessionToken();
        const url = `https://api.mapbox.com/search/searchbox/v1/suggest?q=${encodeURIComponent(q)}`
          + `&access_token=${mapboxgl.accessToken}`
          + `&session_token=${token}`
          + `&language=en&country=au`
          + `&proximity=153.0251,-27.4698`
          + `&bbox=152.95,-27.7,153.25,-27.30`
          + `&limit=6`;
        const res = await fetch(url);
        const data = await res.json();
        const remote = (data.suggestions||[]).map(s => ({
          kind: 'sb',
          mapbox_id: s.mapbox_id,
          name: s.name,
          place_formatted: s.place_formatted || s.full_address || '',
          feature_type: s.feature_type
        }));
        /* local aliases first, then Mapbox */
        const local = aliasMatches(q).map(a => ({
          kind: 'alias', name: a.name, place_formatted: a.context, center: a.center
        }));
        geocoderSuggestions = [...local, ...remote];
        buildAddrList(geocoderSuggestions);
      } catch(e){ document.getElementById('dd-addr').style.display='none'; }
    } else {
      document.getElementById('dd-addr').style.display='none';
      geocoderSuggestions = [];
    }
    const hasContent = document.getElementById('dd-addr').style.display!=='none';
    if(hasContent) openDropdown(); else closeDropdown();
  }, 150);
}

/* ─────────────────────────────────────────
   SUBURB / STREET LOGIC
───────────────────────────────────────── */
let activeSuburb = null;
const suburbLabels = {
  'albion':'Albion','bowen-hills':'Bowen Hills','brisbane-city':'Brisbane City','fortitude-valley':'Fortitude Valley',
  'kangaroo-point':'Kangaroo Point','kelvin-grove':'Kelvin Grove',
  'milton':'Milton','new-farm':'New Farm','newstead':'Newstead',
  'paddington':'Paddington','petrie-terrace':'Petrie Terrace','red-hill':'Red Hill',
  'south-brisbane':'South Brisbane','spring-hill':'Spring Hill','teneriffe':'Teneriffe',
  'west-end':'West End','woolloongabba':'Woolloongabba'
};

function renderSuburbList(terms){
  const list = document.getElementById('list-suburb');
  const titleEl = document.getElementById('suburb-col-title');
  if(titleEl) titleEl.innerHTML = '';
  activeSuburb = null;
  list.innerHTML = Object.keys(suburbLabels)
    .sort((a,b) => suburbLabels[a].localeCompare(suburbLabels[b]))
    .map(key => {
      const hasActive = (streetsBySuburb[key]||[]).some(s => s.active);
      const sel = terms.includes(key) ? 'is-selected' : '';
      const sign = terms.includes(key) ? '−' : '+';
      if(!hasActive){
        return `<li><a class="term-missing" tabindex="-1">${suburbLabels[key]} <span class="ind">·</span></a></li>`;
      }
      return `<li><a class="${sel}" onclick="selectSuburb('${key}');return false;">${suburbLabels[key]} <span class="ind">${sign}</span></a></li>`;
    }).join('');
}

function selectSuburb(key){
  const terms = getTerms();
  if(terms.includes(key)){
    setSearch(terms.filter(t => t !== key));
    activeSuburb = null;
    renderSuburbList(getTerms());
    return;
  }
  const kept = terms.filter(t => !isLocationKey(t));
  currentAddressTerm = '';
  document.getElementById('smartInput').value = '';
  activeSuburb = key;
  setSearch([...kept, key]);
  refreshStreetList(getTerms());
}

function refreshStreetList(terms){
  if(!activeSuburb) return;
  const list = document.getElementById('list-suburb');
  const titleEl = document.getElementById('suburb-col-title');
  if(titleEl) titleEl.innerHTML = `<button class="back-btn" onclick="backToSuburbs();return false;">← ${suburbLabels[activeSuburb]||activeSuburb}</button>`;
  const streets = streetsBySuburb[activeSuburb] || [];
  list.innerHTML = streets.map(s => {
    if(!s.active){
      return `<li><a class="term-missing" tabindex="-1">${s.label} <span class="ind">·</span></a></li>`;
    }
    const sel = terms.includes(s.key) ? 'is-selected' : '';
    const sign = terms.includes(s.key) ? '−' : '+';
    return `<li><a class="${sel}" onclick="toggleTerm('${s.key}');return false;">${s.label} <span class="ind">${sign}</span></a></li>`;
  }).join('');
}

function backToSuburbs(){ renderSuburbList(getTerms()); }

function refreshAllLists(){
  const terms = getTerms();
  Object.keys(vocab).forEach(id => buildList(id, terms));
  if(activeSuburb) refreshStreetList(terms);
  else renderSuburbList(terms);
}

function applyActiveConfig(){
  Object.entries(ACTIVE.suburbs).forEach(([suburb, streets]) => {
    if(streetsBySuburb[suburb]){
      streetsBySuburb[suburb].forEach(s => { if(streets.includes(s.key)) s.active = true; });
    }
  });
  Object.keys(vocab).forEach(listId => {
    vocab[listId].forEach(item => { if(ACTIVE.tags.includes(item.key)) item.active = true; });
  });
}

/* Dim and push to the bottom any category with zero documented terms,
   so the visitor immediately sees where there is something to find. */
function sortFilterGroups(){
  const accToVocab = {
    'acc-year':'list-year','acc-viewtype':'list-viewtype','acc-buildingtype':'list-buildingtype',
    'acc-housing':'list-housing','acc-publicrealm':'list-publicrealm','acc-arch':'list-arch',
    'acc-context':'list-context','acc-use':'list-use','acc-light':'list-light',
    'acc-comp':'list-comp','acc-status':'list-status','acc-olympic':'list-olympic'
  };
  let anyEmpty = false;
  Object.entries(accToVocab).forEach(([accId, listId]) => {
    const el = document.getElementById(accId);
    if(!el) return;
    const hasActive = (vocab[listId]||[]).some(i => i.active);
    el.classList.toggle('acc-empty', !hasActive);
    if(!hasActive) anyEmpty = true;
  });
  const locationEl = document.getElementById('acc-location');
  if(locationEl){
    const locationActive = Object.values(streetsBySuburb).some(list => list.some(s => s.active));
    locationEl.classList.toggle('acc-empty', !locationActive);
    if(!locationActive) anyEmpty = true;
  }
  const divider = document.getElementById('filters-divider');
  if(divider) divider.style.display = anyEmpty ? '' : 'none';

  /* Plain block flow ignores CSS order, so physically move nodes:
     non-empty categories first, divider, then empty categories. */
  const container = document.getElementById('filters-wide');
  const allAcc = Array.from(container.querySelectorAll('.acc'));
  const nonEmpty = allAcc.filter(el => !el.classList.contains('acc-empty'));
  const empty = allAcc.filter(el => el.classList.contains('acc-empty'));
  nonEmpty.forEach(el => container.appendChild(el));
  if(divider) container.appendChild(divider);
  empty.forEach(el => container.appendChild(el));
}

/* ─────────────────────────────────────────
   TOAST
───────────────────────────────────────── */
let toastTimer;
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('vis');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('vis'), 2000);
}

/* ─────────────────────────────────────────
   LEGEND STATUS FILTERS
───────────────────────────────────────── */
const statusVisible = {proposed:true,approved:true,under_construction:true,masterplan:true,appealed_refused:true,completed:true,infrastructure:true};

function toggleLegend(){
  const el = document.getElementById('legend');
  const open = el.classList.toggle('open');
  const btn = document.getElementById('legend-toggle');
  if(btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

function toggleStatus(status){
  statusVisible[status] = !statusVisible[status];
  const btn = document.getElementById('btn-'+status);
  if(btn){
    const ind = btn.querySelector('.legend-ind');
    if(ind) ind.textContent = statusVisible[status] ? '−' : '+';
    btn.style.opacity = statusVisible[status] ? '1' : '0.4';
  }
  if(window._mapInstance){
    const visible = statusVisible[status] ? 'visible' : 'none';
    [('dev-'+status),('dev-'+status+'-line')].forEach(layerId => {
      if(window._mapInstance.getLayer(layerId)){
        window._mapInstance.setLayoutProperty(layerId, 'visibility', visible);
      }
    });
  }
}

/* ─────────────────────────────────────────
   MAP
───────────────────────────────────────── */
const locations = [];

async function loadLocations(){
  try {
    const res = await fetch('https://raw.githubusercontent.com/sproutssorbets/bne-urban-index/main/locations.csv?t=' + Date.now());
    const text = await res.text();
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',');
    lines.slice(1).forEach(line => {
      const cols = [];
      let cur = '', inQ = false;
      for(let c of line){
        if(c==='"') inQ=!inQ;
        else if(c===','&&!inQ){cols.push(cur);cur='';}
        else cur+=c;
      }
      cols.push(cur);
      const row = {};
      headers.forEach((h,i) => row[h.trim()]=(cols[i]||'').trim());
      locations.push({
        coords: [parseFloat(row.lng), parseFloat(row.lat)],
        ref: row.ref||null, street: row.street, address: row.address||'', suburb: row.suburb,
        date: row.date||null, count: row.count?parseInt(row.count):null,
        thumb: row.thumb&&row.thumb!=='null'?row.thumb:null,
        licenseUrl: row.licenseUrl||'https://photoindex.photodeck.com/licensing',
        archiveUrl: row.archiveUrl||('#'),
        suburbKey: row.suburb ? row.suburb.toLowerCase().replace(/\s+/g,'-') : null,
        status: row.status||null,
        documented: row.documented!=='false'
      });
    });
    document.getElementById('docCount').textContent = locations.filter(l=>l.documented).length + ' location' + (locations.filter(l=>l.documented).length===1?'':'s') + ' documented';
    loadArchiveDate();
  } catch(e){
    console.error('Failed to load locations:', e);
    document.getElementById('docCount').textContent = '— locations documented';
  }
  initMap();
}

/* Archive date — computed from the loaded locations, no API call */
function loadArchiveDate(){
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  let latest = null;
  let latestHasDay = false;
  locations.forEach(l => {
    if(!l.date) return;
    const m = l.date.match(/^(?:(\d{1,2})\s+)?([A-Za-z]+)\s+(\d{4})$/);
    if(!m) return;
    const mi = months.indexOf(m[2]);
    if(mi < 0) return;
    const day = m[1] ? parseInt(m[1]) : 1;
    const d = new Date(parseInt(m[3]), mi, day);
    if(!latest || d > latest){ latest = d; latestHasDay = !!m[1]; }
  });
  if(latest){
    const text = latestHasDay
      ? 'Last updated ' + latest.getDate() + ' ' + months[latest.getMonth()] + ' ' + latest.getFullYear()
      : 'Last updated ' + months[latest.getMonth()] + ' ' + latest.getFullYear();
    document.getElementById('archiveDate').textContent = text;
  }
}

mapboxgl.accessToken = 'pk.eyJ1IjoicGhvdG9pbmRleCIsImEiOiJjbW44aHl6NnMwYW1nMnBxMHdwc2VraTltIn0.B_Xqmf3Asxs1m_SVXIc7XQ';

function initMap(){
  const map = new mapboxgl.Map({
    container:'map', style:'mapbox://styles/mapbox/light-v11',
    center:[153.0307,-27.4598], zoom:14, minZoom:11, maxZoom:19
  });
  mapInstance = map;
  window._mapInstance = map;

  /* Scroll over the map zooms it by default (Mapbox behaviour), which traps
     visitors trying to scroll the page. Require Ctrl/Cmd to zoom, like Google
     Maps embeds; a plain scroll passes through to the page instead, with a
     brief hint explaining why. */
  let scrollHintTimer;
  map.getContainer().addEventListener('wheel', function(e){
    if(!(e.ctrlKey || e.metaKey)){
      e.stopPropagation();
      const hint = document.getElementById('scroll-hint');
      if(hint){
        hint.classList.add('vis');
        clearTimeout(scrollHintTimer);
        scrollHintTimer = setTimeout(() => hint.classList.remove('vis'), 1000);
      }
    }
  }, true);

  map.addControl(new mapboxgl.NavigationControl({showCompass:false}),'bottom-right');

  map.on('load', () => {
    /* Desaturate all base map layers, keep data layers coloured */
    const baseLayers = map.getStyle().layers.map(l => l.id);
    baseLayers.forEach(id => {
      const layer = map.getStyle().layers.find(l => l.id === id);
      if(!layer) return;
      try {
        if(layer.type === 'background') map.setPaintProperty(id, 'background-color', '#F0EFEB');
        if(layer.type === 'fill') { map.setPaintProperty(id, 'fill-color', '#E8E8E4'); map.setPaintProperty(id, 'fill-outline-color', '#DADADA'); }
        if(layer.type === 'line') map.setPaintProperty(id, 'line-color', '#CACAC6');
        if(layer.type === 'symbol') { try{ map.setPaintProperty(id, 'text-color', '#888'); }catch(e){} try{ map.setPaintProperty(id, 'icon-color', '#888'); }catch(e){} }
      } catch(e) {}
    });
    /* Suburb boundaries */
    const suburbData = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[153.019995022748,-27.4955382997234],[153.014466721804,-27.4913922225288],[153.012600173937,-27.490870941453],[153.001906527285,-27.4914334679751],[152.997391260687,-27.4904108748952],[152.995830886077,-27.4894829489023],[152.995310813579,-27.4879363948988],[152.99904754058,-27.4815744198521],[152.996426016687,-27.479849267051],[152.9962780337,-27.4783595231582],[152.995451697148,-27.4777159272758],[152.992968680286,-27.4796137610713],[152.992454433313,-27.479076239003],[152.992922031714,-27.4787214207626],[152.991729253888,-27.4774815993771],[152.992175118451,-27.4771433278467],[152.991795504745,-27.4767453182575],[152.990887107227,-27.4774138810715],[152.989583517069,-27.4765952775562],[152.988051647166,-27.4763785387351],[152.988227378309,-27.4754346403267],[152.987592574458,-27.4751143995903],[152.988411235906,-27.4708636721796],[152.987802955855,-27.4713798188218],[152.987276571846,-27.4708752958077],[152.986360560106,-27.4713413664127],[152.98654624453,-27.4703689907269],[152.989114392338,-27.470115328619],[152.98910354445,-27.4693514271278],[152.989604371407,-27.4689441794334],[152.989169808244,-27.4688801341869],[152.989320452434,-27.4682299887337],[152.991039287003,-27.4683545411893],[152.99246755517,-27.4672847420843],[152.991758148575,-27.4668163240997],[152.991984355744,-27.4655643883442],[152.988880474127,-27.465137059302],[152.988300953221,-27.4625835438165],[152.9884524617,-27.460853086577],[152.988953057996,-27.4602868503656],[152.98853220495,-27.4600100159403],[152.988984045858,-27.4597532319835],[152.988534626872,-27.4598238713691],[152.988418844665,-27.4579635206244],[152.987853145076,-27.4582345734143],[152.987081122798,-27.4575167991071],[152.985743624819,-27.4574349243734],[152.988625985806,-27.4551830533767],[152.988250334618,-27.4548558019668],[152.98876599697,-27.4546381621261],[152.988581841513,-27.4538894614999],[152.989649815794,-27.4532147365028],[152.990592826962,-27.4536276923635],[152.990955261721,-27.4529568792226],[152.993238870874,-27.4532108036482],[152.993450005632,-27.452161650449],[152.994240541548,-27.4521558687387],[152.992507693427,-27.4518848536072],[152.992649203228,-27.4511593311904],[152.991447609785,-27.4506186116823],[152.992068281645,-27.4497833801454],[152.991762010558,-27.4489155063553],[152.995208924667,-27.4486909083154],[152.994682459612,-27.4473288167254],[152.99623064538,-27.4460904623791],[152.997912859559,-27.4473313938585],[152.997362209065,-27.4487898598322],[152.998163586387,-27.448890093733],[152.998892685406,-27.4483416188006],[153.000219677654,-27.4490769615281],[153.000284952167,-27.4482249729966],[153.000999694134,-27.4480377169782],[153.000358742336,-27.4464201806825],[153.000828054822,-27.4459297685604],[153.002045121914,-27.4450912949675],[153.004540075216,-27.4449011423414],[153.005343963975,-27.4434246087803],[153.0079524938,-27.442097467082],[153.008815158942,-27.4424339051572],[153.009417412022,-27.4418521107136],[153.009178888076,-27.4412635597698],[153.010081362269,-27.4404052679892],[153.011204231818,-27.4405493031197],[153.013242115225,-27.4424519662755],[153.016510095839,-27.4408461053254],[153.017688240115,-27.4407343609755],[153.021570537349,-27.4423198302951],[153.023638110257,-27.4423170666635],[153.024344388318,-27.443727409602],[153.026918912701,-27.4439534531031],[153.02811576576,-27.4445939943382],[153.029588790962,-27.4435101363611],[153.0309879132,-27.4448603758095],[153.032556535496,-27.4448215508625],[153.032931925865,-27.4440905676053],[153.032670313506,-27.4421179807416],[153.037785055614,-27.4380285431896],[153.038594322001,-27.4349258014218],[153.040023999001,-27.4335060035806],[153.039041752866,-27.4332911150602],[153.03943985936,-27.430123880683],[153.039022374011,-27.4296679945197],[153.03651493307,-27.42923221653],[153.036318058688,-27.4288046348862],[153.036586168603,-27.427580504881],[153.03719175272,-27.427342869251],[153.036655459585,-27.4268977489991],[153.037006911359,-27.4260664350814],[153.037405896652,-27.4261212345138],[153.037052077437,-27.4258890066501],[153.037256222072,-27.424724525694],[153.039810057089,-27.4253618565895],[153.039873201205,-27.4250014949183],[153.041468452204,-27.4252236108124],[153.041405300556,-27.4255827814909],[153.042002911982,-27.4256657213046],[153.042127283854,-27.4249850503809],[153.045169154719,-27.4254034610787],[153.044749210475,-27.42544798645],[153.044633949739,-27.426100776331],[153.045052486145,-27.4281061593159],[153.047742420956,-27.428220614762],[153.049874569195,-27.4273117341364],[153.050338591141,-27.4277032246618],[153.050227308552,-27.4283820913782],[153.051164203752,-27.4283696279275],[153.051089407396,-27.4288311606832],[153.056698076422,-27.4296103500035],[153.057060712393,-27.4283735023372],[153.058229759904,-27.4284944254445],[153.057811357703,-27.4282910695797],[153.058347211658,-27.4274376125238],[153.057573737414,-27.4269393847525],[153.057679430837,-27.426302568824],[153.058410697294,-27.4264019746667],[153.058661372069,-27.4259492259106],[153.058261484843,-27.4258948731952],[153.0588499319,-27.4248286875942],[153.058337994745,-27.4244455565288],[153.058447265906,-27.4237643573267],[153.059142956557,-27.4230631526358],[153.059673936422,-27.4235828832783],[153.062694214763,-27.4240012332478],[153.062753813151,-27.4236419001346],[153.063368760565,-27.4237260541541],[153.063489534857,-27.4229670790445],[153.063222542338,-27.4264606628309],[153.064569108136,-27.42488713041],[153.072724975479,-27.4260553590132],[153.073109448213,-27.4236374307001],[153.08005547394,-27.4245711973919],[153.079759776301,-27.4276705715289],[153.081638251859,-27.4305911846537],[153.078615649375,-27.4314530298746],[153.077684064902,-27.4352779194611],[153.074811792515,-27.4360170397989],[153.071260725871,-27.4374715343765],[153.071161222985,-27.4378752951146],[153.075522152874,-27.4384125354609],[153.079261099452,-27.4371908265788],[153.07890609419,-27.439299736433],[153.085381891642,-27.4398645195915],[153.084766064052,-27.4412967975003],[153.089182744995,-27.4453793441243],[153.090061249762,-27.4477308357924],[153.079096887741,-27.4460377054082],[153.06401004458,-27.441641057184],[153.05501681562,-27.4407278760105],[153.052594996738,-27.4408954464265],[153.050743744266,-27.4415667667432],[153.048696078742,-27.443701468913],[153.048783614891,-27.4457169555883],[153.051946683614,-27.4548159097806],[153.052590933419,-27.462717928701],[153.055998783303,-27.4683390730095],[153.055878388187,-27.4697856397894],[153.054772902351,-27.4714208629835],[153.050029244209,-27.4748964772647],[153.050118954892,-27.4765943381184],[153.049259352864,-27.4787980400545],[153.049862313654,-27.4792733497483],[153.050999584608,-27.4788067946827],[153.051644776033,-27.4768276144058],[153.052789460084,-27.4766752877254],[153.054424661098,-27.4781950131131],[153.052956665811,-27.479869448731],[153.052927942885,-27.4816712824148],[153.056445892094,-27.4795588575198],[153.057102853374,-27.4797097532068],[153.05729232113,-27.4804371007698],[153.056748906165,-27.4814820384545],[153.056711094017,-27.4835317742515],[153.05252264689,-27.4828650672828],[153.051056475814,-27.485922016886],[153.050455913797,-27.4898518774958],[153.047801250103,-27.4921462320474],[153.047604368244,-27.4960992416527],[153.041916527034,-27.4980957359464],[153.041729802334,-27.4991135084366],[153.042137855414,-27.4992650605102],[153.04168049451,-27.4993823475755],[153.041406945457,-27.5008734843581],[153.042011859012,-27.5009649702002],[153.041864686199,-27.5017702433425],[153.026568602982,-27.4997709380649],[153.026309961937,-27.5007421887154],[153.021729308856,-27.5000528533946],[153.019995022748,-27.4955382997234]]]}}]};

    map.addSource('suburbs',{type:'geojson',data:suburbData});
    map.addLayer({id:'suburbs-fill',type:'fill',source:'suburbs',paint:{'fill-color':'#F7F7F5','fill-opacity':0.15}});
    map.addLayer({id:'suburbs-line',type:'line',source:'suburbs',paint:{'line-color':'#DADADA','line-width':1}});

    /* Documented pins */
    const docFeatures = locations.filter(l=>l.documented&&!isNaN(l.coords[0])).map(l=>({
      type:'Feature', geometry:{type:'Point',coordinates:l.coords},
      properties:{ref:l.ref,street:l.street,address:l.address||'',suburb:l.suburb,date:l.date,count:l.count,thumb:l.thumb,archiveUrl:l.archiveUrl,licenseUrl:l.licenseUrl,suburbKey:l.suburbKey}
    }));
    map.addSource('documented',{
      type:'geojson',
      data:{type:'FeatureCollection',features:docFeatures},
      cluster:true,
      clusterRadius:70,
      clusterMaxZoom:16
    });

    /* Cluster circles — black bubble with white count, PhotoIndex style */
    map.addLayer({id:'doc-clusters',type:'circle',source:'documented',filter:['has','point_count'],paint:{
      'circle-color':'#111111',
      'circle-stroke-width':2,
      'circle-stroke-color':'#F7F7F5',
      'circle-radius':['step',['get','point_count'],15,5,19,15,24]
    }});
    map.addLayer({id:'doc-cluster-count',type:'symbol',source:'documented',filter:['has','point_count'],layout:{
      'text-field':['get','point_count_abbreviated'],
      'text-font':['DIN Offc Pro Medium','Arial Unicode MS Bold'],
      'text-size':12
    },paint:{'text-color':'#F7F7F5'}});

    /* Single (unclustered) building pins */
    map.addLayer({id:'doc-pins',type:'circle',source:'documented',filter:['!',['has','point_count']],paint:{
      'circle-radius':6,'circle-color':'#111111','circle-stroke-width':2,'circle-stroke-color':'#F7F7F5'
    }});

    /* Click a cluster — zoom in and expand */
    map.on('click','doc-clusters',e=>{
      const features = map.queryRenderedFeatures(e.point,{layers:['doc-clusters']});
      const clusterId = features[0].properties.cluster_id;
      map.getSource('documented').getClusterExpansionZoom(clusterId,(err,zoom)=>{
        if(err) return;
        map.easeTo({center:features[0].geometry.coordinates,zoom:zoom});
      });
    });
    map.on('mouseenter','doc-clusters',()=>{map.getCanvas().style.cursor='pointer'});
    map.on('mouseleave','doc-clusters',()=>{map.getCanvas().style.cursor=''});

    /* Development projects — polygons loaded from external GeoJSON, 3 statuses */
    const statusColors = {
      proposed:'#DB4436', approved:'#009D57', under_construction:'#4186F0'
    };
    const DEV_SHOWN = ['proposed','approved','under_construction'];

    /* Initialise empty sources + fill and outline layers for each status */
    DEV_SHOWN.forEach(status => {
      map.addSource('dev-'+status,{type:'geojson',data:{type:'FeatureCollection',features:[]}});
      map.addLayer({id:'dev-'+status,type:'fill',source:'dev-'+status,paint:{
        'fill-color':statusColors[status],'fill-opacity':0.30
      }}, 'doc-clusters');
      map.addLayer({id:'dev-'+status+'-line',type:'line',source:'dev-'+status,paint:{
        'line-color':statusColors[status],'line-opacity':0.55,'line-width':1
      }}, 'doc-clusters');
    });

    loadKMLData(map, statusColors);

    /* Hover tooltip for development polygons */
    const tooltip = document.createElement('div');
    tooltip.style.cssText = 'position:absolute;background:#111;color:#F7F7F5;padding:5px 10px;font-family:Inter,sans-serif;font-size:11px;font-weight:500;letter-spacing:0.06em;pointer-events:none;opacity:0;transition:opacity 0.15s;z-index:10;white-space:nowrap;';
    document.getElementById('map').appendChild(tooltip);

    DEV_SHOWN.forEach(status => {
      map.on('mouseenter', 'dev-'+status, e => {
        if(window._activePopup) return; /* FIX: don't show the polygon tooltip while a pin popup is open */
        map.getCanvas().style.cursor = 'pointer';
        const name = e.features[0].properties.name;
        if(!name) return;
        tooltip.textContent = name;
        tooltip.style.opacity = '1';
      });
      map.on('mousemove', 'dev-'+status, e => {
        if(window._activePopup) return; /* FIX: keep it hidden/still while a pin popup is open */
        const rect = document.getElementById('map').getBoundingClientRect();
        tooltip.style.left = (e.originalEvent.clientX - rect.left + 12) + 'px';
        tooltip.style.top = (e.originalEvent.clientY - rect.top - 28) + 'px';
      });
      map.on('mouseleave', 'dev-'+status, () => {
        map.getCanvas().style.cursor = '';
        tooltip.style.opacity = '0';
      });
    });

    async function loadKMLData(map, statusColors) {
      try {
        const url = 'https://raw.githubusercontent.com/sproutssorbets/bne-urban/main/brisbane-development.geojson?t=' + Date.now();
        const res = await fetch(url);
        if(!res.ok) throw new Error('HTTP '+res.status);
        const geojson = await res.json();

        const byStatus = {};
        DEV_SHOWN.forEach(s => byStatus[s] = []);

        geojson.features.forEach(f => {
          const s = f.properties.status;
          if(byStatus[s]) byStatus[s].push(f);
        });

        DEV_SHOWN.forEach(status => {
          const src = map.getSource('dev-'+status);
          if(src) src.setData({type:'FeatureCollection', features:byStatus[status]});
        });

        console.log('Loaded', geojson.features.length, 'development projects');
      } catch(e) {
        console.warn('Failed to load development data:', e.message);
      }
    }

    /* Click on documented pin */
    window._activePopup = null;
    map.on('click','doc-pins',e=>{
      const p = e.features[0].properties;
      if(window._activePopup) window._activePopup.remove();
      if(window._searchPopup) { window._searchPopup.remove(); window._searchPopup = null; }
      tooltip.style.opacity = '0'; /* FIX: hide the polygon tooltip immediately when a pin popup opens */
      const html = `<div class="pi-popup-body">
        <div class="pi-popup-street">${p.address||p.street}</div>
        <div class="pi-popup-suburb">${p.suburb}${p.count?' · '+p.count+' photo'+(p.count>1?'s':''):''}</div>
        <a class="pi-popup-add" href="${p.archiveUrl}" target="_top">View photos</a>
        <button type="button" class="pi-popup-refine" onclick="addLocationToSearch('${(p.address||p.street||'').replace(/'/g,"\\'")}')">Add to search &amp; filter further</button>
      </div>`;
      window._activePopup = new mapboxgl.Popup({closeButton:true,maxWidth:'240px'})
        .setLngLat(e.lngLat).setHTML(html).addTo(map)
        .on('close', () => { window._activePopup = null; }); /* FIX: clear the flag when the popup is closed */
    });
    map.on('mouseenter','doc-pins',()=>{map.getCanvas().style.cursor='pointer'});
    map.on('mouseleave','doc-pins',()=>{map.getCanvas().style.cursor=''});
  });
}

function addSuburbFromPin(suburbKey, suburbLabel, btn){
  if(!suburbKey) return;
  const terms = getTerms();
  if(!terms.includes(suburbKey)){
    setSearch([...terms, suburbKey]);
    showToast(suburbLabel + ' added');
    if(btn){ btn.textContent = 'Added to filters'; btn.classList.add('added'); }
  } else {
    showToast(suburbLabel + ' already in filters');
  }
}

/* ─────────────────────────────────────────
   INIT
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  applyActiveConfig();
  sortFilterGroups();
  refreshAllLists();
  renderTags();
  syncRefineField();

  /* Compact icon-only button on narrow screens, so the input can stay
     full-width and match the top address field exactly. */
  if (window.matchMedia('(max-width: 900px)').matches) {
    const ri = document.getElementById('refineInput');
    if (ri) ri.placeholder = 'Pick address or category';
    const btn = document.querySelector('.btn-search-archive');
    if (btn) btn.textContent = '→';
  }

  const smartInput = document.getElementById('smartInput');
  smartInput.addEventListener('input', onSmartInput);

  smartInput.addEventListener('keydown', e => {
    if(e.key==='Enter'){
      e.preventDefault();
      if(geocoderSuggestions.length > 0){ pickAddress(0); }
      closeDropdown();
    }
    if(e.key==='Escape') closeDropdown();
  });

  document.addEventListener('click', e => {
    if(!document.getElementById('search-top').contains(e.target)) closeDropdown();
  });

  loadLocations();
});
