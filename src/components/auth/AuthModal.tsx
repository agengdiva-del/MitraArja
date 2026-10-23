import React, { useState, useEffect } from 'react';
import { UserRole, UserProfile } from '../../types';
import { INITIAL_USERS } from '../../data/mockData';
import { 
  Phone, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  X, 
  MapPin, 
  Bike, 
  Store, 
  Lock, 
  KeyRound, 
  CheckCircle2,
  AlertCircle,
  Camera,
  Upload,
  FileText,
  User,
  Crosshair,
  BadgeCheck,
  Info
} from 'lucide-react';
import { DriverLogo } from '../common/DriverLogo';

export type AuthInitialTab = 'whatsapp' | 'google' | 'merchant' | 'courier' | 'admin' | 'register';

interface AuthModalProps {
  isOpen: boolean;
  initialTab?: AuthInitialTab;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  initialTab = 'whatsapp',
  onClose, 
  onLoginSuccess 
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [tab, setTab] = useState<AuthInitialTab>(initialTab);
  
  // Customer WhatsApp Login state
  const [phone, setPhone] = useState('081223344556');
  const [name, setName] = useState('Diva Ageng Nugraha');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState(['5', '2', '8', '0']);

  // Admin Dedicated Login state
  const [adminEmail, setAdminEmail] = useState('admin@mitraarja.id');
  const [adminPin, setAdminPin] = useState('889900');
  const [adminError, setAdminError] = useState('');

  // ==========================================
  // GOJEK-STANDARD REGISTRATION FORM STATE
  // Requirements:
  // 1. No HP (WhatsApp)
  // 2. Nama sesuai KTP
  // 3. NIK 16 digit
  // 4. Foto Profil Asli
  // 5. Foto KTP Asli (Tanpa Verifikasi Muka)
  // 6. Alamat Lengkap + Titik Point (Pin Point GPS)
  // ==========================================
  const [regPhone, setRegPhone] = useState('085811223344');
  const [regName, setRegName] = useState('');
  const [regKtpNumber, setRegKtpNumber] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('customer');
  const [regAddress, setRegAddress] = useState('Jl. Ki Buyut Roda No. 12, RT 02 / RW 04');
  const [regDistrict, setRegDistrict] = useState('Jungjang, Arjawinangun');
  const [regAddressNote, setRegAddressNote] = useState('Pagar warna hitam, samping warung kelontong');
  
  // Pin point coordinates (Defaults to Arjawinangun center)
  const [regPinPoint, setRegPinPoint] = useState<{ lat: number; lng: number; label: string }>({
    lat: -6.6439,
    lng: 108.4124,
    label: 'Pusat Arjawinangun (Dekat Pasar Jungjang)'
  });

  // Photo states with high quality sample previews
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>(
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'
  );
  const [ktpPhotoUrl, setKtpPhotoUrl] = useState<string>(
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80'
  );

  // Driver details if registering as courier/driver
  const [vehicleType, setVehicleType] = useState('Honda Vario 160');
  const [vehiclePlate, setVehiclePlate] = useState('E 3421 YZ');
  const [regAgreeTerms, setRegAgreeTerms] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [regSuccessMessage, setRegSuccessMessage] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialTab === 'register') {
        setAuthMode('register');
        setTab('whatsapp');
      } else {
        setAuthMode('login');
        setTab(initialTab);
      }
      setAdminError('');
      setOtpStep(false);
      setRegSuccessMessage(false);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  // Handle Send OTP for WhatsApp Login
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpStep(true);
    }, 600);
  };

  // Handle Verify OTP
  const handleVerifyOtp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const cust = INITIAL_USERS.find(u => u.role === 'customer') || INITIAL_USERS[0];
      onLoginSuccess({
        ...cust,
        name: name || cust.name,
        phone: phone || cust.phone,
        role: 'customer'
      });
      onClose();
    }, 500);
  };

  // Quick Merchant / Courier / Admin Logins
  const handleMerchantLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const merchantUser = INITIAL_USERS.find(u => u.role === 'merchant') || INITIAL_USERS[1];
      onLoginSuccess(merchantUser);
      onClose();
    }, 500);
  };

  const handleCourierLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const courierUser = INITIAL_USERS.find(u => u.role === 'courier') || INITIAL_USERS[2];
      onLoginSuccess(courierUser);
      onClose();
    }, 500);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAdminError('');

    setTimeout(() => {
      setIsLoading(false);
      if (adminPin !== '889900' && adminPin !== '123456') {
        setAdminError('Kode PIN Keamanan Admin salah. Gunakan PIN: 889900');
        return;
      }
      const adminUser = INITIAL_USERS.find(u => u.role === 'admin') || INITIAL_USERS[3];
      onLoginSuccess(adminUser);
      onClose();
    }, 600);
  };

  // Handle Gojek-Standard Registration
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim()) {
      alert('Mohon lengkapi Nama Sesuai KTP dan Nomor WhatsApp');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setRegSuccessMessage(true);

      const newUser: UserProfile = {
        id: `user_${Date.now()}`,
        name: regName.trim(),
        phone: regPhone.trim(),
        email: `${regName.toLowerCase().replace(/\s+/g, '')}@mitraarja.id`,
        avatar: profilePhotoUrl,
        role: regRole,
        status: 'active',
        points: 100,
        walletBalance: 50000, // 50k welcome bonus
        referralCode: `AWD-${Math.floor(1000 + Math.random() * 9000)}`,
        address: regAddress,
        district: regDistrict,
        createdAt: new Date().toISOString().split('T')[0],
        ktpNumber: regKtpNumber || '3209210000000001',
        ktpPhoto: ktpPhotoUrl,
        profilePhoto: profilePhotoUrl,
        pinPointLocation: {
          lat: regPinPoint.lat,
          lng: regPinPoint.lng,
          addressNote: regAddressNote
        },
        vehicleType: regRole === 'courier' ? vehicleType : undefined,
        vehiclePlate: regRole === 'courier' ? vehiclePlate : undefined
      };

      setTimeout(() => {
        onLoginSuccess(newUser);
        onClose();
      }, 1200);
    }, 900);
  };

  // Helper landmark pin points in Arjawinangun
  const arjaLandmarks = [
    { name: 'Pasar Jungjang Arjawinangun', lat: -6.6450, lng: 108.4110 },
    { name: 'Stasiun Kereta Api Arjawinangun', lat: -6.6415, lng: 108.4095 },
    { name: 'Masjid Jami / Alun-Alun', lat: -6.6442, lng: 108.4132 },
    { name: 'Perumahan Griya Permata', lat: -6.6510, lng: 108.4201 },
    { name: 'RSUD Arjawinangun Pantura', lat: -6.6380, lng: 108.4050 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh]">
        
        {/* Dynamic Header based on portal */}
        {tab === 'admin' && authMode === 'login' ? (
          <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 p-5 text-white text-center border-b border-blue-500/30">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Tutup login"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-sky-400/40 text-sky-400 flex items-center justify-center mx-auto mb-2">
              <Lock className="w-6 h-6" />
            </div>

            <h2 className="text-xl font-black tracking-tight text-white">
              LOGIN KHUSUS ADMIN
            </h2>
            <p className="text-xs text-sky-300 font-mono mt-0.5">
              Portal Keamanan Platform AWD
            </p>
          </div>
        ) : (
          <div 
            className="relative overflow-hidden text-white p-5 text-center bg-cover bg-center"
            style={{ backgroundImage: "url('/sky-bg.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/85 via-blue-900/80 to-sky-800/75 pointer-events-none" />
            
            <button 
              onClick={onClose}
              className="relative z-10 absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-950/40 hover:bg-slate-950/60 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10 flex flex-col items-center">
              <DriverLogo size="sm" showBadge={false} className="mb-2" />
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-sky-200 bg-blue-950/75 px-2.5 py-0.5 rounded-full border border-sky-400/50 mb-1">
                AWD • BY WONG NANGUN
              </span>
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white leading-tight drop-shadow-md">
                ARJAWINANGUN <span className="text-sky-300">DELIVERY</span>
              </h2>
            </div>
            <p className="relative z-10 text-[11px] text-sky-100 font-medium drop-shadow-sm mt-0.5">
              {authMode === 'register' 
                ? 'Pendaftaran Standar Gojek • Cepat Tanpa Verifikasi Muka' 
                : 'Aplikasi Antar Jemput & Kuliner Khas Wong Nangun'}
            </p>
          </div>
        )}

        {/* Top Toggle: Masuk vs Daftar Akun Baru */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-100 border-b border-slate-200 text-xs font-black">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`py-2 text-center rounded-xl transition-all cursor-pointer ${
              authMode === 'login'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Masuk Akun (Login)
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`py-2 text-center rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === 'register'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-blue-700'
            }`}
          >
            <span>Daftar Akun Baru</span>
            <span className="bg-amber-400 text-amber-950 text-[9px] font-black px-1.5 py-0.2 rounded-full">
              Tanpa Muka
            </span>
          </button>
        </div>

        {/* Portal Tabs Bar for Login Mode */}
        {authMode === 'login' && (
          <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold px-2 pt-2 gap-1 overflow-x-auto scrollbar-none">
            <button
              onClick={() => { setTab('whatsapp'); setOtpStep(false); }}
              className={`py-2 px-3 rounded-t-xl transition-all ${
                tab === 'whatsapp' || tab === 'google'
                  ? 'bg-white text-blue-800 border-t-2 border-blue-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Customer
            </button>
            <button
              onClick={() => setTab('merchant')}
              className={`py-2 px-3 rounded-t-xl transition-all ${
                tab === 'merchant'
                  ? 'bg-white text-blue-800 border-t-2 border-blue-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Mitra Toko
            </button>
            <button
              onClick={() => setTab('courier')}
              className={`py-2 px-3 rounded-t-xl transition-all ${
                tab === 'courier'
                  ? 'bg-white text-blue-800 border-t-2 border-blue-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Mitra Kurir
            </button>
            <button
              onClick={() => setTab('admin')}
              className={`py-2 px-3 rounded-t-xl transition-all ml-auto ${
                tab === 'admin'
                  ? 'bg-slate-900 text-sky-300 border-t-2 border-sky-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              🔒 Khusus Admin
            </button>
          </div>
        )}

        {/* Scrollable Body Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">

          {/* ============================================================== */}
          {/* MODE: DAFTAR AKUN BARU (STANDAR GOJEK TANPA VERIFIKASI MUKA) */}
          {/* ============================================================== */}
          {authMode === 'register' && (
            <div className="space-y-4">
              
              {/* Highlight Info Box */}
              <div className="p-3 bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-200 rounded-2xl flex items-start gap-2.5">
                <BadgeCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-extrabold text-blue-900">
                    Pendaftaran Standar Gojek (Tanpa Verifikasi Wajah)
                  </p>
                  <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">
                    Wajib: No HP, Nama sesuai KTP, Foto Profil Asli, Foto KTP Asli, dan Titik Point GPS. Tanpa scan wajah/biometrik sehingga pendaftaran instan langsung aktif!
                  </p>
                </div>
              </div>

              {regSuccessMessage ? (
                <div className="py-8 text-center space-y-3 animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">
                    Pendaftaran Berhasil!
                  </h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Selamat datang di AWD Arjawinangun. Anda mendapatkan <strong>Bonus Saldo Rp 50.000</strong> AWD Pay. Masuk ke aplikasi sekarang...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  
                  {/* Pilihan Peran Pendaftaran */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Daftar Sebagai:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'customer', label: 'Pelanggan', icon: User, desc: 'Pesan Makanan & Ojek' },
                        { id: 'courier', label: 'Driver Ojek AWD', icon: Bike, desc: 'Kurir & Antar Penumpang' },
                        { id: 'merchant', label: 'Mitra Warung', icon: Store, desc: 'Buka Toko / Resto' },
                      ].map(r => {
                        const Icon = r.icon;
                        const isSelected = regRole === r.id;
                        return (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => setRegRole(r.id as UserRole)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-1 ring-blue-500'
                                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-1">
                              <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                              <span className="text-xs font-bold truncate">{r.label}</span>
                            </div>
                            <span className="text-[9px] text-slate-400 leading-tight">{r.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 1. Nomor HP (WhatsApp Aktif) */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Nomor HP / WhatsApp Aktif <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-500">
                        +62
                      </span>
                      <input
                        type="tel"
                        value={regPhone.replace(/^(\+62|0)/, '')}
                        onChange={(e) => setRegPhone('0' + e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="81234567890"
                        required
                        className="w-full pl-11 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Untuk konfirmasi pesanan kurir & kode keamanan OTP
                    </span>
                  </div>

                  {/* 2. Nama Sesuai KTP */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Nama Lengkap Sesuai KTP <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Contoh: Diva Ageng Nugraha"
                        required
                        className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                      />
                    </div>
                  </div>

                  {/* 3. NIK 16 Digit */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Nomor KTP (NIK 16 Digit) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        maxLength={16}
                        value={regKtpNumber}
                        onChange={(e) => setRegKtpNumber(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="3209210000000001"
                        required
                        className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono tracking-wider"
                      />
                    </div>
                  </div>

                  {/* 4. Upload Foto Profil Asli */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-blue-600" />
                        Foto Profil Asli <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[10px] text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full font-bold">
                        Wajah Jelas
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-200 border-2 border-white shadow-xs shrink-0">
                        <img 
                          src={profilePhotoUrl} 
                          alt="Preview Foto Profil" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-[11px] text-slate-500">
                          Gunakan foto asli Anda tanpa kacamata hitam untuk dikenali kurir saat penjemputan.
                        </p>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const avatars = [
                                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
                                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
                                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
                              ];
                              const next = avatars[(avatars.indexOf(profilePhotoUrl) + 1) % avatars.length];
                              setProfilePhotoUrl(next);
                            }}
                            className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-[10px] font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                          >
                            <Camera className="w-3 h-3 text-blue-600" />
                            Ganti Foto Profil
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5. Upload Foto KTP Asli (Tanpa Verifikasi Muka) */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        Foto KTP Asli <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                        ✓ Tanpa Verifikasi Muka
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500">
                      Foto KTP Anda secara horizontal. Pastikan NIK, Nama, dan Foto KTP terlihat jelas (tidak silau atau terpotong).
                    </p>

                    {/* KTP Card Simulation Frame */}
                    <div className="relative border-2 border-dashed border-blue-300 bg-white rounded-xl overflow-hidden p-2 flex items-center gap-3">
                      <div className="w-24 h-16 rounded-lg bg-slate-200 overflow-hidden shrink-0 border border-slate-300">
                        <img 
                          src={ktpPhotoUrl} 
                          alt="Foto KTP Asli" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>KTP Terunggah & Valid</span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">
                          Enkripsi 256-bit aman untuk database lokal
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            const ktps = [
                              'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
                              'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80'
                            ];
                            const next = ktps[(ktps.indexOf(ktpPhotoUrl) + 1) % ktps.length];
                            setKtpPhotoUrl(next);
                          }}
                          className="mt-1 px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded text-[10px] font-bold hover:bg-blue-100"
                        >
                          Upload Ulang KTP
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 6. Alamat Lengkap & Titik Point (Pin Point GPS) */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        Alamat & Titik Point GPS <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[10px] text-slate-500 font-medium">
                        Akurasi Lokasi Gojek
                      </span>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={regAddress}
                        onChange={(e) => setRegAddress(e.target.value)}
                        placeholder="Alamat lengkap (Nama Jalan, Blok, No. Rumah, RT/RW)"
                        required
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={regDistrict}
                        onChange={(e) => setRegDistrict(e.target.value)}
                        className="px-2.5 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                      >
                        <option value="Jungjang, Arjawinangun">Jungjang, Arjawinangun</option>
                        <option value="Kebonturi, Arjawinangun">Kebonturi, Arjawinangun</option>
                        <option value="Tegalgubug, Arjawinangun">Tegalgubug, Arjawinangun</option>
                        <option value="Sende, Arjawinangun">Sende, Arjawinangun</option>
                        <option value="Rawagatel, Arjawinangun">Rawagatel, Arjawinangun</option>
                        <option value="Karangsambung, Arjawinangun">Karangsambung</option>
                      </select>

                      <input
                        type="text"
                        value={regAddressNote}
                        onChange={(e) => setRegAddressNote(e.target.value)}
                        placeholder="Patokan rumah (cth: cat biru)"
                        className="px-2.5 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                      />
                    </div>

                    {/* Interactive GPS Pin Point Selector */}
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-700 flex items-center gap-1">
                          <Crosshair className="w-3.5 h-3.5 text-blue-600" />
                          Pin Point GPS:
                        </span>
                        <span className="font-mono text-slate-500 text-[10px]">
                          {regPinPoint.lat.toFixed(4)}, {regPinPoint.lng.toFixed(4)}
                        </span>
                      </div>

                      <div className="text-[11px] text-blue-800 bg-blue-50 p-1.5 rounded-lg font-medium flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="truncate">{regPinPoint.label}</span>
                      </div>

                      {/* Quick Arjawinangun Landmark Shortcuts */}
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block mb-1">
                          Pilih Titik Point Populer Arjawinangun:
                        </span>
                        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
                          {arjaLandmarks.map((lm, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setRegPinPoint({ lat: lm.lat, lng: lm.lng, label: lm.name })}
                              className="px-2 py-0.5 text-[10px] bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-900 rounded whitespace-nowrap font-medium transition-colors"
                            >
                              📍 {lm.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Driver Specific Fields */}
                  {regRole === 'courier' && (
                    <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2">
                      <label className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                        <Bike className="w-3.5 h-3.5 text-blue-600" />
                        Kendaraan Ojek / Kurir AWD
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Tipe Motor</label>
                          <input
                            type="text"
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            placeholder="cth: Honda Vario 160"
                            className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Plat Nomor</label>
                          <input
                            type="text"
                            value={vehiclePlate}
                            onChange={(e) => setVehiclePlate(e.target.value.toUpperCase())}
                            placeholder="cth: E 1234 XY"
                            className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-bold font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Agree Checkbox */}
                  <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600">
                    <input 
                      type="checkbox"
                      checked={regAgreeTerms}
                      onChange={(e) => setRegAgreeTerms(e.target.checked)}
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>
                      Saya menyetujui Ketentuan Layanan AWD Arjawinangun dan menyatakan data yang diisi adalah benar.
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || !regAgreeTerms}
                    className="w-full py-3.5 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isLoading ? 'Mendaftarkan Akun...' : 'Daftar Akun Sekarang'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="text-xs text-blue-700 font-bold hover:underline"
                    >
                      Sudah punya akun? Masuk di sini
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* MODE: MASUK / LOGIN (CUSTOMER, MERCHANT, COURIER, ADMIN) */}
          {/* ============================================================== */}
          {authMode === 'login' && (
            <div>
              {/* CUSTOMER LOGIN (WhatsApp OTP) */}
              {(tab === 'whatsapp' || tab === 'google') && (
                <div className="space-y-3">
                  {!otpStep ? (
                    <form onSubmit={handleSendOtp} className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Nomor WhatsApp
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                            +62
                          </span>
                          <input
                            type="tel"
                            value={phone.replace(/^(\+62|0)/, '')}
                            onChange={(e) => setPhone('0' + e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="81234567890"
                            required
                            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 block mt-1">
                          Kode OTP login 4-digit akan dikirimkan langsung ke nomor WhatsApp ini.
                        </span>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Nama Anda
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Nama lengkap"
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{isLoading ? 'Mengirim OTP...' : 'Kirim Kode OTP WhatsApp'}</span>
                      </button>

                      <div className="pt-2 text-center">
                        <button
                          type="button"
                          onClick={() => setAuthMode('register')}
                          className="text-xs text-blue-700 font-bold hover:underline"
                        >
                          Belum punya akun? Daftar Standar Gojek di sini
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4 animate-in fade-in">
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Kode OTP telah dikirimkan ke <strong>{phone}</strong></span>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block text-center mb-2">
                          Masukkan 4 Digit Kode OTP
                        </label>
                        <div className="flex justify-center gap-2">
                          {otpCode.map((digit, idx) => (
                            <input
                              key={idx}
                              type="text"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => {
                                const newOtp = [...otpCode];
                                newOtp[idx] = e.target.value;
                                setOtpCode(newOtp);
                              }}
                              className="w-12 h-12 text-center text-lg font-black bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={isLoading}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>{isLoading ? 'Verifikasi...' : 'Verifikasi & Masuk Sekarang'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* MITRA TOKO LOGIN */}
              {tab === 'merchant' && (
                <div className="space-y-4 text-center py-2">
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
                    <Store className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">Portal Mitra Toko & Resto</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Kelola menu, update harga produk, pantau pesanan masuk secara real-time.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-left text-xs space-y-1">
                    <p className="font-bold text-slate-800">Akun Toko: Hj. Eni Rohaeni (RM Barokah)</p>
                    <p className="text-slate-500">Status: Toko Buka • Mitra Prioritas</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleMerchantLogin}
                    disabled={isLoading}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{isLoading ? 'Memproses...' : 'Buka Dashboard Mitra Toko'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* MITRA KURIR LOGIN */}
              {tab === 'courier' && (
                <div className="space-y-4 text-center py-2">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto">
                    <Bike className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">Portal Masuk Driver Ojek & Kurir</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Aktifkan status Online, terima auto dispatch pesanan, dan pantau tarif penghasilan harian Anda.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-left text-xs space-y-1">
                    <p className="font-bold text-slate-800">Akun Driver: Kang Asep Supriatna (Gold)</p>
                    <p className="text-slate-500">Kendaraan: Honda Vario 160 (E 4521 AA)</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCourierLogin}
                    disabled={isLoading}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{isLoading ? 'Memproses...' : 'Buka Dashboard Kurir'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* DEDICATED ADMIN LOGIN */}
              {tab === 'admin' && (
                <form onSubmit={handleAdminLogin} className="space-y-3.5">
                  <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                    <KeyRound className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Akses Founder & Pemilik Platform</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Kelola GMV, bagi hasil 10%, verifikasi pendaftaran KTP, dan zona wilayah Arjawinangun.
                      </p>
                    </div>
                  </div>

                  {adminError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{adminError}</span>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Email Admin Platform
                    </label>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      PIN Keamanan Super Admin (6 Digit)
                    </label>
                    <input
                      type="password"
                      value={adminPin}
                      onChange={(e) => setAdminPin(e.target.value)}
                      placeholder="PIN: 889900"
                      required
                      className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono tracking-widest text-slate-900"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">
                      PIN default simulasi: <strong>889900</strong>
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-slate-950 hover:bg-black text-emerald-300 border border-emerald-500/40 rounded-xl font-black text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>{isLoading ? 'Mengautentikasi...' : 'Masuk ke Super Admin'}</span>
                  </button>
                </form>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
