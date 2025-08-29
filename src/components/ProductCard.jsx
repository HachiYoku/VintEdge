import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';



const { Meta } = Card;
const ProductCard = ({ product }) => { // Accept the product prop
  return (
    <Card
      style={{ width: 200 }}
      cover={
        <img
          alt={product.title} 
          src={product.thumbnail} style={{ height: 200}}
        />
        
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        title={product.title}
        description={product.description}
      />
      <div style={{ marginTop: '10px', fontSize: '18px', fontWeight: 'bold' }}>
        ${product.price}
      </div>
    </Card>
  );
};
export default ProductCard;