import { useParams } from 'react-router-dom'

import HeaderRestaurante from '../../components/HeaderRestaurante'
import HeroRestaurante from '../../components/HeroRestaurante'
import ListaDePratos from '../../components/ListaDePratos'

import { useGetHeroRestaurantQuery } from '../../services/api'
import Sidebar from '../../components/Sidebar'
import { useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import Loading from '../../components/Loading'
import { cores } from '../../styles'

const Restaurante = () => {
  const { id } = useParams()
  const { data: restaurante, isLoading } = useGetHeroRestaurantQuery(id!)

  const { isOpen: isOpenCart } = useSelector((state: RootReducer) => state.cart)
  const { isOpen: isOpenDelivery } = useSelector(
    (state: RootReducer) => state.delivery
  )
  const { isOpen: isOpenPayment } = useSelector(
    (state: RootReducer) => state.payment
  )

  if (!id) {
    return null
  }

  if (!restaurante) {
    return null
  }

  return (
    <>
      <HeaderRestaurante />
      <HeroRestaurante
        image={restaurante.capa}
        titulo={restaurante.titulo}
        type={restaurante.tipo}
      />
      <ListaDePratos />
      {isOpenCart && <Sidebar content="cart" />}
      {isOpenDelivery && <Sidebar content="delivery" />}
      {isOpenPayment && <Sidebar content="payment" />}
    </>
  )
}

export default Restaurante
