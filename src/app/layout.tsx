import './globals.css';
import { Inter } from 'next/font/google';
import ClientSessionProvider from '@/components/ClientSessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Statify',
  description: 'Uncover insights about your listening habits with our Statify app.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientSessionProvider>{children}</ClientSessionProvider>
      </body>
    </html>
  );
}
