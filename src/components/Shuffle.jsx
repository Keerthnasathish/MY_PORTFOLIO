import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Shuffle = ({
  children,
  colorFrom = '#ffffff',
  colorTo = '#00f5ff',
  shuffleDirection = 'right',
  animationMode = 'evenodd',
  triggerOnHover = true,
  loop = false,
  tag = 'h1',
  ...props
}) => {
  const containerRef = useRef(null);
  const textChars = typeof children === 'string' ? children.split('') : [];
  const charsRef = useRef([]);

  const scrambleChars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789!@#$%^&*";

  const animate = () => {
    if (!charsRef.current.length) return;

    charsRef.current.forEach((charNode, i) => {
      if (!charNode || textChars[i] === ' ') return;
      
      const originalText = textChars[i];
      let delay = 0;
      
      // Determine stagger strategy
      if (animationMode === 'evenodd') {
        delay = i % 2 === 0 ? i * 0.05 : (charsRef.current.length - i) * 0.05;
      } else {
        delay = i * 0.03;
      }

      const tweenOptions = {
        duration: 0.6,
        delay,
        scrambleText: { text: originalText, chars: scrambleChars, speed: 0.3 },
        color: colorTo,
        ease: "power2.out",
        onComplete: () => {
          // Revert color back or keep it if loop/hover? The requirements say: colorFrom to colorTo.
          gsap.to(charNode, { color: colorFrom, duration: 1, ease: "power1.inOut" });
        }
      };

      gsap.to(charNode, { 
        duration: 0.6,
        delay,
        color: colorTo,
        onUpdate: function() {
          charNode.innerText = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        },
        onComplete: function() {
          charNode.innerText = originalText;
          gsap.to(charNode, { color: colorFrom, duration: 0.5 });
        }
      });
    });
  };

  useEffect(() => {
    animate();
  }, []);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      animate();
    }
  };

  const Tag = tag;

  return (
    <Tag 
      ref={containerRef} 
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block', whiteSpace: 'pre' }}
      {...props}
    >
      {textChars.map((char, i) => (
        <span 
          key={i} 
          ref={(el) => (charsRef.current[i] = el)}
          style={{ display: 'inline-block', color: colorFrom }}
        >
          {char}
        </span>
      ))}
    </Tag>
  );
};

export default Shuffle;
