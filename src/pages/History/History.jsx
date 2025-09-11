import { useState } from "react";
import { Card, Dropdown, Typography, Menu, Button, Image } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useItems } from "../../context/ItemContext";
import { useNavigate } from "react-router-dom";

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
        backgroundColor: isDarkMode ? "#000" : "#f2f2f26d",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <Title
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
                      ? "#F2F2F2"
                      : isDarkMode
                      ? "#111"
                      : "#fff",
                  color:
                    viewType === type
                      ? "#482828ff"
                      : isDarkMode
                      ? "#fff"
                      : "#000",
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
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // smaller width
              gap: 16,
              justifyItems: "center", // center on small screens
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
                    width: 260,
                    backgroundColor: isDarkMode ? "#111" : "#f2f2f2ff",
                    position: "relative",
                    textAlign: "center",
                    overflow: "hidden",
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
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "#ff6530",
                        borderColor: "#ff7f50",
                        color: "#fff",
                      }}
                    >
                      {item.condition || "Unknown"}
                    </Button>,
                    <Button
                      type="default"
                      style={{
                        backgroundColor: "#f5f5f5",
                        borderColor: "#d9d9d9",
                        color: "#333",
                      }}
                    >
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
                      color: "#555",
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
