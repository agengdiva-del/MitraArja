import React, { useState } from 'react';
import { DonationCampaign, UserProfile } from '../../types';
import { 
  X, 
  Heart, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Share2, 
  PlusCircle, 
  QrCode, 
  Building2, 
  Banknote,
  Sparkles,
  Lock,
  ArrowRight
} from 'lucide-react';
import { UniversalDonasiIcon } from '../common/UniversalServiceIcons';

interface DonationModalProps {
  isOpen: boolean;
  currentUser: UserProfile;
  campaigns: DonationCampaign[];
  onClose: () => void;
  onDonate: (campaignId: string, amount: number, donorName: string, method: string) => void;
  onSubmitNewCampaign: (campaign: Omit<DonationCampaign, 'id' | 'collectedAmount' | 'donorCount' | 'createdAt' | 'status'>) => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  currentUser,
  campaigns,
  onClose,
  onDonate,
  onSubmitNewCampaign
}) => {
  const [selectedCampaign, setSelectedCampaign] = useState<DonationCampaign | null>(null);
  const [donateAmount, setDonateAmount] = useState<number>(20000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>(currentUser.name);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] = useState<'qris' | 'transfer' | 'tunai'>('qris');
  const [donationSuccess, setDonationSuccess] = useState<boolean>(false);

  // New Campaign Form
  const [showNewCampaignModal, setShowNewCampaignModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'kemanusiaan' | 'kesehatan' | 'yatim' | 'bencana' | 'sosial'>('kesehatan');
  const [newTarget, setNewTarget] = useState('10000000');
  const [newOrganizer, setNewOrganizer] = useState(currentUser.name);
  const [newPhone, setNewPhone] = useState(currentUser.phone);
  const [newDesc, setNewDesc] = useState('');
  const [newCampaignSubmitted, setNewCampaignSubmitted] = useState(false);

  if (!isOpen) return null;

  // Filter only approved campaigns for the public view
  const approvedCampaigns = campaigns.filter(c => c.status === 'approved');

  const handleConfirmDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampaign) return;
    const finalAmount = customAmount ? parseInt(customAmount) : donateAmount;
    if (finalAmount <= 0) return;

    onDonate(
      selectedCampaign.id,
      finalAmount,
      isAnonymous ? 'Hamba Allah (Anonim)' : donorName,
      selectedMethod
    );
    setDonationSuccess(true);
  };

  const handleCreateCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    onSubmitNewCampaign({
      title: newTitle.trim(),
      category: newCategory,
      targetAmount: parseInt(newTarget) || 5000000,
      organizerName: newOrganizer.trim(),
      organizerPhone: newPhone.trim(),
      description: newDesc.trim(),
      image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?auto=format&fit=crop&w=800&q=80',
    });

    setNewCampaignSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div 
          className="relative text-white p-5 text-center bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: "url('/sky-bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-indigo-900/85 to-blue-800/80 pointer-events-none" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-950/40 hover:bg-slate-950/60 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/30 border border-indigo-300/40 flex items-center justify-center mb-2 shadow-sm">
              <UniversalDonasiIcon className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200 bg-indigo-950/70 px-2.5 py-0.5 rounded-full border border-indigo-400/40 mb-1">
              AWD PEDULI • WONG NANGUN
            </span>
            <h2 className="text-xl font-black uppercase tracking-tight text-white drop-shadow-md">
              DONASI WARGA ARJAWINANGUN
            </h2>
            <p className="text-xs text-indigo-100 mt-0.5">
              100% Amanah & Transparan • <strong>Hanya Disetujui Admin Resmi</strong>
            </p>
          </div>
        </div>

        {/* Security / Admin Approval Notice */}
        <div className="px-4 py-2.5 bg-amber-50 border-b border-amber-200/80 flex items-center justify-between text-xs text-amber-950">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="font-bold text-[11px]">
              Verifikasi Ketat: Seluruh donasi telah diverifikasi dokumen & disetujui langsung oleh Admin AWD.
            </span>
          </div>
          <button
            onClick={() => {
              setShowNewCampaignModal(true);
              setNewCampaignSubmitted(false);
            }}
            className="text-[10px] font-extrabold bg-blue-700 text-white px-2.5 py-1 rounded-lg shrink-0 hover:bg-blue-800 transition-colors cursor-pointer"
          >
            + Ajukan Donasi
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          
          {/* VIEW 1: Detail / Donasi Form */}
          {selectedCampaign ? (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedCampaign(null);
                  setDonationSuccess(false);
                }}
                className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Kembali ke Daftar Program Donasi
              </button>

              {donationSuccess ? (
                <div className="p-6 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200 animate-in zoom-in-95">
                  <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-black text-slate-900">
                    Alhamdulillah, Donasi Anda Diterima!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Terima kasih <strong>{isAnonymous ? 'Hamba Allah' : donorName}</strong> telah menyalurkan donasi sebesar <strong>Rp {(customAmount ? parseInt(customAmount) : donateAmount).toLocaleString('id-ID')}</strong> untuk <em>{selectedCampaign.title}</em>.
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-emerald-300 text-xs text-emerald-900 font-bold inline-block">
                    ⭐ +10 Poin Kredibilitas Donatur Berbagi
                  </div>
                </div>
              ) : (
                <form onSubmit={handleConfirmDonate} className="space-y-4">
                  {/* Campaign Info Card */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex gap-3">
                    <img 
                      src={selectedCampaign.image} 
                      alt={selectedCampaign.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0" 
                    />
                    <div className="min-w-0">
                      <span className="text-[9px] font-black uppercase text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                        {selectedCampaign.category}
                      </span>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 mt-1">
                        {selectedCampaign.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Penggalang: <strong>{selectedCampaign.organizerName}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Nominal Picker */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Pilih Nominal Donasi
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[10000, 20000, 50000, 100000, 250000, 500000].map(amt => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setDonateAmount(amt);
                            setCustomAmount('');
                          }}
                          className={`py-2 px-2.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                            donateAmount === amt && !customAmount
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          Rp {amt.toLocaleString('id-ID')}
                        </button>
                      ))}
                    </div>

                    <div className="mt-2">
                      <input 
                        type="number"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder="Atau ketik nominal lainnya (cth: 75000)"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Donor Identity */}
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">
                        Nama Donatur
                      </label>
                      <input 
                        type="text"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        disabled={isAnonymous}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold disabled:bg-slate-100 disabled:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Sembunyikan nama saya (Donasi sebagai Hamba Allah)</span>
                    </label>
                  </div>

                  {/* Direct Payment Method (Pure direct - no wallet) */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Metode Penyaluran Langsung
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedMethod('qris')}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedMethod === 'qris'
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-950 font-bold ring-1 ring-indigo-500'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <QrCode className="w-4 h-4 mx-auto mb-1 text-indigo-600" />
                        <span className="text-[11px] block">QRIS Langsung</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedMethod('transfer')}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedMethod === 'transfer'
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-950 font-bold ring-1 ring-indigo-500'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <Building2 className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                        <span className="text-[11px] block">Transfer Bank</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedMethod('tunai')}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedMethod === 'tunai'
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-950 font-bold ring-1 ring-indigo-500'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <Banknote className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                        <span className="text-[11px] block">Titip Kurir AWD</span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600 hover:from-indigo-800 hover:to-blue-700 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-current text-rose-400" />
                    <span>Salurkan Donasi Sekarang</span>
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* VIEW 2: Daftar Program Donasi Terverifikasi Admin */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-slate-900 text-sm">
                  Program Bantuan Terverifikasi
                </h3>
                <span className="text-xs text-indigo-800 font-bold">
                  {approvedCampaigns.length} Program Aktif
                </span>
              </div>

              <div className="space-y-3">
                {approvedCampaigns.map(camp => {
                  const percent = Math.min(100, Math.round((camp.collectedAmount / camp.targetAmount) * 100));
                  return (
                    <div 
                      key={camp.id}
                      className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between gap-3"
                    >
                      <div className="flex gap-3">
                        <img 
                          src={camp.image} 
                          alt={camp.title}
                          className="w-24 h-24 rounded-xl object-cover shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[9px] font-black uppercase text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.2 rounded-md">
                              {camp.category}
                            </span>
                            <span className="text-[9px] font-extrabold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded-md flex items-center gap-0.5">
                              <ShieldCheck className="w-2.5 h-2.5" /> Disetujui Admin
                            </span>
                          </div>

                          <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 leading-tight">
                            {camp.title}
                          </h4>

                          <p className="text-[10px] text-slate-500 line-clamp-1 mt-1">
                            {camp.description}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar & Amount */}
                      <div className="space-y-1.5 pt-1 border-t border-slate-100">
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-indigo-600 to-emerald-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 block">Terkumpul:</span>
                            <span className="font-black text-indigo-900">
                              Rp {camp.collectedAmount.toLocaleString('id-ID')}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 block">Target ({percent}%):</span>
                            <span className="font-bold text-slate-700">
                              Rp {camp.targetAmount.toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[10px] text-slate-500 flex items-center gap-1">
                            <Users className="w-3 h-3 text-slate-400" />
                            {camp.donorCount} Donatur Peduli
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCampaign(camp);
                              setDonationSuccess(false);
                            }}
                            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <Heart className="w-3.5 h-3.5 fill-current text-rose-300" />
                            <span>Bantu Donasi</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW 3: Form Pengajuan Donasi Baru (Hanya Admin yang bisa menyetujui) */}
          {showNewCampaignModal && (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white rounded-3xl w-full max-w-md p-5 space-y-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <UniversalDonasiIcon className="w-6 h-6" />
                    <h3 className="font-black text-slate-900 text-sm">Ajukan Program Donasi Warga</h3>
                  </div>
                  <button 
                    onClick={() => setShowNewCampaignModal(false)}
                    className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
                  >
                    ✕
                  </button>
                </div>

                {newCampaignSubmitted ? (
                  <div className="p-4 text-center space-y-3 bg-amber-50 rounded-2xl border border-amber-200">
                    <ShieldCheck className="w-12 h-12 text-amber-600 mx-auto" />
                    <h4 className="font-bold text-slate-900 text-sm">
                      Pengajuan Berhasil Dikirim ke Admin!
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Sesuai aturan keamanan platform, penggalangan dana Anda berstatus <strong>Menunggu Persetujuan Admin</strong> dan akan diverifikasi keaslian dokumen medis/rekening sebelum tampil ke publik.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowNewCampaignModal(false)}
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
                    >
                      Tutup & Pantau Status
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCreateCampaignSubmit} className="space-y-3">
                    <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-900 flex items-start gap-2">
                      <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Hanya Admin yang bisa menyetujui.</strong> Formulir ini akan masuk ke antrean verifikasi Super Admin AWD demi mencegah penipuan.
                      </span>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Judul Penggalangan Donasi *
                      </label>
                      <input 
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Contoh: Bantuan Pengobatan Warga Jungjang"
                        required
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Kategori</label>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value as any)}
                          className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium"
                        >
                          <option value="kesehatan">Kesehatan / Medis</option>
                          <option value="yatim">Anak Yatim</option>
                          <option value="sosial">Sosial / Musholla</option>
                          <option value="bencana">Bencana Alam</option>
                          <option value="kemanusiaan">Kemanusiaan</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Target Dana (Rp)</label>
                        <input 
                          type="number"
                          value={newTarget}
                          onChange={(e) => setNewTarget(e.target.value)}
                          placeholder="10000000"
                          required
                          className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Nama Pengaju / Panitia
                      </label>
                      <input 
                        type="text"
                        value={newOrganizer}
                        onChange={(e) => setNewOrganizer(e.target.value)}
                        required
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Nomor HP / WhatsApp Aktif
                      </label>
                      <input 
                        type="tel"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        required
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Cerita & Rincian Kebutuhan Donasi *
                      </label>
                      <textarea 
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        rows={3}
                        placeholder="Jelaskan kondisi pasien/warga, lokasi, dan keperluan dana secara detail..."
                        required
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Kirim ke Admin untuk Disetujui</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
