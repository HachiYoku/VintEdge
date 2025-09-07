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

  const handleImage = (file) => {
    if (file) {
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
      formInstance.setFieldsValue({ image: preview });
    }
    return false; // prevent auto upload
  };

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
    <div style={{ padding: "24px" }}>
      <Row gutter={[24, 24]} style={{ display: "flex", alignItems: "stretch" }}>
        {/* Left Column: Image + Condition */}
        <Col
          xs={24}
          lg={8}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          {/* Product Image Card */}
          <Card title="Product Image" style={{ flex: 2 }}>
            <Row gutter={16}>
              <Col xs={12}>
                <Upload showUploadList={false} beforeUpload={handleImage}>
                  <div
                    style={{
                      border: "1px dashed #d9d9d9",
                      borderRadius: 4,
                      height: 150,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <UploadOutlined style={{ fontSize: 20, padding: 50 }} />
                  </div>
                </Upload>
              </Col>

              {/* Preview Area */}
              <Col xs={12}>
                <div
                  style={{
                    border: "1px solid #d9d9d9",
                    borderRadius: 4,
                    height: 150,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
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
          <Card title="Condition" style={{ flex: 1 }}>
            <Form.Item name="condition" initialValue="Brand New">
              <Radio.Group style={{ width: "100%" }}>
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
                      <Radio.Button value={option}>{option}</Radio.Button>
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
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Card title="Product Details" style={{ flex: 1 }}>
            <Form
              layout="vertical"
              form={formInstance}
              onFinish={handleSubmit}
              initialValues={{
                quantity: 1,
                condition: "Brand New",
                currency: "MMK",
              }}
            >
              {/* Title + Quantity */}
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                      { required: true, message: "Please enter product title" },
                    ]}
                  >
                    <Input placeholder="Enter product name" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Quantity" name="quantity">
                    <Space.Compact>
                      <Button
                        onClick={() => {
                          const current =
                            formInstance.getFieldValue("quantity") || 1;
                          formInstance.setFieldsValue({
                            quantity: Math.max(0, current - 1),
                          });
                        }}
                      >
                        –
                      </Button>
                      <InputNumber
                        value={formInstance.getFieldValue("quantity")}
                        onChange={(v) =>
                          formInstance.setFieldsValue({ quantity: v })
                        }
                        style={{ width: "78%", textAlign: "center" }}
                      />
                      <Button
                        onClick={() => {
                          const current =
                            formInstance.getFieldValue("quantity") || 0;
                          formInstance.setFieldsValue({
                            quantity: current + 1,
                          });
                        }}
                      >
                        +
                      </Button>
                    </Space.Compact>
                  </Form.Item>
                </Col>
              </Row>

              {/* Category + Price */}
              <Row gutter={[16, 16]}>
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
                <Col xs={24} md={12}>
                  <Form.Item label="Price" name="price">
                    <Space.Compact>
                      <InputNumber style={{ width: "70%" }} />
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

              {/* Description */}
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please enter description" },
                ]}
              >
                <TextArea rows={4} placeholder="Type product details here" />
              </Form.Item>

              {/* Buttons */}
              <Form.Item>
                <div style={{ textAlign: "right" }}>
                  <Button
                    style={{ marginRight: 8 }}
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    {editItem ? "Update" : "Publish"}
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreateItem;
