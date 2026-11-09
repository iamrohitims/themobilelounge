import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

interface CompareStore {
  items: Product[];
  addItem: (product: Product) => { success: boolean; message?: string };
  removeItem: (productId: string) => void;
  clearAll: () => void;
  isInCompare: (productId: string) => boolean;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const { items } = get();
        if (items.some((i) => i.id === product.id)) {
          return { success: false, message: "Phone is already in compare list" };
        }
        if (items.length >= 3) {
          return {
            success: false,
            message: "You can compare up to 3 phones side-by-side. Remove one to add another.",
          };
        }
        set({ items: [...items, product] });
        return { success: true };
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.id !== productId) });
      },
      clearAll: () => {
        set({ items: [] });
      },
      isInCompare: (productId) => {
        return get().items.some((i) => i.id === productId);
      },
    }),
    {
      name: "the-mobile-lounge-compare",
    }
  )
);
