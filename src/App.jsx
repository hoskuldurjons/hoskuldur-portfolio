import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Database, 
  Briefcase, 
  GraduationCap, 
  ChevronRight, 
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
 * --- REVISION LOG ---
 * - Fixed lucide-react brand icon export issues using custom SVG components.
 * - Optimized stardust background for performance.
 * - Integrated smooth scroll and contact navigation.
 */

// Custom SVG Icons to bypass lucide-react brand errors
const GithubIcon = ({ size = 20, className = "" }) => (
  <svg 
    width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" 
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20, className = "" }) => (
  <svg 
    width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" 
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

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

const createCircleTexture = () => {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.beginPath(); ctx.arc(32, 32, 32, 0, 2 * Math.PI); ctx.fill();
  return new THREE.CanvasTexture(canvas);
};

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

    const count = 1200;
    const pos = new Float32Array(count * 3);
    const vels = new Float32Array(count * 3);
    const noise = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      vels[i * 3] = (Math.random() - 0.5) * 0.003;
      vels[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vels[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
      noise[i] = Math.random() * Math.PI * 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.05, map: createCircleTexture(), color: 0x10b981,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.4, sizeAttenuation: true
    });
    const mesh = new THREE.Points(geo, mat);
    scene.add(mesh);

    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);

    const clock = new THREE.Clock();
    let rid;
    const animate = () => {
      const time = clock.getElapsedTime();
      const p = geo.attributes.position;
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        p.array[idx] += vels[idx] + Math.sin(time * 0.1 + noise[i]) * 0.001;
        p.array[idx + 1] += vels[idx + 1] + Math.cos(time * 0.1 + noise[i]) * 0.001;
        if (Math.abs(p.array[idx]) > 10) p.array[idx] *= -0.9;
        if (Math.abs(p.array[idx+1]) > 10) p.array[idx+1] *= -0.9;
      }
      p.needsUpdate = true;
      mesh.rotation.y = time * 0.005;
      mesh.position.x += (mouse.current.x * 0.2 - mesh.position.x) * 0.02;
      mesh.position.y += (mouse.current.y * 0.2 - mesh.position.y) * 0.02;
      renderer.render(scene, camera);
      rid = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rid);
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
      geo.dispose(); mat.dispose();
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
  if (element) element.scrollIntoView({ behavior: 'smooth' });
};

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

        {/* Hero Section */}
        <section className="relative h-screen flex flex-col justify-center items-start px-8 md:px-24 z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-[1px] bg-emerald-500"></div>
              <span className="text-emerald-400 font-mono tracking-widest uppercase text-xs">Strategic Data Intelligence</span>
            </div>
            <h1 className="text-7xl md:text-[110px] font-bold text-white leading-none mb-10 font-heading tracking-tighter">
              Höskuldur <br/> <span className="text-emerald-500">Jónsson</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed mb-14 font-light">
              Business Intelligence Specialist and Independent Capital Investor. Using 
              <span className="text-emerald-400 font-mono px-2">Data-Driven Modeling</span> to identify global risk and market opportunity.
            </p>
            <div className="flex flex-wrap gap-5">
              <button onClick={() => scrollTo('lab')} className="px-10 py-5 bg-emerald-500 text-slate-950 font-bold rounded-lg flex items-center gap-3 shadow-lg shadow-emerald-500/20 uppercase tracking-widest text-xs font-heading">
                Explore Projects <ChevronRight size={18} />
              </button>
              <button onClick={() => window.location.href = "mailto:contact@hoskuldur.me"} className="px-10 py-5 border border-white/10 text-white font-bold rounded-lg uppercase tracking-widest text-xs transition-all font-heading hover:bg-white/5">
                Contact Me
              </button>
            </div>
          </motion.div>
        </section>

        {/* Analysis Section */}
        <section className="py-40 px-8 md:px-24 bg-black/60 relative" id="strategy">
          <SectionHeading icon={TrendingUp}>Market & Risk Analysis</SectionHeading>
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 text-slate-300 text-lg leading-relaxed font-light">
              <p>I manage personal capital with a focus on risk mitigation and long-term positioning. My methodology blends BI tools with real-time market data to identify global shifts.</p>
              <p>I utilize specialized threat maps and decentralized prediction platforms to analyze volatility across diverse sectors, grounded in quantitative rigor.</p>
              <div className="grid grid-cols-2 gap-8 mt-14">
                <div className="p-8 border border-white/5 rounded-xl bg-emerald-500/[0.03]">
                  <div className="text-emerald-400 font-bold font-heading text-4xl mb-2 font-mono">RISK</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold text-center">Personal Portfolio</div>
                </div>
                <div className="p-8 border border-white/5 rounded-xl bg-emerald-500/[0.03]">
                  <div className="text-emerald-400 font-bold font-heading text-4xl mb-2 font-mono">BI</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold text-center">Decision Support</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8">
              <GlassCard className="flex items-start gap-6 border-l border-emerald-500/50">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg"><Map size={22}/></div>
                <div>
                  <h4 className="text-white font-bold mb-2 uppercase tracking-wide font-heading text-sm">Global Threat Synthesis</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Identifying geopolitical threats via global threat maps and analyzing market impacts.</p>
                </div>
              </GlassCard>
              <GlassCard className="flex items-start gap-6 border-l border-emerald-500/50">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg"><Zap size={22}/></div>
                <div>
                  <h4 className="text-white font-bold mb-2 uppercase tracking-wide font-heading text-sm">Web3 & DeFi Focus</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Actively studying decentralized finance protocols and prediction markets.</p>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Project Lab */}
        <section className="py-40 px-8 md:px-24" id="lab">
          <SectionHeading icon={Database}>Project Lab</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Prediction Markets", stack: "Polymarket • Welch's T • Python", desc: "Quantitative study on Polymarket efficiency and rapid info processing.", icon: <BarChart3 /> },
              { title: "Blockchain Insurance", stack: "Solidity • Polygon • Oracles", desc: "Decentralized insurance protocols designed to hedge binary risks.", icon: <ShieldCheck /> },
              { title: "Market Visualization", stack: "Tableau • Seattle AirBnB", desc: "Analysis of supply-side constraints in the Seattle rental sector.", icon: <Database /> },
              { title: "SQL Data Exploration", stack: "SQL Server • Window Functions", desc: "ETL processing of million-record health and economic datasets.", icon: <Cpu /> }
            ].map((p, i) => (
              <GlassCard key={i} className="group flex flex-col justify-between h-full">
                <div>
                  <div className="mb-8 p-4 bg-emerald-500/5 rounded-xl w-fit group-hover:bg-emerald-500 group-hover:text-black transition-all">
                    {React.cloneElement(p.icon, { size: 24, className: "text-emerald-400 group-hover:text-black" })}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 font-heading uppercase tracking-tight">{p.title}</h3>
                  <p className="text-emerald-400 text-[10px] font-mono mb-5 uppercase tracking-widest">{p.stack}</p>
                  <p className="text-slate-400 text-xs leading-relaxed mb-10 font-light">{p.desc}</p>
                </div>
                <div className="flex items-center text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform cursor-pointer">
                  Review Details <ChevronRight size={12} className="ml-1" />
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Path Section */}
        <section className="py-40 px-8 md:px-24 bg-slate-900/10" id="path">
          <SectionHeading icon={Briefcase}>Professional Path</SectionHeading>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
            {[
              { period: "2023 — 2026", title: "Chief Executive Officer", org: "CIN CIN ehf.", desc: "Architected inventory models and Power BI frameworks for trade stability." },
              { period: "2022 — 2023", title: "Marketing Representative", org: "Tíu Vín", desc: "Digital ROI analytics utilizing Power BI and Google Analytics suites." },
              { period: "2021", title: "Assistant to Marketing Manager", org: "Deloitte", desc: "Sector trend analysis and strategic material prep for executive reporting." },
              { period: "2026", title: "BSc Business (BI Emphasis)", org: "University of Bifröst", desc: "Thesis: Evaluation of Decentralized Prediction Markets for Institutional Risk." }
            ].map((item, idx) => (
              <div key={idx} className="relative pl-10 border-l border-white/5">
                <div className="absolute left-[-1px] top-0 w-[2px] h-full bg-gradient-to-b from-emerald-500 to-transparent opacity-40"></div>
                <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                <span className="text-emerald-500 font-mono text-[10px] uppercase tracking-widest mb-3 block">{item.period}</span>
                <h3 className="text-xl font-bold text-white mb-1 font-heading uppercase tracking-tighter">{item.title}</h3>
                <p className="text-slate-400 text-xs font-semibold mb-4 font-mono">{item.org}</p>
                <p className="text-slate-500 text-xs leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-24 px-8 md:px-24 border-t border-white/5 bg-black">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16">
            <div>
              <h2 className="text-2xl font-bold text-white mb-3 font-heading uppercase tracking-tighter">Höskuldur Jónsson</h2>
              <p className="text-slate-600 text-[10px] tracking-widest uppercase font-mono">hoskuldur.me • Quantitative Excellence</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-8">
              <div className="flex gap-5">
                <a href="https://github.com/hoskuldurjons" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/[0.03] rounded-lg text-slate-400 hover:bg-emerald-500 hover:text-black transition-all"><GithubIcon size={20} /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/[0.03] rounded-lg text-slate-400 hover:bg-emerald-500 hover:text-black transition-all"><LinkedinIcon size={20} /></a>
                <a href="mailto:contact@hoskuldur.me" className="p-4 bg-white/[0.03] rounded-lg text-slate-400 hover:bg-emerald-500 hover:text-black transition-all"><Mail size={20} /></a>
              </div>
              <button onClick={() => window.location.href = "mailto:contact@hoskuldur.me"} className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest hover:text-white font-mono">contact@hoskuldur.me &rarr;</button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 opacity-10">
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 -left-40 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[160px]" />
      </div>
    </div>
  );
}