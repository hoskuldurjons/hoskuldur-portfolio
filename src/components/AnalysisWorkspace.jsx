import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, Activity, Info, BookOpen, ShieldAlert, ChevronDown, ChevronUp, RefreshCw, TrendingUp, Zap, Terminal } from 'lucide-react';

const LOCAL_TRANSLATIONS = {
  is: {
    headerLabel: "Kerfisáhætta // Rauntímalíkön",
    title: "Macro Áhættuvísitala",
    subtitle: "Þriggja þátta gagnalíkan með vognuðum Z-stigum",
    gaugeLevelLow: "Lágt Álag // Öruggt Ástand",
    gaugeLevelMid: "Miðlungs Álag // Aðvörunarmerki",
    gaugeLevelHigh: "Hátt Álag // Kerfisbundin Kreppa",
    slidersHeader: "Áhættubreytur // Sviðsmyndagreining",
    bondLabel: "Skuldabréfaálag (Lánshæfi / Lausafé)",
    commLabel: "Hrávörusveiflur (Aðfangakostnaður)",
    polyLabel: "Polymarket Spámarkaðir (Markaðsviðhorf)",
    zScoreLabel: "Z-stig",
    detailsHeader: "Fræðileg Áhersla // Uppbygging Áhættuþátta",
    detailsInstruction: "Smelltu á áhættuþátt til að skoða fræðilega lýsingu",
    bondDesc: "Skuldabréfaálag (t.d. á milli áhættusamra og öruggra ríkisbréfa) endurspeglar greiðsluhæfi og lausafjárstöðu á mörkuðum. Hækkun álagskrafna þýðir dýrari fjármögnun fyrir fyrirtæki, sem hækkar ávöxtunarkröfu og dregur úr virði framtíðar sjóðstreymis í hefðbundnum fjármálalíkönum.",
    commDesc: "Flökt á hrávörum (s.s. olíu og gasi) þjónar sem beinn proxy fyrir framboðstruflanir og verðbólguþrýsting. Miklar verðsveiflur auka óvissu um rekstrarkostnað fyrirtækja, kreppa framlegð og þvinga fram breytingar á framleiðsluvirði.",
    polyDesc: "Dreifstýrðir spámarkaðir þjóna sem framsýnn vísir á makróbreytur (s.s. vaxtaákvarðanir og verðbólguspár). Þessir markaðir safna upplýsingum hratt úr dreifðum áttum og gefa rauntíma vísbendingu um væntingar markaðarins, oft á undan opinberum hagskýrslum.",
    viewCTA: "SKOÐA",
    syncLabel: "SAMSTILLA RAUNTÍMAGÖGN",
    bondSpreadTab: "SKULDABRÉFAÁLAG",
    commTab: "HRÁVÖRUR",
    polyTab: "SPÁMARKAÐIR",
    scenarioActiveBadge: "SVIÐSMYND VIRK",
    scenario1Title: "1. PENINGALEG HERÐING",
    scenario1Desc: "Hröð hækkun stýrivaxta og samdráttur í lausafé til að vinna gegn verðbólgu.",
    scenario2Title: "2. FRAMBOÐSSKELLUR",
    scenario2Desc: "Skyndileg truflun á hrávöruflæði og hækkun aðfangaverðs á alþjóðavísu.",
    scenario3Title: "3. JARÐPÓLITÍSKUR HÁPUNKTUR",
    scenario3Desc: "Aukin alþjóðleg spenna sem keyrir upp óvissu á spámörkuðum og öruggum höfnum."
  },
  en: {
    headerLabel: "Systemic Risk // Real-Time Modeling",
    title: "Macro Stress Index",
    subtitle: "Three-factor data model using weighted Z-scores",
    gaugeLevelLow: "Low Stress // Safe Zone",
    gaugeLevelMid: "Moderate Stress // Systemic Warning",
    gaugeLevelHigh: "High Stress // Systemic Crisis",
    slidersHeader: "Adjust Macro Proxy Variables",
    bondLabel: "Bond Spread (Credit / Liquidity)",
    commLabel: "Commodity Volatility (Supply Costs)",
    polyLabel: "Polymarket Prediction Markets (Sentiment)",
    zScoreLabel: "Z-score",
    detailsHeader: "Theoretical Framework // Asset Proxy Mechanics",
    detailsInstruction: "Click a risk factor to view its structural proxy mechanics",
    bondDesc: "Bond yield spreads (e.g., between corporate credit and risk-free sovereigns) measure market funding liquidity and credit default risk. Widening spreads indicate tighter credit conditions, raising the cost of capital and dampening asset valuations in corporate discount models.",
    commDesc: "Volatility in raw commodities (e.g., oil, gas, metals) acts as a direct proxy for supply-side cost shocks and push-inflation. High volatility increases input cost uncertainty, compresses corporate profit margins, and drives near-term earnings downgrades.",
    polyDesc: "Decentralized prediction markets provide an incentive-aligned, forward-looking sentiment consensus on macro events (e.g., central bank rate trajectories). By aggregating distributed signals rapidly, they serve as leading indicators of macro policy shifts ahead of lagging economic releases.",
    viewCTA: "VIEW",
    syncLabel: "SYNC LIVE DATA",
    bondSpreadTab: "BOND SPREAD",
    commTab: "COMMODITY",
    polyTab: "POLYMARKET",
    scenarioActiveBadge: "SCENARIO ACTIVE",
    scenario1Title: "1. MONETARY TIGHTENING",
    scenario1Desc: "Rapid interest rate hikes and liquidity contraction to combat stubborn inflation.",
    scenario2Title: "2. SUPPLY-SIDE SHOCK",
    scenario2Desc: "Sudden disruption in commodity flows driving up global input and logistics costs.",
    scenario3Title: "3. GEOPOLITICAL APEX",
    scenario3Desc: "Escalating international tensions driving extreme uncertainty and safe-haven flows."
  }
};

export default function AnalysisWorkspace({ 
  isEnglish = false,
  bondSpread = 1.8,
  setBondSpread = () => {},
  commodityVol = 28,
  setCommodityVol = () => {},
  polymarketSpread = 45,
  setPolymarketSpread = () => {},
  activeScenario = null,
  setActiveScenario = () => {},
  onSync = () => {},
  onSliderChange = () => {}
}) {
  const t = isEnglish ? LOCAL_TRANSLATIONS.en : LOCAL_TRANSLATIONS.is;
  
  // Expanded card sub-toggle: 'bond' | 'commodity' | 'polymarket' | null
  const [activePillar, setActivePillar] = useState(null);

  // Sync state hook for temporary success text
  const [isSynced, setIsSynced] = useState(false);

  // Z-Score calculations
  // Z = (Value - Mean) / StdDev
  const zBond = (bondSpread - 1.5) / 0.8;
  const zComm = (commodityVol - 30) / 15;
  const zPoly = (polymarketSpread - 50) / 20;

  // Composite Weighted Z-Score (Weights: 40% Bond, 30% Comm, 30% Poly)
  const weightedZ = 0.4 * zBond + 0.3 * zComm + 0.3 * zPoly;

  // Map weighted Z-Score (nominally -2.5 to +2.5) to 0-100 composite index
  const rawPct = (weightedZ + 2.5) / 5;
  const compositeScore = Math.min(100, Math.max(0, Math.round(rawPct * 100)));

  // Gauge state formatting properties
  let stressState = t.gaugeLevelLow;
  let themeColor = 'border-emerald-500/20';
  let textColor = 'text-emerald-400';
  let glowColor = 'shadow-emerald-500/20 border-emerald-500/30';
  let bgGradient = 'from-emerald-500/5 to-transparent';

  if (compositeScore > 70) {
    stressState = t.gaugeLevelHigh;
    themeColor = 'border-rose-500/20';
    textColor = 'text-rose-400';
    glowColor = 'shadow-rose-500/20 border-rose-500/30';
    bgGradient = 'from-rose-500/5 to-transparent';
  } else if (compositeScore > 35) {
    stressState = t.gaugeLevelMid;
    themeColor = 'border-amber-500/20';
    textColor = 'text-amber-400';
    glowColor = 'shadow-amber-500/20 border-amber-500/30';
    bgGradient = 'from-amber-500/5 to-transparent';
  }

  const handlePillarToggle = (pillar) => {
    setActivePillar(activePillar === pillar ? null : pillar);
  };

  const handleSyncLiveData = () => {
    onSync();
    setIsSynced(true);
    setTimeout(() => {
      setIsSynced(false);
    }, 1500);
  };

  const scenarios = [
    {
      id: 'monetary',
      title: t.scenario1Title,
      desc: t.scenario1Desc,
      icon: TrendingUp,
      action: () => {
        setBondSpread(4.3);
        setCommodityVol(40);
        setPolymarketSpread(70);
        setActiveScenario('monetary');
      }
    },
    {
      id: 'supply',
      title: t.scenario2Title,
      desc: t.scenario2Desc,
      icon: Zap,
      action: () => {
        setBondSpread(1.9);
        setCommodityVol(95);
        setPolymarketSpread(65);
        setActiveScenario('supply');
      }
    },
    {
      id: 'geopolitical',
      title: t.scenario3Title,
      desc: t.scenario3Desc,
      icon: Terminal,
      action: () => {
        setBondSpread(2.8);
        setCommodityVol(55);
        setPolymarketSpread(90);
        setActiveScenario('geopolitical');
      }
    }
  ];

  return (
    <div className={`flex flex-col md:flex-row items-stretch bg-slate-950/40 backdrop-blur-2xl border ${themeColor} rounded-2xl shadow-2xl relative overflow-hidden min-h-[530px] transition-all duration-500`}>
      
      {/* Background radial accent synced to stress color */}
      <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${bgGradient} rounded-full blur-[80px] pointer-events-none transition-all duration-700`} />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/1 rounded-full blur-[80px] pointer-events-none" />

      {/* 1. Left Command Strip Sidebar */}
      <div className="w-full md:w-48 bg-slate-950/60 border-b md:border-b-0 md:border-r border-white/5 p-4 flex flex-col justify-between gap-3 flex-shrink-0 relative z-10 select-none">
        <div className="flex flex-col gap-2.5">
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold mb-1 flex items-center gap-1">
            <Activity size={10} className="text-emerald-500" /> {isEnglish ? "Scenario Engine" : "Sviðsmyndir"}
          </span>
          <div className="flex flex-col gap-2">
            {scenarios.map((sc) => {
              const IconComponent = sc.icon;
              const isActive = activeScenario === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={sc.action}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all duration-300 relative overflow-hidden select-none cursor-pointer flex items-center gap-2.5 ${
                    isActive 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                      : 'bg-slate-900/40 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg transition-colors flex-shrink-0 flex items-center justify-center ${
                    isActive ? 'bg-emerald-500 text-black' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    <IconComponent size={12} />
                  </div>
                  <span className="text-[9px] font-mono font-bold tracking-wider leading-tight">{sc.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Master Sync Reset at bottom of Sidebar */}
        <button
          onClick={handleSyncLiveData}
          className={`w-full text-[10px] font-mono flex items-center justify-center gap-1.5 transition-all select-none cursor-pointer p-2.5 rounded border shadow-md active:scale-95 ${
            isSynced 
              ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold" 
              : "text-emerald-400 hover:text-emerald-300 bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/20"
          }`}
        >
          <RefreshCw 
            size={11} 
            className={isSynced ? "" : "animate-spin"} 
            style={{ animationDuration: isSynced ? '0s' : '4s' }} 
          />
          {isSynced ? (isEnglish ? "Synced" : "Samstillt") : t.syncLabel}
        </button>
      </div>

      {/* 2. Main Console Content */}
      <div className="flex-1 p-5 md:p-6 flex flex-col justify-between gap-3.5 relative overflow-hidden z-10">
        
        {/* Header Block */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[11px] lg:text-xs font-mono text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
              <Activity size={12} className="text-emerald-500" /> {t.headerLabel}
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-white font-heading uppercase tracking-wide">
            {t.title}
          </h2>
          <div className="relative overflow-hidden min-h-[22px] mt-1">
            <AnimatePresence mode="wait">
              {activeScenario ? (
                <motion.div
                  key={activeScenario}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="text-[11px] lg:text-[12px] text-emerald-400 font-semibold leading-relaxed flex items-center gap-1.5"
                >
                  <span className="px-1.5 py-0.5 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 rounded text-[8px] font-mono font-bold uppercase tracking-wider flex-shrink-0">
                    {t.scenarioActiveBadge}
                  </span>
                  <span>
                    {activeScenario === 'monetary' && t.scenario1Desc}
                    {activeScenario === 'supply' && t.scenario2Desc}
                    {activeScenario === 'geopolitical' && t.scenario3Desc}
                  </span>
                </motion.div>
              ) : (
                <motion.p
                  key="default"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="text-[11px] lg:text-[12px] text-slate-300 font-light leading-relaxed"
                >
                  {t.subtitle}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Gauge & Metrics Side-by-Side Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          
          {/* Radial SVG Gauge Container (Left col in MD screen) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-[170px] lg:max-w-[190px] aspect-[1.3/1] flex flex-col items-center justify-center">
              <svg viewBox="0 0 200 120" className="w-full h-auto">
                <defs>
                  {/* Gauge Gradient */}
                  <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                </defs>
                
                {/* Background Semicircle Track */}
                <path 
                  d="M 30,100 A 70,70 0 0,1 170,100" 
                  strokeWidth="10" 
                  stroke="#1e293b" 
                  fill="none" 
                  strokeLinecap="round"
                />

                {/* Filled Active Arc (Length ~ 220) */}
                <motion.path 
                  d="M 30,100 A 70,70 0 0,1 170,100" 
                  strokeWidth="10" 
                  stroke="url(#gaugeGradient)"
                  fill="none" 
                  strokeLinecap="round"
                  strokeDasharray="220"
                  animate={{ strokeDashoffset: 220 - (220 * compositeScore) / 100 }}
                  transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                />
              </svg>

              {/* Centered Big Value Overlay */}
              <div className="absolute bottom-2 flex flex-col items-center">
                <motion.span 
                  className={`text-3xl lg:text-4xl font-extrabold font-heading tracking-tighter ${textColor} font-mono`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  {compositeScore}
                </motion.span>
                <span className="text-[9px] lg:text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Index</span>
              </div>
            </div>

            {/* Dynamic Label Box */}
            <div className="flex flex-col items-center gap-2 mt-2 w-full">
              <div className={`py-1 px-3.5 border ${glowColor} rounded-full bg-slate-950/60 font-mono text-[10px] lg:text-xs font-bold uppercase tracking-widest ${textColor} shadow-lg transition-all duration-300`}>
                {stressState}
              </div>
            </div>
          </div>

          {/* Interactive Sliders Stack (Right col in MD screen) */}
          <div className="md:col-span-7 space-y-3">
            <h3 className="text-[10px] lg:text-xs font-mono text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
              <Sliders size={11} className="text-emerald-500" /> {t.slidersHeader}
            </h3>

            {/* Slider 1: Bond Spreads */}
            <div className="space-y-1 bg-slate-900/30 p-2.5 rounded-xl border border-white/[0.02]">
              <div className="flex justify-between items-center text-xs lg:text-[13px]">
                <span className="text-slate-200 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {t.bondLabel}
                </span>
                <div className="font-mono flex items-center gap-1.5 text-[11px] lg:text-xs">
                  <span className="text-white font-bold">{bondSpread.toFixed(1)}%</span>
                  <span className="text-slate-400 text-[10px] lg:text-[11px]">
                    {t.zScoreLabel}: <span className={zBond >= 0 ? "text-amber-400 font-semibold" : "text-emerald-400 font-bold"}>
                      {zBond >= 0 ? "+" : ""}{zBond.toFixed(2)}
                    </span>
                  </span>
                </div>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="5.0" 
                step="0.1" 
                value={bondSpread}
                onChange={(e) => {
                  setBondSpread(parseFloat(e.target.value));
                  onSliderChange();
                }}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Slider 2: Commodity Volatility */}
            <div className="space-y-1 bg-slate-900/30 p-2.5 rounded-xl border border-white/[0.02]">
              <div className="flex justify-between items-center text-xs lg:text-[13px]">
                <span className="text-slate-200 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  {t.commLabel}
                </span>
                <div className="font-mono flex items-center gap-1.5 text-[11px] lg:text-xs">
                  <span className="text-white font-bold">{commodityVol}%</span>
                  <span className="text-slate-400 text-[10px] lg:text-[11px]">
                    {t.zScoreLabel}: <span className={zComm >= 0 ? "text-amber-400 font-semibold" : "text-emerald-400 font-bold"}>
                      {zComm >= 0 ? "+" : ""}{zComm.toFixed(2)}
                    </span>
                  </span>
                </div>
              </div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                step="1" 
                value={commodityVol}
                onChange={(e) => {
                  setCommodityVol(parseInt(e.target.value));
                  onSliderChange();
                }}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Slider 3: Polymarket Macro Spreads */}
            <div className="space-y-1 bg-slate-900/30 p-2.5 rounded-xl border border-white/[0.02]">
              <div className="flex justify-between items-center text-xs lg:text-[13px]">
                <span className="text-slate-200 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                  {t.polyLabel}
                </span>
                <div className="font-mono flex items-center gap-1.5 text-[11px] lg:text-xs">
                  <span className="text-white font-bold">{polymarketSpread}%</span>
                  <span className="text-slate-400 text-[10px] lg:text-[11px]">
                    {t.zScoreLabel}: <span className={zPoly >= 0 ? "text-amber-400 font-semibold" : "text-emerald-400 font-bold"}>
                      {zPoly >= 0 ? "+" : ""}{zPoly.toFixed(2)}
                    </span>
                  </span>
                </div>
              </div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                step="1" 
                value={polymarketSpread}
                onChange={(e) => {
                  setPolymarketSpread(parseInt(e.target.value));
                  onSliderChange();
                }}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

          </div>
        </div>

        {/* Theoretical Framework / Sub-Toggles section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[10px] lg:text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">
            <span className="flex items-center gap-1.5"><BookOpen size={11} className="text-emerald-500" /> {t.detailsHeader}</span>
            <span className="text-slate-500 hidden sm:inline">{t.detailsInstruction}</span>
          </div>

          {/* Symmetrical mini-card toggles grid */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handlePillarToggle('bond')}
              className={`group p-2.5 rounded-lg border text-left transition-all select-none cursor-pointer hover:bg-white/[0.02] ${
                activePillar === 'bond' 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                  : 'bg-slate-900/40 border-white/5 text-slate-400 hover:text-slate-300 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <span className="text-[9px] lg:text-[10px] font-mono uppercase tracking-wider font-bold">{t.bondSpreadTab}</span>
                <div className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                  <span className="text-[8px] lg:text-[9px] font-mono font-bold">{t.viewCTA}</span>
                  {activePillar === 'bond' ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                </div>
              </div>
            </button>

            <button
              onClick={() => handlePillarToggle('commodity')}
              className={`group p-2.5 rounded-lg border text-left transition-all select-none cursor-pointer hover:bg-white/[0.02] ${
                activePillar === 'commodity' 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                  : 'bg-slate-900/40 border-white/5 text-slate-400 hover:text-slate-300 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <span className="text-[9px] lg:text-[10px] font-mono uppercase tracking-wider font-bold">{t.commTab}</span>
                <div className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                  <span className="text-[8px] lg:text-[9px] font-mono font-bold">{t.viewCTA}</span>
                  {activePillar === 'commodity' ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                </div>
              </div>
            </button>

            <button
              onClick={() => handlePillarToggle('polymarket')}
              className={`group p-2.5 rounded-lg border text-left transition-all select-none cursor-pointer hover:bg-white/[0.02] ${
                activePillar === 'polymarket' 
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' 
                  : 'bg-slate-900/40 border-white/5 text-slate-400 hover:text-slate-300 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <span className="text-[9px] lg:text-[10px] font-mono uppercase tracking-wider font-bold">{t.polyTab}</span>
                <div className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                  <span className="text-[8px] lg:text-[9px] font-mono font-bold">{t.viewCTA}</span>
                  {activePillar === 'polymarket' ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                </div>
              </div>
            </button>
          </div>

          {/* Description slide-open area (Dynamic height collapse, removing static empty-state block to save vertical space) */}
          <motion.div
            initial={false}
            animate={{ 
              height: activePillar ? "86px" : "0px",
              opacity: activePillar ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative overflow-hidden w-full"
          >
            <AnimatePresence mode="wait">
              {activePillar && (
                <motion.div
                  key={activePillar}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className={`p-3 border rounded-xl bg-slate-950/60 shadow-lg text-[11.5px] lg:text-[12.5px] leading-relaxed font-normal text-slate-100 h-full overflow-hidden ${
                    activePillar === 'bond' ? 'border-emerald-500/20' : 
                    activePillar === 'commodity' ? 'border-amber-500/20' : 'border-rose-500/20'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <Info size={13} className={`flex-shrink-0 mt-0.5 ${
                      activePillar === 'bond' ? 'text-emerald-400' : 
                      activePillar === 'commodity' ? 'text-amber-400' : 'text-rose-400'
                    }`} />
                    <p className="line-clamp-3">
                      {activePillar === 'bond' && t.bondDesc}
                      {activePillar === 'commodity' && t.commDesc}
                      {activePillar === 'polymarket' && t.polyDesc}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Dynamic bottom branding details */}
        <div className="border-t border-white/5 pt-3 mt-1 flex justify-between items-center text-[10px] lg:text-xs font-mono text-slate-400 uppercase tracking-widest transition-all duration-300">
          <span>HJ Portfolio // {isEnglish ? "Risk Framework" : "Áhætturammi"}</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1 select-none">
            <ShieldAlert size={11} className="text-emerald-500" /> PROTOTYPE v2.4
          </span>
        </div>
      </div>
    </div>
  );
}
