
import React, { useEffect, useRef } from 'react';

const StarParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    
    // Clear any existing stars
    container.innerHTML = '';
    
    // Create stars
    const createStars = (count: number) => {
      for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'dynamic-star';
        
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
    createStars(150);
    
    // Cleanup function
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);
  
  return (
    <>
      <div ref={containerRef} className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none" />
      <style>
        {`
        .dynamic-star {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.3);
          animation: star-twinkle 3s infinite ease-in-out;
        }
        
        @keyframes star-twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
        `}
      </style>
    </>
  );
};

export default StarParticles;
