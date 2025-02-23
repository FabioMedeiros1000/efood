import RestaurantList from '../../components/RestaurantList'
import HomeHero from '../../components/HomeHero'

import useAuth from '../../hooks/useAuth'

const Home = () => {
  useAuth()

  return (
    <>
      <HomeHero logout={true} />
      <RestaurantList />
    </>
  )
}

export default Home
