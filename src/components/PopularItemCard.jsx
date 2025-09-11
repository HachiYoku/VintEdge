import React from "react";
import { Card, Button, Typography } from "antd";
import { FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const PopularItemCard = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div style={{ padding: "20px", marginTop: "50px" }}>
      <Card
        hoverable
        style={{
          width: "100%",
          maxWidth: 800,
          margin: "0 auto",
          backgroundColor: "#F2F3F5",
          borderRadius: 5,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {/* Image container */}
          <div
            style={{
              flex: "1 1 150px",
              maxHeight: "200px",
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              marginRight: 16,
            }}
          >
            <img
              alt={product.title}
              src={product.image}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Text content */}
          <div
            style={{
              flex: "2 1 250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minWidth: 0,
            }}
          >
            <Title
              level={3}
              style={{
                fontSize: "1.2rem",
                marginBottom: 8,
                wordBreak: "break-word",
              }}
            >
              {product.title}
            </Title>
            <Paragraph
              ellipsis={{ rows: 3, expandable: true, symbol: "more" }}
              style={{ marginBottom: 16 }}
            >
              {product.description}
            </Paragraph>
            <Button
              type="primary"
              icon={<FaInfoCircle />}
              onClick={handleViewDetails}
              style={{
                width: "130px",
                height: "35px",
                backgroundColor: "#FF6530",
                borderColor: "#FF6530",
                alignSelf: "center",
                fontWeight: "500",
              }}
            >
              View Details
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PopularItemCard;
