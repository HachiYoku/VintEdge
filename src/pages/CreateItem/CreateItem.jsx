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
      >
        <Row
          gutter={[24, 24]}
          style={{ display: "flex", alignItems: "stretch" }}
        >
          {/* Left Column: Image + Condition */}
          <Col
            xs={24}
            lg={8}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
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

            <Card title="Condition" style={{ flex: 1 }}>
              <Form.Item
                name="condition"
                rules={[
                  { required: true, message: "Please select a condition" },
                ]}
              >
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
              {/* Title */}
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  { required: true, message: "Please enter a product title" },
                ]}
              >
                <Input placeholder="Enter product title" />
              </Form.Item>

              {/* Quantity + Category */}
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

              {/* Price */}
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
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateItem;
