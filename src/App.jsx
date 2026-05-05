import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Database, 
  Briefcase, 
  GraduationCap, 
  ChevronRight, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink,
  Award, 
  TrendingUp,
  ShieldCheck,
  Cpu,
  BarChart3,
  Globe,
  Zap,
  Map
} from 'lucide-react';

/**
 * --- UI NOTE ---
 * This portfolio is designed for an Executive-level BI professional.
 * Typography: Space Grotesk (Headings), JetBrains Mono (Data).
 * Theme: Emerald & Slate (High-end Fintech).
 */

// --- Injection of Google Fonts ---
const FontLoader = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;700&family=Inter:wght@300;400;500;600&display=swap');
      
      .font-heading { font-family: 'Space Grotesk', sans-serif; }
      .font-mono { font-family: 'JetBrains Mono', monospace; }
      body { font-family: 'Inter', sans-serif; scroll-behavior: smooth; }
      
      * { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
    `}
  </style>
);

// --- Circular Texture Generator for Stardust ---
const createCircleTexture = () => {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2;

  const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  context.fillStyle = gradient;
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.fill();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

// --- Advanced Stardust Background Component ---
const StardustBackground = () => {
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const particlesCount = 1200; // Refined density for elegant look
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    const noiseOffsets = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.003;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;

      noiseOffsets[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      map: createCircleTexture(),
      color: 0x10b981, 
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.4,
      sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      const posAttr = geometry.attributes.position;

      for (let i = 0; i < particlesCount; i++) {
        const idx = i * 3;
        posAttr.array[idx] += velocities[idx] + Math.sin(time * 0.1 + noiseOffsets[i]) * 0.001;
        posAttr.array[idx + 1] += velocities[idx + 1] + Math.cos(time * 0.1 + noiseOffsets[i]) * 0.001;
        
        if (posAttr.array[idx] > 10) posAttr.array[idx] = -10;
        if (posAttr.array[idx] < -10) posAttr.array[idx] = 10;
        if (posAttr.array[idx + 1] > 10) posAttr.array[idx + 1] = -10;
        if (posAttr.array[idx + 1] < -10) posAttr.array[idx + 1] = 10;
      }
      
      posAttr.needsUpdate = true;
      particlesMesh.rotation.y = time * 0.005;
      
      const targetX = mouse.current.x * 0.2;
      const targetY = mouse.current.y * 0.2;
      particlesMesh.position.x += (targetX - particlesMesh.position.x) * 0.02;
      particlesMesh.position.y += (targetY - particlesMesh.position.y) * 0.02;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
};

const GlassCard = ({ children, className = "" }) => (
  <motion.div
    whileHover={{ y: -6, boxShadow: "0 15px 30px rgba(16, 185, 129, 0.12)" }}
    className={`bg-slate-950/40 backdrop-blur-2xl border border-white/5 rounded-xl p-7 transition-all duration-500 ${className}`}
  >
    {children}
  </motion.div>
);

const SectionHeading = ({ children, icon: Icon, id }) => (
  <div className="flex items-center gap-5 mb-14" id={id}>
    {Icon && <div className="p-3.5 bg-emerald-500/10 rounded-lg text-emerald-400"><Icon size={24} /></div>}
    <h2 className="text-2xl font-bold text-white tracking-wide font-heading uppercase">{children}</h2>
    <div className="h-[1px] flex-grow bg-emerald-500/20 ml-6"></div>
  </div>
);

const scrollTo = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Hero = () => (
  <section className="relative h-screen flex flex-col justify-center items-start px-8 md:px-24 z-10">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-[1px] bg-emerald-500"></div>
        <span className="text-emerald-400 font-mono tracking-widest uppercase text-xs">
          Strategic Data Intelligence
        </span>
      </div>
      <h1 className="text-7xl md:text-[110px] font-bold text-white leading-none mb-10 font-heading tracking-tighter">
        Höskuldur <br/>
        <span className="text-emerald-500">Jónsson</span>
      </h1>
      <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed mb-14 font-light">
        Business Intelligence Specialist and Independent Capital Investor. Using 
        <span className="text-emerald-400 font-mono px-2">Data-Driven Modeling</span> to identify 
        global risk and market opportunity.
      </p>
      
      <div className="flex flex-wrap gap-5">
        <motion.button
          onClick={() => scrollTo('lab')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-10 py-5 bg-emerald-500 text-slate-950 font-bold rounded-lg flex items-center gap-3 transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-widest text-xs font-heading"
        >
          Explore Projects <ChevronRight size={18} />
        </motion.button>
        <motion.button
          onClick={() => window.location.href = "mailto:contact@hoskuldur.me"}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
          className="px-10 py-5 border border-white/10 text-white font-bold rounded-lg uppercase tracking-widest text-xs transition-all font-heading"
        >
          Contact Me
        </motion.button>
      </div>
    </motion.div>
  </section>
);

const ExecutivePerspective = () => (
  <section className="py-40 px-8 md:px-24 bg-black/60 relative" id="strategy">
    <SectionHeading icon={TrendingUp}>Market & Risk Analysis</SectionHeading>
    <div className="grid md:grid-cols-2 gap-20 items-center">
      <div className="space-y-10 text-slate-300 text-lg leading-relaxed font-light">
        <p>
          I manage personal capital with a focus on risk mitigation and long-term positioning. My transition into the <span className="text-emerald-400 font-bold font-mono">Investment Sector</span> is grounded in a methodology that blends BI tools with real-time market data.
        </p>
        <p>
          I utilize specialized threat maps and decentralized prediction platforms to identify global shifts, allowing for a more responsive analysis of market volatility across diverse sectors.
        </p>
        <div className="grid grid-cols-2 gap-8 mt-14">
          <div className="p-8 border border-white/5 rounded-xl bg-emerald-500/[0.03]">
            <div className="text-emerald-400 font-bold font-heading text-4xl mb-2 font-mono">RISK</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">Personal Portfolio</div>
          </div>
          <div className="p-8 border border-white/5 rounded-xl bg-emerald-500/[0.03]">
            <div className="text-emerald-400 font-bold font-heading text-4xl mb-2 font-mono">BI</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">Decision Support</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <GlassCard className="flex items-start gap-6 border-l border-emerald-500/50">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg"><Map size={22}/></div>
          <div>
            <h4 className="text-white font-bold mb-2 uppercase tracking-wide font-heading text-sm">Global Threat Synthesis</h4>
            <p className="text-sm text-slate-400 leading-relaxed">Identifying geopolitical threats via global threat maps and analyzing potential market impacts.</p>
          </div>
        </GlassCard>
        <GlassCard className="flex items-start gap-6 border-l border-emerald-500/50">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg"><Zap size={22}/></div>
          <div>
            <h4 className="text-white font-bold mb-2 uppercase tracking-wide font-heading text-sm">Web3 & DeFi Focus</h4>
            <p className="text-sm text-slate-400 leading-relaxed">Actively studying decentralized finance protocols and prediction markets to leverage emerging liquidity trends.</p>
          </div>
        </GlassCard>
      </div>
    </div>
  </section>
);

const DataLab = () => {
  const projects = [
    {
      title: "Prediction Markets",
      stack: "Polymarket • Welch's T • Python",
      desc: "A quantitative study on the efficiency of Polymarket for institutional risk management. Proved the market's rapid information processing through 2024 election cycles.",
      icon: <BarChart3 className="text-emerald-400" />
    },
    {
      title: "Blockchain Insurance",
      stack: "Solidity • Polygon • Oracles",
      desc: "Designed decentralized insurance protocols to hedge against binary risks like fishery quota changes. Implemented secure settlement via optimistic oracles.",
      icon: <ShieldCheck className="text-emerald-400" />
    },
    {
      title: "Market Visualization",
      stack: "Tableau • Seattle AirBnB",
      desc: "Comprehensive market analysis and visualization of supply-side constraints and pricing dynamics in the Seattle rental sector.",
      icon: <Database className="text-emerald-400" />
    },
    {
      title: "SQL: Data Exploration",
      stack: "SQL Server • Window Functions",
      desc: "ETL processing of multi-million record datasets to identify correlations between health trends and economic volatility.",
      icon: <Cpu className="text-emerald-400" />
    }
  ];

  return (
    <section className="py-40 px-8 md:px-24" id="lab">
      <SectionHeading icon={Database}>Project Lab</SectionHeading>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project, idx) => (
          <GlassCard key={idx} className="group flex flex-col justify-between h-full">
            <div>
              <div className="mb-8 p-4 bg-emerald-500/5 rounded-xl w-fit group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300">
                {React.cloneElement(project.icon, { size: 24 })}
              </div>
              <h3 className="text-lg font-bold text-white mb-3 font-heading uppercase tracking-tight">
                {project.title}
              </h3>
              <p className="text-emerald-400 text-[10px] font-mono mb-5 uppercase tracking-widest">{project.stack}</p>
              <p className="text-slate-400 text-xs leading-relaxed mb-10 font-light">
                {project.desc}
              </p>
            </div>
            <div className="flex items-center text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform cursor-pointer">
              Review Details <ChevronRight size={12} className="ml-1" />
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

const Timeline = () => {
  const items = [
    {
      period: "2023 — 2026",
      title: "Chief Executive Officer",
      org: "CIN CIN ehf.",
      desc: "Architected data-driven inventory models and Power BI frameworks for international trade and supply chain stability."
    },
    {
      period: "2022 — 2023",
      title: "Marketing Representative",
      org: "Tíu Vín",
      desc: "Audience segmentation and digital ROI analytics utilizing integrated Power BI and Google Analytics suites."
    },
    {
      period: "2021",
      title: "Assistant to the Marketing Manager",
      org: "Deloitte",
      desc: "Sector trend analysis and preparation of strategic materials for executive-level market reporting."
    },
    {
      period: "2026",
      title: "BSc Business (BI Emphasis)",
      org: "University of Bifröst",
      desc: "Thesis: Evaluation of Decentralized Prediction Markets for Institutional Information Gathering and Global Risk Management."
    }
  ];

  return (
    <section className="py-40 px-8 md:px-24 bg-slate-900/10" id="path">
      <SectionHeading icon={Briefcase}>Professional Path</SectionHeading>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        {items.map((item, idx) => (
          <div key={idx} className="relative pl-10 border-l border-white/5">
            <div className="absolute left-[-1px] top-0 w-[2px] h-full bg-gradient-to-b from-emerald-500 via-transparent to-transparent opacity-40"></div>
            <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
            <span className="text-emerald-500 font-mono text-[10px] uppercase tracking-widest mb-3 block">{item.period}</span>
            <h3 className="text-xl font-bold text-white mb-1 font-heading uppercase tracking-tighter">{item.title}</h3>
            <p className="text-slate-400 text-xs font-semibold mb-4 font-mono">{item.org}</p>
            <p className="text-slate-500 text-xs leading-relaxed font-light">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const SkillCloud = () => {
  const categories = [
    { title: "Technical Stack", skills: ["SQL Server", "Power BI", "Tableau", "Python", "Quadratic"] },
    { title: "Web3 / DeFi", skills: ["Prediction Markets", "Smart Contracts", "Polygon", "Liquidity Analysis"] },
    { title: "Strategic", skills: ["Risk Modeling", "Market Analysis", "Strategic Forecasting"] }
  ];

  return (
    <section className="py-40 px-8 md:px-24">
      <SectionHeading icon={Award}>Core Competencies</SectionHeading>
      <div className="grid md:grid-cols-3 gap-16">
        {categories.map((cat, i) => (
          <div key={i}>
            <h4 className="text-emerald-500 text-[10px] font-mono font-bold uppercase tracking-widest mb-8 opacity-60">{cat.title}</h4>
            <div className="flex flex-wrap gap-3">
              {cat.skills.map((skill, j) => (
                <span key={j} className="px-5 py-2.5 bg-emerald-500/[0.02] border border-white/5 text-slate-300 text-[11px] font-mono hover:border-emerald-500/40 hover:text-white transition-all cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-24 px-8 md:px-24 border-t border-white/5 bg-black">
    <div className="flex flex-col md:flex-row justify-between items-center gap-16">
      <div>
        <h2 className="text-2xl font-bold text-white mb-3 font-heading uppercase tracking-tighter">Höskuldur Jónsson</h2>
        <p className="text-slate-600 text-[10px] tracking-widest uppercase font-mono">hoskuldur.me • Quantitative Excellence</p>
      </div>
      
      <div className="flex flex-col items-center md:items-end gap-8">
        <div className="flex gap-5">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/[0.03] rounded-lg text-slate-400 hover:bg-emerald-500 hover:text-black transition-all">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/[0.03] rounded-lg text-slate-400 hover:bg-emerald-500 hover:text-black transition-all">
            <Linkedin size={20} />
          </a>
          <a href="mailto:contact@hoskuldur.me" className="p-4 bg-white/[0.03] rounded-lg text-slate-400 hover:bg-emerald-500 hover:text-black transition-all">
            <Mail size={20} />
          </a>
        </div>
        <button 
          onClick={() => window.location.href = "mailto:contact@hoskuldur.me"}
          className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors font-mono"
        >
          contact@hoskuldur.me &rarr;
        </button>
      </div>
    </div>
    <div className="mt-24 pt-10 border-t border-white/5 text-center text-slate-800 text-[9px] uppercase tracking-widest font-mono">
      &copy; {new Date().getFullYear()} hoskuldur.me | Built with React & Three.js
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#020202] text-slate-300 selection:bg-emerald-500 selection:text-black font-sans overflow-x-hidden">
      <FontLoader />
      <div className="fixed inset-0 z-0">
        <StardustBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none" />
      </div>

      <main className="relative z-10">
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-24 py-9 bg-black/60 backdrop-blur-xl border-b border-white/5">
          <div className="text-lg font-bold tracking-tighter text-emerald-500 font-heading uppercase cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>hoskuldur.me</div>
          <div className="hidden md:flex gap-14 text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono">
            <button onClick={() => scrollTo('strategy')} className="hover:text-emerald-400 transition-colors uppercase">Strategy</button>
            <button onClick={() => scrollTo('lab')} className="hover:text-emerald-400 transition-colors uppercase">Lab</button>
            <button onClick={() => scrollTo('path')} className="hover:text-emerald-400 transition-colors uppercase">Path</button>
            <button onClick={() => window.location.href = "mailto:contact@hoskuldur.me"} className="text-emerald-500 opacity-80 hover:opacity-100 transition-opacity underline underline-offset-8 uppercase">Contact Me</button>
          </div>
        </nav>

        <Hero />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <ExecutivePerspective />
          <DataLab />
          <Timeline />
          <SkillCloud />
          <Footer />
        </motion.div>
      </main>

      {/* Atmospheric Accent Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 opacity-10">
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 -left-40 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[160px]" />
      </div>
    </div>
  );
}