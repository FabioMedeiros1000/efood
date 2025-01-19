import { useEffect } from 'react'

import RestaurantList from '../../components/RestaurantList'
import HomeHero from '../../components/HomeHero'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <>
      <HomeHero logout={true} />
      <RestaurantList />
    </>
  )
}

export default Home
