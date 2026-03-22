import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import SkillsSection from '../components/SkillsSection';
import ProjectsCarousel from '../components/ProjectsCarousel';
import CustomCursor from '../components/CustomCursor';
import AnimatedBackground from '../components/AnimatedBackground';
import {
  ArrowUpRight, Github, Linkedin, Mail, GraduationCap,
  Code, BookOpen, Terminal, User, FileText, Download, Trophy, Star, Phone, X
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// Sub-component so useTransform can be called at top-level (not inside .map())
function QuoteWord({ word, progress, start, end }) {
  const color = useTransform(
    progress,
    [start, end],
    ['rgba(255,255,255,0.12)', 'rgba(255,255,255,1)']
  );
  return (
    <motion.span style={{ color }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

function Home() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [showCvModal, setShowCvModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const certifications = [
    {
      id: 1,
      title: "Generative AI Apps & Solutions",
      org: "Infosys",
      date: "AUG 2025",
      image: "/cert-cloud.png"
    },
    {
      id: 2,
      title: "Computational Theory: Automata",
      org: "Infosys",
      date: "AUG 2025",
      image: "/cert-theory.png"
    },
    {
      id: 3,
      title: "Cloud Computing Foundation",
      org: "NPTEL",
      date: "JUN 2025",
      image: "/cert-genai.png"
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const subject = `Portfolio Inquiry - New Contact`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:p.amulya333@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Scroll-triggered quote reveal
  const quoteRef = useRef(null);
  const { scrollYProgress: quoteSY } = useScroll({ target: quoteRef, offset: ['start 0.9', 'end 0.4'] });

  // Split the quote into words, each word gets a color transform based on scroll progress
  const quoteWords = "Behind every great insight is an even greater story of data.".split(' ');

  return (
    <>
    <div className="relative min-h-screen bg-jayden-bg text-white font-sans overflow-hidden">
      {/* Dynamic Animated Background */}
      <AnimatedBackground />

      {/* Floating Side Nav */}
      <Navbar />

      {/* Main Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 pb-32 pt-24 space-y-32">
        {/* 1. INTRODUCTION & SUMMARY */}
        <motion.section 
          initial="hidden" animate="visible" variants={staggerContainer}
          id="intro" className="min-h-[85vh] flex flex-col justify-center items-center text-center relative mt-10"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 mt-[-5rem] mb-12 rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#c6ff00] animate-pulse"></span>
            <span className="text-sm font-semibold text-gray-200 tracking-wide">Available for Work</span>
          </motion.div>

          <Tilt tiltReverse={true} scale={1.05} transitionSpeed={2500} className="w-48 h-48 mb-10 rounded-full bg-white border-4 border-[#c6ff00]/50 shadow-[0_0_50px_rgba(198,255,0,0.2)] flex items-center justify-center relative overflow-hidden group cursor-pointer">
            <img 
              src="/profile.png" 
              alt="Putta Amulya" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Tilt>

          <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#c6ff00] via-white to-[#818cf8] drop-shadow-[0_0_20px_rgba(198,255,0,0.2)]">
            Hi, I'm <br className="md:hidden" />Amulya Putta
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light mb-8">
            <span className="text-[#c6ff00] font-medium">Data Analyst</span> & <span className="text-[#818cf8] font-medium">Software Developer</span>.<br className="hidden md:block" /> I transform complex data into <span className="text-white font-medium italic">actionable insights</span> and robust applications.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex gap-4 mb-10">
            <a href="https://github.com/amulya916" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-jayden-card border border-white/5 hover:bg-white hover:text-black hover:scale-110 transition-all duration-300">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/putta-amulya-b79731289/" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-jayden-card border border-white/5 hover:bg-white hover:text-black hover:scale-110 transition-all duration-300">
              <Linkedin size={24} />
            </a>
            <a href="mailto:p.amulya333@gmail.com" className="p-4 rounded-full bg-jayden-card border border-white/5 hover:bg-white hover:text-black hover:scale-110 transition-all duration-300">
              <Mail size={24} />
            </a>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setShowCvModal(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-black font-semibold bg-white hover:bg-gray-200 transition-colors duration-300"
            >
              <FileText size={18} /> View CV
            </button>
            <a
              href="/cv.pdf"
              download="Amulya_Putta_CV.pdf"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold bg-white/10 border border-white/20 hover:bg-white/20 transition-colors duration-300"
            >
              <Download size={18} /> Download CV
            </a>
          </motion.div>
        </motion.section>

        {/* 2. ABOUT ME */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
          id="about" className="space-y-10 pt-10"
        >
          <h2 className="text-2xl font-semibold text-white mb-8 pl-4 border-l border-white/20 tracking-wide uppercase flex items-center gap-3">
            <User className="text-[#c6ff00]" /> About Me
          </h2>

          {/* Scroll-triggered quote reveal */}
          <div ref={quoteRef} className="py-8">
            <p className="text-4xl md:text-6xl font-black tracking-tight leading-tight max-w-4xl">
              {quoteWords.map((word, i) => (
                <QuoteWord
                  key={i}
                  word={word}
                  progress={quoteSY}
                  start={i / quoteWords.length}
                  end={(i + 1) / quoteWords.length}
                />
              ))}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Text Card */}
            <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} glareEnable={true} glareMaxOpacity={0.08} glarePosition="all" className="glass-card rounded-[32px] p-8 md:p-12 flex flex-col justify-center border border-white/10 hover:border-white/30 transition-colors duration-500 shadow-2xl flex-1">
              <div className="space-y-6">
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
                  I'm <span className="text-white font-semibold">Amulya Putta</span>, an aspiring Data Engineer and Software Developer currently pursuing my B.Tech in Computer Science at Lovely Professional University (CGPA: 8.17).
                </p>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light">
                  My passion lies at the intersection of <span className="text-[#c6ff00] font-medium">data science</span> and <span className="text-[#c6ff00] font-medium">software engineering</span> — turning raw, complex datasets into clear, actionable insights that drive smarter decisions. From predicting paddy yields using machine learning to analyzing greenhouse gas emissions with Power BI, I love building solutions that answer real-world questions.
                </p>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light">
                  Beyond data, I bring strong programming foundations in <span className="text-white font-medium">Python and Java</span>, with hands-on experience in EDA, visualization, classification models, and interactive dashboards. I enjoy tackling structured problems with creative thinking and clean code.
                </p>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light">
                  When I'm not writing code, I'm sharpening my competitive edge — earning a <span className="text-yellow-400 font-medium">Gold Badge in Java</span> on HackerRank, participating in hackathons, and continuously exploring new tools in the data ecosystem. I believe every dataset has a story waiting to be told.
                </p>
              </div>
            </Tilt>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:w-[340px] shrink-0 rounded-[32px] overflow-hidden border border-white/10 shadow-2xl relative group"
            >
              <img
                src="/about-me.png"
                alt="Data & Development Visual"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-bold tracking-widest text-[#c6ff00] uppercase">
                  Data · Analysis · Code
                </span>
              </div>
            </motion.div>
          </div>
        </motion.section>


        {/* 3. SKILLS & TECHNOLOGIES */}
        <SkillsSection />

        {/* 4. PROJECTS CAROUSEL */}
        <ProjectsCarousel />

        {/* 5. CERTIFICATIONS */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
          id="certifications" className="space-y-6 pt-10"
        >
          <h2 className="text-2xl font-semibold text-white mb-8 pl-4 border-l border-white/20 tracking-wide uppercase flex items-center gap-3">
             <BookOpen className="text-[#c6ff00]" /> Certifications
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div 
                key={cert.id}
                className="group cursor-pointer relative"
                onClick={() => {
                  console.log("Manual Trigger - Opening Certificate:", cert.title);
                  setSelectedCert(cert);
                }}
              >
                <Tilt 
                  tiltMaxAngleX={15} 
                  tiltMaxAngleY={15} 
                  glareEnable={true} 
                  glareMaxOpacity={0.2} 
                  className="glass-card p-8 rounded-[32px] h-full flex flex-col border border-white/10 shadow-lg group-active:scale-95 transition-transform overflow-hidden relative"
                >
                  {/* Card Background Preview Image */}
                  <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                    <img src={cert.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-black/60"></div>
                  </div>

                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div id={`cert-card-${cert.id}`}>
                      <span className="inline-block px-3 py-1 bg-white/10 text-white rounded-md text-xs font-bold tracking-widest mb-6 border border-white/5">{cert.date}</span>
                      <h3 className="text-xl font-bold uppercase text-white mb-4 leading-tight group-hover:text-[#c6ff00] transition-colors">{cert.title}</h3>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-6">
                      <p className="text-[#c6ff00] font-bold tracking-widest uppercase">{cert.org}</p>
                      <div className="p-2 rounded-full bg-white/5 border border-white/10 text-white/20 group-hover:text-[#c6ff00] group-hover:border-[#c6ff00]/50 group-hover:bg-[#c6ff00]/10 transition-all">
                        <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Tilt>
              </div>
            ))}
          </div>

          {/* Certificate Modal */}
          <AnimatePresence>
            {selectedCert && (
              <motion.div 
                id="cert-modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl"
                onClick={() => setSelectedCert(null)}
              >
                <motion.div 
                  id="cert-modal-content"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative max-w-5xl w-full bg-[#111] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    id="close-cert-modal"
                    onClick={() => setSelectedCert(null)}
                    className="absolute top-6 right-6 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-all border border-white/10"
                  >
                    <X size={24} />
                  </button>
                  <div className="p-2">
                    <img 
                      id="cert-modal-image"
                      src={selectedCert.image} 
                      alt={selectedCert.title} 
                      className="w-full h-auto rounded-2xl shadow-2xl"
                    />
                  </div>
                  <div className="p-8 bg-black/50 backdrop-blur-md border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight">{selectedCert.title}</h3>
                      <p className="text-[#c6ff00] font-bold tracking-[0.2em] uppercase text-sm mt-1">{selectedCert.org} • {selectedCert.date}</p>
                    </div>
                    <a 
                      href={selectedCert.image} 
                      download={`${selectedCert.title.replace(/\s+/g, '_')}_Certificate.png`}
                      className="px-6 py-3 bg-white text-black rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      <Download size={16} /> Download
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* 6. TRAINING */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
          id="experience" className="space-y-6 pt-10"
        >
          <h2 className="text-2xl font-semibold text-white mb-8 pl-4 border-l border-white/20 tracking-wide uppercase flex items-center gap-3">
             <Star className="text-[#c6ff00]" /> Training
          </h2>
          <div className="glass-card border border-white/10 rounded-[32px] p-8 md:p-12 flex flex-col hover:border-indigo-500/50 transition-all duration-500 shadow-xl">
            <div className="border-l-2 border-indigo-500/50 pl-6 md:pl-10 relative">
              <span className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-indigo-500 border-4 border-[#111] shadow-[0_0_10px_rgba(99,102,241,0.8)]"></span>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tight">Fundamentals of DSA</h3>
                    <p className="text-xl font-bold text-indigo-400 mt-2 uppercase tracking-wide">Lovely Professional University</p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className="bg-indigo-500/20 border border-indigo-500/30 px-4 py-2 rounded-full text-sm font-bold tracking-widest text-indigo-200 whitespace-nowrap shadow-inner">JUN 2025 - JUL 2025</span>
                    <button 
                      onClick={() => setSelectedCert({
                        id: 'training-dsa',
                        title: "Fundamentals of Data Structures",
                        org: "LPU Centre for Professional Enhancement",
                        date: "JUN 2025 - JUL 2025",
                        image: "/cert-training.png"
                      })}
                      className="px-4 py-2 bg-white/5 hover:bg-[#c6ff00] hover:text-black border border-white/10 hover:border-[#c6ff00] rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 group"
                    >
                      <FileText size={14} className="group-hover:scale-110 transition-transform" /> View Certificate
                    </button>
                  </div>
                </div>
              <motion.ul variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-gray-300 text-lg space-y-6 list-none max-w-4xl font-light">
                <motion.li variants={fadeInUp} className="flex gap-4 items-start"><Star size={20} className="text-[#c6ff00] shrink-0 mt-1 drop-shadow-[0_0_8px_rgba(198,255,0,0.5)]" /> <span>Learnt fundamentals of DSA such as Arrays, LinkedList, Stacks, Queues, Trees.</span></motion.li>
                <motion.li variants={fadeInUp} className="flex gap-4 items-start"><Star size={20} className="text-[#c6ff00] shrink-0 mt-1 drop-shadow-[0_0_8px_rgba(198,255,0,0.5)]" /> <span>Utilized Java libraries such as Swing, AWT, and Event handling to build functional applications.</span></motion.li>
                <motion.li variants={fadeInUp} className="flex gap-4 items-start"><Star size={20} className="text-[#c6ff00] shrink-0 mt-1 drop-shadow-[0_0_8px_rgba(198,255,0,0.5)]" /> <span>Designed interactive UI and built a GUI-based Sudoku Game using Backtracking Algorithms.</span></motion.li>
              </motion.ul>
            </div>
          </div>
        </motion.section>

        {/* 7. COMPETITIVE PROGRAMMING & HACKATHONS */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
          id="competitive" className="space-y-6 pt-10"
        >
          <h2 className="text-2xl font-semibold text-white mb-8 pl-4 border-l border-white/20 tracking-wide uppercase flex items-center gap-3">
             <Trophy className="text-[#c6ff00]" /> Awards & Hackathons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.2} className="glass-card border border-white/10 rounded-[32px] p-10 flex flex-col justify-center items-center text-center group hover:border-yellow-500/50 transition-all duration-500 overflow-hidden relative shadow-xl">
              <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>
              <motion.div animate={{ rotateY: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                <Trophy size={80} className="text-yellow-400 mb-8 drop-shadow-[0_0_20px_rgba(250,204,21,0.6)]" />
              </motion.div>
              <h3 className="text-3xl font-black uppercase text-white mb-3">Java Gold Badge</h3>
              <p className="text-gray-400 text-lg font-bold tracking-widest uppercase mb-8">HackerRank Platform</p>
              <span className="px-5 py-2 rounded-full bg-white/10 border border-white/5 text-xs font-bold tracking-widest shadow-inner">FEB 2026</span>
            </Tilt>

            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} className="glass-card border border-white/10 rounded-[32px] p-10 flex flex-col justify-center shadow-xl">
              <h3 className="text-2xl font-black text-white mb-10 border-b border-white/10 pb-4 uppercase tracking-widest">Events & Workshops</h3>
              <div className="space-y-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-l-2 border-[#c6ff00]/60 pl-6 relative">
                  <span className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-[#c6ff00] shadow-[0_0_10px_rgba(198,255,0,0.8)]"></span>
                  <div>
                    <h4 className="text-lg font-bold text-white uppercase">Hackverse Hackathon</h4>
                    <p className="text-gray-400 text-sm mt-1">Participant</p>
                  </div>
                  <p className="text-[#c6ff00] font-mono text-sm tracking-widest font-bold">MAR 2024</p>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-l-2 border-[#c6ff00]/30 pl-6 relative">
                  <span className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-[#c6ff00]/50"></span>
                  <div>
                    <h4 className="text-lg font-bold text-white uppercase">CyberDrill Workshop</h4>
                    <p className="text-gray-400 text-sm mt-1">Security Workshop Participant</p>
                  </div>
                  <p className="text-gray-400 font-mono text-sm tracking-widest font-bold">FEB 2024</p>
                </div>
              </div>
            </Tilt>
          </div>
        </motion.section>

        {/* 8. EDUCATION SECTION */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
          id="education" className="space-y-6 pt-10"
        >
          <h2 className="text-2xl font-semibold text-white mb-8 pl-4 border-l border-white/20 tracking-wide uppercase flex items-center gap-3">
             <GraduationCap className="text-[#c6ff00]" /> Education
          </h2>
          <div className="glass-card border border-white/10 rounded-[32px] p-8 md:p-12 flex flex-col justify-between shadow-xl">
              <div className="space-y-10">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 border-l-2 border-[#c6ff00]/60 pl-6 relative">
                  <span className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-[#c6ff00] shadow-[0_0_10px_rgba(198,255,0,0.8)]"></span>
                  <div>
                    <h4 className="text-xl font-bold text-white uppercase">Lovely Professional University</h4>
                    <p className="text-gray-400 text-base mt-2">B.Tech - Computer Science</p>
                  </div>
                  <div className="text-left md:text-right mt-4 md:mt-0">
                    <p className="text-[#c6ff00] font-mono text-sm tracking-widest font-bold bg-black/20 px-3 py-1 rounded inline-block">Aug 2023 - Present</p>
                    <p className="text-gray-300 font-mono text-sm mt-3 font-bold">CGPA: 8.17</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 border-l-2 border-white/20 pl-6 relative">
                  <span className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-white/40"></span>
                  <div>
                    <h4 className="text-lg font-bold text-white uppercase">Sri Chaitanya Junior College</h4>
                    <p className="text-gray-400 text-sm mt-2">Intermediate</p>
                  </div>
                  <div className="text-left md:text-right mt-4 md:mt-0">
                    <p className="text-gray-400 font-mono text-sm font-bold">Jun 2021 - Mar 2023</p>
                    <p className="text-gray-400 font-mono text-sm mt-2">Percentage: 98%</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 border-l-2 border-white/20 pl-6 relative">
                  <span className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-white/40"></span>
                  <div>
                    <h4 className="text-lg font-bold text-white uppercase">Aditya High School</h4>
                    <p className="text-gray-400 text-sm mt-2">Matriculation</p>
                  </div>
                  <div className="text-left md:text-right mt-4 md:mt-0">
                    <p className="text-gray-400 font-mono text-sm font-bold">Jun 2020 - Apr 2021</p>
                    <p className="text-gray-400 font-mono text-sm mt-2">Percentage: 99%</p>
                  </div>
                </div>
              </div>
          </div>
        </motion.section>
      </main>

      {/* 9. CONTACT SECTION & FOOTER */}
      <section id="contact" className="bg-white text-black w-full pt-32 pb-16 px-6 flex flex-col items-center relative z-20 mt-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="w-16 h-1 bg-[#c6ff00] mb-12 rounded-full shadow-[0_0_20px_rgba(198,255,0,0.5)]"></div>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-black mb-24 tracking-tighter uppercase text-center w-full text-[#a4cc00] drop-shadow-sm"
        >
          Let's Connect
        </motion.h2>

        <div className="w-full max-w-5xl flex flex-col md:flex-row justify-center items-center gap-12 md:gap-40 mb-32">
          <a href="mailto:p.amulya333@gmail.com" className="group flex flex-col items-center gap-8 hover:-translate-y-2 transition-transform duration-300">
             <div className="w-32 h-32 rounded-full bg-[#f4f7e1] flex items-center justify-center group-hover:scale-105 transition-transform duration-500 shadow-sm border border-[#e8eed2]">
                <Mail size={40} className="text-[#a4cc00]" />
             </div>
             <span className="text-sm font-black tracking-[0.25em] text-gray-500 group-hover:text-black transition-colors uppercase">Email Me</span>
          </a>
          <a href="tel:+919502170090" className="group flex flex-col items-center gap-8 hover:-translate-y-2 transition-transform duration-300">
             <div className="w-32 h-32 rounded-full bg-[#f4f7e1] flex items-center justify-center group-hover:scale-105 transition-transform duration-500 shadow-sm border border-[#e8eed2]">
                <Phone size={40} className="text-[#a4cc00]" />
             </div>
             <span className="text-sm font-black tracking-[0.25em] text-gray-500 group-hover:text-black transition-colors uppercase">Call Me</span>
          </a>
        </div>

        <div className="w-full max-w-4xl bg-[#0d0d0d] text-white rounded-[40px] p-8 md:p-16 mb-32 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-grid-white opacity-[0.02]"></div>
          <div className="relative z-10">
             <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 tracking-tight">Tell us a bit about yourself</h2>
             <form onSubmit={handleContactSubmit} className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-white font-mono font-bold text-sm tracking-wide">Full Name</label>
                    <input type="text" required placeholder="Jackson Ethan" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#141414] border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors shadow-inner" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-white font-mono font-bold text-sm tracking-wide">Email Address</label>
                      <input type="email" required placeholder="Type your mail address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-[#141414] border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors shadow-inner" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-white font-mono font-bold text-sm tracking-wide">Phone</label>
                      <input type="text" placeholder="+880" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#141414] border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors shadow-inner" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-white font-mono font-bold text-sm tracking-wide">Messages</label>
                    <textarea required rows="5" placeholder="Type a message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-[#141414] border border-white/5 rounded-2xl px-6 py-6 text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors shadow-inner resize-none"></textarea>
                  </div>
               <button type="submit" className="mt-8 bg-white text-black font-mono font-bold text-lg px-8 py-4 rounded-xl flex items-center justify-center w-full md:w-auto gap-2 hover:bg-gray-200 transition-colors shadow-lg shadow-white/10 group">
                 Contact Now <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </button>
             </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-32">
           <a href="https://www.linkedin.com/in/putta-amulya-b79731289/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-black tracking-[0.2em] text-gray-500 hover:text-black transition-colors uppercase group">
              <Linkedin size={24} className="text-[#a4cc00] group-hover:scale-110 transition-transform" /> Linkedin
           </a>
           <a href="https://github.com/amulya916" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-black tracking-[0.2em] text-gray-500 hover:text-black transition-colors uppercase group">
              <Github size={24} className="text-[#a4cc00] group-hover:scale-110 transition-transform" /> Github
           </a>
        </div>

        <footer className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-gray-100 text-[10px] md:text-xs font-bold tracking-[0.15em] text-gray-400 uppercase text-center md:text-left">
           <p>© {new Date().getFullYear()} PUTTA AMULYA. ALL RIGHTS RESERVED.</p>
           <p>BUILT WITH <span className="text-[#a4cc00]">REACT & TAILWIND</span> & PREMIUM AESTHETICS.</p>
        </footer>
      </section>
    </div>

    {/* CV Modal — root level so it always renders on top */}
    <AnimatePresence>
      {showCvModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl"
          onClick={() => setShowCvModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-5xl w-full h-[90vh] bg-white rounded-[24px] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCvModal(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/10 text-black hover:bg-black hover:text-white transition-all"
            >
              <X size={22} />
            </button>
            <div className="flex-1 w-full bg-gray-100 flex items-center justify-center p-2">
              <iframe
                src="/cv.pdf#toolbar=0"
                title="Amulya Putta CV"
                className="w-full h-full rounded-xl border border-gray-300 shadow-sm"
              />
            </div>
            <div className="p-6 bg-[#f5f5f5] border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
              <div>
                <h3 className="text-xl font-black text-black uppercase tracking-tight">Amulya Putta</h3>
                <p className="text-gray-500 font-semibold tracking-wider uppercase text-xs mt-1">Curriculum Vitae (PDF)</p>
              </div>
              <a
                href="/cv.pdf"
                download="Amulya_Putta_CV.pdf"
                className="px-6 py-3 bg-black text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <Download size={16} /> Download PDF
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

export default Home;
