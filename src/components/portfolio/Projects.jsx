
import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import ProjectCard from "./ProjectCard";

const PROJECTS = [
  {
    title: "Axiom",
    tagline: "Personal macOS study infrastructure · Data engineering · Offline analytics",
    description:
      "A private, native macOS application I engineered to solve my own fragmented study tracking. Built as custom internal tooling with a hierarchical curriculum organizer, it logs my deep-work sessions directly from the system tray and visualizes my progress through zero-latency, offline-first analytics.",
    logo: import.meta.env.BASE_URL + "assets/projects/axiom.webp",
    screenshots: [
      import.meta.env.BASE_URL + "assets/projects/Dashboard.webp",
      import.meta.env.BASE_URL + "assets/projects/Subject Library.webp",
      import.meta.env.BASE_URL + "assets/projects/Sessions.webp",
      import.meta.env.BASE_URL + "assets/projects/Review.webp",
    ],
    tech: ["React", "Tauri", "Supabase", "React Query", "Tailwind", "SQLite"],
    github: "https://github.com/Krriixh/Axiom",
    live: "#",
    color: "#2563eb",
  },
  {
    title: "Blackwood",
    tagline: "Native desktop guitar companion · Web Audio API · Stage-based curriculum",
    description:
      "A personal, native desktop training suite I built to drive my own guitar progression from foundational chords to advanced mastery. Engineered entirely for my own workflow, it features real-time mic-input chromatic tuning, Web Audio API-powered ear trainers, and detailed practice analytics to track daily achievements.",
    logo: import.meta.env.BASE_URL + "assets/projects/blackwood.webp",
    screenshots: [
      import.meta.env.BASE_URL + "assets/projects/Blackwood Dashboard.webp",
      import.meta.env.BASE_URL + "assets/projects/Blackwood Fretboard Explorer.webp",
      import.meta.env.BASE_URL + "assets/projects/Blackwood Chord Library.webp",
      import.meta.env.BASE_URL + "assets/projects/Blackwood Statistics.webp",
    ],
    tech: ["React", "Tauri", "Web Audio API", "Vite", "Tailwind"],
    github: "https://github.com/Krriixh/blackwood",
    live: "#",
    color: "#16a34a",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 relative">
      {/* Data trace lines */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div className="absolute top-0 left-[15%] w-px h-full bg-white" />
        <div className="absolute top-0 left-[85%] w-px h-full bg-white" />
        <div className="absolute top-[30%] left-0 w-full h-px bg-white" />
        <div className="absolute top-[70%] left-0 w-full h-px bg-white" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionHeader label="What I've Built" title="Projects" />

        {/* Bento grid */}
        <div className="mt-16 grid grid-cols-1 gap-8">
          {/* Axiom */}
          <div>
            <ProjectCard project={PROJECTS[0]} featured />
          </div>

          {/* Blackwood */}
          <div>
            <ProjectCard project={PROJECTS[1]} featured />
          </div>
        </div>
      </div>
    </section>
  );
}