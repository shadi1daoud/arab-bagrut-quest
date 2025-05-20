
import React, { useRef } from 'react';

interface StarParticlesProps {
  density?: number;
}

const StarParticles: React.FC<StarParticlesProps> = ({ density = 50 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Static star field background pattern */}
      <div className="absolute inset-0 bg-[#080808]">
        <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yOS41IDMwaC0xdjFoMXYtMXptMCAtMS45NWgtMXYxaDF2LTF6bS0xIDUuOTVoMXYxaC0xdi0xeiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjA0Ij48L3BhdGg+PC9nPjwvc3ZnPg==')]"></div>
      </div>
    </div>
  );
};

export default StarParticles;
