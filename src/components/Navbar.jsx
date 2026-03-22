import React, { useState, useEffect } from 'react';
import { Home, User, Code, Briefcase, BookOpen, Star, Award, Mail, GraduationCap } from 'lucide-react';
import { useActiveSection } from '../hooks/useActiveSection';

const navLinks = [
  { name: 'Intro', id: 'intro', icon: Home },
  { name: 'About', id: 'about', icon: User },
  { name: 'Skills', id: 'skills', icon: Code },
  { name: 'Projects', id: 'projects', icon: Briefcase },
  { name: 'Certifications', id: 'certifications', icon: BookOpen },
  { name: 'Training', id: 'experience', icon: Star },
  { name: 'Awards', id: 'competitive', icon: Award },
  { name: 'Edu', id: 'education', icon: GraduationCap },
  { name: 'Contact', id: 'contact', icon: Mail },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { activeSection, setActiveSection } = useActiveSection(navLinks.map(l => l.id));

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 40,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <nav 
      className={`fixed right-6 lg:right-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-700 ease-out transform hidden md:flex ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-[150%] opacity-0'}`}
      aria-label="Sidebar Navigation"
    >
      {navLinks.map((link) => {
        const Icon = link.icon;
        const isActive = activeSection === link.id;
        
        return (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => handleScrollTo(e, link.id)}
            className={`group relative p-3 rounded-full transition-all duration-300 ${
              isActive 
                ? 'bg-white text-black shadow-lg scale-110' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            aria-label={link.name}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-[#141414] text-gray-200 text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 pointer-events-none border border-white/10 shadow-xl">
              {link.name}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
