import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { api } from '@/services/api';
import { Pencil, FileText, ArrowRight } from 'lucide-react';

export function ContentListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getContent().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-text">Website Content</h2>
        <p className="text-sm text-muted">Edit the content for each section of your website.</p>
      </div>

      {loading ? (
        <p className="py-12 text-center text-muted">Loading…</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {items.map((item) => (
            <Card key={item.id} hover className="p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <FileText size={20} className="text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-text">{item.section}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted">{item.description}</p>
                  <p className="mt-3 text-xs text-muted">Updated: {item.updatedAt}</p>
                </div>
              </div>
              <Link to={`/content/${item.id}`} className="mt-4 block">
                <Button variant="secondary" size="sm" className="w-full">
                  <Pencil size={14} /> Edit Section <ArrowRight size={14} />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
