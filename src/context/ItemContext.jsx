import { createContext, useContext, useState } from "react";

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);

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
