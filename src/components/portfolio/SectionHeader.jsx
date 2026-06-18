import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function SectionHeader({ title, label }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mb-16"
    >
      {label && (
        <motion.p custom={0} variants={fadeUp} className="section-label mb-3">
          {label}
        </motion.p>
      )}
      <motion.h2
        custom={1}
        variants={fadeUp}
        className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight"
      >
        {title}
      </motion.h2>
      <motion.div
        custom={2}
        variants={fadeUp}
        className="mt-4 w-10 h-px bg-white/15"
      />
    </motion.div>
  );
}