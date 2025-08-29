import React from "react";
import { useItems } from "../../context/ItemContext";

export default function Profile() {
  const { items } = useItems();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Items</h2>
      {items.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {items.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg shadow">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-40 w-full object-cover rounded"
                />
              )}
              <h3 className="font-semibold mt-2">{item.title}</h3>
              <p>Price: ${item.price}</p>
              <p>Condition: {item.condition}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Category: {item.category}</p>
              <p>Location: {item.location}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
