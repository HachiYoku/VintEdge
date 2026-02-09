import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const mapCartItems = (cartData) => {
    if (!cartData || !Array.isArray(cartData.items)) return [];
    return cartData.items.map((i) => {
      const product = i.product || {};
      const productId = product._id || product.id;
      return {
        ...product,
        id: productId,
        quantity: i.quantity,
        stock: product.quantity ?? null,
      };
    });
  };

  const setCartFromApi = (cartData) => {
    setCart(mapCartItems(cartData));
  };

  const refreshCart = async () => {
    const res = await api.get("/cart");
    setCartFromApi(res.data);
  };

  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }
    refreshCart().catch(() => {});
  }, [user]);

  const addToCart = async (product) => {
    const productId = product.id ?? product._id;
    if (!productId) return;
    const res = await api.post("/cart", { productId, quantity: 1 });
    setCartFromApi(res.data);
  };

  const removeFromCart = async (id) => {
    const res = await api.delete(`/cart/${id}`);
    if (res.data?.items) {
      setCartFromApi(res.data);
    } else {
      setCart([]);
    }
  };

  const updateCartItemCount = async (quantity, id) => {
    const res = await api.put(`/cart/${id}`, { quantity });
    if (res.data?.items) {
      setCartFromApi(res.data);
    } else {
      setCart([]);
    }
  };
  
  const getTotalAmount = () => {
    const totalAmount = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return totalAmount.toFixed(2);
  };


  const clearAllCartItem = async () => {
    await api.delete("/cart");
    setCart([]);
  };

  const removeItems = (ids) => {
    const idSet = new Set(ids.map(String));
    setCart((prev) => prev.filter((item) => !idSet.has(String(item.id))));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItemCount,
        getTotalAmount,
        clearAllCartItem,
        removeItems,
        setCartFromApi,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );

};

export const useCart = () => useContext(CartContext);
