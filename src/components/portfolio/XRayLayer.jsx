import React, { useMemo } from 'react';
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
// Using Vite's raw loader to get actual source code of the project
import heroCode from './Hero.jsx?raw';
import homeCode from '../../pages/Home.jsx?raw';
import aboutCode from './About.jsx?raw';
import projectsCode from './Projects.jsx?raw';
import contactCode from './Contact.jsx?raw';

export default function XRayLayer({ mouseX, mouseY, isActive }) {
  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, (v) => -v * 0.8); // Scroll code slightly slower for parallax

  // Combine some source code to fill the screen
  const matrixCode = useMemo(() => {
    return (heroCode + '\n\n' + projectsCode + '\n\n' + aboutCode + '\n\n' + contactCode + '\n\n' + homeCode).repeat(5);
  }, []);

  // Create the dynamic CSS mask gradient string
  const maskImage = useMotionTemplate`radial-gradient(
    300px circle at ${mouseX}px ${mouseY}px,
    black 0%,
    transparent 100%
  )`;

  return (
    <motion.div
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden bg-[#050505]"
      style={{
        maskImage,
        WebkitMaskImage: maskImage,
        opacity: isActive ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <div className="absolute inset-0 p-8 w-full h-full opacity-80 pointer-events-none">
        <motion.pre 
          style={{ y: yOffset }}
          className="font-mono text-[10px] sm:text-xs leading-relaxed text-green-500/80 whitespace-pre-wrap break-all w-full"
        >
          {matrixCode}
        </motion.pre>
      </div>
      
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_51%)] bg-[length:100%_4px] opacity-20" />
    </motion.div>
  );
}
