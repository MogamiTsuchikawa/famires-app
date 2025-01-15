"use client";

import { useOrderStore } from "@/store/order";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

export default function OrdersPage() {
  const { orders } = useOrderStore();
  const totalAmount = orders.reduce((total, order) => total + order.totalPrice, 0);

  return (
    <div className="container mx-auto py-8 pb-32 relative">
      <h1 className="text-2xl font-bold mb-6">注文履歴</h1>
      <div className="space-y-6">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500">注文履歴がありません</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-6 space-y-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  注文日時: {format(new Date(order.orderedAt), "yyyy年MM月dd日 HH:mm", { locale: ja })}
                </div>
                <div className="font-bold">
                  合計: ¥{order.totalPrice.toLocaleString()}
                </div>
              </div>
              <div className="grid gap-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-20 h-20">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        ¥{item.price.toLocaleString()} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      {orders.length > 0 && (
        <div className="fixed bottom-8 right-8 bg-white rounded-lg shadow-lg p-4 border">
          <div className="text-sm text-gray-500 mb-1">累計注文金額</div>
          <div className="text-2xl font-bold">
            ¥{totalAmount.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
} 