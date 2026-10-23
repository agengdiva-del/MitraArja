import React, { useState, useMemo } from 'react';
import { Merchant, Product, Order, UserProfile, BannerAd, ServiceType } from '../../types';
import { 
  Search, 
  MapPin, 
  Star, 
  Bike, 
  SlidersHorizontal,
  Flame,
  CheckCircle2,
  Bell,
  ArrowUpDown,
  Tag,
  Store,
  Sparkles,
  ShoppingBag,
  AlertTriangle,
  Award,
  ThumbsUp,
  ThumbsDown,
  ShieldCheck,
  HeartHandshake,
  AlertOctagon
} from 'lucide-react';
import {
  UniversalAntarJemputIcon,
  UniversalKulinerIcon,
  UniversalPaketCepatIcon,
  UniversalSembakoIcon,
  UniversalApotekIcon,
  UniversalDonasiIcon,
  UniversalTolongIcon,
  UniversalJastipIcon,
  UniversalUmkmIcon
} from '../common/UniversalServiceIcons';

interface HomeScreenProps {
  currentUser: UserProfile;
  merchants: Merchant[];
  products: Product[];
  banners: BannerAd[];
  activeOrder?: Order | null;
  onSelectMerchant: (merchant: Merchant) => void;
  onOpenService: (service: ServiceType) => void;
  onOpenOrderTracking: (order: Order) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentUser,
  merchants,
  products,
  banners,
  activeOrder,
  onSelectMerchant,
  onOpenService,
  onOpenOrderTracking
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRadius, setSelectedRadius] = useState<number>(15);
  const [currentDistrict, setCurrentDistrict] = useState<string>('Jungjang, Arjawinangun');
  const [activeBannerIdx, setActiveBannerIdx] = useState(0);

  // Shopee Catalog Filter & Sort State
  const [selectedStoreType, setSelectedStoreType] = useState<string>('semua');
  const [selectedSort, setSelectedSort] = useState<'terlaris' | 'populer' | 'harga_asc' | 'harga_desc'>('terlaris');
  const [selectedPriceRange, setSelectedPriceRange] = useState<'all' | 'under15' | '15to30' | 'above30'>('all');

  // Main Menus (Readable for all ages - Bold, High-Contrast)
  // Names: ojek awd -> Antar Jemput, makanan -> Kuliner, kirim barang -> Paket Cepat
  // Removed: event, bills, pulsa, ppob
  // Added: Donasi (hanya disetujui admin), Tolong (bantuan segera)
  const mainMenus = [
    { 
      id: 'ride' as ServiceType, 
      name: 'Antar Jemput', 
      icon: UniversalAntarJemputIcon, 
      bg: 'bg-gradient-to-b from-sky-500 to-blue-700', 
      badge: 'Ojek Motor',
      desc: 'Antar Orang' 
    },
    { 
      id: 'food' as ServiceType, 
      name: 'Kuliner', 
      icon: UniversalKulinerIcon, 
      bg: 'bg-gradient-to-b from-amber-500 to-orange-600', 
      badge: 'Diskon 20%',
      desc: 'Makan & Jajanan' 
    },
    { 
      id: 'delivery' as ServiceType, 
      name: 'Paket Cepat', 
      icon: UniversalPaketCepatIcon, 
      bg: 'bg-gradient-to-b from-blue-600 to-indigo-700', 
      badge: 'Instan',
      desc: 'Kirim Barang' 
    },
    { 
      id: 'grocery' as ServiceType, 
      name: 'Sembako', 
      icon: UniversalSembakoIcon, 
      bg: 'bg-gradient-to-b from-emerald-500 to-green-700', 
      badge: 'Pasar Arja',
      desc: 'Bahan Pokok' 
    },
    { 
      id: 'pharmacy' as ServiceType, 
      name: 'Apotek', 
      icon: UniversalApotekIcon, 
      bg: 'bg-gradient-to-b from-rose-500 to-red-700', 
      badge: '24 Jam',
      desc: 'Obat & Resep' 
    },
    { 
      id: 'donation' as ServiceType, 
      name: 'Donasi', 
      icon: UniversalDonasiIcon, 
      bg: 'bg-gradient-to-b from-indigo-500 to-purple-700', 
      badge: 'Resmi Admin',
      desc: 'AWD Peduli' 
    },
    { 
      id: 'emergency' as ServiceType, 
      name: 'Tolong', 
      icon: UniversalTolongIcon, 
      bg: 'bg-gradient-to-b from-red-600 to-rose-800', 
      badge: 'SOS Darurat',
      desc: 'Bantuan Segera' 
    },
    { 
      id: 'jastip' as ServiceType, 
      name: 'Jasa Titip', 
      icon: UniversalJastipIcon, 
      bg: 'bg-gradient-to-b from-cyan-500 to-blue-700', 
      badge: 'Pasar',
      desc: 'Titip Belanja' 
    },
    { 
      id: 'umkm' as ServiceType, 
      name: 'UMKM Lokal', 
      icon: UniversalUmkmIcon, 
      bg: 'bg-gradient-to-b from-lime-500 to-emerald-700', 
      badge: 'Cirebonan',
      desc: 'Produk Warga' 
    },
  ];

  // Store Types for Shopee Filter
  const storeTypes = [
    { id: 'semua', label: 'Semua Produk' },
    { id: 'warung_makan', label: '🍜 Warung Makan' },
    { id: 'jajanan', label: '🍢 Jajanan & Camilan' },
    { id: 'warung_sembako', label: '🛒 Sembako & Dapur' },
    { id: 'minuman', label: '🧋 Kopi & Minuman' },
    { id: 'apotek', label: '💊 Apotek' },
  ];

  // Dense Shopee Catalog Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by store type / category
    if (selectedStoreType !== 'semua') {
      list = list.filter(p => {
        if (p.storeType) return p.storeType === selectedStoreType;
        if (selectedStoreType === 'warung_makan') return ['Ayam', 'Bakso', 'Mie', 'Sate', 'UMKM Lokal'].includes(p.category);
        if (selectedStoreType === 'jajanan') return ['Martabak', 'Jajanan'].includes(p.category);
        if (selectedStoreType === 'warung_sembako') return ['Sembako', 'Sayur', 'Buah', 'Air Galon', 'Frozen Food'].includes(p.category);
        if (selectedStoreType === 'minuman') return ['Kopi', 'Minuman'].includes(p.category);
        if (selectedStoreType === 'apotek') return ['Obat Bebas', 'Vitamin', 'Alat Kesehatan'].includes(p.category);
        return true;
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.storeName && p.storeName.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Filter by price range
    if (selectedPriceRange === 'under15') {
      list = list.filter(p => p.price < 15000);
    } else if (selectedPriceRange === '15to30') {
      list = list.filter(p => p.price >= 15000 && p.price <= 30000);
    } else if (selectedPriceRange === 'above30') {
      list = list.filter(p => p.price > 30000);
    }

    // Sort criteria
    if (selectedSort === 'terlaris') {
      list.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
    } else if (selectedSort === 'populer') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (selectedSort === 'harga_asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'harga_desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, selectedStoreType, searchQuery, selectedPriceRange, selectedSort]);

  // Filter merchants for the merchant list section
  const filteredMerchants = merchants.filter(m => {
    if (!m.isOpen) return false;
    if (m.distanceKm > selectedRadius) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchMerchant = m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q);
      const matchProduct = products.some(p => p.merchantId === m.id && p.name.toLowerCase().includes(q));
      return matchMerchant || matchProduct;
    }
    return true;
  });

  const userCred = currentUser.credibilityScore || { plus: 148, minus: 0, totalScore: 148 };

  return (
    <div className="space-y-3.5 pb-20">
      
      {/* Top Location Bar & User Credibility Badge with Clear Sky and Clouds Background */}
      {/* NO DIGITAL WALLET / MITRAPAY / AWD PAY (Pure direct payments) */}
      <div 
        className="relative overflow-hidden text-white p-4 rounded-b-3xl shadow-lg -mx-4 -mt-4 mb-2 bg-cover bg-center"
        style={{ backgroundImage: "url('/sky-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/85 to-sky-700/80 pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-sky-300 shrink-0" />
            <div>
              <p className="text-[10px] text-sky-200 uppercase font-black tracking-wider drop-shadow-sm">Lokasi Antar</p>
              <select 
                value={currentDistrict}
                onChange={(e) => setCurrentDistrict(e.target.value)}
                className="bg-transparent text-xs font-black text-white border-none focus:outline-none cursor-pointer pr-4 drop-shadow-sm"
              >
                <option value="Jungjang, Arjawinangun" className="text-slate-900">Jungjang, Arjawinangun</option>
                <option value="Kebonturi, Arjawinangun" className="text-slate-900">Kebonturi, Arjawinangun</option>
                <option value="Tegalgubug, Arjawinangun" className="text-slate-900">Tegalgubug, Arjawinangun</option>
                <option value="Sende, Arjawinangun" className="text-slate-900">Sende, Arjawinangun</option>
                <option value="Cirebon Timur" className="text-slate-900">Cirebon Timur</option>
              </select>
            </div>
          </div>

          {/* User Credibility Score Badge (+ / - Point Display) */}
          <div className="flex items-center gap-1.5 bg-slate-950/50 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/20 shadow-sm">
            <Award className="w-4 h-4 text-amber-300 shrink-0" />
            <div className="text-left">
              <p className="text-[9px] text-sky-200 font-extrabold uppercase tracking-tight">Kredibilitas Anda</p>
              <div className="flex items-center gap-1 text-xs font-black">
                <span className="text-emerald-300">+{userCred.plus}</span>
                <span className="text-rose-300">-{userCred.minus}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative mt-3 z-10">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kuliner, jajanan, sembako, apotek di katalog..."
            className="w-full pl-9 pr-4 py-2.5 bg-white text-slate-800 rounded-2xl text-xs font-medium placeholder-slate-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* ⚠️ PERINGATAN AWAS FAKE ORDER PADA APLIKASI */}
      {/* ============================================================== */}
      <div className="p-3 bg-gradient-to-r from-rose-50 via-red-50 to-amber-50 border-2 border-rose-300 rounded-2xl shadow-xs flex items-start gap-2.5 text-xs text-rose-950">
        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5 animate-pulse" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-black text-rose-900 uppercase tracking-tight text-[11px] sm:text-xs">
              ⚠️ AWAS FAKE ORDER (PESANAN PALSU / FIKTIF)
            </h4>
            <span className="text-[9px] font-black bg-rose-600 text-white px-1.5 py-0.2 rounded uppercase">
              Tindakan Tegas
            </span>
          </div>
          <p className="text-[11px] text-rose-800 mt-0.5 leading-relaxed">
            Pembayaran dilakukan <strong>langsung (Tunai COD / QRIS saat barang sampai)</strong>. Segala bentuk order fiktif akan langsung <strong>dikurangi poin kredibilitas (-30)</strong> dan NIK/No HP diblokir permanen serta diteruskan ke aparat desa Arjawinangun.
          </p>
        </div>
      </div>

      {/* Active Order Floating Banner if any */}
      {activeOrder && (
        <div 
          onClick={() => onOpenOrderTracking(activeOrder)}
          className="p-3 bg-gradient-to-r from-blue-700 to-sky-700 rounded-2xl text-white shadow-lg cursor-pointer flex items-center justify-between gap-2.5 animate-in fade-in"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Bike className="w-5 h-5 text-sky-100" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-300 animate-ping" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-100">Pesanan Aktif (COD Langsung)</span>
              </div>
              <p className="text-xs font-bold truncate">{activeOrder.merchantName || 'Kurir AWD'}</p>
              <p className="text-[10px] text-sky-100 truncate">
                {activeOrder.courierName || 'Kang Asep'} • Kredibilitas Driver: <strong>+{activeOrder.courierCredibility?.plus || 395} / -{activeOrder.courierCredibility?.minus || 0}</strong>
              </p>
            </div>
          </div>
          <button 
            type="button"
            className="px-2.5 py-1.5 bg-white text-blue-900 font-bold text-xs rounded-xl shadow-xs shrink-0 whitespace-nowrap"
          >
            Lacak Driver
          </button>
        </div>
      )}

      {/* Promotional Banner Carousel */}
      <div className="relative overflow-hidden rounded-2xl shadow-sm bg-slate-900 h-32 sm:h-36">
        {banners.map((banner, idx) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              idx === activeBannerIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img 
              src={banner.imageUrl} 
              alt={banner.title} 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/85 via-blue-950/50 to-transparent p-4 flex flex-col justify-end text-white">
              <span className="px-2 py-0.5 rounded bg-blue-600 text-[10px] font-extrabold text-white self-start uppercase tracking-wider mb-1">
                {banner.badge}
              </span>
              <h3 className="text-sm font-black text-white">{banner.title}</h3>
              <p className="text-[11px] text-slate-200">{banner.subtitle}</p>
            </div>
          </div>
        ))}
        {/* Banner indicators */}
        <div className="absolute bottom-2 right-3 z-20 flex gap-1.5">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveBannerIdx(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === activeBannerIdx ? 'w-5 bg-sky-400' : 'bg-white/50'
              }`}
              aria-label={`Banner ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 9 UNIVERSAL SERVICE ICONS (READABLE FOR ALL AGES) */}
      {/* ============================================================== */}
      <div className="bg-gradient-to-b from-sky-50/70 to-white p-3.5 rounded-3xl border border-sky-100/80 shadow-xs">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1.5">
            <span className="text-base">🛵</span>
            <h3 className="font-black text-slate-900 text-sm tracking-tight">Layanan AWD Arjawinangun</h3>
          </div>
          <span className="text-[10px] font-extrabold text-blue-900 bg-sky-100 px-2 py-0.5 rounded-full border border-sky-200">
            Jelas & Terbaca Semua Usia
          </span>
        </div>

        {/* 9 Service Grid - Large, Bold, High Contrast */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-2.5">
          {mainMenus.map((menu) => {
            const IconComponent = menu.icon;
            const isEmergency = menu.id === 'emergency';
            const isDonation = menu.id === 'donation';
            return (
              <button
                key={menu.id}
                onClick={() => onOpenService(menu.id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-2xl group cursor-pointer transition-all active:scale-95 hover:bg-white hover:shadow-md ${
                  isEmergency ? 'ring-2 ring-red-400 bg-red-50/70' : isDonation ? 'ring-2 ring-indigo-400 bg-indigo-50/70' : 'bg-white/80'
                }`}
              >
                <div className={`relative w-13 h-13 rounded-2xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105 ${menu.bg}`}>
                  <div className="w-8 h-8 flex items-center justify-center text-white">
                    <IconComponent />
                  </div>
                  {menu.badge && (
                    <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full shadow-xs border border-white">
                      {menu.badge}
                    </span>
                  )}
                </div>
                <span className={`text-xs font-black text-center leading-tight mt-0.5 line-clamp-1 ${
                  isEmergency ? 'text-red-700' : isDonation ? 'text-indigo-800' : 'text-slate-900'
                }`}>
                  {menu.name}
                </span>
                <span className="text-[9px] text-slate-500 font-bold line-clamp-1">
                  {menu.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* SHOPEE-STYLE DENSE PRODUCT CATALOG & MULTI-CRITERIA SEARCH */}
      {/* ============================================================== */}
      <div className="space-y-3 pt-1">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-rose-500 text-sm">🛍️</span>
              <h3 className="font-black text-slate-900 text-sm tracking-tight">Katalog Kuliner & Sembako</h3>
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                Gaya Shopee
              </span>
            </div>
            <span className="text-xs text-slate-600 font-bold">
              {filteredProducts.length} Produk
            </span>
          </div>
          <p className="text-[11px] text-slate-600">
            Foto, nama, harga & skor kredibilitas warung langsung di Arjawinangun
          </p>
        </div>

        {/* Criteria Tabs 1: Jenis Toko & Kuliner */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {storeTypes.map(st => (
            <button
              key={st.id}
              onClick={() => setSelectedStoreType(st.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedStoreType === st.id
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Criteria Tabs 2: Sort by Terlaris, Terpopuler, Harga */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 text-xs">
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3 text-blue-600" />
              Urutkan:
            </span>
            <button
              onClick={() => setSelectedSort('terlaris')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                selectedSort === 'terlaris'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              🔥 Terlaris
            </button>
            <button
              onClick={() => setSelectedSort('populer')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                selectedSort === 'populer'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              ⭐ Terpopuler
            </button>
            <button
              onClick={() => setSelectedSort('harga_asc')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                selectedSort === 'harga_asc'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Harga Termurah
            </button>
            <button
              onClick={() => setSelectedSort('harga_desc')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                selectedSort === 'harga_desc'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Harga Termahal
            </button>
          </div>
        </div>

        {/* Criteria Tabs 3: Price Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-slate-600 font-bold shrink-0">Rentang:</span>
          {[
            { id: 'all', label: 'Semua Harga' },
            { id: 'under15', label: '< 15rb' },
            { id: '15to30', label: '15rb - 30rb' },
            { id: 'above30', label: '> 30rb' }
          ].map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPriceRange(p.id as any)}
              className={`px-2.5 py-0.5 rounded-lg font-bold transition-all ${
                selectedPriceRange === p.id
                  ? 'bg-blue-100 text-blue-900 border border-blue-400 font-extrabold'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* DENSE SHOPEE PRODUCT GRID: Gambar, Nama, Harga, Kredibilitas */}
        {filteredProducts.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500">
            <p className="font-semibold text-xs">Produk tidak ditemukan</p>
            <p className="text-[11px] text-slate-400 mt-1">Coba cari dengan kata kunci lain atau pilih Semua Produk</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {filteredProducts.map((prod) => {
              const merchant = merchants.find(m => m.id === prod.merchantId);
              const mCred = merchant?.credibilityScore || { plus: 300, minus: 0, totalScore: 300 };
              return (
                <div
                  key={prod.id}
                  onClick={() => merchant && onSelectMerchant(merchant)}
                  className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  {/* Aspect-Square Product Image (Shopee Style) */}
                  <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Promo or Best Seller Tag */}
                    {prod.promoBadge && (
                      <span className="absolute top-1.5 left-1.5 bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm">
                        {prod.promoBadge}
                      </span>
                    )}

                    {/* Stock Status if out */}
                    {!prod.inStock && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center">
                        <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          Habis
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Dense Details (Nama dan Harga) */}
                  <div className="p-2 flex flex-col justify-between flex-1 space-y-1">
                    <div>
                      {/* Store name tag & Credibility Point */}
                      <div className="flex items-center justify-between text-[9px] text-slate-600 gap-1 font-semibold">
                        <span className="truncate flex items-center gap-1">
                          <Store className="w-2.5 h-2.5 text-blue-600 shrink-0" />
                          <span className="truncate">{prod.storeName || merchant?.name || 'Warung Lokal'}</span>
                        </span>
                        <span className="text-emerald-700 font-extrabold shrink-0">
                          +{mCred.plus}/-{mCred.minus}
                        </span>
                      </div>

                      {/* Product Name (2 lines clamped like Shopee) */}
                      <h4 className="font-bold text-slate-900 text-xs line-clamp-2 leading-tight mt-0.5 min-h-[28px] group-hover:text-blue-700 transition-colors">
                        {prod.name}
                      </h4>
                    </div>

                    <div className="pt-1">
                      {/* Price Section */}
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs sm:text-sm font-black text-rose-600">
                          Rp {prod.price.toLocaleString('id-ID')}
                        </span>
                        {prod.originalPrice && (
                          <span className="text-[10px] text-slate-400 line-through">
                            Rp {prod.originalPrice.toLocaleString('id-ID')}
                          </span>
                        )}
                      </div>

                      {/* Micro info: Rating & Sales Count */}
                      <div className="flex items-center justify-between text-[10px] text-slate-600 pt-0.5">
                        <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-current" />
                          {prod.rating || 4.8}
                        </span>
                        <span className="text-slate-600 truncate">
                          Terjual {prod.salesCount ? (prod.salesCount >= 1000 ? `${(prod.salesCount/1000).toFixed(1)}rb+` : `${prod.salesCount}+`) : '100+'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Radius and Merchant Terdekat Section with Credibility Score */}
      <div className="space-y-2.5 pt-3 border-t border-slate-200">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
            <span>Radius Jangkauan Merchant: <strong>{selectedRadius} KM</strong></span>
          </div>
          <span className="text-[11px] text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full font-bold">
            Toko Buka ({filteredMerchants.length})
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="15"
          value={selectedRadius}
          onChange={(e) => setSelectedRadius(parseInt(e.target.value))}
          className="w-full accent-blue-600"
        />

        <div className="space-y-2.5">
          {filteredMerchants.map((merchant) => {
            const mCred = merchant.credibilityScore || { plus: 340, minus: 1, totalScore: 339 };
            return (
              <div
                key={merchant.id}
                onClick={() => onSelectMerchant(merchant)}
                className="p-3 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 transition-all shadow-xs flex gap-3 cursor-pointer group"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <img 
                    src={merchant.banner} 
                    alt={merchant.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {merchant.isPremiumMember && (
                    <span className="absolute top-1 left-1 bg-amber-500 text-amber-950 text-[8px] font-extrabold px-1.5 py-0.5 rounded shadow-xs flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5 fill-current" />
                      VIP
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-blue-50 text-blue-800 font-bold px-1.5 py-0.2 rounded border border-blue-200">
                        {merchant.category}
                      </span>
                      <span className="text-[10px] text-slate-500 truncate">
                        {merchant.district}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1 mt-0.5">
                      {merchant.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="text-amber-500 font-extrabold flex items-center gap-0.5">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {merchant.rating}
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-blue-700">
                        {merchant.distanceKm} KM
                      </span>
                      <span>•</span>
                      <span className="text-emerald-700 font-extrabold flex items-center gap-0.5">
                        <Award className="w-3 h-3 text-amber-500" />
                        Kredibilitas: +{mCred.plus}/-{mCred.minus}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] pt-1">
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      ✓ Pembayaran Langsung COD / QRIS Toko
                    </span>
                    {merchant.activePromo && (
                      <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 truncate">
                        {merchant.activePromo}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
