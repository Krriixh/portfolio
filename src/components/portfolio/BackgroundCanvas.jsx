import React, { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = window.innerWidth;
    let h = window.innerHeight;
    let mouseX = w / 2;
    let mouseY = h / 2;
    let animId;
    let t = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resize();

    const onMouse = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Deep, tranquil gradient mesh orbs
    // Dark Red and Blue aesthetic (moving together, 50% slower)
    const orbs = [
      { 
        // Intense Deep Blue
        x: 0, y: 0, r: Math.max(w, h) * 0.3, 
        baseX: w * 0.35, baseY: h * 0.35, 
        ax: 0.000005, ay: 0.000007, amp: 300, 
        color: [10, 20, 180], opacity: 0.55 
      },
      { 
        // Intense Deep Red
        x: 0, y: 0, r: Math.max(w, h) * 0.35, 
        baseX: w * 0.65, baseY: h * 0.65, 
        ax: 0.000006, ay: 0.000005, amp: 350, 
        color: [180, 10, 20], opacity: 0.5 
      },
      { 
        // Intense Crimson/Violet-Red
        x: 0, y: 0, r: Math.max(w, h) * 0.25, 
        baseX: w * 0.5, baseY: h * 0.5, 
        ax: 0.000004, ay: 0.000008, amp: 400, 
        color: [150, 5, 40], opacity: 0.5 
      }
    ];

    let spotX = mouseX;
    let spotY = mouseY;

    const draw = () => {
      t++;
      
      // Clear the background to exact black
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);
      
      // Use source-over instead of screen so colors don't additively mix into purple
      ctx.globalCompositeOperation = "source-over";

      orbs.forEach((orb) => {
        // Base sine wave floating
        let targetX = orb.baseX + Math.sin(t * orb.ax * 1000) * orb.amp;
        let targetY = orb.baseY + Math.cos(t * orb.ay * 1000) * orb.amp;

        // Interaction with the light (mouse cursor)
        if (mouseX > 0 && mouseY > 0) {
          const dx = mouseX - targetX;
          const dy = mouseY - targetY;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          // If the light is close enough, the orbs get gravitationally pulled toward it
          if (dist < 1200) {
            const pullStrength = (1200 - dist) / 1200;
            targetX += dx * pullStrength * 0.8; // Strong pull
            targetY += dy * pullStrength * 0.8;
          }
        }

        // Smoothly interpolate to target to make interaction feel fluid
        orb.x += (targetX - orb.x) * 0.1 || targetX;
        orb.y += (targetY - orb.y) * 0.1 || targetY;

        const [r, g, b] = orb.color;
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        
        grad.addColorStop(0, `rgba(${r},${g},${b},${orb.opacity})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Mouse interaction is now purely gravitational on the orbs above

      // Reset composite operation
      ctx.globalCompositeOperation = "source-over";

      animId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
