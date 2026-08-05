import {
  CartStoreActionsType,
  CartStoreStateType,
} from "@/modules/cart/types/cart.types";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const isSameProduct = (
  current: CartStoreStateType["cart"][number],
  target: CartStoreStateType["cart"][number],
) =>
  current.id === target.id &&
  current.selectedSize === target.selectedSize &&
  current.selectedColor === target.selectedColor;

const useCartStore = create<CartStoreStateType & CartStoreActionsType>()(
  persist(
    (set) => ({
      cart: [],
      hasHydrated: false,

      addToCart: (product) =>
        set((state) => {
          const existingIndex = state.cart.findIndex((item) =>
            isSameProduct(item, product),
          );

          if (existingIndex !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingIndex].quantity += product.quantity || 1;

            return { cart: updatedCart };
          }

          return {
            cart: [
              ...state.cart,
              {
                ...product,
                quantity: product.quantity || 1,
              },
            ],
          };
        }),

      increaseQuantity: (product) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            isSameProduct(item, product)
              ? {
                ...item,
                quantity: item.quantity + 1,
              }
              : item,
          ),
        })),

      decreaseQuantity: (product) =>
        set((state) => ({
          cart: state.cart.flatMap((item) => {
            if (!isSameProduct(item, product)) {
              return item;
            }

            if (item.quantity === 1) {
              return [];
            }

            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }),
        })),

      removeFromCart: (product) =>
        set((state) => ({
          cart: state.cart.filter((item) => !isSameProduct(item, product)),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    },
  ),
);

export default useCartStore;
