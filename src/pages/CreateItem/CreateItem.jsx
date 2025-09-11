import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useItems } from "../../context/ItemContext";
import {
  Row,
  Col,
  Card,
  Input,
  InputNumber,
  Button,
  Select,
  Upload,
  Radio,
  Space,
  Form,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const CreateItem = () => {
  const { addItem, updateItem } = useItems();
  const navigate = useNavigate();
  const location = useLocation();
  const editItem = location.state?.item || null;

  const [formInstance] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null);

  // Prefill form if editing
  useEffect(() => {
    if (editItem) {
      formInstance.setFieldsValue(editItem);
      setImagePreview(editItem.image || null);
    }
  }, [editItem, formInstance]);

  // Handle image upload and preview
  const handleImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setImagePreview(base64);
      formInstance.setFieldsValue({ image: base64 });
    };
    reader.readAsDataURL(file);
    return false;
  };

  // Submit handler
  const handleSubmit = (values) => {
    const newItem = {
      ...values,
      id: editItem ? editItem.id : Date.now(),
      type: "sell",
      date: editItem ? editItem.date : new Date().toISOString(),
      image: values.image || imagePreview,
    };

    if (editItem) {
      updateItem(newItem);
    } else {
      addItem(newItem);
    }

    navigate("/profile");
  };

  return (
    // Page background (needed for glass effect)
    <div
      style={{
        padding: "24px",
        backgroundColor: "#F9F9F9",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Main glass form container */}
      <Form
        layout="vertical"
        form={formInstance}
        onFinish={handleSubmit}
        initialValues={{
          quantity: editItem?.quantity || 1,
          condition: editItem?.condition || "Brand New",
          currency: "MMK",
          title: editItem?.title || "",
        }}
        style={{
          width: "100%",
          maxWidth: 900,
          padding: 24,
          background: "#F0F0F0",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: 16,
        }}
      >
        <Row gutter={[24, 24]}>
          {/* Left Column: Image + Condition */}
          <Col
            xs={24}
            lg={8}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* Product Image Card */}
            <Card
              title="Product Image"
              style={{
                background: "#F4F4F4", // glass effect
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                borderRadius: 12,
                border: "1px solid rgba(48, 6, 6, 0.09)",
              }}
            >
              <Row gutter={[16, 16]} align="middle">
                {/* Upload Box */}
                <Col xs={24} sm={12}>
                  <Upload showUploadList={false} beforeUpload={handleImage}>
                    <div
                      style={{
                        border: "1px dashed #d9d9d9",
                        borderRadius: 8,
                        height: 150,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "all 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#C7BFBF";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#d9d9d9";
                      }}
                    >
                      <UploadOutlined
                        style={{ fontSize: 12, marginBottom: 8, padding: 35 }}
                      />
                    </div>
                  </Upload>
                </Col>

                {/* Image Preview */}
                <Col xs={24} sm={12}>
                  <div
                    style={{
                      border: "1px solid #d9d9d9",
                      borderRadius: 8,
                      height: 150,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      background: "#F4F4F4",
                    }}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="preview"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain", // <--- ensures aspect ratio is preserved
                        }}
                      />
                    ) : (
                      <span style={{ color: "#999" }}>Preview</span>
                    )}
                  </div>
                </Col>
              </Row>
            </Card>

            {/* Condition Card */}
            <Card
              title="Condition"
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                borderRadius: 12,
                border: "1px solid rgba(48, 6, 6, 0.09)",
              }}
            >
              <Form.Item
                name="condition"
                rules={[
                  { required: true, message: "Please select a condition" },
                ]}
              >
                <Radio.Group style={{ width: "100%" }}>
                  <style>
                    {`
                    /* Hide default radio circle */
                    .ant-radio-inner {
                      display: none !important;
                    }
                    /* Custom text-style radio buttons */
                    .ant-radio-wrapper {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      padding: 6px 8px;
                      margin: 4px;
                      border-radius: 6px;
                      cursor: pointer;
                      transition: all 0.3s;
                      width: 100%;
                      text-align: center;
                    }
                    .ant-radio-wrapper:hover {
                      background: #F4F4F4;
                    }
                    .ant-radio-wrapper-checked {
                      background: #F4F4F4;
                      font-weight: 600;
                      color: #ff6431ed !important;
                    }
                  `}
                  </style>
                  <Row gutter={[8, 8]}>
                    {[
                      "Brand New",
                      "Like New",
                      "Good",
                      "Fair",
                      "Worn",
                      "For parts/not working",
                    ].map((option) => (
                      <Col key={option} xs={12}>
                        <Radio value={option}>{option}</Radio>
                      </Col>
                    ))}
                  </Row>
                </Radio.Group>
              </Form.Item>
            </Card>
          </Col>

          {/* Right Column: Product Details */}
          <Col
            xs={24}
            lg={16}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <Card title="Product Details" style={{ flex: 1 }}>
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  { required: true, message: "Please enter a product title" },
                ]}
              >
                <Input placeholder="Enter product title" />
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item shouldUpdate>
                    {() => {
                      const quantity =
                        Number(formInstance.getFieldValue("quantity")) || 0;
                      return (
                        <Form.Item label="Quantity" name="quantity">
                          <Space.Compact style={{ width: "100%" }}>
                            <Button
                              onClick={() =>
                                formInstance.setFieldsValue({
                                  quantity: Math.max(0, quantity - 1),
                                })
                              }
                            >
                              –
                            </Button>
                            <InputNumber
                              min={0}
                              value={quantity}
                              onChange={(v) =>
                                formInstance.setFieldsValue({
                                  quantity: Number(v) || 0,
                                })
                              }
                              style={{ width: "78%", textAlign: "center" }}
                            />
                            <Button
                              onClick={() =>
                                formInstance.setFieldsValue({
                                  quantity: quantity + 1,
                                })
                              }
                            >
                              +
                            </Button>
                          </Space.Compact>
                        </Form.Item>
                      );
                    }}
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Category"
                    name="category"
                    rules={[
                      { required: true, message: "Please select category" },
                    ]}
                  >
                    <Select placeholder="Select category">
                      <Option value="Electronics">Electronics</Option>
                      <Option value="Jewelery">Jewelery</Option>
                      <Option value="Men's clothing">Men's clothing</Option>
                      <Option value="Women's clothing">Women's clothing</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item label="Price" name="price">
                    <Space.Compact>
                      <InputNumber style={{ width: "70%" }} min={0} />
                      <Form.Item name="currency" noStyle>
                        <Select style={{ width: "30%" }}>
                          <Option value="MMK">MMK</Option>
                          <Option value="USD">USD</Option>
                          <Option value="THB">THB</Option>
                        </Select>
                      </Form.Item>
                    </Space.Compact>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please enter description" },
                ]}
              >
                <TextArea rows={4} placeholder="Type product details here" />
              </Form.Item>

              <Form.Item>
                <div style={{ textAlign: "right" }}>
                  <Button
                    style={{
                      backgroundColor: "white",
                      borderColor: "rgba(48, 6, 6, 0.26)",
                      color: "#ff6431ed",
                      borderColor: "#ff6431ed",
                      marginRight: 8,
                    }}
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      color: "#fff",
                      backgroundColor: "#ff6431ed",
                      borderColor: "#ff6431ed",
                    }}
                  >
                    {editItem ? "Update" : "Publish"}
                  </Button>
                </div>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateItem;
