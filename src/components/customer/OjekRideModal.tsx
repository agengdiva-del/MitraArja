import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Navigation, 
  Bike, 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  Banknote, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Phone,
  AlertTriangle,
  Award,
  QrCode
} from 'lucide-react';
import { UserProfile, Order, PaymentMethod } from '../../types';
import { UniversalAntarJemputIcon } from '../common/UniversalServiceIcons';

interface OjekRideModalProps {
  isOpen: boolean;
  currentUser: UserProfile;
  onClose: () => void;
  onSubmitOrder: (order: Partial<Order>) => void;
}

const POPULAR_LOCATIONS = [
  'Stasiun KA Arjawinangun',
  'Pasar Tradisional Jungjang',
  'RSUD Arjawinangun',
  'Pasar Grosir Sandang Tegalgubug',
  'Alun-Alun & Masjid Besar Arjawinangun',
  'Griya Permata Arjawinangun (Perumahan)',
  'Desa Kebonturi',
  'Desa Sende'
];

export const OjekRideModal: React.FC<OjekRideModalProps> = ({
  isOpen,
  currentUser,
  onClose,
  onSubmitOrder
}) => {
  const [pickup, setPickup] = useState(currentUser.address || 'Jungjang, Arjawinangun (Titik Saya)');
  const [destination, setDestination] = useState('Stasiun KA Arjawinangun');
  const [notes, setNotes] = useState('');
  // Pure direct payments: COD Tunai atau QRIS Langsung (NO DIGITAL WALLET)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [isSearching, setIsSearching] = useState(false);
  const [rideType, setRideType] = useState<'standard' | 'express'>('standard');
  const [confirmAntiFake, setConfirmAntiFake] = useState(true);

  if (!isOpen) return null;

  // Calculate estimated distance based on destination
  const estimatedKm = destination.includes('Tegalgubug') ? 4.5 : destination.includes('RSUD') ? 2.8 : 1.8;
  const baseFare = 6000;
  const perKmRate = 2500;
  const deliveryFee = Math.round(baseFare + (Math.max(0, estimatedKm - 2) * perKmRate));
  const serviceFee = 1000;
  const totalFare = Math.max(5000, deliveryFee + serviceFee);

  const userCred = currentUser.credibilityScore || { plus: 148, minus: 0, totalScore: 148 };

  const handleBookRide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmAntiFake) {
      alert('Harap centang konfirmasi pesanan riil untuk mencegah fake order.');
      return;
    }

    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      const newOrder: Partial<Order> = {
        id: `ride_${Date.now()}`,
        orderNumber: `AWD-RIDE-${Math.floor(1000 + Math.random() * 9000)}`,
        customerId: currentUser.id,
        customerName: currentUser.name,
        customerPhone: currentUser.phone,
        courierId: 'user_courier_1',
        courierName: 'Kang Asep Supriatna',
        courierPhone: '085712348899',
        courierVehicle: 'Honda Vario 160 (E 4521 AA)',
        courierPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        serviceType: 'ride',
        pickupAddress: pickup,
        destinationAddress: destination,
        distanceKm: estimatedKm,
        deliveryNotes: notes || 'Jemput penumpang, helm higienis disediakan driver',
        status: 'courier_assigned',
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        subtotal: totalFare,
        deliveryFee: deliveryFee,
        platformFee: serviceFee,
        discount: 0,
        total: totalFare,
        courierEarned: deliveryFee,
        merchantEarned: 0,
        platformCommission: serviceFee,
        createdAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        estimatedMinutes: Math.round(estimatedKm * 4),
        progressPercent: 30,
        items: [],
        customerCredibility: userCred,
        courierCredibility: { plus: 395, minus: 0, totalScore: 395 },
        isAntiFakeOrderConfirmed: true
      };

      onSubmitOrder(newOrder);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh]">
        
        {/* Header with Sky Background */}
        <div 
          className="relative text-white p-5 text-center bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: "url('/sky-bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/85 to-sky-700/80 pointer-events-none" />

          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-950/40 hover:bg-slate-950/60 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/30 border border-sky-300/40 flex items-center justify-center mb-1 shadow-sm">
              <UniversalAntarJemputIcon className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-200 bg-blue-950/70 px-2.5 py-0.5 rounded-full border border-sky-400/40 mb-1">
              AWD RIDE • BY WONG NANGUN
            </span>
            <h2 className="text-xl font-black uppercase tracking-tight text-white drop-shadow-md">
              LAYANAN ANTAR JEMPUT
            </h2>
            <p className="text-xs text-sky-100 mt-0.5">
              Ojek Motor Cepat, Nyaman & Helm Higienis
            </p>
          </div>
        </div>

        {/* Credibility & Anti Fake Order Notice */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 font-bold text-slate-700">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            Kredibilitas Anda: <strong className="text-emerald-700">+{userCred.plus}</strong> / <strong className="text-rose-600">-{userCred.minus}</strong>
          </span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
            Bebas Fake Order
          </span>
        </div>

        {/* Body Form */}
        <form onSubmit={handleBookRide} className="p-4 sm:p-5 overflow-y-auto space-y-3.5 flex-1 text-xs">
          
          {/* ⚠️ Anti Fake Order Notice */}
          <div className="p-2.5 bg-rose-50 border border-rose-300 rounded-xl flex items-start gap-2 text-[11px] text-rose-950">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>
              <strong>Peringatan Awas Fake Order:</strong> Driver akan menjemput ke titik riil Anda. Penolakan pesanan saat driver tiba akan mengurangi poin kredibilitas (-30) dan akun dinonaktifkan.
            </span>
          </div>

          {/* Pickup & Destination */}
          <div className="space-y-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
            {/* Pickup */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Titik Jemput Anda
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-2.5" />
                <input 
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Lokasi penjemputan Anda"
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Destination */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                Titik Tujuan Antar
              </label>
              <div className="relative">
                <Navigation className="w-4 h-4 text-rose-600 absolute left-3 top-2.5" />
                <input 
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Lokasi tujuan Anda"
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Popular Landmarks Shortcut */}
            <div>
              <span className="text-[10px] text-slate-400 font-bold block mb-1">
                Tujuan Populer Arjawinangun:
              </span>
              <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
                {POPULAR_LOCATIONS.map((loc, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setDestination(loc)}
                    className="px-2 py-1 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-200 rounded-lg text-[10px] whitespace-nowrap font-medium transition-colors cursor-pointer"
                  >
                    📍 {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Catatan Penjemputan (Patokan Rumah / Helm)
            </label>
            <input 
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Cth: Tunggu depan pos satpam / bawa helm besar"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          {/* Pure Direct Payment (COD / QRIS Langsung) */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1.5">
              Metode Pembayaran Langsung
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-1 ring-blue-600'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Banknote className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold">Tunai COD</span>
                </div>
                <p className="text-[10px] text-slate-500">Bayar Langsung ke Driver</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('qris')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  paymentMethod === 'qris'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-1 ring-blue-600'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <QrCode className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold">QRIS Driver</span>
                </div>
                <p className="text-[10px] text-slate-500">Scan Langsung Saat Tiba</p>
              </button>
            </div>
          </div>

          {/* Rincian Tarif */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-600">Jarak Tempuh Perkiraan</span>
              <span className="font-bold text-slate-900">~{estimatedKm} KM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Tarif Ojek Motor</span>
              <span className="font-bold text-slate-900">Rp {deliveryFee.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Biaya Layanan & Asuransi</span>
              <span className="font-bold text-slate-900">Rp {serviceFee.toLocaleString('id-ID')}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-black">
              <span className="text-slate-900">Total Tarif Langsung</span>
              <span className="text-blue-700 text-sm font-black">
                Rp {totalFare.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Anti-Fake Order Confirmation */}
          <label className="flex items-start gap-2 p-2 bg-amber-50 border border-amber-200 rounded-xl cursor-pointer">
            <input 
              type="checkbox"
              checked={confirmAntiFake}
              onChange={(e) => setConfirmAntiFake(e.target.checked)}
              className="mt-0.5 rounded text-blue-600"
            />
            <span className="text-[10px] text-amber-950 font-bold leading-tight">
              Saya siap menunggu di titik jemput dan membayar tunai/QRIS langsung <strong>Rp {totalFare.toLocaleString('id-ID')}</strong> kepada driver AWD.
            </span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSearching || !confirmAntiFake}
            className="w-full py-3.5 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{isSearching ? 'Mencari Driver Terdekat...' : 'Pesan Antar Jemput Sekarang'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
