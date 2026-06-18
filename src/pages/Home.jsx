import React, { Suspense } from "react";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import BackgroundCanvas from "@/components/portfolio/BackgroundCanvas";
import CustomCursor from "@/components/portfolio/CustomCursor";

// Lazy load below-the-fold components
const About = React.lazy(() => import("@/components/portfolio/About"));
const TechStack = React.lazy(() => import("@/components/portfolio/TechStack"));
const Projects = React.lazy(() => import("@/components/portfolio/Projects"));
const Experience = React.lazy(() => import("@/components/portfolio/Experience"));
const Education = React.lazy(() => import("@/components/portfolio/Education"));
const Contact = React.lazy(() => import("@/components/portfolio/Contact"));
const Footer = React.lazy(() => import("@/components/portfolio/Footer"));
const BackToTop = React.lazy(() => import("@/components/portfolio/BackToTop"));

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F2F2F2] relative">
      <CustomCursor />
      <BackgroundCanvas />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        
        <Suspense fallback={
          <div className="flex justify-center items-center py-32 opacity-50">
            <div className="w-6 h-6 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
          </div>
        }>
          <About />
          <TechStack />
          <Projects />
          <Experience />
          <Education />
          <Contact />
          <Footer />
          <BackToTop />
        </Suspense>
      </div>
    </div>
  );
}