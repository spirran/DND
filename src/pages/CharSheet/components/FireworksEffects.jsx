import React, { useState, useEffect } from 'react';
import '../styles/Fireworks.css';

/**
 * Component for displaying fireworks and level up animations
 * @param {Object} props - Component props
 * @param {boolean} props.active - Whether the fireworks effect is active
 * @param {Function} props.onComplete - Callback function when animation completes
 * @param {number} props.level - The new level to display
 * @returns {JSX.Element|null} Fireworks display or null when inactive
 */
const FireworksEffects = ({ active, onComplete, level }) => {
  const [fireworks, setFireworks] = useState([]);
  const [particles, setParticles] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [showFlash, setShowFlash] = useState(false);
  const [showLevelNumber, setShowLevelNumber] = useState(false);

  /**
   * Effect to manage fireworks animation lifecycle
   */
  useEffect(() => {
    if (active) {
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 600);
      
      setTimeout(() => setShowLevelNumber(true), 150);
      
      createShootingStars();
      setTimeout(() => createFireworks(), 300);
      
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
        setFireworks([]);
        setParticles([]);
        setShootingStars([]);
        setShowLevelNumber(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);

  /**
   * Creates shooting star animation elements
   */
  const createShootingStars = () => {
    const stars = [];
    for (let i = 0; i < 15; i++) {
      stars.push({
        id: `star-${Date.now()}-${i}`,
        x: Math.random() * 2 - 1,
        y: Math.random() * 1 + 0.2,
        left: Math.random() * 100,
        top: Math.random() * 30,
        rotate: Math.random() * 360,
        delay: Math.random() * 1500
      });
    }
    setShootingStars(stars);
  };

  /**
   * Creates firework and particle animation elements
   */
  const createFireworks = () => {
    const newFireworks = [];
    const newParticles = [];
    
    for (let i = 0; i < 8; i++) {
      const x = 10 + Math.random() * 80;
      const y = 10 + Math.random() * 60;
      
      const colors = [
        '#FF5252', // red
        '#4CAF50', // green
        '#2196F3', // blue
        '#FFC107', // amber
        '#E040FB', // purple
        '#FF9800', // orange
        '#00BCD4', // cyan
        '#FFEB3B'  // yellow
      ];
      
      const selectedColor = colors[Math.floor(Math.random() * colors.length)];
      
      newFireworks.push({
        id: `firework-${Date.now()}-${i}`,
        x: `${x}%`,
        y: `${y}%`,
        color: selectedColor,
        size: 0.4 + Math.random() * 0.6,
        delay: i * 150 + Math.random() * 200
      });
      
      const particleCount = 15 + Math.floor(Math.random() * 10);
      for (let j = 0; j < particleCount; j++) {
        newParticles.push({
          id: `particle-${Date.now()}-${i}-${j}`,
          x: x,
          y: y,
          color: selectedColor,
          size: 0.7 + Math.random() * 0.6,
          xSpeed: Math.random() * 2 - 1,
          ySpeed: Math.random() * 2 - 1,
          delay: i * 150 + Math.random() * 100
        });
      }
    }
    
    setFireworks(newFireworks);
    setParticles(newParticles);
  };

  if (!active) return null;

  return (
    <>
      {showFlash && <div className="level-flash"></div>}
      
      {showLevelNumber && (
        <div className="level-number-container">
          <div className="level-number">
            {level}
            <div className="level-glow-ring"></div>
          </div>
        </div>
      )}
      
      {shootingStars.map(star => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            '--x': star.x,
            '--y': star.y,
            '--rotate': `${star.rotate}deg`,
            animationDelay: `${star.delay}ms`
          }}
        />
      ))}
      
      <div className="fireworks-container">
        {fireworks.map((fw) => (
          <div
            key={fw.id}
            className="firework"
            style={{
              left: fw.x,
              top: fw.y,
              width: `${fw.size}rem`,
              background: `radial-gradient(circle, ${fw.color} 0%, rgba(255, 255, 255, 0) 70%)`,
              boxShadow: `0 0 20px 10px ${fw.color}80`,
              animationDelay: `${fw.delay}ms`
            }}
          />
        ))}
        
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              width: `${p.size * 6}px`,
              height: `${p.size * 6}px`,
              color: p.color,
              backgroundColor: p.color,
              '--x': p.xSpeed,
              '--y': p.ySpeed,
              animationDelay: `${p.delay}ms`,
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`
            }}
          />
        ))}
      </div>
    </>
  );
};

export default FireworksEffects;