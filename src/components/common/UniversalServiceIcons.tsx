import React from 'react';

// Universally readable, high-contrast icons for all ages (anak-anak hingga lansia)
// Bold outlines, clear glyphs, unmistakable silhouettes

// 1. Antar Jemput (Motorbike with passenger helmet & motion)
export const UniversalAntarJemputIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Wheels */}
    <circle cx="12" cy="35" r="7" className="fill-slate-900 stroke-white" strokeWidth="2.5" />
    <circle cx="12" cy="35" r="3" className="fill-slate-300 stroke-none" />
    <circle cx="36" cy="35" r="7" className="fill-slate-900 stroke-white" strokeWidth="2.5" />
    <circle cx="36" cy="35" r="3" className="fill-slate-300 stroke-none" />
    {/* Chassis & Body */}
    <path d="M12 35l8-12h10l6 12" className="stroke-white" strokeWidth="3" />
    <path d="M20 23l-3-7h-5" className="stroke-white" strokeWidth="3" />
    {/* Driver & Passenger Helmets */}
    <circle cx="21" cy="11" r="5" className="fill-amber-400 stroke-white" strokeWidth="2" />
    <circle cx="29" cy="12" r="4.5" className="fill-sky-300 stroke-white" strokeWidth="2" />
    {/* Seat & Headlight beam */}
    <path d="M18 23h12" className="stroke-amber-300" strokeWidth="3.5" />
    <path d="M38 27l6-2" className="stroke-yellow-300" strokeWidth="2.5" />
  </svg>
);

// 2. Kuliner (Steaming Hot Bowl with Spoon and Fork)
export const UniversalKulinerIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Bowl */}
    <path d="M8 22h32c0 10-7 18-16 18S8 32 8 22z" className="fill-orange-500 stroke-white" strokeWidth="2.5" />
    {/* Bowl Base */}
    <path d="M18 40h12" className="stroke-white" strokeWidth="3" />
    {/* Food Content Top Line */}
    <path d="M10 22c4-3 10-3 14 0s10 3 14 0" className="stroke-amber-300" strokeWidth="2" />
    {/* Steams (Aroma lezat) */}
    <path d="M16 16c-1-3 1-6 0-9" className="stroke-yellow-300" strokeWidth="2.5" />
    <path d="M24 16c-1-3 1-6 0-9" className="stroke-yellow-300" strokeWidth="2.5" />
    <path d="M32 16c-1-3 1-6 0-9" className="stroke-yellow-300" strokeWidth="2.5" />
  </svg>
);

// 3. Paket Cepat (Fast Delivery Parcel Box with Express Wings/Speed)
export const UniversalPaketCepatIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {/* 3D Box */}
    <path d="M24 6l16 8v16l-16 8-16-8V14l16-8z" className="fill-amber-600 stroke-white" strokeWidth="2.5" />
    <path d="M24 6v16l16 8" className="stroke-amber-200" strokeWidth="2" />
    <path d="M24 22L8 14" className="stroke-amber-200" strokeWidth="2" />
    {/* Express Lightning Bolt / Speed Tape */}
    <path d="M26 12l-6 10h5l-3 8 8-10h-5l4-8z" className="fill-yellow-300 stroke-slate-900" strokeWidth="1.5" />
  </svg>
);

// 4. Sembako (Shopping Basket with Fresh Groceries)
export const UniversalSembakoIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Basket */}
    <path d="M6 22h36l-4 18H10L6 22z" className="fill-emerald-600 stroke-white" strokeWidth="2.5" />
    {/* Handle */}
    <path d="M16 22V14c0-4.4 3.6-8 8-8s8 3.6 8 8v8" className="stroke-white" strokeWidth="3" />
    {/* Groceries inside */}
    <circle cx="18" cy="19" r="4" className="fill-rose-400 stroke-white" strokeWidth="1.5" />
    <path d="M27 12l3 7h-6z" className="fill-amber-400 stroke-white" strokeWidth="1.5" />
    <rect x="22" y="16" width="6" height="6" rx="1" className="fill-sky-300 stroke-white" strokeWidth="1.5" />
  </svg>
);

// 5. Apotek (Medical Cross with Pill Capsule)
export const UniversalApotekIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Shield / Badge */}
    <rect x="8" y="8" width="32" height="32" rx="8" className="fill-rose-600 stroke-white" strokeWidth="2.5" />
    {/* Bold Medical Cross */}
    <path d="M24 14v20M14 24h20" className="stroke-white" strokeWidth="5" strokeLinecap="square" />
  </svg>
);

// 6. Donasi (AWD Peduli - Hands Holding a Heart)
export const UniversalDonasiIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Background Circle */}
    <circle cx="24" cy="24" r="19" className="fill-indigo-600 stroke-white" strokeWidth="2" />
    {/* Heart */}
    <path d="M24 18c-2-3.5-6-4-8.5-1.5s-2 6.5 1 9.5l7.5 7.5 7.5-7.5c3-3 3.5-7 1-9.5s-6.5-2-8.5 1.5z" 
      className="fill-rose-400 stroke-white" strokeWidth="2" />
    {/* Two Helping Hands */}
    <path d="M10 34c4-3 8-1 14 0" className="stroke-amber-300" strokeWidth="2.5" />
    <path d="M38 34c-4-3-8-1-14 0" className="stroke-amber-300" strokeWidth="2.5" />
  </svg>
);

// 7. Tolong (Bantuan Segera SOS / Emergency Lifebuoy / Siren)
export const UniversalTolongIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Red Emergency Badge */}
    <rect x="6" y="6" width="36" height="36" rx="10" className="fill-red-600 stroke-white" strokeWidth="2.5" />
    {/* SOS Lifebuoy / Ring */}
    <circle cx="24" cy="24" r="12" className="fill-white stroke-red-600" strokeWidth="3" />
    <circle cx="24" cy="24" r="5" className="fill-red-600 stroke-white" strokeWidth="1.5" />
    {/* Flashing Light Rays */}
    <path d="M24 3v4M45 24h-4M24 45v-4M3 24h4" className="stroke-yellow-300" strokeWidth="3" />
    {/* Cross Straps */}
    <path d="M16 16l4 4M28 28l4 4M32 16l-4 4M20 28l-4 4" className="stroke-red-600" strokeWidth="2.5" />
  </svg>
);

// 8. Jastip (Jasa Titip Pasar Tegalgubug / Pasar Arja)
export const UniversalJastipIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Market Stall Canopy */}
    <path d="M8 18h32l-3-8H11l-3 8z" className="fill-cyan-500 stroke-white" strokeWidth="2" />
    {/* Shopping Bag in front */}
    <rect x="14" y="20" width="20" height="20" rx="3" className="fill-cyan-700 stroke-white" strokeWidth="2.5" />
    <path d="M19 20v-4a5 5 0 0 1 10 0v4" className="stroke-white" strokeWidth="2.5" />
    <path d="M21 28l3 3 6-6" className="stroke-yellow-300" strokeWidth="2.5" />
  </svg>
);

// 9. UMKM Lokal (Khas Cirebonan / Produk Warga)
export const UniversalUmkmIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Store Front with Awning */}
    <path d="M6 14h36l-4 8H10L6 14z" className="fill-lime-500 stroke-white" strokeWidth="2.5" />
    <rect x="10" y="22" width="28" height="18" rx="2" className="fill-emerald-800 stroke-white" strokeWidth="2" />
    <rect x="20" y="27" width="8" height="13" className="fill-amber-400 stroke-white" strokeWidth="1.5" />
    {/* Star for Quality */}
    <path d="M24 7l2 4 4 .5-3 3 1 4-4-2-4 2 1-4-3-3 4-.5z" className="fill-yellow-300 stroke-slate-900" strokeWidth="1" />
  </svg>
);
