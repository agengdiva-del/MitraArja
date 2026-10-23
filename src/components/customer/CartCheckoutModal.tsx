import React, { useState } from 'react';
import { CartItem, PaymentMethod, UserProfile, Order, Merchant } from '../../types';
import { calculateDeliveryFee, calculateServiceFee, calculateMitraPoints } from '../../utils/pricing';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MapPin, 
  CreditCard, 
  QrCode, 
  Banknote, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Award,
  ShieldCheck
} from 'lucide-react';

interface CartCheckoutModalProps {
  cart: CartItem[];
  merchant?: Merchant;
  currentUser: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClearCart: () => void;
  onPlaceOrder: (orderData: Partial<Order>) => void;
}

export const CartCheckoutModal: React.FC<CartCheckoutModalProps> = ({
  cart,
  merchant,
  currentUser,
  isOpen,
  onClose,
  onUpdateQuantity,
  onClearCart,
  onPlaceOrder
}) => {
  const [deliveryAddress, setDeliveryAddress] = useState(currentUser.address || 'Griya Permata Arjawinangun Blok B4 No. 12, Jungjang');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  // Pure direct payment methods: 'cod', 'qris', 'bank_transfer' (NO DIGITAL WALLET)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [voucherCode, setVoucherCode] = useState('ARJAHEMAT');
  const [voucherDiscount, setVoucherDiscount] = useState(5000);
  const [prescriptionPhoto, setPrescriptionPhoto] = useState<string>('');
  const [showQrisCode, setShowQrisCode] = useState(false);
  const [confirmAntiFakeOrder, setConfirmAntiFakeOrder] = useState(true);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
  const distanceKm = merchant ? merchant.distanceKm : 2.0;
  const deliveryCalc = calculateDeliveryFee(distanceKm);
  const platformFee = calculateServiceFee(subtotal);
  const total = Math.max(0, subtotal + deliveryCalc.deliveryFee + platformFee - voucherDiscount);

  // Check if any product needs prescription
  const hasHardMedicine = cart.some(item => item.product.isHardMedicine);
  const custCred = currentUser.credibilityScore || { plus: 148, minus: 0, totalScore: 148 };
  const mCred = merchant?.credibilityScore || { plus: 340, minus: 1, totalScore: 339 };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (hasHardMedicine && !prescriptionPhoto) {
      alert('Peringatan: Keranjang berisi Obat Keras (Resep Dokter). Harap unggah foto resep dokter terlebih dahulu.');
      return;
    }

    if (!confirmAntiFakeOrder) {
      alert('Harap centang konfirmasi komitmen pesanan riil untuk mencegah fake order.');
      return;
    }

    const orderData: Partial<Order> = {
      orderNumber: `AWD-${Date.now().toString().slice(-7)}`,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      merchantId: merchant?.id,
      merchantName: merchant?.name || 'Mitra Kuliner Arjawinangun',
      serviceType: merchant?.serviceType || 'food',
      items: [...cart],
      pickupAddress: merchant?.address || 'Pusat Arjawinangun',
      destinationAddress: deliveryAddress,
      distanceKm: distanceKm,
      deliveryNotes: deliveryNotes,
      prescriptionPhoto: prescriptionPhoto,
      status: 'pending',
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      subtotal: subtotal,
      deliveryFee: deliveryCalc.deliveryFee,
      platformFee: platformFee,
      discount: voucherDiscount,
      total: total,
      courierEarned: Math.round(deliveryCalc.deliveryFee * 0.9),
      merchantEarned: Math.round(subtotal * 0.9),
      platformCommission: Math.round(subtotal * 0.1) + platformFee,
      createdAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      estimatedMinutes: Math.round(distanceKm * 4 + 12),
      progressPercent: 15,
      customerCredibility: custCred,
      merchantCredibility: mCred,
      isAntiFakeOrderConfirmed: true
    };

    onPlaceOrder(orderData);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-lg h-full sm:h-auto sm:max-h-[92vh] sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col relative">
        
        {/* Header with Sky Background */}
        <div 
          className="relative text-white p-5 flex items-center justify-between shrink-0 bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: "url('/sky-bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/85 to-sky-700/80 pointer-events-none" />

          <div className="relative z-10">
            <h3 className="text-base sm:text-lg font-black uppercase tracking-tight">Checkout Pesanan Langsung</h3>
            <p className="text-xs text-sky-200">
              {merchant ? merchant.name : 'Kuliner & Sembako Arjawinangun'}
            </p>
          </div>

          <button 
            onClick={onClose}
            className="relative z-10 w-8 h-8 rounded-full bg-slate-950/40 hover:bg-slate-950/60 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Credibility Info Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-[11px] text-slate-700">
          <span className="flex items-center gap-1 font-bold">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            Kredibilitas Anda: <strong className="text-emerald-700">+{custCred.plus}</strong> / <strong className="text-rose-600">-{custCred.minus}</strong>
          </span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
            Pembeli Terpercaya
          </span>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs">
          
          {/* ============================================================== */}
          {/* ⚠️ PERINGATAN AWAS FAKE ORDER PADA CHECKOUT */}
          {/* ============================================================== */}
          <div className="p-3 bg-gradient-to-r from-rose-50 to-red-50 border-2 border-rose-300 rounded-2xl flex items-start gap-2.5 text-xs text-rose-950 shadow-xs">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5 animate-pulse" />
            <div>
              <p className="font-black text-rose-900 uppercase">
                ⚠️ PERINGATAN AWAS FAKE ORDER!
              </p>
              <p className="text-[11px] text-rose-800 mt-0.5 leading-relaxed">
                Pesanan bersifat <strong>riil & mengikat</strong>. Penolakan barang saat kurir tiba atau pesanan fiktif akan dikenakan <strong>sanksi pemotongan Poin Kredibilitas (-30)</strong> dan nomor HP diblokir permanen dari seluruh layanan AWD.
              </p>
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Trash2 className="w-8 h-8" />
              </div>
              <p className="font-bold text-slate-600">Keranjang belanja Anda masih kosong</p>
            </div>
          ) : (
            <>
              {/* Delivery Destination */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    Titik Antar Pesanan
                  </span>
                  <span className="text-blue-700 font-extrabold text-[11px]">~{distanceKm} KM</span>
                </div>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="Catatan ke driver (cth: pagar hitam, titip satpam)"
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Cart Items List */}
              <div className="space-y-2">
                <span className="font-bold text-slate-800 block">Rincian Item Pesanan</span>
                {cart.map((item) => (
                  <div 
                    key={item.product.id}
                    className="p-2.5 bg-white border border-slate-200 rounded-2xl flex items-center gap-3 shadow-xs"
                  >
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-800 truncate">{item.product.name}</h4>
                      <p className="text-rose-600 font-extrabold text-[11px]">
                        Rp {item.product.price.toLocaleString('id-ID')}
                      </p>
                      {item.notes && (
                        <p className="text-[10px] text-slate-400 italic truncate">"{item.notes}"</p>
                      )}
                    </div>
                    {/* Stepper */}
                    <div className="flex items-center gap-1.5 bg-slate-100 rounded-xl p-1 shrink-0">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-5 h-5 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-slate-200"
                        aria-label="Kurangi"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-4 text-center font-bold text-slate-800">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-5 h-5 rounded-lg bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700"
                        aria-label="Tambah"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ============================================================== */}
              {/* PURE DIRECT PAYMENT METHODS (NO DIGITAL WALLET) */}
              {/* ============================================================== */}
              <div>
                <span className="font-bold text-slate-800 block mb-1.5">
                  Metode Pembayaran Langsung (Tanpa Saldo Mengendap)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => { setPaymentMethod('cod'); setShowQrisCode(false); }}
                    className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500/30 font-black text-blue-950'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Banknote className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                    <p className="font-bold text-xs">COD (Tunai)</p>
                    <p className="text-[9px] text-slate-500">Bayar ke Kurir</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setPaymentMethod('qris'); setShowQrisCode(true); }}
                    className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'qris'
                        ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500/30 font-black text-blue-950'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <QrCode className="w-5 h-5 mx-auto mb-1 text-indigo-600" />
                    <p className="font-bold text-xs">QRIS Toko</p>
                    <p className="text-[9px] text-slate-500">Scan Langsung</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setPaymentMethod('bank_transfer'); setShowQrisCode(false); }}
                    className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500/30 font-black text-blue-950'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                    <p className="font-bold text-xs">Transfer Bank</p>
                    <p className="text-[9px] text-slate-500">BCA / BRI / Mandiri</p>
                  </button>
                </div>
              </div>

              {/* QRIS Simulator Box */}
              {showQrisCode && (
                <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl text-center space-y-2">
                  <p className="font-bold text-indigo-950">QRIS Langsung Toko / Driver</p>
                  <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl shadow-xs border border-indigo-200 flex items-center justify-center">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=AWD-DIRECT-PAY-${total}`} 
                      alt="QRIS Code" 
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-[10px] text-indigo-700 font-semibold">
                    Scan via BCA Mobile, Livin, BRImo, GoPay, Dana, ShopeePay (Bebas Biaya Admin)
                  </p>
                </div>
              )}

              {/* Ringkasan Biaya */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal Pesanan</span>
                  <span className="font-bold text-slate-800">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ongkos Kirim Kurir AWD ({distanceKm} KM)</span>
                  <span className="font-bold text-slate-800">Rp {deliveryCalc.deliveryFee.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Layanan Aplikasi</span>
                  <span className="font-bold text-slate-800">Rp {platformFee.toLocaleString('id-ID')}</span>
                </div>
                {voucherDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Diskon Voucher ({voucherCode})</span>
                    <span>- Rp {voucherDiscount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm font-black text-slate-900">
                  <span>Total Pembayaran Langsung</span>
                  <span className="text-rose-600 text-base">
                    Rp {total.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Anti Fake Order Checkbox Commitment */}
              <label className="flex items-start gap-2 p-2.5 bg-amber-50/80 border border-amber-200 rounded-xl cursor-pointer">
                <input 
                  type="checkbox"
                  checked={confirmAntiFakeOrder}
                  onChange={(e) => setConfirmAntiFakeOrder(e.target.checked)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-[11px] text-amber-950 font-bold leading-tight">
                  Saya menyatakan pesanan ini RIIL dan siap membayar langsung <strong>Rp {total.toLocaleString('id-ID')}</strong> ({paymentMethod === 'cod' ? 'Tunai COD' : paymentMethod.toUpperCase()}) saat kurir AWD tiba.
                </span>
              </label>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={onClearCart}
                  className="p-3 border border-slate-200 text-slate-500 rounded-2xl hover:bg-slate-50 transition-colors"
                  aria-label="Kosongkan Keranjang"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={!confirmAntiFakeOrder}
                  className="flex-1 py-3.5 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-black text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>Pesan Sekarang (Bayar Langsung)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
