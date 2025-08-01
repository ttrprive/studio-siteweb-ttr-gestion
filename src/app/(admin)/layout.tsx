import React from 'react';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      {/* Ici, on pourrait ajouter une barre de navigation spécifique à l'admin */}
      <main className="flex-grow">{children}</main>
    </div>
  );
}
