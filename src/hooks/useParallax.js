import { useEffect, useRef } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const STRENGTH = 170; // px of travel for a z=1 layer across one chapter
const GHOST = 260;    // px of travel for the big background year

/**
 * Drives the parallax with direct DOM writes (no React re-render per frame).
 * - Every `.chapter` section: layers with data-z move by (0.5 - progress) * z * STRENGTH
 * - `.draw` paths (chart lines) draw in as the chapter enters
 * - Reports which section sits at the viewport midline via onActive(idx)
 *   (-1 = hero, 0..n-1 = eras, n = the ending)
 *
 * Returns a refresh() function; call it after the DOM changes (e.g. lens switch).
 */
export function useParallax(eraCount, onActive) {
  const active = useRef(null);
  const cb = useRef(onActive);
  cb.current = onActive;
  const refresh = useRef(() => {});

  useEffect(() => {
    const reduce = prefersReducedMotion();
    let ticking = false;

    const update = () => {
      const vh = window.innerHeight;
      let found = null;
      document.querySelectorAll('.chapter').forEach((sec) => {
        const r = sec.getBoundingClientRect();
        if (r.bottom < -50 || r.top > vh + 50) return;
        const span = r.height - vh;
        const p = span > 0 ? -r.top / span : 0;
        if (r.top <= vh * 0.5 && r.bottom > vh * 0.5) found = sec;
        if (reduce) return;
        sec.querySelectorAll('.layer').forEach((l) => {
          const z = +l.dataset.z;
          l.style.transform = `translate3d(0,${((0.5 - p) * z * STRENGTH).toFixed(1)}px,0)`;
        });
        const g = sec.querySelector('.ghost');
        if (g) g.style.transform = `translateY(calc(-55% + ${((0.5 - p) * GHOST).toFixed(1)}px))`;
        const off = Math.max(0, Math.min(1, 1 - (p + 0.15) * 1.5));
        sec.querySelectorAll('.layerset:not(.out) .draw').forEach((d) =>
          d.setAttribute('stroke-dashoffset', off.toFixed(3))
        );
      });
      const end = document.getElementById('start1900');
      const endTop = end ? end.getBoundingClientRect().top : Infinity;
      const idx = found ? +found.dataset.idx : endTop < vh * 0.5 ? eraCount : -1;
      if (idx !== active.current) {
        active.current = idx;
        cb.current(idx);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { update(); ticking = false; });
    };

    refresh.current = update;
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [eraCount]);

  // Stable function identity across renders
  const stable = useRef(() => refresh.current()).current;
  return stable;
}
