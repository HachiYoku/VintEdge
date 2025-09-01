import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ProductCard from './ProductCard';
import '../styles/components/FlashSaleListing.css';
import { Button } from 'antd'; 

const FlashSaleListing = () => {
  const { products } = useOutletContext();
  const [visibleItems, setVisibleItems] = useState(8);

  const loadMoreItems = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 8);
  };

  return (
    <div>
      <h1>Flash Sale</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', padding: '20px' }}>
        {products.slice(0, visibleItems).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {visibleItems < products.length && (
        <div style={{ textAlign: 'center', margin: '10px', }}>
          <Button type="primary" onClick={loadMoreItems} style={{ padding: '10px 20px', fontSize: '16px',backgroundColor:'#c5bebeff', borderColor:'#c5bebeff' }}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default FlashSaleListing;