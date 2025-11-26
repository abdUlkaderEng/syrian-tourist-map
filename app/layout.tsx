import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { House } from "lucide-react";
import LanguageToggle from "./Components/NavBarComponents/LanguageToggle";
import { Roboto, Tajawal } from "next/font/google";
import AdminLink from "./Components/NavBarComponents/AdminLink";
import AuthStatus from "./Components/NavBarComponents/AuthStatus";
import TokenProvider from "./TokenProvider";
import HomeLink from "./Components/NavBarComponents/HomeLink";

const primaryFont = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

const arabicFont = Tajawal({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "دليل السياحة في سوريا",
  description: "عرض الأماكن السياحية في سوريا مع معلومات مفصلة عنها.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${primaryFont.variable} ${arabicFont.variable} antialiased`}>
        <nav className="navbar fixed top-0 left-0 right-0 bg-transparent backdrop-blur-sm z-50 hover:backdrop-blur-lg transition-all duration-400 flex justify-between">
          <HomeLink />
          <div className="w-[12%] flex justify-around items-center">
            <LanguageToggle />
            <AuthStatus />
            <AdminLink />
          </div>
        </nav>
        <TokenProvider />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
