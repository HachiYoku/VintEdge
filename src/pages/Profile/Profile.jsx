import React from "react";
import { Row, Col, Card, Button } from "antd";
import { useItems } from "../../context/ItemContext";

export default function Profile() {
  const { items } = useItems();

  const userProfile = {
    name: "John Doe",
    email: "johndoe@example.com",
    joined: "2025-08-31",
    avatar: "https://via.placeholder.com/150",
  };

  const handleEdit = (item) => console.log("Edit", item);
  const handleDelete = (item) => console.log("Delete", item);

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[16, 16]}>
        {/* Left Column - Profile */}
        <Col xs={24} lg={8}>
          <Card style={{ textAlign: "center" }}>
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "8px",
              }}
            />
            <h3 style={{ marginBottom: "4px" }}>{userProfile.name}</h3>
            <p style={{ marginBottom: "4px", color: "#888" }}>
              {userProfile.email}
            </p>
            <p style={{ margin: 0, fontSize: "12px", color: "#aaa" }}>
              Joined: {userProfile.joined}
            </p>
          </Card>
        </Col>

        {/* Right Column - Products */}
        <Col xs={24} lg={16}>
          <h3 style={{ marginBottom: "16px" }}>My Products</h3>
          {items.length === 0 ? (
            <p>No products added yet.</p>
          ) : (
            <Row gutter={[16, 16]}>
              {items.map((item, index) => (
                <Col key={index} xs={24} sm={12} lg={8}>
                  <Card
                    hoverable
                    cover={
                      item.image && (
                        <img
                          alt={item.title}
                          src={item.image}
                          style={{ height: "150px", objectFit: "cover" }}
                        />
                      )
                    }
                  >
                    <h5 style={{ marginBottom: "4px" }}>{item.title}</h5>
                    <p style={{ margin: "2px 0" }}>Price: ${item.price}</p>
                    <p style={{ margin: "2px 0" }}>Quantity: {item.quantity}</p>
                    <p style={{ margin: "2px 0" }}>Category: {item.category}</p>
                    <p style={{ margin: "2px 0" }}>Location: {item.location}</p>
                    <p
                      style={{
                        margin: "2px 0",
                        color: "#888",
                        fontSize: "12px",
                      }}
                    >
                      {item.description}
                    </p>

                    <div
                      style={{
                        marginTop: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        type="primary"
                        size="small"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="danger"
                        size="small"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
}
