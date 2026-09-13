/* ------------------------------------------------------------------
   PHOTOINDEX — FACET VOCABULARY
   Transcribed verbatim from PhotoIndex Controlled Vocabulary v5.4
   (file: PhotoIndex_Controlled_Vocabulary_v5_3.txt, VERSION field: 5.4).

   This file is the single source of truth for the filter panel.
   Nothing here may be invented, reworded or reordered. If a term is
   not in the Controlled Vocabulary, it does not get a checkbox.

   MATCHING
   Terms are matched against IPTC Keywords after normalisation:
   lowercase, whitespace collapsed, trailing . , ; removed.
   "Fenced Development Site", "fenced development site" and
   "Fenced  Development Site " all match the same term.

   LOGIC
   OR inside a group, AND between groups.
   Each group below is one AND unit. Sub-headings are visual only.

   NOTE ON DUPLICATES
   "heritage architecture" appears in the Controlled Vocabulary twice,
   under Typology & Use / Heritage & Traditional and under
   Architecture & Material / Form & Style. It is kept in both places,
   as in the source document.
------------------------------------------------------------------ */

var PI_VOCAB = {

  version: '5.4',

  groups: [

    /* ---------- 1. LOCATION — PART I ---------- */
    {
      id: 'region',
      label: 'Region',
      section: '1. Location',
      part: 1,
      terms: [
        { t: 'Australia' },
        { t: 'Queensland' },
        { t: 'Brisbane' },
        { t: 'Brisbane Inner City' },
        { t: 'Brisbane River' }
      ]
    },
    {
      id: 'suburb',
      label: 'Suburb',
      section: '1. Location',
      part: 1,
      terms: [
        { t: 'Albion' },
        { t: 'Bowen Hills' },
        { t: 'Brisbane City' },
        { t: 'Fortitude Valley' },
        { t: 'Herston' },
        { t: 'Kangaroo Point' },
        { t: 'Kelvin Grove' },
        { t: 'Milton' },
        { t: 'New Farm' },
        { t: 'Newstead' },
        { t: 'Paddington' },
        { t: 'Red Hill' },
        { t: 'South Brisbane' },
        { t: 'Spring Hill' },
        { t: 'Teneriffe' },
        { t: 'West End' },
        { t: 'Woolloongabba' }
      ]
    },

    /* ---------- 2. DEVELOPMENT STATUS — PART I ---------- */
    {
      id: 'development-status',
      label: 'Development status',
      section: '2. Development status',
      part: 1,
      note: 'Administrative. Primary source: Development.i, planningalerts.org.au.',
      terms: [
        { t: 'Proposed', note: 'Application lodged in register' },
        { t: 'Approved', note: 'Permit granted in register' },
        { t: 'Under Construction', note: 'Official commencement of construction' }
      ]
    },

    /* ---------- 3. PHYSICAL CONDITION — PART I ---------- */
    {
      id: 'physical-condition',
      label: 'Physical condition',
      section: '3. Physical condition',
      part: 1,
      note: 'Visual evidence. One term per photograph.',
      terms: [
        { t: 'Existing Condition', note: 'Baseline condition before any change' },
        { t: 'Fenced Development Site', note: 'Site enclosed ahead of development, no visible construction work' },
        { t: 'Demolition & Site Works', note: 'Demolition underway, earthworks' },
        { t: 'Active Construction Site', note: 'Physically visible, active construction' },
        { t: 'Completed Development', note: 'Building completed / handed over' }
      ]
    },

    /* ---------- 4. TYPOLOGY & USE — PART I ---------- */
    {
      id: 'typology',
      label: 'Typology & use',
      section: '4. Typology & use',
      part: 1,
      terms: [
        { head: 'Residential' },
        { t: 'residential' },
        { t: 'apartment' },
        { t: 'residential tower' },
        { t: 'social housing' },
        { t: 'student housing' },

        { head: 'Commercial & retail' },
        { t: 'commercial' },
        { t: 'office' },
        { t: 'retail' },
        { t: 'hospitality' },
        { t: 'shopfront' },
        { t: 'showroom' },
        { t: 'market' },
        { t: 'supermarket' },
        { t: 'shopping centre' },
        { t: 'cafe' },
        { t: 'restaurant' },
        { t: 'bar' },
        { t: 'pub' },
        { t: 'hotel' },

        { head: 'Public & civic' },
        { t: 'public' },
        { t: 'civic' },
        { t: 'education' },
        { t: 'university' },
        { t: 'school' },
        { t: 'health' },
        { t: 'hospital' },
        { t: 'clinic' },
        { t: 'government' },
        { t: 'place of worship' },
        { t: 'community centre' },
        { t: 'library' },
        { t: 'museum' },
        { t: 'gallery' },
        { t: 'theatre' },
        { t: 'performance venue' },
        { t: 'stadium' },
        { t: 'arena' },

        { head: 'Heritage & traditional' },
        { t: 'heritage' },
        { t: 'heritage architecture' },
        { t: 'queenslander' },
        { t: 'highset house' },
        { t: 'lowset house' },
        { t: 'workers cottage' },
        { t: 'post war house' },
        { t: 'terrace house' },
        { t: 'duplex' },
        { t: 'adaptive reuse' },

        { head: 'Industrial' },
        { t: 'industrial' },
        { t: 'warehouse' },
        { t: 'parking structure' },
        { t: 'industrial architecture' }
      ]
    },

    /* ---------- 5. ARCHITECTURE & MATERIAL — PART I ---------- */
    {
      id: 'form-style',
      label: 'Form & style',
      section: '5. Architecture & material',
      part: 1,
      terms: [
        { t: 'high rise' },
        { t: 'mid rise' },
        { t: 'low rise' },
        { t: 'tower' },
        { t: 'podium' },
        { t: 'corner building' },
        { t: 'corner tower' },
        { t: 'curved facade' },
        { t: 'modern architecture' },
        { t: 'contemporary architecture' },
        { t: 'heritage architecture' },
        { t: 'postwar architecture' }
      ]
    },
    {
      id: 'material',
      label: 'Material',
      section: '5. Architecture & material',
      part: 1,
      terms: [
        { t: 'glass' },
        { t: 'brick' },
        { t: 'face brick' },
        { t: 'painted brick' },
        { t: 'concrete' },
        { t: 'timber' },
        { t: 'metal' },
        { t: 'stone' },
        { t: 'rendered finish' },
        { t: 'corrugated iron' },
        { t: 'screen' },
        { t: 'grid' }
      ]
    },

    /* ---------- 6. URBAN CONTEXT — PART I ---------- */
    {
      id: 'process',
      label: 'Process & transformation',
      section: '6. Urban context',
      part: 1,
      terms: [
        { t: 'urban renewal' },
        { t: 'urban development' },
        { t: 'urban intensification' },
        { t: 'urban consolidation' },
        { t: 'high density' },
        { t: 'riverfront' },
        { t: 'transport corridor' },
        { t: 'construction impact' },
        { t: 'flood resilience' }
      ]
    },
    {
      id: 'public-realm',
      label: 'Public realm & streetscape',
      section: '6. Urban context',
      part: 1,
      terms: [
        { t: 'pedestrian zone' },
        { t: 'shared zone' },
        { t: 'arcade' },
        { t: 'passage' },
        { t: 'public art' },
        { t: 'mural' },
        { t: 'outdoor dining' },
        { t: 'streetscape' },
        { t: 'street level' },
        { t: 'laneway' },
        { t: 'street activation' }
      ]
    },
    {
      id: 'brisbane-2032',
      label: 'Brisbane 2032',
      section: '6. Urban context',
      part: 1,
      terms: [
        { t: 'olympic venue' },
        { t: 'olympic precinct' },
        { t: 'olympic infrastructure' },
        { t: 'transport upgrade' },
        { t: 'athlete village' },
        { t: 'temporary structure' },
        { t: 'legacy project' }
      ]
    },

    /* ---------- 7. TIME — PART I ---------- */
    {
      id: 'year',
      label: 'Year',
      section: '7. Time',
      part: 1,
      terms: [
        { t: '2026' },
        { t: '2027' },
        { t: '2028' },
        { t: '2029' },
        { t: '2030' },
        { t: '2031' },
        { t: '2032' },
        { t: '2033' }
      ]
    },

    /* ---------- 8. ELEMENTS — PART II ---------- */
    {
      id: 'elements',
      label: 'Physical & public realm elements',
      section: '8. Elements',
      part: 2,
      terms: [
        { t: 'site hoarding' },
        { t: 'scaffolding' },
        { t: 'crane' },
        { t: 'temporary fencing' },
        { t: 'footpath' },
        { t: 'pavement' },
        { t: 'crossing' },
        { t: 'bike lane' },
        { t: 'bus lane' },
        { t: 'kerb' },
        { t: 'median' },
        { t: 'street light' },
        { t: 'traffic light' },
        { t: 'signage' },
        { t: 'wayfinding' },
        { t: 'bollard' },
        { t: 'fence' },
        { t: 'awning' },
        { t: 'veranda' },
        { t: 'balcony' },
        { t: 'canopy' },
        { t: 'stairs' },
        { t: 'ramp' },
        { t: 'handrail' },
        { t: 'door' },
        { t: 'window' },
        { t: 'roof' },
        { t: 'entry' },
        { t: 'tree' },
        { t: 'planting' },
        { t: 'lawn' },
        { t: 'garden bed' },
        { t: 'graffiti' },
        { t: 'monument' },
        { t: 'fountain' },
        { t: 'bus stop' },
        { t: 'rail infrastructure' },
        { t: 'shade structure' },
        { t: 'bench' },
        { t: 'seat' },
        { t: 'table' },
        { t: 'playground' }
      ]
    },

    /* ---------- 9. VIEW & COMPOSITION — PART II ---------- */
    {
      id: 'scale-perspective',
      label: 'Scale & perspective',
      section: '9. View & composition',
      part: 2,
      terms: [
        { t: 'wide view' },
        { t: 'close view' },
        { t: 'detail view', note: 'tight framing / architectural scale' },
        { t: 'street view' },
        { t: 'elevated view' },
        { t: 'upward perspective' },
        { t: 'frontal view' },
        { t: 'oblique view' },
        { t: 'architectural elevation' },
        { t: 'context view' },
        { t: 'aerial' }
      ]
    },
    {
      id: 'subject-scene',
      label: 'Subject & scene',
      section: '9. View & composition',
      part: 2,
      terms: [
        { t: 'building exterior' },
        { t: 'building facade' },
        { t: 'building interior' },
        { t: 'intersection' },
        { t: 'bridge' },
        { t: 'river' },
        { t: 'park' },
        { t: 'public space' },
        { t: 'cityscape' },
        { t: 'skyline' },
        { t: 'urban detail', note: 'micro-urban element / streetscape feature' }
      ]
    },

    /* ---------- 10. LIGHT & ATMOSPHERE — PART II ---------- */
    {
      id: 'light',
      label: 'Light & atmosphere',
      section: '10. Light & atmosphere',
      part: 2,
      terms: [
        { t: 'morning' },
        { t: 'midday' },
        { t: 'afternoon' },
        { t: 'evening' },
        { t: 'night' },
        { t: 'golden hour' },
        { t: 'blue hour' },
        { t: 'sunset light' },
        { t: 'city lights' },
        { t: 'daylight' },
        { t: 'overcast' },
        { t: 'clear sky' },
        { t: 'wet weather' },
        { t: 'after rain' },
        { t: 'neon signage' },
        { t: 'artificial light' },
        { t: 'reflection' },
        { t: 'shadow' }
      ]
    },

    /* ---------- 11. ARCHITECTURAL ERAS — PART II ---------- */
    {
      id: 'era',
      label: 'Architectural eras',
      section: '11. Architectural eras',
      part: 2,
      note: 'Never replaces heritage architecture. Promoted to Part I after use in three documented locations.',
      terms: [
        { head: 'Historical eras' },
        { t: 'victorian architecture', note: 'c. 1850-1890' },
        { t: 'federation architecture', note: 'c. 1890-1915' },
        { t: 'interwar architecture', note: 'c. 1915-1940' },

        { head: 'Late 20th century' },
        { t: 'late modernism', note: 'c. 1960-1980' },
        { t: 'brutalism', note: 'c. 1960-1980' },
        { t: 'postmodern architecture', note: 'c. 1980-2000' }
      ]
    }

  ]
};

/* Shared normalisation. Must stay identical to the Worker's norm(). */
function piNormTerm(s) {
  return String(s).toLowerCase().replace(/\s+/g, ' ').replace(/[.,;]+$/, '').trim();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PI_VOCAB: PI_VOCAB, piNormTerm: piNormTerm };
}
