import { useRef, useEffect } from 'react';
import { NewHeroSection } from '@/components/landing/NewHeroSection';
import { PainPointSection } from '@/components/landing/PainPointSection';
import { SolutionSection } from '@/components/landing/SolutionSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { ValueSection } from '@/components/landing/ValueSection';
import { FinalCallToAction } from '@/components/landing/FinalCallToAction';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { StickyMobileCTA } from '@/components/landing/StickyMobileCTA';
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
      <div className="relative min-h-screen bg-black overflow-x-hidden">
        {/* Language Selector */}
        <LanguageSelector />
        
        {/* Particle Background - more subtle */}
        <ParticleSystem density={20} color="#A855F7" />
        
        {/* All Sections */}
        <NewHeroSection onJoinWaitlist={scrollToWaitlist} />
        <PainPointSection />
        <SolutionSection />
        <TestimonialsSection />
        <ValueSection />
        <div ref={finalCTARef}>
          <FinalCallToAction />
        </div>
        <LandingFooter />
        
        {/* Sticky mobile CTA */}
        <StickyMobileCTA onJoinWaitlist={scrollToWaitlist} />
      </div>
    </LanguageProvider>
  );
};

export default Landing;
