import { useRef, useState } from 'react';
import { Upload, Trash2, ImageIcon } from 'lucide-react';

export function ImageUpload({ image, onUpload, onRemove, label }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(image?.url || null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onUpload?.({ name: file.name, url });
  };

  const handleRemove = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
    onRemove?.();
  };

  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-text">{label}</label>
      )}
      <div className="relative overflow-hidden rounded-xl border border-border bg-surface">
        {preview ? (
          <div className="group relative aspect-video w-full">
            <img src={preview} alt="preview" className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-text hover:bg-white"
              >
                <Upload size={14} /> Change
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-danger hover:bg-white"
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-video w-full flex-col items-center justify-center gap-2 text-muted transition-colors hover:bg-gray-50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <ImageIcon size={22} className="text-primary" />
            </div>
            <span className="text-sm">Click to upload</span>
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
      </div>
      {image?.name && preview && (
        <p className="mt-1.5 truncate text-xs text-muted">{image.name}</p>
      )}
    </div>
  );
}
