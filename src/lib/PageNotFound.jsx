import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#050505] text-white">
      <div className="max-w-md w-full relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-8xl font-heading font-bold text-white/10 tracking-tighter">404</h1>
            <div className="h-[1px] w-12 bg-white/20 mx-auto"></div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-2xl font-heading font-medium tracking-tight">
              Page Not Found
            </h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-[250px] mx-auto">
              The page <span className="text-white/80 font-mono">"{pageName}"</span> you're looking for doesn't exist.
            </p>
          </div>
          
          <div className="pt-8">
            <Link 
              to="/"
              className="inline-flex items-center px-6 py-3 text-sm font-heading font-medium text-black bg-white rounded-full hover:bg-white/90 hover:scale-[1.02] transition-all duration-300"
            >
              Return Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}