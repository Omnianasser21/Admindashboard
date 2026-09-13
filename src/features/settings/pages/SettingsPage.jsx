import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { api } from '@/services/api';
import { Check } from 'lucide-react';

const empty = {
  websiteName: '',
  phone: '',
  whatsapp: '',
  email: '',
  address: '',
  facebook: '',
  instagram: '',
};

export function SettingsPage() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.getSettings().then((data) => {
      setForm(data);
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await api.updateSettings(form);
    setSaving(false);
    setSaved(true);
  };

  if (loading) return <p className="py-12 text-center text-muted">Loading…</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-text">Website Settings</h2>
        <p className="text-sm text-muted">Update your website contact and social information.</p>
      </div>

      <Card className="space-y-5 p-10">
        <Input
          name="websiteName"
          label="Website Name"
          value={form.websiteName}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input name="phone" label="Phone Number" value={form.phone} onChange={handleChange} />
          <Input name="whatsapp" label="WhatsApp Number" value={form.whatsapp} onChange={handleChange} />
        </div>

        <Input name="email" label="Email Address" type="email" value={form.email} onChange={handleChange} />

        <Input name="address" label="Address" value={form.address} onChange={handleChange} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input name="facebook" label="Facebook URL" value={form.facebook} onChange={handleChange} />
          <Input name="instagram" label="Instagram URL" value={form.instagram} onChange={handleChange} />
        </div>

        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:items-center sm:justify-end">
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-sm text-success">
              <Check size={15} /> Saved successfully
            </span>
          )}
          <Button type="submit" loading={saving}>
            Save Settings
          </Button>
        </div>
      </Card>
    </form>
  );
}
