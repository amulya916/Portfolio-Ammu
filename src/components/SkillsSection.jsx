// src/components/SkillsSection.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPython, FaJava, FaHtml5, FaCss3Alt, FaGithub } from 'react-icons/fa';
import { Database, Hash, Table, LineChart, PieChart, Cpu, BarChart2, FileSpreadsheet, Presentation, Brain, Clock, MessageCircle, Users, RefreshCw, Code, Terminal } from 'lucide-react';

const SKILLS_DATA = {
  Languages: [
    { name: 'Python', icon: <FaPython size={40} className="text-[#FFD43B] drop-shadow-md" />, color: 'from-[#3776AB] to-[#FFD43B]', desc: 'Versatile language extensively used for Machine Learning, Data Science, and automated scripting.' },
    { name: 'Java', icon: <FaJava size={40} className="text-[#ED8B00] drop-shadow-md" />, color: 'from-[#1b1b1b] to-[#ED8B00]', desc: 'Object-oriented programming language utilized for building robust enterprise-level applications and mastering DSA.' },
    { name: 'HTML5', icon: <FaHtml5 size={40} className="text-[#E34F26] drop-shadow-md" />, color: 'from-[#1b1b1b] to-[#E34F26]', desc: 'The standard markup language designing the foundational structure and semantics of Web Applications.' },
    { name: 'CSS3', icon: <FaCss3Alt size={40} className="text-[#1572B6] drop-shadow-md" />, color: 'from-[#1b1b1b] to-[#1572B6]', desc: 'Style sheet language used for stunning UI layouts, animations, and responsive web aesthetics.' },
  ],
  Frameworks: [
    { name: 'NumPy', icon: <Hash size={40} className="text-[#4A90E2] drop-shadow-md" />, color: 'from-[#013243] to-[#4A90E2]', desc: 'Fundamental package for scientific computing in Python, providing powerful N-dimensional array objects.' },
    { name: 'Pandas', icon: <Table size={40} className="text-[#FFCA00] drop-shadow-md" />, color: 'from-[#150458] to-[#FFCA00]', desc: 'Fast, powerful, flexible and easy to use open source data analysis and manipulation tool.' },
    { name: 'Matplotlib', icon: <LineChart size={40} className="text-[#38bdf8] drop-shadow-md" />, color: 'from-[#11557c] to-[#38bdf8]', desc: 'Comprehensive library for creating static, animated, and interactive data visualizations in Python.' },
    { name: 'Seaborn', icon: <PieChart size={40} className="text-[#86efac] drop-shadow-md" />, color: 'from-[#4C72B0] to-[#86efac]', desc: 'Statistical data visualization library based on matplotlib bridging high-level interfaces for attractive graphics.' },
    { name: 'Scikit-Learn', icon: <Cpu size={40} className="text-[#F7931E] drop-shadow-md" />, color: 'from-[#1b1b1b] to-[#F7931E]', desc: 'Machine learning library in Python featuring classification, regression and clustering algorithms.' },
  ],
  Tools: [
    { name: 'Power BI', icon: <BarChart2 size={40} className="text-[#F2C811] drop-shadow-md" />, color: 'from-[#1b1b1b] to-[#F2C811]', desc: 'Interactive data visualization software product bridging raw data into aesthetic, coherent dashboards.' },
    { name: 'Git/GitHub', icon: <FaGithub size={40} className="text-white drop-shadow-md" />, color: 'from-[#1b1b1b] to-[#4b5563]', desc: 'Version control system managing and storing revisions of projects, facilitating brilliant team collaboration.' },
    { name: 'SSMS', icon: <Database size={40} className="text-[#ef4444] drop-shadow-md" />, color: 'from-[#CC292B] to-[#ef4444]', desc: 'SQL Server Management Studio used for configuring, managing, and administering all components within SQL server.' },
    { name: 'Eclipse', icon: <Terminal size={40} className="text-[#c4b5fd] drop-shadow-md" />, color: 'from-[#2C2255] to-[#c4b5fd]', desc: 'Integrated Development Environment (IDE) vastly used in computer programming for developing Java applications.' },
    { name: 'Excel', icon: <FileSpreadsheet size={40} className="text-[#22c55e] drop-shadow-md" />, color: 'from-[#217346] to-[#22c55e]', desc: 'Powerful spreadsheet program featuring calculation, graphing tools, pivot tables, and macro programming.' },
    { name: 'Power Point', icon: <Presentation size={40} className="text-[#f97316] drop-shadow-md" />, color: 'from-[#B7472A] to-[#f97316]', desc: 'Presentation program utilized for designing impactful, dynamic, and professional technical presentations.' }
  ],
  'Soft Skills': [
    { name: 'Problem-Solving', icon: <Brain size={40} className="text-[#D946EF] drop-shadow-md" />, color: 'from-[#8B5CF6] to-[#D946EF]', desc: 'Analytical mindset capable of breaking down complex software or logic puzzles into manageable, actionable solutions.' },
    { name: 'Time Mgmt', icon: <Clock size={40} className="text-[#3B82F6] drop-shadow-md" />, color: 'from-[#06B6D4] to-[#3B82F6]', desc: 'Strategic prioritization and organization skills ensuring projects and deadlines are consistently met.' },
    { name: 'Communication', icon: <MessageCircle size={40} className="text-[#34D399] drop-shadow-md" />, color: 'from-[#10B981] to-[#34D399]', desc: 'Ability to clearly convey profound technical concepts or data insights to both engineering and non-technical stakeholders.' },
    { name: 'Team Player', icon: <Users size={40} className="text-[#FBBF24] drop-shadow-md" />, color: 'from-[#F59E0B] to-[#FBBF24]', desc: 'Collaborative spirit geared towards supporting peers, pair programming, and achieving collective project goals.' },
    { name: 'Adaptability', icon: <RefreshCw size={40} className="text-[#F43F5E] drop-shadow-md" />, color: 'from-[#EC4899] to-[#F43F5E]', desc: 'Rapidly learning modern technologies, pivoting to new frameworks, and flourishing in dynamic work environments.' }
  ]
};

const TERMINAL_SNIPPETS = {
  Languages: `def build_ml_model(data):
    """
    Aspiring Data Engineer | Python & Java Output
    """
    model = MLPipeline.initialize()
    model.train(data.features, data.labels)
    return model.predict()`,
  Frameworks: `import pandas as pd
import seaborn as sns

# Exploratory Data Analysis & Manipulation
df = pd.read_csv("environmental_data.csv")
print(df.describe())
sns.pairplot(df, hue="class") # Rendering plots...`,
  Tools: `user@portfolio:~$ git status
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   src/portfolio/Excellence.java
        new file:   dashboards/PowerBI_Report.pbix`,
  'Soft Skills': `[SYSTEM LOG] >> Analyzing Problem Architecture...
[INFO] >> Time Management module active. Deadlines strictly met.
[INFO] >> Compiling team communication channels...
[SUCCESS] >> Adaptability synchronized. Ready for dynamic environments.`
};


const SkillCard = ({ skill, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isVerticalFlip = index % 2 === 0;

  return (
    <div 
      className="relative w-[140px] h-[140px] sm:w-[150px] sm:h-[150px] md:w-[170px] md:h-[170px] cursor-pointer group"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div 
        className="w-full h-full relative duration-700"
        style={{ transformStyle: 'preserve-3d' }}
        initial={false}
        animate={isVerticalFlip ? { rotateX: isFlipped ? 180 : 0 } : { rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front of Card */}
        <div 
           className={`absolute w-full h-full rounded-2xl p-4 flex flex-col items-center justify-center gap-3 border border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.6)] overflow-hidden bg-gradient-to-br ${skill.color}`}
           style={{ backfaceVisibility: 'hidden' }}
        >
           <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500 z-0"></div>
           <div className="relative z-10 drop-shadow-xl group-hover:scale-110 transition-transform duration-500">
             {skill.icon}
           </div>
           <h4 className="relative z-10 text-xs sm:text-sm md:text-base font-black text-white text-center tracking-wide uppercase drop-shadow-[0_0_5px_rgba(255,255,255,0.3)] truncate break-words">{skill.name}</h4>
           <div className="absolute bottom-2 text-[9px] md:text-[10px] font-bold text-white/70 uppercase tracking-widest flex items-center gap-1 group-hover:text-white transition-colors">
               <RefreshCw size={10} /> Reveal
           </div>
        </div>

        {/* Back of Card */}
        <div 
          className={`absolute w-full h-full rounded-2xl p-4 flex flex-col items-center justify-center border border-white/30 shadow-xl overflow-hidden bg-gradient-to-br ${skill.color}`}
          style={{ transform: isVerticalFlip ? 'rotateX(180deg)' : 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
        >
           <div className="absolute inset-0 bg-black/80 z-0"></div>
           <div className="absolute inset-0 opacity-30 bg-grid-white/[0.04] z-0"></div>
           <div className="relative z-10 text-center flex flex-col h-full justify-center items-center gap-2 overflow-y-auto no-scrollbar">
             <h4 className="text-sm md:text-base font-black uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">{skill.name}</h4>
             <p className="text-gray-200 text-[10px] sm:text-xs font-medium leading-snug drop-shadow-sm">
               {skill.desc}
             </p>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState('Languages');
  const categories = Object.keys(SKILLS_DATA);

  return (
    <section id="skills" className="space-y-6 pt-10">
      <h2 className="text-2xl font-semibold text-white mb-8 pl-4 border-l border-white/20 tracking-wide uppercase flex items-center gap-3">
        <Code className="text-[#c6ff00]" /> Skills Arsenal
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-12 border-b border-white/10 pb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-8 py-4 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === cat 
                ? 'bg-[#c6ff00] text-black shadow-[0_0_20px_rgba(198,255,0,0.5)] scale-105' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards Grid Grid Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center w-full min-h-[400px]"
        >
          {/* Flex Wrap For Small Cards Context */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full mb-10">
            {SKILLS_DATA[activeTab].map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
          
          {/* Dynamic Code Terminal Sub-Block mapping Empty Space */}
          <div className="w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#c6ff00]/5 to-transparent z-0 opacity-50"></div>
            
            {/* Terminal Header */}
            <div className="bg-[#111] px-4 py-3 flex items-center border-b border-white/10 relative z-10 w-full">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <p className="absolute left-1/2 transform -translate-x-1/2 text-[10px] md:text-xs text-gray-500 font-mono tracking-widest uppercase">
                {activeTab.toLowerCase()}_insights.sh
              </p>
            </div>
            
            {/* Terminal Body */}
            <div className="p-6 relative z-10 w-full">
              <pre className="font-mono text-sm sm:text-base text-green-400 whitespace-pre-wrap flex flex-col items-start text-left w-full h-full">
                {TERMINAL_SNIPPETS[activeTab]}
              </pre>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default SkillsSection;
