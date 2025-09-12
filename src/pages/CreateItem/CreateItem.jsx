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
import "../../styles/pages/CreateItem.css";

const { TextArea } = Input;
const { Option } = Select;

const CreateItem = () => {
  const { addItem, updateItem } = useItems();
  const navigate = useNavigate();
  const location = useLocation();
  const editItem = location.state?.item || null;

  const [formInstance] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (editItem) {
      formInstance.setFieldsValue(editItem);
      setImagePreview(editItem.image || null);
    }
  }, [editItem, formInstance]);

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
    <div className="create-item-page">
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
        className="create-item-form"
      >
        <Row gutter={[24, 24]}>
          {/* Left Column */}
          <Col xs={24} lg={8} className="left-column">
            {/* Image Card */}
            <Card title="Product Image" className="create-item-card">
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} sm={12}>
                  <Upload showUploadList={false} beforeUpload={handleImage}>
                    <div className="create-item-upload-box">
                      <UploadOutlined className="upload-icon" />
                    </div>
                  </Upload>
                </Col>
                <Col xs={24} sm={12}>
                  <div className="create-item-image-preview">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="preview"
                        className="preview-img"
                      />
                    ) : (
                      <span className="preview-text">Preview</span>
                    )}
                  </div>
                </Col>
              </Row>
            </Card>

            {/* Condition Card */}
            <Card title="Condition" className="create-item-card">
              <Form.Item
                name="condition"
                rules={[
                  { required: true, message: "Please select a condition" },
                ]}
              >
                <Radio.Group className="create-item-condition">
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

          {/* Right Column */}
          <Col xs={24} lg={16} className="right-column">
            <Card title="Product Details" className="create-item-card">
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
                              className="qty-btn"
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
                              className="qty-input"
                            />
                            <Button
                              className="qty-btn"
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
                      <InputNumber className="price-input" min={0} />
                      <Form.Item name="currency" noStyle>
                        <Select className="currency-select">
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
                <div className="form-buttons">
                  <Button className="cancel-btn" onClick={() => navigate(-1)}>
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="publish-btn"
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
