import { useSelector } from 'react-redux'

import { RootState } from '../store'

export const useSidebarState = () => {
  const isOpenCart = useSelector((state: RootState) => state.cart.isOpen)
  const isOpenDelivery = useSelector(
    (state: RootState) => state.delivery.isOpen
  )
  const isOpenPayment = useSelector((state: RootState) => state.payment.isOpen)

  return { isOpenCart, isOpenDelivery, isOpenPayment }
}

export const useSidebarItems = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const payment = useSelector((state: RootState) => state.payment.payment)
  const delivery = useSelector((state: RootState) => state.delivery.delivery)

  return {
    cartItems,
    payment,
    delivery
  }
}
