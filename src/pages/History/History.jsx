import { useState } from "react";
import { Card, Dropdown, Typography, Button, Image } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useItems } from "../../context/ItemContext";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/ProfilePage.css";

const { Title, Text } = Typography;

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
                  border: `1px solid ${isDarkMode ? "#555" : "#FF7343"}`,
                  background:
                    viewType === type
                      ? "#FF7343"
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
              // ✅ AntD v5 menu items
              const dropdownItems = [
                {
                  key: "edit",
                  label: "Edit",
                  onClick: () => handleEdit(item),
                },
                {
                  key: "delete",
                  label: "Delete",
                  danger: true,
                  onClick: () => handleDelete(item.id),
                },
              ];

              return (
                <Card
                  key={item.id}
                  hoverable
                  className={`history-card ${isDarkMode ? "dark" : "light"}`}
                  cover={
                    <Image.PreviewGroup>
                      <div className="card-image-container">
                        <Image
                          src={item.image}
                          alt={item.title}
                          preview={true}
                        />
                      </div>
                    </Image.PreviewGroup>
                  }
                >
                  {/* Menu Dropdown */}
                  <div className="history-card-menu">
                    <Dropdown
                      menu={{ items: dropdownItems }}
                      trigger={["click"]}
                    >
                      <span>
                        <EllipsisOutlined className="history-card-menu-icon" />
                      </span>
                    </Dropdown>
                  </div>

                  {/* Title + Condition */}
                  <div className="history-card-body">
                    <Text className="history-card-title">{item.title}</Text>
                    <span
                      className={`condition-tag ${
                        item.condition
                          ?.toLowerCase()
                          .replace(/\s+/g, "-") // all spaces → dash
                          .replace(/\//g, "-") || // slash → dash
                        "unknown"
                      }`}
                    >
                      {item.condition || "Unknown"}
                    </span>
                  </div>

                  {/* Date */}
                  <p className="history-card-date">
                    Added on: {new Date(item.date).toLocaleString()}
                  </p>

                  {/* Footer */}
                  <div className="history-card-footer">
                    <span className="stock">Stock: {item.quantity}</span>
                    <span className="price">
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
