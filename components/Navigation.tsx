import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const Navigation: React.FC = () => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 w-full px-8 py-6 flex justify-between items-center z-40 mix-blend-difference text-white"
    >
      <div className="text-xl font-bold tracking-tighter">
        VORTEX
      </div>
      
      <div className="hidden md:flex gap-8 text-sm font-medium text-white/70">
        {['Trabalhos', 'Estúdio', 'Laboratório', 'Contato'].map((item, i) => (
          <a key={i} href={`#${item.toLowerCase().replace('ó', 'o').replace('á', 'a')}`} className="hover:text-white transition-colors duration-300 relative group overflow-hidden">
             <span className="relative inline-block">
                {item}
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left"/>
             </span>
          </a>
        ))}
      </div>

      <button className="hidden md:flex items-center gap-2 text-sm font-medium border border-white/20 rounded-full px-5 py-2 hover:bg-white hover:text-black transition-all duration-300 group">
        <span>Iniciar Projeto</span>
        <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </motion.nav>
  );
};