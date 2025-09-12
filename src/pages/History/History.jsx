import { useState } from "react";
import { Card, Dropdown, Typography, Menu, Button, Image } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useItems } from "../../context/ItemContext";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/History.css";

const { Title, Text } = Typography;
const { Meta } = Card;

const History = ({ isDarkMode = false }) => {
  const { items, removeItem } = useItems();
  const [viewType, setViewType] = useState("sell");
  const navigate = useNavigate();

  const handleEdit = (item) => navigate("/create-item", { state: { item } });
  const handleDelete = (id) => removeItem(id);

  const currentItems = items.filter((i) => i.type === viewType);

  return (
    <div
      style={{
        padding: "24px 20px",
        minHeight: "100vh",
        backgroundColor: isDarkMode ? "#000" : "#F9F9F9",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <Title
            className="title-hover"
            level={3}
            style={{ marginBottom: 16, color: isDarkMode ? "#fff" : "#000" }}
          >
            {viewType === "sell" ? "🛒 Items I Sell" : "📦 Items I Buy"}
          </Title>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["sell", "buy"].map((type) => (
              <button
                key={type}
                onClick={() => setViewType(type)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: `1px solid ${isDarkMode ? "#555" : "#d9d9d9"}`,
                  background:
                    viewType === type
                      ? "#FF6631"
                      : isDarkMode
                      ? "#111"
                      : "#fff",
                  color:
                    viewType === type ? "#fff" : isDarkMode ? "#fff" : "#000",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                {type === "sell" ? "Items I Sell" : "Items I Buy"}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        {currentItems.length === 0 ? (
          <Text style={{ color: isDarkMode ? "#aaa" : "#555" }}>
            No {viewType} items yet.
          </Text>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 16,
              justifyItems: "center",
            }}
          >
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
                <Card
                  key={item.id}
                  hoverable
                  style={{
                    width: 280,
                    backgroundColor: isDarkMode ? "#111" : "#f2f3f5",
                    position: "relative",
                    textAlign: "center",
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  cover={
                    <Image.PreviewGroup>
                      <Image
                        alt={item.title}
                        src={item.image}
                        style={{
                          height: 190,
                          objectFit: "cover",
                          padding: "20px",
                        }}
                      />
                    </Image.PreviewGroup>
                  }
                  actions={[
                    <Button className="card-action-btn primary">
                      {item.condition || "Unknown"}
                    </Button>,
                    <Button className="card-action-btn default">
                      Details
                    </Button>,
                  ]}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 8,
                      zIndex: 2,
                    }}
                  >
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <EllipsisOutlined
                        style={{
                          fontSize: 18,
                          color: isDarkMode ? "#fff" : "#000",
                        }}
                      />
                    </Dropdown>
                  </div>

                  <Meta
                    title={`${item.title} (${item.category || "Unknown"})`}
                  />

                  <p
                    style={{
                      fontSize: 11,
                      color: isDarkMode ? "#ccc" : "#555",
                      marginTop: 4,
                      textAlign: "center",
                    }}
                  >
                    Added on: {new Date(item.date).toLocaleString()}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 8,
                      fontSize: 13,
                      color: isDarkMode ? "#fff" : "#000",
                    }}
                  >
                    <span>Stock: {item.quantity}</span>
                    <span className="product-card-price">
                      {item.price} {item.currency}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
