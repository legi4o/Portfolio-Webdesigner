import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Upload, CreditCard, X, BarChart3, Activity } from 'lucide-react';

const cardHoverVariant = {
  hover: {
    y: -8,
    scale: 1.01,
    borderColor: "rgba(255,255,255,0.2)",
    boxShadow: "0 20px 40px -20px rgba(0,0,0,0.8)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export const EffectsShowcase: React.FC = () => {
  return (
    <section className="relative px-6 md:px-24 py-32 bg-transparent z-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6"
          >
            Inteligência <span className="text-secondary">Funcional</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-secondary text-lg max-w-2xl"
          >
            O movimento serve à função. Abaixo estão módulos interativos demonstrando como a dinâmica de fluidos melhora a usabilidade, o feedback e a percepção de desempenho em interfaces reais.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
          {/* Module 1: Smart Payment Button */}
          <motion.div 
            variants={cardHoverVariant}
            whileHover="hover"
            className="md:col-span-1 md:row-span-2 group relative bg-surface/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm p-8 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                <CreditCard size={20} />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Micro-Feedback</h3>
              <p className="text-sm text-secondary/70">
                Transições de estado que tranquilizam o usuário através de movimento contínuo.
              </p>
            </div>
            
            <div className="flex items-center justify-center py-10 relative z-20">
              <PaymentButton />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          {/* Module 2: File Upload */}
          <motion.div 
            variants={cardHoverVariant}
            whileHover="hover"
            className="md:col-span-2 md:row-span-1 group relative bg-surface/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm p-8 flex flex-col md:flex-row gap-8 items-center justify-between"
          >
            <div className="max-w-sm pointer-events-none">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Upload size={20} />
                 </div>
                 <h3 className="text-xl font-medium text-white">Entrada Fluida</h3>
              </div>
              <p className="text-sm text-secondary/70">
                Zonas de arrastar e soltar que reagem à proximidade e estado, fornecendo dicas visuais claras para interações de arquivo.
              </p>
            </div>
            
            <div className="w-full md:w-1/2 relative z-20">
               <FileUploadDemo />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          {/* Module 3: Liquid Tabs */}
          <motion.div 
            variants={cardHoverVariant}
            whileHover="hover"
            className="md:col-span-2 md:row-span-1 group relative bg-surface/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm p-8 flex flex-col justify-center"
          >
             <div className="absolute top-8 left-8 pointer-events-none">
                <h3 className="text-xl font-medium text-white mb-1">Navegação Líquida</h3>
                <p className="text-sm text-secondary/70">Estados ativos conscientes do contexto.</p>
             </div>
             
             <div className="mt-12 flex items-center justify-center w-full relative z-20">
                <LiquidTabs />
             </div>
             
             <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Sub-components for interactivity ---

const PaymentButton = () => {
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card hover interference if necessary
    if (status === 'idle') {
      setStatus('processing');
      setTimeout(() => setStatus('success'), 2000);
      setTimeout(() => setStatus('idle'), 4500);
    }
  };

  return (
    <motion.button
      layout
      onClick={handleClick}
      className={`relative h-14 rounded-full font-medium text-sm transition-colors duration-500 overflow-hidden shadow-lg
        ${status === 'success' ? 'bg-emerald-500 text-white w-14' : 'bg-white text-black w-40 hover:bg-white/90'}
      `}
    >
      <AnimatePresence mode="popLayout">
        {status === 'idle' && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center gap-2"
          >
            Pagar <ChevronRight size={16} />
          </motion.span>
        )}
        {status === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
               className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
            />
          </motion.div>
        )}
        {status === 'success' && (
          <motion.div
            key="success"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Check size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const FileUploadDemo = () => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const simulateUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isUploading) return;
    setIsUploading(true);
    setProgress(0);
    
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 10;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setProgress(0);
        }, 2000);
      }
      setProgress(current);
    }, 200);
  };

  return (
    <div 
      onClick={simulateUpload}
      className="relative w-full h-32 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center cursor-pointer hover:border-white/30 hover:bg-white/5 transition-all group overflow-hidden"
    >
       <AnimatePresence>
         {!isUploading ? (
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="flex flex-col items-center gap-2 text-secondary group-hover:text-white transition-colors"
            >
               <Upload size={24} />
               <span className="text-xs font-medium uppercase tracking-wider">Clique para Enviar</span>
            </motion.div>
         ) : (
            <motion.div className="w-full px-8">
               <div className="flex justify-between text-xs text-white mb-2 font-medium">
                  <span>Enviando arquivos...</span>
                  <span>{Math.round(progress)}%</span>
               </div>
               <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                  />
               </div>
            </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
}

const LiquidTabs = () => {
  const [activeTab, setActiveTab] = useState('Design');
  const tabs = ['Design', 'Protótipo', 'Inspecionar', 'Exportar'];

  return (
    <div 
      className="flex p-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10"
      onMouseEnter={(e) => e.stopPropagation()}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab(tab);
          }}
          className={`relative px-4 md:px-6 py-2.5 text-sm font-medium transition-colors duration-300 z-10 ${
            activeTab === tab ? 'text-black' : 'text-secondary hover:text-white'
          }`}
        >
          {activeTab === tab && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white rounded-full -z-10 mix-blend-normal"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab}
        </button>
      ))}
    </div>
  );
};