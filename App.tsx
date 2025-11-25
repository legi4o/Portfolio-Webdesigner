import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import { Hero } from './components/Hero';
import { DemonstrationSection } from './components/DemonstrationSection';
import { PhilosophySection } from './components/PhilosophySection';
import { EffectsShowcase } from './components/EffectsShowcase';
import { InteractiveGrid } from './components/InteractiveGrid';
import { ServicesSection } from './components/ServicesSection';
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';
import { ParticlesBackground } from './components/ParticlesBackground';

const App: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Initialize Lenis for smooth scrolling with performance optimizations
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false, // Keep false to use native touch feel on mobile but with inertia
      touchMultiplier: 1.5, // Reduced from 2 for more natural control
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Smooth scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-background selection:bg-white selection:text-black overflow-hidden">
      {/* Progress Bar - Optimized with will-change */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-50 mix-blend-difference will-change-transform"
        style={{ scaleX }}
      />
      
      {/* Background Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Particle System */}
        <ParticlesBackground />

        {/* Ambient Gradients */}
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] bg-blue-500/[0.02] blur-[150px] rounded-full will-change-transform" />
        <div className="absolute bottom-0 left-[20%] w-[60%] h-[30%] bg-purple-500/[0.02] blur-[120px] rounded-full will-change-transform" />
      </div>

      <Navigation />

      <main ref={scrollRef} className="relative z-10 flex flex-col pb-32">
        <Hero />
        <DemonstrationSection />
        <PhilosophySection />
        <InteractiveGrid />
        <ServicesSection />
        <EffectsShowcase />
      </main>

      <Footer />
    </div>
  );
};

export default App;