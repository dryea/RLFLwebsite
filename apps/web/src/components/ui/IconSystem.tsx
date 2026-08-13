"use client";

import React from "react";
import {
  Smartphone,
  Globe,
  QrCode,
  Send,
  Monitor,
  MessageSquare,
  CreditCard,
  Building2,
  Receipt,
  Shield,
  ShieldAlert,
  BarChart3,
  Briefcase,
  UserPlus,
  Headphones,
  Landmark,
  Zap,
  FileText,
  Accessibility,
  Wallet,
  HandCoins,
  Handshake,
  Home,
  Banknote,
  LineChart,
  Calculator,
  PiggyBank,
  Star,
  Sparkles,
  Users,
  BellRing,
  Calendar,
  HelpCircle,
  Scale,
  FileCheck,
  Lock,
  TrendingUp,
  ArrowLeftRight,
  Coins,
  GraduationCap,
  Car,
  Sprout,
  Package,
  Phone,
  MapPin,
  ShoppingBag,
  Award,
  Target,
  PieChart,
  Leaf,
  Heart,
  Info,
  Compass,
  LucideProps,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Nepalese banking & financial context aliases
const NEPAL_ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  // Products & Remittance
  remittance: Send,
  foreign_exchange: ArrowLeftRight,
  forex: ArrowLeftRight,
  sme_loan: Briefcase,
  agri_loan: Sprout,
  agriculture: Leaf,
  home_loan: Home,
  auto_loan: Car,
  fixed_deposit: PiggyBank,
  savings: Wallet,
  gold_silver: Coins,
  education_loan: GraduationCap,

  // Banking & Compliance
  nrb_compliance: Landmark,
  central_bank: Landmark,
  audit: FileCheck,
  governance: Scale,
  security: Shield,
  digital_banking: Smartphone,
  online_portal: Monitor,
  qr_payment: QrCode,
  corporate_pay: Building2,
  connect_ips: Zap,

  // General mappings
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

export interface IconSystemProps extends LucideProps {
  name: string;
  variant?: "primary" | "secondary" | "accent" | "blue" | "gold" | "green" | "muted" | "white" | "none";
  size?: number;
  className?: string;
}

const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * RFIL Context-Aware Icon System wrapping Lucide-react icons with Nepalese financial domain aliases.
 */
export default function IconSystem({
  name,
  variant = "none",
  size = 24,
  className,
  ...props
}: IconSystemProps) {
  const normalizedKey = normalize(name || "");
  const IconComponent = NEPAL_ICON_MAP[normalizedKey] || Wallet;

  const variantStyles = {
    none: "",
    primary: "text-primary-500",
    secondary: "text-secondary-500",
    accent: "text-accent-500",
    blue: "text-[#0F4C81]",
    gold: "text-[#D4AF37]",
    green: "text-[#10B981]",
    muted: "text-slate-400",
    white: "text-white",
  };

  return (
    <IconComponent
      size={size}
      className={cn("shrink-0 transition-colors", variantStyles[variant], className)}
      aria-hidden="true"
      {...props}
    />
  );
}
