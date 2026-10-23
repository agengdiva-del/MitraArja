import React from 'react';

interface CartoonIconProps {
  className?: string;
}

// 1. OJEK AWD (Cute Cartoon Scooter with Smiling Headlight & Flying Helmet)
export const CartoonOjekIcon: React.FC<CartoonIconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="url(#bgOjekGrad)" />
    <defs>
      <linearGradient id="bgOjekGrad" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
      <linearGradient id="scooterGrad" x1="20" y1="30" x2="80" y2="70">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
    {/* Speed trails */}
    <path d="M 10 52 Q 22 52 28 55" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
    <path d="M 14 62 Q 24 62 30 65" stroke="#BAE6FD" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
    {/* Rear Wheel */}
    <circle cx="34" cy="68" r="12" fill="#0F172A" stroke="#E0F2FE" strokeWidth="3" />
    <circle cx="34" cy="68" r="5" fill="#38BDF8" />
    {/* Front Wheel */}
    <circle cx="72" cy="68" r="12" fill="#0F172A" stroke="#E0F2FE" strokeWidth="3" />
    <circle cx="72" cy="68" r="5" fill="#38BDF8" />
    {/* Scooter Body */}
    <path d="M 32 60 Q 42 62 50 56 L 64 56 Q 72 50 70 38 L 62 38" fill="url(#scooterGrad)" stroke="#FFFFFF" strokeWidth="2.5" />
    <path d="M 40 56 Q 48 42 54 44 L 62 56 Z" fill="#93C5FD" />
    {/* Seat Cushion */}
    <rect x="30" y="44" width="22" height="7" rx="3.5" fill="#1E293B" stroke="#FFFFFF" strokeWidth="1.5" />
    {/* Cute smiling Headlight */}
    <circle cx="74" cy="42" r="7" fill="#FEF08A" stroke="#FFFFFF" strokeWidth="2" />
    <circle cx="72" cy="41" r="2" fill="#854D0E" />
    <path d="M 72 44 Q 74 46 76 44" stroke="#854D0E" strokeWidth="1" strokeLinecap="round" />
    {/* Kawaii Smiling Helmet */}
    <circle cx="50" cy="28" r="13" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2.5" />
    <path d="M 44 26 Q 52 24 58 26 Q 58 32 50 33 Q 44 32 44 26 Z" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.2" />
    {/* Helmet Smile Eyes */}
    <circle cx="47" cy="24" r="1.5" fill="#FFFFFF" />
    {/* Sparkle */}
    <path d="M 80 20 L 82 25 L 87 27 L 82 29 L 80 34 L 78 29 L 73 27 L 78 25 Z" fill="#FDE047" />
  </svg>
);

// 2. WARUNG MAKAN (Cute Smiling Noodle Bowl with Kawaii Face & Steam Heart)
export const CartoonFoodIcon: React.FC<CartoonIconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="url(#bgFoodGrad)" />
    <defs>
      <linearGradient id="bgFoodGrad" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
    </defs>
    {/* Steam with heart */}
    <path d="M 40 26 Q 38 18 42 12" stroke="#FED7AA" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 60 26 Q 62 18 58 12" stroke="#FED7AA" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 50 20 C 47 16 43 18 45 22 L 50 26 L 55 22 C 57 18 53 16 50 20 Z" fill="#FEF08A" />
    {/* Chopsticks */}
    <line x1="30" y1="28" x2="72" y2="16" stroke="#FEF3C7" strokeWidth="3" strokeLinecap="round" />
    <line x1="32" y1="33" x2="74" y2="20" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" />
    {/* Noodles overflowing */}
    <ellipse cx="50" cy="46" rx="28" ry="12" fill="#FDE047" stroke="#FFFFFF" strokeWidth="2" />
    <path d="M 32 44 Q 42 36 50 44 Q 58 36 68 44" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Cute Boiled Egg Half */}
    <ellipse cx="40" cy="42" rx="7" ry="5" fill="#FFFFFF" />
    <circle cx="40" cy="42" r="3.5" fill="#EA580C" />
    {/* Noodle Bowl */}
    <path d="M 22 46 C 24 74 76 74 78 46 Z" fill="#DC2626" stroke="#FFFFFF" strokeWidth="3" />
    {/* Bowl Rim */}
    <ellipse cx="50" cy="46" rx="28" ry="6" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
    {/* Kawaii Face */}
    <circle cx="42" cy="58" r="2.8" fill="#FFFFFF" />
    <circle cx="58" cy="58" r="2.8" fill="#FFFFFF" />
    <ellipse cx="36" cy="62" rx="2.5" ry="1.5" fill="#FCA5A5" />
    <ellipse cx="64" cy="62" rx="2.5" ry="1.5" fill="#FCA5A5" />
    <path d="M 47 62 Q 50 67 53 62" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    {/* Bowl Foot */}
    <rect x="42" y="72" width="16" height="4" rx="2" fill="#991B1B" />
  </svg>
);

// 3. WARUNG SEMBAKO (Cute Smiling Grocery Basket with Apple & Veggies)
export const CartoonGroceryIcon: React.FC<CartoonIconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="url(#bgGrocGrad)" />
    <defs>
      <linearGradient id="bgGrocGrad" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    {/* Baguette / Bread */}
    <rect x="58" y="20" width="10" height="30" rx="5" transform="rotate(20 58 20)" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
    {/* Cute Apple */}
    <circle cx="38" cy="38" r="10" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
    <path d="M 38 28 Q 42 24 40 22" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
    <circle cx="35" cy="37" r="1.5" fill="#FFFFFF" />
    <circle cx="41" cy="37" r="1.5" fill="#FFFFFF" />
    <path d="M 36 41 Q 38 43 40 41" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
    {/* Cute Carrot */}
    <polygon points="52,26 46,44 58,44" fill="#F97316" stroke="#FFFFFF" strokeWidth="1.5" />
    <path d="M 52 26 L 50 20 M 52 26 L 54 19" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
    {/* Basket Handle */}
    <path d="M 30 46 C 30 24 70 24 70 46" stroke="#FDE68A" strokeWidth="4" fill="none" strokeLinecap="round" />
    {/* Basket Body */}
    <path d="M 22 46 L 28 76 C 29 80 71 80 72 76 L 78 46 Z" fill="#D97706" stroke="#FFFFFF" strokeWidth="3" />
    {/* Basket Weave lines */}
    <line x1="25" y1="56" x2="75" y2="56" stroke="#B45309" strokeWidth="2.5" />
    <line x1="27" y1="66" x2="73" y2="66" stroke="#B45309" strokeWidth="2.5" />
    {/* Kawaii Face on Basket */}
    <circle cx="44" cy="62" r="2.5" fill="#FEF3C7" />
    <circle cx="56" cy="62" r="2.5" fill="#FEF3C7" />
    <path d="M 48 65 Q 50 68 52 65" stroke="#FEF3C7" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 4. KIRIM BARANG (Cute Flying Package Box with Wings and Stamp)
export const CartoonDeliveryIcon: React.FC<CartoonIconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="url(#bgDelivGrad)" />
    <defs>
      <linearGradient id="bgDelivGrad" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
    {/* Left Wing */}
    <path d="M 30 46 Q 12 36 14 26 C 24 24 32 36 30 46 Z" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="1.5" />
    {/* Right Wing */}
    <path d="M 70 46 Q 88 36 86 26 C 76 24 68 36 70 46 Z" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="1.5" />
    {/* Box Body */}
    <rect x="28" y="36" width="44" height="42" rx="8" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="3" />
    {/* Box Tape Ribbon */}
    <rect x="45" y="36" width="10" height="42" fill="#D97706" />
    <rect x="28" y="52" width="44" height="9" fill="#D97706" />
    {/* Kawaii Eyes */}
    <circle cx="41" cy="48" r="3" fill="#1E293B" />
    <circle cx="59" cy="48" r="3" fill="#1E293B" />
    <circle cx="42" cy="47" r="1" fill="#FFFFFF" />
    <circle cx="60" cy="47" r="1" fill="#FFFFFF" />
    <ellipse cx="36" cy="51" rx="2" ry="1.2" fill="#FCA5A5" />
    <ellipse cx="64" cy="51" rx="2" ry="1.2" fill="#FCA5A5" />
    {/* Smile */}
    <path d="M 48 50 Q 50 54 52 50" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
    {/* Heart Stamp */}
    <path d="M 38 68 C 36 65 33 66 34 69 L 38 72 L 42 69 C 43 66 40 65 38 68 Z" fill="#EF4444" />
  </svg>
);

// 5. TAGIHAN LISTRIK / AIR (Cute Smiling Lightning Thunderbolt)
export const CartoonBillsIcon: React.FC<CartoonIconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="url(#bgBillsGrad)" />
    <defs>
      <linearGradient id="bgBillsGrad" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
    </defs>
    {/* Lightning Bolt */}
    <polygon points="56,16 32,48 48,48 40,84 72,42 54,42" fill="#FACC15" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
    {/* Cute Eyes on Thunderbolt */}
    <circle cx="46" cy="38" r="2.8" fill="#78350F" />
    <circle cx="54" cy="38" r="2.8" fill="#78350F" />
    <circle cx="47" cy="37" r="1" fill="#FFFFFF" />
    <circle cx="55" cy="37" r="1" fill="#FFFFFF" />
    <path d="M 48 42 Q 50 45 52 42" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
    {/* Sparkles */}
    <circle cx="28" cy="28" r="3" fill="#FEF08A" />
    <circle cx="74" cy="62" r="3" fill="#FEF08A" />
  </svg>
);

// 6. APOTEK & OBAT (Cute Medical Pill with Heart and Cross)
export const CartoonPharmacyIcon: React.FC<CartoonIconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="url(#bgPharmGrad)" />
    <defs>
      <linearGradient id="bgPharmGrad" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#F43F5E" />
        <stop offset="100%" stopColor="#BE123C" />
      </linearGradient>
    </defs>
    {/* Rotated Capsule Pill */}
    <g transform="rotate(35 50 50)">
      <rect x="36" y="24" width="28" height="26" rx="14" fill="#FFFFFF" stroke="#FFE4E6" strokeWidth="2" />
      <rect x="36" y="50" width="28" height="26" rx="14" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />
      {/* Kawaii Face on Top Half */}
      <circle cx="45" cy="36" r="2.5" fill="#1E293B" />
      <circle cx="55" cy="36" r="2.5" fill="#1E293B" />
      <path d="M 48 40 Q 50 43 52 40" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="41" cy="40" rx="2" ry="1.2" fill="#FDA4AF" />
      <ellipse cx="59" cy="40" rx="2" ry="1.2" fill="#FDA4AF" />
      {/* Plus icon on Bottom Half */}
      <rect x="47" y="58" width="6" height="12" rx="2" fill="#FFFFFF" />
      <rect x="44" y="61" width="12" height="6" rx="2" fill="#FFFFFF" />
    </g>
  </svg>
);

// 7. PULSA & DATA (Cute Smartphone with Antenna & Winking Eye)
export const CartoonPulsaIcon: React.FC<CartoonIconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="url(#bgPulsaGrad)" />
    <defs>
      <linearGradient id="bgPulsaGrad" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#14B8A6" />
        <stop offset="100%" stopColor="#0F766E" />
      </linearGradient>
    </defs>
    {/* Wi-Fi Wave */}
    <path d="M 40 20 Q 50 14 60 20" stroke="#FEF08A" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M 44 25 Q 50 21 56 25" stroke="#FEF08A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Smartphone Body */}
    <rect x="32" y="26" width="36" height="56" rx="8" fill="#1E293B" stroke="#FFFFFF" strokeWidth="3" />
    {/* Screen */}
    <rect x="36" y="32" width="28" height="42" rx="4" fill="#0284C7" />
    {/* Kawaii Face on Screen */}
    <circle cx="44" cy="46" r="2.8" fill="#FFFFFF" />
    {/* Winking Right Eye */}
    <path d="M 53 46 Q 56 42 59 46" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Happy Smile */}
    <path d="M 48 52 Q 50 56 52 52" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="40" cy="51" rx="2" ry="1.2" fill="#F472B6" />
    <ellipse cx="60" cy="51" rx="2" ry="1.2" fill="#F472B6" />
    {/* Home Button */}
    <circle cx="50" cy="77" r="2.5" fill="#94A3B8" />
  </svg>
);

// 8. PPOB & KEUANGAN (Cute Golden Credit Card & Sparkling Coins)
export const CartoonPpobIcon: React.FC<CartoonIconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="url(#bgPpobGrad)" />
    <defs>
      <linearGradient id="bgPpobGrad" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#4338CA" />
      </linearGradient>
    </defs>
    {/* Credit Card with Kawaii Face */}
    <rect x="22" y="32" width="56" height="38" rx="8" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="3" />
    <rect x="22" y="40" width="56" height="7" fill="#78350F" />
    {/* Chip */}
    <rect x="28" y="52" width="9" height="8" rx="2" fill="#FEF08A" stroke="#B45309" strokeWidth="1" />
    {/* Kawaii Face */}
    <circle cx="48" cy="55" r="2.5" fill="#78350F" />
    <circle cx="62" cy="55" r="2.5" fill="#78350F" />
    <path d="M 53 58 Q 55 61 57 58" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
    {/* Floating Golden Coin */}
    <circle cx="72" cy="30" r="11" fill="#FACC15" stroke="#FFFFFF" strokeWidth="2.5" />
    <text x="72" y="34" textAnchor="middle" fill="#854D0E" fontSize="10" fontWeight="900">Rp</text>
  </svg>
);

// 9. TIKET EVENT (Cute Carnival Ticket with Star Eyes & Confetti)
export const CartoonTicketIcon: React.FC<CartoonIconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="url(#bgTickGrad)" />
    <defs>
      <linearGradient id="bgTickGrad" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#BE185D" />
      </linearGradient>
    </defs>
    {/* Ticket with side notches */}
    <g transform="rotate(-15 50 50)">
      <rect x="26" y="34" width="48" height="32" rx="6" fill="#FACC15" stroke="#FFFFFF" strokeWidth="2.5" />
      {/* Left notch */}
      <circle cx="26" cy="50" r="5" fill="#BE185D" />
      {/* Right notch */}
      <circle cx="74" cy="50" r="5" fill="#BE185D" />
      {/* Perforation line */}
      <line x1="56" y1="36" x2="56" y2="64" stroke="#D97706" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* Star Eyes */}
      <polygon points="40,43 41,46 44,46 42,48 43,51 40,49 37,51 38,48 36,46 39,46" fill="#78350F" />
      <polygon points="49,43 50,46 53,46 51,48 52,51 49,49 46,51 47,48 45,46 48,46" fill="#78350F" />
      {/* Smile */}
      <path d="M 43 53 Q 45 56 47 53" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
    </g>
    {/* Party Confetti */}
    <circle cx="26" cy="26" r="2.5" fill="#FEF08A" />
    <circle cx="76" cy="24" r="2.5" fill="#67E8F9" />
    <circle cx="78" cy="74" r="2.5" fill="#A7F3D0" />
  </svg>
);

// 10. JASA TITIP / JASTIP TEGALGUBUG (Cute Shopping Bag with Ribbon & Fashion Gift)
export const CartoonJastipIcon: React.FC<CartoonIconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="url(#bgJastipGrad)" />
    <defs>
      <linearGradient id="bgJastipGrad" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#0E7490" />
      </linearGradient>
    </defs>
    {/* Bag Handles */}
    <path d="M 38 38 C 38 22 62 22 62 38" stroke="#FFFFFF" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    {/* Shopping Bag */}
    <path d="M 28 36 L 24 76 C 24 80 76 80 76 76 L 72 36 Z" fill="#F472B6" stroke="#FFFFFF" strokeWidth="3" />
    {/* Ribbon Accent */}
    <path d="M 36 36 L 44 48 L 50 36 L 56 48 L 64 36" fill="#FDE047" />
    {/* Kawaii Face */}
    <circle cx="43" cy="58" r="2.8" fill="#831843" />
    <circle cx="57" cy="58" r="2.8" fill="#831843" />
    <path d="M 48 62 Q 50 66 52 62" stroke="#831843" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="37" cy="62" rx="2.5" ry="1.5" fill="#FBCFE8" />
    <ellipse cx="63" cy="62" rx="2.5" ry="1.5" fill="#FBCFE8" />
  </svg>
);

// 11. UMKM LOKAL (Cute Shining Star Mascot with Thumbs Up)
export const CartoonUmkmIcon: React.FC<CartoonIconProps> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="url(#bgUmkmGrad)" />
    <defs>
      <linearGradient id="bgUmkmGrad" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#84CC16" />
        <stop offset="100%" stopColor="#4D7C0F" />
      </linearGradient>
    </defs>
    {/* Golden Star Mascot */}
    <polygon
      points="50,18 57,34 74,36 61,48 65,65 50,56 35,65 39,48 26,36 43,34"
      fill="#FACC15"
      stroke="#FFFFFF"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    {/* Cute Face on Star */}
    <circle cx="45" cy="44" r="2.5" fill="#713F12" />
    <circle cx="55" cy="44" r="2.5" fill="#713F12" />
    <circle cx="46" cy="43" r="1" fill="#FFFFFF" />
    <circle cx="56" cy="43" r="1" fill="#FFFFFF" />
    <ellipse cx="40" cy="47" rx="2" ry="1.2" fill="#F87171" />
    <ellipse cx="60" cy="47" rx="2" ry="1.2" fill="#F87171" />
    <path d="M 48 48 Q 50 51 52 48" stroke="#713F12" strokeWidth="1.5" strokeLinecap="round" />
    {/* Little Chef / Baker Hat */}
    <ellipse cx="50" cy="21" rx="8" ry="4" fill="#FFFFFF" />
    <circle cx="46" cy="17" r="4" fill="#FFFFFF" />
    <circle cx="54" cy="17" r="4" fill="#FFFFFF" />
  </svg>
);
