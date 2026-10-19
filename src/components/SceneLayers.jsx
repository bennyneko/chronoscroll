import { memo } from 'react';

/**
 * Renders a scene's layers. Each layer is a full-bleed SVG whose wrapper
 * carries data-z; useParallax() translates it on scroll by depth.
 */
function SceneLayers({ scene, out = false }) {
  return (
    <div className={'layerset' + (out ? ' out' : '')}>
      {scene.layers.map((l, i) => (
        <div className="layer" data-z={l.z} key={i}>
          <svg
            viewBox="0 0 1600 1000"
            preserveAspectRatio="xMidYMax slice"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: l.svg }}
          />
        </div>
      ))}
    </div>
  );
}

export default memo(SceneLayers);
