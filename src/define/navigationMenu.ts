export interface NavItem {
  name: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'History', href: '/history' },
];
