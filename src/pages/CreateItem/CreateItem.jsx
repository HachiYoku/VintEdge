import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import { useItems } from "../../context/ItemContext";
import {
  Row,
  Col,
  Card,
  Input,
  InputNumber,
  Button,
  Upload,
  Radio,
  Space,
  Form,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../../styles/pages/CreateItem.css";
import api from "../../api/client";
import { normalizeProduct } from "../../api/normalizeProduct";

const { TextArea } = Input;

const CreateItem = () => {
  const { addItem, updateItem } = useItems();
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshProducts } = useOutletContext() || {};
  const editItem = location.state?.item || null;

  const [formInstance] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageDirty, setImageDirty] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editItem) {
      formInstance.setFieldsValue(editItem);
      setImagePreview(editItem.image || null);
      setImageFile(null);
      setImageDirty(false);
    }
  }, [editItem, formInstance]);

  const handleImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setImagePreview(base64);
      setImageFile(file);
      setImageDirty(true);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handleSubmit = async (values) => {
    const priceNumber = Number(values.price);
    if (!Number.isFinite(priceNumber) || priceNumber < 0) {
      message.error("Please enter a valid price");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("price", String(priceNumber));
    formData.append("currency", "MMK");
    formData.append("quantity", String(Number(values.quantity || 0)));
    formData.append("condition", values.condition);

    if (!editItem && imageFile) {
      formData.append("image", imageFile);
    }

    if (editItem && imageDirty && imageFile) {
      formData.append("image", imageFile);
    }

    try {
      setSubmitting(true);
      let saved;
      if (editItem) {
        const id = editItem._id || editItem.id;
        const res = await api.put(`/product/${id}`, formData);
        saved = res.data;
      } else {
        const res = await api.post("/product", formData);
        saved = res.data;
      }

      const normalized = normalizeProduct(saved);
      if (editItem) {
        updateItem(normalized);
      } else {
        addItem(normalized);
      }

      if (typeof refreshProducts === "function") {
        await refreshProducts();
      }

      navigate("/profile");
    } catch (err) {
      message.error(err.response?.data?.message || "Save failed");
    } finally {
      setSubmitting(false);
    }
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
                    <Input placeholder="Enter category" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                      { required: true, message: "Please enter a price" },
                    ]}
                  >
                    <Space.Compact>
                      <InputNumber
                        className="price-input"
                        min={0}
                        precision={2}
                        stringMode
                      />
                      <Input value="MMK" disabled className="currency-select" />
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
                    loading={submitting}
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
