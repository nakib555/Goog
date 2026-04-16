import { Link, Outlet, useLocation } from 'react-router-dom';
import { Smartphone, Settings, DownloadCloud } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-foreground">
      <header className="bg-background border-b border-line sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-accent p-2 rounded-lg text-background">
                <DownloadCloud size={24} />
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">UpdateServer</span>
            </div>
            <nav className="flex gap-1">
              <Link
                to="/"
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                  location.pathname === '/' 
                    ? "bg-surface text-accent" 
                    : "text-dim hover:bg-surface hover:text-foreground"
                )}
              >
                <Smartphone size={18} />
                <span className="hidden sm:inline">App Info</span>
              </Link>
              <Link
                to="/admin"
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                  location.pathname === '/admin' 
                    ? "bg-surface text-accent" 
                    : "text-dim hover:bg-surface hover:text-foreground"
                )}
              >
                <Settings size={18} />
                <span className="hidden sm:inline">Admin Panel</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-background border-t border-line py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-dim">
          <p>Static Android App Update Server &bull; No Backend Required</p>
        </div>
      </footer>
    </div>
  );
}
