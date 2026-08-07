"use client";

import {
  Smartphone, Globe, QrCode, Send, Monitor, MessageSquare, CreditCard,
  Building2, Receipt, Shield, ShieldAlert, BarChart3, Briefcase, UserPlus,
  Headphones, Landmark, Zap, FileText, Accessibility, Wallet, HandCoins,
  Handshake, Home, Banknote, LineChart, Calculator, PiggyBank, Star,
  Sparkles, Users, BellRing, Calendar, HelpCircle, Scale, FileCheck,
  Lock, TrendingUp, ArrowLeftRight, Coins, GraduationCap, Car, Sprout,
  Package, Phone, MapPin, ShoppingBag, Award, Target, PieChart, Leaf,
  Heart, Info, Compass,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  smartphone: Smartphone,
  globe: Globe,
  qrcode: QrCode,
  send: Send,
  monitor: Monitor,
  messagesquare: MessageSquare,
  creditcard: CreditCard,
  building: Building2,
  building2: Building2,
  receipt: Receipt,
  shield: Shield,
  shieldalert: ShieldAlert,
  barchart3: BarChart3,
  briefcase: Briefcase,
  userplus: UserPlus,
  headphones: Headphones,
  landmark: Landmark,
  bank: Landmark,
  banknote: Banknote,
  zap: Zap,
  filetext: FileText,
  accessibility: Accessibility,
  wallet: Wallet,
  handcoins: HandCoins,
  handshake: Handshake,
  home: Home,
  linechart: LineChart,
  calculator: Calculator,
  piggybank: PiggyBank,
  star: Star,
  sparkles: Sparkles,
  users: Users,
  bellring: BellRing,
  calendar: Calendar,
  helpcircle: HelpCircle,
  scale: Scale,
  filecheck: FileCheck,
  lock: Lock,
  trendingup: TrendingUp,
  arrowleftright: ArrowLeftRight,
  coins: Coins,
  graduationcap: GraduationCap,
  car: Car,
  sprout: Sprout,
  package: Package,
  phone: Phone,
  mappin: MapPin,
  shoppingbag: ShoppingBag,
  award: Award,
  target: Target,
  piechart: PieChart,
  leaf: Leaf,
  heart: Heart,
  info: Info,
  compass: Compass,
};

const normalize = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, "");

export default function DynamicIcon({
  name,
  className = "h-6 w-6",
}: {
  name?: string | null;
  className?: string;
}) {
  if (!name) return <Wallet className={className} />;
  if (/\p{Extended_Pictographic}/u.test(name)) {
    return <span className={className}>{name}</span>;
  }
  const Icon = ICON_MAP[normalize(name)] || Wallet;
  return <Icon className={className} aria-hidden="true" />;
}
