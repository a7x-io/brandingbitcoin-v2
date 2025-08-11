import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BrandingBitcoin - Professional Bitcoin Branding Solutions",
  description: "Transform your Bitcoin business with professional branding solutions. We help crypto companies establish strong brand identities and market presence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Favicon-02.png" type="image/png" />
      </head>
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
