import React from 'react'
import { useOutletContext } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';

const Home = () => {
  const { products } = useOutletContext();
  
  console.log(products);

  return (
    <div>
      {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  )
}

export default Home