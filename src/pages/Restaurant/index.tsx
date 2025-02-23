import { useParams } from 'react-router-dom'

import HeaderRestaurant from '../../components/HeaderRestaurant'
import HeroRestaurant from '../../components/HeroRestaurant'
import DishesList from '../../components/DishesList'
import Sidebar from '../../components/Sidebar'

import { useGetHeroRestaurantQuery } from '../../services/api'
import { useSidebar } from '../../hooks/useSidebar'
import useAuth from '../../hooks/useAuth'

const Restaurante = () => {
  const { id } = useParams()
  const { data: restaurante } = useGetHeroRestaurantQuery(id as string)

  const { isOpenCart, isOpenDelivery, isOpenPayment } = useSidebar()

  useAuth()

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
