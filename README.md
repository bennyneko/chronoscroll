# Chronoscroll

A parallax scroll through world history, from today back to 1900. Each era is a full-screen layered scene with a short synopsis, and a lens switcher (Conflict, Economy, Science & Tech, Society) re-tells that era from a different angle.

Built with React 18 + Vite 5. No other runtime dependencies.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the build
```

Needs Node 18 or newer.

## How it is organised

```
src/
  App.jsx                 page state: one lens per era, active section, toasts
  data/history.js         LENS colours, ORDER, and ERAS (8 eras x 4 lenses of content)
  scenes/
    svg.js                small SVG-string helpers (skyline, crowd, chart, smoke...)
    scenes.js             one generator per scene key, returns { bg, layers: [{ z, s }] }
    index.js              getScene(name): builds once, seeded by name, cached
  hooks/useParallax.js    scroll loop: moves layers by depth, draws chart lines, reports active section
  components/
    TopBar.jsx            logo, lens tabs, "Search by map"
    TimeRail.jsx          animated year counter + jump list (hidden on phones)
    Hero.jsx              2026 opening scene
    Chapter.jsx           one era: sticky stage, cross-fading scene, synopsis card, "also in" chips
    SceneLayers.jsx       renders a scene's layers as SVGs with data-z
    Ending.jsx            1900 close + "your path through time"
    Toast.jsx             small status message + useToast()
  styles.css              all styling and ambient animations
```

## How the parallax works

- Every era is a `.chapter` section that is 220vh tall with a `position: sticky` stage inside, so the scene stays on screen while you scroll through it.
- Each scene is made of layers. A layer's `z` is its depth: `0` stays fixed, `1` moves with the page, above `1` is foreground and moves faster.
- `useParallax` reads each chapter's scroll progress `p` (0 to 1) and sets `translateY((0.5 - p) * z * 170px)` on every layer. It writes to the DOM directly, so scrolling never re-renders React.
- Paths with the class `draw` (the economy charts) draw in as the chapter enters.
- Ambient loops (twinkling, falling paper, smoke) are CSS classes in `styles.css`: `tw`, `fall`, `drift`, `blink`, `spin`, `hover`.
- `prefers-reduced-motion` turns all of it off.

## Common changes

**Add or edit an event.** Edit `src/data/history.js`. Each lens entry has `year`, `when`, `title`, `scene` and `body`. `def` on an era is the lens it opens on.

**Add a scene.** Add a generator to `SC` in `src/scenes/scenes.js` and point an event's `scene` at its key. Draw in a 1600x1000 box anchored to the bottom edge. Extend ground shapes below y=1000 (the helpers use `DEEP`) so parallax never shows a gap.

**Use images or video instead of drawn SVG.** Replace `SceneLayers` with your own layers (for example `<img>` cut-outs or a `<video>` per depth), keep the `layer` class and `data-z`, and `useParallax` will move them the same way.

**Hook up the map search.** `onAction('map', entry)` and `onMap()` in `App.jsx` currently show a toast. Route them to your map view, passing `entry.year` or the active era.

## Content note

The synopses are short prototype copy. Check figures and dates against your sources before publishing.
