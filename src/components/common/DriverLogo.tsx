import React from 'react';
import awdLogo from '../../assets/logo.png';

export interface DriverLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  className?: string;
  variant?: 'full' | 'compact' | 'badge-only';
}

export const DriverLogo: React.FC<DriverLogoProps> = ({ 
  size = 'lg', 
  showBadge = true,
  className = '',
  variant = 'full'
}) => {
  const dimensionMap = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-20 h-20',
    lg: 'w-36 h-36 sm:w-44 sm:h-44',
    xl: 'w-52 h-52 sm:w-60 sm:h-60'
  };

  if (variant === 'badge-only') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/80 border border-blue-400/40 text-[10px] font-black uppercase tracking-[0.22em] text-blue-300 shadow-xs mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
          AWD • MITRA
        </div>
        <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white drop-shadow-md">
          ARJAWINANGUN <span className="text-sky-400">DELIVERY</span>
        </h2>
        <p className="text-[11px] font-semibold text-blue-200/90 tracking-widest mt-0.5 uppercase">
          Cepat • Aman • Terpercaya
        </p>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Outer dynamic glowing blue circle aura */}
      <div className={`relative ${dimensionMap[size]} flex items-center justify-center flex-shrink-0`}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 via-sky-400 to-indigo-500 opacity-25 blur-xl animate-pulse pointer-events-none" />
        
        {/* User's AWD Arjawinangun Delivery Emblem Logo */}
        <img
          src={awdLogo}
          alt="AWD - Arjawinangun Delivery Logo"
          className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
          loading="eager"
        />
      </div>

      {/* TYPOGRAPHY BADGE UNDER EMBLEM (IF ENABLED) */}
      {showBadge && (
        <div className="mt-3 flex flex-col items-center text-center">
          {/* Tulisan MITRA (Dibuat Kecil sesuai instruksi) */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/80 border border-blue-400/40 text-[10px] font-black uppercase tracking-[0.22em] text-blue-300 shadow-xs mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
            AWD • MITRA
          </div>

          {/* Tulisan ARJAWINANGUN DELIVERY (Dibuat Agak Besar sesuai instruksi) */}
          <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white drop-shadow-md">
            ARJAWINANGUN <span className="text-sky-400">DELIVERY</span>
          </h2>

          <p className="text-[11px] font-semibold text-blue-200/90 tracking-widest mt-0.5 uppercase">
            Cepat • Aman • Terpercaya
          </p>
        </div>
      )}
    </div>
  );
};
