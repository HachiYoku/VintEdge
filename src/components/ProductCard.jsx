import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {  Card } from 'antd';



const { Meta } = Card;
const ProductCard = ({ product }) => { // Accept the product prop
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt={product.title} 
          src={product.image} style={{ height: 200}}
        />
        
      }
      actions={[
        <Link to="/cart" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', color: '#000' }}>
          <FaCartShopping />
          <span>Add to Cart</span>
        </Link>,
      ]}
    >
      <Meta
        title={product.title}
      />
      <div style={{ marginTop: '10px', fontSize: '18px', fontWeight: 'normal' }}>
        <p>Stock:{product.rating.count}</p>
        <p>${product.price}</p>
      </div>
    </Card>
  );
};
export default ProductCard;