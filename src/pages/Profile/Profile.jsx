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
} from "antd";
import { EllipsisOutlined, UploadOutlined } from "@ant-design/icons";
import { useItems } from "../../context/ItemContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import "../../styles/pages/ProfilePage.css";

// 👇 add this import
import imageCompression from "browser-image-compression";

const { Title, Text } = Typography;

const ProfilePage = ({ isDarkMode = false }) => {
  const { items, removeItem } = useItems();
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

  // 👇 safer avatar upload with compression
  const handleAvatarUpload = async (file) => {
    try {
      const options = { maxSizeMB: 0.2, maxWidthOrHeight: 300 };
      const compressedFile = await imageCompression(file, options);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result });
      };
      reader.readAsDataURL(compressedFile);
    } catch (err) {
      console.error("Image compression failed:", err);
    }
    return false;
  };

  const saveProfile = () => {
    try {
      localStorage.setItem("profile", JSON.stringify(profile));
    } catch (err) {
      console.error("Saving profile failed:", err);
      alert("Profile too large to save. Please use a smaller image.");
    }
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
                  <Button
                    className="cancel-btn"
                    onClick={() => setEditProfile(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="save-btn" onClick={saveProfile}>
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="view-profile">
                <img
                  src={profile.avatar || "/profile-img.webp"}
                  alt={profile.name}
                  className="avatar-img-large"
                />
                <h3 className="profile-name">{profile.name}</h3>
                <p className="profile-email">{profile.email}</p>
                <div className="profile-action-buttons">
                  <Button
                    className="edit-btn"
                    onClick={() => setEditProfile(true)}
                  >
                    Edit
                  </Button>
                  <Button className="logout-btn" onClick={logout}>
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
              const dropdownItems = [
                {
                  key: "edit",
                  label: "Edit",
                  onClick: () => handleEditItem(item),
                },
                {
                  key: "delete",
                  label: "Delete",
                  danger: true,
                  onClick: () => handleDeleteItem(item.id),
                },
              ];

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
                    <div className="history-card-menu">
                      <Dropdown
                        menu={{ items: dropdownItems }}
                        trigger={["click"]}
                      >
                        <span className="history-card-menu-trigger">
                          <EllipsisOutlined className="history-card-menu-icon" />
                        </span>
                      </Dropdown>
                    </div>

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

                    <p className="history-card-date">
                      Added on: {new Date(item.date).toLocaleString()}
                    </p>

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
