import { createContext, useContext, useState, useEffect } from "react";

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  // Load initial items from localStorage or default to empty array
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("items");
    return saved ? JSON.parse(saved) : [];
  });

  // Save items to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addItem = (item) => setItems((prev) => [...prev, item]);

  const updateItem = (updatedItem) =>
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );

  const removeItem = (id) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  const addItems = (newItems) =>
    setItems((prev) => [...prev, ...newItems]);

  const addBuyItems = (checkoutItems) => {
    const now = new Date().toISOString();
    const normalized = checkoutItems.map((item) => ({
      ...item,
      id: `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type: "buy",
      date: now,
    }));
    setItems((prev) => [...prev, ...normalized]);
  };

  return (
    <ItemContext.Provider
      value={{ items, addItem, updateItem, removeItem, addItems, addBuyItems }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export const useItems = () => useContext(ItemContext);
