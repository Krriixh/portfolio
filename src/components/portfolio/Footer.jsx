import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-white/20 tracking-wider">
            © Krrish Raj Chauhan
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/Krriixh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-white/50 transition-colors"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/krriishhx/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-white/50 transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:krriixh@gmail.com"
              className="text-white/20 hover:text-white/50 transition-colors"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}