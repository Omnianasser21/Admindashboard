import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '../AuthContext';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    if (!form.password) errs.password = 'Password is required';
    if (Object.keys(errs).length) return setErrors(errs);

    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch {
      setErrors({ email: 'Invalid credentials' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-text">Welcome back</h2>
      <p className="mt-1.5 text-sm text-muted">Sign in to your Digital Mov dashboard.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="admin@digitalmov.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />
        <div className="flex items-center gap-2">
          <input
            id="remember"
            type="checkbox"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
          />
          <label htmlFor="remember" className="text-sm text-muted">Remember me</label>
        </div>
        <Button type="submit" loading={loading} className="w-full">
          Sign In
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-primary hover:text-primary-hover">
          Create account
        </Link>
      </p>
    </AuthLayout>
  );
}
