import './globals.css';

export const metadata = {
  title: 'Pratyush Kumar Pandey — AI Engineer & Full-Stack Developer',
  description: 'Portfolio of Pratyush Kumar Pandey — Computer Science Engineer, AI Systems Builder, and Full-Stack Developer specializing in LLMs, RAG, Python, and Next.js based in Vijayawada, India.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    viewportFit: 'cover',
  },
  themeColor: '#050507',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
