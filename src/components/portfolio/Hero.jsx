import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, Download } from "lucide-react";

const ROLES = ["Full Stack Developer", "AI Enthusiast", "Problem Solver", "Native App Builder"];
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(true);

  const decrypt = useCallback((target) => {
    let iteration = 0;
    setIsDecrypting(true);
    const interval = setInterval(() => {
      setDisplayText(
        target
          .split("")
          .map((char, i) => {
            if (i < iteration) return char;
            if (char === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration += 1 / 2;
      if (iteration > target.length) {
        clearInterval(interval);
        setDisplayText(target);
        setIsDecrypting(false);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cleanup = decrypt(ROLES[roleIndex]);
    const timer = setTimeout(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3500);
    return () => { cleanup(); clearTimeout(timer); };
  }, [roleIndex, decrypt]);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">

      {/* Subtle grid lines — barely visible */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-white" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-white" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-white" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-white" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-white" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-16 w-full pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

          {/* ─── Left: Text content ─────────────────────────────── */}
          <motion.div
            className="flex-1 text-center lg:text-left max-w-2xl"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow label */}
            <motion.p variants={item} className="section-label mb-6">
              Portfolio
            </motion.p>

            {/* Editorial headline — weight contrast */}
            <motion.h1
              variants={item}
              className="font-heading leading-[0.92] mb-6"
              style={{ letterSpacing: "-0.04em" }}
            >
              <span className="block text-6xl sm:text-7xl lg:text-8xl xl:text-[7rem] font-light text-white/80">
                Krrish Raj
              </span>
              <span className="block text-6xl sm:text-7xl lg:text-8xl xl:text-[7rem] font-bold text-white">
                Chauhan
              </span>
            </motion.h1>

            {/* Decrypting role */}
            <motion.div variants={item} className="h-8 flex items-center justify-center lg:justify-start mb-5">
              <span className="font-mono text-base sm:text-lg text-white/40">
                {displayText}
                <span
                  className={`inline-block w-[2px] h-4 bg-white/50 ml-1 align-middle ${
                    isDecrypting ? "" : "animate-pulse"
                  }`}
                />
              </span>
            </motion.div>

            {/* Human tagline */}
            <motion.p
              variants={item}
              className="text-white/35 text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 mb-3"
            >
              I build native apps and design systems
              <br className="hidden sm:block" /> that people actually enjoy using.
            </motion.p>

            {/* Currently line */}
            <motion.p variants={item} className="section-label mb-10">
              Currently · 4th year @ LPU · Open to opportunities
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-10"
            >
              <button
                onClick={scrollToProjects}
                data-cursor-hover
                data-cursor-text="View"
                className="px-8 py-3.5 bg-white text-[#050505] font-heading font-semibold text-sm rounded-full hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.18)] hover:scale-[1.02]"
              >
                View Projects
              </button>
              <a
                href="/assets/Krrish_CV_Final.pdf"
                download="Krrish_CV_Final.pdf"
                data-cursor-hover
                data-cursor-text="Download"
                className="px-8 py-3.5 border border-white/15 text-white/60 font-heading font-medium text-sm rounded-full hover:border-white/35 hover:text-white transition-all duration-300 flex items-center gap-2 hover:scale-[1.02]"
              >
                <Download size={14} />
                Download Resume
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              variants={item}
              className="flex items-center gap-6 justify-center lg:justify-start"
            >
              {[
                { icon: <Github size={18} />, href: "https://github.com/Krriixh", label: "GitHub" },
                { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/krriishhx", label: "LinkedIn" },
                { icon: <Mail size={18} />, href: "mailto:krriixh@gmail.com", label: "Email" },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-cursor-hover
                  data-cursor-text={label}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-white hover:text-black hover:scale-110 hover:border-transparent transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── Right: Profile photo glass card ────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative shrink-0 lg:ml-12"
          >
            {/* Soft backdrop glow */}
            <div className="absolute -inset-4 bg-white/[0.03] blur-3xl rounded-[3rem] pointer-events-none" />
            
            {/* The Glass Vessel */}
            <div className="relative w-72 h-80 sm:w-80 sm:h-[26rem] lg:w-[26rem] lg:h-[34rem] rounded-[2rem] p-2 border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center justify-center transform hover:-translate-y-2 transition-transform duration-700 ease-out group">
              <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-[#0A0A0A] relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
                <img
                  src="/assets/profile_photo.webp"
                  alt="Krrish Raj Chauhan"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="section-label">Scroll</span>
          <ArrowDown size={13} className="text-white/20 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}