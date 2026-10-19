import { getScene } from '../scenes/index.js';
import SceneLayers from './SceneLayers.jsx';

export default function Hero() {
  const scene = getScene('now', 7);
  return (
    <section className="chapter hero" id="now" data-idx={-1}>
      <div className="stage" style={{ '--sky': 'linear-gradient(#060914 0%,#111935 55%,#29335e 100%)' }}>
        <div className="layers"><SceneLayers scene={scene} /></div>
        <div className="ghost" data-z="0.4">2026</div>
        <div className="herocopy">
          <div className="kicker">You are here · 2026</div>
          <h1>Every present<br />has a <em>past.</em></h1>
          <p>
            Scroll down to travel back through 126 years of world history, from today to 1900.
            At each stop, switch the lens to see that era through conflict, economy, science or society.
          </p>
          <a className="btn" href="#e0">Start going back <span className="cue" aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  );
}
