import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

// TypeScript declarations for Twitter pixel
declare global {
  interface Window {
    twq?: (command: string, ...args: unknown[]) => void;
    twitterPixelInitialized?: boolean;
    twitterPixelScriptExecuted?: boolean;
  }
}

export const metadata: Metadata = {
  title: "BrandingBitcoin | Professional Digital Solutions",
  description: "Transform your business with professional branding solutions. We help Bitcoin companies establish strong brand identities and market presence.",
  icons: {
    icon: '/Favicon-02.png',
    shortcut: '/Favicon-02.png',
    apple: '/apple-fav.png',
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
        {/* Content Security Policy for Twitter Pixel */}
        <meta httpEquiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.ads-twitter.com https://ads-twitter.com https://ads-api.twitter.com https://analytics.twitter.com https://t.co https://*.twitter.com; connect-src 'self' https://static.ads-twitter.com https://ads-twitter.com https://ads-api.twitter.com https://analytics.twitter.com https://t.co https://*.twitter.com; img-src 'self' data: https: https://static.ads-twitter.com https://ads-twitter.com https://ads-api.twitter.com https://analytics.twitter.com https://t.co https://*.twitter.com;" />
        
        <link rel="icon" href="/Favicon-02.png" type="image/png" />
        <link rel="shortcut icon" href="/Favicon-02.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-fav.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-fav.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-fav.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-fav.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-fav.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-fav.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-fav.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-fav.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-fav.png" />
        <meta name="msapplication-TileColor" content="#FF6B00" />
        <meta name="msapplication-TileImage" content="/apple-fav.png" />
        
      </head>
      <body className="antialiased">
        <ThemeProvider defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
