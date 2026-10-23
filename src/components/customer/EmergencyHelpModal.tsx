import React, { useState } from 'react';
import { EmergencyRequest, UserProfile } from '../../types';
import { 
  X, 
  AlertTriangle, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Wrench, 
  Fuel, 
  HeartPulse, 
  Key, 
  HelpCircle,
  Radio,
  Clock,
  ArrowRight
} from 'lucide-react';
import { UniversalTolongIcon } from '../common/UniversalServiceIcons';

interface EmergencyHelpModalProps {
  isOpen: boolean;
  currentUser: UserProfile;
  emergencies: EmergencyRequest[];
  onClose: () => void;
  onSubmitEmergency: (req: Omit<EmergencyRequest, 'id' | 'status' | 'createdAt'>) => void;
}

export const EmergencyHelpModal: React.FC<EmergencyHelpModalProps> = ({
  isOpen,
  currentUser,
  emergencies,
  onClose,
  onSubmitEmergency
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');
  const [category, setCategory] = useState<'ban_bocor' | 'mogok' | 'medis_darurat' | 'kunci' | 'bensin_habis' | 'lainnya'>('ban_bocor');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(currentUser.address || 'Jl. By Pass Pantura KM 18, Arjawinangun');
  const [userPhone, setUserPhone] = useState(currentUser.phone);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const categories = [
    { id: 'ban_bocor', label: 'Ban Bocor', icon: Wrench, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { id: 'mogok', label: 'Motor Mogok', icon: Wrench, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { id: 'bensin_habis', label: 'Bensin Habis', icon: Fuel, color: 'text-orange-600 bg-orange-50 border-orange-200' },
    { id: 'medis_darurat', label: 'Medis Darurat', icon: HeartPulse, color: 'text-rose-600 bg-rose-50 border-rose-200' },
    { id: 'kunci', label: 'Kunci Hilang/Tertinggal', icon: Key, color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { id: 'lainnya', label: 'Bantuan Darurat Lain', icon: HelpCircle, color: 'text-slate-600 bg-slate-50 border-slate-200' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !location.trim()) return;

    const catLabel = categories.find(c => c.id === category)?.label || 'Bantuan Darurat';
    const finalTitle = title.trim() || `Butuh Tolong Segera: ${catLabel}`;

    onSubmitEmergency({
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: userPhone.trim(),
      category,
      title: finalTitle,
      description: description.trim(),
      location: location.trim(),
      lat: -6.6439,
      lng: 108.4124
    });

    setSubmittedSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-red-200 flex flex-col max-h-[92vh]">
        
        {/* Header - High contrast Emergency Red */}
        <div className="relative bg-gradient-to-r from-red-800 via-rose-700 to-red-900 text-white p-5 text-center">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/40 flex items-center justify-center mb-1 shadow-md animate-pulse">
              <UniversalTolongIcon className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-200 bg-red-950/70 px-2.5 py-0.5 rounded-full border border-red-400/40 mb-1">
              AWD SOS • BANTUAN SEGERA
            </span>
            <h2 className="text-xl font-black uppercase tracking-tight text-white drop-shadow-md">
              LAYANAN TOLONG WARGA
            </h2>
            <p className="text-xs text-red-100 font-medium">
              Bantuan Cepat di Jalan & Kondisi Mendesak Arjawinangun
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-100 border-b border-slate-200 text-xs font-bold">
          <button
            onClick={() => { setActiveTab('create'); setSubmittedSuccess(false); }}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'create'
                ? 'bg-red-600 text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🚨 Minta Tolong Sekarang
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'list'
                ? 'bg-red-600 text-white shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Pantau Bantuan Aktif</span>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          
          {activeTab === 'create' ? (
            submittedSuccess ? (
              <div className="p-6 text-center space-y-3 bg-red-50 rounded-2xl border border-red-200 animate-in zoom-in-95">
                <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto shadow-md animate-pulse">
                  <Radio className="w-8 h-8" />
                </div>
                <h3 className="text-base font-black text-slate-900">
                  Sinyal Bantuan Telah Disebarkan!
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Driver AWD dan relawan terdekat di sekitar lokasi Anda telah menerima notifikasi SOS. Mohon pastikan nomor WhatsApp <strong>{userPhone}</strong> tetap aktif.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('list')}
                    className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Lihat Status Bantuan Aktif →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Category Grid */}
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1.5">
                    Pilih Jenis Bantuan yang Dibutuhkan:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = category === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategory(cat.id as any)}
                          className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-red-50 border-red-600 text-red-950 font-bold ring-1 ring-red-500'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <Icon className={`w-4 h-4 mb-1 ${isSelected ? 'text-red-600' : 'text-slate-400'}`} />
                          <span className="text-[11px] leading-tight line-clamp-2">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Deskripsi Masalah */}
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Ceritakan Kondisi / Kebutuhan Anda *
                  </label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Contoh: Ban motor belakang bocor kena paku, sedang bawa barang di seberang SPBU Arjawinangun..."
                    required
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Lokasi Kejadian */}
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Lokasi Tepat Kejadian (Patokan Jalan) *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-red-600 absolute left-3 top-2.5" />
                    <input 
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Jalan, RT/RW, atau dekat bangunan terkenal"
                      required
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                {/* No WhatsApp Aktif */}
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Nomor WhatsApp / HP yang Bisa Dihubungi *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input 
                      type="tel"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <AlertTriangle className="w-5 h-5 fill-current" />
                  <span>Kirim Sinyal Tolong Segera</span>
                </button>
              </form>
            )
          ) : (
            /* Emergency Requests List */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-xs">
                  Permintaan Bantuan Aktif di Arjawinangun
                </h3>
                <span className="text-[11px] text-red-600 font-bold">
                  {emergencies.length} Permintaan
                </span>
              </div>

              <div className="space-y-2.5">
                {emergencies.map(emg => (
                  <div 
                    key={emg.id}
                    className="p-3.5 bg-white border border-red-200 rounded-2xl shadow-xs space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                            emg.status === 'searching' 
                              ? 'bg-red-100 text-red-700 animate-pulse' 
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {emg.status === 'searching' ? '🚨 Butuh Bantuan Segera' : '✓ Driver Bergerak'}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {emg.createdAt}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                          {emg.title}
                        </h4>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      "{emg.description}"
                    </p>

                    <div className="text-[11px] text-slate-600 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span className="font-medium truncate">{emg.location}</span>
                    </div>

                    {emg.responderName && (
                      <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                        <span className="font-bold">Penolong: {emg.responderName}</span>
                        <a 
                          href={`tel:${emg.responderPhone}`}
                          className="px-2 py-0.5 bg-emerald-700 text-white rounded text-[10px] font-bold"
                        >
                          Hubungi
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
