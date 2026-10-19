import { LENS } from '../data/history.js';

/** 1900 closing section with the viewer's path through time. */
export default function Ending({ eras, lenses, onJump, onReplay }) {
  return (
    <section className="end" id="start1900">
      <div className="bigyr" aria-hidden="true">1900</div>
      <svg className="globe spin" viewBox="0 0 400 400" aria-hidden="true">
        <g fill="none" stroke="#f2e2c4" strokeWidth="1.2">
          <circle cx="200" cy="200" r="180" strokeOpacity=".7" />
          <ellipse cx="200" cy="200" rx="135" ry="180" strokeOpacity=".35" />
          <ellipse cx="200" cy="200" rx="90" ry="180" strokeOpacity=".35" />
          <ellipse cx="200" cy="200" rx="45" ry="180" strokeOpacity=".35" />
          <path d="M200 20v360M20 200h360M44 110h312M44 290h312M92 50h216M92 350h216" strokeOpacity=".3" />
        </g>
      </svg>
      <div className="grid">
        <div>
          <div className="kicker">The beginning · 1900</div>
          <h2>Where the century began</h2>
          <p>
            A few empires ruled most of the world’s people. Horses still outnumbered cars, and news
            crossed oceans by telegraph cable. Everything you scrolled through grew out of this world.
          </p>
          <div className="actions">
            <a className="btn primary" style={{ '--ac': '#f2e2c4' }} href="#now">↑ Back to the present</a>
            <button className="btn ghostbtn" type="button" onClick={onReplay}>Replay with another lens</button>
          </div>
        </div>
        <div className="recap">
          <h3>YOUR PATH THROUGH TIME</h3>
          {eras.map((e, i) => {
            const en = e.e[lenses[i]];
            return (
              <button key={i} type="button" style={{ '--c': LENS[lenses[i]].c }} onClick={() => onJump(`e${i}`)}>
                <i /><b>{en.year}</b><span>{en.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
