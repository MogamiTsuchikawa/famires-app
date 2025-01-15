import { Item } from "@/types/item";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OrderItem extends Item {
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  orderedAt: string;
}

interface OrderStore {
  orders: Order[];
  addOrder: (items: OrderItem[], totalPrice: number) => void;
  resetOrders: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (items: OrderItem[], totalPrice: number) => {
        const newOrder: Order = {
          id: crypto.randomUUID(),
          items,
          totalPrice,
          orderedAt: new Date().toISOString(),
        };
        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));
      },
      resetOrders: () => {
        set({ orders: [] });
      },
    }),
    {
      name: "order-storage",
    }
  )
); 