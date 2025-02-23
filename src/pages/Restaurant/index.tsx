import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import HeaderRestaurant from '../../components/HeaderRestaurant'
import HeroRestaurant from '../../components/HeroRestaurant'
import DishesList from '../../components/DishesList'
import Sidebar from '../../components/Sidebar'

import { useGetHeroRestaurantQuery } from '../../services/api'
import { useSidebar } from '../../hooks/useSidebar'

const Restaurante = () => {
  const { id } = useParams()
  const { data: restaurante } = useGetHeroRestaurantQuery(id as string)

  const { isOpenCart, isOpenDelivery, isOpenPayment } = useSidebar()

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if (!token) {
      navigate('/login', { replace: true })
      return
    }

    fetch('https://efood-backend.onrender.com/api/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data?.user) {
          localStorage.removeItem('authToken')
          navigate('/login', { replace: true })
        }
      })
  }, [navigate])

  if (!id || !restaurante) {
    return null
  }

  const openSidebarContent = isOpenCart
    ? 'cart'
    : isOpenDelivery
    ? 'delivery'
    : isOpenPayment
    ? 'payment'
    : null

  return (
    <>
      <HeaderRestaurant />
      <HeroRestaurant
        image={restaurante.capa}
        titulo={restaurante.titulo}
        type={restaurante.tipo}
      />
      <DishesList />
      {openSidebarContent && <Sidebar content={openSidebarContent} />}
    </>
  )
}

export default Restaurante
