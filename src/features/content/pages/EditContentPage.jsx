import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { api } from '@/services/api';
import { ArrowLeft } from 'lucide-react';

const empty = { title: '', subtitle: '', body: '', buttonText: '', buttonUrl: '' };

export function EditContentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [section, setSection] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.getContentById(id).then((data) => {
      if (!data) { navigate('/content'); return; }
      setSection(data.section);
      setForm({
        title: data.title,
        subtitle: data.subtitle,
        body: data.body,
        buttonText: data.buttonText,
        buttonUrl: data.buttonUrl,
      });
      setLoading(false);
    });
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    await api.updateContent(id, form);
    setSaving(false);
    navigate('/content');
  };

  if (loading) return <p className="py-12 text-center text-muted">Loading…</p>;

  return (
    <form onSubmit={handleSave} className="max-w-2xl">
      <button
        type="button"
        onClick={() => navigate('/content')}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-primary"
      >
        <ArrowLeft size={16} /> Back to Content
      </button>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-text">{section}</h2>
        <p className="text-sm text-muted">Edit the content for this section.</p>
      </div>

      <Card className="space-y-5">
        <Input
          name="title"
          label="Title"
          value={form.title}
          onChange={handleChange}
          error={errors.title}
        />
        <Input
          name="subtitle"
          label="Subtitle"
          value={form.subtitle}
          onChange={handleChange}
        />
        <Textarea
          name="body"
          label="Description"
          value={form.body}
          onChange={handleChange}
          rows={4}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            name="buttonText"
            label="Button Text"
            value={form.buttonText}
            onChange={handleChange}
          />
          <Input
            name="buttonUrl"
            label="Button URL"
            value={form.buttonUrl}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" type="button" onClick={() => navigate('/content')}>
            Cancel
          </Button>
          <Button type="submit" loading={saving}>
            Save Changes
          </Button>
        </div>
      </Card>
    </form>
  );
}
