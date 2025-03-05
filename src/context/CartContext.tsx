"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Cart, CartProduct } from "@/lib/interface";
import { useSession } from "@clerk/nextjs";

interface CartContextProps {
  cart: Cart | null;
  setCart: (cart: Cart) => void;
  addToCart: (newProduct: CartProduct) => Promise<void>;
  handleInc: (productId: string) => Promise<void>;
  handleDec: (productId: string) => Promise<void>;
}

const CartContext = createContext<CartContextProps | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const session = useSession();
  const userId = session.session?.user.id;

  const fetchCart = useCallback(async () => {
    if (!userId) {
      const localCart: CartProduct[] = JSON.parse(localStorage.getItem("guestCart") || "[]");
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
      const localCart: CartProduct[] = JSON.parse(localStorage.getItem("guestCart") || "[]");
      localCart.push(newProduct);
      localStorage.setItem("guestCart", JSON.stringify(localCart));
      setCart((prev) => ({
        userId: "guest",
        products: [...(prev?.products || []), newProduct],
      }));
    } else {
      try {
        await axios.post("/api/addToCart", { userId, ...newProduct });

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

  const handleInc = async (productId: string) => {
    try {
      if (!userId) {
        const localCart: CartProduct[] = JSON.parse(localStorage.getItem("guestCart") || "[]");
        const updatedCart = localCart.map((item) =>
          item.productId._id === productId ? { ...item, productQnt: item.productQnt + 1 } : item
        );

        localStorage.setItem("guestCart", JSON.stringify(updatedCart));
        setCart({ userId: "guest", products: updatedCart });
      } else {
        await axios.post("/api/cartIncrement", { productId, userId });

        setCart((prevCart: Cart | null) => {
          const validPrevCart: Cart = prevCart ?? { userId, products: [] };

          return {
            ...validPrevCart,
            products: validPrevCart.products.map((item) =>
              item.productId._id === productId ? { ...item, productQnt: item.productQnt + 1 } : item
            ),
          };
        });
      }
    } catch (error) {
      console.error("Error incrementing product quantity", error);
    }
  };

  const handleDec = async (productId: string) => {
    try {
      if (!userId) {
        const localCart: CartProduct[] = JSON.parse(localStorage.getItem("guestCart") || "[]");
        const updatedCart = localCart
          .map((item) =>
            item.productId._id === productId ? { ...item, productQnt: item.productQnt - 1 } : item
          )
          .filter((item) => item.productQnt > 0);

        localStorage.setItem("guestCart", JSON.stringify(updatedCart));
        setCart({ userId: "guest", products: updatedCart });
      } else {
        await axios.post("/api/cartDecrement", { productId, userId });

        setCart((prevCart: Cart | null) => {
          const validPrevCart: Cart = prevCart ?? { userId, products: [] };

          return {
            ...validPrevCart,
            products: validPrevCart.products
              .map((item) =>
                item.productId._id === productId ? { ...item, productQnt: item.productQnt - 1 } : item
              )
              .filter((item) => item.productQnt > 0),
          };
        });
      }
    } catch (error) {
      console.error("Error decrementing product quantity", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, handleInc, handleDec }}>
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
