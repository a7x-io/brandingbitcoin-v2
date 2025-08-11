import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BrandingBitcoin | Professional Digital Solutions",
  description: "Transform your business with professional branding solutions. We help Bitcoin companies establish strong brand identities and market presence.",
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
