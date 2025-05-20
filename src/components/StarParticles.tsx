
import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface StarParticlesProps {
  density?: number;
}

const StarParticles: React.FC<StarParticlesProps> = ({ density = 50 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [stars, setStars] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    
    // Create stars based on density
    const newStars = Array.from({ length: density }).map((_, index) => {
      const size = Math.random() * 2 + 1;
      const x = Math.random() * width;
      const y = Math.random() * height;
      const delay = Math.random() * 4; // Random delay for twinkling effect
      const opacity = Math.random() * 0.6 + 0.2;
      
      return (
        <div
          key={`star-${index}`}
          className="star"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${x}px`,
            top: `${y}px`,
            animationDelay: `${delay}s`,
            opacity
          }}
        />
      );
    });
    
    setStars(newStars);
  }, [density]);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* Background pattern based on theme */}
      <div className="absolute inset-0" style={{ backgroundColor: 'var(--star-bg-color)' }}>
        <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yOS41IDMwaC0xdjFoMXYtMXptMCAtMS45NWgtMXYxaDF2LTF6bS0xIDUuOTVoMXYxaC0xdi0xeiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjA0Ij48L3BhdGg+PC9nPjwvc3ZnPg==')]"></div>
      </div>
      
      {/* Dynamic stars */}
      <div className="star-field">
        {stars}
      </div>
    </div>
  );
};

export default StarParticles;
