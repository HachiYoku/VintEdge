import { useState } from "react";
import { Row, Col, Card, Dropdown, Menu, Tag, Typography } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useItems } from "../../context/ItemContext";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

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
        backgroundColor: isDarkMode ? "#000" : "#f5f5f5",
      }}
    >
      <Col xs={24} lg={16} style={{ margin: "0 auto" }}>
        {/* Header aligned to the left */}
        <div style={{ marginBottom: 24 }}>
          <Title
            level={3}
            style={{ marginBottom: 16, color: isDarkMode ? "#fff" : "#000" }}
          >
            {viewType === "sell" ? "🛒 Items I Sell" : "📦 Items I Buy"}
          </Title>

          <div style={{ display: "flex", gap: 10 }}>
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
                      ? "#1890ff"
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
          <Row gutter={[16, 16]} justify="start">
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
                    bordered={false}
                    style={{
                      maxWidth: 260, // slightly wider than before
                      margin: "0 auto",
                      borderRadius: 16,
                      overflow: "hidden",
                      minHeight: 320,
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: isDarkMode ? "#111" : "#fff",
                      boxShadow: isDarkMode
                        ? "0 8px 20px rgba(255,255,255,0.05)"
                        : "0 8px 20px rgba(0,0,0,0.1)",
                      position: "relative",
                    }}
                  >
                    {/* Ellipsis */}
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 8,
                        zIndex: 2,
                        cursor: "pointer",
                      }}
                    >
                      <Dropdown overlay={menu} trigger={["click"]}>
                        <EllipsisOutlined
                          style={{
                            fontSize: 20,
                            color: isDarkMode ? "#fff" : "#000",
                          }}
                        />
                      </Dropdown>
                    </div>

                    {/* Image */}
                    <div style={{ padding: "0" }}>
                      {item.image && (
                        <img
                          alt={item.title}
                          src={item.image}
                          style={{
                            height: 150,
                            objectFit: "cover",
                            width: "100%",
                            borderRadius: 12,
                            border: "3px solid #000",
                            display: "block",
                            marginBottom: 6,
                          }}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ padding: "0 10px 10px", flex: 1 }}>
                      {/* Title */}
                      <Title
                        level={5}
                        style={{
                          margin: 0,
                          marginBottom: 4,
                          color: isDarkMode ? "#fff" : "#000",
                        }}
                      >
                        {item.title}
                      </Title>

                      {/* Description */}
                      <Text
                        style={{
                          fontSize: 12,
                          display: "block",
                          marginBottom: 4,
                          color: isDarkMode ? "#ccc" : "#555",
                        }}
                        ellipsis={{ rows: 2 }}
                      >
                        {item.description}
                      </Text>

                      {/* Category */}
                      <Tag
                        color="blue"
                        style={{ fontSize: 11, marginBottom: 4 }}
                      >
                        {item.category}
                      </Tag>

                      {/* Quantity */}
                      <Text
                        style={{
                          fontSize: 12,
                          display: "block",
                          marginBottom: 4,
                          fontWeight: 500,
                          color: isDarkMode ? "#fff" : "#000",
                        }}
                      >
                        Quantity: {item.quantity}
                      </Text>

                      {/* Condition */}
                      <Text
                        style={{
                          fontSize: 12,
                          display: "block",
                          marginBottom: 6,
                          fontWeight: 500,
                          color:
                            item.condition === "Good"
                              ? "green"
                              : item.condition === "Fair"
                              ? "orange"
                              : "red",
                        }}
                      >
                        Condition: {item.condition}
                      </Text>

                      {/* Price */}
                      <Text
                        strong
                        style={{
                          fontSize: 16,
                          color: isDarkMode ? "#fff" : "#000",
                        }}
                      >
                        {item.price} {item.currency}
                      </Text>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Col>
    </div>
  );
};

export default History;
