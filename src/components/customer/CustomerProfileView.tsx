import React from 'react';
import { UserProfile, UserRole } from '../../types';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight, 
  LogOut, 
  ShieldCheck,
  Tag,
  Store,
  Bike,
  Lock,
  UserPlus,
  BadgeCheck,
  FileText,
  Award,
  AlertTriangle,
  CreditCard,
  Banknote,
  QrCode,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface CustomerProfileViewProps {
  currentUser: UserProfile;
  onOpenAuth: (defaultTab?: any) => void;
  onSwitchRole: (role: UserRole) => void;
}

export const CustomerProfileView: React.FC<CustomerProfileViewProps> = ({
  currentUser,
  onOpenAuth,
  onSwitchRole
}) => {
  const cred = currentUser.credibilityScore || { plus: 148, minus: 0, totalScore: 148 };

  return (
    <div className="space-y-4 pb-20">
      
      {/* Profile Header with Clear Sky and Clouds Background */}
      <div 
        className="relative overflow-hidden text-white p-5 rounded-b-3xl shadow-lg -mx-4 -mt-4 mb-4 bg-cover bg-center"
        style={{ backgroundImage: "url('/sky-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/85 to-sky-800/80 pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md shrink-0 bg-white"
          />
          <div className="min-w-0">
            <h2 className="text-base font-black text-white truncate drop-shadow-sm">{currentUser.name}</h2>
            <p className="text-xs text-sky-200 font-mono drop-shadow-sm">{currentUser.phone}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] bg-sky-500/30 border border-sky-300/40 text-sky-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <BadgeCheck className="w-3 h-3 text-sky-300" />
                Standar Gojek Terverifikasi
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* POINT KREDIBILITAS PLUS (+) DAN MINUS (-) (DENGAN ANGKA) */}
        {/* (Menggantikan menu dompet digital / saldo) */}
        {/* ============================================================== */}
        <div className="relative z-10 mt-4 pt-3 border-t border-sky-500/30 grid grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-950/50 backdrop-blur-md p-3 rounded-2xl border border-white/20">
            <span className="text-[10px] text-sky-200 font-extrabold flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-300" /> Skor Kredibilitas
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-lg font-black text-emerald-300">+{cred.plus}</span>
              <span className="text-sm font-black text-rose-300">-{cred.minus}</span>
            </div>
            <p className="text-[10px] text-emerald-200 mt-0.5">Status: Sangat Terpercaya</p>
          </div>

          <div className="bg-slate-950/50 backdrop-blur-md p-3 rounded-2xl border border-white/20">
            <span className="text-[10px] text-sky-200 font-extrabold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-300" /> Status Akun
            </span>
            <p className="text-sm font-black text-white mt-1">Bebas Fake Order</p>
            <p className="text-[10px] text-sky-200 mt-0.5">Prioritas Driver AWD</p>
          </div>
        </div>
      </div>

      {/* ⚠️ PERINGATAN AWAS FAKE ORDER */}
      <div className="p-3.5 bg-rose-50 border-2 border-rose-300 rounded-2xl flex items-start gap-2.5 text-xs text-rose-950 shadow-xs">
        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-black text-rose-900 uppercase">
            ⚠️ PERINGATAN AWAS FAKE ORDER
          </p>
          <p className="text-[11px] text-rose-800 mt-0.5 leading-relaxed">
            AWD tidak menyimpan saldo dompet digital. Semua pembayaran pesanan adalah <strong>langsung (COD Tunai / QRIS Toko)</strong>. Order fiktif akan langsung mengurangi skor kredibilitas (-30) dan akun diblokir permanen.
          </p>
        </div>
      </div>

      {/* Profile Menu Items */}
      <div className="space-y-2">
        {/* Saved Address & GPS Pin Point */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              Titik Point & Alamat Utama
            </span>
            <span className="text-blue-700 text-[11px] font-semibold">GPS Terhubung</span>
          </div>
          <p className="text-xs text-slate-600 pl-6">{currentUser.address}</p>
          <p className="text-[10px] text-slate-400 pl-6">
            Kecamatan: {currentUser.district} {currentUser.pinPointLocation ? `• Koordinat: ${currentUser.pinPointLocation.lat.toFixed(4)}, ${currentUser.pinPointLocation.lng.toFixed(4)}` : ''}
          </p>
        </div>

        {/* KTP Verification Card */}
        <div className="p-3.5 bg-sky-50/70 border border-sky-200 rounded-2xl shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-blue-600" />
            <div>
              <p className="font-bold text-blue-950 text-xs">Identitas KTP & No HP Terverifikasi</p>
              <p className="text-[10px] text-slate-500">Pendaftaran lengkap tanpa verifikasi muka</p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
            Terverifikasi
          </span>
        </div>

        {/* Quick Registration Button for New User / Driver */}
        <div 
          onClick={() => onOpenAuth('register')}
          className="p-3.5 bg-gradient-to-r from-blue-700 to-sky-600 rounded-2xl text-white shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-2.5">
            <UserPlus className="w-5 h-5 text-sky-200" />
            <div>
              <p className="font-black text-white text-xs">Daftar Akun Baru (Standar Gojek)</p>
              <p className="text-[10px] text-sky-100">Daftar pelanggan, driver ojek AWD atau mitra warung</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-white" />
        </div>

        {/* Direct Payment Info (No digital wallet) */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <CreditCard className="w-4 h-4 text-blue-600" />
            <span>Sistem Pembayaran Langsung</span>
          </div>
          <p className="text-[11px] text-slate-500">
            AWD tidak menyimpan dana Anda. Pembayaran pesanan dilakukan langsung saat pesanan tiba:
          </p>
          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
              <Banknote className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <span className="text-[10px] font-bold text-slate-800 block">Tunai COD</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
              <QrCode className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
              <span className="text-[10px] font-bold text-slate-800 block">QRIS Toko</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
              <CreditCard className="w-4 h-4 text-blue-600 mx-auto mb-1" />
              <span className="text-[10px] font-bold text-slate-800 block">Transfer Bank</span>
            </div>
          </div>
        </div>

        {/* Vouchers and Promos */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs flex items-center justify-between cursor-pointer hover:border-blue-300 transition-colors">
          <div className="flex items-center gap-2.5">
            <Tag className="w-4 h-4 text-amber-500" />
            <div>
              <p className="font-bold text-slate-800 text-xs">Voucher Diskon Ongkir Saya</p>
              <p className="text-[10px] text-slate-500">3 Voucher aktif untuk pengiriman lokal Arjawinangun</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* PARTNER & ADMIN ACCESS PORTALS */}
        <div className="pt-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1 mb-1.5">
            Portal Kemitraan & Pengelola
          </span>

          <div className="space-y-1.5">
            <button
              onClick={() => onSwitchRole('merchant')}
              className="w-full p-3 bg-white border border-slate-200 hover:border-amber-300 rounded-2xl shadow-xs flex items-center justify-between transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-xs">Portal Mitra Warung & Kuliner</p>
                  <p className="text-[10px] text-slate-500">Buka warung, upload foto menu produk, atur stok</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => onSwitchRole('courier')}
              className="w-full p-3 bg-white border border-slate-200 hover:border-blue-300 rounded-2xl shadow-xs flex items-center justify-between transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Bike className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-xs">Portal Driver Antar Jemput & Paket Cepat</p>
                  <p className="text-[10px] text-slate-500">Terima orderan riil & pantau kredibilitas pelanggan</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => onOpenAuth('admin')}
              className="w-full p-3 bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-2xl shadow-xs flex items-center justify-between transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white text-xs">Login Khusus Admin Platform</p>
                  <p className="text-[10px] text-sky-300">Persetujuan Donasi Warga, GMV & anti-fraud</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-sky-400" />
            </button>
          </div>
        </div>

        {/* Switch / Logout */}
        <div 
          onClick={() => onOpenAuth('whatsapp')}
          className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors pt-2"
        >
          <div className="flex items-center gap-2.5 text-rose-600">
            <LogOut className="w-4 h-4" />
            <span className="font-bold text-xs">Ganti Akun / Keluar</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>

    </div>
  );
};
