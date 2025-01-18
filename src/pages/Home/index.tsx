import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import RestaurantList from '../../components/RestaurantList'
import HomeHero from '../../components/HomeHero'

const Home = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if (!token) {
      navigate('/login', { replace: true })
    } else {
      setIsAuthenticated(true)
    }
  }, [navigate])

  if (!isAuthenticated) return null

  return (
    <>
      <HomeHero logout={true} />
      <RestaurantList />
    </>
  )
}

export default Home
