import React, { useState, useRef } from 'react';
import { Merchant, Product, Order, UserProfile } from '../../types';
import { 
  Store, 
  ShoppingBag, 
  Star, 
  Plus, 
  Power, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Tag, 
  Image as ImageIcon,
  Check,
  X,
  Upload,
  Camera,
  AlertTriangle,
  ShieldCheck,
  Award,
  ThumbsUp,
  ThumbsDown,
  Layers
} from 'lucide-react';

interface MerchantDashboardProps {
  currentUser: UserProfile;
  merchants: Merchant[];
  products: Product[];
  orders: Order[];
  onToggleStoreOpen: (merchantId: string, isOpen: boolean) => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onToggleStock: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: any) => void;
  onUpgradeMembership: (merchantId: string) => void;
  onBackToCustomer?: () => void;
  onWithdraw?: (amount: number) => void;
}

export const MerchantDashboard: React.FC<MerchantDashboardProps> = ({
  currentUser,
  merchants,
  products,
  orders,
  onToggleStoreOpen,
  onAddProduct,
  onToggleStock,
  onUpdateOrderStatus,
  onUpgradeMembership,
  onBackToCustomer
}) => {
  const [selectedMerchantId, setSelectedMerchantId] = useState<string>(merchants[0]?.id || 'm1');
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'promos' | 'membership'>('overview');
  
  // New product form modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Ayam');
  const [newProdPrice, setNewProdPrice] = useState<number>(20000);
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80');
  const [compressedFileSize, setCompressedFileSize] = useState<string>('24 KB');
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentMerchant = merchants.find(m => m.id === selectedMerchantId) || merchants[0];
  const merchantProducts = products.filter(p => p.merchantId === currentMerchant.id);
  const merchantOrders = orders.filter(o => o.merchantId === currentMerchant.id);

  // Stats calculation
  const todayOrders = merchantOrders.length;
  const todayRevenue = merchantOrders.reduce((sum, o) => sum + o.merchantEarned, 0);
  const totalProductsSold = merchantOrders.reduce((sum, o) => sum + (o.items ? o.items.reduce((acc, i) => acc + i.quantity, 0) : 0), 0);

  // Minimalist image compression to save hosting & data
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Canvas compression to max 420x420
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 420;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Compress to lightweight JPEG quality 0.68
          const dataUrl = canvas.toDataURL('image/jpeg', 0.68);
          setNewProdImage(dataUrl);

          // Estimate file size in KB
          const stringLength = dataUrl.length - 'data:image/jpeg;base64,'.length;
          const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
          const sizeInKb = (sizeInBytes / 1000).toFixed(1);
          setCompressedFileSize(`${sizeInKb} KB`);
        }
        setIsCompressing(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;
    onAddProduct({
      merchantId: currentMerchant.id,
      name: newProdName.trim(),
      category: newProdCategory,
      price: newProdPrice,
      description: newProdDesc || 'Pilihan lezat khas Arjawinangun',
      image: newProdImage,
      inStock: true,
      storeName: currentMerchant.name,
      storeType: 'warung_makan',
      salesCount: 1,
      rating: 5.0
    });
    setNewProdName('');
    setNewProdDesc('');
    setShowAddModal(false);
  };

  const samplePresets = [
    { label: '🍗 Ayam Geprek', url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80' },
    { label: '🍲 Bakso / Mie', url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80' },
    { label: '🍢 Sate Kambing', url: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=500&q=80' },
    { label: '☕ Kopi Susu', url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80' },
    { label: '🛒 Sembako', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80' },
  ];

  const cred = currentMerchant.credibilityScore || { plus: 340, minus: 1, totalScore: 339 };

  return (
    <div className="space-y-4 pb-20">
      
      {/* Merchant Header & Store Selector with Sky Background */}
      <div 
        className="relative overflow-hidden text-white p-5 rounded-b-3xl shadow-lg -mx-4 -mt-4 mb-4 bg-cover bg-center"
        style={{ backgroundImage: "url('/sky-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/85 to-sky-800/80 pointer-events-none" />

        <div className="relative z-10">
          {onBackToCustomer && (
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/15 text-xs">
              <button
                onClick={onBackToCustomer}
                className="text-sky-200 hover:text-white font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>← Mode Belanja (Customer)</span>
              </button>
              <span className="text-[10px] text-sky-300 font-mono font-bold tracking-wider">PORTAL MITRA WARUNG</span>
            </div>
          )}

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-sky-300" />
              <h2 className="text-base font-black">Dashboard Mitra Warung</h2>
            </div>
            {/* Store Switcher */}
            <select
              value={selectedMerchantId}
              onChange={(e) => setSelectedMerchantId(e.target.value)}
              className="bg-slate-900/60 text-xs font-bold text-white rounded-xl px-2.5 py-1.5 border border-white/20 focus:outline-none cursor-pointer max-w-[170px] truncate"
            >
              {merchants.map(m => (
                <option key={m.id} value={m.id} className="text-slate-900">
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Store Profile Card */}
          <div className="bg-slate-950/50 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <img 
                src={currentMerchant.logo} 
                alt={currentMerchant.name} 
                className="w-14 h-14 rounded-2xl object-cover border-2 border-white/40 shrink-0 bg-white"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm text-white truncate">{currentMerchant.name}</h3>
                  {currentMerchant.isPremiumMember && (
                    <span className="bg-amber-400 text-amber-950 font-black text-[9px] px-1.5 py-0.2 rounded">
                      PRO
                    </span>
                  )}
                </div>
                <p className="text-xs text-sky-200 mt-0.5">{currentMerchant.category} • {currentMerchant.district}</p>
                
                {/* Credibility Score Display */}
                <div className="flex items-center gap-2 mt-1.5 text-[11px]">
                  <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md border border-white/10">
                    <Award className="w-3.5 h-3.5 text-amber-300" />
                    <span className="font-bold text-white">Kredibilitas:</span>
                    <span className="text-emerald-300 font-extrabold">+{cred.plus}</span>
                    <span className="text-rose-300 font-extrabold">-{cred.minus}</span>
                  </div>
                  <span className="text-amber-300 font-bold flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-current" /> {currentMerchant.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Store Open/Close Toggle */}
            <div className="text-right shrink-0">
              <button
                onClick={() => onToggleStoreOpen(currentMerchant.id, !currentMerchant.isOpen)}
                className={`px-3 py-2 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                  currentMerchant.isOpen 
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                    : 'bg-rose-500 hover:bg-rose-600 text-white'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{currentMerchant.isOpen ? 'Toko Buka' : 'Toko Tutup'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ANTI FAKE ORDER WARNING BANNER */}
      <div className="p-3 bg-rose-50 border-2 border-rose-300 rounded-2xl flex items-start gap-2.5 text-xs text-rose-950 shadow-xs">
        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-extrabold text-rose-900 uppercase tracking-tight">
            ⚠️ PERINGATAN SISTEM: AWAS FAKE ORDER!
          </p>
          <p className="text-[11px] text-rose-800 mt-0.5 leading-relaxed">
            Pembeli wajib membayar saat kurir tiba. Laporkan ke admin jika ada indikasi order fiktif. Pelaku fake order akan langsung dikurangi skor kredibilitas (-30 poin) dan nomor HP serta NIK diblokir permanen.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto text-xs font-bold pb-2 scrollbar-none">
        {[
          { id: 'overview', label: 'Ringkasan' },
          { id: 'orders', label: `Pesanan (${merchantOrders.length})` },
          { id: 'products', label: `Daftar Menu (${merchantProducts.length})` },
          { id: 'promos', label: 'Promo Toko' },
          { id: 'membership', label: 'Langganan Mitra' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`py-2 px-3.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === t.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Omzet Langsung</span>
              <p className="text-base font-black text-blue-700 mt-0.5">
                Rp {todayRevenue.toLocaleString('id-ID')}
              </p>
              <span className="text-[10px] text-slate-500">Tunai COD / QRIS Toko</span>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Pesanan Hari Ini</span>
              <p className="text-base font-black text-slate-800 mt-0.5">{todayOrders}</p>
              <span className="text-[10px] text-emerald-600 font-semibold">100% Riil</span>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Poin Kredibilitas</span>
              <p className="text-base font-black text-emerald-600 mt-0.5">
                +{cred.plus} <span className="text-rose-500 font-bold text-xs">-{cred.minus}</span>
              </p>
              <span className="text-[10px] text-slate-500">Toko Sangat Amanah</span>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Rating Toko</span>
              <p className="text-base font-black text-amber-500 mt-0.5 flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                {currentMerchant.rating}
              </p>
              <span className="text-[10px] text-slate-500">Ulasan Pelanggan</span>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900">Kelola Menu & Stok</h3>
            <button
              onClick={() => setShowAddModal(true)}
              className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Produk (+Foto)</span>
            </button>
          </div>

          <div className="space-y-2">
            {merchantProducts.map((p) => (
              <div 
                key={p.id}
                className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img src={p.image} alt={p.name} className="w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-100" />
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-slate-900 truncate">{p.name}</h4>
                    <p className="text-[10px] text-slate-400">{p.category}</p>
                    <p className="text-xs font-extrabold text-blue-700 mt-0.5">
                      Rp {p.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onToggleStock(p.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                      p.inStock 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {p.inStock ? 'Tersedia' : 'Habis'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-3">
          <h3 className="font-extrabold text-sm text-slate-900">Pesanan Masuk</h3>
          {merchantOrders.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
              Belum ada pesanan aktif
            </div>
          ) : (
            merchantOrders.map(ord => (
              <div key={ord.id} className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">#{ord.orderNumber}</span>
                  <span className="bg-blue-100 text-blue-900 font-extrabold px-2 py-0.5 rounded-md text-[10px]">
                    {ord.status}
                  </span>
                </div>
                <div className="text-xs text-slate-600">
                  <p>Pemesan: <strong>{ord.customerName}</strong></p>
                  <p className="text-emerald-700 font-extrabold">Total: Rp {ord.total.toLocaleString('id-ID')} (Pembayaran Langsung COD/QRIS)</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* PROMOS & MEMBERSHIP TABS */}
      {activeTab === 'promos' && (
        <div className="p-4 bg-white border border-slate-200 rounded-2xl text-xs space-y-2">
          <h4 className="font-bold text-slate-900">Program Promo Toko</h4>
          <p className="text-slate-600">Diskon 20% Min Belanja 40rb sedang aktif di beranda katalog.</p>
        </div>
      )}

      {activeTab === 'membership' && (
        <div className="p-4 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl text-white space-y-3">
          <h3 className="text-base font-black">Paket Merchant VIP Arjawinangun</h3>
          <p className="text-xs text-amber-100">Prioritas tayang di katalog Shopee style AWD dengan badge VIP resmi.</p>
          <button
            onClick={() => onUpgradeMembership(currentMerchant.id)}
            className="px-4 py-2 bg-slate-950 text-amber-300 rounded-xl text-xs font-bold"
          >
            Aktifkan / Perpanjang VIP
          </button>
        </div>
      )}

      {/* ============================================================== */}
      {/* ADD PRODUCT MODAL DENGAN UPLOAD FOTO MINIMALIS (HEMAT HOSTING) */}
      {/* ============================================================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-3.5 text-xs max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-slate-900 text-sm">Tambah Menu / Produk Baru</h3>
                <p className="text-[10px] text-slate-500">Foto otomatis dikompresi agar hemat hosting & kuota</p>
              </div>
              <button 
                onClick={() => setShowAddModal(false)} 
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3">
              
              {/* UPLOAD FOTO PRODUK MINIMALIS */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-blue-600" />
                    Upload Foto Produk *
                  </label>
                  <span className="text-[9px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    💾 {compressedFileSize} (Hemat Hosting)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-200 border-2 border-white shadow-xs shrink-0">
                    <img 
                      src={newProdImage} 
                      alt="Pratinjau Produk" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <input 
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isCompressing ? 'Mengompresi...' : 'Pilih Foto dari Galeri / Kamera'}</span>
                    </button>
                    <p className="text-[10px] text-slate-400">
                      Otomatis di-resize 400x400 px WebP/JPEG ringan.
                    </p>
                  </div>
                </div>

                {/* Quick Presets for fast setup */}
                <div className="pt-1">
                  <span className="text-[10px] text-slate-400 font-bold block mb-1">
                    Atau Pilih Foto Cepat:
                  </span>
                  <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
                    {samplePresets.map((sp, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setNewProdImage(sp.url);
                          setCompressedFileSize('20 KB');
                        }}
                        className="px-2 py-0.5 text-[10px] bg-white border border-slate-200 hover:border-blue-400 text-slate-700 rounded-lg whitespace-nowrap font-medium"
                      >
                        {sp.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Produk / Makanan *</label>
                <input
                  type="text"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="Contoh: Ayam Geprek Sambal Korek"
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kategori</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  >
                    <option value="Ayam">Ayam</option>
                    <option value="Bakso">Bakso</option>
                    <option value="Mie">Mie</option>
                    <option value="Kopi">Kopi</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Sate">Sate</option>
                    <option value="Martabak">Martabak</option>
                    <option value="Sembako">Sembako</option>
                    <option value="UMKM Lokal">UMKM Lokal</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Harga Jual (Rp) *</label>
                  <input
                    type="number"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(parseInt(e.target.value) || 0)}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="Deskripsi cita rasa, porsi, atau sambal..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Simpan & Pasarkan di Katalog Shopee
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
