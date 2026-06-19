import React, { Suspense, useState, useEffect } from "react";
import { useMotionValue } from "framer-motion";
import XRayLayer from "@/components/portfolio/XRayLayer";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import BackgroundCanvas from "@/components/portfolio/BackgroundCanvas";
import CustomCursor from "@/components/portfolio/CustomCursor";

// Lazy load below-the-fold components
const Projects = React.lazy(() => import("@/components/portfolio/Projects"));
const About = React.lazy(() => import("@/components/portfolio/About"));
const CredentialsStrip = React.lazy(() => import("@/components/portfolio/CredentialsStrip"));
const Contact = React.lazy(() => import("@/components/portfolio/Contact"));
const Footer = React.lazy(() => import("@/components/portfolio/Footer"));
const BackToTop = React.lazy(() => import("@/components/portfolio/BackToTop"));

export default function Home() {
  const [isXRayActive, setIsXRayActive] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault(); // Stop page scroll
        setIsXRayActive(true);
      } else if (e.code === "Space") {
        e.preventDefault(); // Still prevent scroll if held
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === "Space") {
        setIsXRayActive(false);
      }
    };

    const handleMouseMove = (e) => {
      if (isXRayActive) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isXRayActive, mouseX, mouseY]);

  return (
    <div className={`min-h-screen bg-[#050505] text-[#F2F2F2] relative ${isXRayActive ? 'cursor-crosshair' : ''}`}>
      <XRayLayer mouseX={mouseX} mouseY={mouseY} isActive={isXRayActive} />
      
      {/* Subtle X-Ray Prompt */}
      <div className={`fixed bottom-6 left-6 z-40 font-mono text-[10px] uppercase tracking-widest transition-opacity duration-500 ${isXRayActive ? 'text-green-500 opacity-100' : 'text-white/20 opacity-50 hover:opacity-100'}`}>
        {isXRayActive ? 'Matrix Active' : 'Hold [Space] to view source'}
      </div>

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
          <Projects />
          <About />
          <CredentialsStrip />
          <Contact />
          <Footer />
          <BackToTop />
        </Suspense>
      </div>
    </div>
  );
}