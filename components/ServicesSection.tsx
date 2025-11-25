import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    id: "01",
    title: "Design de Interface",
    description: "Sistemas visuais escaláveis focados em clareza, estética e interação funcional para produtos digitais modernos."
  },
  {
    id: "02",
    title: "Engenharia Criativa",
    description: "Desenvolvimento front-end avançado utilizando WebGL, Shaders e física para experiências imersivas."
  },
  {
    id: "03",
    title: "Prototipagem de Movimento",
    description: "Animações de alta fidelidade para validar fluxos de usuário e micro-interações antes da implementação."
  },
  {
    id: "04",
    title: "Sistemas de Design",
    description: "Bibliotecas de componentes unificadas e documentação viva que garantem consistência e eficiência."
  }
];

export const ServicesSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="servicos" className="px-6 md:px-24 py-32 bg-transparent relative z-20">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-sm font-mono text-secondary mb-12 uppercase tracking-widest border-b border-white/10 pb-4"
        >
          Nossos Serviços
        </motion.h2>

        <div className="flex flex-col">
          {services.map((service, index) => (
            <ServiceItem 
              key={index} 
              service={service} 
              index={index} 
              hoveredIndex={hoveredIndex} 
              setHoveredIndex={setHoveredIndex} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceItem = ({ service, index, hoveredIndex, setHoveredIndex }: any) => {
  const isHovered = hoveredIndex === index;
  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className={`relative py-12 border-b border-white/10 cursor-pointer transition-all duration-500 ${isDimmed ? 'opacity-30 blur-[1px]' : 'opacity-100 blur-0'}`}
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-8">
           <span className="text-sm font-mono text-secondary">{service.id}</span>
           <h3 className="text-3xl md:text-5xl font-medium text-white tracking-tight">{service.title}</h3>
        </div>
        
        <motion.div 
           initial={{ opacity: 0, x: -10 }}
           animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
           transition={{ duration: 0.3 }}
           className="hidden md:block"
        >
           <ArrowUpRight size={32} className="text-white" />
        </motion.div>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
            height: isHovered ? 'auto' : 0, 
            opacity: isHovered ? 1 : 0 
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="mt-6 md:ml-20 text-secondary text-lg max-w-xl leading-relaxed">
            {service.description}
        </p>
      </motion.div>
    </motion.div>
  );
}