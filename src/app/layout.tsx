import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { AdminMenu } from "@/components/AdminMenu";
import { ChatInterface } from "@/components/ChatInterface";
import { Cart } from "@/components/Cart";

const inter = Inter({ subsets: ["latin"] });
export const runtime = "edge";
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
          <main className="flex-1">{children}</main>
          <div className="fixed bottom-4 left-4 z-50">
            <ChatInterface />
          </div>
        </div>
      </body>
    </html>
  );
}
