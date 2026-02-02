import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "./_components/client-providers";

export const metadata: Metadata = {
  title: "TAPTO",
  description: "Swipe. Shop. Smile.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-slate-900">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
