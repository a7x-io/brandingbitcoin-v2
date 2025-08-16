import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Image from "next/image";

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
        
        {/* Twitter Pixel Base Code - Fixed to prevent duplicate loading */}
        <script
          id="twitter-pixel-script"
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent duplicate Twitter pixel initialization
              if (typeof window !== 'undefined') {
                // Check if this script has already been executed
                if (window.twitterPixelScriptExecuted) {
                  console.log('Twitter Pixel: Script already executed, skipping...');
                  return;
                }
                
                // Mark this script as executed
                window.twitterPixelScriptExecuted = true;
                
                if (!window.twq) {
                  console.log('Twitter Pixel: Initializing...');
                  
                  // Create a global flag to prevent multiple initializations
                  window.twitterPixelInitialized = false;
                  
                  !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
                  },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
                  a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
                  
                  // Wait for the script to load before configuring
                  const checkTwitterPixel = setInterval(function() {
                    if (window.twq && !window.twitterPixelInitialized) {
                      clearInterval(checkTwitterPixel);
                      window.twitterPixelInitialized = true;
                      
                      console.log('Twitter Pixel: Configuring...');
                      window.twq('config','qcg5j');
                      console.log('Twitter Pixel: Tracking page view...');
                      window.twq('track','PageView');
                      console.log('Twitter Pixel: Setup complete');
                    }
                  }, 100);
                  
                  // Fallback timeout to prevent infinite checking
                  setTimeout(function() {
                    if (checkTwitterPixel) {
                      clearInterval(checkTwitterPixel);
                      console.warn('Twitter Pixel: Failed to initialize within timeout');
                    }
                  }, 10000);
                  
                } else if (!window.twitterPixelInitialized) {
                  console.log('Twitter Pixel: Already initialized, tracking page view...');
                  window.twitterPixelInitialized = true;
                  window.twq('track','PageView');
                }
              }
            `
          }}
        />
        <noscript>
          <Image height={1} width={1} style={{display: 'none'}} src="https://t.co/i/adsct?bci=3&eci=2&event_id=tw-qcg5j-qcg7r&events=%5B%5B%5D%5D&integration=ads&p_id=Twitter&p_user_id=0&pl_id=YOUR_PLACEMENT_ID&tw_document_href=YOUR_WEBSITE_URL&tw_iframe_status=0&tw_order_quantity=0&tw_sale_amount=0&tw_tax=0&tw_transaction_id=0&user_id=0&xdp=0" alt="" />
        </noscript>
      </head>
      <body className="antialiased">
        <ThemeProvider defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
