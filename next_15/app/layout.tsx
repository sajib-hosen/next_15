import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-800 text-white`}
      >
        <div className=" flex items-center justify-center py-4">
          <nav className=" space-x-2">
            <Link href={`/pages/csr`}>CSR</Link>
            <Link href={`/pages/isr`}>ISR</Link>
            <Link href={`/pages/p-csr`}>P-CSR</Link>
            <Link href={`/pages/ppr`}>PPR</Link>
            <Link href={`/pages/ssg`}>SSG</Link>
            <Link href={`/pages/ssr`}>SSR</Link>
          </nav>
        </div>
        {children}
      </body>
    </html>
  );
}
