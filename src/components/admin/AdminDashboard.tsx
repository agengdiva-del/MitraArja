import React, { useState } from 'react';
import { AdminStats, FraudAlert, Merchant, CourierProfile, Order, BannerAd, DonationCampaign } from '../../types';
import { 
  ShieldAlert, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Store, 
  Bike, 
  Package, 
  CheckCircle2, 
  Ban, 
  Sliders, 
  MapPin, 
  Sparkles,
  BarChart3,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Heart,
  AlertTriangle,
  FileCheck2,
  XCircle,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface AdminDashboardProps {
  stats: AdminStats;
  fraudAlerts: FraudAlert[];
  merchants: Merchant[];
  couriers: CourierProfile[];
  orders: Order[];
  banners: BannerAd[];
  donations?: DonationCampaign[];
  onReviewFraud: (id: string, action: 'reviewed' | 'banned') => void;
  onUpdateCommissionRate: (ratePercent: number) => void;
  onApproveDonation?: (campaignId: string, adminNote?: string) => void;
  onRejectDonation?: (campaignId: string) => void;
  onExitAdmin?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  stats,
  fraudAlerts,
  merchants,
  couriers,
  orders,
  banners,
  donations = [],
  onReviewFraud,
  onUpdateCommissionRate,
  onApproveDonation,
  onRejectDonation,
  onExitAdmin
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'donations' | 'fraud' | 'monetization' | 'zones' | 'database'>('overview');
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  const [commissionRate, setCommissionRate] = useState<number>(10);
  const [baseServiceFee, setBaseServiceFee] = useState<number>(1500);
  const [approvalNoteInput, setApprovalNoteInput] = useState<{ [id: string]: string }>({});

  // Period multiplier for chart simulation
  const multiplier = period === 'daily' ? 0.03 : (period === 'weekly' ? 0.22 : (period === 'monthly' ? 1.0 : 12.0));
  const currentGmv = Math.round(stats.gmv * multiplier);
  const currentRev = Math.round(stats.platformRevenue * multiplier);
  const currentProfit = Math.round(stats.netProfit * multiplier);
  const currentOrders = Math.round(stats.totalOrders * multiplier);

  // Direct monetization breakdown without stored wallet balance
  const revenueBreakdown = [
    { title: 'Komisi Merchant (10%)', amount: Math.round(currentRev * 0.62), percent: 62, desc: 'Dari total transaksi restoran & UMKM Arjawinangun' },
    { title: 'Biaya Layanan Aplikasi (Rp 1.500)', amount: Math.round(currentRev * 0.20), percent: 20, desc: 'Biaya teknologi operasional per pesanan' },
    { title: 'Iklan & Banner Homepage Toko', amount: Math.round(currentRev * 0.12), percent: 12, desc: 'Slot sponsor UMKM & Kuliner Arjawinangun' },
    { title: 'Membership Prioritas Driver & Mitra', amount: Math.round(currentRev * 0.06), percent: 6, desc: 'Fitur dispatch prioritas 10 detik lebih awal' },
  ];

  return (
    <div className="space-y-4 pb-20">
      
      {/* Super Admin Top Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-5 rounded-b-3xl shadow-xl -mx-4 -mt-4 mb-4 border-b border-emerald-500/20">
        {onExitAdmin && (
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs">
            <span className="text-[10px] text-emerald-400 font-mono font-bold">🔐 PORTAL FOUNDER & SUPER ADMIN</span>
            <button
              onClick={onExitAdmin}
              className="text-xs bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer"
            >
              Keluar dari Admin
            </button>
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">Super Admin Platform</h2>
              <p className="text-[10px] text-emerald-300 font-mono">MITRAARJA HYPERLOCAL ARCHITECTURE</p>
            </div>
          </div>

          {/* Timeframe Pill */}
          <div className="flex bg-white/10 rounded-xl p-0.5 text-[11px] font-bold">
            {(['daily', 'weekly', 'monthly', 'yearly'] as const).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                  period === p ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                {p === 'daily' ? 'Hari' : (p === 'weekly' ? 'Minggu' : (p === 'monthly' ? 'Bulan' : 'Tahun'))}
              </button>
            ))}
          </div>
        </div>

        {/* Executive KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total GMV Transaksi</span>
            <p className="text-lg font-black text-white mt-0.5">Rp {(currentGmv / 1000000).toFixed(1)} Jt</p>
            <span className="text-[10px] text-emerald-400 font-semibold">+24.5% MoM</span>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400">Platform Revenue</span>
            <p className="text-lg font-black text-emerald-400 mt-0.5">Rp {(currentRev / 1000000).toFixed(1)} Jt</p>
            <span className="text-[10px] text-emerald-400 font-semibold">Take-rate 12.0%</span>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400">Laba Bersih Platform</span>
            <p className="text-lg font-black text-teal-300 mt-0.5">Rp {(currentProfit / 1000000).toFixed(1)} Jt</p>
            <span className="text-[10px] text-slate-400">Full Automated</span>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Transaksi</span>
            <p className="text-lg font-black text-amber-300 mt-0.5">{currentOrders.toLocaleString('id-ID')}</p>
            <span className="text-[10px] text-slate-400">Arjawinangun Area</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1 shadow-xs overflow-x-auto scrollbar-none gap-1">
        {[
          { id: 'overview', label: 'Ringkasan Eksekutif' },
          { 
            id: 'donations', 
            label: `Persetujuan Donasi (${donations.filter(d => d.status === 'pending_approval').length})`,
            highlight: donations.filter(d => d.status === 'pending_approval').length > 0
          },
          { id: 'fraud', label: `Anti Fake Order & Kredibilitas (${fraudAlerts.filter(f => f.status === 'flagged').length})` },
          { id: 'monetization', label: 'Monetisasi & Tarif' },
          { id: 'zones', label: 'Zona & Wilayah' },
          { id: 'database', label: 'Skema Database Utama' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`py-2 px-3 text-xs font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === t.id 
                ? 'bg-slate-900 text-white shadow-xs' 
                : (t.highlight ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'text-slate-600 hover:text-slate-900')
            }`}
          >
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Ecosystem stats */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3.5 bg-white border border-slate-200 rounded-2xl text-center shadow-xs">
              <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-lg font-black text-slate-900">{stats.totalUsers.toLocaleString('id-ID')}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Customer Aktif</p>
            </div>
            <div className="p-3.5 bg-white border border-slate-200 rounded-2xl text-center shadow-xs">
              <Store className="w-5 h-5 text-amber-600 mx-auto mb-1" />
              <p className="text-lg font-black text-slate-900">{stats.totalMerchants}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Merchant UMKM</p>
            </div>
            <div className="p-3.5 bg-white border border-slate-200 rounded-2xl text-center shadow-xs">
              <Bike className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <p className="text-lg font-black text-slate-900">{stats.totalCouriers}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Kurir Independen</p>
            </div>
          </div>

          {/* Interactive Bar Chart Representation */}
          <div className="p-4 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-xs">
            <div className="flex justify-between items-center">
              <h4 className="font-extrabold text-sm text-slate-900">Grafik Penjualan ({period.toUpperCase()})</h4>
              <span className="text-xs text-emerald-700 font-bold">Tren Pertumbuhan +32%</span>
            </div>
            
            {/* Chart bars */}
            <div className="h-40 flex items-end justify-between gap-2 pt-4 px-2 border-b border-slate-200">
              {[45, 62, 58, 74, 85, 92, 100].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[9px] font-bold text-slate-400">{val}%</span>
                  <div 
                    className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-lg transition-all duration-500" 
                    style={{ height: `${val}%` }}
                  />
                  <span className="text-[10px] text-slate-500 font-medium">H-{7 - idx}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 pt-1">
              <span>Arjawinangun Pantura</span>
              <span>Pasar Tegalgubug</span>
              <span>Jungjang & Sende</span>
            </div>
          </div>

          {/* Founder Automation Banner */}
          <div className="p-4 bg-slate-900 rounded-3xl text-white space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              Sistem Operasional 1-Founder Otomatis Penuh
            </div>
            <p className="text-xs text-slate-300">
              Platform tidak memiliki armada fisik. Sistem melakukan otomatisasi penuh pada:
              pendaftaran merchant, verifikasi kurir, auto dispatch 30 detik (1KM-3KM-5KM), pembayaran QRIS/MitraPay, settlement harian, komisi 10%, notifikasi WhatsApp, dan laporan keuangan.
            </p>
          </div>
        </div>
      )}

      {/* DONATIONS APPROVAL TAB (ADMIN-ONLY STRICT REQUIREMENT) */}
      {activeTab === 'donations' && (
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-indigo-900 to-purple-900 text-white rounded-3xl space-y-2 shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center">
                <Heart className="w-4 h-4 text-purple-300" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm">Persetujuan Program Donasi Warga (AWD Peduli)</h3>
                <p className="text-[11px] text-purple-200">
                  Peraturan Ketat: Hanya Super Admin yang berwenang memverifikasi dan menyetujui kampanye donasi publik
                </p>
              </div>
            </div>
            <p className="text-xs text-purple-100 leading-relaxed bg-black/20 p-2.5 rounded-xl border border-white/10">
              Setiap penggalangan dana dari komunitas atau warga wajib diautentikasi nomor telepon penanggung jawab, tujuan pemanfaatan, dan target dana agar amanah bagi warga Arjawinangun.
            </p>
          </div>

          {/* Pending Approval Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <span>Menunggu Persetujuan Admin ({donations.filter(d => d.status === 'pending_approval').length})</span>
              </h4>
              <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-bold border border-amber-200">
                Wajib Verifikasi
              </span>
            </div>

            {donations.filter(d => d.status === 'pending_approval').length === 0 ? (
              <div className="p-6 bg-white border border-slate-200 rounded-3xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <p className="font-bold text-slate-800 text-sm">Semua Pengajuan Telah Ditinjau</p>
                <p className="text-xs text-slate-500">Tidak ada proposal program donasi baru yang menunggu persetujuan saat ini.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {donations.filter(d => d.status === 'pending_approval').map(item => (
                  <div key={item.id} className="p-4 bg-white border-2 border-amber-300 rounded-3xl shadow-sm space-y-3 text-xs">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full sm:w-36 h-28 object-cover rounded-2xl border border-slate-200 shrink-0" 
                      />
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded-md font-bold text-[10px] uppercase">
                            Kategori: {item.category}
                          </span>
                          <span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded-md font-extrabold text-[10px] uppercase">
                            Status: Butuh Persetujuan Admin
                          </span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-sm">{item.title}</h4>
                        <p className="text-slate-600 line-clamp-2">{item.description}</p>
                        <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                          <div className="bg-slate-50 p-2 rounded-xl">
                            <span className="text-slate-400 block text-[9px] uppercase font-bold">Penanggung Jawab</span>
                            <span className="font-bold text-slate-800">{item.organizerName}</span>
                            <span className="block text-slate-500 font-mono text-[10px]">{item.organizerPhone}</span>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-xl">
                            <span className="text-slate-400 block text-[9px] uppercase font-bold">Target Penggalangan</span>
                            <span className="font-extrabold text-indigo-700 text-sm">Rp {item.targetAmount.toLocaleString('id-ID')}</span>
                            <span className="block text-slate-400 text-[10px]">Diajukan: {item.createdAt}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Admin Verification Input */}
                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <label className="font-bold text-slate-700 block text-[11px]">
                        Catatan Verifikasi Admin (Akan Ditampilkan ke Publik):
                      </label>
                      <input 
                        type="text"
                        placeholder="Contoh: Terverifikasi langsung ke penanggung jawab & proposal valid."
                        value={approvalNoteInput[item.id] || ''}
                        onChange={(e) => setApprovalNoteInput(prev => ({ ...prev, [item.id]: e.target.value }))}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => onRejectDonation && onRejectDonation(item.id)}
                        className="w-1/3 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Tolak Program</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onApproveDonation && onApproveDonation(item.id, approvalNoteInput[item.id] || 'Terverifikasi resmi oleh Super Admin AWD Arjawinangun')}
                        className="flex-1 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <FileCheck2 className="w-4 h-4" />
                        <span>Setujui & Publikasikan Program Donasi</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Approved Campaigns List */}
          <div className="space-y-3 pt-2">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Program Donasi yang Sudah Disetujui ({donations.filter(d => d.status === 'approved').length})</span>
            </h4>

            <div className="space-y-2">
              {donations.filter(d => d.status === 'approved').map(item => (
                <div key={item.id} className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.title} className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" />
                    <div>
                      <h5 className="font-bold text-slate-900">{item.title}</h5>
                      <p className="text-[11px] text-slate-500">Terkumpul: <strong>Rp {item.collectedAmount.toLocaleString('id-ID')}</strong> dari Rp {item.targetAmount.toLocaleString('id-ID')} ({item.donorCount} Donatur)</p>
                      {item.adminApprovalNote && (
                        <p className="text-[10px] text-emerald-700 font-medium">✓ {item.adminApprovalNote}</p>
                      )}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px] shrink-0">
                    Aktif Tayang
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MONETIZATION TAB */}
      {activeTab === 'monetization' && (
        <div className="space-y-4">
          {/* Monetization Streams list */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-sm text-slate-900">7 Sumber Pendapatan Platform</h4>
            {revenueBreakdown.map((rev, idx) => (
              <div key={idx} className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 text-xs">{idx + 1}. {rev.title}</span>
                  <span className="font-black text-emerald-700 text-xs">Rp {rev.amount.toLocaleString('id-ID')}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${rev.percent}%` }} />
                </div>
                <p className="text-[11px] text-slate-500">{rev.desc}</p>
              </div>
            ))}
          </div>

          {/* Tariff Configuration Form */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-3xl space-y-3 text-xs">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-emerald-600" />
              Pengaturan Tarif & Margin Platform
            </h4>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Persentase Komisi Merchant (%)</label>
                <input
                  type="number"
                  value={commissionRate}
                  onChange={(e) => {
                    const r = parseInt(e.target.value) || 10;
                    setCommissionRate(r);
                    onUpdateCommissionRate(r);
                  }}
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Biaya Layanan Dasar (Rp)</label>
                <input
                  type="number"
                  value={baseServiceFee}
                  onChange={(e) => setBaseServiceFee(parseInt(e.target.value) || 1500)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-900"
                />
              </div>
            </div>

            <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-0.5">
              <p className="font-bold text-slate-800">Rumus Biaya Ongkir Kirim Barang:</p>
              <p>• 2 KM pertama = <strong>Rp 8.000</strong></p>
              <p>• Setiap KM berikutnya = <strong>Rp 2.000 / KM</strong></p>
              <p>• Maksimal berat barang = <strong>20 KG</strong></p>
            </div>
          </div>
        </div>
      )}

      {/* ANTI FAKE ORDER & CREDIBILITY SCORES TAB */}
      {activeTab === 'fraud' && (
        <div className="space-y-4 text-xs">
          {/* Prominent Warning Banner */}
          <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-3xl space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-rose-900 font-extrabold text-sm">
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
              <span>SISTEM PERLINDUNGAN & PERINGATAN AWAS FAKE ORDER</span>
            </div>
            <p className="text-rose-800 leading-relaxed text-[11px]">
              Sistem memantau setiap pesanan berisiko tinggi (COD nilai besar, pemesan baru tanpa riwayat, titik GPS mencurigakan). Akun yang terindikasi melakukan <strong>Fake Order (Pesanan Fiktif)</strong> akan otomatis dipenalti nilai minus (-) dan diblokir permanen.
            </p>
          </div>

          {/* Active Alerts */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center justify-between">
              <span>Laporan & Deteksi Kecurangan Terkini</span>
              <span className="text-[10px] text-slate-500 font-normal">Auto-flagged by system</span>
            </h4>

            {fraudAlerts.map((alert) => (
              <div 
                key={alert.id}
                className="p-3.5 bg-white border-2 border-slate-200 rounded-2xl shadow-xs space-y-2 text-xs"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      alert.severity === 'high' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {alert.type.replace('_', ' ')}
                    </span>
                    <span className="font-bold text-slate-900">{alert.targetUser}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{alert.timestamp}</span>
                </div>

                <p className="text-slate-600 text-xs">{alert.description}</p>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <span className={`text-[10px] font-bold ${alert.status === 'banned' ? 'text-rose-600' : (alert.status === 'reviewed' ? 'text-emerald-600' : 'text-amber-600')}`}>
                    Status: {alert.status.toUpperCase()}
                  </span>

                  <div className="flex gap-2">
                    {alert.status === 'flagged' && (
                      <>
                        <button
                          onClick={() => onReviewFraud(alert.id, 'reviewed')}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Tandai Aman (+2 Poin)
                        </button>
                        <button
                          onClick={() => onReviewFraud(alert.id, 'banned')}
                          className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <Ban className="w-3 h-3" />
                          Penalti Fake Order (-10 Poin & Blokir)
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CREDIBILITY SCORES MANAGEMENT TABLE */}
          <div className="p-4 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-xs">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Daftar Poin Kredibilitas Transparansi (Customer, Driver & Merchant)
                </h4>
                <p className="text-[11px] text-slate-500">
                  Nilai angka Plus (+) dan Minus (-) terlihat oleh sesama pengguna agar transaksi saling percaya
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {[
                { type: 'Customer', name: 'Kang Dimas (0812-3456-7890)', role: 'Pelanggan Jungjang', plus: 148, minus: 0, status: 'Sangat Terpercaya (Verified)' },
                { type: 'Driver', name: 'Kang Asep Supriatna (E 4521 AA)', role: 'Mitra Kurir Motor', plus: 395, minus: 0, status: 'Driver Teladan (Gold)' },
                { type: 'Merchant', name: 'Empal Gentong Hj. Darma', role: 'Restoran Kuliner', plus: 342, minus: 1, status: 'Mitra Resmi Terverifikasi' },
                { type: 'Merchant', name: 'Toko Sembako Berkah Pasar Arjawinangun', role: 'Sembako Pasar', plus: 670, minus: 0, status: 'Super Seller Pasar' },
                { type: 'Customer', name: 'Akun Mencurigakan (0899-2311-0000)', role: 'Customer Baru', plus: 1, minus: 8, status: 'Peringatan Fake Order (-8)' }
              ].map((acc, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.2 bg-blue-100 text-blue-800 rounded font-bold text-[9px] uppercase">
                        {acc.type}
                      </span>
                      <span className="font-bold text-slate-900">{acc.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">{acc.role} • <span className={acc.minus > 2 ? 'text-rose-600 font-bold' : 'text-emerald-700 font-medium'}>{acc.status}</span></p>
                  </div>

                  {/* Explicit Plus & Minus Points */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 font-mono text-xs bg-white px-2.5 py-1 rounded-xl border border-slate-200 shadow-2xs">
                      <span className="text-emerald-600 font-extrabold flex items-center gap-0.5">
                        <ThumbsUp className="w-3 h-3 inline" />
                        +{acc.plus}
                      </span>
                      <span className="text-slate-300">/</span>
                      <span className="text-rose-600 font-extrabold flex items-center gap-0.5">
                        <ThumbsDown className="w-3 h-3 inline" />
                        -{acc.minus}
                      </span>
                    </div>

                    <div className="flex gap-1">
                      <button 
                        type="button"
                        onClick={() => alert(`Poin Kredibilitas ${acc.name} berhasil ditambah +1`)}
                        className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-[10px] font-bold cursor-pointer"
                        title="Tambah 1 Poin Sukses"
                      >
                        +1
                      </button>
                      <button 
                        type="button"
                        onClick={() => alert(`Penalti Fake Order diberikan kepada ${acc.name} (-5 Poin)`)}
                        className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-lg text-[10px] font-bold cursor-pointer"
                        title="Penalti Fake Order -5"
                      >
                        -5
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ZONES TAB */}
      {activeTab === 'zones' && (
        <div className="space-y-3 text-xs">
          <h4 className="font-extrabold text-sm text-slate-900">Manajemen Zona Hyperlocal</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { name: 'Kecamatan Arjawinangun (Pusat)', status: 'Aktif Penuh', merchants: 180, couriers: 95 },
              { name: 'Desa Jungjang & Sekitarnya', status: 'Aktif Penuh', merchants: 42, couriers: 25 },
              { name: 'Pasar Grosir Tegalgubug', status: 'Zona Khusus Jastip', merchants: 65, couriers: 30 },
              { name: 'Desa Kebonturi & Sende', status: 'Aktif', merchants: 18, couriers: 12 },
              { name: 'Cirebon Timur Expansion', status: 'Fase Persiapan', merchants: 12, couriers: 8 }
            ].map((z, i) => (
              <div key={i} className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">{z.name}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    {z.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {z.merchants} Merchant terdaftar • {z.couriers} Kurir armada independen
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DATABASE SCHEMA TAB */}
      {activeTab === 'database' && (
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-900 text-slate-200 rounded-2xl space-y-1.5 font-mono text-[11px]">
            <p className="font-bold text-emerald-400">Database Utama MitraArja (PostgreSQL / Supabase Ready):</p>
            <p className="text-slate-400 leading-relaxed">
              users, addresses, merchants, merchant_branches, couriers, products, categories, orders, order_items, payments, wallets, wallet_transactions, withdrawals, reviews, coupons, promotions, referrals, notifications, chats, messages, banners, advertisements, service_fees, delivery_fees, routes, zones, cities, districts, villages, ppob_transactions, membership_subscriptions, audit_logs, reports, support_tickets.
            </p>
          </div>
          <p className="text-slate-500 text-[11px]">
            Struktur relasi microservice multi-city dirancang untuk skalabilitas ribuan kurir dan merchant tanpa sentuhan manual operasional.
          </p>
        </div>
      )}

    </div>
  );
};
