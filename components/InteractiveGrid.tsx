import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Scan, Database, Fingerprint } from 'lucide-react';

export const InteractiveGrid: React.FC = () => {
  return (
    <section className="px-6 md:px-24 py-32 bg-transparent z-20 relative overflow-hidden">
      
      {/* Background decoration lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <motion.div 
            animate={{ y: [0, 1000] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-[30%] w-[1px] h-[200px] bg-gradient-to-b from-transparent via-white/20 to-transparent" 
        />
         <motion.div 
            animate={{ y: [0, 1000] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 2 }}
            className="absolute top-0 right-[20%] w-[1px] h-[300px] bg-gradient-to-b from-transparent via-white/10 to-transparent" 
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-semibold text-white tracking-tight"
            >
              Arquitetura do <span className="text-blue-400">Sistema</span>
            </motion.h2>
            <p className="text-secondary mt-4 max-w-md">
              Monitoramento em tempo real e componentes de interação fluida construídos para a web espacial moderna.
            </p>
          </div>
          <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="px-6 py-2 border border-white/20 rounded-full text-sm hover:bg-white hover:text-black transition-colors"
          >
             Ver Documentação
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: System Scanner */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="col-span-1 h-[300px] bg-surface/30 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden relative group"
          >
            <div className="p-6 h-full flex flex-col justify-between z-20 relative">
               <div className="flex justify-between items-start">
                  <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                     <Scan size={24} />
                  </div>
                  <div className="flex gap-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                     <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  </div>
               </div>
               
               <div>
                  <h3 className="text-white text-lg font-medium">Escaneamento Neural</h3>
                  <div className="mt-2 space-y-2">
                     <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                           animate={{ width: ["0%", "100%", "0%"] }}
                           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                           className="h-full bg-blue-500"
                        />
                     </div>
                     <div className="flex justify-between text-xs text-white/40 font-mono">
                        <span>PROCESSANDO</span>
                        <span>84.2%</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Scanner Line Effect */}
            <motion.div 
               animate={{ top: ["0%", "100%", "0%"] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="absolute left-0 w-full h-[2px] bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.8)] z-10"
            />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          </motion.div>

          {/* Card 2: Holographic Data */}
          <motion.div 
            whileHover={{ rotateX: 5, rotateY: 5, scale: 1.02 }}
            style={{ perspective: 1000 }}
            className="col-span-1 h-[300px] bg-surface/30 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex items-center gap-3 mb-8">
               <Database size={20} className="text-purple-400" />
               <span className="text-xs font-mono text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded">BANCO DE DADOS</span>
            </div>

            <div className="flex gap-2 items-end h-[120px] mb-4">
               {[40, 70, 50, 90, 60, 80, 45].map((h, i) => (
                  <motion.div 
                     key={i}
                     initial={{ scaleY: 0 }}
                     whileInView={{ scaleY: 1 }}
                     style={{ height: `${h}%`, originY: 1 }}
                     animate={{ height: [`${h}%`, `${Math.min(h + 20, 100)}%`, `${h}%`] }}
                     transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                     className="flex-1 bg-gradient-to-t from-white/5 to-white/40 rounded-t-sm hover:from-white/20 transition-colors"
                  />
               ))}
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-white/5">
               <div className="text-xs text-white/50">Total de Requisições</div>
               <div className="text-lg font-bold text-white">2.4M</div>
            </div>
          </motion.div>

          {/* Card 3: Interactive Toggle */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="col-span-1 h-[300px] bg-gradient-to-b from-surface/50 to-black border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center relative overflow-hidden"
          >  
             <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
             
             <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-24 h-24 rounded-full bg-black border border-white/10 shadow-[0_0_50px_-10px_rgba(255,255,255,0.1)] flex items-center justify-center group z-10"
             >
                <div className="absolute inset-0 rounded-full border border-white/5 animate-ping opacity-20" />
                <Fingerprint size={32} className="text-white/80 group-hover:text-white transition-colors" />
             </motion.button>
             
             <p className="mt-8 text-sm font-medium text-white/60 tracking-widest uppercase">Autenticar</p>
          </motion.div>

          {/* Row 2: Neural Flow & Terminal */}

          {/* Wide Card: Neural Data Flow (Replaces Connection Nodes) */}
          <motion.div 
             whileHover={{ scale: 1.01 }}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
             }}
             className="col-span-1 md:col-span-2 h-[300px] bg-surface/30 backdrop-blur-md border border-white/10 rounded-2xl relative overflow-hidden flex items-center justify-center group"
          >
             <div className="absolute top-6 left-6 z-10 pointer-events-none">
                <div className="flex items-center gap-2 mb-1">
                   <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                   <span className="text-xs font-mono text-indigo-400">REDE NEURAL</span>
                </div>
                <h3 className="text-white font-medium">Fluxo de Dados</h3>
             </div>
             
             {/* Canvas Network Simulation */}
             <NetworkGraphCanvas />
          </motion.div>

          {/* Terminal Logs Card */}
          <motion.div 
             whileHover={{ scale: 1.01 }}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
             }}
             className="col-span-1 h-[300px] bg-black border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col"
          >
             <div className="flex items-center gap-2 mb-4 opacity-50 border-b border-white/10 pb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="ml-auto text-xs font-mono text-white/40">vortex_sys.log</span>
             </div>
             
             <TerminalLogs />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// --- Sub-components for Row 2 ---

const NetworkGraphCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width;
        let height = canvas.height;
        let particles: any[] = [];
        let connections: any[] = [];
        let packets: any[] = [];

        const resize = () => {
            if (canvas.parentElement) {
                width = canvas.parentElement.clientWidth;
                height = canvas.parentElement.clientHeight;
                canvas.width = width;
                canvas.height = height;
            }
        };
        resize();
        window.addEventListener('resize', resize);

        // Initialize particles
        for(let i=0; i<15; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 2
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            // Update and draw particles
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255,255,255,0.5)";
                ctx.fill();
            });

            // Draw connections
            connections = [];
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx*dx + dy*dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${1 - dist/150})`; // Indigo color
                        ctx.lineWidth = 1;
                        ctx.stroke();
                        connections.push({ p1: particles[i], p2: particles[j], dist });
                    }
                }
            }

            // Spawn data packets
            if (Math.random() > 0.95 && connections.length > 0) {
                const conn = connections[Math.floor(Math.random() * connections.length)];
                packets.push({
                    x: conn.p1.x,
                    y: conn.p1.y,
                    target: conn.p2,
                    progress: 0,
                    speed: 0.02 + Math.random() * 0.03
                });
            }

            // Update and draw packets
            for (let i = packets.length - 1; i >= 0; i--) {
                const pkt = packets[i];
                pkt.progress += pkt.speed;
                
                const curX = pkt.x + (pkt.target.x - pkt.x) * pkt.progress;
                const curY = pkt.y + (pkt.target.y - pkt.y) * pkt.progress;

                ctx.beginPath();
                ctx.arc(curX, curY, 3, 0, Math.PI * 2);
                ctx.fillStyle = "#fff";
                ctx.fill();
                // Glow
                ctx.beginPath();
                ctx.arc(curX, curY, 8, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(99, 102, 241, 0.3)";
                ctx.fill();

                if (pkt.progress >= 1) {
                    packets.splice(i, 1);
                }
            }

            requestAnimationFrame(animate);
        };
        const animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

const TerminalLogs: React.FC = () => {
    const [logs, setLogs] = useState<string[]>([]);
    const [isPaused, setIsPaused] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const messages = [
            "Inicializando VORTEX Core...",
            "Carregando módulos de física...",
            "Verificando integridade neural...",
            "Conexão segura estabelecida (Porta 443)",
            "Otimizando renderização WebGL...",
            "Alocando buffers de memória...",
            "Sincronizando estado global...",
            "Criptografia: AES-256 habilitada",
            "Detectada entrada de usuário...",
            "Atualizando taxa de quadros: 60fps",
            "Executando garbage collection...",
            "Compilando shaders...",
            "Analisando métricas de latência...",
            "Cache de textura limpo.",
            "Serviço de partículas: ATIVO"
        ];

        const interval = setInterval(() => {
            if (isPaused) return;
            const msg = messages[Math.floor(Math.random() * messages.length)];
            const timestamp = new Date().toLocaleTimeString('pt-BR', { hour12: false, hour: '2-digit', minute: '2-digit', second:'2-digit' });
            setLogs(prev => [...prev.slice(-12), `[${timestamp}] ${msg}`]);
        }, 800);

        return () => clearInterval(interval);
    }, [isPaused]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div 
            ref={scrollRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="font-mono text-[10px] md:text-xs text-secondary space-y-1.5 overflow-y-auto h-full pb-2 scrollbar-hide cursor-text"
        >
            {logs.map((log, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-2"
                >
                    <span className="text-blue-500">➜</span>
                    <span className={i === logs.length - 1 ? "text-white" : ""}>{log}</span>
                </motion.div>
            ))}
            <motion.div 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-2 h-4 bg-white/50 inline-block align-middle ml-1"
            />
        </div>
    );
};