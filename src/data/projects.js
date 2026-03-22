// src/data/projects.js

export const PROJECTS_DATA = [
  {
    id: 'paddy-yield',
    title: 'Paddy Yield Prediction',
    category: 'Machine Learning',
    color: '#c6ff00',
    colorClass: 'bg-[#c6ff00]',
    textColorClass: 'text-[#c6ff00]',
    shadowClass: 'shadow-[0_0_10px_rgba(198,255,0,0.4)]',
    desc: 'Built an ML model (Random Forest, Regressors) to predict yield and classify agricultural factors achieving ~86% accuracy.',
    tags: ['NumPy', 'Pandas', 'Scikit-Learn', 'Git'],
    image: '/paddy_yield.png',
    github_link: 'https://github.com/amulya916/predictive-analytics-project',
    objective: 'To conceptualize and train a highly accurate predictive machine learning model capable of estimating agricultural paddy yield rates based on myriad environmental and statistical factors to optimize farming outputs.',
    challenges: 'One of the primary challenges was handling immense volumes of fragmented agricultural datasets containing outliers and null values. Establishing correlation mapping across seemingly erratic environmental features proved complex, alongside the necessity of minimizing overfitting on the regressor models.',
    solution: 'Engineered a robust analytical pipeline utilizing nested Pandas functions to sanitize the input data. Trained multiple models in tandem, ultimately discovering that Random Forest Regressors yielded the strongest correlation coefficients, achieving a verified ~86% validation accuracy metric in yield prediction.'
  },
  {
    id: 'ghg-emissions',
    title: 'GHG Emissions',
    category: 'Power BI',
    color: '#22d3ee',
    colorClass: 'bg-cyan-400',
    textColorClass: 'text-cyan-300',
    shadowClass: 'shadow-[0_0_10px_rgba(34,211,238,0.4)]',
    desc: 'Power Query cleaning & DAX measures tracking dominant global greenhouse gas sources.',
    tags: ['Power BI', 'Git'],
    image: '/ghg_emissions.png',
    github_link: 'https://github.com/amulya916/GHG-Emission-Analysis-using-PowerBI',
    objective: 'To provide a comprehensively visible and interactive dashboard analyzing the primary sources and trends of global Greenhouse Gas (GHG) emissions over time across distinct international demographics.',
    challenges: 'The foundational data was spread across multi-national CSV metrics with wildly differing conventions and tracking scales. Constructing cross-relational data modeling inside Power BI without heavily ballooning the model size was a rigorous constraint.',
    solution: 'Deployed deep Power Query M-code to standardize the incoming disparate data schemas. Authored calculated DAX measures designed to rapidly isolate high-impact emission sources dynamically, mapping the data into a highly visual, interactable storytelling dashboard.'
  },
  {
    id: 'ev-analysis',
    title: 'EV Exploratory Analysis',
    category: 'Data Analysis',
    color: '#a855f7',
    colorClass: 'bg-purple-500',
    textColorClass: 'text-purple-400',
    shadowClass: 'shadow-[0_0_15px_rgba(168,85,247,0.5)]',
    desc: 'Conducted exhaustive EDA on EV populations to uncover real-world adoption trends. Pre-processed datasets handling nulls and outliers, and derived actionable visual insights.',
    tags: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
    image: '/ev_analysis.png',
    date: 'Apr 2025',
    github_link: 'https://github.com/amulya916/Data-Analysis-with-python',
    objective: 'To execute a complete Exploratory Data Analysis (EDA) investigating the surge in Electric Vehicle registrations to identify geographical trends, vehicle age distribution, and charging demand proxy metrics.',
    challenges: 'The dataset contained highly skewed distribution metrics due to rapid hyper-growth in specific counties masking stagnant growth elsewhere. Additionally, classifying categorical vehicle types accurately required rigorous textual sanitization.',
    solution: 'Utilized Pandas to structure massive geographical subset groupings and Seaborn to visually plot the density parameters. The final analysis explicitly mapped Top EV Density parameters and derived core insights reflecting exact charging demand trajectories.'
  }
];
