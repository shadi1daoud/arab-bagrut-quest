
import React, { useEffect, useRef } from 'react';

const StarParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Component is effectively disabled - no star creation
  
  return (
    <div ref={containerRef} className="hidden" />
  );
};

export default StarParticles;
