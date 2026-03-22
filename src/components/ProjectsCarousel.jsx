// src/components/ProjectsCarousel.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/projects';

const ProjectsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length);

  const getCardStyles = (index) => {
    if (index === currentIndex) {
      // Active center card
      return {
        x: 0,
        z: 0,
        rotateY: 0,
        scale: 1,
        opacity: 1,
        zIndex: 20,
        filter: 'blur(0px)'
      };
    } else if (index === (currentIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length) {
      // Left card
      return {
        x: '-45%',
        z: -100,
        rotateY: 35,
        scale: 0.8,
        opacity: 0.4,
        zIndex: 10,
        filter: 'blur(6px)'
      };
    } else {
      // Right card
      return {
        x: '45%',
        z: -100,
        rotateY: -35,
        scale: 0.8,
        opacity: 0.4,
        zIndex: 10,
        filter: 'blur(6px)'
      };
    }
  };

  return (
    <section id="projects" className="space-y-6 pt-10">
      <h2 className="text-3xl font-black text-white mb-12 pl-4 border-l-4 border-[#c6ff00] tracking-wide uppercase flex items-center gap-3 drop-shadow-sm">
         <Trophy className="text-[#c6ff00]" size={36} /> Flagship Projects
      </h2>

      <div className="relative w-full h-[550px] md:h-[650px] flex items-center justify-center overflow-hidden" style={{ perspective: '1200px' }}>
        
        {/* Navigation Buttons */}
        <button 
          onClick={handlePrev} 
          className="absolute left-2 md:left-12 z-30 p-4 rounded-full bg-black/50 border border-white/20 text-white hover:bg-[#c6ff00] hover:text-black hover:border-[#c6ff00] transition-colors drop-shadow-2xl backdrop-blur-md"
        >
          <ChevronLeft size={28} />
        </button>
        <button 
          onClick={handleNext} 
          className="absolute right-2 md:right-12 z-30 p-4 rounded-full bg-black/50 border border-white/20 text-white hover:bg-[#c6ff00] hover:text-black hover:border-[#c6ff00] transition-colors drop-shadow-2xl backdrop-blur-md"
        >
          <ChevronRight size={28} />
        </button>

        {/* Mechanism */}
        <div className="relative w-full max-w-4xl h-[450px] md:h-[550px] flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
          <AnimatePresence initial={false}>
            {PROJECTS_DATA.map((project, index) => {
              const isActive = index === currentIndex;
              const styles = getCardStyles(index);

              return (
                <motion.div
                  key={project.id}
                  className="absolute w-[90%] sm:w-[80%] md:w-full h-full cursor-pointer"
                  onClick={() => !isActive && setCurrentIndex(index)}
                  initial={false}
                  animate={{ 
                    x: styles.x, 
                    z: styles.z,   
                    rotateY: styles.rotateY, 
                    scale: styles.scale, 
                    opacity: styles.opacity,
                    filter: styles.filter
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 20, mass: 1.2 }}
                  style={{ zIndex: styles.zIndex, transformStyle: 'preserve-3d' }}
                >
                  {/* We only wrap the active card in Tilt to prevent physics conflicts */}
                  {isActive ? (
                    <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02} transitionSpeed={2000} className="w-full h-full rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.9)] border border-white/30">
                      <div onClick={() => navigate(`/project/${project.id}`)} className="w-full h-full">
                        <ProjectCardContent project={project} />
                      </div>
                    </Tilt>
                  ) : (
                    <div className="w-full h-full rounded-[32px] shadow-2xl border border-white/10 pointer-events-none">
                      <ProjectCardContent project={project} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const ProjectCardContent = ({ project }) => (
  <div className="relative w-full h-full rounded-[32px] overflow-hidden group transition-all duration-700 flex flex-col transform-gpu preserve-3d bg-[#050505]">
    <div className="absolute inset-0 z-0">
      <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-70 transition-transform duration-1000 ease-out" />
      <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent`}></div>
      <div className={`absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent`}></div>
    </div>
    
    <div className="p-8 md:p-12 relative z-10 flex flex-col h-full justify-between" style={{ transform: 'translateZ(50px)' }}>
      {/* Top badges */}
      <div className="flex items-center gap-3">
        <span className={`text-xs font-black px-4 py-1.5 ${project.colorClass} text-black rounded-lg tracking-wider uppercase ${project.shadowClass}`}>{project.category}</span>
        {project.date && <span className="text-xs font-bold font-mono text-white/70 px-3 py-1.5 bg-black/40 rounded-lg backdrop-blur-md border border-white/10">{project.date}</span>}
      </div>
      
      {/* Bottom text */}
      <div className="mb-2">
         <h3 className={`text-3xl md:text-5xl font-black text-white mb-6 group-hover:${project.textColorClass} transition-colors uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]`}>
            {project.title}
         </h3>
         <p className="text-gray-200 text-sm md:text-lg max-w-2xl font-medium mb-8 drop-shadow-md leading-relaxed border-l-2 pl-4 border-white/20">
           {project.desc}
         </p>
         <div className="flex flex-wrap gap-2">
           {project.tags.map(tag => (
             <span key={tag} className="text-[10px] md:text-xs font-bold font-mono px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/20 rounded-md text-gray-300 uppercase hover:text-white hover:border-white/50 transition-colors">
               {tag}
             </span>
           ))}
         </div>
      </div>
    </div>
  </div>
);

export default ProjectsCarousel;
