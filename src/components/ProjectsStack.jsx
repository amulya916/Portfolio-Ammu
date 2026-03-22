// src/components/ProjectsStack.jsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Trophy } from 'lucide-react';

import { PROJECTS_DATA } from '../data/projects';


const StickyCard = ({ project, index, totalCards, progress }) => {
  const isLast = index === totalCards - 1;
  const chunk = 1 / totalCards;
  const startHover = index * chunk; 
  const endHover = (index + 1) * chunk; 

  const scale = useTransform(progress, [startHover, endHover], [1, isLast ? 1 : 0.9]);
  const opacity = useTransform(progress, [startHover, endHover], [1, isLast ? 1 : 0.3]);

  return (
      <motion.div 
        style={{ scale, opacity, zIndex: index }}
        className="sticky top-[10vh] w-full max-w-6xl h-[550px] sm:h-[650px] transform-gpu origin-top px-4 sm:px-6"
      >
        <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.01} transitionSpeed={2000} className="w-full h-full rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/20">
          <ProjectCardContent project={project} />
        </Tilt>
      </motion.div>
  );
};

const ProjectCardContent = ({ project }) => (
  <div className="relative w-full h-full rounded-[40px] overflow-hidden group transition-all duration-700 flex flex-col transform-gpu preserve-3d bg-[#050505] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
    <div className="absolute inset-0 z-0">
      <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-transform duration-[2000ms] ease-out" />
      <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent`}></div>
      <div className={`absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent`}></div>
    </div>
    
    <div className="p-8 md:p-14 lg:p-16 relative z-10 flex flex-col h-full justify-end" style={{ transform: 'translateZ(50px)' }}>
      {/* Top badges */}
      <div className="flex items-center gap-3 mb-6">
        <span className={`text-xs md:text-sm font-black px-4 py-2 ${project.colorClass} text-black rounded-lg tracking-wider uppercase shadow-xl`}>{project.category}</span>
        {project.date && <span className="text-xs md:text-sm font-bold font-mono text-white/70 px-4 py-2 bg-black/50 rounded-lg backdrop-blur-md border border-white/10 shadow-xl">{project.date}</span>}
      </div>
      
      {/* Bottom text */}
      <div className="mb-4">
         <h3 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 group-hover:${project.textColorClass} transition-colors uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] tracking-tight leading-none`}>
            {project.title}
         </h3>
         <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl font-medium mb-10 drop-shadow-md leading-relaxed border-l-4 pl-6 border-white/20">
           {project.desc}
         </p>
         <div className="flex flex-wrap gap-3">
           {project.tags.map(tag => (
             <span key={tag} className="text-[10px] md:text-sm font-bold font-mono px-4 py-2 bg-black/60 backdrop-blur-md border border-white/20 rounded-lg text-gray-300 uppercase hover:text-white hover:border-white/50 transition-colors shadow-lg">
               {tag}
             </span>
           ))}
         </div>
      </div>
    </div>
  </div>
);

const ProjectsStack = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ['start 10vh', 'end 10vh'] 
  });

  return (
    <section id="projects" className="pt-20 pb-[10vh] w-full relative">
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white pl-6 border-l-4 border-[#c6ff00] tracking-wide uppercase flex items-center gap-4 drop-shadow-sm">
           <Trophy className="text-[#c6ff00]" size={42} /> Flagship Projects
        </h2>
      </div>

      <div ref={containerRef} className="relative w-full flex flex-col items-center">
        {PROJECTS_DATA.map((project, index) => (
          <StickyCard 
            key={project.id} 
            project={project} 
            index={index} 
            totalCards={PROJECTS_DATA.length} 
            progress={scrollYProgress} 
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsStack;
