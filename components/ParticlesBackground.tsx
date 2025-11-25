import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  targetOpacity: number;
  pulseSpeed: number;
}

export const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let dpr = 1;

    const resizeCanvas = () => {
      dpr = window.devicePixelRatio || 1;
      
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      ctx.scale(dpr, dpr);
      
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      // Optimization: Adjust count based on screen width to ensure mobile performance
      const isMobile = window.innerWidth < 768;
      const baseCount = isMobile ? 300 : 600; 
      
      for (let i = 0; i < baseCount; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          // Slightly larger size for better visibility without needing extreme blur
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.1, 
          speedY: (Math.random() - 0.5) * 0.1,
          opacity: Math.random() * 0.5 + 0.3,
          targetOpacity: Math.random() * 0.5 + 0.3,
          pulseSpeed: Math.random() * 0.02 + 0.005
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      particles.forEach((p) => {
        // Smooth Twinkle Logic
        if (Math.random() > 0.98) {
             p.targetOpacity = Math.random() * 0.6 + 0.2;
        }
        p.opacity += (p.targetOpacity - p.opacity) * p.pulseSpeed;

        // Base Position Update
        let vx = p.speedX;
        let vy = p.speedY;

        // Mouse Repulsion Logic
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const repulsionRadius = 150;

          if (distance < repulsionRadius) {
            const force = (repulsionRadius - distance) / repulsionRadius;
            const repulsionStrength = 2; // Strength of the effect
            vx += (dx / distance) * force * repulsionStrength;
            vy += (dy / distance) * force * repulsionStrength;
          }
        }

        p.x += vx;
        p.y += vy;

        // Wrap around
        if (p.x < -10) p.x = window.innerWidth + 10;
        if (p.x > window.innerWidth + 10) p.x = -10;
        if (p.y < -10) p.y = window.innerHeight + 10;
        if (p.y > window.innerHeight + 10) p.y = -10;

        // --- PERFORMANCE OPTIMIZATION ---
        // Instead of ctx.shadowBlur (which kills FPS), we draw two circles.
        // 1. Glow Layer (Larger, lower opacity)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.15})`;
        ctx.fill();

        // 2. Core Layer (Sharp, high opacity)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
      // Using lighten blend mode for better interaction with colored backgrounds
      style={{ mixBlendMode: 'screen' }} 
    />
  );
};