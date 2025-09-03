import { useState } from "react";
import { Row, Col, Card, Dropdown, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useItems } from "../../context/ItemContext";
import { useNavigate } from "react-router-dom";

const History = () => {
  const { items, removeItem } = useItems();
  const [viewType, setViewType] = useState("sell");
  const navigate = useNavigate();

  const handleEdit = (item) => {
    navigate("/create-item", { state: { item } });
  };

  const handleDelete = (id) => {
    removeItem(id);
  };

  const currentItems = items.filter((i) => i.type === viewType);

  return (
    <Col xs={24} lg={16}>
      <h3>{viewType === "sell" ? "Items I Sell" : "Items I Buy"}</h3>

      <div style={{ marginBottom: 16, display: "flex", gap: 10 }}>
        <button onClick={() => setViewType("sell")}>Items I Sell</button>
        <button onClick={() => setViewType("buy")}>Items I Buy</button>
      </div>

      {currentItems.length === 0 ? (
        <p>No {viewType} items yet.</p>
      ) : (
        <Row gutter={[16, 16]}>
          {currentItems.map((item) => {
            const menu = (
              <Menu>
                <Menu.Item key="edit" onClick={() => handleEdit(item)}>
                  Edit
                </Menu.Item>
                <Menu.Item
                  key="delete"
                  danger
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Menu.Item>
              </Menu>
            );

            return (
              <Col key={item.id} xs={24} sm={12} lg={8}>
                <Card
                  hoverable
                  cover={
                    item.image && (
                      <img
                        alt={item.title}
                        src={item.image}
                        style={{ height: 150, objectFit: "cover" }}
                      />
                    )
                  }
                  actions={[
                    <Dropdown overlay={menu} trigger={["click"]} key="actions">
                      <span style={{ fontSize: 20 }}>
                        <EllipsisOutlined />
                      </span>
                    </Dropdown>,
                  ]}
                >
                  <h5>{item.title}</h5>
                  <p>
                    Price: {item.price} {item.currency}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Category: {item.category}</p>
                  <p>Condition: {item.condition}</p>
                  <p style={{ color: "#888", fontSize: 12 }}>
                    {item.description}
                  </p>
                  <p style={{ fontSize: 12, color: "#555" }}>
                    Added on: {new Date(item.date).toLocaleString()}
                  </p>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Col>
  );
};

export default History;
