import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '../AuthContext';

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    if (!form.password) errs.password = 'Password is required';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    if (Object.keys(errs).length) return setErrors(errs);

    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch {
      setErrors({ email: 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-text">Create account</h2>
      <p className="mt-1.5 text-sm text-muted">Get started with your Digital Mov dashboard.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <Input
          name="name"
          label="Full Name"
          placeholder="John Doe"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="you@digitalmov.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Input
            name="confirm"
            type="password"
            label="Confirm"
            placeholder="••••••••"
            value={form.confirm}
            onChange={handleChange}
            error={errors.confirm}
          />
        </div>
        <Button type="submit" loading={loading} className="w-full">
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary hover:text-primary-hover">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
