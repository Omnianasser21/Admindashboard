import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { api } from '@/services/api';
import { useAuth } from '@/features/auth/AuthContext';
import { FileText, Image as ImageIcon, Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ sections: 0, images: 0, lastUpdated: '—' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getContent(), api.getMedia()]).then(([c, m]) => {
      const latest = c.reduce((acc, cur) =>
        cur.updatedAt > acc ? cur.updatedAt : acc, c[0]?.updatedAt || '—'
      );
      setStats({ sections: c.length, images: m.length, lastUpdated: latest });
      setLoading(false);
    });
  }, []);

  const cards = [
    { label: 'Content Sections', value: stats.sections, icon: FileText, link: '/content', color: 'bg-primary/10 text-primary' },
    { label: 'Uploaded Images', value: stats.images, icon: ImageIcon, link: '/media', color: 'bg-cyan-500/10 text-cyan-600' },
    { label: 'Last Updated', value: stats.lastUpdated, icon: Clock, link: '/content', color: 'bg-success/10 text-success' },
  ];

  return (
    <div>
      <div className="mb-8 overflow-hidden rounded-2xl bg-[#0B1220] p-6 sm:p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Welcome back, {user?.name || 'Admin'}
          </h2>
          <p className="mt-1.5 text-sm text-white/60">
            Manage your website content from one place.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/content" className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover">
              Manage Content <ArrowUpRight size={15} />
            </Link>
            <Link to="/media" className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10">
              Upload Media
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, link, color }) => (
          <Link key={label} to={link}>
            <Card hover className="p-5">
              <div className="flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
                  <Icon size={22} />
                </div>
                <ArrowUpRight size={18} className="text-muted/40" />
              </div>
              <p className="mt-4 text-sm text-muted">{label}</p>
              <p className="mt-0.5 text-2xl font-bold text-text">
                {loading ? '…' : value}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
