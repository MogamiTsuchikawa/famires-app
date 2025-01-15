"use client";

import { Cart } from "@/components/Cart";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  const navigation = [
    { name: "商品一覧", href: "/" },
    { name: "注文履歴", href: "/orders" },
  ];

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Famires App
            </Link>
            <nav className="ml-10 space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <Cart />
        </div>
      </div>
    </header>
  );
} 