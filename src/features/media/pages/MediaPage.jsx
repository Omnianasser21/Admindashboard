import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { api } from '@/services/api';
import { Trash2, Eye, Plus } from 'lucide-react';

export function MediaPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    api.getMedia().then((data) => {
      setImages(data);
      setLoading(false);
    });
  }, []);

  const handleUpload = (file) => {
    const newItem = { id: Date.now(), name: file.name, url: file.url };
    setImages((prev) => [newItem, ...prev]);
  };

  const confirmDelete = async () => {
    await api.deleteMedia(deleteTarget.id);
    setImages((prev) => prev.filter((m) => m.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text">Media Library</h2>
          <p className="text-sm text-muted">Upload and manage your website images.</p>
        </div>
        <div className="w-full sm:w-auto">
          <ImageUpload onUpload={handleUpload} />
        </div>
      </div>

      {loading ? (
        <p className="py-12 text-center text-muted">Loading…</p>
      ) : images.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Plus size={26} className="text-primary" />
          </div>
          <p className="mt-4 text-sm font-medium text-text">No images yet</p>
          <p className="mt-1 text-sm text-muted">Upload your first image to get started.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((img) => (
            <Card key={img.id} hover className="group overflow-hidden p-0">
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                <img src={img.url} alt={img.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => setPreview(img)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-text hover:bg-white"
                  >
                    <Eye size={14} /> Preview
                  </button>
                  <button
                    onClick={() => setDeleteTarget(img)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-danger hover:bg-white"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium text-text">{img.name}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={!!preview} onClose={() => setPreview(null)} title={preview?.name || ''} size="lg">
        {preview && (
          <img src={preview.url} alt={preview.name} className="w-full rounded-xl" />
        )}
      </Modal>

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Image">
        <p className="text-sm text-muted">
          Are you sure you want to delete "{deleteTarget?.name}"? This cannot be undone.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
