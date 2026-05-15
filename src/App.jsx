import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

/* ─── DATA ─────────────────────────────────────────────── */
const NAV_LINKS = ["home", "about", "products", "contact"];

const FEATURES = [
  {
    icon: "🧬",
    title: "Molecular Filtration",
    desc: "Removes particles as small as 0.0001 microns — smaller than any known pathogen.",
  },
  {
    icon: "💎",
    title: "Mineral Restoration",
    desc: "Adds back calcium, magnesium & alkaline compounds your body craves.",
  },
  {
    icon: "📱",
    title: "Smart Monitoring",
    desc: "Live TDS, pH, and flow-rate data on the integrated display and app.",
  },
  {
    icon: "♻️",
    title: "Zero-Waste Design",
    desc: "Industry-first 1:1 pure-to-waste ratio. Eco-conscious from molecule to molecule.",
  },
];

const PILLARS = [
  {
    icon: "🛡️",
    title: "Bio-Defense RO+",
    desc: "14 stages of precision molecular ultrafiltration — stripping away microplastics, heavy metals, fluoride, chloramines and every known pathogen. Your water passes through membranes thinner than a human hair.",
  },
  {
    icon: "💧",
    title: "Natural Mineralization",
    desc: "We don't just strip — we replenish. Our bio-ceramic mineral stones return vital magnesium, calcium, potassium, and essential alkaline elements so every glass tastes like mountain spring water.",
  },
  {
    icon: "🌿",
    title: "Eco Carbon Architecture",
    desc: "Zero-waste dynamic recirculation — our 1:1 efficiency ratio means for every litre purified, only one litre is used. We broke the industry's 3:1 norm. Permanently.",
  },
];

const TIMELINE = [
  {
    year: "2018",
    dot: "18",
    title: "Founded in Bangalore",
    desc: "Three engineers leave ISRO to build India's first molecular-grade consumer RO system.",
  },
  {
    year: "2020",
    dot: "20",
    title: "14-Stage Breakthrough",
    desc: "Patent granted for sequential molecular membrane architecture. Industry takes notice.",
  },
  {
    year: "2022",
    dot: "22",
    title: "1:1 Waste Ratio Achieved",
    desc: "First company in the world to hit true zero-waste filtration at consumer scale.",
  },
  {
    year: "2024",
    dot: "24",
    title: "Smart Display Launch",
    desc: "Integrated TDS + pH real-time display and companion app. Over 1M units shipped.",
  },
  {
    year: "2026",
    dot: "26",
    title: "The X-Series",
    desc: "Our most advanced purification engineering ever. Launching to the world now.",
  },
];

const PRODUCTS = [
  {
    id: "elite",
    badge: "Flagship",
    badgeDark: false,
    bgClass: "blue-bg",
    dark: false,
    name: "Elite X-1",
    tagline: "The pinnacle of home water purification.",
    specs: [
      "14-Stage RO + UV + UF + Mineraliser",
      "Intelligent TDS & pH Live Display",
      "Alkaline Balancer (pH 8.2–9.0)",
      "Smart Filter Change Alert (App)",
      "1:1 Zero Waste Recovery Ratio",
    ],
    price: "₹89,999",
    btnLight: false,
    btnLabel: "Pre-Order",
    tds: "002",
  },
  {
    id: "element",
    badge: "Pro Series",
    badgeDark: true,
    bgClass: "dark-bg",
    dark: true,
    name: "Element Pro",
    tagline: "Compact brilliance for modern kitchens.",
    specs: [
      "12-Stage Compact Filtration",
      "UV-C Chamber Sterilization",
      "Sleek Countertop Glass Profile",
      "Auto Flush & Self-Clean Cycle",
      "Fits under standard sink cabinet",
    ],
    price: "₹64,999",
    btnLight: true,
    btnLabel: "Pre-Order",
    tds: "004",
  },
  {
    id: "hydro",
    badge: "Under Sink",
    badgeDark: false,
    bgClass: "slate-bg",
    dark: false,
    name: "HydroCore S",
    tagline: "Hidden genius — designed to disappear under your sink.",
    specs: [
      "10-Stage RO Under-Sink Module",
      "Separate Dedicated Pure Water Tap",
      "12L Storage Tank Included",
      "Wi-Fi TDS Reporting to App",
    ],
    price: "₹49,999",
    btnLight: false,
    btnLabel: "Pre-Order",
    tds: "001",
  },
  {
    id: "obsidian",
    badge: "Luxury",
    badgeDark: true,
    bgClass: "ink-bg",
    dark: true,
    name: "Obsidian One",
    tagline: "For those who demand the extraordinary.",
    specs: [
      "16-Stage Luxury Filtration",
      "Platinum-grade Membrane",
      "Bespoke Installation Service",
      "5-Year White Glove Warranty",
    ],
    price: "₹1,49,999",
    btnLight: true,
    btnLabel: "Enquire",
    tds: "001",
  },
];

const COMP_ROWS = [
  { label: "Filter Stages", vals: ["14", "12", "10"] },
  { label: "UV-C Sterilization", vals: [true, true, false] },
  { label: "Alkaline Mineralization", vals: [true, false, false] },
  { label: "Smart Display", vals: [true, true, "App Only"] },
  { label: "1:1 Zero Waste", vals: [true, true, false] },
];

const MARQUEE_ITEMS = [
  "Molecular Filtration",
  "14-Stage Purification",
  "99.9% Purity",
  "Smart TDS Monitor",
  "Alkaline Infused",
  "Zero Waste Architecture",
  "UV-C Sterilization",
  "Molecular Filtration",
  "14-Stage Purification",
  "99.9% Purity",
  "Smart TDS Monitor",
  "Alkaline Infused",
  "Zero Waste Architecture",
  "UV-C Sterilization",
];

const HOW_STEPS = [
  {
    num: "01",
    icon: "🌊",
    title: "Source Water Enters",
    desc: "Raw tap water enters the pre-filter chamber, capturing large sediment and chlorine with activated carbon.",
  },
  {
    num: "02",
    icon: "🔬",
    title: "Molecular Membrane",
    desc: "Our 0.0001-micron RO membrane rejects heavy metals, fluoride, nitrates, and all known pathogens.",
  },
  {
    num: "03",
    icon: "💡",
    title: "UV-C Sterilization",
    desc: "A 254nm UV-C lamp annihilates any remaining microbial life — 99.9999% sterilization efficiency.",
  },
  {
    num: "04",
    icon: "💎",
    title: "Mineral Infusion",
    desc: "Bio-ceramic mineral stones restore calcium, magnesium, and potassium for a crisp, alkaline finish.",
  },
  {
    num: "05",
    icon: "📊",
    title: "Smart Validation",
    desc: "Live TDS & pH sensors confirm purity before every pour. Your app logs every drop in real time.",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Raghavan",
    role: "Architect · Mumbai",
    avatar: "PR",
    rating: 5,
    quote:
      "I've tried every premium water purifier on the market. AquaPura is in a different league entirely — the water tastes like it was born in a glacier.",
    model: "Elite X-1",
  },
  {
    name: "Arjun Mehta",
    role: "Cardiologist · Delhi",
    avatar: "AM",
    rating: 5,
    quote:
      "As someone who studies what enters the bloodstream, I became obsessive about our water. The 14-stage process and live TDS monitoring gave my family real peace of mind.",
    model: "HydroCore S",
  },
  {
    name: "Sonal & Vivek Iyer",
    role: "Home Owners · Bengaluru",
    avatar: "SI",
    rating: 5,
    quote:
      "The Obsidian One is a sculpture in our kitchen as much as it is a purifier. Every guest asks about it. Every sip validates the investment.",
    model: "Obsidian One",
  },
];

const COUNTER_STATS = [
  { end: 1200000, suffix: "+", label: "Units Shipped", prefix: "" },
  { end: 99.9, suffix: "%", label: "Purity Rate", prefix: "" },
  { end: 14, suffix: "", label: "Filter Stages", prefix: "" },
  { end: 1, suffix: ":1", label: "Waste Ratio", prefix: "" },
];

const FOOTER_LINKS = {
  Products: ["Elite X-1", "Element Pro", "HydroCore S", "Obsidian One"],
  Company: ["About Us", "Our Technology", "Sustainability", "Press"],
  Support: ["Consultation", "Filter Replacement", "Warranty", "App Download"],
  Legal: ["Privacy Policy", "Terms of Use", "Cookie Policy"],
};

/* ─── SVG MODELS ─────────────────────────────────────────── */
function ModelElite() {
  return (
    <svg
      className="ro-model-svg"
      width="160"
      height="260"
      viewBox="0 0 160 260"
      fill="none"
    >
      <defs>
        <linearGradient
          id="grad1"
          x1="30"
          y1="40"
          x2="130"
          y2="220"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ddeeff" />
          <stop offset="100%" stopColor="#a8c8ff" />
        </linearGradient>
        <linearGradient
          id="grad2"
          x1="45"
          y1="28"
          x2="115"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#b8d0ff" />
          <stop offset="100%" stopColor="#7aaaff" />
        </linearGradient>
        <linearGradient
          id="grad3"
          x1="68"
          y1="220"
          x2="92"
          y2="250"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#a0c0ff" />
          <stop offset="100%" stopColor="#6090ff" />
        </linearGradient>
      </defs>
      <rect x="30" y="40" width="100" height="180" rx="22" fill="url(#grad1)" />
      <rect
        x="30"
        y="40"
        width="100"
        height="180"
        rx="22"
        stroke="rgba(0,87,255,0.3)"
        strokeWidth="1.5"
      />
      <rect
        x="48"
        y="40"
        width="20"
        height="180"
        rx="10"
        fill="rgba(255,255,255,0.25)"
      />
      <rect x="45" y="28" width="70" height="16" rx="8" fill="url(#grad2)" />
      <rect
        x="45"
        y="150"
        width="70"
        height="50"
        rx="12"
        fill="rgba(255,255,255,0.15)"
        stroke="rgba(0,87,255,0.3)"
        strokeWidth="1"
      />
      <text
        x="80"
        y="183"
        textAnchor="middle"
        fontFamily="Georgia"
        fontSize="22"
        fontWeight="700"
        fill="#0057FF"
      >
        002
      </text>
      <text
        x="80"
        y="196"
        textAnchor="middle"
        fontFamily="Arial"
        fontSize="7"
        fill="rgba(0,87,255,0.7)"
        letterSpacing="1"
      >
        TDS PPM
      </text>
      {[80, 96, 112, 128].map((y, i) => (
        <line
          key={i}
          x1="50"
          y1={y}
          x2="110"
          y2={y}
          stroke={`rgba(0,87,255,${0.4 - i * 0.08})`}
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
      <circle cx="100" cy="58" r="5" fill="#0057FF" />
      <circle cx="100" cy="58" r="8" fill="rgba(0,87,255,0.2)" />
      <rect x="68" y="220" width="24" height="30" rx="6" fill="url(#grad3)" />
      <ellipse cx="80" cy="258" rx="5" ry="7" fill="rgba(0,87,255,0.5)" />
    </svg>
  );
}

function ModelElement() {
  return (
    <svg
      className="ro-model-svg"
      width="140"
      height="240"
      viewBox="0 0 140 240"
      fill="none"
    >
      <defs>
        <linearGradient
          id="darkgrad1"
          x1="20"
          y1="30"
          x2="120"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1a2030" />
          <stop offset="100%" stopColor="#0b1020" />
        </linearGradient>
        <linearGradient
          id="darkgrad2"
          x1="38"
          y1="20"
          x2="102"
          y2="34"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1e3060" />
          <stop offset="100%" stopColor="#0a1830" />
        </linearGradient>
        <linearGradient
          id="darkgrad3"
          x1="55"
          y1="200"
          x2="85"
          y2="228"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1e3060" />
          <stop offset="100%" stopColor="#0a1830" />
        </linearGradient>
      </defs>
      <rect
        x="20"
        y="30"
        width="100"
        height="170"
        rx="18"
        fill="url(#darkgrad1)"
      />
      <rect
        x="20"
        y="30"
        width="100"
        height="170"
        rx="18"
        stroke="rgba(100,150,255,0.2)"
        strokeWidth="1.5"
      />
      <rect
        x="36"
        y="30"
        width="16"
        height="170"
        rx="8"
        fill="rgba(255,255,255,0.05)"
      />
      <rect
        x="38"
        y="20"
        width="64"
        height="14"
        rx="7"
        fill="url(#darkgrad2)"
      />
      {[65, 80, 95].map((y, i) => (
        <line
          key={i}
          x1="35"
          y1={y}
          x2="105"
          y2={y}
          stroke={`rgba(100,160,255,${0.3 - i * 0.07})`}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
      <rect
        x="38"
        y="125"
        width="64"
        height="42"
        rx="10"
        fill="rgba(0,87,255,0.12)"
        stroke="rgba(100,160,255,0.3)"
        strokeWidth="1"
      />
      <text
        x="70"
        y="151"
        textAnchor="middle"
        fontFamily="Georgia"
        fontSize="20"
        fontWeight="700"
        fill="#60a0ff"
      >
        004
      </text>
      <text
        x="70"
        y="163"
        textAnchor="middle"
        fontFamily="Arial"
        fontSize="6"
        fill="rgba(100,160,255,0.7)"
        letterSpacing="1"
      >
        TDS PPM
      </text>
      <circle cx="95" cy="45" r="4" fill="#3b82f6" />
      <rect
        x="55"
        y="200"
        width="30"
        height="28"
        rx="7"
        fill="url(#darkgrad3)"
      />
      <ellipse cx="70" cy="233" rx="5" ry="6" fill="rgba(100,160,255,0.4)" />
    </svg>
  );
}

function ModelHydro() {
  return (
    <svg
      className="ro-model-svg"
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
    >
      <defs>
        <linearGradient
          id="slategrad"
          x1="10"
          y1="60"
          x2="190"
          y2="140"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#e8f0ff" />
          <stop offset="100%" stopColor="#c8daff" />
        </linearGradient>
        <linearGradient
          id="cylgrad1"
          x1="18"
          y1="78"
          x2="62"
          y2="122"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#c0d8ff" />
          <stop offset="100%" stopColor="#8ab0ff" />
        </linearGradient>
      </defs>
      <rect
        x="10"
        y="60"
        width="180"
        height="80"
        rx="18"
        fill="url(#slategrad)"
      />
      <rect
        x="10"
        y="60"
        width="180"
        height="80"
        rx="18"
        stroke="rgba(0,87,255,0.2)"
        strokeWidth="1.5"
      />
      <rect
        x="10"
        y="60"
        width="60"
        height="80"
        rx="18"
        fill="rgba(0,87,255,0.08)"
      />
      <circle
        cx="40"
        cy="100"
        r="22"
        fill="url(#cylgrad1)"
        stroke="rgba(0,87,255,0.3)"
        strokeWidth="1"
      />
      <circle cx="40" cy="100" r="14" fill="rgba(255,255,255,0.5)" />
      <circle cx="40" cy="100" r="6" fill="#0057FF" opacity="0.4" />
      <rect
        x="100"
        y="75"
        width="70"
        height="50"
        rx="10"
        fill="rgba(255,255,255,0.5)"
        stroke="rgba(0,87,255,0.15)"
      />
      <text
        x="135"
        y="103"
        textAnchor="middle"
        fontFamily="Georgia"
        fontSize="18"
        fontWeight="700"
        fill="#0057FF"
      >
        001
      </text>
      <text
        x="135"
        y="115"
        textAnchor="middle"
        fontFamily="Arial"
        fontSize="6"
        fill="rgba(0,87,255,0.6)"
        letterSpacing="1"
      >
        TDS PPM
      </text>
      <line
        x1="10"
        y1="85"
        x2="0"
        y2="85"
        stroke="rgba(0,87,255,0.5)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="190"
        y1="115"
        x2="200"
        y2="115"
        stroke="rgba(0,87,255,0.5)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ModelObsidian() {
  return (
    <svg
      className="ro-model-svg"
      width="130"
      height="260"
      viewBox="0 0 130 260"
      fill="none"
    >
      <defs>
        <linearGradient
          id="luxgrad"
          x1="35"
          y1="20"
          x2="95"
          y2="220"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#141c30" />
          <stop offset="100%" stopColor="#060a14" />
        </linearGradient>
      </defs>
      <rect
        x="35"
        y="20"
        width="60"
        height="200"
        rx="30"
        fill="url(#luxgrad)"
      />
      <rect
        x="35"
        y="20"
        width="60"
        height="200"
        rx="30"
        stroke="rgba(200,220,255,0.1)"
        strokeWidth="1.5"
      />
      <ellipse
        cx="65"
        cy="50"
        rx="22"
        ry="6"
        fill="none"
        stroke="rgba(200,180,100,0.5)"
        strokeWidth="2"
      />
      <rect
        x="43"
        y="20"
        width="12"
        height="200"
        rx="6"
        fill="rgba(255,255,255,0.04)"
      />
      <rect
        x="43"
        y="130"
        width="44"
        height="55"
        rx="12"
        fill="rgba(0,40,120,0.3)"
        stroke="rgba(100,140,255,0.2)"
      />
      <text
        x="65"
        y="162"
        textAnchor="middle"
        fontFamily="Georgia"
        fontSize="18"
        fontWeight="700"
        fill="#7aafff"
      >
        001
      </text>
      <text
        x="65"
        y="176"
        textAnchor="middle"
        fontFamily="Arial"
        fontSize="5.5"
        fill="rgba(120,160,255,0.6)"
        letterSpacing="1"
      >
        PURE TDS
      </text>
      {[78, 94, 110].map((y, i) => (
        <line
          key={i}
          x1="43"
          y1={y}
          x2="87"
          y2={y}
          stroke={`rgba(100,140,255,${0.15 - i * 0.03})`}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
      <circle cx="75" cy="38" r="3.5" fill="#3b7aff" />
      <rect
        x="52"
        y="220"
        width="26"
        height="30"
        rx="6"
        fill="rgba(30,50,100,0.8)"
      />
      <ellipse cx="65" cy="254" rx="4" ry="5.5" fill="rgba(100,150,255,0.3)" />
    </svg>
  );
}

const MODEL_SVG = {
  elite: ModelElite,
  element: ModelElement,
  hydro: ModelHydro,
  obsidian: ModelObsidian,
};

/* ─── HERO RO VISUAL ─────────────────────────────────────── */
function HeroVisual({ tds }) {
  return (
    <div className="hero-visual">
      <div className="ro-stage-wrapper">
        <div className="ro-top-ring" />
        <div className="ro-body">
          <div className="ro-sheen" />
          <div className="ro-filter-lines">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`filter-line fl-${i}`} />
            ))}
          </div>
          <div className="ro-display">
            <div className="tds-num">{String(tds).padStart(3, "0")}</div>
            <div className="tds-lbl">OPTIMAL TDS</div>
          </div>
        </div>
        <div className="ro-spout" />
        <div className="hero-label label-1">
          <span className="ldot" />
          14-Stage RO+UV
        </div>
        <div className="hero-label label-2">
          <span className="ldot" />
          Alkaline pH 8.5
        </div>
        <div className="hero-label label-3">
          <span className="ldot" />
          Smart TDS Monitor
        </div>
      </div>
    </div>
  );
}

/* ─── WATER DROPS CANVAS ─────────────────────────────────── */

function WaterDropsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let particles = [];
    let animationFrame;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 4 + 1,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speed;

        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(120,180,255,${p.opacity})`;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="water-canvas" />;
}

/* ─── AMBIENT DROPS CANVAS (for new section) ─────────────── */
function AmbientDrops({ count = 20, color = "0,87,255", dark = false }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vy: 0.2 + Math.random() * 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        r: 2 + Math.random() * 6,
        a: 0.15 + Math.random() * 0.35,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.01 + Math.random() * 0.02,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const anim = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * 0.3;
        p.y += p.vy;
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.r * 0.55, p.r, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${p.a})`;
        ctx.fill();
        // shine dot
        ctx.beginPath();
        ctx.arc(p.x - p.r * 0.2, p.y - p.r * 0.3, p.r * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a * 0.8})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(anim);
    };
    anim();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count, color]);

  return <canvas ref={canvasRef} className="ambient-drops-canvas" />;
}

/* ─── RIPPLE CANVAS ──────────────────────────────────────── */
function RippleZone() {
  const canvasRef = useRef(null);
  const zoneRef = useRef(null);
  const ripplesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const zone = zoneRef.current;
    if (!canvas || !zone) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = zone.offsetWidth;
      canvas.height = zone.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      const r = zone.getBoundingClientRect();
      ripplesRef.current.push({
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        r: 0,
        a: 0.6,
      });
    };
    zone.addEventListener("mousemove", onMove);

    const anim = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ripplesRef.current = ripplesRef.current.filter((rp) => rp.a > 0.01);
      ripplesRef.current.forEach((rp) => {
        rp.r += 2.5;
        rp.a *= 0.96;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${rp.a})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
      rafRef.current = requestAnimationFrame(anim);
    };
    anim();
    return () => {
      cancelAnimationFrame(rafRef.current);
      zone.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="ripple-zone" ref={zoneRef}>
      <canvas ref={canvasRef} className="ripple-canvas" />
      <h2 className="ripple-h">Move your cursor to feel the flow.</h2>
      <p className="ripple-p">Our water is alive. So is our design.</p>
    </div>
  );
}

/* ─── ANIMATED COUNTER ───────────────────────────────────── */
function AnimCounter({ end, suffix, prefix, duration = 2000 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setVal(
              end < 100 ? +(end * eased).toFixed(1) : Math.round(end * eased),
            );
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);

  const display =
    end >= 1000000
      ? val >= 1000000
        ? (val / 1000000).toFixed(1) + "M"
        : (val / 1000).toFixed(0) + "K"
      : val;

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ─── SCROLL REVEAL HOOK ─────────────────────────────────── */
function useReveal(deps = []) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 },
      );
      document
        .querySelectorAll(".reveal, .reveal-left, .tl-item")
        .forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    }, 100);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/* ─── HOW IT WORKS SECTION ───────────────────────────────── */
function HowItWorks() {
  return (
    <section className="how-section">
      <AmbientDrops count={35} color="0,87,255" />
      <div className="how-inner">
        <div className="section-header reveal">
          <div className="page-eyebrow">The Science</div>
          <h2 className="section-h">
            From tap to <em>perfection</em>.
          </h2>
          <p className="section-sub">
            Every drop of AquaPura water is a journey through five precision
            stages.
          </p>
        </div>
        <div className="how-steps">
          {HOW_STEPS.map((step, i) => (
            <div
              key={i}
              className="how-step reveal"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="how-step-left">
                <div className="how-num">{step.num}</div>
                <div className="how-connector" />
              </div>
              <div className="how-step-right">
                <div className="how-icon">{step.icon}</div>
                <h3 className="how-title">{step.title}</h3>
                <p className="how-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── STATS COUNTER SECTION ──────────────────────────────── */
function StatsSection() {
  return (
    <section className="stats-section">
      <div className="stats-inner">
        {COUNTER_STATS.map((s, i) => (
          <div
            key={i}
            className="stat-block reveal"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="stat-big">
              <AnimCounter end={s.end} suffix={s.suffix} prefix={s.prefix} />
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS SECTION ───────────────────────────────── */
function TestimonialsSection() {
  return (
    <section className="testi-section">
      <AmbientDrops count={25} color="255,255,255" />
      <div className="testi-inner">
        <div className="section-header reveal">
          <div
            className="page-eyebrow"
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              borderColor: "rgba(255,255,255,0.3)",
            }}
          >
            Testimonials
          </div>
          <h2 className="section-h" style={{ color: "#fff" }}>
            Trusted by those who
            <br />
            <em style={{ color: "rgba(180,210,255,1)" }}>demand more.</em>
          </h2>
        </div>
        <div className="testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="testi-card reveal"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="testi-stars">{"★".repeat(t.rating)}</div>
              <p className="testi-quote">"{t.quote}"</p>
              <div className="testi-meta">
                <div className="testi-avatar">{t.avatar}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
                <div className="testi-model">{t.model}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA BANNER ─────────────────────────────────────────── */
function CTABanner({ navigate }) {
  return (
    <section className="cta-banner">
      <div className="cta-bg-rings">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`cta-ring cta-ring-${i}`} />
        ))}
      </div>
      <div className="cta-inner reveal">
        <div className="page-eyebrow">Limited 2026 Launch</div>
        <h2 className="cta-h">
          Your water will never
          <br />
          be the same again.
        </h2>
        <p className="cta-sub">
          Pre-order the X-Series now. Free installation across 18 Indian cities.
          Free water quality assessment included.
        </p>
        <div className="cta-actions">
          <button className="btn-primary" onClick={() => navigate("products")}>
            View All Models
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button
            className="btn-ghost cta-ghost"
            onClick={() => navigate("contact")}
          >
            Book Free Assessment
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── ANIMATED FOOTER ────────────────────────────────────── */
function Footer() {
  const canvasRef = useRef(null);
  const poolRef = useRef(null);
  const dropsRef = useRef([]);
  const ringsRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const pool = poolRef.current;
    if (!canvas || !pool) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isCompactScreen = window.matchMedia("(max-width: 768px)").matches;
    if (prefersReducedMotion || isCompactScreen) return;

    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = pool.offsetWidth;
      canvas.height = pool.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Spawn a drop
    const spawnDrop = () => {
      const x = 60 + Math.random() * (canvas.width - 120);
      dropsRef.current.push({
        x,
        y: -20,
        vy: 1.5 + Math.random() * 2,
        r: 3 + Math.random() * 4,
        a: 0.8,
        done: false,
      });
      if (dropsRef.current.length > 18) {
        dropsRef.current = dropsRef.current.slice(-18);
      }
    };
    const iv = setInterval(spawnDrop, 1800);

    const anim = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Animate drops
      dropsRef.current.forEach((d) => {
        if (d.done) return;
        d.vy += 0.08;
        d.y += d.vy;
        ctx.beginPath();
        ctx.ellipse(d.x, d.y, d.r * 0.55, d.r, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,170,255,${d.a})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(d.x - d.r * 0.2, d.y - d.r * 0.35, d.r * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,0.6)`;
        ctx.fill();

        // Hit the pool
        const poolY = canvas.height - 60;
        if (d.y >= poolY && !d.done) {
          d.done = true;
          ringsRef.current.push({
            x: d.x,
            y: poolY,
            r: 2,
            maxR: 34 + Math.random() * 20,
            a: 0.35,
            speed: 0.8 + Math.random() * 0.5,
          });
          for (let s = 0; s < 2; s++) {
            const angle = -Math.PI + Math.random() * Math.PI;
            dropsRef.current.push({
              x: d.x,
              y: poolY,
              vx: Math.cos(angle) * (1 + Math.random() * 2),
              vy: -(1.5 + Math.random() * 2.5),
              r: 1.5 + Math.random() * 2,
              a: 0.6,
              splash: true,
              life: 1,
              done: false,
            });
          }
        }
      });

      // Splash particles
      dropsRef.current = dropsRef.current.filter((d) => {
        if (!d.splash) return !d.done || true;
        d.vy += 0.1;
        d.x += d.vx;
        d.y += d.vy;
        d.life -= 0.04;
        if (d.life <= 0) return false;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,170,255,${d.life * 0.6})`;
        ctx.fill();
        return true;
      });

      // Pool ripples
      ringsRef.current = ringsRef.current.filter((rp) => rp.a > 0.01);
      if (ringsRef.current.length > 8) {
        ringsRef.current = ringsRef.current.slice(-8);
      }
      ringsRef.current.forEach((rp) => {
        rp.r += rp.speed;
        rp.a *= 0.97;
        ctx.beginPath();
        ctx.ellipse(rp.x, rp.y, rp.r, rp.r * 0.3, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(100,180,255,${rp.a})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Pool surface shimmer
      const poolY = canvas.height - 60;
      const grad = ctx.createLinearGradient(0, poolY, 0, canvas.height);
      grad.addColorStop(0, "rgba(0,87,255,0.18)");
      grad.addColorStop(1, "rgba(0,30,100,0.08)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, poolY, canvas.width, 60);

      // Shimmer line
      const shimmer = ctx.createLinearGradient(0, poolY, canvas.width, poolY);
      shimmer.addColorStop(0, "transparent");
      shimmer.addColorStop(0.4, "rgba(150,200,255,0.4)");
      shimmer.addColorStop(0.6, "rgba(255,255,255,0.6)");
      shimmer.addColorStop(1, "transparent");
      ctx.strokeStyle = shimmer;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, poolY);
      ctx.lineTo(canvas.width, poolY);
      ctx.stroke();

      rafRef.current = requestAnimationFrame(anim);
    };
    anim();

    return () => {
      clearInterval(iv);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <footer className="footer-new">
      <div className="footer-drop-pool" ref={poolRef} aria-hidden="true">
        <canvas ref={canvasRef} className="footer-drop-canvas" />
      </div>
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo-big">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: "var(--blue-light)" }}
            >
              <path d="M12 2C6 8 4 12 4 15a8 8 0 0016 0c0-3-2-7-8-13z" />
            </svg>
            AQUA<span>PURA</span>
          </div>
          <p className="footer-tagline">
            Molecular purity.
            <br />
            Engineered for life.
          </p>
          <div className="footer-socials">
            {["𝕏", "in", "f", "▶"].map((s, i) => (
              <div key={i} className="social-dot">
                {s}
              </div>
            ))}
          </div>
        </div>

        {Object.entries(FOOTER_LINKS).map(([cat, links]) => (
          <div key={cat} className="footer-col">
            <div className="footer-col-head">{cat}</div>
            {links.map((l) => (
              <button type="button" key={l} className="footer-link">
                {l}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>© 2026 AquaPura Systems Pvt. Ltd. · Bengaluru, India</span>
          <div className="footer-cert">
            <span className="cert-badge">WHO Certified</span>
            <span className="cert-badge">BIS Approved</span>
            <span className="cert-badge">ISO 9001:2015</span>
          </div>
          <span>Engineered for Absolute Purity.</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGES ──────────────────────────────────────────────── */
function HomePage({ navigate, tds }) {
  useReveal(["home"]);
  return (
    <div className="page-home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-grid" />
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-dot" />
              2026 Collection Now Live
            </div>
            <h1 className="hero-h1">
              Water,
              <br />
              <em>Perfected</em>
              <br />
              at the Atom.
            </h1>
            <p className="hero-sub">
              AquaPura's multi-stage molecular filtration system removes 99.9%
              of contaminants while restoring essential minerals —
              intelligently, beautifully.
            </p>
            <div className="hero-actions">
              <button
                className="btn-primary"
                onClick={() => navigate("products")}
              >
                Explore Models
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button className="btn-ghost" onClick={() => navigate("about")}>
                Our Technology
              </button>
            </div>
            <div className="hero-stats">
              <div>
                <div className="stat-num">99.9%</div>
                <div className="stat-lbl">Purity Rate</div>
              </div>
              <div>
                <div className="stat-num">14</div>
                <div className="stat-lbl">Filter Stages</div>
              </div>
              <div>
                <div className="stat-num">1:1</div>
                <div className="stat-lbl">Waste Ratio</div>
              </div>
            </div>
          </div>
          <HeroVisual tds={tds} />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-strip">
        <div className="marquee-inner">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i}>
              {item}
              {i < MARQUEE_ITEMS.length - 1 && <span className="sep"> ◆ </span>}
            </span>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section className="features-section">
        <div className="features-inner">
          <div className="section-header reveal">
            <div className="page-eyebrow">Why AquaPura</div>
            <h2 className="section-h">
              Not just filtered — <em>perfected</em>.
            </h2>
            <p className="section-sub">
              Every drop engineered to exceed WHO purity standards, while
              restoring what your body truly needs.
            </p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="pillar-card reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="pillar-icon">{f.icon}</div>
                <div className="pillar-h small">{f.title}</div>
                <p className="pillar-p">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — NEW */}
      <HowItWorks />

      {/* STATS COUNTER — NEW */}
      <StatsSection />

      {/* TESTIMONIALS — NEW */}
      <TestimonialsSection />

      {/* CTA BANNER — NEW */}
      <CTABanner navigate={navigate} />

      <Footer />
    </div>
  );
}

function AboutPage() {
  useReveal(["about"]);
  return (
    <div>
      <div className="about-hero">
        <div className="page-eyebrow">Our Story</div>
        <h1 className="page-h1">
          Redefining What
          <br />
          Pure Means.
        </h1>
        <p className="page-sub">
          Founded in 2018 in Bangalore, AquaPura was born from a single
          obsession: what if water could be genuinely perfect?
        </p>
      </div>

      <div className="pillars">
        {PILLARS.map((p, i) => (
          <div
            key={i}
            className="pillar-card reveal"
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <div className="pillar-icon">{p.icon}</div>
            <h3 className="pillar-h">{p.title}</h3>
            <p className="pillar-p">{p.desc}</p>
          </div>
        ))}
      </div>

      <RippleZone />

      <div className="timeline-section">
        <div className="section-header">
          <div className="page-eyebrow">Our Journey</div>
          <h2 className="section-h">Built milestone by milestone.</h2>
        </div>
        <div className="timeline">
          {TIMELINE.map((t, i) => (
            <div
              key={i}
              className="tl-item"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="tl-dot">{t.dot}</div>
              <div className="tl-content">
                <div className="tl-year">{t.year}</div>
                <h4>{t.title}</h4>
                <p>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

function ProductCard({ p, navigate }) {
  const SVGModel = MODEL_SVG[p.id];
  return (
    <div className={`prod-card reveal ${p.dark ? "dark-card" : ""}`}>
      <div className={`prod-image-area ${p.bgClass}`}>
        <div className={`prod-badge ${p.badgeDark ? "dark" : ""}`}>
          {p.badge}
        </div>
        <SVGModel />
      </div>
      <div className="prod-body">
        <div className="prod-name">{p.name}</div>
        <div className="prod-tagline">{p.tagline}</div>
        <div className="prod-specs">
          {p.specs.map((s, i) => (
            <div key={i} className="spec-row">
              <span className="check">✦</span> {s}
            </div>
          ))}
        </div>
        <div className="prod-footer">
          <div className={`prod-price ${p.dark ? "white" : ""}`}>
            <small style={p.dark ? { color: "rgba(255,255,255,0.5)" } : {}}>
              Starting at
            </small>
            {p.price}
          </div>
          <button
            className={`btn-order ${p.btnLight ? "light" : ""}`}
            onClick={() => navigate("contact")}
          >
            {p.btnLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductsPage({ navigate }) {
  useReveal(["products"]);
  return (
    <div>
      <div className="products-hero">
        <div className="page-eyebrow">Our Collection</div>
        <h1 className="page-h1">
          Masterpieces of
          <br />
          Engineering.
        </h1>
        <p className="page-sub">
          Two models. One obsession. Choose the AquaPura that fits your life —
          both redefine what pure water means.
        </p>
      </div>

      <div className="products-grid">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} p={p} navigate={navigate} />
        ))}
      </div>

      <div className="comparison-section">
        <div className="section-header">
          <div className="page-eyebrow">Compare</div>
          <h2 className="section-h">Find your perfect model.</h2>
        </div>
        <div className="comp-table reveal">
          <div className="comp-row">
            <div className="comp-cell comp-head">Feature</div>
            <div className="comp-cell comp-head">Elite X-1</div>
            <div className="comp-cell comp-head">Element Pro</div>
            <div className="comp-cell comp-head">HydroCore S</div>
          </div>
          {COMP_ROWS.map((row, i) => (
            <div key={i} className="comp-row">
              <div className="comp-cell">{row.label}</div>
              {row.vals.map((v, j) => (
                <div key={j} className="comp-cell">
                  {v === true ? (
                    <span className="comp-check">✓</span>
                  ) : v === false ? (
                    <span className="comp-dash">—</span>
                  ) : (
                    v
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  useReveal(["contact"]);
  return (
    <div>
      <div className="contact-wrap">
        <div className="contact-left reveal-left">
          <div className="page-eyebrow" style={{ marginBottom: "1.5rem" }}>
            Get In Touch
          </div>
          <h1>
            Bring Purity
            <br />
            Home Today.
          </h1>
          <p>
            Whether you need a bespoke installation, a water quality test, or
            simply want to find your ideal model — our Hydration Consultants are
            ready.
          </p>
          <div className="contact-info">
            {[
              { icon: "📞", label: "Expert Helpline", val: "+91 800-AQUAPURA" },
              {
                icon: "✉️",
                label: "Email Support",
                val: "consult@aquapura.in",
              },
              {
                icon: "📍",
                label: "Headquarters",
                val: "Whitefield, Bengaluru 560066",
              },
              { icon: "🕐", label: "Hours", val: "Mon – Sat, 9 AM – 7 PM IST" },
            ].map((c, i) => (
              <div key={i} className="contact-info-row">
                <div className="contact-info-icon">{c.icon}</div>
                <div className="contact-info-text">
                  <span>{c.label}</span>
                  <strong>{c.val}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-card reveal">
          {submitted ? (
            <div className="form-success">
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💧</div>
              <h3>Request Received!</h3>
              <p>A Hydration Consultant will reach out within 24 hours.</p>
            </div>
          ) : (
            <div className="contact-form">
              <h3>Request a Consultation</h3>
              <p className="form-sub">
                Free water quality assessment included.
              </p>
              <div className="form-2col">
                <div className="form-row">
                  <label>First Name</label>
                  <input type="text" placeholder="Rahul" />
                </div>
                <div className="form-row">
                  <label>Last Name</label>
                  <input type="text" placeholder="Sharma" />
                </div>
              </div>
              <div className="form-row">
                <label>Email Address</label>
                <input type="email" placeholder="rahul@email.com" />
              </div>
              <div className="form-row">
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 98765 43210" />
              </div>
              <div className="form-row">
                <label>Model of Interest</label>
                <select>
                  <option value="">Select a model...</option>
                  <option>AquaPura Elite X-1 — ₹89,999</option>
                  <option>AquaPura Element Pro — ₹64,999</option>
                  <option>HydroCore S — ₹49,999</option>
                  <option>Obsidian One — ₹1,49,999</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div className="form-row">
                <label>Requirements / Message</label>
                <textarea
                  rows="3"
                  placeholder="Tell us about your home, family size, or any water quality concerns..."
                />
              </div>
              <button className="submit-btn" onClick={() => setSubmitted(true)}>
                Request Consultation
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="map-section">
        <div className="section-header" style={{ marginBottom: "2rem" }}>
          <div className="page-eyebrow">Find Us</div>
          <h2 className="section-h" style={{ fontSize: "2rem" }}>
            Visit our Experience Centre
          </h2>
        </div>
        <div className="map-inner">
          <div style={{ textAlign: "center" }}>
            <div className="map-pin">📍</div>
            <p
              style={{
                marginTop: "0.5rem",
                color: "var(--muted)",
                fontSize: "0.9rem",
              }}
            >
              AquaPura Experience Centre, Whitefield, Bengaluru
            </p>
            <button
              className="btn-primary"
              style={{
                marginTop: "1.2rem",
                fontSize: "0.82rem",
                padding: "0.7rem 1.5rem",
              }}
              onClick={() => window.open("https://maps.google.com", "_blank")}
            >
              Open in Maps
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* ─── APP ────────────────────────────────────────────────── */
export default function AquaPura() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tds, setTds] = useState(280);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let val = 280;
    const iv = setInterval(() => {
      val = Math.max(2, val - Math.floor(Math.random() * 3 + 1));
      setTds(val);
      if (val <= 2) clearInterval(iv);
    }, 180);
    const t = setTimeout(() => clearInterval(iv), 30000);
    return () => {
      clearInterval(iv);
      clearTimeout(t);
    };
  }, []);

  const navigate = useCallback((p) => {
    setPage(p);
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, []);

  const pages = {
    home: <HomePage navigate={navigate} tds={tds} />,
    about: <AboutPage />,
    products: <ProductsPage navigate={navigate} />,
    contact: <ContactPage />,
  };

  return (
    <>
      <nav className={scrolled ? "scrolled" : ""}>
        <button
          type="button"
          className="nav-logo"
          onClick={() => navigate("home")}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6 8 4 12 4 15a8 8 0 0016 0c0-3-2-7-8-13z" />
          </svg>
          AQUA<span>PURA</span>
        </button>
        <div className="nav-links">
          {NAV_LINKS.map((p) => (
            <button
              type="button"
              key={p}
              onClick={() => navigate(p)}
              className={page === p ? "active" : ""}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
          <button className="nav-cta" onClick={() => navigate("contact")}>
            Get a Quote
          </button>
        </div>
        <button className="hamburger" onClick={() => setMobileOpen((v) => !v)}>
          <span />
          <span />
          <span />
        </button>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu open">
          {NAV_LINKS.map((p) => (
            <button type="button" key={p} onClick={() => navigate(p)}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      )}

      <main className="page-wrap" key={page}>
        {pages[page]}
      </main>
    </>
  );
}
