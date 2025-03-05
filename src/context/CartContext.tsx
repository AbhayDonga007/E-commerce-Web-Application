"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Cart, CartProduct } from "@/lib/interface";
import { useSession } from "@clerk/nextjs";

interface CartContextProps {
  cart: Cart | null;
  setCart: (cart: Cart) => void;
  addToCart: (newProduct: CartProduct) => Promise<void>;
}

const CartContext = createContext<CartContextProps | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const session = useSession();
  const userId = session.session?.user.id;

  // Use useCallback to stabilize the function
  const fetchCart = useCallback(async () => {
    if (!userId) {
      // Get guest cart from local storage
      const localCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      setCart({ userId: "guest", products: localCart });
    } else {
      try {
        const res = await axios.get(`/api/getCartData?userId=${userId}`);
        setCart(res.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }
  }, [userId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (newProduct: CartProduct) => {
    if (!userId) {
      const localCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      localCart.push(newProduct);
      localStorage.setItem("guestCart", JSON.stringify(localCart));
      setCart((prev) => ({
        userId: "guest",
        products: [...(prev?.products || []), newProduct],
      }));
    } else {
      try {
        await axios.post("/api/addToCart", {
          userId,
          ...newProduct,
        });

        // Update state in real-time
        setCart((prev) => ({
          ...prev!,
          products: [...(prev?.products || []), newProduct],
        }));
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
    fetchCart();
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
