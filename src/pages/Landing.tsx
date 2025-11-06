import { useRef, useState, useEffect } from 'react';
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
import { LanguageSelector } from '@/components/landing/LanguageSelector';
import { LanguageProvider } from '@/contexts/LanguageContext';
import '@/styles/landing-animations.css';

const Landing = () => {
  const finalCTARef = useRef<HTMLDivElement>(null);

  const scrollToWaitlist = () => {
    finalCTARef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    const title = 'Darsni — Play. Learn. Win. | Gamified Learning for Arab Students';
    document.title = title;

    const metaDesc = 'Darsni is a gamified learning platform for Arab students preparing for Bagrut exams. Play. Learn. Win.';
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', metaDesc);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + '/');
  }, []);

  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-[#0A0A0A] overflow-x-hidden">
        {/* Language Selector */}
        <LanguageSelector />
        
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
    </LanguageProvider>
  );
};

export default Landing;
