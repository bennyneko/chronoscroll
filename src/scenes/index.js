import { SC } from './scenes.js';
import { RNG } from './svg.js';

const cache = new Map();

function hash(s) {
  let h = 2166136261;
  for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

/**
 * Build (once) and return a scene: { bg, layers: [{ z, svg }] }.
 * Seeded by name, so the same scene always draws the same way.
 */
export function getScene(name, seed) {
  const key = seed != null ? `${name}:${seed}` : name;
  if (!cache.has(key)) {
    const gen = SC[name];
    if (!gen) throw new Error(`Unknown scene "${name}". Add it to src/scenes/scenes.js`);
    const out = gen(RNG(seed ?? hash(name)));
    cache.set(key, { bg: out.bg, layers: out.layers.map((l) => ({ z: l.z, svg: l.s })) });
  }
  return cache.get(key);
}
