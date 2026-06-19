import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

// "Currently" data — update this whenever life changes
const CURRENTLY = [
  { label: "Building", value: "Axiom v2: adding spaced repetition" },
  { label: "Learning", value: "Rust internals via Tauri source" },
  { label: "Reading", value: "The Pragmatic Programmer" },
  { label: "Playing", value: "Guitar: why Blackwood exists" },
];

const itemVariant = {
  hidden: (direction) => {
    let x = 0;
    let y = 0;
    if (direction === "left") x = -150;
    if (direction === "right") x = 150;
    if (direction === "bottom-left") { x = -150; y = 150; }
    if (direction === "bottom") y = 150;
    if (direction === "bottom-right") { x = 150; y = 150; }
    return { opacity: 0, x, y, scale: 0.85, filter: "blur(15px)" };
  },
  visible: {
    opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120, damping: 15, mass: 1 }
  }
};

export default function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionHeader label="The Short Version" title="About Me" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } }
          }}
          style={{ perspective: 1200 }}
          className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {/* Main Bio Card */}
          <motion.div
            custom="left"
            variants={itemVariant}
            className="md:col-span-2 glass-panel rounded-3xl p-8 border border-white/[0.06] hover:border-white/[0.12] transition-colors relative overflow-hidden group"
          >
            <div className="relative z-10 h-full flex flex-col justify-center">
              <p className="font-mono text-[10px] text-white/25 tracking-[0.2em] uppercase mb-4">Background</p>
              <p className="text-white/65 text-base leading-[1.85] max-w-lg">
                Most of my projects started as personal problems I got tired of finding workarounds for.
                I'm a 4th-year CSE (Data Science) student at LPU, but the degree is just the backdrop.
                What I actually spend my time on is building tools that are too specific for any app store
                and too useful to not exist.
              </p>
            </div>
          </motion.div>

          {/* Currently block — alive, personal */}
          <motion.div
            custom="right"
            variants={itemVariant}
            className="md:col-span-1 glass-panel rounded-3xl p-6 border border-white/[0.06] hover:border-white/[0.12] transition-colors flex flex-col justify-center"
          >
            <p className="font-mono text-[10px] text-white/25 tracking-[0.2em] uppercase mb-5">Currently</p>
            <div className="space-y-4">
              {CURRENTLY.map(({ label, value }) => (
                <div key={label}>
                  <p className="font-mono text-[10px] text-white/20 tracking-widest uppercase mb-0.5">{label}</p>
                  <p className="text-white/55 text-sm leading-snug">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Philosophy card */}
          <motion.div
            custom="bottom-left"
            variants={itemVariant}
            className="md:col-span-2 glass-panel rounded-3xl p-8 border border-white/[0.06] hover:border-white/[0.12] transition-colors"
          >
            <p className="font-mono text-[10px] text-white/25 tracking-[0.2em] uppercase mb-4">Philosophy</p>
            <p className="text-white/50 text-base leading-[1.8]">
              I'm not interested in building for the sake of building. Every project I've shipped started
              because I had a specific problem and got annoyed enough to solve it properly, with real
              architecture, real data flows, and software that still runs reliably six months later.
            </p>
          </motion.div>

          {/* Toolkit snapshot */}
          <motion.div
            custom="bottom-right"
            variants={itemVariant}
            className="md:col-span-1 glass-panel rounded-3xl p-6 border border-white/[0.06] hover:border-white/[0.12] transition-colors flex flex-col justify-center"
          >
            <p className="font-mono text-[10px] text-white/25 tracking-[0.2em] uppercase mb-5">Toolkit</p>
            <div className="flex flex-wrap gap-2">
              {["React", "Tauri", "Rust", "Python", "SQLite", "Supabase", "Node.js", "Figma"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-[11px] font-mono text-white/40 bg-white/[0.04] rounded-full border border-white/[0.06] hover:text-white/60 hover:border-white/[0.12] transition-all duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
