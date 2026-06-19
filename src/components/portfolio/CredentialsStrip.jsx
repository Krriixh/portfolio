import React from "react";
import { motion } from "framer-motion";

const ITEMS = [
  {
    type: "edu",
    title: "B.Tech CSE (Data Science)",
    sub: "Lovely Professional University",
    meta: "2023 – 2027",
  },
  {
    type: "work",
    title: "Content Intern",
    sub: "A Box of Stories",
    meta: "Internship",
  },
  {
    type: "cert",
    title: "Certifications",
    sub: "ChatGPT Prompt Eng · Generative AI Apps · Computational Theory · Think Design Prototype · Responsive Web Design",
    meta: "Coursera · LPU · fCC",
  },
];

export default function CredentialsStrip() {
  return (
    <section id="credentials" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Thin separator */}
        <div className="w-full h-px bg-white/[0.06] mb-12" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-start gap-10 sm:gap-0 sm:divide-x sm:divide-white/[0.06]"
        >
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex-1 sm:px-8 first:pl-0 last:pr-0"
            >
              <p className="font-mono text-[10px] text-white/20 tracking-[0.2em] uppercase mb-2">
                {item.meta}
              </p>
              <p className="font-heading font-semibold text-white/75 text-sm mb-1">
                {item.title}
              </p>
              <p className="text-white/35 text-xs leading-relaxed">
                {item.sub}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="w-full h-px bg-white/[0.06] mt-12" />
      </div>
    </section>
  );
}
