import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Input,
  Upload,
  Tag,
  Dropdown,
  Menu,
} from "antd";
import { EllipsisOutlined, UploadOutlined } from "@ant-design/icons";
import { useItems } from "../../context/ItemContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

const { Title, Text } = Typography;

const ProfilePage = ({ isDarkMode = false }) => {
  const { items, removeItem, updateUser } = useItems();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [editProfile, setEditProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    avatar: user.avatar || "",
  });

  if (!user) return <Navigate to="/login" replace />;

  // Profile handlers
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarUpload = (file) => {
    if (file) setProfile({ ...profile, avatar: URL.createObjectURL(file) });
    return false; // prevent auto upload
  };

  const saveProfile = () => {
    updateUser(profile);
    setEditProfile(false);
  };

  // Product handlers
  const handleEditItem = (item) =>
    navigate("/create-item", { state: { item } });
  const handleDeleteItem = (id) => removeItem(id);

  return (
    <div
      style={{
        padding: "24px 20px",
        minHeight: "100vh",
        backgroundColor: isDarkMode ? "#000" : "#f5f5f5",
      }}
    >
      <Row gutter={[16, 16]}>
        {/* Left Column - User Profile */}
        <Col xs={24} lg={8}>
          <Card
            style={{
              textAlign: "center",
              backgroundColor: isDarkMode ? "#111" : "#fff",
              border: isDarkMode ? "1px solid #333" : "1px solid #f0f0f0",
            }}
          >
            {editProfile ? (
              <div>
                <Upload
                  showUploadList={false}
                  beforeUpload={handleAvatarUpload}
                >
                  <div
                    style={{
                      width: 100,
                      height: 100,
                      margin: "0 auto 8px",
                      borderRadius: "50%",
                      border: "1px dashed #d9d9d9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      overflow: "hidden",
                    }}
                  >
                    {profile.avatar ? (
                      <img
                        src={profile.avatar}
                        alt="avatar"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <UploadOutlined />
                    )}
                  </div>
                </Upload>
                <Input
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  placeholder="Name"
                  style={{ marginBottom: 8 }}
                />
                {/* <Input
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  placeholder="Email"
                  style={{ marginBottom: 8 }}
                /> */}
                <Button
                  type="primary"
                  block
                  onClick={() => setEditProfile()}
                  style={{ marginBottom: 8 }}
                >
                  Save
                </Button>
                <Button block onClick={() => setEditProfile(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <div>
                <img
                  src={profile.avatar || "https://via.placeholder.com/150"}
                  alt={profile.name}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: 8,
                  }}
                />
                <h3
                  style={{
                    color: isDarkMode ? "#fff" : "#000",
                    marginBottom: 4,
                  }}
                >
                  {profile.name}
                </h3>
                <p
                  style={{
                    color: isDarkMode ? "#aaa" : "#888",
                    marginBottom: 8,
                  }}
                >
                  {profile.email}
                </p>
                <Button
                  block
                  onClick={() => setEditProfile(true)}
                  style={{ marginBottom: 8 }}
                >
                  Edit Profile
                </Button>
                <Button type="primary" danger block onClick={logout}>
                  Logout
                </Button>
              </div>
            )}
          </Card>
        </Col>

        {/* Right Column - User Products */}
        <Col xs={24} lg={16}>
          <Title
            level={3}
            style={{ marginBottom: 16, color: isDarkMode ? "#fff" : "#000" }}
          >
            My Products
          </Title>

          <Row gutter={[16, 16]}>
            {items.length === 0 && (
              <Text style={{ color: isDarkMode ? "#aaa" : "#555" }}>
                No products yet.
              </Text>
            )}

            {items.map((item) => {
              const menu = (
                <Menu>
                  <Menu.Item key="edit" onClick={() => handleEditItem(item)}>
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    key="delete"
                    danger
                    onClick={() => handleDeleteItem(item.id)}
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
                      maxWidth: 260,
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

                    {/* Content */}
                    <div style={{ padding: "0 10px 10px", flex: 1 }}>
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
                      <Tag
                        color="blue"
                        style={{ fontSize: 11, marginBottom: 4 }}
                      >
                        {item.category}
                      </Tag>
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
                              : item.condition === "Brand New" ||
                                item.condition === "Like New"
                              ? "blue"
                              : "red", // For "Worn" or "For parts/not working"
                        }}
                      >
                        Condition: {item.condition}
                      </Text>

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
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
