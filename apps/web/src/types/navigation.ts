export interface CMSNavItem {
  id: number;
  label: string;
  labelNp?: string;
  href?: string | null;
  icon?: string;
  badgeText?: string;
  badgeColor?: "primary" | "secondary" | "success" | "accent";
  description?: string | null;
  descriptionNp?: string | null;
  imageUrl?: string | null;
  isOpenInNewTab?: boolean;
  groupTitle?: string | null;
  isPromoCard?: boolean;
  children?: CMSNavItem[];
}
