import React from 'react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black px-6 md:px-24 py-16 border-t border-white/10 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="md:col-span-2 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tighter mb-6">VORTEX</h2>
            <p className="text-secondary max-w-sm">
              Criando experiências digitais que confundem a linha entre utilidade e arte. 
              Com sede em São Francisco, atuando globalmente.
            </p>
          </div>
          <div className="mt-12 text-sm text-secondary/50">
            &copy; {new Date().getFullYear()} Vortex Motion Systems. Todos os direitos reservados. Criado por Matheus Araújo.
          </div>
        </div>

        <div>
           <h4 className="text-white font-medium mb-6">Mapa do Site</h4>
           <ul className="space-y-4 text-secondary">
             {['Início', 'Trabalhos', 'Serviços', 'Agência', 'Contato'].map((link) => (
               <li key={link}>
                 <a href="#" className="hover:text-white transition-colors duration-200">{link}</a>
               </li>
             ))}
           </ul>
        </div>

        <div>
           <h4 className="text-white font-medium mb-6">Social</h4>
           <ul className="space-y-4 text-secondary">
             {['Twitter', 'Instagram', 'LinkedIn', 'Dribbble', 'GitHub'].map((link) => (
               <li key={link}>
                 <a href="#" className="hover:text-white transition-colors duration-200">{link}</a>
               </li>
             ))}
           </ul>
        </div>
      </div>
      
      {/* Large background text */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03]">
        <h1 className="text-[20vw] font-bold text-white leading-none tracking-tighter whitespace-nowrap -mb-10 text-center">
          VORTEX
        </h1>
      </div>
    </footer>
  );
};