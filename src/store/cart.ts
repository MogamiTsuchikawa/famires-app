import { Item } from "@/types/item";
import { create } from "zustand";

interface CartItem extends Item {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Item, quantity: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  setIsOpen: (isOpen: boolean) => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (item: Item, quantity: number) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { ...item, quantity }],
      };
    });
  },
  removeItem: (itemId: string) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== itemId),
    }));
  },
  updateQuantity: (itemId: string, quantity: number) => {
    set((state) => ({
      items: state.items.map((i) =>
        i.id === itemId ? { ...i, quantity: Math.max(0, quantity) } : i
      ),
    }));
  },
  setIsOpen: (isOpen: boolean) => {
    set({ isOpen });
  },
  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
})); 