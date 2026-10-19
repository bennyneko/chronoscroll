import { LENS, ORDER } from '../data/history.js';

/**
 * Fixed header: logo, lens tabs, map search.
 * `currentLens` is null when the viewer is on the hero or the ending,
 * in which case a tab click sets that lens for every era.
 */
export default function TopBar({ currentLens, caption, onPickLens, onMap }) {
  return (
    <header className="top">
      <div className="logo">
        <svg width="20" height="28" viewBox="0 0 20 28" aria-hidden="true">
          <circle cx="10" cy="14" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 1v26" stroke="currentColor" strokeWidth="2" />
        </svg>
        Chronoscroll
      </div>
      <div className="lensbox">
        <div className="tabs" role="group" aria-label="Lens">
          {ORDER.map((k) => (
            <button
              key={k}
              type="button"
              className="tab"
              style={{ '--c': LENS[k].c }}
              aria-pressed={currentLens === k}
              onClick={() => onPickLens(k)}
            >
              <i />{LENS[k].name}
            </button>
          ))}
        </div>
        <div className="lenscap">{caption}</div>
      </div>
      <button className="mapbtn" type="button" onClick={onMap}>
        <span aria-hidden="true">◎</span> Search by map
      </button>
    </header>
  );
}
