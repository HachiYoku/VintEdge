import { FaCartShopping } from "react-icons/fa6";
import { Card, Button, Image } from "antd";
import { useCart } from "../context/CartContext";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <Image.PreviewGroup>
          <Image
            alt={product.title}
            src={product.image}
            style={{ height: 200, objectFit: "contain",padding:"10px" }}
          />
        </Image.PreviewGroup>
      }
      actions={[
        <Button
          type="primary"
          icon={<FaCartShopping />}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>,
      ]}
    >
      <Meta title={product.title} />
      <div style={{ marginTop: "10px", fontSize: "18px", fontWeight: "normal" }}>
        <p>Stock: {product.rating.count}</p>
        <p>${product.price}</p>
      </div>
    </Card>
  );
};

export default ProductCard;
