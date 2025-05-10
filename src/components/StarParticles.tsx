
import React, { useEffect, useRef } from 'react';

const StarParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Clear any existing stars
    container.innerHTML = '';
    
    // Create stars
    const createStars = (count: number) => {
      for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        const x = Math.random() * containerWidth;
        const y = Math.random() * containerHeight;
        
        // Random size
        const size = Math.random() * 2 + 1;
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.3;
        
        // Random animation delay
        const delay = Math.random() * 4;
        
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.opacity = opacity.toString();
        star.style.animationDelay = `${delay}s`;
        
        container.appendChild(star);
      }
    };
    
    // Create different sized stars
    createStars(100);
    
    // Cleanup function
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);
  
  return (
    <>
      <div ref={containerRef} className="star-field fixed inset-0 z-[-2] overflow-hidden pointer-events-none" />
      <div className="grid-overlay fixed inset-0 z-[-1] opacity-10 pointer-events-none" />
    </>
  );
};

export default StarParticles;
