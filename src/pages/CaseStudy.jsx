import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import mermaid from "mermaid";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import CustomCursor from "@/components/portfolio/CustomCursor";
import { caseStudies } from "@/data/caseStudies";

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  fontFamily: 'JetBrains Mono, monospace',
});

const MermaidChart = ({ chart }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      mermaid.render(`mermaid-svg-${Math.random().toString(36).substring(2)}`, chart)
        .then((result) => {
          if (chartRef.current) chartRef.current.innerHTML = result.svg;
        })
        .catch((e) => {
          console.error("Mermaid render error:", e);
          if (chartRef.current) chartRef.current.innerHTML = `<pre class="bg-white/5 p-4 rounded-xl text-sm overflow-x-auto">${chart}</pre>`;
        });
    }
  }, [chart]);

  return <div ref={chartRef} className="flex justify-center my-12" />;
};

export default function CaseStudy() {
  const { id } = useParams();
  const study = caseStudies[id.toLowerCase()];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, [id]);

  if (!study) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F2F2F2] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
          <Link to="/" className="text-white/50 hover:text-white underline underline-offset-4">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#F2F2F2] relative overflow-hidden selection:bg-white/10">
      <CustomCursor />
      
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back button */}
          <Link 
            to="/" 
            data-cursor-hover
            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm uppercase tracking-wider">Back to Projects</span>
          </Link>

          {/* Header */}
          <div className="space-y-6 mb-16">
            <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-white">
              {study.title}
            </h1>
            <p className="text-xl text-white/50 font-mono tracking-tight leading-relaxed max-w-2xl">
              {study.tagline}
            </p>
            
            <div className="flex gap-4 pt-4">
              {study.github && (
                <a 
                  href={study.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium transition-colors"
                >
                  <Github size={16} />
                  <span>View Source</span>
                </a>
              )}
              {study.live && (
                <a 
                  href={study.live} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>

          {/* Banner Image */}
          {study.banner && (
            <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-20 border border-white/10 relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img 
                src={study.banner} 
                alt={`${study.title} Banner`} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          )}

          {/* Markdown Content */}
          <div className="prose prose-invert prose-lg max-w-none 
            prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-white
            prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-white/80
            prose-p:text-white/60 prose-p:leading-relaxed prose-p:mb-6
            prose-ul:text-white/60 prose-ul:mb-6 prose-li:mb-2
            prose-strong:text-white prose-strong:font-semibold
            prose-a:text-white prose-a:underline-offset-4 hover:prose-a:text-white/80
            prose-hr:border-white/10 prose-hr:my-16"
          >
            <ReactMarkdown
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  if (!inline && match && match[1] === 'mermaid') {
                    return <MermaidChart chart={String(children).replace(/\n$/, '')} />
                  }
                  return <code className={className} {...props}>{children}</code>
                }
              }}
            >
              {study.content}
            </ReactMarkdown>
          </div>
          
          <div className="mt-32 pt-12 border-t border-white/10 text-center">
            <p className="text-white/40 font-mono text-sm mb-6">Enjoyed this write-up?</p>
            <a 
              href="mailto:krrish.raj.chauhan@gmail.com" 
              data-cursor-hover
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 hover:scale-105 transition-all duration-300"
            >
              Let's build something together
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
