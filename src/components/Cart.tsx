"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useOrderStore } from "@/store/order";
import { useRouter } from "next/navigation";

export function Cart() {
  const router = useRouter();
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const { addOrder } = useOrderStore();

  const handleCheckout = () => {
    addOrder(items, getTotalPrice());
    // カートを空にする
    items.forEach(item => removeItem(item.id));
    setIsOpen(false);
    router.push("/orders");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>買い物かご</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">カートは空です</p>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="w-20 h-20">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      ¥{item.price.toLocaleString()}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>合計</span>
                  <span>¥{getTotalPrice().toLocaleString()}</span>
                </div>
                <Button className="w-full mt-4" onClick={handleCheckout}>
                  注文を確定する
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
} 