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

  const [form, setForm] = useState({
    title: "",
    quantity: 1,
    category: "",
    location: "",
    description: "",
    condition: "Brand New",
    price: 0,
    currency: "MMK",
    image: null,
    date: "",
  });

  // Prefill form if editing
  useEffect(() => {
    if (editItem) setForm(editItem);
  }, [editItem]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (file) => {
    if (file) setForm({ ...form, image: URL.createObjectURL(file) });
  };

  const handleSubmit = () => {
    if (editItem) {
      updateItem({ ...form, id: editItem.id });
    } else {
      addItem({
        ...form,
        id: Date.now(),
        type: "sell",
        date: new Date().toISOString(),
      });
    }
    navigate("/profile");
  };

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[24, 24]}>
        {/* Left Column: Image + Condition */}
        <Col xs={24} lg={8}>
          <Card title="Product Image">
            <Row gutter={16}>
              <Col xs={12}>
                <Upload
                  showUploadList={false}
                  beforeUpload={(file) => {
                    handleImage(file);
                    return false; // prevent auto upload
                  }}
                >
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
                  {form.image ? (
                    <img
                      src={form.image}
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
          <Card title="Condition" style={{ marginTop: 16 }}>
            <Radio.Group
              value={form.condition}
              onChange={(e) => setForm({ ...form, condition: e.target.value })}
            >
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
          </Card>
        </Col>

        {/* Right Column: Details */}
        <Col xs={24} lg={16}>
          <Card title="Product Details">
            <Form layout="vertical" onFinish={handleSubmit}>
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
                    <Input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Enter product name"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Quantity">
                    <Space.Compact>
                      <Button
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            quantity: Math.max(0, f.quantity - 1),
                          }))
                        }
                      >
                        –
                      </Button>
                      <InputNumber
                        value={form.quantity}
                        onChange={(v) => setForm({ ...form, quantity: v })}
                        style={{ width: "78%", textAlign: "center" }}
                      />
                      <Button
                        onClick={() =>
                          setForm((f) => ({ ...f, quantity: f.quantity + 1 }))
                        }
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
                    <Select
                      value={form.category}
                      onChange={(v) => setForm({ ...form, category: v })}
                      placeholder="Select category"
                    >
                      <Option value="Electronics">Electronics</Option>
                      <Option value="Clothing">Clothing</Option>
                      <Option value="Books">Books</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Price">
                    <Space.Compact>
                      <InputNumber
                        value={form.price}
                        onChange={(v) => setForm({ ...form, price: v })}
                        style={{ width: "70%" }}
                      />
                      <Select
                        value={form.currency}
                        onChange={(v) => setForm({ ...form, currency: v })}
                        style={{ width: "30%" }}
                      >
                        <Option value="MMK">MMK</Option>
                        <Option value="USD">USD</Option>
                        <Option value="THB">THB</Option>
                      </Select>
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
                <TextArea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={4}
                  placeholder="Type product details here"
                />
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
