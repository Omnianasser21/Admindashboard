import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/layout/DashboardLayout';
import { ProtectedRoute } from '@/features/auth/ProtectedRoute';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { ContentListPage } from '@/features/content/pages/ContentListPage';
import { EditContentPage } from '@/features/content/pages/EditContentPage';
import { MediaPage } from '@/features/media/pages/MediaPage';
import { SettingsPage } from '@/features/settings/pages/SettingsPage';

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'content', element: <ContentListPage /> },
      { path: 'content/:id', element: <EditContentPage /> },
      { path: 'media', element: <MediaPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/dashboard" replace /> },
]);

export { router };

