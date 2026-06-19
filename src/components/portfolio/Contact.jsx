import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { Github, Linkedin, Mail, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSending(true);
    
    // Format the email using a mailto link
    const subject = encodeURIComponent("Contact From Portfolio");
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:krriixh@gmail.com?subject=${subject}&body=${body}`;

    // Slight delay to allow mail client to launch before clearing the form
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Opening your mail client...");
    setForm({ name: "", email: "", message: "" });
    setSending(false);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionHeader label="Say Hello" title="Let's Talk" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mt-16">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-white/45 text-base leading-relaxed mb-10 max-w-md">
              If you're building something worth building, I want to hear about it.
              I'm also open to full-time roles, internships, and any excuse to talk
              about local-first software or DSP pipelines.
            </p>

            <div className="space-y-4">
              <a
                href="https://github.com/Krriixh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/30 hover:text-white/70 transition-colors group"
              >
                <Github size={18} />
                <span className="text-sm font-mono group-hover:underline underline-offset-4">github.com/Krriixh</span>
              </a>
              <a
                href="https://www.linkedin.com/in/krriishhx/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/30 hover:text-white/70 transition-colors group"
              >
                <Linkedin size={18} />
                <span className="text-sm font-mono group-hover:underline underline-offset-4">linkedin.com/in/krriishhx</span>
              </a>
              <a
                href="mailto:krriixh@gmail.com"
                className="flex items-center gap-3 text-white/30 hover:text-white/70 transition-colors group"
              >
                <Mail size={18} />
                <span className="text-sm font-mono group-hover:underline underline-offset-4">krriixh@gmail.com</span>
              </a>
            </div>
          </motion.div>

          {/* Form — terminal style underline inputs */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="font-mono text-[10px] text-white/25 tracking-widest uppercase block mb-3">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent border-b border-white/10 focus:border-white/40 pb-3 text-white text-sm font-body outline-none transition-colors placeholder:text-white/15"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="font-mono text-[10px] text-white/25 tracking-widest uppercase block mb-3">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border-b border-white/10 focus:border-white/40 pb-3 text-white text-sm font-body outline-none transition-colors placeholder:text-white/15"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="font-mono text-[10px] text-white/25 tracking-widest uppercase block mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="w-full bg-transparent border-b border-white/10 focus:border-white/40 pb-3 text-white text-sm font-body outline-none transition-colors resize-none placeholder:text-white/15"
                  placeholder="What's on your mind?"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="relative w-full sm:w-auto px-12 py-4 rounded-full border border-white/15 text-white font-heading font-semibold text-sm hover:border-white/30 transition-all duration-300 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 shimmer-btn" />
                <span className="relative flex items-center justify-center gap-2">
                  {sending ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={14} />
                  )}
                  {sending ? "Sending..." : "Send Message"}
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}