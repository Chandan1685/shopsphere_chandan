import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products } from "../data/products.js";
const CartContext = createContext(null);
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("shopsphere-cart")) || [];
      return saved.map((item) => {
        const found = products.find((p) => p.id === item.id);
        return found ? { ...found, ...item, image: found.image } : item;
      });
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved =
        JSON.parse(localStorage.getItem("shopsphere-wishlist")) || [];
      return saved
        .map((item) => products.find((product) => product.id === item.id))
        .filter(Boolean);
    } catch {
      return [];
    }
  });
  useEffect(
    () => localStorage.setItem("shopsphere-cart", JSON.stringify(cart)),
    [cart],
  );
  useEffect(
    () => localStorage.setItem("shopsphere-wishlist", JSON.stringify(wishlist)),
    [wishlist],
  );
  const addToCart = (product) =>
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      return found
        ? current.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...current, { ...product, quantity: 1 }];
    });
  const updateQuantity = (id, quantity) =>
    setCart((current) =>
      quantity < 1
        ? current.filter((item) => item.id !== id)
        : current.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
    );
  const removeFromCart = (id) =>
    setCart((current) => current.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);
  const toggleWishlist = (product) =>
    setWishlist((current) =>
      current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product],
    );
  const isWishlisted = (id) => wishlist.some((item) => item.id === id);
  const wishlistCount = wishlist.length;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const value = useMemo(
    () => ({
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      itemCount,
      total,
      wishlist,
      wishlistCount,
      toggleWishlist,
      isWishlisted,
    }),
    [cart, itemCount, total, wishlist, wishlistCount],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export const useCart = () => {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used within CartProvider");
  return value;
};
