import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
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
  Map,
  X,
  Send,
  Copy,
  Check,
  AlertCircle,
  FileText,
  Terminal,
  Layers
} from 'lucide-react';

/**
 * --- FINAL PRODUCTION BUILD ---
 * - Project Lab: Blockchain Insurance text refined (removed "group").
 * - Formspree ID: xaqvokea (Active).
 * - Stardust specks: 0.5 opacity (+20% brightness).
 * - Favicon: Custom White/Green "HJ" SVG.
 * - Text Layout: Professional titles moved to Analysis section.
 */

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
      body { 
        font-family: 'Inter', sans-serif; 
        scroll-behavior: smooth; 
        background-color: #020202; 
        margin: 0;
      }
      * { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
      input, textarea {
        background: rgba(255, 255, 255, 0.03) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        color: white !important;
      }
      input.error, textarea.error {
        border-color: #ef4444 !important;
      }
      input:focus, textarea:focus {
        border-color: #10b981 !important;
        outline: none !important;
        box-shadow: 0 0 0 1px rgba(16, 185, 129, 0.2);
      }
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
      size: 0.05, 
      map: createCircleTexture(), 
      color: 0x10b981,
      transparent: true, 
      blending: THREE.AdditiveBlending, 
      depthWrite: false, 
      opacity: 0.5, 
      sizeAttenuation: true
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

const NavLink = ({ children, onClick, isContact = false }) => (
  <button
    onClick={onClick}
    className={`relative px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 group
      ${isContact ? 'text-emerald-500' : 'text-slate-500 hover:text-emerald-400'}`}
  >
    <span className="relative z-10">{children}</span>
    <span className={`absolute inset-0 border rounded-full scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 
      ${isContact ? 'border-emerald-500/40' : 'border-emerald-500/30'}`} 
    />
  </button>
);

// Detail Modal for Project Lab Items
const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-6"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-950 border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
        >
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 text-slate-500 hover:text-white transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-emerald-500/10 rounded-xl text-emerald-400">
                {React.cloneElement(project.icon, { size: 28 })}
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.2em] mb-1 block">{project.stack}</span>
                <h3 className="text-3xl font-bold text-white font-heading uppercase tracking-tight">{project.title}</h3>
              </div>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed font-light">
              <p className="text-lg">{project.longDesc}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div className="flex items-center gap-2 mb-3 text-emerald-400">
                    <Terminal size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest font-mono">Methodology</span>
                  </div>
                  <p className="text-sm text-slate-400">{project.methodology}</p>
                </div>
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div className="flex items-center gap-2 mb-3 text-emerald-400">
                    <Layers size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest font-mono">Key Insight</span>
                  </div>
                  <p className="text-sm text-slate-400">{project.insight}</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              {project.hasThesis && (
                <button 
                  onClick={() => window.open(project.thesisLink || "/prediction-markets-thesis.pdf", "_blank")}
                  className="flex-1 bg-emerald-500 text-black font-bold p-4 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all uppercase text-xs tracking-widest font-heading"
                >
                  Review Thesis Paper <FileText size={16} />
                </button>
              )}
              <button onClick={onClose} className="px-8 border border-white/10 text-white font-bold rounded-xl uppercase text-xs tracking-widest font-heading hover:bg-white/5 transition-all">
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const formspreeId = "xaqvokea"; 

  const validate = () => {
    let newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = "Please use letters only (no symbols/numbers)";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid format (needs @ and domain ending)";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCopy = () => {
    const email = "contact@hoskuldur.me";
    const el = document.createElement('textarea');
    el.value = email;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSending(true);

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSent(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setIsSent(false);
          onClose();
        }, 2500);
      } else {
        setErrors({ general: "Submission failed. Please use the copy-email option below." });
      }
    } catch (err) {
      setErrors({ general: "Network error. Please use the copy-email option below." });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[101] p-6"
          >
            <div className="bg-slate-950 border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <button 
                onClick={onClose}
                className="absolute right-6 top-6 text-slate-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <AnimatePresence mode="wait">
                {!isSent ? (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    <SectionLabel>Inquiry Portal</SectionLabel>
                    <h3 className="text-2xl font-bold text-white mb-6 font-heading uppercase tracking-tight">Direct Transmission</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <input 
                            required 
                            type="text" 
                            placeholder="Name" 
                            className={`p-3 rounded-lg text-sm w-full ${errors.name ? 'error' : ''}`}
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                          {errors.name && <p className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.name}</p>}
                        </div>
                        <div className="space-y-1">
                          <input 
                            required 
                            type="text" 
                            placeholder="Email" 
                            className={`p-3 rounded-lg text-sm w-full ${errors.email ? 'error' : ''}`}
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                          {errors.email && <p className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.email}</p>}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <textarea 
                          required 
                          placeholder="Project details or inquiry..." 
                          rows={4} 
                          className={`p-3 rounded-lg text-sm w-full resize-none ${errors.message ? 'error' : ''}`}
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                        {errors.message && <p className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.message}</p>}
                      </div>
                      {errors.general && <p className="text-xs text-red-500 mb-4">{errors.general}</p>}
                      
                      <button 
                        disabled={isSending}
                        type="submit" 
                        className="w-full bg-emerald-500 text-black font-bold p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-400 transition-colors uppercase text-xs tracking-widest font-heading disabled:opacity-50"
                      >
                        {isSending ? 'Transmitting...' : 'Send Message'} <Send size={14} />
                      </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-3">Fallback</p>
                      <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg border border-white/5 group">
                        <span className="text-xs font-mono text-emerald-500">contact@hoskuldur.me</span>
                        <button onClick={handleCopy} className="text-slate-500 hover:text-white flex items-center gap-2 text-[10px] uppercase font-bold tracking-tighter">
                          {isCopied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                          {isCopied ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check size={32} className="text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 font-heading uppercase tracking-tight">Transmission Received</h3>
                    <p className="text-slate-400 text-sm font-light">Your inquiry has been successfully routed to my inbox.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-2">
    <div className="w-10 h-[1px] bg-emerald-500"></div>
    <span className="text-emerald-400 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
      {children}
    </span>
  </div>
);

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    { 
      title: "Prediction Markets", 
      stack: "Polymarket • Welch's T • Python", 
      desc: "Quantitative event study evaluating the utility of decentralized prediction markets for institutional risk management.", 
      longDesc: "A quantitative analysis evaluating decentralized prediction markets as legitimate institutional information infrastructures. The research analyzed 2024 US Presidential Election data on Polymarket to assess real-time price discovery and information finance in the Icelandic economy.",
      methodology: "Conducted a quantitative event study using Python and Pandas to analyze hourly market-implied probabilities. Applied 24-hour rolling volatility calculations and Welch's t-tests to measure price discovery.",
      insight: "Prediction markets efficiently process new information and facilitate active price discovery where uncertainty is highest, serving as highly accurate tools for businesses to hedge against binary risks.",
      icon: <BarChart3 />,
      hasThesis: true,
      thesisLink: "/prediction-markets-thesis.pdf"
    },
    { 
      title: "Blockchain Insurance", 
      stack: "Meta-Analysis • DeFi • Smart Contracts", 
      desc: "Academic analysis on the emergence of decentralized finance (DeFi) and its disruptive impact on traditional insurance markets.", 
      longDesc: "A comprehensive project exploring how decentralized finance and blockchain technology are redefining risk management. The project evaluates the shift from traditional, centralized insurance models to automated, smart-contract-based solutions (such as parametric crop and micromobility insurance).",
      methodology: "Executed a meta-analysis of four major quantitative studies (NYDIG, Deloitte, Quinnipiac, Intertrust) comparing executive sentiment with adoption. Included a targeted SWOT analysis for Icelandic firms.",
      insight: "Decentralized protocols can bypass traditional administrative bottlenecks, reduce costs, and capture untouched \"blue ocean\" markets through democratized, trustless smart contracts.",
      icon: <ShieldCheck />,
      hasThesis: false
    },
    { 
      title: "Market Visualization", 
      stack: "Tableau • Seattle AirBnB", 
      desc: "Analysis of supply-side constraints in the Seattle rental sector.", 
      longDesc: "A comprehensive Business Intelligence project visualizing the correlation between zoning laws, supply-side constraints, and dynamic pricing in the high-growth Seattle short-term rental market.",
      methodology: "Integrated multi-source datasets into Tableau to create heatmaps and pricing volatility dashboards for institutional real estate investors.",
      insight: "Identified a persistent 12% price premium in neighborhoods with high density of supply-side regulatory friction.",
      icon: <Database />,
      hasThesis: false
    },
    { 
      title: "SQL Data Exploration", 
      stack: "SQL Server • Window Functions", 
      desc: "ETL processing of million-record health and economic datasets.", 
      longDesc: "Advanced ETL processing and data exploration of massive datasets to identify non-obvious correlations between regional health trends and localized economic volatility.",
      methodology: "Designed complex SQL queries utilizing Window Functions and Common Table Expressions (CTEs) to process over 2 million records across distributed servers.",
      insight: "High-variance health spending patterns consistently served as a leading indicator for local labor market contraction.",
      icon: <Cpu />,
      hasThesis: false
    }
  ];

  // Favicon Injection Logic
  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
        <text y='24' x='0' font-family='Arial, sans-serif' font-weight='900' font-size='22' fill='white'>H</text>
        <text y='24' x='15' font-family='Arial, sans-serif' font-weight='900' font-size='22' fill='#10b981'>J</text>
      </svg>
    `.trim();
    
    if (favicon) {
      favicon.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
    } else {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-slate-300 selection:bg-emerald-500 selection:text-black font-sans overflow-x-hidden">
      <FontLoader />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      
      <div className="fixed inset-0 z-0">
        <StardustBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none" />
      </div>

      <main className="relative z-10">
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-24 py-9 bg-black/60 backdrop-blur-xl border-b border-white/5">
          <div 
            className="text-lg font-bold tracking-tighter text-emerald-500 font-heading uppercase cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            hoskuldur.me
          </div>
          <div className="hidden md:flex gap-2 items-center font-mono">
            <NavLink onClick={() => scrollTo('strategy')}>Strategy</NavLink>
            <NavLink onClick={() => scrollTo('lab')}>Lab</NavLink>
            <NavLink onClick={() => scrollTo('path')}>Path</NavLink>
            <NavLink 
              onClick={() => setIsContactOpen(true)} 
              isContact={true}
            >
              Contact Me
            </NavLink>
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
              Using <span className="text-emerald-400 font-mono px-2">Data-Driven Modeling</span> to identify global risk and market opportunity.
            </p>
            <div className="flex flex-wrap gap-5">
              <button onClick={() => scrollTo('lab')} className="px-10 py-5 bg-emerald-500 text-slate-950 font-bold rounded-lg flex items-center gap-3 shadow-lg shadow-emerald-500/20 uppercase tracking-widest text-xs font-heading">
                Explore Projects <ChevronRight size={18} />
              </button>
              <button onClick={() => setIsContactOpen(true)} className="px-10 py-5 border border-white/10 text-white font-bold rounded-lg uppercase tracking-widest text-xs transition-all font-heading hover:bg-white/5">
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
              <p>As a <span className="text-emerald-400 font-bold">Business Intelligence Specialist and Independent Capital Investor</span>, I manage personal capital with a focus on risk mitigation and long-term positioning. My methodology blends BI tools with real-time market data to identify global shifts.</p>
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
            {projects.map((p, i) => (
              <GlassCard key={i} className="group flex flex-col justify-between h-full">
                <div>
                  <div className="mb-8 p-4 bg-emerald-500/5 rounded-xl w-fit group-hover:bg-emerald-500 group-hover:text-black transition-all">
                    {React.cloneElement(p.icon, { size: 24, className: "text-emerald-400 group-hover:text-black" })}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 font-heading uppercase tracking-tight">{p.title}</h3>
                  <p className="text-emerald-400 text-[10px] font-mono mb-5 uppercase tracking-widest">{p.stack}</p>
                  <p className="text-slate-400 text-xs leading-relaxed mb-10 font-light">{p.desc}</p>
                </div>
                <div 
                  onClick={() => setSelectedProject(p)}
                  className="flex items-center text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform cursor-pointer"
                >
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
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setIsContactOpen(true); }}
                  className="p-4 bg-white/[0.03] rounded-lg text-slate-400 hover:bg-emerald-500 hover:text-black transition-all"
                >
                  <Mail size={20} />
                </a>
              </div>
              <button 
                onClick={() => setIsContactOpen(true)} 
                className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest hover:text-white font-mono"
              >
                contact@hoskuldur.me &rarr;
              </button>
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