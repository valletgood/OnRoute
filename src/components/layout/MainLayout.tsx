import { Header } from './Header';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
}
