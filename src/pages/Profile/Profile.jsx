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
import "../../styles/pages/ProfilePage.css";

const { Title, Text } = Typography;
const { Meta } = Card;

const ProfilePage = ({ isDarkMode = false }) => {
  const { items, removeItem, updateUser } = useItems();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [editProfile, setEditProfile] = useState(false);
  const [profile, setProfile] = useState({ name: "", email: "", avatar: "" });

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
    return false;
  };

  const saveProfile = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    setEditProfile(false);
  };

  const handleEditItem = (item) =>
    navigate("/create-item", { state: { item } });
  const handleDeleteItem = (id) => removeItem(id);

  return (
    <div className={`profile-page ${isDarkMode ? "dark" : "light"}`}>
      <Row gutter={[16, 16]}>
        {/* Left Column - User Profile */}
        <Col xs={24} lg={8}>
          <Card className="profile-card">
            {editProfile ? (
              <div className="edit-profile">
                <Upload
                  showUploadList={false}
                  beforeUpload={handleAvatarUpload}
                >
                  <div className="avatar-upload">
                    {profile.avatar ? (
                      <img
                        src={profile.avatar}
                        alt="avatar"
                        className="avatar-img"
                      />
                    ) : (
                      <UploadOutlined className="avatar-icon" />
                    )}
                  </div>
                </Upload>

                <Input
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  placeholder="Name"
                  className="profile-input"
                />

                <div className="profile-buttons">
                  <Button className="save-btn" onClick={saveProfile}>
                    Save
                  </Button>
                  <Button
                    className="cancel-btn"
                    onClick={() => setEditProfile(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="view-profile">
                <img
                  src={profile.avatar || "https://via.placeholder.com/150"}
                  alt={profile.name}
                  className="avatar-img-large"
                />
                <h3 className="profile-name">{profile.name}</h3>
                <p className="profile-email">{profile.email}</p>
                <div className="profile-action-buttons">
                  <Button
                    className="edit-btn"
                    onClick={() => setEditProfile(true)}
                    style={{
                      borderRadius: 8,
                      background: isDarkMode ? "#444" : "#fff",
                      border: "2px solid #ff6431ed",
                      color: isDarkMode ? "#000 !important" : "#ff6431ed",
                      fontWeight: "bold",
                      height: 40,
                      minWidth: 100,
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#ff6431ed";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = isDarkMode
                        ? "#444"
                        : "#fff";
                      e.currentTarget.style.color = isDarkMode
                        ? "#000"
                        : "#ff6431ed";
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="logout-btn"
                    onClick={logout}
                    style={{
                      borderRadius: 8,
                      background: isDarkMode ? "#444" : "#fff",
                      border: "2px solid #ff6431ed",
                      color: isDarkMode ? "#000 !important" : "#ff6431ed",
                      fontWeight: "bold",
                      height: 40,
                      minWidth: 100,
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#ff6431ed";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = isDarkMode
                        ? "#444"
                        : "#fff";
                      e.currentTarget.style.color = isDarkMode
                        ? "#000"
                        : "#ff6431ed";
                    }}
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
          <Title level={3} className="products-title">
            My Products
          </Title>

          <Row gutter={[16, 16]} justify="center">
            {items.length === 0 && (
              <Text className="no-products">No products yet.</Text>
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
                  xs={24}
                  sm={12}
                  md={12}
                  lg={8}
                  className="product-col"
                >
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
                      <Dropdown overlay={menu} trigger={["click"]}>
                        <EllipsisOutlined className="history-card-menu-icon" />
                      </Dropdown>
                    </div>

                    {/* Title + Condition */}
                    <div className="history-card-body">
                      <Text className="history-card-title ">{item.title}</Text>
                      <span
                        className={`condition-tag ${
                          item.condition?.toLowerCase().replace(" ", "-") ||
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
