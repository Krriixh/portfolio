import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const CATEGORIES = [
  {
    title: "Languages",
    items: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    ],
  },
  {
    title: "Desktop",
    items: [
      { name: "Tauri", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tauri/tauri-original.svg" },
    ],
  },
  {
    title: "Data / BI",
    items: [
      { name: "Power BI", icon: "https://cdn.simpleicons.org/powerbi/F2C811" },
      { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Postman", icon: "https://cdn.simpleicons.org/postman/FF6C37" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" },
    ],
  },
  {
    title: "Libraries",
    items: [
      { name: "React Query", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="skills" className="py-20 relative">
      {/* Data trace lines */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-[20%] w-px h-full bg-white" />
        <div className="absolute top-0 left-[80%] w-px h-full bg-white" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionHeader label="What I Work With" title="Tech Stack" />

        <TooltipProvider>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-16">
            {CATEGORIES.map((cat, catIndex) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: catIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="glass-panel inner-glow rounded-xl p-6"
              >
                <p className="font-mono text-[10px] text-white/25 tracking-[0.2em] uppercase mb-5">
                  {cat.title}
                </p>
                <div className="flex flex-wrap gap-4">
                  {cat.items.map((item) => (
                    <Tooltip key={item.name}>
                      <TooltipTrigger asChild>
                        <div className="w-10 h-10 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center transition-all duration-300 cursor-default group">
                          <img
                            src={item.icon}
                            alt={item.name}
                            className="w-6 h-6 tech-icon group-hover:scale-110 transition-transform"
                            loading="lazy"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-[#1a1a1a] border-white/10 text-white text-xs">
                        {item.name}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}