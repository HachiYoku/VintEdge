
import CategoryListing from '../../components/CategoryListing';
import FlashSaleListing from '../../components/FlashSaleListing';
import HomeCarousel from '../../components/HomeCarousel';
import '../../styles/pages/Home.css'

const Home = () => {
  

  return (
    <div>
      <HomeCarousel />
      <CategoryListing/>
      <FlashSaleListing />
    </div>
  )
}

export default Home