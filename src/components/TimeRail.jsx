import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../hooks/useParallax.js';

/** Left-hand rail: animated year counter + jump list. Hidden on phones via CSS. */
export default function TimeRail({ items, activeItem, year, color, dot, onJump }) {
  const [shown, setShown] = useState(year);
  const fromRef = useRef(year);

  useEffect(() => {
    if (prefersReducedMotion()) { setShown(year); fromRef.current = year; return; }
    const from = fromRef.current, t0 = performance.now();
    let raf;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / 650), e = 1 - Math.pow(1 - p, 3);
      const v = Math.round(from + (year - from) * e);
      fromRef.current = v; setShown(v);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [year]);

  return (
    <nav className="rail" aria-label="Eras">
      <div className="yr" style={{ color }}>{shown}</div>
      <ol>
        {items.map((it, i) => (
          <li key={it.id}>
            <button
              type="button"
              aria-current={i === activeItem}
              style={{ '--dot': dot }}
              onClick={() => onJump(it.id)}
            >
              {it.label}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
