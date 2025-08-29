import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useItems } from "../../context/ItemContext"; // ✅

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
    image: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = () => {
    addItem(form);
    navigate("/profile");
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {/* Left column */}
        <div className="col-md-4 d-flex">
          <div className="card p-3 text-center w-100 h-100">
            <input type="file" accept="image/*" onChange={handleImage} />
            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className="img-fluid mt-2 rounded"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
            )}

            {/* Condition */}
            <div className="text-start ">
              <label
                className="form-label"
                style={{
                  marginRight: "8px",
                  fontWeight: "500",
                }}
              >
                Condition:
              </label>
              <select
                name="condition"
                value={form.condition}
                onChange={handleChange}
                className="form-select d-inline-block"
                style={{ width: "auto", display: "inline-block" }}
              >
                <option>Brand New</option>
                <option>Like New</option>
                <option>Good</option>
                <option>Fair</option>
                <option>Worn</option>
                <option>For parts/not working</option>
              </select>
            </div>

            {/* Price with currency */}
            <div className="text-start d-flex align-items-center">
              <label
                className="form-label"
                style={{ marginRight: "8px", fontWeight: "500" }}
              >
                Price:
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="form-control"
                style={{
                  width: "120px",
                  marginRight: "8px",
                  display: "inline-block",
                }}
              />
              <select
                name="currency"
                value={form.currency || "MMK"}
                onChange={handleChange}
                className="form-select"
                style={{ width: "100px", display: "inline-block" }}
              >
                <option value="MMK">MMK</option>
                <option value="USD">USD</option>
                <option value="THB">Baht</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="col-md-8 d-flex">
          <div className="card p-4 w-100 h-100">
            <input
              type="text"
              name="title"
              placeholder="Product name"
              value={form.title}
              onChange={handleChange}
              className="form-control mb-3"
            />

            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
              className="form-control mb-3"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="form-control mb-3"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="form-control mb-3"
              rows="6"
            />

            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-secondary">Cancel</button>
              <button onClick={handleSubmit} className="btn btn-primary">
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
