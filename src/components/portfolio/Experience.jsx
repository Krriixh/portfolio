import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { Briefcase } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionHeader label="Where I've Worked" title="Experience" />

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 max-w-2xl"
        >
          <div className="flex gap-6">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0">
                <Briefcase size={16} className="text-white/40" />
              </div>
              <div className="w-px flex-1 bg-white/[0.06] mt-2" />
            </div>

            {/* Content */}
            <div className="pb-8">
              <p className="font-mono text-[10px] text-white/25 tracking-widest uppercase mb-2">
                Internship
              </p>
              <h3 className="font-heading font-bold text-xl text-white mb-1">
                Content Intern
              </h3>
              <p className="font-body text-sm text-white/40 mb-4">
                A Box Of Stories
              </p>
              <p className="text-white/45 text-sm leading-relaxed">
                Drafted targeted email campaigns to boost subscription sales; curated 
                engaging book-related news and content for the company newsletter.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}