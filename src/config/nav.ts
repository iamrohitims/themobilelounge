export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}

export const mainNav: NavItem[] = [
  { title: "Phones", href: "/phones" },
  { title: "Brands", href: "/brands" },
  { title: "Accessories", href: "/accessories" },
  { title: "0% EMI", href: "/emi", badge: "0% Fin" },
  { title: "Offers", href: "/offers", badge: "Live" },
  { title: "Exchange", href: "/exchange" },
  { title: "Services", href: "/services" },
  { title: "Store Info", href: "/contact" },
];

export const footerNav = {
  shop: [
    { title: "All Smartphones", href: "/phones" },
    { title: "All Brands Directory", href: "/brands" },
    { title: "Apple iPhones", href: "/phones/brand/Apple" },
    { title: "Samsung Galaxy", href: "/phones/brand/Samsung" },
    { title: "OnePlus 5G", href: "/phones/brand/OnePlus" },
    { title: "Vivo & Oppo", href: "/phones/brand/Vivo" },
    { title: "Phones Under ₹15,000", href: "/phones/under/10000-to-15000" },
    { title: "Compare Phones", href: "/compare" },
    { title: "Mobile Accessories", href: "/accessories" },
  ],
  services: [
    { title: "0% EMI & Finance", href: "/emi" },
    { title: "Old Phone Exchange", href: "/exchange" },
    { title: "Screen Guard & Case Fitting", href: "/services" },
    { title: "Free WhatsApp Transfer", href: "/services" },
    { title: "Official Brand Warranty", href: "/services" },
    { title: "Festive Offers & Gifts", href: "/offers" },
  ],
  company: [
    { title: "About The Mobile Lounge", href: "/about" },
    { title: "Visit Store & Map", href: "/contact" },
    { title: "Customer Reviews", href: "/reviews" },
    { title: "Frequently Asked Questions", href: "/faq" },
    { title: "Buying Guides & Blog", href: "/blog" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms & Conditions", href: "/terms" },
  ],
};

export const mobileBottomBar = [
  { title: "Home", href: "/", icon: "Home" },
  { title: "Phones", href: "/phones", icon: "Smartphone" },
  { title: "EMI Calc", href: "/emi", icon: "Calculator" },
  { title: "Compare", href: "/compare", icon: "ArrowLeftRight" },
  { title: "WhatsApp", href: "https://wa.me/917017289590", icon: "MessageSquare", isAction: true },
];
