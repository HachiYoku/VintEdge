import React, { useState } from "react";
import { Row, Col, Card, Dropdown, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useItems } from "../../context/ItemContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { items, removeItem } = useItems();
  const navigate = useNavigate();
  const [viewType, setViewType] = useState("sell"); // optional, if you want toggle like history

  const userProfile = {
    name: "John Doe",
    email: "johndoe@example.com",
    joined: "2025-08-31",
    avatar: "https://via.placeholder.com/150",
  };

  const handleEdit = (item) => {
    navigate("/create-item", { state: { item } });
  };

  const handleDelete = (id) => {
    removeItem(id);
  };

  // Only show sell items in profile
  const currentItems = items.filter((i) => i.type === "sell");

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

        {/* Right Column - My Products */}
        <Col xs={24} lg={16}>
          <h3 style={{ marginBottom: 16 }}>My Products</h3>

          {currentItems.length === 0 ? (
            <p>No products added yet.</p>
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
                        <Dropdown
                          overlay={menu}
                          trigger={["click"]}
                          key="actions"
                        >
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
      </Row>
    </div>
  );
};

export default Profile;
