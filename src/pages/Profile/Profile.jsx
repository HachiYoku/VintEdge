import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Input,
  Upload,
  Image,
  Dropdown,
  Menu,
} from "antd";
import { EllipsisOutlined, UploadOutlined } from "@ant-design/icons";
import { useItems } from "../../context/ItemContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Meta } = Card;

const ProfilePage = ({ isDarkMode = false }) => {
  const { items, removeItem, updateUser } = useItems();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [editProfile, setEditProfile] = useState(false);
  const [profile, setProfile] = useState({ name: "", email: "", avatar: "" });
  // Load profile from localStorage or user context
  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else if (user) {
      const userProfile = {
        name: user.name || "",
        email: user.email || "",
        avatar: user.avatar || "",
      };
      setProfile(userProfile);
      localStorage.setItem("profile", JSON.stringify(userProfile));
    }
  }, [user]);

  if (!user) return <Navigate to="/login" replace />;

  // Profile handlers
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
    return false; // prevent auto upload
  };

  const saveProfile = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    setEditProfile(false);
  };

  const handleEditItem = (item) =>
    navigate("/create-item", { state: { item } });
  const handleDeleteItem = (id) => removeItem(id);

  return (
    <div
      style={{
        padding: "24px 20px",
        minHeight: "100vh",
        backgroundColor: isDarkMode ? "#000" : "#f2f2f26d",
      }}
    >
      <Row gutter={[16, 16]}>
        {/* Left Column - User Profile */}
        <Col xs={24} lg={8}>
          <Card
            style={{
              textAlign: "center",
              backgroundColor: isDarkMode ? "#111" : "transparent",
              border: "none",
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
                      width: 140, // increased from 100
                      height: 140, // increased from 100
                      margin: "0 auto 16px", // increased spacing
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
                      <UploadOutlined
                        style={{ fontSize: 32, color: "#ff6431ed" }}
                      />
                    )}
                  </div>
                </Upload>

                <Input
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  placeholder="Name"
                  style={{
                    background: "transparent",
                    border: "none",
                    borderBottom: "2px solid #ff6431ed",
                    borderRadius: 0,
                    outline: "none",
                    color: isDarkMode ? "#fff" : "#333",
                    marginBottom: 16,
                  }}
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
                  onClick={saveProfile}
                  style={{
                    marginBottom: 8,
                    background: "#ff6431ed", // primary color
                    border: "none",
                    color: "#fff",
                    fontWeight: "bold",
                    marginBottom: 12,
                    height: 32,
                    width: 60,
                    fontSize: 16,
                    marginRight: 50,
                  }}
                >
                  Save
                </Button>
                <Button
                  block
                  onClick={() => setEditProfile(false)}
                  style={{
                    height: 32,
                    width: 60,
                    fontSize: 16,
                  }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <img
                  src={profile.avatar || "https://via.placeholder.com/150"}
                  alt={profile.name}
                  style={{
                    width: 140, // bigger avatar
                    height: 140,
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: 16,
                    border: isDarkMode
                      ? "2px solid #444"
                      : "2px solid #ff6431ed", // subtle border
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <h3
                  style={{
                    color: isDarkMode ? "#fff" : "#333",
                    marginBottom: 4,
                    fontWeight: 600,
                    fontSize: 22,
                  }}
                >
                  {profile.name}
                </h3>
                <p
                  style={{
                    color: isDarkMode ? "#aaa" : "#666",
                    marginBottom: 16,
                    fontSize: 14,
                  }}
                >
                  {profile.email}
                </p>

                <div
                  style={{ display: "flex", justifyContent: "center", gap: 12 }}
                >
                  <Button
                    block
                    onClick={() => setEditProfile(true)}
                    style={{
                      borderRadius: 8,
                      background: "#fff",
                      border: "2px solid #ff6431ed",
                      color: "#ff6431ed",
                      fontWeight: "bold",
                      height: 40,
                      minWidth: 100,
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#ff6431ed") &
                      (e.currentTarget.style.color = "#fff")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#fff") &
                      (e.currentTarget.style.color = "#ff6431ed")
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    type="primary"
                    danger
                    block
                    onClick={logout}
                    style={{
                      borderRadius: 8,
                      background: "#ff4d4f",
                      border: "none",
                      color: "#fff",
                      fontWeight: "bold",
                      height: 40,
                      minWidth: 100,
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#ff7875")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#ff4d4f")
                    }
                  >
                    Logout
                  </Button>
                </div>
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

          <Row gutter={[16, 16]} justify="center">
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
                <Col
                  key={item.id}
                  xs={24} // 1 per row on small screens
                  sm={12} // 2 per row on medium screens
                  md={12}
                  lg={8} // 3 per row on large screens
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card
                    hoverable
                    style={{
                      width: 240,
                      textAlign: "center",
                      backgroundColor: isDarkMode ? "#111" : "#f2f2f2ff",

                      borderRadius: 8,
                      position: "relative",
                      overflow: "hidden",
                    }}
                    cover={
                      <Image.PreviewGroup>
                        <Image
                          alt={item.title}
                          src={item.image}
                          style={{
                            height: 160,
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
                            fontSize: 20,
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
                        fontSize: 12,
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
                        fontSize: 14,
                      }}
                    >
                      <span>Stock: {item.quantity}</span>
                      <span className="product-card-price">
                        {item.price} {item.currency}
                      </span>
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
