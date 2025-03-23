import React, { useState, useEffect } from 'react';
import '../styles/Fireworks.css';

const FireworksEffects = ({ active, onComplete, level }) => {
  const [fireworks, setFireworks] = useState([]);
  const [particles, setParticles] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [showFlash, setShowFlash] = useState(false);
  const [showLevelNumber, setShowLevelNumber] = useState(false);

  useEffect(() => {
    if (active) {
      // flash
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 600);
      
      // Show level with delay
      setTimeout(() => setShowLevelNumber(true), 150);
      
      // effects with varied timing
      createShootingStars();
      setTimeout(() => createFireworks(), 300);
      
      // Clear effects after animation
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

  // Create star effect
  const createShootingStars = () => {
    const stars = [];
    for (let i = 0; i < 15; i++) {
      stars.push({
        id: `star-${Date.now()}-${i}`,
        x: Math.random() * 2 - 1, // -1 to 1 x
        y: Math.random() * 1 + 0.2, // 0.2 to 1.2 y
        left: Math.random() * 100, // random starting position
        top: Math.random() * 30, // start from top 30% of screen
        rotate: Math.random() * 360, // random rotation
        delay: Math.random() * 1500 // staggered timing
      });
    }
    setShootingStars(stars);
  };

  // Create fireworks elements
  const createFireworks = () => {
    const newFireworks = [];
    const newParticles = [];
    
    // Create more fireworks
    for (let i = 0; i < 8; i++) {
      const x = 10 + Math.random() * 80; // 10-90% width
      const y = 10 + Math.random() * 60; // 10-70% height
      
      // colors
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
      
      // Add firework with varied delay
      newFireworks.push({
        id: `firework-${Date.now()}-${i}`,
        x: `${x}%`,
        y: `${y}%`,
        color: selectedColor,
        size: 0.4 + Math.random() * 0.6, // Varies sizes
        delay: i * 150 + Math.random() * 200 // Random stagger
      });
      
      // Add more particles
      const particleCount = 15 + Math.floor(Math.random() * 10); // 15-24 particles per
      for (let j = 0; j < particleCount; j++) {
        newParticles.push({
          id: `particle-${Date.now()}-${i}-${j}`,
          x: x,
          y: y,
          color: selectedColor,
          size: 0.7 + Math.random() * 0.6, // different sizes
          xSpeed: Math.random() * 2 - 1,
          ySpeed: Math.random() * 2 - 1,
          delay: i * 150 + Math.random() * 100 // randomized timing
        });
      }
    }
    
    setFireworks(newFireworks);
    setParticles(newParticles);
  };

  // if inactive, don't render
  if (!active) return null;

  return (
    <>
      {/* flash effect */}
      {showFlash && <div className="level-flash"></div>}
      
      {/* level number display */}
      {showLevelNumber && (
        <div className="level-number-container">
          <div className="level-number">
            {level}
            <div className="level-glow-ring"></div>
          </div>
        </div>
      )}
      
      {/* stars effect */}
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
      
      {/* Fireworks Effect */}
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
        
        {/* particles */}
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