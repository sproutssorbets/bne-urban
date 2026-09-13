/* ------------------------------------------------------------------
   PHOTOINDEX — FACET PANEL (styles)

   Left sidebar layout: panel is a fixed-width column, PhotoDeck's
   grid sits to its right, inside a shared flex wrapper built in
   photoindex-facets.js (#pi-facets-wrap). Everything here is scoped
   under #pi-facets so nothing leaks into PhotoDeck's own layout.
   The only global rules are .pi-hidden and #pi-facets-wrap.

   Inter only. Weights 400 and 500. Sizes 11px, 13px, 14px.
   No radius, no shadow, no gradient. Structure comes from 1px rules.
------------------------------------------------------------------ */

.pi-hidden { display: none !important; }

/* Shared flex wrapper around the sidebar and PhotoDeck's own grid.
   Built in JS (mount()), not by wrapping the grid in markup here. */
#pi-facets-wrap {
  display: flex;
  align-items: flex-start;
  gap: 32px;
}

#pi-facets-wrap > .pi-facets-grid-col {
  flex: 1 1 auto;
  min-width: 0;
}

#pi-facets {
  --pi-bg: #FFFFFF;
  --pi-text: #111111;
  --pi-muted: #666666;
  --pi-rule: #DADADA;

  flex: 0 0 300px;
  width: 300px;

  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--pi-text);
  background: var(--pi-bg);
  font-size: 13px;
  line-height: 1.5;
  font-weight: 400;
  margin: 0;
  padding-right: 24px;
  border-right: 1px solid var(--pi-text);
}

#pi-facets * { box-sizing: border-box; }

/* ---------- top bar (search / status / clear), stacked ---------- */

#pi-facets .pi-bar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--pi-rule);
  margin-bottom: 4px;
}

#pi-facets .pi-search {
  display: grid;
  grid-template-columns: 1fr auto;
  border: 1px solid var(--pi-text);
}

#pi-facets .pi-search-input {
  font-family: inherit;
  font-size: 13px;
  font-weight: 400;
  color: var(--pi-text);
  background: transparent;
  border: 0;
  outline: none;
  padding: 0 12px;
  height: 34px;
  appearance: none;
  border-radius: 0;
  min-width: 0;
}

#pi-facets .pi-search-input::placeholder { color: var(--pi-muted); }

#pi-facets .pi-search-go {
  font-family: inherit;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--pi-bg);
  background: var(--pi-text);
  border: 0;
  border-radius: 0;
  height: 34px;
  padding: 0 16px;
  cursor: pointer;
}

#pi-facets .pi-search-go:hover { background: var(--pi-muted); }

#pi-facets .pi-status {
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--pi-muted);
}

#pi-facets .pi-status.warn { color: var(--pi-text); }

#pi-facets .pi-clear {
  font-family: inherit;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--pi-text);
  background: transparent;
  border: 1px solid var(--pi-text);
  border-radius: 0;
  height: 34px;
  padding: 0 16px;
  cursor: pointer;
  align-self: flex-start;
}

#pi-facets .pi-clear:hover { background: var(--pi-text); color: var(--pi-bg); }

/* ---------- sections and groups ---------- */

#pi-facets .pi-section {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--pi-muted);
  padding: 20px 0 6px;
}

#pi-facets .pi-group { border-bottom: 1px solid var(--pi-rule); }

#pi-facets .pi-group-head {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 11px 0;
  cursor: pointer;
  user-select: none;
}

#pi-facets .pi-group-head:hover .pi-group-label { color: var(--pi-muted); }

#pi-facets .pi-group-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

#pi-facets .pi-group-meta {
  display: flex;
  align-items: center;
  gap: 14px;
}

#pi-facets .pi-group-count {
  font-size: 11px;
  color: var(--pi-text);
  min-width: 18px;
  text-align: right;
}

#pi-facets .pi-group.has-selection .pi-group-count::before { content: '\2022 '; }

#pi-facets .pi-chevron {
  font-size: 13px;
  color: var(--pi-muted);
  display: inline-block;
  transition: transform 0.2s;
}

#pi-facets .pi-group.open .pi-chevron { transform: rotate(180deg); }

#pi-facets .pi-group-body { display: none; padding: 4px 0 20px; }
#pi-facets .pi-group.open .pi-group-body { display: block; }

#pi-facets .pi-group-note {
  font-size: 11px;
  color: var(--pi-muted);
  padding-bottom: 12px;
}

/* ---------- terms — single column, sidebar is too narrow for the
   old newspaper-style column-count layout, and single column also
   sidesteps the Chromium break-inside bug entirely ---------- */

#pi-facets .pi-terms {
  display: block;
}

#pi-facets .pi-subhead {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--pi-muted);
  padding: 12px 0 4px;
}

#pi-facets .pi-term {
  display: block;
  position: relative;
  padding: 3px 0 3px 22px;
  cursor: pointer;
}

#pi-facets .pi-term.empty { color: var(--pi-muted); cursor: default; }
#pi-facets .pi-term.empty .pi-box { border-color: var(--pi-rule); cursor: default; }

#pi-facets .pi-box {
  appearance: none;
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border: 1px solid var(--pi-text);
  border-radius: 0;
  background: transparent;
  margin: 0;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 4px;
}

#pi-facets .pi-box:checked { background: var(--pi-text); }

#pi-facets .pi-term-text { font-size: 13px; }
#pi-facets .pi-term.on .pi-term-text { font-weight: 500; }

#pi-facets .pi-term-note {
  display: block;
  font-size: 11px;
  color: var(--pi-muted);
}

#pi-facets .pi-term-count {
  font-size: 11px;
  color: var(--pi-muted);
  font-variant-numeric: tabular-nums;
  margin-left: 6px;
}

/* ---------- archival toggle ---------- */

#pi-facets .pi-arch-toggle {
  font-family: inherit;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--pi-muted);
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--pi-rule);
  border-radius: 0;
  width: 100%;
  text-align: left;
  padding: 14px 0;
  cursor: pointer;
}

#pi-facets .pi-arch-toggle:hover { color: var(--pi-text); }
#pi-facets .pi-arch-toggle::after { content: ' \2193'; }
#pi-facets .pi-arch-toggle.open::after { content: ' \2191'; }

/* ---------- responsive ----------
   Below 900px there isn't room for a 300px sidebar beside the grid.
   Stack sidebar above grid instead of a drawer/overlay for now. */

@media (max-width: 900px) {
  #pi-facets-wrap {
    flex-direction: column;
  }
  #pi-facets {
    flex: 1 1 auto;
    width: 100%;
    padding-right: 0;
    padding-bottom: 20px;
    border-right: none;
    border-bottom: 1px solid var(--pi-text);
    margin-bottom: 20px;
  }
}
