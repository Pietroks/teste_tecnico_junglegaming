import React, { createContext, useContext, useState, useEffect } from "react";
import { NFT_ITEMS } from "@/constants/marketplace";

export interface CartItem {
  id: string;
  name: string;
  number: string;
  price: string;
  priceNumber: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const INITIAL_CART: CartItem[] = [
  {
    id: NFT_ITEMS[0].id,
    name: NFT_ITEMS[0].name,
    number: NFT_ITEMS[0].number,
    price: NFT_ITEMS[0].price,
    priceNumber: NFT_ITEMS[0].priceNumber,
    image: NFT_ITEMS[0].image,
    quantity: 1,
  },
  {
    id: NFT_ITEMS[1].id,
    name: NFT_ITEMS[1].name,
    number: NFT_ITEMS[1].number,
    price: NFT_ITEMS[1].price,
    priceNumber: NFT_ITEMS[1].priceNumber,
    image: NFT_ITEMS[1].image,
    quantity: 1,
  },
  {
    id: NFT_ITEMS[2].id,
    name: NFT_ITEMS[2].name,
    number: NFT_ITEMS[2].number,
    price: NFT_ITEMS[2].price,
    priceNumber: NFT_ITEMS[2].priceNumber,
    image: NFT_ITEMS[2].image,
    quantity: 1,
  },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem("kurio_cart");
      if (stored !== null) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return INITIAL_CART;
  });

  useEffect(() => {
    try {
      localStorage.setItem("kurio_cart", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const newQty = Math.max(1, i.quantity + delta);
          return { ...i, quantity: newQty };
        }
        return i;
      }),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
