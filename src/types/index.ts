export type UserRole = 'customer' | 'merchant' | 'courier' | 'admin';

export interface CredibilityScore {
  plus: number;
  minus: number;
  totalScore: number;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  role: UserRole;
  status: 'active' | 'suspended' | 'pending';
  points: number;
  referralCode: string;
  referredBy?: string;
  address: string;
  district: string;
  createdAt: string;
  ktpNumber?: string;
  ktpPhoto?: string;
  profilePhoto?: string;
  pinPointLocation?: {
    lat: number;
    lng: number;
    addressNote?: string;
  };
  simPhoto?: string;
  vehicleType?: string;
  vehiclePlate?: string;
  credibilityScore: CredibilityScore;
}

export type ServiceType = 
  | 'ride'       // Antar Jemput
  | 'food'       // Kuliner
  | 'delivery'   // Paket Cepat
  | 'grocery'    // Sembako
  | 'pharmacy'   // Apotek
  | 'donation'   // Donasi (AWD Peduli - butuh approval admin)
  | 'emergency'  // Tolong (Bantuan Segera SOS)
  | 'jastip'     // Jasa Titip
  | 'umkm';      // UMKM Lokal

export interface Merchant {
  id: string;
  name: string;
  category: string;
  serviceType: 'food' | 'grocery' | 'pharmacy' | 'umkm';
  rating: number;
  totalOrders: number;
  address: string;
  district: string;
  distanceKm: number;
  isOpen: boolean;
  isFeatured: boolean;
  isPremiumMember: boolean;
  banner: string;
  logo: string;
  openHours: string;
  minOrder: number;
  phone: string;
  activePromo?: string;
  credibilityScore: CredibilityScore;
}

export interface Product {
  id: string;
  merchantId: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  inStock: boolean;
  isHardMedicine?: boolean; // Requires prescription
  promoBadge?: string;
  storeName?: string;
  storeType?: 'warung_makan' | 'jajanan' | 'warung_sembako' | 'minuman' | 'apotek' | 'umkm';
  salesCount?: number;
  rating?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export type OrderStatus =
  | 'pending'
  | 'merchant_accepted'
  | 'courier_assigned'
  | 'picked_up'
  | 'on_delivery'
  | 'delivered'
  | 'completed'
  | 'cancelled';

// Pure direct payments: COD, QRIS langsung, Transfer Manual (No stored app balance)
export type PaymentMethod = 'cod' | 'qris' | 'bank_transfer';

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  merchantId?: string;
  merchantName?: string;
  courierId?: string;
  courierName?: string;
  courierPhone?: string;
  courierVehicle?: string;
  courierPhoto?: string;
  serviceType: ServiceType;
  items: CartItem[];
  pickupAddress: string;
  destinationAddress: string;
  distanceKm: number;
  weightKg?: number;
  deliveryNotes?: string;
  prescriptionPhoto?: string;
  isPrescriptionVerified?: boolean;
  itemDescription?: string;
  itemPhoto?: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid';
  subtotal: number;
  deliveryFee: number;
  platformFee: number;
  discount: number;
  total: number;
  courierEarned: number;
  merchantEarned: number;
  platformCommission: number;
  createdAt: string;
  estimatedMinutes: number;
  progressPercent: number;
  customerCredibility?: CredibilityScore;
  courierCredibility?: CredibilityScore;
  merchantCredibility?: CredibilityScore;
  isAntiFakeOrderConfirmed?: boolean;
}

export interface ChatMessage {
  id: string;
  orderId: string;
  senderRole: UserRole | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export type CourierLevel = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface CourierProfile {
  id: string;
  name: string;
  phone: string;
  photo: string;
  vehicle: string;
  licensePlate: string;
  rating: number;
  level: CourierLevel;
  isOnline: boolean;
  isPremiumMember: boolean;
  earningsToday: number;
  completedOrdersToday: number;
  credibilityScore: CredibilityScore;
  currentDispatchOrder?: Order | null;
  dispatchTimeLeft?: number;
}

export interface BannerAd {
  id: string;
  merchantId: string;
  merchantName: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  badge: string;
  actionUrl: string;
  type: 'homepage' | 'top_search' | 'recommendation';
  pricePaid: number;
  activeUntil: string;
}

export interface FraudAlert {
  id: string;
  type: 'fake_order' | 'multi_account' | 'voucher_abuse' | 'suspicious_distance';
  severity: 'low' | 'medium' | 'high';
  description: string;
  targetUser: string;
  timestamp: string;
  status: 'flagged' | 'reviewed' | 'banned';
}

export interface AdminStats {
  gmv: number;
  platformRevenue: number;
  netProfit: number;
  totalUsers: number;
  totalMerchants: number;
  totalCouriers: number;
  totalOrders: number;
  activeOrdersCount: number;
  pendingDonationsCount?: number;
  activeEmergenciesCount?: number;
}

// Donasi Warga (AWD Peduli) - Persetujuan mutlak admin
export interface DonationCampaign {
  id: string;
  title: string;
  category: 'kemanusiaan' | 'kesehatan' | 'yatim' | 'bencana' | 'sosial';
  targetAmount: number;
  collectedAmount: number;
  donorCount: number;
  organizerName: string;
  organizerPhone: string;
  description: string;
  image: string;
  status: 'pending_approval' | 'approved' | 'rejected' | 'completed';
  adminApprovalNote?: string;
  createdAt: string;
  approvedAt?: string;
}

// Tolong (Bantuan Segera SOS)
export interface EmergencyRequest {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  category: 'ban_bocor' | 'mogok' | 'medis_darurat' | 'kunci' | 'bensin_habis' | 'lainnya';
  title: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  status: 'searching' | 'responded' | 'resolved' | 'cancelled';
  responderName?: string;
  responderPhone?: string;
  createdAt: string;
}
