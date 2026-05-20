import { useState, useEffect, useRef, useCallback } from "react";

/* ─── GLOBAL STYLES ──────────────────────────────────────── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --white:      #ffffff;
  --off-white:  #f7f8fc;
  --light-gray: #D3D3D3;
  --mid-gray:   #808080;
  --muted:      black;
  --dark:       #111827;
  --darkest:    #040810;
  --blue:       #ff6200;
  --blue-light: #ff6200;
  --blue-pale:  #ffffff;
  --blue-mid:   #ff6200;
  --ink:        #1e2840;
  --text-color: #ff6200;    
  --font-display: 'Cormorant Garamond', serif;
  --font-body:    'DM Sans', sans-serif;
}

html { scroll-behavior: smooth; overflow-x: hidden; }
body {
  font-family: var(--font-body);
  background: var(--white);
  color: var(--dark);
  overflow-x: hidden;
}

button { font: inherit; }

nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  height: 72px;
  display: flex; align-items: center; gap: 1.5rem;
  padding: 0 4vw;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0,0,0,0.06);
  transition: background 0.3s, box-shadow 0.3s;
  animation: navDropIn .55s cubic-bezier(.2,.75,.2,1) both;
}
@keyframes navDropIn {
  from { opacity: 0; transform: translateY(-18px); }
  to   { opacity: 1; transform: translateY(0); }
}
nav.scrolled {
  background: rgba(255,255,255,0.98);
  box-shadow: 0 2px 30px rgba(0,87,255,0.06);
}
.nav-logo {
  font-family: var(--font-display); font-size: 1.6rem; font-weight: 700;
  color: var(--darkest); letter-spacing: -0.5px; cursor: pointer;
  display: flex; align-items: center; gap: 8px;
  border: 0; background: transparent; padding: .45rem .2rem;
  transition: transform .25s ease, color .25s ease;
}
.nav-logo:hover { color: var(--blue); transform: translateY(-1px); }
.nav-logo svg { color: var(--blue); filter: drop-shadow(0 6px 14px rgba(0,87,255,.28)); transition: transform .35s ease; }
.nav-logo:hover svg { transform: rotate(-8deg) scale(1.08); }
.nav-logo span { color: var(--blue); }
.nav-links { margin-left: auto; display: flex; gap: 2.5rem; align-items: center; }
.nav-links button:not(.nav-cta) {
  position: relative; border: 0; background: transparent; color: var(--ink); cursor: pointer;
  font-size: .88rem; font-weight: 600; letter-spacing: .03em; padding: .65rem .05rem;
  opacity: .72; transition: color .25s ease, opacity .25s ease, transform .25s ease;
}
.nav-links button:not(.nav-cta)::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: .3rem;
  height: 2px; border-radius: 999px;
  background: linear-gradient(90deg, var(--blue), var(--blue-light));
  transform: scaleX(0); transform-origin: right; transition: transform .28s ease;
}
.nav-links button:not(.nav-cta):hover,
.nav-links button:not(.nav-cta).active { color: var(--blue); opacity: 1; transform: translateY(-1px); }
.nav-links button:not(.nav-cta):hover::after,
.nav-links button:not(.nav-cta).active::after { transform: scaleX(1); transform-origin: left; }
.nav-cta {
  background: var(--blue); color: #fff; border: none;
  padding: 0.6rem 1.5rem; border-radius: 100px;
  font-family: var(--font-body); font-size: 0.85rem; font-weight: 600;
  cursor: pointer; margin-left: 1rem; overflow: hidden; position: relative;
  box-shadow: 0 4px 20px rgba(0,87,255,0.25);
  transition: transform 0.2s, box-shadow 0.2s;
}
.nav-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,87,255,0.35); }
.nav-cta::before {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(110deg, transparent 0%, rgba(255,255,255,.34) 45%, transparent 60%);
  transform: translateX(-120%); transition: transform .65s ease;
}
.nav-cta:hover::before { transform: translateX(120%); }
.hamburger {
  display: none; flex-direction: column; gap: 5px;
  background: rgba(0,87,255,.06); border: none; cursor: pointer;
  padding: 4px; margin-left: auto; width: 42px; height: 42px;
  align-items: center; justify-content: center; border-radius: 14px;
  transition: background .25s ease, transform .25s ease;
}
.hamburger:hover { background: rgba(0,87,255,.12); transform: translateY(-1px); }
.hamburger span { width: 24px; height: 2px; background: var(--dark); border-radius: 2px; }
.mobile-menu {
  display: none; position: fixed; top: 72px; left: 0; right: 0;
  background: rgba(255,255,255,.96); backdrop-filter: blur(18px);
  padding: 2rem; z-index: 999;
  border-bottom: 1px solid var(--light-gray);
  flex-direction: column; gap: 1.5rem;
  animation: menuSlide .28s ease both;
  box-shadow: 0 24px 50px rgba(4,8,16,.08);
}
.mobile-menu.open { display: flex; }
.mobile-menu button { font-size: 1.05rem; color: var(--dark); border: 0; background: transparent; cursor: pointer; text-align: left; padding: .85rem 0; width: 100%; }
@keyframes menuSlide { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 768px) { .nav-links { display: none; } .hamburger { display: flex; } nav { height: 68px; padding: 0 1.25rem; } }

.page-wrap { animation: pageFadeIn 0.5s ease both; isolation: isolate; }
@keyframes pageFadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

.hero {
  min-height: 100vh; display: flex; align-items: center;
  position: relative; overflow: hidden;
  padding: 120px 4vw 60px;
  background-image: url('/assets/HOME.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-bg-grid {
  position: absolute; inset: 0; z-index: 0;
  background-image: linear-gradient(rgba(0,87,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,87,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}

.hero-glow {
  position: absolute; top: -100px; right: -100px;
  width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(0,87,255,0.08) 0%, transparent 70%);
  pointer-events: none; z-index: 0;
}
.hero-glow2 {
  position: absolute; bottom: -200px; left: -100px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(100,180,255,0.06) 0%, transparent 70%);
  pointer-events: none; z-index: 0;
}
.hero-inner {
  max-width: 1200px; margin: 0 auto; width: 100%;
  display: grid; grid-template-columns: 1fr 1.4fr; gap: 5rem; align-items: center;
  position: relative; z-index: 1;
}

.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--blue-pale); color: var(--blue);
  border: 1px solid rgba(0,87,255,0.2); padding: 0.4rem 1rem;
  border-radius: 100px; font-size: 0.78rem; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 1.8rem;
  animation: fadeSlideUp 0.6s ease both;
}
.badge-dot { width: 6px; height: 6px; background: var(--blue); border-radius: 50%; animation: pulse 2s infinite; }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
.hero-h1 {
  font-family: var(--font-display);
  font-size: clamp(3.2rem, 5.5vw, 6rem);
  font-weight: 700; line-height: 1.02; letter-spacing: -2px;
  color: var(--off-white); margin-bottom: 1.5rem;
  animation: fadeSlideUp 0.7s 0.1s ease both;
}
.hero-h1 em { font-style: italic; color: var(--blue); }
.hero-sub { color: var(--off-white); font-size: 1.08rem; line-height: 1.7; max-width: 430px; margin-bottom: 2.5rem; animation: fadeSlideUp 0.7s 0.2s ease both; }
.hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; animation: fadeSlideUp 0.7s 0.3s ease both; }
.hero-stats { display: flex; gap: 2.5rem; margin-top: 3.5rem; padding-top: 2.5rem; border-top: 1px solid var(--light-gray); animation: fadeSlideUp 0.7s 0.4s ease both; }
.stat-num { font-family: var(--font-display); font-size: 2.4rem; font-weight: 700; color: var(--blue); line-height: 1; }
.stat-lbl { font-size: 0.78rem; color: var(--muted); margin-top: 4px; }
@keyframes fadeSlideUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }

.hero-visual { display: flex; justify-content: flex-end; align-items: center; position: relative; height: 540px; animation: fadeSlideUp 0.9s 0.2s ease both; }
.ro-stage-wrapper { position: relative; width: 340px; height: 480px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.btn-primary { background: var(--blue); color: #fff; border: none; padding: 0.9rem 2rem; border-radius: 100px; font-family: var(--font-body); font-size: 0.9rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 14px 40px var(--white); transition: transform 0.2s, box-shadow 0.2s; position: relative; overflow: hidden; }
.btn-primary::before { content: ""; position: absolute; inset: 0; background: linear-gradient(110deg, transparent 0%, rgba(255,255,255,.34) 45%, transparent 60%); transform: translateX(-120%); transition: transform .65s ease; }
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 14px 40px var(--white); }
.btn-primary:hover::before { transform: translateX(120%); }
.btn-ghost { background: transparent; color: var(--white); border: 1.5px solid var(--mid-gray); padding: 0.9rem 2rem; border-radius: 100px; font-family: var(--font-body); font-size: 0.9rem; font-weight: 500; cursor: pointer; transition: border-color 0.2s, color 0.2s, transform 0.2s; }
.btn-ghost:hover { border-color: var(--blue); color: var(--blue); transform: translateY(-2px); }

.features-section { padding: 80px 4vw; background: var(--white); }
.features-inner { max-width: 1200px; margin: 0 auto; }
.features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-top: 3rem; }
.pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; max-width: 1200px; margin: 0 auto; padding: 80px 4vw; }
.pillar-card { background: var(--white); border: 1px solid var(--light-gray); border-radius: 24px; padding: 2.5rem; transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
.pillar-card:hover { transform: translateY(-8px); box-shadow: 0 10px 30px rgba(0,87,255,0.08); border-color: rgba(0,87,255,0.3); }
.pillar-icon { width: 56px; height: 56px; border-radius: 16px; background: var(--blue-pale); display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; font-size: 1.5rem; }
.pillar-h { font-family: var(--font-display); font-size: 1.5rem; font-weight: 600; margin-bottom: 0.8rem; color: var(--darkest); }
.pillar-h.small { font-size: 1.15rem; }
.pillar-p { color: var(--muted); font-size: 0.92rem; line-height: 1.6; }

.section-header { text-align: center; margin-bottom: 4rem; }
.section-h { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 700; color: var(--darkest); letter-spacing: -1.5px; margin-bottom: 0.8rem; }
.section-h em { font-style: italic; color: var(--text-color); }
.section-sub { color: var(--muted); font-size: 1rem; max-width: 500px; margin: 0 auto; }
.page-eyebrow { display: inline-block; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--blue); background: var(--blue-pale); border: 1px solid rgba(0,87,255,0.2); padding: 0.4rem 1rem; border-radius: 100px; margin-bottom: 1.5rem; }
.page-h1 { font-family: var(--font-display); font-size: clamp(2.8rem, 5vw, 5.5rem); font-weight: 700; line-height: 1.05; color: var(--darkest); letter-spacing: -2px; max-width: 700px; margin: 0 auto 1.5rem; }
.page-sub { color: var(--muted); font-size: 1.1rem; line-height: 1.7; max-width: 520px; margin: 0 auto 3rem; }

/* ─── HOME PRODUCT SHOWCASE ────────────────────────────── */
.home-products-section {
  padding: 120px 4vw;
  background: linear-gradient(180deg, #fff 0%, #f7f8fc 50%, #fff 100%);
  position: relative;
  overflow: hidden;
}
.home-products-section::before {
  content: '';
  position: absolute;
  top: -200px; left: 50%;
  transform: translateX(-50%);
  width: 900px; height: 900px;
  background: radial-gradient(circle, rgba(255,98,0,0.04) 0%, transparent 65%);
  pointer-events: none;
}
.home-products-inner { max-width: 1300px; margin: 0 auto; }

.home-products-tabs {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 4rem;
  background: #f1f3f8;
  border-radius: 100px;
  padding: 6px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}
.home-products-tab {
  border: none;
  background: transparent;
  padding: 0.6rem 1.6rem;
  border-radius: 100px;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--mid-gray);
  cursor: pointer;
  transition: all 0.25s ease;
}
.home-products-tab.active {
  background: var(--white);
  color: var(--dark);
  box-shadow: 0 2px 16px rgba(0,0,0,0.1);
}

.home-products-stage {
  display: grid;
  grid-template-columns: 1fr 1.1fr 1fr;
  gap: 2rem;
  align-items: end;
  min-height: 620px;
}

/* Side product cards */
.hps-side-card {
  background: var(--white);
  border: 1px solid var(--light-gray);
  border-radius: 28px;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  cursor: pointer;
  transition: transform 0.35s cubic-bezier(.2,.75,.2,1), box-shadow 0.35s ease, border-color 0.35s ease, opacity 0.35s ease;
  opacity: 0.72;
  position: relative;
  overflow: hidden;
}
.hps-side-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,98,0,0.04) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.35s ease;
}
.hps-side-card:hover,
.hps-side-card.active {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 24px 60px rgba(255,98,0,0.12);
  border-color: rgba(255,98,0,0.35);
  opacity: 1;
}
.hps-side-card:hover::before,
.hps-side-card.active::before { opacity: 1; }

.hps-card-img {
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.hps-card-img img {
  max-height: 200px;
  max-width: 100%;
  object-fit: contain;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.15));
  transition: transform 0.5s cubic-bezier(.2,.75,.2,1), filter 0.5s ease;
}
.hps-side-card:hover .hps-card-img img,
.hps-side-card.active .hps-card-img img {
  transform: translateY(-10px) scale(1.06);
  filter: drop-shadow(0 30px 60px rgba(255,98,0,0.25));
}

.hps-card-tag {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--blue);
  background: rgba(255,98,0,0.08);
  padding: 0.3rem 0.9rem;
  border-radius: 100px;
  width: fit-content;
}
.hps-card-name {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--darkest);
  line-height: 1.1;
}
.hps-card-price {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--blue);
}
.hps-card-price small {
  font-size: 0.75rem;
  color: var(--mid-gray);
  font-family: var(--font-body);
  font-weight: 400;
  display: block;
  margin-bottom: 2px;
}
.hps-card-spec {
  font-size: 0.82rem;
  color: var(--mid-gray);
  display: flex;
  align-items: center;
  gap: 6px;
}
.hps-card-spec::before {
  content: '';
  width: 5px; height: 5px;
  background: var(--blue);
  border-radius: 50%;
  flex-shrink: 0;
}

/* Center hero product */
.hps-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-bottom: 2rem;
}

.hps-center-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, rgba(255,98,0,0.12) 0%, transparent 65%);
  pointer-events: none;
  z-index: 0;
  animation: glowPulse 3s ease-in-out infinite;
}
@keyframes glowPulse {
  0%,100% { opacity: 0.8; transform: translate(-50%, -55%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -55%) scale(1.1); }
}

.hps-center-rings {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -52%);
  width: 500px;
  height: 500px;
  pointer-events: none;
  z-index: 0;
}
.hps-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255,98,0,0.1);
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  animation: ringPulse 3s ease-in-out infinite;
}
.hps-ring:nth-child(1) { width: 200px; height: 200px; animation-delay: 0s; }
.hps-ring:nth-child(2) { width: 320px; height: 320px; animation-delay: 0.5s; border-color: rgba(255,98,0,0.07); }
.hps-ring:nth-child(3) { width: 440px; height: 440px; animation-delay: 1s; border-color: rgba(255,98,0,0.04); }
@keyframes ringPulse {
  0%,100% { opacity: 0.6; transform: translate(-50%,-50%) scale(0.97); }
  50% { opacity: 1; transform: translate(-50%,-50%) scale(1.03); }
}

.hps-center-img-wrap {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 1rem;
}
.hps-center-img-wrap img {
  max-height: 480px;
  max-width: 90%;
  object-fit: contain;
  filter: drop-shadow(0 40px 80px rgba(255,98,0,0.2)) drop-shadow(0 0 0px rgba(0,0,0,0.1));
  transition: transform 0.6s cubic-bezier(.2,.75,.2,1), filter 0.6s ease;
  animation: heroFloat 5s ease-in-out infinite;
}
@keyframes heroFloat {
  0%,100% { transform: translateY(0px) rotate(-1deg); }
  50% { transform: translateY(-18px) rotate(1deg); }
}
.hps-center-img-wrap img:hover {
  animation-play-state: paused;
  filter: drop-shadow(0 50px 100px rgba(255,98,0,0.3)) drop-shadow(0 0 0px rgba(0,0,0,0.1));
}

.hps-center-shadow {
  width: 200px;
  height: 30px;
  background: radial-gradient(ellipse, rgba(0,0,0,0.15) 0%, transparent 70%);
  border-radius: 50%;
  margin-top: -1rem;
  animation: shadowPulse 5s ease-in-out infinite;
  z-index: 1;
  position: relative;
}
@keyframes shadowPulse {
  0%,100% { transform: scaleX(0.85); opacity: 0.6; }
  50% { transform: scaleX(1.1); opacity: 0.3; }
}

.hps-center-info {
  text-align: center;
  margin-top: 2rem;
  z-index: 2;
  position: relative;
}
.hps-center-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(255,98,0,0.1);
  color: var(--blue);
  border: 1px solid rgba(255,98,0,0.25);
  padding: 0.4rem 1rem;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}
.hps-center-name {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 700;
  color: var(--darkest);
  letter-spacing: -1px;
  margin-bottom: 0.5rem;
}
.hps-center-tagline {
  color: var(--mid-gray);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
}

.hps-center-chips {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.hps-chip {
  background: #f1f3f8;
  color: var(--dark);
  border-radius: 100px;
  padding: 0.4rem 1rem;
  font-size: 0.78rem;
  font-weight: 500;
  border: 1px solid var(--light-gray);
  transition: background 0.2s, border-color 0.2s;
}
.hps-chip:hover {
  background: rgba(255,98,0,0.08);
  border-color: rgba(255,98,0,0.3);
}

.hps-center-actions {
  display: flex;
  gap: 0.8rem;
  justify-content: center;
}

.hps-btn-order {
  background: var(--blue);
  color: #fff;
  border: none;
  padding: 0.85rem 2.2rem;
  border-radius: 100px;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(255,98,0,0.3);
  transition: transform 0.2s, box-shadow 0.2s;
}
.hps-btn-order::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(110deg, transparent 0%, rgba(255,255,255,.3) 45%, transparent 60%);
  transform: translateX(-120%);
  transition: transform 0.65s ease;
}
.hps-btn-order:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(255,98,0,0.4); }
.hps-btn-order:hover::before { transform: translateX(120%); }

.hps-btn-details {
  background: transparent;
  color: var(--dark);
  border: 1.5px solid var(--light-gray);
  padding: 0.85rem 1.8rem;
  border-radius: 100px;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, transform 0.2s;
}
.hps-btn-details:hover { border-color: var(--blue); color: var(--blue); transform: translateY(-2px); }

/* floating spec labels */
.hps-float-label {
  position: absolute;
  background: var(--white);
  border: 1px solid rgba(255,98,0,0.2);
  border-radius: 14px;
  padding: 0.6rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--dark);
  white-space: nowrap;
  box-shadow: 0 8px 30px rgba(255,98,0,0.1);
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 3;
}
.hps-float-label .fl-dot {
  width: 6px; height: 6px;
  background: var(--blue);
  border-radius: 50%;
  flex-shrink: 0;
  animation: pulse 2s infinite;
}
.hps-fl-1 { top: 10%; left: -30px; animation: floatLabel1 6s ease-in-out infinite; }
.hps-fl-2 { top: 35%; right: -40px; animation: floatLabel2 7s ease-in-out infinite; }
.hps-fl-3 { bottom: 28%; left: -20px; animation: floatLabel1 8s 1s ease-in-out infinite; }
@keyframes floatLabel1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes floatLabel2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(10px)} }

/* bottom product strip */
.hps-bottom-strip {
  display: flex;
  gap: 1.5rem;
  margin-top: 4rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scrollbar-width: none;
}
.hps-bottom-strip::-webkit-scrollbar { display: none; }

.hps-strip-item {
  flex: 0 0 auto;
  background: var(--white);
  border: 1px solid var(--light-gray);
  border-radius: 20px;
  padding: 1.2rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  min-width: 220px;
}
.hps-strip-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(255,98,0,0.1);
  border-color: rgba(255,98,0,0.3);
}
.hps-strip-thumb {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f8fc;
  border-radius: 14px;
  flex-shrink: 0;
}
.hps-strip-thumb img {
  max-height: 52px;
  max-width: 52px;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.12));
  transition: transform 0.3s ease;
}
.hps-strip-item:hover .hps-strip-thumb img { transform: scale(1.1) translateY(-3px); }
.hps-strip-name { font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; color: var(--darkest); }
.hps-strip-price { font-size: 0.88rem; color: var(--blue); font-weight: 600; margin-top: 2px; }

/* ─── SPARE PARTS SECTION ────────────────────────────── */
.spare-parts-section {
  padding: 120px 4vw;
  background: var(--darkest);
  position: relative;
  overflow: hidden;
}
.spare-parts-section::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,98,0,0.5), transparent);
}
.spare-parts-section::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,98,0,0.3), transparent);
}

.sp-bg-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.sp-orb-1 {
  top: -200px; left: -150px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(255,98,0,0.08) 0%, transparent 65%);
}
.sp-orb-2 {
  bottom: -150px; right: -100px;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(255,140,60,0.06) 0%, transparent 65%);
}

.spare-parts-inner { max-width: 1400px; margin: 0 auto; position: relative; z-index: 1; }

.sp-header { text-align: center; margin-bottom: 3.5rem; }
.sp-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.78rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--blue);
  background: rgba(255,98,0,0.1);
  border: 1px solid rgba(255,98,0,0.25);
  padding: 0.45rem 1.1rem; border-radius: 100px;
  margin-bottom: 1.5rem;
}
.sp-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4vw, 3.8rem);
  font-weight: 700;
  color: #fff;
  letter-spacing: -1.5px;
  line-height: 1.05;
  margin-bottom: 1rem;
}
.sp-title em { font-style: italic; color: var(--blue); }
.sp-sub { color: rgba(255,255,255,0.5); font-size: 1rem; max-width: 480px; margin: 0 auto 2.5rem; line-height: 1.7; }

/* Filter pills */
.sp-filters {
  display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;
  margin-bottom: 3.5rem;
}
.sp-filter-btn {
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.55);
  padding: 0.5rem 1.2rem;
  border-radius: 100px;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all 0.25s ease;
}
.sp-filter-btn:hover {
  border-color: rgba(255,98,0,0.4);
  background: rgba(255,98,0,0.08);
  color: rgba(255,255,255,0.85);
}
.sp-filter-btn.active {
  background: var(--blue);
  border-color: var(--blue);
  color: #fff;
  box-shadow: 0 4px 20px rgba(255,98,0,0.35);
}

/* Masonry-style bento grid */
.sp-bento {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 180px;
  gap: 16px;
}

.sp-part-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: transform 0.35s cubic-bezier(.2,.75,.2,1),
              box-shadow 0.35s ease,
              border-color 0.35s ease;
  display: flex; flex-direction: column;
  opacity: 1;
  transform: none;
}
.sp-part-card.visible {
  opacity: 1;
  transform: translateY(0);
}
@keyframes spCardIn {
  to { opacity: 1; transform: translateY(0); }
}

.sp-part-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 20px 60px rgba(255,98,0,0.18);
  border-color: rgba(255,98,0,0.4);
  z-index: 2;
}

/* size variants */
.sp-part-card.sz-tall   { grid-row: span 2; }
.sp-part-card.sz-wide   { grid-column: span 2; }
.sp-part-card.sz-big    { grid-column: span 2; grid-row: span 2; }

.sp-img-wrap {
  flex: 1;
  min-height: 0;       
  height: 100%; 
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(255,255,255,0.02);
  position: relative;
  overflow: hidden;
}

.sp-img-wrap::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(255,98,0,0.08) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.35s ease;
}
.sp-part-card:hover .sp-img-wrap::before { opacity: 1; }

.sp-img-wrap img {
  max-width: 80%;
  max-height: 110px;   /* explicit pixel height */
  width: auto;
  height: auto;
  object-fit: contain;
  filter: brightness(0.92) contrast(1.05);
  transition: transform 0.5s cubic-bezier(.2,.75,.2,1), filter 0.5s ease;
}
.sp-part-card:hover .sp-img-wrap img {
  transform: scale(1.1) translateY(-4px);
  filter: brightness(1.05) contrast(1.08) drop-shadow(0 12px 24px rgba(255,98,0,0.3));
}

/* tall/big cards show more image */
.sp-part-card.sz-tall .sp-img-wrap,
.sp-part-card.sz-big .sp-img-wrap { padding: 2rem; }

.sp-card-info {
  padding: 0.85rem 1rem 0.9rem;
  border-top: 1px solid rgba(255,255,255,0.06);
  background: rgba(0,0,0,0.3);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.sp-part-name {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sp-part-card.sz-tall .sp-part-name,
.sp-part-card.sz-big .sp-part-name { font-size: 1.1rem; }

.sp-part-cat {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--blue);
  flex-shrink: 0;
  background: rgba(255,98,0,0.12);
  border: 1px solid rgba(255,98,0,0.25);
  padding: 0.2rem 0.6rem;
  border-radius: 100px;
}

/* hover overlay with "View" */
.sp-hover-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex; align-items: center; justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(2px);
  z-index: 3;
  border-radius: 20px;
}
.sp-part-card:hover .sp-hover-overlay { opacity: 1; }
.sp-view-btn {
  background: var(--blue);
  color: #fff;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 100px;
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  display: flex; align-items: center; gap: 6px;
  box-shadow: 0 8px 24px rgba(255,98,0,0.4);
  transition: transform 0.2s ease;
}
.sp-view-btn:hover { transform: scale(1.05); }

/* bottom CTA strip */
.sp-bottom-cta {
  margin-top: 3.5rem;
  display: flex; align-items: center; justify-content: space-between;
  padding: 2rem 2.5rem;
  background: rgba(255,98,0,0.06);
  border: 1px solid rgba(255,98,0,0.2);
  border-radius: 24px;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.sp-cta-text h3 {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.3rem;
}
.sp-cta-text p { color: rgba(255,255,255,0.5); font-size: 0.9rem; }
.sp-cta-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
.sp-btn-primary {
  background: var(--blue); color: #fff; border: none;
  padding: 0.85rem 2rem; border-radius: 100px;
  font-family: var(--font-body); font-size: 0.88rem; font-weight: 600;
  cursor: pointer; display: flex; align-items: center; gap: 8px;
  box-shadow: 0 8px 28px rgba(255,98,0,0.35);
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative; overflow: hidden;
}
.sp-btn-primary::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(110deg, transparent 0%, rgba(255,255,255,.28) 45%, transparent 60%);
  transform: translateX(-120%); transition: transform 0.65s ease;
}
.sp-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(255,98,0,0.45); }
.sp-btn-primary:hover::before { transform: translateX(120%); }
.sp-btn-ghost {
  background: transparent; color: rgba(255,255,255,0.75);
  border: 1.5px solid rgba(255,255,255,0.18);
  padding: 0.85rem 2rem; border-radius: 100px;
  font-family: var(--font-body); font-size: 0.88rem; font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, transform 0.2s;
}
.sp-btn-ghost:hover { border-color: var(--blue); color: #fff; transform: translateY(-2px); }

/* Modal lightbox */
.sp-modal-backdrop {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(4,8,16,0.92);
  display: flex; align-items: center; justify-content: center;
  padding: 2rem;
  animation: modalIn 0.25s ease;
  backdrop-filter: blur(12px);
}
@keyframes modalIn { from { opacity: 0; } to { opacity: 1; } }
.sp-modal {
  background: rgba(20,24,36,0.98);
  border: 1px solid rgba(255,98,0,0.25);
  border-radius: 28px;
  padding: 2.5rem;
  max-width: 520px;
  width: 100%;
  position: relative;
  box-shadow: 0 40px 100px rgba(0,0,0,0.6);
  animation: modalSlide 0.3s cubic-bezier(.2,.75,.2,1);
}
@keyframes modalSlide { from { transform: translateY(30px) scale(0.96); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
.sp-modal-close {
  position: absolute; top: 1.2rem; right: 1.2rem;
  background: rgba(255,255,255,0.08); border: none; color: rgba(255,255,255,0.7);
  width: 36px; height: 36px; border-radius: 50%;
  cursor: pointer; font-size: 1.2rem;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, color 0.2s;
}
.sp-modal-close:hover { background: rgba(255,98,0,0.2); color: #fff; }
.sp-modal-img {
  width: 100%; height: 260px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.03);
  border-radius: 18px; margin-bottom: 1.5rem;
  border: 1px solid rgba(255,255,255,0.06);
}
.sp-modal-img img { max-height: 220px; max-width: 90%; object-fit: contain; filter: drop-shadow(0 20px 40px rgba(255,98,0,0.2)); }
.sp-modal-tag {
  font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--blue); background: rgba(255,98,0,0.12);
  border: 1px solid rgba(255,98,0,0.25);
  padding: 0.3rem 0.8rem; border-radius: 100px;
  display: inline-block; margin-bottom: 0.8rem;
}
.sp-modal-name {
  font-family: var(--font-display);
  font-size: 2rem; font-weight: 700; color: #fff;
  margin-bottom: 0.5rem; line-height: 1.1;
}
.sp-modal-desc { color: rgba(255,255,255,0.55); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem; }
.sp-modal-actions { display: flex; gap: 0.8rem; }

@media (max-width: 1100px) {
  .sp-bento { grid-template-columns: repeat(4, 1fr); }
  .sp-part-card.sz-big { grid-column: span 2; grid-row: span 2; }
}
@media (max-width: 768px) {
  .sp-bento { grid-template-columns: repeat(3, 1fr); grid-auto-rows: 150px; }
  .sp-part-card.sz-big { grid-column: span 2; }
  .sp-bottom-cta { flex-direction: column; }
}
@media (max-width: 520px) {
  .sp-bento { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 140px; gap: 10px; }
  .sp-part-card.sz-wide { grid-column: span 2; }
  .sp-part-card.sz-big { grid-column: span 2; grid-row: span 2; }
}

.marquee-strip { background: var(--blue); color: #fff; padding: 0.85rem 0; overflow: hidden; white-space: nowrap; }
.marquee-inner { display: inline-flex; align-items: center; animation: marqueeScroll 30s linear infinite; }
.marquee-inner span { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; margin: 0 1.5rem; opacity: 0.9; }
.sep { opacity: 0.4 !important; }
@keyframes marqueeScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }

.about-hero { padding: 140px 4vw 80px; background: linear-gradient(160deg, var(--white) 60%, var(--blue-pale) 100%); text-align: center; position: relative; overflow: hidden; }
.ripple-zone { background: var(--blue); padding: 80px 4vw; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 360px; cursor: crosshair; }
.ripple-canvas { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.ripple-h { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 700; color: #fff; text-align: center; position: relative; z-index: 2; }
.ripple-p { color: rgba(255,255,255,0.7); margin-top: 1rem; z-index: 2; position: relative; }

.timeline-section { background: var(--off-white); padding: 80px 4vw; }
.timeline { max-width: 700px; margin: 0 auto; position: relative; }
.timeline::before { content:''; position: absolute; left: 24px; top: 0; bottom: 0; width: 1.5px; background: linear-gradient(180deg, var(--blue) 0%, var(--mid-gray) 100%); }
.tl-item { display: flex; gap: 2rem; margin-bottom: 3rem; opacity: 0; transform: translateX(-20px); transition: opacity 0.5s ease, transform 0.5s ease; }
.tl-item.visible { opacity: 1; transform: translateX(0); }
.tl-dot { width: 48px; height: 48px; border-radius: 50%; background: var(--blue); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.8rem; font-weight: 700; flex-shrink: 0; position: relative; z-index: 1; box-shadow: 0 4px 16px rgba(0,87,255,0.3); }
.tl-content h4 { font-size: 1.05rem; font-weight: 600; margin-bottom: 0.3rem; }
.tl-content p { color: var(--muted); font-size: 0.9rem; line-height: 1.5; }
.tl-year { color: var(--blue); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 0.3rem; }

.products-hero { padding: 140px 4vw 60px; text-align: center; background: linear-gradient(160deg, var(--blue-pale) 0%, var(--white) 60%); }
.products-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2.5rem; max-width: 1200px; margin: 0 auto; padding: 60px 4vw 100px; }
.prod-card { border: 1px solid var(--light-gray); border-radius: 28px; overflow: hidden; background: var(--white); transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
.prod-card:hover { transform: translateY(-12px) scale(1.01); box-shadow: 0 18px 40px rgba(0,87,255,.10); border-color: rgba(0,87,255,0.3); }
.prod-image-area { height: 300px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.blue-bg { background: linear-gradient(135deg, #e8f0ff 0%, #c8d8ff 100%); }
.dark-bg { background: linear-gradient(135deg, #111827 0%, #1e2840 100%); }
.slate-bg { background: linear-gradient(135deg, #f0f4ff 0%, #dde8ff 100%); }
.ink-bg { background: linear-gradient(135deg, #040810 0%, #0b1329 100%); }
.ro-model-svg { filter: drop-shadow(0 20px 40px rgba(0,87,255,0.2)); transition: transform 0.4s ease; }
.prod-card:hover .ro-model-svg { transform: translateY(-8px) rotate(-2deg); }
.prod-badge { position: absolute; top: 16px; left: 16px; background: var(--blue); color: #fff; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.3rem 0.7rem; border-radius: 100px; }
.prod-badge.dark { background: var(--darkest); }
.prod-body { padding: 2rem 2rem 2.5rem; }
.prod-name { font-family: var(--font-display); font-size: 1.8rem; font-weight: 700; color: var(--darkest); margin-bottom: 0.5rem; }
.prod-tagline { color: var(--muted); font-size: 0.9rem; margin-bottom: 1.5rem; }
.prod-specs { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; }
.spec-row { display: flex; align-items: center; gap: 0.7rem; font-size: 0.88rem; color: var(--ink); }
.check { color: var(--blue); font-size: 1rem; }
.prod-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--light-gray); padding-top: 1.5rem; }
.prod-price { font-family: var(--font-display); font-size: 2.2rem; font-weight: 700; color: var(--darkest); }
.prod-price small { font-size: 0.75rem; color: var(--muted); font-family: var(--font-body); display: block; margin-bottom: 2px; }
.prod-price.white { color: #fff; }
.dark-card { border-color: rgba(255,255,255,0.06) !important; }
.dark-card .prod-body { background: var(--darkest); }
.dark-card .prod-name { color: #fff; }
.dark-card .prod-tagline { color: rgba(255,255,255,0.5); }
.dark-card .spec-row { color: rgba(255,255,255,0.8); }
.dark-card .prod-footer { border-color: rgba(255,255,255,0.08); }
.btn-order { background: var(--blue); color: #fff; border: none; padding: 0.75rem 1.6rem; border-radius: 100px; font-family: var(--font-body); font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 16px rgba(0,87,255,0.25); position: relative; overflow: hidden; }
.btn-order::before { content: ""; position: absolute; inset: 0; background: linear-gradient(110deg, transparent 0%, rgba(255,255,255,.34) 45%, transparent 60%); transform: translateX(-120%); transition: transform .65s ease; }
.btn-order:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,87,255,0.4); }
.btn-order:hover::before { transform: translateX(120%); }
.btn-order.light { background: #fff; color: var(--darkest); box-shadow: 0 4px 16px rgba(0,0,0,0.15); }

.comparison-section { background: var(--off-white); padding: 80px 4vw; }
.comp-table { max-width: 900px; margin: 3rem auto 0; border-radius: 20px; overflow: hidden; border: 1px solid var(--light-gray); background: var(--white); }
.comp-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; border-bottom: 1px solid var(--light-gray); }
.comp-row:last-child { border-bottom: none; }
.comp-cell { padding: 1rem 1.5rem; font-size: 0.88rem; color: var(--ink); display: flex; align-items: center; }
.comp-cell:not(:first-child) { justify-content: center; }
.comp-head { background: var(--blue-pale); font-weight: 700; color: var(--blue); font-size: 0.8rem; letter-spacing: 0.05em; }
.comp-check { color: var(--blue); font-size: 1.1rem; }
.comp-dash { color: var(--mid-gray); }

.contact-wrap { max-width: 1200px; margin: 0 auto; padding: 140px 4vw 100px; display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: start; }
.contact-left h1 { font-family: var(--font-display); font-size: clamp(2.5rem, 4vw, 4.5rem); font-weight: 700; color: var(--darkest); letter-spacing: -2px; line-height: 1.05; margin-bottom: 1.2rem; }
.contact-left p { color: var(--muted); font-size: 1.05rem; line-height: 1.7; margin-bottom: 3rem; }
.contact-info { display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 3rem; }
.contact-info-row { display: flex; align-items: center; gap: 1rem; }
.contact-info-icon { width: 48px; height: 48px; border-radius: 14px; background: var(--blue-pale); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
.contact-info-text span { display: block; font-size: 0.75rem; color: var(--muted); margin-bottom: 2px; }
.contact-info-text strong { font-size: 0.95rem; color: var(--dark); }
.form-card { background: var(--white); border: 1px solid var(--light-gray); border-radius: 28px; padding: 3rem; box-shadow: 0 10px 30px rgba(0,87,255,.05); }
.contact-form { display: flex; flex-direction: column; gap: 0; }
.contact-form h3 { font-family: var(--font-display); font-size: 1.6rem; font-weight: 700; margin-bottom: 0.3rem; color: var(--darkest); }
.form-sub { color: var(--muted); font-size: 0.88rem; margin-bottom: 1.8rem; }
.form-row { margin-bottom: 1.5rem; }
.form-row label { display: block; font-size: 0.8rem; font-weight: 600; color: var(--ink); margin-bottom: 0.5rem; letter-spacing: 0.03em; }
.form-row input, .form-row select, .form-row textarea { width: 100%; padding: 0.9rem 1.1rem; border: 1.5px solid var(--light-gray); border-radius: 14px; background: var(--off-white); color: var(--dark); font-family: var(--font-body); font-size: 0.9rem; outline: none; transition: border-color 0.2s, box-shadow 0.2s; resize: none; }
.form-row input:focus, .form-row select:focus, .form-row textarea:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(0,87,255,0.1); }
.form-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.submit-btn { width: 100%; background: var(--blue); color: #fff; border: none; padding: 1rem; border-radius: 14px; font-size: 0.95rem; font-weight: 600; font-family: var(--font-body); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 6px 24px rgba(0,87,255,0.3); display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 0.5rem; position: relative; overflow: hidden; }
.submit-btn::before { content: ""; position: absolute; inset: 0; background: linear-gradient(110deg, transparent 0%, rgba(255,255,255,.34) 45%, transparent 60%); transform: translateX(-120%); transition: transform .65s ease; }
.submit-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(0,87,255,0.4); }
.submit-btn:hover::before { transform: translateX(120%); }
.form-success { text-align: center; padding: 3rem 0; }
.form-success h3 { font-family: var(--font-display); font-size: 1.8rem; margin-bottom: 0.5rem; color: var(--darkest); }
.form-success p { color: var(--muted); }
.map-section { background: var(--off-white); padding: 60px 4vw; }
.map-inner { max-width: 1200px; margin: 0 auto; background: var(--light-gray); border-radius: 24px; height: 300px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--mid-gray); position: relative; overflow: hidden; }
.map-pin { font-size: 2.5rem; animation: bounce 2s ease-in-out infinite; }
@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }

.reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.45s ease, transform 0.45s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
.reveal-left { opacity: 0; transform: translateX(-30px); transition: opacity 0.45s ease, transform 0.45s ease; }
.reveal-left.visible { opacity: 1; transform: translateX(0); }

.ambient-drops-canvas { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; opacity:.8; }

.stats-section { background:var(--blue); padding:100px 4vw; }
.stats-inner { max-width:1100px; margin:auto; display:grid; grid-template-columns:repeat(4,1fr); gap:2rem; }
.stat-block { text-align:center; }
.stat-big { font-family:var(--font-display); font-size:4rem; color:white; font-weight:700; }
.stat-label { color:rgba(255,255,255,.7); margin-top:.6rem; letter-spacing:.05em; }

.testi-section { position:relative; overflow:hidden; background:linear-gradient(135deg,var(--darkest),#09162e); padding:120px 4vw; }
.testi-inner { position:relative; z-index:2; max-width:1200px; margin:auto; }
.testi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; }
.testi-card { background:rgba(255,255,255,.04); backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,.08); border-radius:30px; padding:2rem; transition: transform 0.25s ease, border-color 0.25s ease; }
.testi-card:hover { transform:translateY(-8px); border-color:rgba(100,170,255,.4); }
.testi-stars { color:#FFD700; margin-bottom:1rem; }
.testi-quote { color:rgba(255,255,255,.85); line-height:1.8; font-size:.95rem; }
.testi-meta { margin-top:2rem; display:flex; align-items:center; gap:1rem; }
.testi-avatar { width:50px; height:50px; border-radius:50%; background:linear-gradient(135deg,var(--blue),var(--blue-light)); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; }
.testi-name { color:#fff; font-weight:600; }
.testi-role { color:rgba(255,255,255,.5); font-size:.8rem; }
.testi-model { margin-left:auto; color:var(--blue-light); font-size:.8rem; }

.cta-banner { position:relative; overflow:hidden; padding:120px 4vw; background:white; }
.cta-inner { max-width:900px; margin:auto; text-align:center; position:relative; z-index:2; }
.cta-h { font-family:var(--font-display); font-size:clamp(2.5rem,5vw,5rem); line-height:1; margin-bottom:1rem; }
.cta-sub { max-width:650px; margin:auto; color:var(--muted); line-height:1.8; }
.cta-actions { display:flex; gap:1rem; justify-content:center; margin-top:2rem; flex-wrap: wrap; }
.cta-bg-rings { position:absolute; inset:0; }
.cta-ring { position:absolute; border-radius:50%; border:1px solid rgba(0,87,255,.08); }
.cta-ring-1{width:500px;height:500px;left:-150px;top:0}
.cta-ring-2{width:800px;height:800px;right:-300px;top:-150px}
.cta-ring-3{width:300px;height:300px;bottom:-100px;left:50%}
.cta-ghost { color: var(--blue); border-color: rgba(0,87,255,0.3); }

.footer-new {
  background:
    radial-gradient(circle at 20% 0%, rgba(59,130,246,.18), transparent 34%),
    linear-gradient(180deg, #06101f 0%, var(--darkest) 42%, #03050a 100%);
  overflow: hidden;
  position: relative;
}
.footer-drop-theatre { position: relative; height: 220px; overflow: hidden; border-bottom: 1px solid rgba(255,255,255,.04); }
.footer-drop-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.footer-content { padding: 4rem 4vw; display: grid; grid-template-columns: 2fr repeat(4, 1fr); gap: 2rem; max-width: 1400px; margin: auto; position: relative; z-index: 1; }
.footer-logo-big { display: flex; align-items: center; gap: 8px; color: #fff; font-size: 2rem; font-family: var(--font-display); font-weight: 700; }
.footer-logo-big span { color: var(--blue-light); }
.footer-tagline { margin-top: 1rem; color: rgba(255,255,255,.6); line-height: 1.6; }
.footer-socials { display: flex; gap: 1rem; margin-top: 2rem; }
.social-dot { width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.08); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform .25s ease, background .25s ease, border-color .25s ease, box-shadow .25s ease; }
.social-dot:hover { transform: translateY(-4px); background: rgba(59,130,246,.22); border-color: rgba(100,170,255,.45); box-shadow: 0 12px 28px rgba(0,87,255,.22); }
.footer-col-head { color: #fff; margin-bottom: 1rem; font-weight: 600; }
.footer-link { display: block; color: rgba(255,255,255,.5); margin-bottom: .7rem; text-decoration: none; font-size: .9rem; width: fit-content; border: 0; background: transparent; font-family: var(--font-body); text-align: left; cursor: pointer; padding: .1rem 0; position: relative; transition: color .24s ease, transform .24s ease; }
.footer-link::after { content: ""; position: absolute; left: 0; bottom: -.15rem; width: 100%; height: 1px; background: var(--blue-light); transform: scaleX(0); transform-origin: right; transition: transform .25s ease; }
.footer-link:hover { color: #fff; transform: translateX(4px); }
.footer-link:hover::after { transform: scaleX(1); transform-origin: left; }
.footer-bottom { border-top: 1px solid rgba(255,255,255,.06); }
.footer-bottom-inner { max-width: 1300px; margin: auto; padding: 1.5rem 4vw; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem; color: rgba(255,255,255,.45); }
.footer-cert { display: flex; gap: 1rem; }
.cert-badge { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08); padding: .5rem .8rem; border-radius: 100px; transition: border-color .25s ease, background .25s ease, transform .25s ease; }
.cert-badge:hover { background: rgba(59,130,246,.12); border-color: rgba(100,170,255,.35); transform: translateY(-2px); }

@media(max-width:1100px){
  .home-products-stage { grid-template-columns: 1fr; gap: 3rem; }
  .hps-side-card { opacity: 1; }
  .hps-float-label { display: none; }
  .hps-center-img-wrap img { max-height: 340px; }
}
@media(max-width:1024px){
  .stats-inner{grid-template-columns:repeat(2,1fr)}
  .testi-grid{grid-template-columns:1fr}
  .footer-content{grid-template-columns:1fr 1fr}
  .features-grid{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:960px){
  .hero-inner{grid-template-columns:1fr;gap:3rem}
  .hero-visual{height:380px}
  .pillars{grid-template-columns:1fr}
  .products-grid{grid-template-columns:1fr}
  .contact-wrap{grid-template-columns:1fr;gap:3rem;padding-top:120px}
  .form-2col{grid-template-columns:1fr}
  .comp-table{overflow-x:auto}
}
@media(max-width:768px){
  .cta-actions{flex-direction:column}
  .footer-content{grid-template-columns:1fr}
  .stats-inner{grid-template-columns:1fr}
  .footer-bottom-inner{flex-direction:column;text-align:center}
  .footer-cert{justify-content:center;flex-wrap:wrap}
  .footer-drop-theatre{height:150px}
  .hero-glow,.hero-glow2{display:none}
  .home-products-tabs { width: 100%; }
}
@media(max-width:640px){
  .hero-stats{gap:1.5rem;flex-wrap:wrap}
  .hero-actions{flex-direction:column}
  .btn-primary,.btn-ghost{width:100%;justify-content:center}
  .features-grid{grid-template-columns:1fr}
  .home-products-stage { grid-template-columns: 1fr; }
  .hps-bottom-strip { gap: 1rem; }
  .hps-strip-item { min-width: 180px; }
}
@media(max-width:480px){
  .prod-footer{flex-direction:column;gap:1rem;align-items:flex-start}
}
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
  .sp-part-card, .reveal, .reveal-left, .tl-item { opacity: 1 !important; transform: none !important; }
}
`;

/* ─── DATA ─────────────────────────────────────────────── */
const NAV_LINKS = ["home", "about", "products", "contact"];
const FEATURES = [
  { icon: "🧬", title: "Molecular Filtration", desc: "Removes particles as small as 0.0001 microns — smaller than any known pathogen." },
  { icon: "💎", title: "Mineral Restoration", desc: "Adds back calcium, magnesium & alkaline compounds your body craves." },
  { icon: "📱", title: "Smart Monitoring", desc: "Live TDS, pH, and flow-rate data on the integrated display and app." },
  { icon: "♻️", title: "Zero-Waste Design", desc: "Industry-first 1:1 pure-to-waste ratio. Eco-conscious from molecule to molecule." },
];
const PILLARS = [
  { icon: "🛡️", title: "Bio-Defense RO+", desc: "14 stages of precision molecular ultrafiltration — stripping away microplastics, heavy metals, fluoride, chloramines and every known pathogen. Your water passes through membranes thinner than a human hair." },
  { icon: "💧", title: "Natural Mineralization", desc: "We don't just strip — we replenish. Our bio-ceramic mineral stones return vital magnesium, calcium, potassium, and essential alkaline elements so every glass tastes like mountain spring water." },
  { icon: "🌿", title: "Eco Carbon Architecture", desc: "Zero-waste dynamic recirculation — our 1:1 efficiency ratio means for every litre purified, only one litre is used. We broke the industry's 3:1 norm. Permanently." },
];
const TIMELINE = [
  { year: "2018", dot: "18", title: "Founded in Bangalore", desc: "Three engineers leave ISRO to build India's first molecular-grade consumer RO system." },
  { year: "2020", dot: "20", title: "14-Stage Breakthrough", desc: "Patent granted for sequential molecular membrane architecture. Industry takes notice." },
  { year: "2022", dot: "22", title: "1:1 Waste Ratio Achieved", desc: "First company in the world to hit true zero-waste filtration at consumer scale." },
  { year: "2024", dot: "24", title: "Smart Display Launch", desc: "Integrated TDS + pH real-time display and companion app. Over 1M units shipped." },
  { year: "2026", dot: "26", title: "The X-Series", desc: "Our most advanced purification engineering ever. Launching to the world now." },
];
const PRODUCTS = [
  {
    id: "elite", badge: "Flagship", badgeDark: false, bgClass: "blue-bg", dark: false,
    name: "Elite X-1", tagline: "The pinnacle of home water purification.",
    specs: ["14-Stage RO + UV + UF + Mineraliser", "Intelligent TDS & pH Live Display", "Alkaline Balancer (pH 8.2–9.0)", "Smart Filter Change Alert (App)", "1:1 Zero Waste Recovery Ratio"],
    price: "₹89,999", btnLight: false, btnLabel: "Pre-Order", tds: "002",
  },
  {
    id: "element", badge: "Pro Series", badgeDark: true, bgClass: "dark-bg", dark: true,
    name: "Element Pro", tagline: "Compact brilliance for modern kitchens.",
    specs: ["12-Stage Compact Filtration", "UV-C Chamber Sterilization", "Sleek Countertop Glass Profile", "Auto Flush & Self-Clean Cycle", "Fits under standard sink cabinet"],
    price: "₹64,999", btnLight: true, btnLabel: "Pre-Order", tds: "004",
  },
  {
    id: "hydro", badge: "Under Sink", badgeDark: false, bgClass: "slate-bg", dark: false,
    name: "HydroCore S", tagline: "Hidden genius — designed to disappear under your sink.",
    specs: ["10-Stage RO Under-Sink Module", "Separate Dedicated Pure Water Tap", "12L Storage Tank Included", "Wi-Fi TDS Reporting to App"],
    price: "₹49,999", btnLight: false, btnLabel: "Pre-Order", tds: "001",
  },
  {
    id: "obsidian", badge: "Luxury", badgeDark: true, bgClass: "ink-bg", dark: true,
    name: "Obsidian One", tagline: "For those who demand the extraordinary.",
    specs: ["16-Stage Luxury Filtration", "Platinum-grade Membrane", "Bespoke Installation Service", "5-Year White Glove Warranty"],
    price: "₹1,49,999", btnLight: true, btnLabel: "Enquire", tds: "001",
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
  "Molecular Filtration", "14-Stage Purification", "99.9% Purity", "Smart TDS Monitor",
  "Alkaline Infused", "Zero Waste Architecture", "UV-C Sterilization",
  "Molecular Filtration", "14-Stage Purification", "99.9% Purity", "Smart TDS Monitor",
  "Alkaline Infused", "Zero Waste Architecture", "UV-C Sterilization",
];
const COUNTER_STATS = [
  { end: 1200000, suffix: "+", label: "Units Shipped", prefix: "" },
  { end: 99.9, suffix: "%", label: "Purity Rate", prefix: "" },
  { end: 14, suffix: "", label: "Filter Stages", prefix: "" },
  { end: 1, suffix: ":1", label: "Waste Ratio", prefix: "" },
];
const TESTIMONIALS = [
  { name: "Priya Raghavan", role: "Architect · Mumbai", avatar: "PR", rating: 5, quote: "I've tried every premium water purifier on the market. AquaPura is in a different league entirely — the water tastes like it was born in a glacier.", model: "Elite X-1" },
  { name: "Arjun Mehta", role: "Cardiologist · Delhi", avatar: "AM", rating: 5, quote: "As someone who studies what enters the bloodstream, I became obsessive about our water. The 14-stage process and live TDS monitoring gave my family real peace of mind.", model: "HydroCore S" },
  { name: "Sonal & Vivek Iyer", role: "Home Owners · Bengaluru", avatar: "SI", rating: 5, quote: "The Obsidian One is a sculpture in our kitchen as much as it is a purifier. Every guest asks about it. Every sip validates the investment.", model: "Obsidian One" },
];
const FOOTER_LINKS = {
  Products: ["Elite X-1", "Element Pro", "HydroCore S", "Obsidian One"],
  Company: ["About Us", "Our Technology", "Sustainability", "Press"],
  Support: ["Consultation", "Filter Replacement", "Warranty", "App Download"],
  Legal: ["Privacy Policy", "Terms of Use", "Cookie Policy"],
};

/* ─── HOME PRODUCT SHOWCASE DATA ────────────────────────── */
const HOME_SHOWCASE = [
  {
    id: "black",
    img: "/assets/blackro.png",
    tag: "Midnight Edition",
    name: "Elite X-1\nObsidian",
    tagline: "Dark engineering. Pure precision.",
    price: "₹89,999",
    specs: ["14-Stage Filtration", "UV-C Sterilization", "Smart TDS Display"],
    chips: ["14-Stage RO", "UV-C", "pH 8.5", "Zero Waste"],
    floatLabels: [
      { text: "Smart TDS Monitor", cls: "hps-fl-1" },
      { text: "Alkaline pH 8.5", cls: "hps-fl-2" },
      { text: "14-Stage RO+UV", cls: "hps-fl-3" },
    ],
    accentColor: "#111827",
    lightBg: "linear-gradient(135deg,#f8f8f8 0%,#e8e8e8 100%)",
  },
  {
    id: "white",
    img: "/assets/whitero.png",
    tag: "Signature White",
    name: "Element Pro\nPearl",
    tagline: "Pure white. Pure water. Pure life.",
    price: "₹64,999",
    specs: ["12-Stage Compact", "Auto Self-Clean", "App Monitoring"],
    chips: ["12-Stage RO", "Self-Clean", "Wi-Fi", "Eco Design"],
    floatLabels: [
      { text: "Auto Self-Clean", cls: "hps-fl-1" },
      { text: "Wi-Fi Monitoring", cls: "hps-fl-2" },
      { text: "12-Stage Filtration", cls: "hps-fl-3" },
    ],
    accentColor: "#ffffff",
    lightBg: "linear-gradient(135deg,#f0f4ff 0%,#e0e8ff 100%)",
  },
  {
    id: "blue",
    img: "/assets/bluero.png",
    tag: "Ocean Series",
    name: "HydroCore S\nAzure",
    tagline: "Born from the ocean. Built for your home.",
    price: "₹49,999",
    specs: ["10-Stage Under-Sink", "12L Tank Included", "Dedicated Pure Tap"],
    chips: ["10-Stage RO", "Under-Sink", "12L Tank", "Pure Tap"],
    floatLabels: [
      { text: "12L Storage Tank", cls: "hps-fl-1" },
      { text: "Dedicated Pure Tap", cls: "hps-fl-2" },
      { text: "10-Stage Filtration", cls: "hps-fl-3" },
    ],
    accentColor: "#ff6200",
    lightBg: "linear-gradient(135deg,#fff5f0 0%,#ffe8d8 100%)",
  },
];

/* ─── SPARE PARTS DATA ───────────────────────────────────── */
const SPARE_PARTS_CATEGORIES = ["All", "Filters", "Membranes", "UV & Sterilization", "Housings", "Accessories"];

const SPARE_PARTS = [
  // Big hero items
  { id: 1,  img: "/assets/1.png",  name: "Pre-Sediment Filter",     cat: "Filters",            desc: "5-micron spun polypropylene sediment filter. First line of defense against dirt, rust, and large particles.", size: "sz-big" },
  { id: 2,  img: "/assets/2.png",  name: "RO Membrane 75 GPD",      cat: "Membranes",          desc: "High-rejection thin-film composite membrane. Removes 98%+ of dissolved solids, heavy metals, and microbes.", size: "sz-tall" },
  // Standard
  { id: 3,  img: "/assets/3.png",  name: "Activated Carbon Block",  cat: "Filters",            desc: "NSF-certified carbon block for chlorine, VOCs, and taste/odor removal.", size: "" },
  { id: 4,  img: "/assets/4.png",  name: "UV-C Lamp 11W",           cat: "UV & Sterilization", desc: "254nm germicidal UV lamp. 99.9999% sterilization of bacteria and viruses.", size: "" },
  { id: 5,  img: "/assets/5.png",  name: "Post Carbon Filter",      cat: "Filters",            desc: "Inline post-carbon polishing filter for superior taste and clarity.", size: "" },
  { id: 6,  img: "/assets/6.png",  name: "Mineral Cartridge",       cat: "Accessories",        desc: "Bio-ceramic mineral infusion cartridge for calcium, magnesium and alkaline restoration.", size: "" },
  // Wide
  { id: 7,  img: "/assets/7.png",  name: "Filter Housing Kit",      cat: "Housings",           desc: "Heavy-duty 10-inch polypropylene filter housing with mounting bracket and spanner.", size: "sz-wide" },
  { id: 8,  img: "/assets/8.png",  name: "Membrane Housing",        cat: "Housings",           desc: "Pressure-rated fibreglass RO membrane vessel with integrated check valve.", size: "" },
  { id: 9,  img: "/assets/9.png",  name: "Flow Restrictor 400cc",   cat: "Accessories",        desc: "Calibrated capillary flow restrictor for optimal recovery ratio.", size: "" },
  { id: 10, img: "/assets/10.png", name: "Feed Water Solenoid",     cat: "Accessories",        desc: "24V DC normally-closed solenoid valve with integrated fittings.", size: "" },
  // Tall
  { id: 11, img: "/assets/11.png", name: "Storage Tank 12L",        cat: "Housings",           desc: "Bladder-type pressurised storage tank with NSF-certified liner.", size: "sz-tall" },
  { id: 12, img: "/assets/12.png", name: "Booster Pump 50GPD",      cat: "Accessories",        desc: "High-efficiency DC booster pump for low-pressure inlet applications.", size: "" },
  { id: 13, img: "/assets/13.png", name: "TDS Inline Meter",        cat: "Accessories",        desc: "Dual-display inline TDS monitor for pre/post comparison in real time.", size: "" },
  // Standard grid
  { id: 14, img: "/assets/14.png", name: "Alkaline Filter pH+",     cat: "Filters",            desc: "Raises pH to 8.0–9.5 with tourmaline, maifan stone, and mineral balls.", size: "" },
  { id: 15, img: "/assets/15.png", name: "UF Hollow Fiber 0.01µm",  cat: "Membranes",          desc: "Ultra-fine hollow-fiber ultrafiltration membrane for pathogen-free water.", size: "sz-wide" },
  { id: 16, img: "/assets/16.png", name: "UV Quartz Sleeve",        cat: "UV & Sterilization", desc: "Borosilicate quartz sleeve for UV-C chamber. High UV transmittance.", size: "" },
  { id: 17, img: "/assets/17.png", name: "Quick-Connect Fittings",  cat: "Accessories",        desc: "Push-to-connect fittings for 1/4\" and 3/8\" tubing. Leak-proof rated to 6 bar.", size: "" },
  { id: 18, img: "/assets/18.png", name: "SMPS Power Adapter",      cat: "Accessories",        desc: "24V/3A switching power supply for pump and solenoid systems.", size: "" },
  { id: 19, img: "/assets/19.png", name: "Nano Silver Filter",      cat: "Filters",            desc: "Silver-impregnated granular activated carbon for antibacterial protection.", size: "" },
  { id: 20, img: "/assets/20.png", name: "High Pressure Switch",    cat: "Accessories",        desc: "Auto cut-off pressure switch. Prevents tank overpressure and backflow.", size: "" },
  { id: 21, img: "/assets/21.png", name: "RO Membrane 100 GPD",     cat: "Membranes",          desc: "Commercial-grade 100 GPD TFC membrane for high-volume household use.", size: "" },
];

/* ─── HERO VISUAL ────────────────────────────────────────── */
function HeroVisual() {
  const wrapperRef = useRef(null);
  const imgRef = useRef(null);
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const img = imgRef.current;
    if (!wrapper || !img) return;
    const onMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      img.style.transform = `perspective(800px) rotateY(${dx * 12}deg) rotateX(${-dy * 10}deg) scale(1.04) translateX(${dx * 8}px)`;
    };
    const onLeave = () => { img.style.transform = `perspective(800px) rotateY(0deg) rotateX(0deg) scale(1) translateX(0px)`; };
    wrapper.addEventListener("mousemove", onMove);
    wrapper.addEventListener("mouseleave", onLeave);
    return () => { wrapper.removeEventListener("mousemove", onMove); wrapper.removeEventListener("mouseleave", onLeave); };
  }, []);
  return (
    <div className="hero-visual">
      <div className="ro-stage-wrapper" ref={wrapperRef} style={{ cursor: "none" }}>
        <img ref={imgRef} src="/assets/RO.png" alt="AquaPura RO System"
          style={{ maxHeight: "700px", maxWidth: "600px", objectFit: "contain", filter: "drop-shadow(0 30px 60px rgba(0,87,255,0.25))", transition: "transform 0.15s ease-out", willChange: "transform", marginLeft: "auto", marginRight: "0" }}
        />
        <div className="hero-label label-1"><span className="ldot" />Smart TDS Monitor</div>
        <div className="hero-label label-2"><span className="ldot" />Alkaline pH 8.5</div>
        <div className="hero-label label-3"><span className="ldot" />14-Stage RO+UV</div>
      </div>
    </div>
  );
}

/* ─── HOME PRODUCT SHOWCASE ──────────────────────────────── */
function HomeProductShowcase({ navigate }) {
  const [active, setActive] = useState(1);
  const centerProduct = HOME_SHOWCASE[active];
  const leftProduct = HOME_SHOWCASE[(active + 2) % 3];
  const rightProduct = HOME_SHOWCASE[(active + 1) % 3];

  return (
    <section className="home-products-section">
      <div className="home-products-inner">
        <div className="section-header reveal">
          <div className="page-eyebrow">Our Collection</div>
          <h2 className="section-h">Engineered to <em>impress</em>.</h2>
          <p className="section-sub">Three iconic finishes. One obsession with purity. Choose the AquaPura that belongs in your home.</p>
        </div>
        <div className="home-products-tabs reveal">
          {HOME_SHOWCASE.map((p, i) => (
            <button key={p.id} className={`home-products-tab${active === i ? " active" : ""}`} onClick={() => setActive(i)}>
              {p.tag}
            </button>
          ))}
        </div>
        <div className="home-products-stage reveal">
          <div className={`hps-side-card${active === (active + 2) % 3 ? " active" : ""}`}
            onClick={() => setActive((active + 2) % 3)}
            style={{ background: leftProduct.lightBg }}>
            <div className="hps-card-tag">{leftProduct.tag}</div>
            <div className="hps-card-img"><img src={leftProduct.img} alt={leftProduct.name} /></div>
            <div className="hps-card-name">{leftProduct.name.replace("\n", " ")}</div>
            <div className="hps-card-price"><small>Starting at</small>{leftProduct.price}</div>
            {leftProduct.specs.map((s, i) => <div key={i} className="hps-card-spec">{s}</div>)}
          </div>
          <div className="hps-center">
            <div className="hps-center-glow" />
            <div className="hps-center-rings"><div className="hps-ring" /><div className="hps-ring" /><div className="hps-ring" /></div>
            <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
              {centerProduct.floatLabels.map((fl, i) => (
                <div key={i} className={`hps-float-label ${fl.cls}`}><span className="fl-dot" />{fl.text}</div>
              ))}
              <div className="hps-center-img-wrap"><img key={centerProduct.id} src={centerProduct.img} alt={centerProduct.name} /></div>
            </div>
            <div className="hps-center-shadow" />
            <div className="hps-center-info">
              <div className="hps-center-badge">
                <span style={{ width: 6, height: 6, background: "var(--blue)", borderRadius: "50%", display: "inline-block", animation: "pulse 2s infinite" }} />
                {centerProduct.tag}
              </div>
              <div className="hps-center-name">{centerProduct.name.replace("\n", " ")}</div>
              <div className="hps-center-tagline">{centerProduct.tagline}</div>
              <div className="hps-center-chips">
                {centerProduct.chips.map((c, i) => <span key={i} className="hps-chip">{c}</span>)}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, color: "var(--darkest)", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--mid-gray)", fontFamily: "var(--font-body)", fontWeight: 400, display: "block", marginBottom: 4 }}>Starting at</span>
                {centerProduct.price}
              </div>
              <div className="hps-center-actions">
                <button className="hps-btn-order" onClick={() => navigate("contact")}>Pre-Order Now</button>
                <button className="hps-btn-details" onClick={() => navigate("products")}>View Details</button>
              </div>
            </div>
          </div>
          <div className={`hps-side-card${active === (active + 1) % 3 ? " active" : ""}`}
            onClick={() => setActive((active + 1) % 3)}
            style={{ background: rightProduct.lightBg }}>
            <div className="hps-card-tag">{rightProduct.tag}</div>
            <div className="hps-card-img"><img src={rightProduct.img} alt={rightProduct.name} /></div>
            <div className="hps-card-name">{rightProduct.name.replace("\n", " ")}</div>
            <div className="hps-card-price"><small>Starting at</small>{rightProduct.price}</div>
            {rightProduct.specs.map((s, i) => <div key={i} className="hps-card-spec">{s}</div>)}
          </div>
        </div>
        <div className="hps-bottom-strip reveal">
          {HOME_SHOWCASE.map((p, i) => (
            <div key={p.id} className="hps-strip-item" onClick={() => setActive(i)}
              style={{ borderColor: active === i ? "rgba(255,98,0,0.4)" : undefined, boxShadow: active === i ? "0 8px 30px rgba(255,98,0,0.12)" : undefined }}>
              <div className="hps-strip-thumb"><img src={p.img} alt={p.name} /></div>
              <div>
                <div className="hps-strip-name">{p.name.replace("\n", " ")}</div>
                <div className="hps-strip-price">{p.price}</div>
              </div>
            </div>
          ))}
          {[{ name: "Obsidian One", price: "₹1,49,999" }].map((p, i) => (
            <div key={i} className="hps-strip-item" onClick={() => navigate("products")}>
              <div className="hps-strip-thumb" style={{ background: "#111827" }}><span style={{ fontSize: "1.5rem" }}>💧</span></div>
              <div><div className="hps-strip-name">{p.name}</div><div className="hps-strip-price">{p.price}</div></div>
            </div>
          ))}
          <div className="hps-strip-item" onClick={() => navigate("products")}
            style={{ background: "var(--blue)", borderColor: "transparent", justifyContent: "center", minWidth: 160 }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 8 }}>
              View All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SPARE PARTS SECTION ────────────────────────────────── */
function SparePartsSection({ navigate }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [modalPart, setModalPart] = useState(null);
  const sectionRef = useRef(null);

  const filtered = activeFilter === "All"
    ? SPARE_PARTS
    : SPARE_PARTS.filter(p => p.cat === activeFilter);

  // Animate cards in on filter change
  const [animKey, setAnimKey] = useState(0);
  const handleFilter = (f) => {
    setActiveFilter(f);
    setAnimKey(k => k + 1);
  };

  return (
    <section className="spare-parts-section" ref={sectionRef}>
      <div className="sp-bg-orb sp-orb-1" />
      <div className="sp-bg-orb sp-orb-2" />

      <div className="spare-parts-inner">
        {/* Header */}
        <div className="sp-header reveal">
          <div className="sp-eyebrow">
            <span style={{ width: 6, height: 6, background: "var(--blue)", borderRadius: "50%", display: "inline-block", animation: "pulse 2s infinite" }} />
            Genuine Spare Parts
          </div>
          <h2 className="sp-title">Every part. <em>Engineered</em><br />to last a lifetime.</h2>
          <p className="sp-sub">Original AquaPura components — precision-manufactured and certified. Keep your system performing at peak purity, always.</p>
        </div>

        {/* Filters */}
        <div className="sp-filters reveal">
          {SPARE_PARTS_CATEGORIES.map(cat => (
            <button key={cat} className={`sp-filter-btn${activeFilter === cat ? " active" : ""}`} onClick={() => handleFilter(cat)}>
              {cat}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="sp-bento" key={animKey}>
          {filtered.map((part, i) => (
            <div
              key={part.id}
              className={`sp-part-card ${part.size || ""}`}
              style={{ animationDelay: `${i * 0.04}s` }}
              onClick={() => setModalPart(part)}
            >
              <div className="sp-img-wrap">
                <img src={part.img} alt={part.name} loading="lazy" />
              </div>
              <div className="sp-card-info">
                <span className="sp-part-name">{part.name}</span>
                <span className="sp-part-cat">{part.cat}</span>
              </div>
              <div className="sp-hover-overlay">
                <button className="sp-view-btn">
                  View Details
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="sp-bottom-cta reveal">
          <div className="sp-cta-text">
            <h3>Need a specific part?</h3>
            <p>Our service team will identify and dispatch the exact component you need — within 24 hours.</p>
          </div>
          <div className="sp-cta-actions">
            <button className="sp-btn-primary" onClick={() => navigate("contact")}>
              Request a Part
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
            <button className="sp-btn-ghost" onClick={() => navigate("contact")}>Talk to a Technician</button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {modalPart && (
        <div className="sp-modal-backdrop" onClick={() => setModalPart(null)}>
          <div className="sp-modal" onClick={e => e.stopPropagation()}>
            <button className="sp-modal-close" onClick={() => setModalPart(null)}>✕</button>
            <div className="sp-modal-img">
              <img src={modalPart.img} alt={modalPart.name} />
            </div>
            <div className="sp-modal-tag">{modalPart.cat}</div>
            <div className="sp-modal-name">{modalPart.name}</div>
            <p className="sp-modal-desc">{modalPart.desc}</p>
            <div className="sp-modal-actions">
              <button className="sp-btn-primary" onClick={() => { setModalPart(null); navigate("contact"); }}>
                Enquire Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
              <button className="sp-btn-ghost" onClick={() => setModalPart(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ─── AMBIENT DROPS ──────────────────────────────────────── */
function AmbientDrops({ count = 20, color = "0,87,255" }) {
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
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vy: 0.2 + Math.random() * 0.5, vx: (Math.random() - 0.5) * 0.3,
        r: 2 + Math.random() * 6, a: 0.15 + Math.random() * 0.35,
        wobble: Math.random() * Math.PI * 2, wobbleSpeed: 0.01 + Math.random() * 0.02,
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
        if (p.y > canvas.height + 20) { p.y = -20; p.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.r * 0.55, p.r, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${p.a})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x - p.r * 0.2, p.y - p.r * 0.3, p.r * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a * 0.8})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(anim);
    };
    anim();
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, [count, color]);
  return <canvas ref={canvasRef} className="ambient-drops-canvas" />;
}

/* ─── RIPPLE ZONE ────────────────────────────────────────── */
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
    const resize = () => { canvas.width = zone.offsetWidth; canvas.height = zone.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const onMove = (e) => {
      const r = zone.getBoundingClientRect();
      ripplesRef.current.push({ x: e.clientX - r.left, y: e.clientY - r.top, r: 0, a: 0.6 });
    };
    zone.addEventListener("mousemove", onMove);
    const anim = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ripplesRef.current = ripplesRef.current.filter((rp) => rp.a > 0.01);
      ripplesRef.current.forEach((rp) => {
        rp.r += 2.5; rp.a *= 0.96;
        ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${rp.a})`; ctx.lineWidth = 1.5; ctx.stroke();
      });
      rafRef.current = requestAnimationFrame(anim);
    };
    anim();
    return () => { cancelAnimationFrame(rafRef.current); zone.removeEventListener("mousemove", onMove); window.removeEventListener("resize", resize); };
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
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = performance.now();
        const tick = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setVal(end < 100 ? +(end * eased).toFixed(1) : Math.round(end * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  const display = end >= 1000000 ? val >= 1000000 ? (val / 1000000).toFixed(1) + "M" : (val / 1000).toFixed(0) + "K" : val;
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

/* ─── SCROLL REVEAL ──────────────────────────────────────── */
function useReveal(deps = []) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
      }, { threshold: 0.12 });
      document.querySelectorAll(".reveal,.reveal-left,.tl-item").forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    }, 100);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, deps);
}

/* ─── STATS ──────────────────────────────────────────────── */
function StatsSection() {
  return (
    <section className="stats-section">
      <div className="stats-inner">
        {COUNTER_STATS.map((s, i) => (
          <div key={i} className="stat-block reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="stat-big"><AnimCounter end={s.end} suffix={s.suffix} prefix={s.prefix} /></div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ───────────────────────────────────────── */
function TestimonialsSection() {
  return (
    <section className="testi-section">
      <AmbientDrops count={25} color="255,255,255" />
      <div className="testi-inner">
        <div className="section-header reveal">
          <div className="page-eyebrow" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}>Testimonials</div>
          <h2 className="section-h" style={{ color: "#fff" }}>Trusted by those who<br /><em style={{ color: "rgba(180,210,255,1)" }}>demand more.</em></h2>
        </div>
        <div className="testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testi-card reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="testi-stars">{"★".repeat(t.rating)}</div>
              <p className="testi-quote">"{t.quote}"</p>
              <div className="testi-meta">
                <div className="testi-avatar">{t.avatar}</div>
                <div><div className="testi-name">{t.name}</div><div className="testi-role">{t.role}</div></div>
                <div className="testi-model">{t.model}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────── */
function CTABanner({ navigate }) {
  return (
    <section className="cta-banner">
      <div className="cta-bg-rings">
        {[1, 2, 3].map((i) => <div key={i} className={`cta-ring cta-ring-${i}`} />)}
      </div>
      <div className="cta-inner reveal">
        <div className="page-eyebrow">Limited 2026 Launch</div>
        <h2 className="cta-h">Your water will never<br />be the same again.</h2>
        <p className="cta-sub">Pre-order the X-Series now. Free installation across 18 Indian cities. Free water quality assessment included.</p>
        <div className="cta-actions">
          <button className="btn-primary" onClick={() => navigate("products")}>
            View All Models
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
          <button className="btn-ghost cta-ghost" onClick={() => navigate("contact")}>Book Free Assessment</button>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────── */
function Footer() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const stateRef = useRef({ drops: [], splashes: [], rings: [], poolLevel: 0, maxPool: 0, nextId: 0 });
  const rafRef = useRef(null);
  const spawnTimerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    const S = stateRef.current;
    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      S.maxPool = Math.floor(canvas.height * 0.36);
      if (S.poolLevel > S.maxPool) S.poolLevel = S.maxPool;
    };
    resize();
    window.addEventListener("resize", resize);
    const spawnBatch = () => {
      const W = canvas.width;
      const count = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        S.drops.push({ id: S.nextId++, x: 40 + Math.random() * (W - 80), y: -(10 + Math.random() * 60), vy: 1.8 + Math.random() * 2.2, r: 3 + Math.random() * 5, alpha: 0.75 + Math.random() * 0.25, wobble: Math.random() * Math.PI * 2, wobbleAmp: 0.3 + Math.random() * 0.4, wobbleSpeed: 0.025 + Math.random() * 0.03, hit: false });
      }
    };
    for (let b = 0; b < 6; b++) spawnBatch();
    spawnTimerRef.current = setInterval(spawnBatch, 600 + Math.random() * 400);
    const getPoolSurface = () => canvas.height - S.poolLevel - 2;
    const render = () => {
      const W = canvas.width; const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      if (S.poolLevel < S.maxPool) S.poolLevel = Math.min(S.poolLevel + 0.08, S.maxPool);
      const poolY = getPoolSurface();
      const poolGrad = ctx.createLinearGradient(0, poolY, 0, H);
      poolGrad.addColorStop(0, "rgba(0,87,255,0.32)");
      poolGrad.addColorStop(0.3, "rgba(0,55,200,0.24)");
      poolGrad.addColorStop(0.7, "rgba(0,30,120,0.18)");
      poolGrad.addColorStop(1, "rgba(0,10,60,0.12)");
      ctx.fillStyle = poolGrad;
      ctx.fillRect(0, poolY, W, H - poolY);
      const shimmerTime = performance.now() * 0.001;
      const shimmerX = ((shimmerTime * 0.3) % 2) * W - W * 0.5;
      const shimmerGrad = ctx.createLinearGradient(shimmerX, poolY, shimmerX + W, poolY);
      shimmerGrad.addColorStop(0, "rgba(100,190,255,0)");
      shimmerGrad.addColorStop(0.25, "rgba(160,220,255,0.55)");
      shimmerGrad.addColorStop(0.5, "rgba(255,255,255,0.85)");
      shimmerGrad.addColorStop(0.75, "rgba(160,220,255,0.55)");
      shimmerGrad.addColorStop(1, "rgba(100,190,255,0)");
      ctx.strokeStyle = shimmerGrad; ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.moveTo(0, poolY); ctx.lineTo(W, poolY); ctx.stroke();
      ctx.strokeStyle = `rgba(100,180,255,${0.18 + 0.1 * Math.sin(shimmerTime * 1.7)})`; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, poolY + 10); ctx.lineTo(W, poolY + 10); ctx.stroke();
      const nextDrops = [];
      for (const d of S.drops) {
        if (d.hit) continue;
        d.vy += 0.18; d.y += d.vy; d.wobble += d.wobbleSpeed; d.x += Math.sin(d.wobble) * d.wobbleAmp;
        if (d.y + d.r >= poolY) {
          d.hit = true;
          S.rings.push({ x: d.x, y: poolY, r: d.r * 0.5, maxR: 28 + d.r * 3.5 + Math.random() * 20, a: 0.55 + d.alpha * 0.2, speed: 0.9 + Math.random() * 0.8, scaleY: 0.28 + Math.random() * 0.08 });
          S.rings.push({ x: d.x, y: poolY, r: 1, maxR: 14 + d.r * 1.5, a: 0.35, speed: 1.4 + Math.random() * 0.6, scaleY: 0.22 });
          const splashCount = 4 + Math.floor(d.r * 1.2);
          for (let i = 0; i < splashCount; i++) {
            const ang = -Math.PI + Math.random() * Math.PI;
            const spd = 1.5 + Math.random() * 3.5;
            S.splashes.push({ x: d.x + (Math.random() - 0.5) * d.r, y: poolY, vx: Math.cos(ang) * spd, vy: -(1.8 + Math.random() * 3.8), r: 1 + Math.random() * (d.r * 0.5), life: 1.0, decay: 0.028 + Math.random() * 0.022 });
          }
          continue;
        }
        if (d.y < H + 40) nextDrops.push(d);
      }
      S.drops = nextDrops;
      for (const d of S.drops) {
        const stretch = 1 + d.vy / 20;
        ctx.save(); ctx.translate(d.x, d.y);
        ctx.beginPath(); ctx.ellipse(0, 0, d.r * 0.62, d.r * stretch, 0, 0, Math.PI * 2);
        const dg = ctx.createRadialGradient(-d.r * 0.2, -d.r * 0.3, 0, 0, 0, d.r);
        dg.addColorStop(0, `rgba(180,220,255,${d.alpha})`);
        dg.addColorStop(0.5, `rgba(80,160,255,${d.alpha * 0.9})`);
        dg.addColorStop(1, `rgba(30,100,220,${d.alpha * 0.7})`);
        ctx.fillStyle = dg; ctx.fill();
        ctx.beginPath(); ctx.ellipse(-d.r * 0.22, -d.r * 0.32, d.r * 0.22, d.r * 0.14, -0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${d.alpha * 0.75})`; ctx.fill();
        ctx.restore();
      }
      const nextSplashes = [];
      for (const sp of S.splashes) {
        sp.vy += 0.22; sp.x += sp.vx; sp.y += sp.vy; sp.life -= sp.decay;
        if (sp.life <= 0) continue;
        ctx.beginPath(); ctx.arc(sp.x, sp.y, sp.r * sp.life, 0, Math.PI * 2);
        const spg = ctx.createRadialGradient(sp.x - sp.r * 0.2, sp.y - sp.r * 0.2, 0, sp.x, sp.y, sp.r);
        spg.addColorStop(0, `rgba(220,240,255,${sp.life * 0.85})`);
        spg.addColorStop(0.6, `rgba(100,180,255,${sp.life * 0.6})`);
        spg.addColorStop(1, `rgba(50,120,220,0)`);
        ctx.fillStyle = spg; ctx.fill();
        if (sp.y > poolY) sp.life -= 0.08;
        nextSplashes.push(sp);
      }
      S.splashes = nextSplashes;
      const nextRings = [];
      for (const rp of S.rings) {
        rp.r += rp.speed; rp.a *= 0.962;
        if (rp.a < 0.008 || rp.r > rp.maxR) continue;
        ctx.save(); ctx.translate(rp.x, rp.y); ctx.scale(1, rp.scaleY);
        ctx.beginPath(); ctx.arc(0, 0, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(140,210,255,${rp.a})`; ctx.lineWidth = 1.5; ctx.stroke();
        if (rp.r > 6) {
          ctx.beginPath(); ctx.arc(0, 0, rp.r * 0.65, Math.PI * 1.1, Math.PI * 1.9);
          ctx.strokeStyle = `rgba(255,255,255,${rp.a * 0.55})`; ctx.lineWidth = 0.8; ctx.stroke();
        }
        ctx.restore(); nextRings.push(rp);
      }
      S.rings = nextRings;
      rafRef.current = requestAnimationFrame(render);
    };
    render();
    return () => { cancelAnimationFrame(rafRef.current); clearInterval(spawnTimerRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <footer className="footer-new">
      <div className="footer-drop-theatre" ref={containerRef} aria-hidden="true">
        <canvas ref={canvasRef} className="footer-drop-canvas" />
      </div>
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo-big">
            <img src="/assets/white logo.png" alt="AquaPura" style={{ height: "100px", width: "200px", objectFit: "contain" }} />
          </div>
          <p className="footer-tagline">Molecular purity.<br />Engineered for life.</p>
          <div className="footer-socials">
            {["𝕏", "in", "f", "▶"].map((s, i) => <div key={i} className="social-dot">{s}</div>)}
          </div>
        </div>
        {Object.entries(FOOTER_LINKS).map(([cat, links]) => (
          <div key={cat} className="footer-col">
            <div className="footer-col-head">{cat}</div>
            {links.map((l) => <button type="button" key={l} className="footer-link">{l}</button>)}
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

/* ─── SVG MODELS ─────────────────────────────────────────── */
function ModelElite() {
  return (
    <svg className="ro-model-svg" width="160" height="260" viewBox="0 0 160 260" fill="none">
      <defs>
        <linearGradient id="grad1" x1="30" y1="40" x2="130" y2="220" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#ddeeff" /><stop offset="100%" stopColor="#a8c8ff" /></linearGradient>
        <linearGradient id="grad2" x1="45" y1="28" x2="115" y2="44" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#b8d0ff" /><stop offset="100%" stopColor="#7aaaff" /></linearGradient>
        <linearGradient id="grad3" x1="68" y1="220" x2="92" y2="250" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#a0c0ff" /><stop offset="100%" stopColor="#6090ff" /></linearGradient>
      </defs>
      <rect x="30" y="40" width="100" height="180" rx="22" fill="url(#grad1)" />
      <rect x="30" y="40" width="100" height="180" rx="22" stroke="rgba(0,87,255,0.3)" strokeWidth="1.5" />
      <rect x="48" y="40" width="20" height="180" rx="10" fill="rgba(255,255,255,0.25)" />
      <rect x="45" y="28" width="70" height="16" rx="8" fill="url(#grad2)" />
      <rect x="45" y="150" width="70" height="50" rx="12" fill="rgba(255,255,255,0.15)" stroke="rgba(0,87,255,0.3)" strokeWidth="1" />
      <text x="80" y="183" textAnchor="middle" fontFamily="Georgia" fontSize="22" fontWeight="700" fill="#0057FF">002</text>
      <text x="80" y="196" textAnchor="middle" fontFamily="Arial" fontSize="7" fill="rgba(0,87,255,0.7)" letterSpacing="1">TDS PPM</text>
      {[80, 96, 112, 128].map((y, i) => <line key={i} x1="50" y1={y} x2="110" y2={y} stroke={`rgba(0,87,255,${0.4 - i * 0.08})`} strokeWidth="2" strokeLinecap="round" />)}
      <circle cx="100" cy="58" r="5" fill="#0057FF" />
      <circle cx="100" cy="58" r="8" fill="rgba(0,87,255,0.2)" />
      <rect x="68" y="220" width="24" height="30" rx="6" fill="url(#grad3)" />
      <ellipse cx="80" cy="258" rx="5" ry="7" fill="rgba(0,87,255,0.5)" />
    </svg>
  );
}
function ModelElement() {
  return (
    <svg className="ro-model-svg" width="140" height="240" viewBox="0 0 140 240" fill="none">
      <defs>
        <linearGradient id="darkgrad1" x1="20" y1="30" x2="120" y2="200" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#1a2030" /><stop offset="100%" stopColor="#0b1020" /></linearGradient>
        <linearGradient id="darkgrad2" x1="38" y1="20" x2="102" y2="34" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#1e3060" /><stop offset="100%" stopColor="#0a1830" /></linearGradient>
        <linearGradient id="darkgrad3" x1="55" y1="200" x2="85" y2="228" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#1e3060" /><stop offset="100%" stopColor="#0a1830" /></linearGradient>
      </defs>
      <rect x="20" y="30" width="100" height="170" rx="18" fill="url(#darkgrad1)" />
      <rect x="20" y="30" width="100" height="170" rx="18" stroke="rgba(100,150,255,0.2)" strokeWidth="1.5" />
      <rect x="36" y="30" width="16" height="170" rx="8" fill="rgba(255,255,255,0.05)" />
      <rect x="38" y="20" width="64" height="14" rx="7" fill="url(#darkgrad2)" />
      {[65, 80, 95].map((y, i) => <line key={i} x1="35" y1={y} x2="105" y2={y} stroke={`rgba(100,160,255,${0.3 - i * 0.07})`} strokeWidth="1.5" strokeLinecap="round" />)}
      <rect x="38" y="125" width="64" height="42" rx="10" fill="rgba(0,87,255,0.12)" stroke="rgba(100,160,255,0.3)" strokeWidth="1" />
      <text x="70" y="151" textAnchor="middle" fontFamily="Georgia" fontSize="20" fontWeight="700" fill="#60a0ff">004</text>
      <text x="70" y="163" textAnchor="middle" fontFamily="Arial" fontSize="6" fill="rgba(100,160,255,0.7)" letterSpacing="1">TDS PPM</text>
      <circle cx="95" cy="45" r="4" fill="#3b82f6" />
      <rect x="55" y="200" width="30" height="28" rx="7" fill="url(#darkgrad3)" />
      <ellipse cx="70" cy="233" rx="5" ry="6" fill="rgba(100,160,255,0.4)" />
    </svg>
  );
}
function ModelHydro() {
  return (
    <svg className="ro-model-svg" width="200" height="200" viewBox="0 0 200 200" fill="none">
      <defs>
        <linearGradient id="slategrad" x1="10" y1="60" x2="190" y2="140" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#e8f0ff" /><stop offset="100%" stopColor="#c8daff" /></linearGradient>
        <linearGradient id="cylgrad1" x1="18" y1="78" x2="62" y2="122" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#c0d8ff" /><stop offset="100%" stopColor="#8ab0ff" /></linearGradient>
      </defs>
      <rect x="10" y="60" width="180" height="80" rx="18" fill="url(#slategrad)" />
      <rect x="10" y="60" width="180" height="80" rx="18" stroke="rgba(0,87,255,0.2)" strokeWidth="1.5" />
      <rect x="10" y="60" width="60" height="80" rx="18" fill="rgba(0,87,255,0.08)" />
      <circle cx="40" cy="100" r="22" fill="url(#cylgrad1)" stroke="rgba(0,87,255,0.3)" strokeWidth="1" />
      <circle cx="40" cy="100" r="14" fill="rgba(255,255,255,0.5)" />
      <circle cx="40" cy="100" r="6" fill="#0057FF" opacity="0.4" />
      <rect x="100" y="75" width="70" height="50" rx="10" fill="rgba(255,255,255,0.5)" stroke="rgba(0,87,255,0.15)" />
      <text x="135" y="103" textAnchor="middle" fontFamily="Georgia" fontSize="18" fontWeight="700" fill="#0057FF">001</text>
      <text x="135" y="115" textAnchor="middle" fontFamily="Arial" fontSize="6" fill="rgba(0,87,255,0.6)" letterSpacing="1">TDS PPM</text>
      <line x1="10" y1="85" x2="0" y2="85" stroke="rgba(0,87,255,0.5)" strokeWidth="4" strokeLinecap="round" />
      <line x1="190" y1="115" x2="200" y2="115" stroke="rgba(0,87,255,0.5)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
function ModelObsidian() {
  return (
    <svg className="ro-model-svg" width="130" height="260" viewBox="0 0 130 260" fill="none">
      <defs>
        <linearGradient id="luxgrad" x1="35" y1="20" x2="95" y2="220" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#141c30" /><stop offset="100%" stopColor="#060a14" /></linearGradient>
      </defs>
      <rect x="35" y="20" width="60" height="200" rx="30" fill="url(#luxgrad)" />
      <rect x="35" y="20" width="60" height="200" rx="30" stroke="rgba(200,220,255,0.1)" strokeWidth="1.5" />
      <ellipse cx="65" cy="50" rx="22" ry="6" fill="none" stroke="rgba(200,180,100,0.5)" strokeWidth="2" />
      <rect x="43" y="20" width="12" height="200" rx="6" fill="rgba(255,255,255,0.04)" />
      <rect x="43" y="130" width="44" height="55" rx="12" fill="rgba(0,40,120,0.3)" stroke="rgba(100,140,255,0.2)" />
      <text x="65" y="162" textAnchor="middle" fontFamily="Georgia" fontSize="18" fontWeight="700" fill="#7aafff">001</text>
      <text x="65" y="176" textAnchor="middle" fontFamily="Arial" fontSize="5.5" fill="rgba(120,160,255,0.6)" letterSpacing="1">PURE TDS</text>
      {[78, 94, 110].map((y, i) => <line key={i} x1="43" y1={y} x2="87" y2={y} stroke={`rgba(100,140,255,${0.15 - i * 0.03})`} strokeWidth="1.5" strokeLinecap="round" />)}
      <circle cx="75" cy="38" r="3.5" fill="#3b7aff" />
      <rect x="52" y="220" width="26" height="30" rx="6" fill="rgba(30,50,100,0.8)" />
      <ellipse cx="65" cy="254" rx="4" ry="5.5" fill="rgba(100,150,255,0.3)" />
    </svg>
  );
}
const MODEL_SVG = { elite: ModelElite, element: ModelElement, hydro: ModelHydro, obsidian: ModelObsidian };

/* ─── PAGES ──────────────────────────────────────────────── */
function HomePage({ navigate, tds }) {
  useReveal(["home"]);
  return (
    <div className="page-home">
      <section className="hero">
        <div className="hero-bg-grid" />
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-badge"><span className="badge-dot" />2026 Collection Now Live</div>
            <h1 className="hero-h1">Water,<br /><em>Perfected</em><br />at the Atom.</h1>
            <p className="hero-sub">LetsPure multi-stage molecular filtration system removes 99.9% of contaminants while restoring essential minerals — intelligently, beautifully.</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => navigate("products")}>
                Explore Models
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
              <button className="btn-ghost" onClick={() => navigate("about")}>Our Technology</button>
            </div>
            <div className="hero-stats">
              <div><div className="stat-num">99.9%</div><div className="stat-lbl">Purity Rate</div></div>
              <div><div className="stat-num">14</div><div className="stat-lbl">Filter Stages</div></div>
              <div><div className="stat-num">1:1</div><div className="stat-lbl">Waste Ratio</div></div>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <div className="marquee-strip">
        <div className="marquee-inner">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i}>{item}{i < MARQUEE_ITEMS.length - 1 && <span className="sep"> ◆ </span>}</span>
          ))}
        </div>
      </div>

      <section className="features-section">
        <div className="features-inner">
          <div className="section-header reveal">
            <div className="page-eyebrow">Why AquaPura</div>
            <h2 className="section-h">Not just filtered — <em>perfected</em>.</h2>
            <p className="section-sub">Every drop engineered to exceed WHO purity standards, while restoring what your body truly needs.</p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="pillar-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="pillar-icon">{f.icon}</div>
                <div className="pillar-h small">{f.title}</div>
                <p className="pillar-p">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeProductShowcase navigate={navigate} />

      {/* ★ NEW: Spare Parts Section (replaces How It Works) */}
      <SparePartsSection navigate={navigate} />

      <StatsSection />
      <TestimonialsSection />
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
        <h1 className="page-h1">Redefining What<br />Pure Means.</h1>
        <p className="page-sub">Founded in 2018 in Bangalore, AquaPura was born from a single obsession: what if water could be genuinely perfect?</p>
      </div>
      <div className="pillars">
        {PILLARS.map((p, i) => (
          <div key={i} className="pillar-card reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
            <div className="pillar-icon">{p.icon}</div>
            <h3 className="pillar-h">{p.title}</h3>
            <p className="pillar-p">{p.desc}</p>
          </div>
        ))}
      </div>
      <RippleZone />
      <div className="timeline-section">
        <div className="section-header"><div className="page-eyebrow">Our Journey</div><h2 className="section-h">Built milestone by milestone.</h2></div>
        <div className="timeline">
          {TIMELINE.map((t, i) => (
            <div key={i} className="tl-item" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="tl-dot">{t.dot}</div>
              <div className="tl-content"><div className="tl-year">{t.year}</div><h4>{t.title}</h4><p>{t.desc}</p></div>
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
        <div className={`prod-badge ${p.badgeDark ? "dark" : ""}`}>{p.badge}</div>
        <SVGModel />
      </div>
      <div className="prod-body">
        <div className="prod-name">{p.name}</div>
        <div className="prod-tagline">{p.tagline}</div>
        <div className="prod-specs">{p.specs.map((s, i) => <div key={i} className="spec-row"><span className="check">✦</span> {s}</div>)}</div>
        <div className="prod-footer">
          <div className={`prod-price ${p.dark ? "white" : ""}`}>
            <small style={p.dark ? { color: "rgba(255,255,255,0.5)" } : {}}>Starting at</small>
            {p.price}
          </div>
          <button className={`btn-order ${p.btnLight ? "light" : ""}`} onClick={() => navigate("contact")}>{p.btnLabel}</button>
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
        <h1 className="page-h1">Masterpieces of<br />Engineering.</h1>
        <p className="page-sub">Four models. One obsession. Choose the AquaPura that fits your life — all redefine what pure water means.</p>
      </div>
      <div className="products-grid">
        {PRODUCTS.map((p) => <ProductCard key={p.id} p={p} navigate={navigate} />)}
      </div>
      <div className="comparison-section">
        <div className="section-header"><div className="page-eyebrow">Compare</div><h2 className="section-h">Find your perfect model.</h2></div>
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
                  {v === true ? <span className="comp-check">✓</span> : v === false ? <span className="comp-dash">—</span> : v}
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
          <div className="page-eyebrow" style={{ marginBottom: "1.5rem" }}>Get In Touch</div>
          <h1>Bring Purity<br />Home Today.</h1>
          <p>Whether you need a bespoke installation, a water quality test, or simply want to find your ideal model — our Hydration Consultants are ready.</p>
          <div className="contact-info">
            {[
              { icon: "📞", label: "Expert Helpline", val: "+91 800-AQUAPURA" },
              { icon: "✉️", label: "Email Support", val: "consult@aquapura.in" },
              { icon: "📍", label: "Headquarters", val: "Whitefield, Bengaluru 560066" },
              { icon: "🕐", label: "Hours", val: "Mon – Sat, 9 AM – 7 PM IST" },
            ].map((c, i) => (
              <div key={i} className="contact-info-row">
                <div className="contact-info-icon">{c.icon}</div>
                <div className="contact-info-text"><span>{c.label}</span><strong>{c.val}</strong></div>
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
              <p className="form-sub">Free water quality assessment included.</p>
              <div className="form-2col">
                <div className="form-row"><label>First Name</label><input type="text" placeholder="Rahul" /></div>
                <div className="form-row"><label>Last Name</label><input type="text" placeholder="Sharma" /></div>
              </div>
              <div className="form-row"><label>Email Address</label><input type="email" placeholder="rahul@email.com" /></div>
              <div className="form-row"><label>Phone Number</label><input type="tel" placeholder="+91 98765 43210" /></div>
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
              <div className="form-row"><label>Requirements / Message</label><textarea rows="3" placeholder="Tell us about your home, family size, or any water quality concerns..." /></div>
              <button className="submit-btn" onClick={() => setSubmitted(true)}>
                Request Consultation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="map-section">
        <div className="section-header" style={{ marginBottom: "2rem" }}>
          <div className="page-eyebrow">Find Us</div>
          <h2 className="section-h" style={{ fontSize: "2rem" }}>Visit our Experience Centre</h2>
        </div>
        <div className="map-inner">
          <div style={{ textAlign: "center" }}>
            <div className="map-pin">📍</div>
            <p style={{ marginTop: ".5rem", color: "var(--muted)", fontSize: ".9rem" }}>AquaPura Experience Centre, Whitefield, Bengaluru</p>
            <button className="btn-primary" style={{ marginTop: "1.2rem", fontSize: ".82rem", padding: ".7rem 1.5rem" }} onClick={() => window.open("https://maps.google.com", "_blank")}>Open in Maps</button>
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
    const el = document.createElement("style");
    el.textContent = STYLES;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

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
    return () => { clearInterval(iv); clearTimeout(t); };
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
        <button type="button" className="nav-logo" onClick={() => navigate("home")}>
          <img src="/assets/black logo.png" alt="AquaPura" style={{ height: "100px", width: "200px", objectFit: "contain" }} />
        </button>
        <div className="nav-links">
          {NAV_LINKS.map((p) => (
            <button type="button" key={p} onClick={() => navigate(p)} className={page === p ? "active" : ""}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
          <button className="nav-cta" onClick={() => navigate("contact")}>Get a Quote</button>
        </div>
        <button className="hamburger" onClick={() => setMobileOpen((v) => !v)}>
          <span /><span /><span />
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