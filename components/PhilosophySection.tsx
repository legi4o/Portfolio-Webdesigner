import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Paragraph: React.FC<{ children: string }> = ({ children }) => {
  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ['start 0.9', 'start 0.25']
  });

  const words = children.split(' ');

  return (
    <p ref={element} className="text-[2.5rem] md:text-[4rem] leading-[1.1] font-medium flex flex-wrap gap-x-3 md:gap-x-5 gap-y-1">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
      })}
    </p>
  )
}

const Word: React.FC<{ children: string; progress: any; range: [number, number] }> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const y = useTransform(progress, range, [20, 0]);
  // Replaced blur with opacity/y only if performance is critical, but blur(10px) is usually OK on modern devices if sparse.
  // Adding will-change to hint the compositor.
  const blur = useTransform(progress, range, [10, 0]);

  return (
    <motion.span 
      style={{ opacity, y, filter: useTransform(blur, (v) => `blur(${v}px)`) }} 
      className="relative text-white will-change-[opacity,transform,filter]"
    >
      {children}
    </motion.span>
  )
}

export const PhilosophySection: React.FC = () => {
  return (
    <section className="px-6 md:px-24 py-20 min-h-[80vh] flex items-center justify-center">
      <div className="max-w-6xl">
        <Paragraph>
          O movimento não é apenas decoração. É a linguagem corporal da interface. 
          Quando projetamos com dinâmica de fluidos, preenchemos a lacuna entre a 
          intenção humana e a resposta digital, criando softwares que parecem vivos, 
          intuitivos e respondem sem esforço a cada toque.
        </Paragraph>
      </div>
    </section>
  );
};