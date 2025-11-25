import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowDown, Move } from 'lucide-react';

const letterAnimation = {
  hidden: { 
    y: 120, 
    opacity: 0, 
    filter: 'blur(20px)',
    skewY: 10 
  },
  visible: { 
    y: 0, 
    opacity: 1, 
    filter: 'blur(0px)',
    skewY: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerContainer = {
  hidden: {},
  visible: { 
    transition: { 
      staggerChildren: 0.06, 
      delayChildren: 0.3 
    } 
  }
};

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Mouse Interaction setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Adjusted spring physics for smoother, less jittery movement
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = clientX - innerWidth / 2;
    const y = clientY - innerHeight / 2;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);

  const titleLine1 = "PROJETANDO";
  const titleLine2 = "O INVISÍVEL";

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-24 pt-20 overflow-hidden"
    >
      
      {/* Animated Fluid Background - Optimized with will-change */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute top-0 left-0 w-full h-[130vh] z-0 pointer-events-none overflow-visible will-change-transform"
      >
        <div 
            className="absolute inset-0 w-full h-full"
            style={{ 
                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
            }}
        >
            <div className="absolute top-0 right-0 w-full md:w-[80vw] h-full opacity-60 mix-blend-screen filter blur-[80px] will-change-transform">
            {/* Purple Blob */}
            <motion.div 
                style={{ x: useTransform(smoothMouseX, (v) => v * -0.05), y: useTransform(smoothMouseY, (v) => v * -0.05) }}
                animate={{ 
                x: [0, 100, -50, 0], 
                y: [0, -50, 50, 0],
                scale: [1, 1.2, 0.9, 1]
                }}
                transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
                className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-purple-600 rounded-full opacity-60 mix-blend-multiply will-change-transform"
            />
            {/* Blue Blob */}
            <motion.div 
                style={{ x: useTransform(smoothMouseX, (v) => v * 0.08), y: useTransform(smoothMouseY, (v) => v * 0.08) }}
                animate={{ 
                x: [0, -70, 30, 0], 
                y: [0, 80, -40, 0],
                scale: [1, 1.1, 0.8, 1]
                }}
                transition={{ repeat: Infinity, duration: 25, ease: "easeInOut", delay: 2 }}
                className="absolute top-[10%] right-[30%] w-[600px] h-[600px] bg-blue-600 rounded-full opacity-60 mix-blend-multiply will-change-transform"
            />
            {/* Cyan Accent Blob */}
            <motion.div 
                style={{ x: useTransform(smoothMouseX, (v) => v * 0.02), y: useTransform(smoothMouseY, (v) => v * 0.1) }}
                animate={{ 
                x: [0, 50, -50, 0], 
                y: [0, -30, 30, 0],
                scale: [1, 1.3, 1, 1]
                }}
                transition={{ repeat: Infinity, duration: 15, ease: "easeInOut", delay: 5 }}
                className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-cyan-500 rounded-full opacity-40 mix-blend-screen will-change-transform"
            />
            </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10" />
      </motion.div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-2 md:gap-4 z-10 relative pointer-events-auto"
      >
        <div className="overflow-hidden py-4 -my-4">
           <motion.h1 className="text-[10vw] md:text-[8vw] leading-[0.9] font-semibold tracking-tighter text-white">
             {Array.from(titleLine1).map((l, i) => (
               <motion.span 
                  key={i} 
                  variants={letterAnimation} 
                  className="inline-block cursor-default origin-bottom will-change-transform"
                  whileHover={{ y: -10, color: "#D4D4D4", scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
               >
                 {l}
               </motion.span>
             ))}
           </motion.h1>
        </div>
        <div className="overflow-hidden py-4 -my-4">
           <motion.h1 className="text-[10vw] md:text-[8vw] leading-[0.9] font-semibold tracking-tighter text-secondary">
             {Array.from(titleLine2).map((l, i) => (
               <motion.span 
                  key={i} 
                  variants={letterAnimation} 
                  className="inline-block cursor-default origin-bottom will-change-transform"
                  whileHover={{ y: -10, color: "#FFFFFF", scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
               >
                 {l === ' ' ? '\u00A0' : l}
               </motion.span>
             ))}
           </motion.h1>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
        className="mt-12 md:mt-16 max-w-lg z-10 relative"
      >
        <p className="text-lg md:text-xl text-secondary/80 font-light leading-relaxed backdrop-blur-sm">
          Explore os limites da interação digital. Uma coleção curada de movimento avançado, efeitos de parallax e interfaces fluidas para a próxima geração da web.
        </p>

        <div className="mt-10 flex items-center gap-6">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-black font-medium rounded-full hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-shadow duration-300"
          >
            Explorar Sistema
          </motion.button>
          
          <motion.div 
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-white/60 text-sm cursor-pointer hover:text-white transition-colors"
          >
            <span>Ver Showreel</span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent ml-0.5" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* --- INTERACTIVE FLUX ORB --- */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.8} // Increased elasticity for stretchier pull
        dragTransition={{ 
            bounceStiffness: 400, // Slightly reduced stiffness for softer bounce
            bounceDamping: 10, // Lower damping for more oscillation
            power: 0.8 
        }}
        whileHover={{ scale: 1.1, cursor: "grab" }}
        whileDrag={{ scale: 1.2, cursor: "grabbing" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
            opacity: 1, 
            scale: [1, 1.05, 0.95, 1], // Added subtle breathing scale effect
            borderRadius: [
                "60% 40% 30% 70% / 60% 30% 70% 40%",
                "40% 60% 50% 50% / 40% 40% 60% 60%",
                "30% 60% 70% 40% / 50% 60% 30% 60%",
                "50% 50% 20% 80% / 25% 80% 20% 75%",
                "60% 40% 30% 70% / 60% 30% 70% 40%"
            ],
            rotate: [0, 8, -8, 4, -4, 0]
        }}
        transition={{
            borderRadius: { repeat: Infinity, duration: 6, ease: "easeInOut" },
            rotate: { repeat: Infinity, duration: 20, ease: "linear" },
            scale: { repeat: Infinity, duration: 4, ease: "easeInOut" }, // Scale breathing
            opacity: { duration: 1, delay: 1.5 },
        }}
        className="hidden lg:flex absolute top-1/2 -translate-y-1/3 right-[10%] w-[320px] h-[320px] items-center justify-center z-30 will-change-transform"
      >
         <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors duration-500 hover:bg-white/[0.08]"
              style={{ borderRadius: 'inherit' }}
         />
         <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 mix-blend-overlay opacity-60 rounded-[inherit]" />
         <motion.div 
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="text-white/40 pointer-events-none"
         >
            <Move size={32} />
         </motion.div>
      </motion.div>
    </section>
  );
};