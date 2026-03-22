import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/projects';
import { motion } from 'framer-motion';
import { ChevronLeft, Github, ArrowUpRight, CheckCircle2, Target, Lightbulb } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Enforce scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const project = PROJECTS_DATA.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-black mb-4">404 - Project Not Found</h1>
        <button onClick={() => navigate('/home')} className="px-6 py-3 bg-white text-black rounded-lg font-bold">Go Home</button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#c6ff00] selection:text-black">
      
      {/* 1. Nav/Back Header */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex items-center justify-between pointer-events-none">
         <button 
           onClick={() => navigate('/home')} 
           className="pointer-events-auto flex items-center gap-2 px-5 py-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 font-bold tracking-wide uppercase text-sm shadow-xl"
         >
           <ChevronLeft size={18} /> Back to Home
         </button>

         <a 
           href={project.github_link} 
           target="_blank" 
           rel="noopener noreferrer"
           className="pointer-events-auto flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black hover:bg-gray-200 transition-colors duration-300 font-bold tracking-wide uppercase text-sm shadow-xl"
         >
           <Github size={18} /> View Repository
         </a>
      </nav>

      {/* 2. Immersive Hero Cover */}
      <div className="relative w-full min-h-[80vh] md:min-h-screen flex flex-col justify-end p-8 md:p-16 lg:p-32 overflow-hidden">
         {/* Background Image Parallax layer */}
         <div className="absolute inset-0 z-0">
           <motion.img 
             initial={{ scale: 1.1 }}
             animate={{ scale: 1 }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             src={project.image} 
             alt={project.title} 
             className="w-full h-full object-cover opacity-60" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent"></div>
           <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
         </div>

         {/* Title Block */}
         <motion.div 
           initial={{ opacity: 0, y: 50 }} 
           animate={{ opacity: 1, y: 0 }} 
           transition={{ duration: 0.8, delay: 0.2 }}
           className="relative z-10 w-full"
         >
            <div className="flex items-center gap-4 mb-8">
              <span className={`text-sm md:text-base font-black px-6 py-2 ${project.colorClass} text-black rounded-full tracking-widest uppercase shadow-[0_0_20px_rgba(255,255,255,0.1)]`}>
                {project.category}
              </span>
              {project.date && <span className="text-sm md:text-base font-bold font-mono text-white/50">{project.date}</span>}
            </div>
            
            <h1 className={`text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 uppercase tracking-tighter leading-none ${project.textColorClass} drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]`}>
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-4">
              {project.tags.map(tag => (
                <span key={tag} className="text-sm md:text-base font-bold font-mono px-6 py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-md text-gray-300 uppercase shadow-lg">
                  {tag}
                </span>
              ))}
            </div>
         </motion.div>
      </div>

      {/* 3. Sub-Details Full-Width Edge-to-Edge Grid Area */}
      <main className="relative z-10 w-full px-6 md:px-16 lg:px-32 py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Objective - Massive Span Left */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col gap-8"
        >
          <div className="flex items-center gap-4 border-b border-white/10 pb-6">
            <Target size={40} className={project.textColorClass} />
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white">Objective</h2>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-light text-gray-300 leading-relaxed pl-4 md:pl-8 border-l-4 border-white/10">
              {project.objective}
            </p>
          </div>
        </motion.section>

        {/* Challenges - Structural Right */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5 flex flex-col gap-8"
        >
          <div className="flex items-center gap-4 border-b border-white/10 pb-6">
            <ArrowUpRight size={40} className="text-red-400" />
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white">Challenges</h2>
          </div>
          <div>
            <p className="text-xl md:text-2xl font-medium text-gray-400 leading-relaxed bg-[#111] p-10 md:p-14 rounded-[32px] border border-white/5 shadow-2xl">
              {project.challenges}
            </p>
          </div>
        </motion.section>

        {/* Solutions - Full Width Deep Block */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-12 flex flex-col gap-8 mt-12"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <CheckCircle2 size={48} className="text-green-400" />
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white">The Solution</h2>
          </div>
          <div className="relative w-full">
            <div className="absolute -inset-6 bg-gradient-to-tr from-white/5 to-transparent rounded-[40px] blur-2xl -z-10"></div>
            <div className={`p-12 md:p-20 rounded-[40px] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative z-10 bg-gradient-to-br from-[#0f0f0f] to-[#141414] backdrop-blur-3xl ${project.shadowClass}`}>
               <Lightbulb className={`absolute top-12 right-12 opacity-10 ${project.textColorClass}`} size={120} />
               <p className="text-2xl md:text-4xl font-light text-gray-200 leading-relaxed md:leading-[1.8] relative z-20 max-w-7xl mx-auto text-center md:text-left">
                 {project.solution}
               </p>
            </div>
          </div>
        </motion.section>

      </main>

      {/* 4. Footer CTA */}
      <section className="w-full bg-[#111] border-t border-white/5 py-32 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-grid-white opacity-[0.02]"></div>
         <h2 className="text-4xl md:text-6xl font-black mb-12 uppercase tracking-tighter text-white relative z-10">See the Code</h2>
         
         <a 
           href={project.github_link} 
           target="_blank" 
           rel="noopener noreferrer"
           className="relative z-10 group flex items-center gap-4 px-10 py-5 rounded-full bg-white text-black hover:bg-gray-200 transition-colors duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
         >
           <span className="font-bold text-lg uppercase tracking-widest">Open in GitHub</span>
           <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
         </a>
      </section>

    </div>
  );
};

export default ProjectDetail;
