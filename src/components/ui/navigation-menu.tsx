import * as React from 'react';
import { cn } from '@/lib/utils';

const NavigationMenu = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <nav ref={ref} className={cn('flex items-center space-x-1', className)} {...props}>
      {children}
    </nav>
  ),
);
NavigationMenu.displayName = 'NavigationMenu';

const NavigationMenuItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn('', className)} {...props} />,
);
NavigationMenuItem.displayName = 'NavigationMenuItem';

const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50',
      className,
    )}
    {...props}
  />
));
NavigationMenuLink.displayName = 'NavigationMenuLink';

export { NavigationMenu, NavigationMenuItem, NavigationMenuLink };
