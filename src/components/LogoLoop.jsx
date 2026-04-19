import React from 'react';
import './LogoLoop.css';

const LogoLoop = ({
  children,
  speed = 80,
  direction = 'left',
  fadeOut = true,
  fadeOutColor = '#0a0a0a',
  scaleOnHover = true,
  hoverSpeed = 0, // In CSS we will use pause
  duration = '20s'
}) => {
  
  const fadeStyle = fadeOut 
    ? {
        WebkitMaskImage: `linear-gradient(to right, transparent, black 10%, black 90%, transparent)`,
        maskImage: `linear-gradient(to right, transparent, black 10%, black 90%, transparent)`
      }
    : {};

  const reverseClass = direction === 'right' ? 'marquee-reverse' : '';
  const scaleClass = scaleOnHover ? 'marquee-hover-scale' : '';

  return (
    <div className={`marquee-container`} style={fadeStyle}>
      <div className={`marquee-content ${reverseClass} ${scaleClass}`} style={{ '--animation-duration': duration }}>
        {/* Render children twice for infinite loop effect */}
        {React.Children.map(children, child => (
          <div className="marquee-item">{child}</div>
        ))}
      </div>
      <div className={`marquee-content ${reverseClass} ${scaleClass}`} aria-hidden="true" style={{ '--animation-duration': duration }}>
        {React.Children.map(children, child => (
          <div className="marquee-item">{child}</div>
        ))}
      </div>
    </div>
  );
};

export default LogoLoop;
