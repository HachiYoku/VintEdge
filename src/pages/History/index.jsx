import { useEffect, useMemo, useState } from "react";
import { Card, Typography, Image, Spin } from "antd";
import api from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import "../../styles/pages/ProfilePage.css";

const { Title, Text } = Typography;

const History = ({ isDarkMode = false }) => {
  const { user } = useAuth();
  const [viewType, setViewType] = useState("buy");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    api
      .get(`/order/${viewType}`)
      .then((res) => setOrders(res.data || []))
      .finally(() => setLoading(false));
  }, [viewType, user]);

  const currentItems = useMemo(() => {
    return orders.flatMap((order) =>
      (order.products || []).map((p) => {
        const product = p.product || {};
        return {
          id: `${order._id}-${product._id || p.product || p.title}`,
          title: p.title || product.title,
          image: p.image || product.image,
          quantity: p.quantity,
          price: p.price,
          currency: p.currency || product.currency || "MMK",
          condition: order.status,
          date: order.createdAt,
        };
      })
    );
  }, [orders]);

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
        {loading ? (
          <Spin />
        ) : currentItems.length === 0 ? (
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
            {currentItems.map((item) => (
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
                {/* Title + Status */}
                <div className="history-card-body">
                  <Text className="history-card-title">{item.title}</Text>
                  <span
                    className={`condition-tag ${
                      item.condition
                        ?.toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/\//g, "-") || "unknown"
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
                  <span className="stock">Qty: {item.quantity}</span>
                  <span className="price">
                    {item.price} {item.currency}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
