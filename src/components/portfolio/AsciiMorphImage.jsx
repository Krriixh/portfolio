import React, { useEffect, useRef, useState } from 'react';

const CHARS = [' ', '.', ',', ':', ';', 'x', '+', '=', '*', '%', '0', '1', '#', '█', '▓', '▒', '░'];

export default function AsciiMorphImage({ src, alt, className = "", style = {} }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const animFrame = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = src;
    img.onload = () => {
      imageRef.current = img;
      setIsLoaded(true);
      startAnimation();
    };
    return () => cancelAnimationFrame(animFrame.current);
  }, [src]);

  const draw = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const img = imageRef.current;
    
    if (!canvas || !container || !img) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    
    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    ctx.clearRect(0, 0, w, h);

    const scale = Math.max(w / img.width, h / img.height);
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    const offsetX = (w - drawW) / 2;
    const offsetY = (h - drawH) * 0.2; 

    const offCanvas = document.createElement('canvas');
    offCanvas.width = w;
    offCanvas.height = h;
    const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
    offCtx.drawImage(img, offsetX, offsetY, drawW, drawH);

    // Aggressive Slideshow Logic
    // Instead of smooth crossfading, we use hard cuts.
    const t = timeRef.current;
    
    // Change state every 0.8 "units" of time
    const interval = 0.8; 
    const stateIndex = Math.floor(t / interval) % 4;

    const pReal = stateIndex === 0 ? 1 : 0;
    const pMosaic = stateIndex === 1 ? 1 : 0;
    const pAscii = stateIndex === 2 ? 1 : 0;
    const pDistort = stateIndex === 3 ? 1 : 0;

    // 1. Draw Real Image (Clean)
    if (pReal > 0) {
      ctx.globalAlpha = 1.0;
      ctx.drawImage(offCanvas, 0, 0, w, h);
    }

    // 2. Draw Distorted Image
    if (pDistort > 0) {
      ctx.globalAlpha = 1.0;
      const sliceHeight = 8;
      for(let y = 0; y < h; y += sliceHeight) {
        // High-frequency glitch noise
        const glitchShift = (Math.sin(y * 0.5 + t * 10) * 40 + Math.cos(y * 0.2 - t * 5) * 20);
        ctx.drawImage(offCanvas, 0, y, w, sliceHeight, glitchShift, y, w, sliceHeight);
        
        // Occasional RGB split
        if (Math.random() < 0.1) {
          ctx.fillStyle = `rgba(255, 0, 100, 0.7)`;
          ctx.fillRect(glitchShift - 15, y, w, sliceHeight);
        }
        if (Math.random() < 0.1) {
          ctx.fillStyle = `rgba(0, 255, 200, 0.7)`;
          ctx.fillRect(glitchShift + 15, y, w, sliceHeight);
        }
      }
    }

    // 3. Prepare block data for Mosaic / ASCII
    if (pMosaic > 0 || pAscii > 0) {
      const blockSize = 8; // Size of grid blocks
      const imgData = offCtx.getImageData(0, 0, w, h).data;
      
      ctx.font = `bold ${blockSize * 1.2}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Dark backdrop for the code/mosaic to increase contrast
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, w, h);

      for (let y = 0; y < h; y += blockSize) {
        for (let x = 0; x < w; x += blockSize) {
          const i = (Math.floor(y) * w + Math.floor(x)) * 4;
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const a = imgData[i + 3];

          if (a === 0) continue;

          const brightness = (r + g + b) / 3;

          // Mosaic State
          if (pMosaic > 0) {
            ctx.fillStyle = `rgb(${r},${g},${b})`;
            // Draw square block
            ctx.fillRect(x, y, blockSize * 0.9, blockSize * 0.9);
          }

          // ASCII State
          if (pAscii > 0) {
            // Shimmer noise
            const noise = Math.sin(x * 0.05 + t * 5) * 60;
            const adjusted = Math.max(0, Math.min(255, brightness + noise));
            
            // Focus ASCII on shadows and midtones to preserve shape
            if (brightness < 230) {
              const charIndex = Math.floor((adjusted / 255) * (CHARS.length - 1));
              const char = CHARS[charIndex];
              ctx.fillStyle = `rgb(${r},${g},${b})`;
              ctx.fillText(char, x + blockSize / 2, y + blockSize / 2);
            }
          }
        }
      }
    }
    
    ctx.globalAlpha = 1.0;
  };

  const startAnimation = () => {
    const loop = () => {
      timeRef.current += 0.03; // Controls the master speed of the sequence
      draw();
      animFrame.current = requestAnimationFrame(loop);
    };
    loop();
  };

  useEffect(() => {
    const handleResize = () => draw();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded]);

  return (
    <div 
      ref={containerRef}
      className={className}
      style={style}
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
      />
    </div>
  );
}
