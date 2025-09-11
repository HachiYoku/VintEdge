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

  return (
    <ItemContext.Provider value={{ items, addItem, updateItem, removeItem }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItems = () => useContext(ItemContext);
