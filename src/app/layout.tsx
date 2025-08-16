import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

export const metadata: Metadata = {
  title: "BrandingBitcoin | Professional Digital Solutions",
  description: "Transform your business with professional branding solutions. We help Bitcoin companies establish strong brand identities and market presence.",
  icons: {
    icon: '/Favicon-02.png?v=2',
    shortcut: '/Favicon-02.png?v=2',
    apple: '/apple-fav.png?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/Favicon-02.png?v=2" type="image/png" />
        <link rel="shortcut icon" href="/Favicon-02.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-fav.png?v=2" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-fav.png?v=2" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-fav.png?v=2" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-fav.png?v=2" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-fav.png?v=2" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-fav.png?v=2" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-fav.png?v=2" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-fav.png?v=2" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-fav.png?v=2" />
        <meta name="msapplication-TileColor" content="#FF6B00" />
        <meta name="msapplication-TileImage" content="/apple-fav.png?v=2" />
      </head>
      <body className="antialiased">
        <ThemeProvider defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
