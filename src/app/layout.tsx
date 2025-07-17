import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/context/auth-context';
import { LoaderProvider } from '@/context/loader-context';
import GlobalLoader from '@/components/global-loader';

export const metadata: Metadata = {
  title: 'TTR GESTION',
  description: 'La nouvelle ère de la gestion.',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <AuthProvider>
          <LoaderProvider>
            <GlobalLoader />
            {children}
            <Toaster />
          </LoaderProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
