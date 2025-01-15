import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { AdminMenu } from "@/components/AdminMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Famires App",
  description: "Family Restaurant App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <AdminMenu />
        </div>
      </body>
    </html>
  );
}
