import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import HeaderRestaurant from '../../components/HeaderRestaurant'
import HeroRestaurant from '../../components/HeroRestaurant'
import DishesList from '../../components/DishesList'
import Sidebar from '../../components/Sidebar'

import { useGetHeroRestaurantQuery } from '../../services/api'
import { RootReducer } from '../../store'
import { useEffect } from 'react'

const Restaurante = () => {
  const { id } = useParams()
  const { data: restaurante } = useGetHeroRestaurantQuery(id as string)

  const { isOpen: isOpenCart } = useSelector((state: RootReducer) => state.cart)
  const { isOpen: isOpenDelivery } = useSelector(
    (state: RootReducer) => state.delivery
  )
  const { isOpen: isOpenPayment } = useSelector(
    (state: RootReducer) => state.payment
  )

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

  return (
    <>
      <HeaderRestaurant />
      <HeroRestaurant
        image={restaurante.capa}
        titulo={restaurante.titulo}
        type={restaurante.tipo}
      />
      <DishesList />
      {isOpenCart && <Sidebar content="cart" />}
      {isOpenDelivery && <Sidebar content="delivery" />}
      {isOpenPayment && <Sidebar content="payment" />}
    </>
  )
}

export default Restaurante
