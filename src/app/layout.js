import './globals.css';

export const metadata = {
  title: 'Pratyush Kumar Pandey — Software Developer & AI Builder',
  description: 'Portfolio of Pratyush Kumar Pandey — Full-Stack Developer, Spring Boot Specialist, and AI Systems Builder based in Vijayawada, India.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    viewportFit: 'cover',
  },
  themeColor: '#050507',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
