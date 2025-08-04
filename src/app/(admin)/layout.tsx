import React from 'react';
import { AuthProvider } from '@/context/auth-context';
import AdminAuthProvider from '@/components/admin-auth-provider';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        {children}
      </AdminAuthProvider>
    </AuthProvider>
  );
}
