import { Package, Github, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, type NavItem } from '@/define/navigationMenu';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* 로고 영역 */}
        <div className="flex items-start gap-2">
          <Package className="mt-1 h-6 w-6 text-primary" />
          <div>
            <h1 className="text-xl font-bold">OnRoute</h1>
            <p className="text-xs text-muted-foreground hidden sm:inline">실시간 배송 트래커</p>
          </div>
        </div>

        {/* 데스크톱 네비게이션 */}
        <NavigationMenu className="hidden md:flex">
          {NAV_ITEMS.map((item: NavItem) => (
            <NavigationMenuItem className="list-none" key={item.name}>
              <NavigationMenuLink href={item.href}>{item.name}</NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenu>

        {/* 우측 액션 버튼들 */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>

          {/* 모바일 햄버거 메뉴 */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container px-4 py-4 space-y-2">
            {NAV_ITEMS.map((item: NavItem) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  'block px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground',
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground',
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
