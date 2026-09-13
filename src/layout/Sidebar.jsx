import { Link, NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Image, Settings, X, Cpu } from 'lucide-react';
import logo from "../assets/image/logo tech.png";

const menuItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/content', label: 'Content', icon: FileText },
  { to: '/media', label: 'Media', icon: Image },
  { to: '/settings', label: 'Website Settings', icon: Settings },
];

export function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#0B1220] transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 ">
              <Link to="/dashboard">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-9 w-9 object-cover"
                />
              </Link>
            </div>
            <div>
              <span className="block text-sm font-semibold text-white">
                Digital Mov
              </span>
              <span className="block text-[10px] text-white/40">
                Admin Panel
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-white/60 hover:bg-white/10 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-white/30">
            Menu
          </p>
          {menuItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={18}
                    className={
                      isActive
                        ? "text-white"
                        : "text-white/50 group-hover:text-white"
                    }
                  />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-4">
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-xs text-white/50">Need help?</p>
            <p className="mt-0.5 text-sm text-white/80">
              support@digitalmov.com
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
