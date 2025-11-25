import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { Layers, Zap, Eye, Move3d } from 'lucide-react';

const cards = [
  {
    title: "Profundidade",
    subtitle: "Rolagem Parallax",
    icon: <Layers className="w-6 h-6" />,
    description: "Transições em múltiplas camadas que criam uma sensação de espaço profundo em uma interface plana."
  },
  {
    title: "Velocidade",
    subtitle: "Dinâmica de Fluidos",
    icon: <Zap className="w-6 h-6" />,
    description: "Curvas de aceleração responsivas que imitam a física e o momento do mundo real."
  },
  {
    title: "Foco",
    subtitle: "Micro-interações",
    icon: <Eye className="w-6 h-6" />,
    description: "Dicas visuais sutis guiando a atenção do usuário através de desfoque e manipulação de escala."
  },
  {
    title: "Dimensional",
    subtitle: "Transformações 3D",
    icon: <Move3d className="w-6 h-6" />,
    description: "Quebrando a barreira do eixo Z com transformações CSS 3D e mudanças de perspectiva."
  }
];

const HoverCard: React.FC<{ item: typeof cards[0]; index: number }> = ({ item, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)"
      }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.1,
      }}
      viewport={{ once: true, margin: "-10%" }}
      onMouseMove={handleMouseMove}
      className="group relative h-[400px] w-full border border-white/10 bg-surface/50 overflow-hidden rounded-2xl cursor-pointer will-change-transform"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="absolute inset-0 flex flex-col justify-between p-8 z-10">
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-500">
            {item.icon}
        </div>
        
        <div className="transform transition-transform duration-500 group-hover:translate-x-2">
          <h4 className="text-secondary text-sm uppercase tracking-widest mb-2 font-medium">{item.subtitle}</h4>
          <h3 className="text-3xl text-white font-bold mb-4">{item.title}</h3>
          <p className="text-secondary/80 leading-relaxed max-w-xs group-hover:text-white transition-colors duration-300">
            {item.description}
          </p>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-700">
         <div className="w-full h-full bg-gradient-radial from-blue-500/20 to-transparent blur-3xl transform scale-150 will-change-transform" />
      </div>
    </motion.div>
  );
};

export const DemonstrationSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Reduced parallax distance for better performance on mobile
  const yColumnEven = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const yColumnOdd = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section ref={containerRef} className="px-6 md:px-24 py-20 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8"
      >
        <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
          Biblioteca de <br />
          <span className="text-secondary">Interação</span>
        </h2>
        <p className="text-secondary mt-6 md:mt-0 max-w-sm text-right">
           Uma coleção de componentes de alta fidelidade projetados para experiências de usuário imersivas.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            style={{ 
              y: index % 2 === 0 ? yColumnEven : yColumnOdd 
            }}
            className="will-change-transform"
          >
            <HoverCard item={card} index={index} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};