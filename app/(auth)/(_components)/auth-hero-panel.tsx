"use client";

import Link from "next/link";
import Image from "next/image";

interface AuthHeroPanelProps {
  variant: "login" | "register" | "forgot" | "reset";
}

/* ---------- per-page copy ---------- */
const content = {
  login: {
    headline: "Welcome back, let's pick up where you left off.",
    accent: "pick up",
    sub: "Your closet is waiting. Sign in and keep the vibe going.",
    accentColor: "#60a5fa",
    badges: [
      { icon: "🔒", label: "256-bit SSL" },
      { icon: "⚡", label: "Instant Access" },
      { icon: "🛡️", label: "Privacy First" },
    ],
  },
  register: {
    headline: "Your style story starts with a single tap.",
    accent: "single tap",
    sub: "Join thousands of trendsetters discovering their next favorite look.",
    accentColor: "#c084fc",
    badges: [
      { icon: "✨", label: "Free Forever" },
      { icon: "🎁", label: "Welcome Gift" },
      { icon: "🚀", label: "30-Sec Setup" },
    ],
  },
  forgot: {
    headline: "No worries, we'll get you back in no time.",
    accent: "back in",
    sub: "A quick reset link is all it takes. Your wardrobe misses you.",
    accentColor: "#34d399",
    badges: [
      { icon: "📧", label: "Email Link" },
      { icon: "⏱️", label: "2 Min Reset" },
      { icon: "🔐", label: "Encrypted" },
    ],
  },
  reset: {
    headline: "Almost there — set a fresh password and you're in.",
    accent: "fresh password",
    sub: "One last step before you're back to swiping, shopping, and smiling.",
    accentColor: "#34d399",
    badges: [
      { icon: "🛡️", label: "Secure Reset" },
      { icon: "✅", label: "Verified" },
      { icon: "🔒", label: "Encrypted" },
    ],
  },
};

/* ================================================================== */
/*  SCENE 1 — Shopping Discovery (Login)                              */
/*  Phone with swipe cards, floating products, cart, wishlist          */
/* ================================================================== */
function ShoppingDiscoveryScene() {
  return (
    <svg viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 400, height: "auto" }}>
      <defs>
        <filter id="g1"><feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e3a5f" /><stop offset="100%" stopColor="#0f2440" /></linearGradient>
      </defs>

      {/* ── Phone ── */}
      <g>
        <rect x="148" y="50" width="184" height="340" rx="28" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        <rect x="158" y="70" width="164" height="300" rx="20" fill="#0f172a" />
        <rect x="205" y="56" width="70" height="6" rx="3" fill="#334155" />
        <circle cx="240" cy="56" r="3" fill="#475569" />

        {/* ── Stacked swipe cards ── */}
        <g opacity="0.35">
          <rect x="178" y="98" width="124" height="155" rx="14" fill="#1e3a5f" stroke="#334155" strokeWidth="1" />
        </g>
        <g opacity="0.6" transform="translate(2,-2)">
          <rect x="174" y="93" width="132" height="160" rx="14" fill="#1a3050" stroke="#2563eb" strokeWidth="0.5" />
        </g>
        {/* Front card */}
        <g>
          <rect x="170" y="88" width="140" height="168" rx="16" fill="url(#cardGrad)" stroke="#2563eb" strokeWidth="1" />
          <rect x="180" y="98" width="120" height="90" rx="10" fill="#0f2440" />
          {/* Sneaker */}
          <g transform="translate(215, 128)">
            <ellipse cx="25" cy="22" rx="30" ry="6" fill="#1a3050" />
            <path d="M0,10 Q5,-8 20,-10 Q35,-12 50,0 L48,12 Q45,18 40,18 L10,18 Q2,18 0,10Z" fill="#3b82f6" />
            <path d="M5,12 Q8,8 15,8 Q25,6 35,8 L40,12" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
            <rect x="0" y="14" width="48" height="5" rx="2.5" fill="#2563eb" />
            <circle cx="12" cy="16" r="2" fill="#1e3a5f" />
            <circle cx="22" cy="16" r="2" fill="#1e3a5f" />
            <circle cx="32" cy="16" r="2" fill="#1e3a5f" />
          </g>
          <text x="190" y="208" fill="#fff" fontSize="11" fontWeight="700" fontFamily="system-ui">Air Zoom Runner</text>
          <text x="190" y="222" fill="#94a3b8" fontSize="9" fontFamily="system-ui">Premium Collection</text>
          <g transform="translate(190, 230)">
            {[0,10,20,30,40].map(x => (
              <polygon key={x} points="4,-4 5.2,-1 8,-1 5.8,0.8 6.5,4 4,2 1.5,4 2.2,0.8 0,-1 2.8,-1" transform={`translate(${x},0) scale(0.7)`} fill="#fbbf24" />
            ))}
            <text x="42" y="2" fill="#94a3b8" fontSize="7" fontFamily="system-ui">4.9</text>
          </g>
          <text x="190" y="252" fill="#60a5fa" fontSize="16" fontWeight="800" fontFamily="system-ui">$129</text>
          <text x="232" y="250" fill="#475569" fontSize="9" fontFamily="system-ui" textDecoration="line-through">$189</text>
        </g>

        {/* Swipe arrows */}
        <g opacity="0.3">
          <path d="M170 170 L158 172 L170 174" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M310 170 L322 172 L310 174" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Bottom action buttons */}
        <g transform="translate(170, 270)">
          <circle cx="22" cy="16" r="18" fill="none" stroke="#475569" strokeWidth="1.5" />
          <path d="M15,9 L29,23 M29,9 L15,23" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="74" cy="16" r="18" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
          <path d="M74,8 C69,0 60,8 74,20 C88,8 79,0 74,8Z" fill="#f43f5e" opacity="0.7" />
          <circle cx="118" cy="16" r="18" fill="none" stroke="#10b981" strokeWidth="1.5" />
          <path d="M108,10 L111,10 L114,22 L124,22 L126,14 L112,14" fill="none" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="115" cy="25" r="1.5" fill="#34d399" />
          <circle cx="123" cy="25" r="1.5" fill="#34d399" />
        </g>

        <rect x="210" y="358" width="60" height="4" rx="2" fill="#334155" />
      </g>

      {/* ── Floating shopping bag ── */}
      <g filter="url(#g1)">
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,-12; 0,0" dur="4s" repeatCount="indefinite" />
        <g transform="translate(42, 140)">
          <rect width="72" height="85" rx="8" fill="#1e3a5f" stroke="#2563eb" strokeWidth="1.2" />
          <path d="M20,0 C20,-18 52,-18 52,0" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
          <text x="10" y="45" fill="#60a5fa" fontSize="9" fontWeight="800" fontFamily="system-ui" opacity="0.8">TAPTO</text>
          <rect x="10" y="52" width="52" height="3" rx="1.5" fill="#334155" />
          <rect x="10" y="60" width="34" height="3" rx="1.5" fill="#334155" />
          <circle cx="64" cy="8" r="11" fill="#2563eb" />
          <text x="59" y="12" fill="#fff" fontSize="10" fontWeight="700" fontFamily="system-ui">✓</text>
        </g>
      </g>

      {/* ── Credit card (right) ── */}
      <g filter="url(#g1)">
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,10; 0,0" dur="5s" repeatCount="indefinite" />
        <g transform="translate(356, 160) rotate(15)">
          <rect width="95" height="60" rx="10" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="1" />
          <rect x="10" y="16" width="24" height="18" rx="3" fill="#fbbf24" opacity="0.5" />
          <rect x="10" y="42" width="38" height="4" rx="2" fill="#475569" />
          <rect x="54" y="42" width="22" height="4" rx="2" fill="#475569" />
          <path d="M72,14 Q77,12 78,17" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.6" />
          <path d="M76,12 Q81,10 82,15" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.4" />
        </g>
      </g>

      {/* ── Discount tag (top-right) ── */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0; 4,-6; 0,0" dur="3.2s" repeatCount="indefinite" />
        <g transform="translate(375, 80)">
          <rect x="-28" y="-16" width="56" height="32" rx="8" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="1.2" />
          <text x="-20" y="4" fill="#fbbf24" fontSize="14" fontWeight="800" fontFamily="system-ui">-30%</text>
        </g>
      </g>

      {/* ── Notification (top-left) ── */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0; 3,-5; 0,0" dur="3.8s" repeatCount="indefinite" />
        <g transform="translate(78, 72)">
          <rect x="-20" y="-16" width="40" height="32" rx="10" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="1.2" />
          <path d="M0,-6 C-7,-6 -9,0 -9,4 L-10,4 Q-10,6 10,6 L10,4 L9,4 C9,0 7,-6 0,-6Z" fill="#a78bfa" opacity="0.6" />
          <circle cx="0" cy="8" r="2" fill="#a78bfa" opacity="0.6" />
          <circle cx="8" cy="-10" r="5" fill="#ef4444" />
          <text x="5.5" y="-6.5" fill="#fff" fontSize="6" fontWeight="700" fontFamily="system-ui">3</text>
        </g>
      </g>

      {/* ── Gift box (bottom-right) ── */}
      <g filter="url(#g1)">
        <animateTransform attributeName="transform" type="translate" values="0,0; -4,8; 0,0" dur="4.8s" repeatCount="indefinite" />
        <g transform="translate(390, 340)">
          <rect x="-22" y="-8" width="44" height="30" rx="4" fill="#7c3aed" opacity="0.3" stroke="#8b5cf6" strokeWidth="1" />
          <rect x="-22" y="-14" width="44" height="10" rx="3" fill="#7c3aed" opacity="0.4" />
          <rect x="-2" y="-14" width="4" height="36" rx="1" fill="#a78bfa" opacity="0.4" />
          <path d="M0,-14 C-8,-22 -18,-14 0,-8 C18,-14 8,-22 0,-14Z" fill="#c084fc" opacity="0.5" />
        </g>
      </g>

      {/* sparkles */}
      <g fill="#60a5fa" opacity="0.35">
        <circle cx="135" cy="115" r="2"><animate attributeName="opacity" values="0.15;0.7;0.15" dur="2s" repeatCount="indefinite" /></circle>
        <circle cx="355" cy="130" r="1.5"><animate attributeName="opacity" values="0.2;0.8;0.2" dur="2.6s" repeatCount="indefinite" /></circle>
        <circle cx="410" cy="280" r="2"><animate attributeName="opacity" values="0.15;0.6;0.15" dur="3s" repeatCount="indefinite" /></circle>
        <circle cx="55" cy="300" r="1.5"><animate attributeName="opacity" values="0.2;0.7;0.2" dur="2.4s" repeatCount="indefinite" /></circle>
        <circle cx="330" cy="410" r="1"><animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.8s" repeatCount="indefinite" /></circle>
      </g>
    </svg>
  );
}

/* ================================================================== */
/*  SCENE 2 — Fashion & Style (Register)                              */
/*  Wardrobe rack, outfits, color palette, accessories                */
/* ================================================================== */
function FashionStyleScene() {
  return (
    <svg viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 400, height: "auto" }}>
      <defs>
        <filter id="g2"><feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>

      {/* ── Clothing Rack ── */}
      <g>
        <rect x="100" y="60" width="4" height="300" rx="2" fill="#334155" />
        <rect x="376" y="60" width="4" height="300" rx="2" fill="#334155" />
        <rect x="96" y="60" width="288" height="5" rx="2.5" fill="#475569" />
        <rect x="80" y="350" width="40" height="4" rx="2" fill="#334155" />
        <rect x="360" y="350" width="40" height="4" rx="2" fill="#334155" />

        {/* ── Hanger 1: T-Shirt (purple) ── */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,-4; 0,0" dur="5s" repeatCount="indefinite" />
          <g transform="translate(145, 60)">
            <path d="M0,8 L0,0 Q0,-6 6,-8 Q12,-10 12,-4" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            <path d="M-30,8 L0,0 L30,8" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M-26,10 L-34,22 L-22,28 L-18,18 L-18,65 L18,65 L18,18 L22,28 L34,22 L26,10 L12,14 Q0,18 -12,14Z" fill="#7c3aed" opacity="0.7" stroke="#8b5cf6" strokeWidth="1" />
            <path d="M-12,14 Q0,22 12,14" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.5" />
            <text x="-14" y="48" fill="#a78bfa" fontSize="7" fontWeight="700" fontFamily="system-ui" opacity="0.6">TAPTO</text>
          </g>
        </g>

        {/* ── Hanger 2: Dress (rose) ── */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,-6; 0,0" dur="4.2s" repeatCount="indefinite" />
          <g transform="translate(240, 60)">
            <path d="M0,8 L0,0 Q0,-6 6,-8 Q12,-10 12,-4" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            <path d="M-28,8 L0,0 L28,8" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M-16,10 L-12,14 Q0,18 12,14 L16,10 L14,30 L22,85 Q0,92 -22,85 L-14,30Z" fill="#e11d48" opacity="0.6" stroke="#f43f5e" strokeWidth="1" />
            <path d="M-12,14 Q0,22 12,14" fill="none" stroke="#fb7185" strokeWidth="1" opacity="0.5" />
            <rect x="-15" y="32" width="30" height="3" rx="1.5" fill="#fbbf24" opacity="0.5" />
          </g>
        </g>

        {/* ── Hanger 3: Jacket (blue) ── */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,-3; 0,0" dur="5.5s" repeatCount="indefinite" />
          <g transform="translate(335, 60)">
            <path d="M0,8 L0,0 Q0,-6 6,-8 Q12,-10 12,-4" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            <path d="M-28,8 L0,0 L28,8" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M-24,10 L-32,24 L-26,28 L-22,18 L-22,70 L-4,70 L-4,22 L4,22 L4,70 L22,70 L22,18 L26,28 L32,24 L24,10 L12,14 Q0,18 -12,14Z" fill="#1d4ed8" opacity="0.6" stroke="#3b82f6" strokeWidth="1" />
            <path d="M-12,14 L-4,22 L0,16 L4,22 L12,14 Q0,20 -12,14Z" fill="#2563eb" opacity="0.5" />
            <rect x="7" y="40" width="12" height="10" rx="2" fill="none" stroke="#60a5fa" strokeWidth="0.8" opacity="0.4" />
          </g>
        </g>
      </g>

      {/* ── Style card (left) ── */}
      <g filter="url(#g2)">
        <animateTransform attributeName="transform" type="translate" values="0,0; 5,-8; 0,0" dur="4.5s" repeatCount="indefinite" />
        <g transform="translate(35, 250)">
          <rect width="90" height="110" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <rect x="15" y="10" width="60" height="55" rx="8" fill="#0f172a" />
          <circle cx="45" cy="32" r="12" fill="#8b5cf6" opacity="0.2" />
          <path d="M38,28 L38,42 L52,42 L52,28 Q45,22 38,28Z" fill="#a78bfa" opacity="0.4" />
          <text x="12" y="80" fill="#e2e8f0" fontSize="8" fontWeight="600" fontFamily="system-ui">Casual Fit</text>
          <text x="12" y="92" fill="#64748b" fontSize="7" fontFamily="system-ui">3 items · $189</text>
          <circle cx="72" cy="86" r="8" fill="#10b981" opacity="0.3" />
          <path d="M69,86 L71,88 L76,83" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>

      {/* ── Color palette (right) ── */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0; -4,6; 0,0" dur="3.8s" repeatCount="indefinite" />
        <g transform="translate(370, 260)">
          <rect x="-12" y="-12" width="80" height="95" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <text x="-2" y="4" fill="#94a3b8" fontSize="7" fontWeight="600" fontFamily="system-ui">COLORS</text>
          {[
            { x: 0, y: 14, c: "#ef4444" }, { x: 22, y: 14, c: "#f97316" }, { x: 44, y: 14, c: "#eab308" },
            { x: 0, y: 36, c: "#22c55e" }, { x: 22, y: 36, c: "#3b82f6" }, { x: 44, y: 36, c: "#8b5cf6" },
          ].map((s, i) => (
            <g key={i}>
              <rect x={s.x} y={s.y} width="18" height="18" rx="5" fill={s.c} opacity="0.6" />
              {i === 4 && <rect x={s.x - 1} y={s.y - 1} width="20" height="20" rx="6" fill="none" stroke="#fff" strokeWidth="1.5" />}
            </g>
          ))}
          <text x="6" y="72" fill="#64748b" fontSize="6" fontFamily="system-ui">Selected: Blue</text>
        </g>
      </g>

      {/* ── Size picker (top-right) ── */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0; 3,-5; 0,0" dur="3.2s" repeatCount="indefinite" />
        <g transform="translate(400, 50)">
          <rect x="-30" y="-14" width="60" height="28" rx="14" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
          {["S", "M", "L"].map((s, i) => (
            <g key={s}>
              <circle cx={-16 + i * 16} cy="0" r="8" fill={s === "M" ? "#f59e0b" : "transparent"} stroke={s === "M" ? "#f59e0b" : "#475569"} strokeWidth="1" opacity={s === "M" ? 0.6 : 0.4} />
              <text x={-16 + i * 16} y="3.5" fill={s === "M" ? "#fff" : "#94a3b8"} fontSize="7" fontWeight="600" fontFamily="system-ui" textAnchor="middle">{s}</text>
            </g>
          ))}
        </g>
      </g>

      {/* ── Crown badge (top-left) ── */}
      <g filter="url(#g2)">
        <animateTransform attributeName="transform" type="translate" values="0,0; 4,5; 0,0" dur="4s" repeatCount="indefinite" />
        <g transform="translate(55, 55)">
          <circle r="18" fill="#1e293b" stroke="#fbbf24" strokeWidth="1.2" />
          <path d="M-8,4 L-6,-4 L-2,0 L2,-6 L6,0 L10,-4 L12,4Z" fill="#fbbf24" opacity="0.6" />
          <rect x="-8" y="4" width="20" height="3" rx="1.5" fill="#fbbf24" opacity="0.5" />
        </g>
      </g>

      {/* ── Shoe box (bottom) ── */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,6; 0,0" dur="5.2s" repeatCount="indefinite" />
        <g transform="translate(190, 380)">
          <rect x="0" y="0" width="100" height="50" rx="6" fill="#1e293b" stroke="#f97316" strokeWidth="1" />
          <rect x="0" y="0" width="100" height="14" rx="6" fill="#f97316" opacity="0.15" />
          <text x="22" y="10" fill="#fb923c" fontSize="7" fontWeight="700" fontFamily="system-ui">NEW DROP</text>
          <path d="M20,28 Q25,20 40,22 Q55,24 60,30 L58,36 L18,36Z" fill="#3b82f6" opacity="0.4" />
          <rect x="18" y="34" width="42" height="4" rx="2" fill="#2563eb" opacity="0.5" />
        </g>
      </g>

      {/* sparkles */}
      <g fill="#c084fc" opacity="0.3">
        <circle cx="130" cy="180" r="2"><animate attributeName="opacity" values="0.15;0.7;0.15" dur="2.2s" repeatCount="indefinite" /></circle>
        <circle cx="420" cy="170" r="1.5"><animate attributeName="opacity" values="0.2;0.8;0.2" dur="2.8s" repeatCount="indefinite" /></circle>
        <circle cx="50" cy="380" r="1.5"><animate attributeName="opacity" values="0.2;0.7;0.2" dur="3s" repeatCount="indefinite" /></circle>
        <circle cx="440" cy="400" r="2"><animate attributeName="opacity" values="0.15;0.6;0.15" dur="2.5s" repeatCount="indefinite" /></circle>
        <circle cx="240" cy="450" r="1"><animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.8s" repeatCount="indefinite" /></circle>
      </g>
    </svg>
  );
}

/* ================================================================== */
/*  SCENE 3 — Security & Recovery (Forgot / Reset Password)           */
/*  Shield, lock, key, fingerprint, OTP, encrypted chain              */
/* ================================================================== */
function SecurityScene() {
  return (
    <svg viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 400, height: "auto" }}>
      <defs>
        <filter id="g3"><feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>

      {/* ── Central Shield ── */}
      <g transform="translate(240, 210)">
        <circle r="100" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.15">
          <animate attributeName="r" values="98;104;98" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.15;0.08;0.15" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle r="85" fill="none" stroke="#10b981" strokeWidth="0.3" opacity="0.1">
          <animate attributeName="r" values="83;90;83" dur="5s" repeatCount="indefinite" />
        </circle>

        <path d="M0,-70 L55,-50 L55,10 Q55,55 0,75 Q-55,55 -55,10 L-55,-50Z" fill="#0f2a20" stroke="#10b981" strokeWidth="2" />
        <path d="M0,-58 L44,-40 L44,8 Q44,44 0,60 Q-44,44 -44,8 L-44,-40Z" fill="#0a1f17" stroke="#34d399" strokeWidth="0.5" opacity="0.5" />

        {/* Lock inside shield */}
        <g transform="translate(0, -8)">
          <rect x="-18" y="-4" width="36" height="28" rx="5" fill="#10b981" opacity="0.25" stroke="#34d399" strokeWidth="1.5" />
          <path d="M-10,-4 L-10,-14 Q-10,-26 0,-26 Q10,-26 10,-14 L10,-4" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="0" cy="8" r="5" fill="#10b981" opacity="0.5" />
          <rect x="-2" y="10" width="4" height="8" rx="1" fill="#10b981" opacity="0.5" />
        </g>

        {/* Checkmark badge */}
        <g transform="translate(38, -44)">
          <circle r="14" fill="#059669" opacity="0.3" stroke="#34d399" strokeWidth="1" />
          <path d="M-5,0 L-1,4 L6,-4" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* ── Key (left) ── */}
      <g filter="url(#g3)">
        <animateTransform attributeName="transform" type="translate" values="0,0; 6,-10; 0,0" dur="4.5s" repeatCount="indefinite" />
        <g transform="translate(65, 150) rotate(-25)">
          <circle cx="0" cy="0" r="18" fill="#1e293b" stroke="#fbbf24" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="8" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.4" />
          <rect x="-3" y="16" width="6" height="55" rx="3" fill="#1e293b" stroke="#fbbf24" strokeWidth="1.5" />
          <rect x="3" y="50" width="10" height="5" rx="1" fill="#fbbf24" opacity="0.5" />
          <rect x="3" y="60" width="7" height="5" rx="1" fill="#fbbf24" opacity="0.4" />
        </g>
      </g>

      {/* ── Fingerprint (right) ── */}
      <g filter="url(#g3)">
        <animateTransform attributeName="transform" type="translate" values="0,0; -4,8; 0,0" dur="5s" repeatCount="indefinite" />
        <g transform="translate(395, 170)">
          <circle r="32" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <path d="M0,-16 Q-14,-14 -14,0 Q-14,14 0,16" fill="none" stroke="#8b5cf6" strokeWidth="1.2" opacity="0.6" />
          <path d="M0,-12 Q-10,-10 -10,0 Q-10,10 0,12" fill="none" stroke="#8b5cf6" strokeWidth="1.2" opacity="0.5" />
          <path d="M0,-8 Q-6,-6 -6,0 Q-6,6 0,8" fill="none" stroke="#a78bfa" strokeWidth="1.2" opacity="0.6" />
          <path d="M0,-16 Q14,-14 14,0 Q14,14 0,16" fill="none" stroke="#8b5cf6" strokeWidth="1.2" opacity="0.6" />
          <path d="M0,-12 Q10,-10 10,0 Q10,10 0,12" fill="none" stroke="#8b5cf6" strokeWidth="1.2" opacity="0.5" />
          <path d="M0,-8 Q6,-6 6,0 Q6,6 0,8" fill="none" stroke="#a78bfa" strokeWidth="1.2" opacity="0.6" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="#c084fc" strokeWidth="1.5" opacity="0.4" />
        </g>
      </g>

      {/* ── Email envelope (bottom-left) ── */}
      <g filter="url(#g3)">
        <animateTransform attributeName="transform" type="translate" values="0,0; 5,7; 0,0" dur="4s" repeatCount="indefinite" />
        <g transform="translate(90, 350)">
          <rect x="-30" y="-18" width="60" height="36" rx="6" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.2" />
          <path d="M-30,-18 L0,4 L30,-18" fill="none" stroke="#60a5fa" strokeWidth="1.2" strokeLinejoin="round" />
          <rect x="-18" y="2" width="36" height="2" rx="1" fill="#334155" />
          <rect x="-18" y="8" width="24" height="2" rx="1" fill="#334155" />
          <circle cx="26" cy="-14" r="6" fill="#ef4444" />
          <text x="23.5" y="-10.5" fill="#fff" fontSize="7" fontWeight="700" fontFamily="system-ui">1</text>
        </g>
      </g>

      {/* ── Password dots (bottom-right) ── */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0; -3,6; 0,0" dur="3.5s" repeatCount="indefinite" />
        <g transform="translate(380, 360)">
          <rect x="-40" y="-16" width="80" height="32" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={-28 + i * 12} cy="0" r="4" fill="#10b981" opacity={0.3 + i * 0.1}>
              <animate attributeName="opacity" values={`${0.2 + i * 0.05};${0.6 + i * 0.05};${0.2 + i * 0.05}`} dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      </g>

      {/* ── Rotating ring (top) ── */}
      <g transform="translate(240, 65)">
        <animateTransform attributeName="transform" type="rotate" values="0 240 65; 360 240 65" dur="20s" repeatCount="indefinite" />
        <circle r="28" fill="none" stroke="#1e3a5f" strokeWidth="3" strokeDasharray="8 12" />
      </g>

      {/* ── OTP code (top-left) ── */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0; 4,-4; 0,0" dur="3.8s" repeatCount="indefinite" />
        <g transform="translate(70, 80)">
          <rect x="-28" y="-16" width="56" height="32" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={-22 + i * 13} y="-6" width="10" height="14" rx="2" fill="#0a1f17" stroke="#10b981" strokeWidth="0.5" opacity="0.5" />
              <text x={-17 + i * 13} y="5" fill="#34d399" fontSize="9" fontWeight="700" fontFamily="system-ui" textAnchor="middle">
                {[4, 7, 2, 9][i]}
              </text>
            </g>
          ))}
        </g>
      </g>

      {/* ── Chain links (right edge) ── */}
      <g opacity="0.2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i} transform={`translate(450, ${80 + i * 60})`}>
            <circle r="8" fill="none" stroke="#10b981" strokeWidth="1" />
            {i < 5 && <line x1="0" y1="8" x2="0" y2="52" stroke="#10b981" strokeWidth="0.5" />}
          </g>
        ))}
      </g>

      {/* sparkles */}
      <g fill="#34d399" opacity="0.3">
        <circle cx="160" cy="100" r="2"><animate attributeName="opacity" values="0.15;0.7;0.15" dur="2s" repeatCount="indefinite" /></circle>
        <circle cx="340" cy="100" r="1.5"><animate attributeName="opacity" values="0.2;0.8;0.2" dur="2.5s" repeatCount="indefinite" /></circle>
        <circle cx="160" cy="380" r="1.5"><animate attributeName="opacity" values="0.2;0.7;0.2" dur="2.8s" repeatCount="indefinite" /></circle>
        <circle cx="430" cy="440" r="2"><animate attributeName="opacity" values="0.15;0.6;0.15" dur="3s" repeatCount="indefinite" /></circle>
        <circle cx="50" cy="240" r="1"><animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.9s" repeatCount="indefinite" /></circle>
      </g>
    </svg>
  );
}

/* ================================================================== */
/*  Scene picker                                                       */
/* ================================================================== */
function SceneForVariant({ variant }: { variant: AuthHeroPanelProps["variant"] }) {
  switch (variant) {
    case "login":
      return <ShoppingDiscoveryScene />;
    case "register":
      return <FashionStyleScene />;
    case "forgot":
    case "reset":
      return <SecurityScene />;
  }
}

/* ================================================================== */
/*  Ambient glow / dot colors per variant                              */
/* ================================================================== */
const glowColors: Record<string, { top: string; bottom: string }> = {
  login: { top: "rgba(37,99,235,0.18)", bottom: "rgba(139,92,246,0.12)" },
  register: { top: "rgba(139,92,246,0.18)", bottom: "rgba(236,72,153,0.10)" },
  forgot: { top: "rgba(16,185,129,0.16)", bottom: "rgba(37,99,235,0.10)" },
  reset: { top: "rgba(16,185,129,0.16)", bottom: "rgba(37,99,235,0.10)" },
};

const dotColors: Record<string, string> = {
  login: "rgba(99,131,255,0.06)",
  register: "rgba(168,85,247,0.06)",
  forgot: "rgba(52,211,153,0.05)",
  reset: "rgba(52,211,153,0.05)",
};

/* ================================================================== */
/*  Main Component                                                     */
/* ================================================================== */
export default function AuthHeroPanel({ variant }: AuthHeroPanelProps) {
  const c = content[variant];
  const glow = glowColors[variant];
  const dot = dotColors[variant];

  const idx = c.headline.indexOf(c.accent);
  const before = c.headline.slice(0, idx);
  const after = c.headline.slice(idx + c.accent.length);

  return (
    <div
      className="hidden lg:flex"
      style={{
        width: "50%",
        flexShrink: 0,
        background: "linear-gradient(160deg, #0a0f1e 0%, #0f172a 45%, #111d35 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 1px 1px, ${dot} 1px, transparent 0)`, backgroundSize: "32px 32px", pointerEvents: "none" }} />

      {/* Ambient glows */}
      <div style={{ position: "absolute", top: "-15%", right: "-10%", width: "50%", height: "50%", borderRadius: "50%", background: `radial-gradient(circle, ${glow.top} 0%, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: "40%", height: "40%", borderRadius: "50%", background: `radial-gradient(circle, ${glow.bottom} 0%, transparent 70%)`, filter: "blur(50px)", pointerEvents: "none" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "2.5rem 3rem", width: "100%" }}>
        {/* Logo */}
        <Link href="/landingpage" className="flex items-center gap-3 w-fit" style={{ marginBottom: "1rem" }}>
          <Image src="/logo1.png" alt="TAPTO" width={44} height={44} style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.1)", padding: 6, backdropFilter: "blur(8px)" }} />
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>TAPTO</div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Swipe · Shop · Smile</div>
          </div>
        </Link>

        {/* Illustration */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem 0" }}>
          <SceneForVariant variant={variant} />
        </div>

        {/* Headline + sub */}
        <div style={{ maxWidth: 400 }}>
          <h1 style={{ fontSize: "1.65rem", fontWeight: 700, lineHeight: 1.35, color: "#fff", marginBottom: "0.65rem", letterSpacing: "-0.01em" }}>
            {before}<span style={{ color: c.accentColor }}>{c.accent}</span>{after}
          </h1>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "rgba(255,255,255,0.45)" }}>{c.sub}</p>

          {/* Trust badges */}
          <div style={{ display: "flex", gap: "0.6rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
            {c.badges.map((badge) => (
              <div key={badge.label} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.3rem 0.65rem", borderRadius: "9999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontSize: "0.72rem", color: "rgba(255,255,255,0.5)" }}>
                <span style={{ fontSize: "0.75rem" }}>{badge.icon}</span>
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
