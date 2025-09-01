import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Form,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const CreateItem = () => {
  const { addItem } = useItems();
  const navigate = useNavigate();

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
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (file) => {
    if (file) {
      setForm({ ...form, image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = () => {
    addItem(form);
    navigate("/profile");
  };

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[24, 24]}>
        {/* Left Column: Image + Condition */}
        <Col xs={24} lg={8}>
          <Card title="Product Image" className="mb-3">
            <Row gutter={[16, 16]}>
              {/* Upload Area */}
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
                    <UploadOutlined
                      style={{ fontSize: 20, marginBottom: 4, padding: 50 }}
                    />
                    {/* <div style={{ fontSize: 15 }}>Click to upload</div> */}
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

          <Card title="Condition">
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

        {/* Right Column: Product Details */}
        <Col xs={24} lg={16}>
          <Card title="Product Details">
            <Form layout="vertical">
              {/* Title + Quantity */}
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item label="Title">
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
                    <Input.Group compact>
                      <Button
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            quantity: Math.max(0, Number(f.quantity || 0) - 1),
                          }))
                        }
                      >
                        –
                      </Button>
                      <InputNumber
                        name="quantity"
                        value={form.quantity}
                        onChange={(value) =>
                          setForm({ ...form, quantity: value })
                        }
                        style={{ width: "78%", textAlign: "center" }}
                      />
                      <Button
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            quantity: Number(f.quantity || 0) + 1,
                          }))
                        }
                      >
                        +
                      </Button>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>

              {/* Category + Price */}
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item label="Category">
                    <Select
                      name="category"
                      value={form.category}
                      onChange={(value) =>
                        setForm({ ...form, category: value })
                      }
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
                    <Input.Group compact>
                      <InputNumber
                        name="price"
                        value={form.price}
                        onChange={(value) => setForm({ ...form, price: value })}
                        style={{ width: "70%" }}
                        placeholder="Enter price"
                      />
                      <Select
                        name="currency"
                        value={form.currency}
                        onChange={(value) =>
                          setForm({ ...form, currency: value })
                        }
                        style={{ width: "30%" }}
                      >
                        <Option value="MMK">MMK</Option>
                        <Option value="USD">USD</Option>
                        <Option value="THB">THB</Option>
                      </Select>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>

              {/* Description */}
              <Form.Item label="Description">
                <TextArea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Type your product details here"
                />
              </Form.Item>

              {/* Buttons */}
              <Form.Item>
                <div style={{ textAlign: "right" }}>
                  <Button style={{ marginRight: 8 }}>Cancel</Button>
                  <Button type="primary" onClick={handleSubmit}>
                    Publish
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
