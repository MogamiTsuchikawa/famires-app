"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { useCartStore } from "@/store/cart";
import { useOrderStore } from "@/store/order";

export function AdminMenu() {
  const { isOpen, setIsOpen } = useAdminStore();
  const cartStore = useCartStore();
  const orderStore = useOrderStore();

  const handleReset = () => {
    // カートを空にする
    cartStore.items.forEach((item) => cartStore.removeItem(item.id));
    // 注文履歴を空にする
    orderStore.resetOrders?.();
    // メニューを閉じる
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="">
          <Settings className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>管理者メニュー</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          <div className="p-4 border rounded-lg bg-red-50">
            <h3 className="font-medium text-red-900 mb-2">データリセット</h3>
            <p className="text-sm text-red-700 mb-4">
              カートと注文履歴のデータをすべて削除します。この操作は取り消せません。
            </p>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleReset}
            >
              すべてのデータを初期化
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
