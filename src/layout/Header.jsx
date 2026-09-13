import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, LogOut, User } from 'lucide-react';
import { useAuth } from '@/features/auth/AuthContext';

const titles = {
  '/dashboard': 'Dashboard',
  '/content': 'Content',
  '/media': 'Media',
  '/settings': 'Website Settings',
};

export function Header({ onMenuClick }) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  let title = titles[pathname];
  if (!title && pathname.startsWith('/content/')) title = 'Edit Content';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-surface/90 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-muted transition-colors hover:bg-gray-100 lg:hidden"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-base font-semibold text-text sm:text-lg">{title}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2.5 rounded-xl border border-border px-2.5 py-1.5 sm:px-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <User size={16} className="text-primary" />
          </div>
          <span className="hidden text-sm font-medium text-text sm:inline">
            {user?.name || 'Admin'}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border px-2.5 py-2 text-sm text-muted transition-all hover:border-danger/30 hover:text-danger sm:px-3"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
