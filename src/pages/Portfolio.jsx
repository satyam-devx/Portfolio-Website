import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Component Imports
import Navbar from '../components/portfolio/Navbar';
import HeroSection from '../components/portfolio/HeroSection';
import AboutSection from '../components/portfolio/AboutSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import GoalSection from '../components/portfolio/GoalSection';
import ContactSection from '../components/portfolio/ContactSection';
import Footer from '../components/portfolio/Footer';
import CustomCursor from '../components/portfolio/CustomCursor';
import FloatingObjects from '../components/portfolio/FloatingObjects';
import ParticleBackground from '../components/portfolio/ParticleBackground';
import LoadingScreen from '../components/portfolio/LoadingScreen';

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#030303] text-white selection:bg-cyan-400 selection:text-black overflow-x-hidden">
      
      {/* Cinematic Loader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Content Render after loading */}
      {!isLoading && (
        <>
          {/* Global Interactive Layers */}
          <CustomCursor />
          <FloatingObjects />
          <ParticleBackground />
          
          <Navbar />
          
          <main className="relative z-10">
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <SkillsSection />
            <GoalSection />
            <ContactSection />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}
