import InitialLoader from '@/components/initial-loader';
import { Provider as TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { cn } from '@/utils/cn';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { GeistMono } from 'geist/font/mono';

import './globals.css';
import LenisProvider from '@/providers/LenisProvider';

const inter = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Carl Preston Davis — Senior Software Engineer',
  description:
    'Senior Software Engineer, Front-End Focus. Scalable web applications, performance optimization, and UX.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={cn(
        inter.variable,
        GeistMono.variable,
        'antialiased',
        'hide-scroll',
      )}
    >
      <body className='overflow-auto bg-bg-white-0 text-text-strong-950 lg:bg-bg-weak-50'>
        <LenisProvider>
          <InitialLoader />
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <main className='flex min-h-screen flex-1 flex-col'>
                {children}
              </main>
            </TooltipProvider>
          </ThemeProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
