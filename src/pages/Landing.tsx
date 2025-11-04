import { useRef, useState } from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { DarsniWorld } from '@/components/landing/DarsniWorld';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { CommunitySection } from '@/components/landing/CommunitySection';
import { RewardsCarousel } from '@/components/landing/RewardsCarousel';
import { ScienceSection } from '@/components/landing/ScienceSection';
import { VisionSection } from '@/components/landing/VisionSection';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { ParticleSystem } from '@/components/landing/ParticleSystem';
import '@/styles/landing-animations.css';

const Landing = () => {
  const finalCTARef = useRef<HTMLDivElement>(null);

  const scrollToWaitlist = () => {
    finalCTARef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      {/* Particle Background */}
      <ParticleSystem density={40} color="#FF4800" />
      
      {/* All Sections */}
      <HeroSection onJoinWaitlist={scrollToWaitlist} />
      <ProblemSection />
      <DarsniWorld />
      <HowItWorks />
      <CommunitySection />
      <RewardsCarousel />
      <ScienceSection />
      <VisionSection />
      <div ref={finalCTARef}>
        <FinalCTA />
      </div>
    </div>
  );
};

export default Landing;
