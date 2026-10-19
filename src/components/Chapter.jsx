import { useEffect, useRef, useState } from 'react';
import { LENS, ORDER } from '../data/history.js';
import { getScene } from '../scenes/index.js';
import SceneLayers from './SceneLayers.jsx';

const pad = (n) => String(n).padStart(2, '0');

/**
 * One era. A tall section with a sticky full-screen stage inside.
 * When the lens changes, the new scene cross-fades over the old one
 * and the synopsis card fades out, swaps text, and fades back in.
 */
export default function Chapter({ era, index, total, lens, onLens, onAction, onLayersChange }) {
  const entry = era.e[lens];
  const scene = getScene(entry.scene);

  // Stack of scene sets for the cross-fade: [{ key, name, out }]
  const [sets, setSets] = useState([{ key: 0, name: entry.scene, out: false }]);
  const keyRef = useRef(0);
  useEffect(() => {
    if (sets[sets.length - 1].name === entry.scene) return;
    const key = ++keyRef.current;
    setSets((s) => [...s, { key, name: entry.scene, out: true }]);
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        setSets((s) => s.map((x) => ({ ...x, out: x.key !== key })))
      )
    );
    const t = setTimeout(() => setSets((s) => s.filter((x) => x.key === key)), 900);
    return () => { cancelAnimationFrame(raf); clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry.scene]);

  // Position freshly mounted layers immediately (no jump before the next scroll event)
  useEffect(() => { onLayersChange?.(); }, [sets, onLayersChange]);

  // Card text lags the lens by the fade duration
  const [shownLens, setShownLens] = useState(lens);
  const [fading, setFading] = useState(false);
  useEffect(() => {
    if (lens === shownLens) return;
    setFading(true);
    const t = setTimeout(() => { setShownLens(lens); setFading(false); }, 330);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lens]);

  const shown = era.e[shownLens];
  const ac = LENS[lens].c;

  return (
    <section className="chapter" id={`e${index}`} data-idx={index}>
      <div className="stage" style={{ '--ac': ac, '--sky': scene.bg }}>
        <div className="layers">
          {sets.map((s) => (
            <SceneLayers key={s.key} scene={getScene(s.name)} out={s.out} />
          ))}
        </div>
        <div className="ghost" data-z="0.4">{shown.year}</div>
        <div className="scrim" />
        <div className="mobyr">{shown.year} · {era.label}</div>

        <article className={'card' + (fading ? ' fading' : '')}>
          <div className="kicker swap">{LENS[shownLens].name} · {shown.when}</div>
          <h2 className="swap">{shown.title}</h2>
          <p className="swap">{shown.body}</p>
          <div className="actions swap">
            <button type="button" className="btn primary" onClick={() => onAction('read', shown)}>
              Read the full story →
            </button>
            <button type="button" className="btn ghostbtn" onClick={() => onAction('map', shown)}>
              ◎ Show on map
            </button>
          </div>
          <div className="also swap">
            <span className="lab">Also in the {era.label}: switch lens</span>
            <div className="chips">
              {ORDER.filter((k) => k !== shownLens).map((k) => (
                <button
                  key={k}
                  type="button"
                  className="chip"
                  style={{ '--c': LENS[k].c }}
                  onClick={() => onLens(index, k)}
                >
                  <i /><b>{era.e[k].year}</b>{era.e[k].title}
                </button>
              ))}
            </div>
          </div>
        </article>

        <div className="cnt">{pad(index + 1)} / {pad(total)} · {era.label}</div>
      </div>
    </section>
  );
}
