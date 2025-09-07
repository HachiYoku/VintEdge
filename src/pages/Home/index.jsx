
import CategoryListing from '../../components/CategoryListing';
import FlashSaleListing from '../../components/FlashSaleListing';
import HomeCarousel from '../../components/HomeCarousel';
import PopularItemListing from '../../components/PopularItemListing';
import { useOutletContext } from 'react-router-dom';
import '../../styles/pages/Home.css'

const Home = () => {
  const { products } = useOutletContext();

  return (
    <div>
      <HomeCarousel />
      <CategoryListing />
      {products.length > 0 && <PopularItemListing products={products} />}
      <FlashSaleListing />
    </div>
  )
}

export default Home