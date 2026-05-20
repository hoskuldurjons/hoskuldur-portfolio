import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import PredictionTerminal from './components/PredictionTerminal.jsx';
import AnalysisWorkspace from './components/AnalysisWorkspace.jsx';
import { 
  Database, 
  Briefcase, 
  ChevronRight, 
  Mail, 
  TrendingUp,
  ShieldCheck,
  Cpu, 
  BarChart3,
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
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

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

    const startTime = performance.now();
    let rid;
    const animate = () => {
      const time = (performance.now() - startTime) / 1000;
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
      if (container) container.removeChild(renderer.domElement);
      geo.dispose(); mat.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
};

const GlassCard = ({ children, className = "", ...props }) => (
  <motion.div
    whileHover={{ y: -6, boxShadow: "0 15px 30px rgba(16, 185, 129, 0.12)" }}
    className={`bg-slate-950/40 backdrop-blur-2xl border border-white/5 rounded-xl p-7 transition-all duration-500 ${className}`}
    {...props}
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
const ProjectDetailModal = ({ project, onClose, isEnglish }) => {
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
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.2em] block">{project.stack}</span>
                  {project.academicTier && (
                    <span className="px-2 py-0.5 border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 rounded text-[8px] font-mono font-bold uppercase tracking-wider">
                      BSc THESIS PAPER
                    </span>
                  )}
                </div>
                <h3 className="text-3xl font-bold text-white font-heading uppercase tracking-tight">{project.title}</h3>
              </div>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed font-light">
              <p className="text-lg">{project.longDesc}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div className="flex items-center gap-2 mb-3 text-emerald-400">
                    <Terminal size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest font-mono">
                      {isEnglish ? "Methodology" : "Aðferðafræði"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{project.methodology}</p>
                </div>
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div className="flex items-center gap-2 mb-3 text-emerald-400">
                    <Layers size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest font-mono">
                      {isEnglish ? "Key Insight" : "Meginniðurstaða"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{project.insight}</p>
                </div>
              </div>

              {/* Enriched BSc Thesis Quantitative Metrics Callout Box */}
              {project.hasThesis && (
                <div className="p-6 bg-emerald-500/[0.02] border border-emerald-500/10 rounded-xl mt-6">
                  <div className="flex items-center gap-2 mb-4 text-emerald-400">
                    <BarChart3 size={16} className="animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest font-mono">
                      {isEnglish ? "Thesis Quantitative Metrics" : "Mælikvarðar rannsóknarinnar"}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-center">
                    <div className="p-3 bg-slate-900/60 rounded-lg border border-white/5">
                      <span className="text-[9px] text-slate-500 block mb-1 uppercase tracking-wider">Brier Score</span>
                      <span className="text-white font-bold text-sm">0.142 (Optimal)</span>
                    </div>
                    <div className="p-3 bg-slate-900/60 rounded-lg border border-white/5">
                      <span className="text-[9px] text-slate-500 block mb-1 uppercase tracking-wider">Welch's T-Test</span>
                      <span className="text-white font-bold text-sm">p &lt; 0.01 (Sig)</span>
                    </div>
                    <div className="p-3 bg-slate-900/60 rounded-lg border border-white/5">
                      <span className="text-[9px] text-slate-500 block mb-1 uppercase tracking-wider">Latency Limit</span>
                      <span className="text-white font-bold text-sm">&lt; 3.6 Hours</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 font-light mt-4 leading-relaxed">
                    {isEnglish 
                      ? "Executive Summary: Rigorous testing confirms predictive calibration with a Brier Score of 0.142. Welch's t-tests establish high statistical significance (p < 0.01) between market implied probabilities and eventual outcomes, proving real-time macro information processing capabilities."
                      : "Samantekt: Nákvæmar mælingar staðfesta spágildi með Brier Score upp á 0,142. Welch's t-próf sýna fram á mikla tölfræðilega marktækni (p < 0,01) á milli markaðslíkna og raunverulegra útkoma, sem sannar virkni í rauntíma upplýsingaöflun."}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-12 flex gap-4">
              {project.hasThesis && (
                <button 
                  onClick={() => window.open(project.thesisLink || "/prediction-markets-thesis.pdf", "_blank")}
                  className="flex-1 bg-emerald-500 text-black font-bold p-4 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all uppercase text-xs tracking-widest font-heading"
                >
                  {isEnglish ? "View Research" : "Skoða rannsókn"} <FileText size={16} />
                </button>
              )}
              <button onClick={onClose} className="px-8 border border-white/10 text-white font-bold rounded-xl uppercase text-xs tracking-widest font-heading hover:bg-white/5 transition-all">
                {isEnglish ? "Close" : "Loka"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ContactModal = ({ isOpen, onClose, isEnglish }) => {
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
      newErrors.name = isEnglish ? "Name is required" : "Nafn er nauðsynlegt";
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = isEnglish ? "Please use letters only" : "Vinsamlegast notaðu eingöngu bókstafi";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = isEnglish ? "Email is required" : "Netfang er nauðsynlegt";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = isEnglish ? "Invalid email format" : "Ógilt netfang";
    }

    if (!formData.message.trim()) {
      newErrors.message = isEnglish ? "Message cannot be empty" : "Skilaboð mega ekki vera auð";
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
        setErrors({ general: isEnglish ? "Submission failed. Please copy email directly." : "Sending mistókst. Vinsamlegast afritaðu netfangið." });
      }
    } catch {
      setErrors({ general: isEnglish ? "Network error. Please copy email directly." : "Nethindrun. Vinsamlegast afritaðu netfangið." });
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
                    <SectionLabel>{isEnglish ? "Inquiry Portal" : "Fyrirspurnagátt"}</SectionLabel>
                    <h3 className="text-2xl font-bold text-white mb-6 font-heading uppercase tracking-tight">{isEnglish ? "Direct Transmission" : "Bein sending"}</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <input 
                            required 
                            type="text" 
                            placeholder={isEnglish ? "Name" : "Nafn"} 
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
                            placeholder={isEnglish ? "Email" : "Netfang"} 
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
                          placeholder={isEnglish ? "Project details or inquiry..." : "Nánar um verkefnið eða fyrirspurn..."} 
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
                        {isSending 
                          ? (isEnglish ? 'Transmitting...' : 'Sendir...') 
                          : (isEnglish ? 'Send Message' : 'Senda skilaboð')} <Send size={14} />
                      </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-3">{isEnglish ? "Fallback" : "Vara-leið"}</p>
                      <div className="flex items-center justify-between p-3 bg-white/[0.02] rounded-lg border border-white/5 group">
                        <span className="text-xs font-mono text-emerald-500">contact@hoskuldur.me</span>
                        <button onClick={handleCopy} className="text-slate-500 hover:text-white flex items-center gap-2 text-[10px] uppercase font-bold tracking-tighter">
                          {isCopied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                          {isCopied ? (isEnglish ? 'Copied' : 'Afritað') : (isEnglish ? 'Copy' : 'Afrita')}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="py-12 text-center"
                  >
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 120 }}
                      className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Check size={32} className="text-emerald-500" />
                    </motion.div>
                    <motion.h3 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.25 }}
                      className="text-xl font-bold text-white mb-2 font-heading uppercase tracking-tight"
                    >
                      {isEnglish ? "Transmission Received" : "Sending móttekin"}
                    </motion.h3>
                    <motion.p 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.35 }}
                      className="text-slate-400 text-sm font-light px-6"
                    >
                      {isEnglish 
                        ? "Your inquiry has been successfully routed to my inbox." 
                        : "Fyrirspurn þín hefur verið send á netfangið mitt."}
                    </motion.p>
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

const TRANSLATIONS = {
  is: {
    navStefna: "Stefna",
    navSpamarkadur: "Spámarkaðir",
    navVerkefni: "Verkefni",
    navFerill: "Ferill",
    navContact: "Hafa Samband",
    heroLabel: "Strategísk gagnagreind",
    heroTitleFirst: "Höskuldur",
    heroTitleSecond: "Jónsson",
    heroSubtitle: "Notkun gagnadrifinnar líkanagerðar til að greina alþjóðlega áhættu og markaðstækifæri.",
    heroCTAProjects: "Skoða verkefni",
    heroCTAContact: "Hafa samband",
    analysisHeading: "Markaðs- og áhættugreining",
    analysisP1: "Hagnýting megindlegra aðferða til að greina samspil ólíkra markaðsþátta. Hér sýni ég dæmi um einfalt, gagnadrifið áhættulíkan (Macro Stress Index) sem safnar rauntíma vísbendingum úr þremur áttum—skuldabréfamörkuðum, hrávörum og spámörkuðum. Líkanið nýtir staðlaða vigtun og tölfræðilega samþættingu (Z-scores) til að gefa samsetta vísbendingu um þjóðhagslega óvissu.",
    scenarioActiveBadge: "SVIÐSMYND VIRK",
    scenario1Title: "1. PENINGALEG HERÐING",
    scenario1Desc: "Hröð hækkun stýrivaxta og samdráttur í lausafé til að vinna gegn verðbólgu.",
    scenario2Title: "2. FRAMBOÐSSKELLUR",
    scenario2Desc: "Skyndileg truflun á hrávöruflæði og hækkun aðfangaverðs á alþjóðavísu.",
    scenario3Title: "3. JARÐPÓLITÍSKUR HÁPUNKTUR",
    scenario3Desc: "Aukin alþjóðleg spenna sem keyrir upp óvissu á spámörkuðum og öruggum höfnum.",
    projectsHeading: "Verkefni",
    projectsMore: "Skoða nánar",
    ferillHeading: "Ferill",
    footerSub: "hoskuldur.me • Gagnadrifin nákvæmni",
    footerCTA: "contact@hoskuldur.me →"
  },
  en: {
    navStefna: "Methodology",
    navSpamarkadur: "Prediction Terminal",
    navVerkefni: "Projects",
    navFerill: "Career Path",
    navContact: "Contact Me",
    heroLabel: "Strategic Data Intelligence",
    heroTitleFirst: "Höskuldur",
    heroTitleSecond: "Jónsson",
    heroSubtitle: "Leveraging data-driven modeling to analyze global risks and market opportunities.",
    heroCTAProjects: "View Projects",
    heroCTAContact: "Contact Me",
    analysisHeading: "Market & Risk Analysis",
    analysisP1: "Applying quantitative methods to analyze the interplay between distinct market forces. This section showcases a prototype data-driven risk model (Macro Stress Index) that programmatically aggregates real-time indicators across sovereign debt, commodities, and prediction markets. By leveraging standard weighting and statistical normalization (Z-scores), the framework provides a composite proxy of macroeconomic volatility.",
    scenarioActiveBadge: "SCENARIO ACTIVE",
    scenario1Title: "1. MONETARY TIGHTENING",
    scenario1Desc: "Rapid interest rate hikes and liquidity contraction to combat stubborn inflation.",
    scenario2Title: "2. SUPPLY-SIDE SHOCK",
    scenario2Desc: "Sudden disruption in commodity flows driving up global input and logistics costs.",
    scenario3Title: "3. GEOPOLITICAL APEX",
    scenario3Desc: "Escalating international tensions driving extreme uncertainty and safe-haven flows.",
    projectsHeading: "Projects",
    projectsMore: "View Details",
    ferillHeading: "Career",
    footerSub: "hoskuldur.me • Data-Driven Precision",
    footerCTA: "contact@hoskuldur.me →"
  }
};

const getProjects = (isEnglish) => [
  { 
    title: isEnglish ? "Prediction Markets" : "Spámarkaðir", 
    stack: "Polymarket • Welch's T • Python", 
    desc: isEnglish 
      ? "Quantitative research evaluating the utility of decentralized prediction markets for corporate risk management."
      : "Megindleg greining sem leggur mat á notagildi dreifstýrðra spámarkaða fyrir áhættustýringu fyrirtækja.", 
    longDesc: isEnglish
      ? "Quantitative analysis evaluating decentralized prediction markets as institutional information infrastructure. The research analyzed 2024 US Presidential Election data on Polymarket to assess information processing efficiency and real-time price discovery."
      : "Megindleg greining sem leggur mat á dreifstýrða spámarkaði sem lögmæta upplýsingainnviði fyrir stofnanir. Rannsóknin greindi gögn úr forsetakosningum Bandaríkjanna 2024 á Polymarket til að meta upplýsingafjármögnun og rauntíma verðmyndun í íslensku hagkerfi.",
    methodology: isEnglish
      ? "Conducted quantitative research using Python and Pandas to analyze hourly price series and market probabilities. Applied 24-hour rolling volatility metrics and Welch's t-tests to measure price discovery speed."
      : "Framkvæmdi magnbundna rannsókn með Python og Pandas til að greina klukkustundarverð og markaðslíkur. Beitti 24-stunda flöktmælingum og Welch's t-prófum til að mæla verðmyndun.",
    insight: isEnglish
      ? "Prediction markets efficiently digest new information and facilitate price discovery under high uncertainty, making them highly accurate instruments for hedging binary risks."
      : "Spámarkaðir vinna úr nýjum upplýsingum á skilvirkan hátt og auðvelda verðmyndun þar sem óvissan er mest, sem gerir þá að nákvæmu tæki fyrir fyrirtæki til að verja sig gegn tvíundaráhættu.",
    icon: <BarChart3 />,
    hasThesis: true,
    thesisLink: "/prediction-markets-thesis.pdf",
    academicTier: "Bachelor of Science Thesis Paper"
  },
  { 
    title: isEnglish ? "Blockchain Insurance" : "Blockchain tryggingar", 
    stack: "Meta-Analysis • DeFi • Smart Contracts", 
    desc: isEnglish
      ? "Academic analysis of decentralized finance (DeFi) emergence and its disruptive impact on traditional insurance markets."
      : "Fræðileg greining á tilkomu dreifstýrðra fjármála (DeFi) og truflandi áhrifum þeirra á hefðbundna tryggingamarkaði.", 
    longDesc: isEnglish
      ? "A comprehensive meta-study exploring how decentralized finance and blockchain technology redefine risk management. It evaluates the shift from traditional centralized insurance models to autonomous smart-contract-driven solutions."
      : "Yfirgripsmikið verkefni sem kannar hvernig dreifstýrð fjármál og blockchain-tækni eru að endurskilgreina áhættustýringu. Verkefnið leggur mat á breytinguna frá hefðbundnum, miðstýrðum tryggingalíkönum yfir í sjálfvirkar lausnir byggðar á snjallsamningum.",
    methodology: isEnglish
      ? "Conducted a meta-analysis across four large-scale quantitative studies (NYDIG, Deloitte, Quinnipiac, Intertrust) comparing executive sentiment to real-world integration. Features a targeted SWOT analysis for Icelandic businesses."
      : "Framkvæmdi meta-greiningu á fjórum stórum megindlegum rannsóknum (NYDIG, Deloitte, Quinnipiac, Intertrust) sem bera saman viðhorf stjórnenda við raunverulega innleiðingu. Inniheldur sértæka SVÓT-greiningu fyrir íslensk fyrirtæki.",
    insight: isEnglish
      ? "Decentralized protocols bypass traditional administrative overhead, lowering costs and capturing untapped market segments through democratic smart contracts."
      : "Dreifstýrðar samskiptareglur geta farið fram hjá hefðbundnum stjórnsýsluhindrunum, lækkað kostnað og nýtt ósnortna markaði með lýðræðislegum snjallsamningum.",
    icon: <ShieldCheck />,
    hasThesis: false
  },
  { 
    title: isEnglish ? "Data Visualization" : "Myndræn framsetning", 
    stack: "Tableau • Seattle AirBnB", 
    desc: isEnglish
      ? "Analyzing the supply-side constraints and dynamics of the Seattle lodging market."
      : "Greining á framboðshlið og takmörkunum í gistigeiranum í Seattle.", 
    longDesc: isEnglish
      ? "A business intelligence project demonstrating the correlation between zoning regulations, supply limits, and dynamic pricing structures in the Seattle short-term rental market."
      : "Viðskiptagreindarverkefni sem sýnir fylgni milli deiliskipulags, framboðstakmarkana og dýnamískrar verðlagningar á skammtímaleigumarkaði í Seattle.",
    methodology: isEnglish
      ? "Integrated multiple datasets in Tableau to build granular heatmaps and interactive price volatility dashboards tailored for real estate investors."
      : "Samþætti mörg gagnasöfn í Tableau til að búa til hitakort og mælaborð fyrir verðsveiflur, ætlað fasteignafjárfestum.",
    insight: isEnglish
      ? "Identified a 12% price premium in neighborhoods where supply elasticity is highly constrained by local regulatory barriers."
      : "Greindi 12% verðálag í hverfum þar sem framboðshliðin mætir verulegum reglugerðarhindrunum.",
    icon: <Database />,
    hasThesis: false
  },
  { 
    title: isEnglish ? "SQL Data Engineering" : "SQL Gagnavinnsla", 
    stack: "SQL Server • Window Functions", 
    desc: isEnglish
      ? "ETL pipeline development for large-scale healthcare and macroeconomic datasets."
      : "ETL vinnsla á stórum heilbrigðis- og efnahagsgagnasöfnum.", 
    longDesc: isEnglish
      ? "Advanced ETL pipelines and exploratory data analysis on massive databases to identify correlations between regional public health trends and localized economic volatility."
      : "Háþróuð ETL vinnsla og gagna könnun á gríðarstórum gagnasöfnum til að greina fylgni milli svæðisbundinna heilbrigðisstrauma og staðbundins efnahagslegs óstöðugleika.",
    methodology: isEnglish
      ? "Designed complex SQL queries employing window functions, CTEs, and index tuning to process over 2 million records from a health sector database."
      : "Hannaði flóknar SQL fyrirspurnir með Window Functions og CTEs til að vinna yfir 2 milljónir færslna úr heilbrigðisgagnagrunni.",
    insight: isEnglish
      ? "Fluctuations in healthcare expenditures were identified as a statistically significant leading indicator of local job market contractions."
      : "Sveiflur í útgjöldum til heilbrigðismála reyndust vera leiðandi vísbending um samdrátt á staðbundnum vinnumarkaði.",
    icon: <Cpu />,
    hasThesis: false
  }
];

const getCareer = (isEnglish) => [
  { period: "2023 — 2026", title: isEnglish ? "Managing Director" : "Framkvæmdastjóri", org: "CIN CIN ehf.", desc: isEnglish ? "Designed inventory replenishment models and built interactive Power BI frameworks to support operational efficiency." : "Hannaði birgðalíkön og Power BI umgjörð fyrir rekstrarstöðugleika." },
  { period: "2022 — 2023", title: isEnglish ? "Operations and Marketing" : "Rekstur og markaðssetning", org: "Tíu Vín", desc: isEnglish ? "Analyzed digital marketing ROI, optimizing ad-spend through Power BI and custom Google Analytics attribution models." : "Arðsemisgreining stafrænnar markaðssetningar með Power BI og Google Analytics." },
  { period: "2021", title: isEnglish ? "Marketing Assistant" : "Aðstoðarmaður markaðsstjóra", org: "Deloitte", desc: isEnglish ? "Conducted macro market trend analysis and prepared briefs for executive leadership presentations." : "Greining á markaðsþróun og gerð stefnumótandi efnis fyrir stjórnendaskýrslur." },
  { period: "2026", title: isEnglish ? "BSc in Business with an emphasis on Business Intelligence" : "BSc í Viðskiptafræði með áherslu á viðskiptagreind", org: "Háskólinn á Bifröst", desc: isEnglish ? "Thesis: Evaluating the utility of prediction markets for institutional intelligence gathering and corporate risk management." : "Ritgerð: Greining á notagildi spámarkaða fyrir upplýsingaöflun stofnana og áhættustýringu." }
];

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isEnglish, setIsEnglish] = useState(false);

  // Lifted state variables for the Macro Stress Index sliders
  const [bondSpread, setBondSpread] = useState(1.8);
  const [commodityVol, setCommodityVol] = useState(28);
  const [polymarketSpread, setPolymarketSpread] = useState(45);
  const [activeScenario, setActiveScenario] = useState(null); // 'monetary' | 'supply' | 'geopolitical' | null

  const projects = getProjects(isEnglish);
  const careerExperiences = getCareer(isEnglish);
  const t = isEnglish ? TRANSLATIONS.en : TRANSLATIONS.is;

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
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} isEnglish={isEnglish} />
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} isEnglish={isEnglish} />
      
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
            <NavLink onClick={() => scrollTo('stefna')}>{t.navStefna}</NavLink>
            <NavLink onClick={() => scrollTo('spamarkadur')}>{t.navSpamarkadur}</NavLink>
            <NavLink onClick={() => scrollTo('verkefni')}>{t.navVerkefni}</NavLink>
            <NavLink onClick={() => scrollTo('ferill')}>{t.navFerill}</NavLink>
            
            {/* Minimalist Dual-Language Toggle Pill */}
            <button
              onClick={() => setIsEnglish(!isEnglish)}
              className="ml-2 mr-2 flex items-center bg-slate-900/50 hover:bg-slate-900 border border-white/5 hover:border-emerald-500/30 rounded-full p-0.5 font-mono text-[9px] relative transition-all duration-300"
            >
              <span className={`px-2.5 py-1 rounded-full uppercase tracking-wider font-bold transition-all duration-300 ${!isEnglish ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'text-slate-500'}`}>
                IS
              </span>
              <span className={`px-2.5 py-1 rounded-full uppercase tracking-wider font-bold transition-all duration-300 ${isEnglish ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'text-slate-500'}`}>
                EN
              </span>
            </button>

            <NavLink 
              onClick={() => setIsContactOpen(true)} 
              isContact={true}
            >
              {t.navContact}
            </NavLink>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-start px-8 md:px-24 z-10 pt-36 lg:pt-44 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 flex flex-col justify-center"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-[1px] bg-emerald-500"></div>
                <span className="text-emerald-400 font-mono tracking-widest uppercase text-xs">{t.heroLabel}</span>
              </div>
              <h1 className="text-7xl md:text-[110px] font-bold text-white leading-none mb-10 font-heading tracking-tighter">
                {t.heroTitleFirst} <br/> <span className="text-emerald-500">{t.heroTitleSecond}</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed mb-14 font-light">
                {t.heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-5">
                <button onClick={() => scrollTo('verkefni')} className="px-10 py-5 bg-emerald-500 text-slate-950 font-bold rounded-lg flex items-center gap-3 shadow-lg shadow-emerald-500/20 uppercase tracking-widest text-xs font-heading">
                  {t.heroCTAProjects} <ChevronRight size={18} />
                </button>
                <button onClick={() => setIsContactOpen(true)} className="px-10 py-5 border border-white/10 text-white font-bold rounded-lg uppercase tracking-widest text-xs transition-all font-heading hover:bg-white/5">
                  {t.heroCTAContact}
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7 w-full"
            >
              <PredictionTerminal isHeroMode={true} isEnglish={isEnglish} />
            </motion.div>
          </div>
        </section>

        {/* Analysis Section */}
        <section className="py-40 px-8 md:px-24 bg-black/60 relative" id="stefna">
          <SectionHeading icon={TrendingUp}>{t.analysisHeading}</SectionHeading>
          
          {/* Row 1 (Full Width Header & Narrative intro) */}
          <div className="w-full mb-12 max-w-6xl text-slate-300 text-lg leading-relaxed font-light">
            <p dangerouslySetInnerHTML={{ 
              __html: t.analysisP1
                .replace("Macro Stress Index", "<span class='text-emerald-400 font-bold'>Macro Stress Index</span>")
                .replace("Z-scores", "<span class='text-emerald-400 font-bold'>Z-scores</span>") 
            }} />
          </div>

          {/* Row 2 (Integrated Terminal Console) */}
          <div className="w-full max-w-6xl mx-auto">
            <AnalysisWorkspace 
              isEnglish={isEnglish}
              bondSpread={bondSpread}
              setBondSpread={setBondSpread}
              commodityVol={commodityVol}
              setCommodityVol={setCommodityVol}
              polymarketSpread={polymarketSpread}
              setPolymarketSpread={setPolymarketSpread}
              activeScenario={activeScenario}
              setActiveScenario={setActiveScenario}
              onSync={() => {
                setBondSpread(1.8);
                setCommodityVol(28);
                setPolymarketSpread(45);
                setActiveScenario(null);
              }}
              onSliderChange={() => setActiveScenario(null)}
            />
          </div>
        </section>

        {/* Project Lab */}
        <section className="py-40 px-8 md:px-24" id="verkefni">
          <SectionHeading icon={Database}>{t.projectsHeading}</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((p, i) => (
              <GlassCard 
                key={i} 
                onClick={() => setSelectedProject(p)} 
                className="cursor-pointer w-full text-left select-none group flex flex-col justify-between h-full"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(p);
                  }
                }}
              >
                <div>
                  <div className="mb-8 p-4 bg-emerald-500/5 rounded-xl w-fit group-hover:bg-emerald-500 group-hover:text-black transition-all">
                    {React.cloneElement(p.icon, { size: 24, className: "text-emerald-400 group-hover:text-black" })}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 font-heading uppercase tracking-tight">{p.title}</h3>
                  <p className="text-emerald-400 text-[10px] font-mono mb-5 uppercase tracking-widest">{p.stack}</p>
                  <p className="text-slate-400 text-xs leading-relaxed mb-10 font-light">{p.desc}</p>
                </div>
                <div className="flex items-center text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  {t.projectsMore} <ChevronRight size={12} className="ml-1" />
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Path Section */}
        <section className="py-40 px-8 md:px-24 bg-slate-900/10" id="ferill">
          <SectionHeading icon={Briefcase}>{t.ferillHeading}</SectionHeading>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
            {careerExperiences.map((item, idx) => (
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
              <p className="text-slate-600 text-[10px] tracking-widest uppercase font-mono">{t.footerSub}</p>
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
                {t.footerCTA}
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