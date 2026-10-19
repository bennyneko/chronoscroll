import { useCallback, useEffect, useState } from 'react';
import { ERAS, LENS, ORDER } from './data/history.js';
import { useParallax, prefersReducedMotion } from './hooks/useParallax.js';
import TopBar from './components/TopBar.jsx';
import TimeRail from './components/TimeRail.jsx';
import Hero from './components/Hero.jsx';
import Chapter from './components/Chapter.jsx';
import Ending from './components/Ending.jsx';
import Toast, { useToast } from './components/Toast.jsx';

const RAIL_ITEMS = [
  { label: 'Today', id: 'now' },
  ...ERAS.map((e, i) => ({ label: e.label, id: `e${i}` })),
  { label: '1900', id: 'start1900' },
];
const NEUTRAL = '#f1ece2';

export default function App() {
  // One lens per era; each era starts on its own default lens
  const [lenses, setLenses] = useState(() => ERAS.map((e) => e.def));
  const [active, setActive] = useState(-1); // -1 hero · 0..n-1 eras · n ending
  const [toastState, toast] = useToast();
  const refresh = useParallax(ERAS.length, setActive);

  const inEra = active >= 0 && active < ERAS.length;
  const currentLens = inEra ? lenses[active] : null;
  const accent = inEra ? LENS[currentLens].c : NEUTRAL;
  const year = active < 0 ? 2026 : active >= ERAS.length ? 1900 : ERAS[active].e[lenses[active]].year;

  useEffect(() => {
    document.documentElement.style.setProperty('--ac', accent);
  }, [accent]);

  const setLens = useCallback((i, k) => {
    setLenses((ls) => (ls[i] === k ? ls : ls.map((v, j) => (j === i ? k : v))));
  }, []);

  const pickLens = (k) => {
    if (inEra) setLens(active, k);
    else { setLenses(ERAS.map(() => k)); toast(`${LENS[k].name} lens set for every era`); }
  };

  const jump = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });

  // Placeholder hooks for the next prototype (story page, map search)
  const onAction = (kind, entry) =>
    toast(kind === 'map'
      ? `Map search would open on places linked to “${entry.title}” (${entry.year}).`
      : `A full story page for “${entry.title}” comes in the next prototype.`);

  const onMap = () =>
    toast(inEra
      ? `Map search would open filtered to ${year}, the era you are viewing.`
      : 'Map search opens the place-based prototype.');

  const replay = () => {
    setLenses((ls) => ls.map((k) => ORDER[(ORDER.indexOf(k) + 1) % ORDER.length]));
    toast('Every era switched to its next lens');
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <>
      <TopBar
        currentLens={currentLens}
        caption={inEra ? `Lens for the ${ERAS[active].label}` : 'Pick a lens for every era'}
        onPickLens={pickLens}
        onMap={onMap}
      />
      <TimeRail
        items={RAIL_ITEMS}
        activeItem={active + 1}
        year={year}
        color={accent}
        dot={accent}
        onJump={jump}
      />
      <main>
        <Hero />
        {ERAS.map((era, i) => (
          <Chapter
            key={i}
            era={era}
            index={i}
            total={ERAS.length}
            lens={lenses[i]}
            onLens={setLens}
            onAction={onAction}
            onLayersChange={refresh}
          />
        ))}
        <Ending eras={ERAS} lenses={lenses} onJump={jump} onReplay={replay} />
      </main>
      <Toast {...toastState} />
    </>
  );
}
