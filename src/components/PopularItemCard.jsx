import React from "react";
import { Card, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const PopularItemCard = ({ product }) => {

  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div style={{ padding: "16px" }}>
      <Card hoverable style={{ width: "100%", maxWidth: 620, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap", // wrap on smaller screens
          }}
        >
          {/* Image container with fixed width */}
          <div
            style={{
              width: 273,
              minWidth: 150,
              height: 200,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16, // spacing for mobile
            }}
          >
            <img
              alt={product.title}
              src={product.image}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Text content */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingLeft: 16,
              minWidth: 250,
            }}
          >
            <Title level={3} style={{ fontSize: "1.2rem" }}>
              {product.title}
            </Title>
            <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "more" }}>
              {product.description}
            </Paragraph>
            <Button
              type="primary"
              onClick={handleViewDetails}
              style={{
                width: "150px",
                backgroundColor: "#c5bebeff",
                borderColor: "#c5bebeff",
                alignSelf: "flex-start",
                marginTop: 8,
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
