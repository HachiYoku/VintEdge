import React, { useState } from "react";
import { Card, Modal, Button } from "antd";
import { useCart } from "../context/CartContext";

const CartListView = () => {
  const { cart } = useCart();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showItemDetail = (item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cart.map((item) => (
          <Card
            key={item.id || item.title} // use unique id if available
            hoverable
            style={{ marginBottom: 10, cursor: "pointer" }}
            onClick={() => showItemDetail(item)}
          >
            <Card.Meta
              title={item.title}
              description={`Quantity: ${item.quantity}`}
            />
          </Card>
        ))
      )}

      {/* Floating Mini Card Modal */}
      <Modal
        title={selectedItem?.title}
        open={isModalVisible} // correct for AntD v5
        onCancel={handleClose}
        footer={[
          <Button key="close" onClick={handleClose}>
            Close
          </Button>,
        ]}
      >
        <p>
          <strong>Description:</strong> {selectedItem?.description}
        </p>
        <p>
          <strong>Price:</strong> ${selectedItem?.price}
        </p>
        <p>
          <strong>Quantity:</strong> {selectedItem?.quantity}
        </p>
      </Modal>
    </div>
  );
};

export default CartListView;
