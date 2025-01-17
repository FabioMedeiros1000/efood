import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import RestaurantList from '../../components/RestaurantList'
import HomeHero from '../../components/HomeHero'

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authToken')

    if (!isAuthenticated) {
      navigate('/login', { replace: true })
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
