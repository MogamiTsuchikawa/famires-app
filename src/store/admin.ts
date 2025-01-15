import { create } from "zustand";

interface AdminStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
})); 