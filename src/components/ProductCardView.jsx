import React from "react";
import { Card, Button, message, Image } from "antd";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../styles/components/ProductDetailCard.css";

const ProductCardView = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const isOwner =
    user &&
    String(product.user?._id || product.userId || product.user) ===
      String(user._id || user.id);
  const conditionClass =
    product.condition
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/\//g, "-") || "unknown";

  return (
    <Card hoverable className="product-detail-card">
      <div className="product-detail-grid">
        <div className="product-detail-media">
          <Image.PreviewGroup>
            <Image
              src={product.image}
              alt={product.title}
              preview={true}
              className="product-detail-image"
            />
          </Image.PreviewGroup>
        </div>

        <div className="product-detail-content">
          <div className="product-detail-header">
            <h2 className="product-detail-title">{product.title}</h2>
            <span className={`condition-tag ${conditionClass}`}>
              {product.condition || "Unknown"}
            </span>
          </div>

          <div className="product-detail-meta">
            <div className="product-detail-chip">
              Category: <span>{product.category || "General"}</span>
            </div>
            <div className="product-detail-chip">
              Stock:{" "}
              <span>
                {product.quantity ?? product.rating?.count ?? product.stock ?? 0}
              </span>
            </div>
          </div>

          <p className="product-detail-description">{product.description}</p>

          <div className="product-detail-seller-row">
            <div className="product-detail-seller">
              <img
                src={product.user?.avatar || "/profile-img.webp"}
                alt={product.user?.username || "Seller"}
                className="product-detail-avatar"
              />
              <div>
                <div className="product-detail-seller-label">Seller</div>
                <div className="product-detail-seller-name">
                  {product.user?.username ||
                    product.user?.name ||
                    product.user?.email ||
                    "Unknown"}
                </div>
              </div>
            </div>
            <div className="product-detail-price">
              {product.price} {product.currency || "MMK"}
            </div>
          </div>

          <div className="product-detail-footer">
            {isOwner ? (
              <span className="product-owner-badge">Your product</span>
            ) : (
              <Button
                type="primary"
                icon={<FaShoppingCart />}
                className="product-detail-btn"
                onClick={async () => {
                  try {
                    await addToCart(product);
                    message.success("Added to cart!");
                  } catch (err) {
                    message.error(
                      err.response?.data?.message || "Failed to add to cart"
                    );
                  }
                }}
              >
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCardView;
