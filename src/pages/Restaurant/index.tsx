import { useNavigate, useParams } from 'react-router-dom'

import HeaderRestaurant from '../../components/HeaderRestaurant'
import HeroRestaurant from '../../components/HeroRestaurant'
import DishesList from '../../components/DishesList'
import Sidebar from '../../components/Sidebar'

import { useGetHeroRestaurantQuery } from '../../services/api'
import { useEffect } from 'react'
import { useSidebarState } from '../../hooks/useSidebar'

const Restaurante = () => {
  const { id } = useParams()
  const { data: restaurante } = useGetHeroRestaurantQuery(id as string)

  const { isOpenCart, isOpenDelivery, isOpenPayment } = useSidebarState()

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if (!token) {
      navigate('/login', { replace: true })
    }
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
