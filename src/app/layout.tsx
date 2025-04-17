import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ClientGuard from "./components/ClientGuard";

const inter = Inter({ subsets: ["latin", "latin-ext"], display: "swap" });

export const metadata: Metadata = {
  title: "OMAS",
  description: "Ilmapistooli- ja kivääriammunnan tulospalvelu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi">
        <body className={inter.className}>
            <Header />
                <ClientGuard>
                    {children}
                </ClientGuard>
            <Footer />
        </body>
    </html>
  );
}