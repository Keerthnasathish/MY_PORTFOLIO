import React, { useRef, useState, useEffect } from 'react';
import './MagicBento.css';

const MagicBentoCard = ({ 
  project, 
  enableTilt, 
  enableMagnetism, 
  enableSpotlight, 
  enableBorderGlow, 
  glowColor, 
  spotlightRadius, 
  particleCount 
}) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (isHovered && particleCount > 0) {
      const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [isHovered, particleCount]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    if (enableTilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current && enableTilt) {
      cardRef.current.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`magic-bento-card ${enableBorderGlow ? 'glow-enabled' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        '--glow-color': `rgba(${glowColor}, 0.5)`,
        '--spotlight-radius': `${spotlightRadius}px`,
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`
      }}
    >
      {enableSpotlight && isHovered && (
        <div className="bento-spotlight" />
      )}
      
      {isHovered && particles.map(p => (
        <div 
          key={p.id} 
          className="bento-particle" 
          style={{ 
            left: `${p.x}%`, 
            top: `${p.y}%`, 
            width: `${p.size}px`, 
            height: `${p.size}px` 
          }} 
        />
      ))}

      <div className="bento-content">
        <span className="bento-label glass-pill">{project.label}</span>
        <h3 className="bento-title">{project.title}</h3>
        <p className="bento-description">{project.description}</p>
        <div className="bento-tags">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="bento-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const MagicBento = ({
  projects = [],
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
  glowColor = "0, 245, 255",
  spotlightRadius = 350,
  particleCount = 10
}) => {
  return (
    <div className="magic-bento-grid">
      {projects.map((proj, i) => (
        <MagicBentoCard 
          key={i} 
          project={proj} 
          enableTilt={enableTilt}
          enableMagnetism={enableMagnetism}
          enableSpotlight={enableSpotlight}
          enableBorderGlow={enableBorderGlow}
          glowColor={glowColor}
          spotlightRadius={spotlightRadius}
          particleCount={enableStars ? particleCount : 0}
        />
      ))}
    </div>
  );
};

export default MagicBento;
