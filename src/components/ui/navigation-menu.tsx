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

export { NavigationMenu, NavigationMenuItem };
