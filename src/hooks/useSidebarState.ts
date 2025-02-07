import { useSelector } from 'react-redux'

import { RootReducer } from '../store'

export const useSidebarState = () => {
  const isOpenCart = useSelector((state: RootReducer) => state.cart.isOpen)
  const isOpenDelivery = useSelector(
    (state: RootReducer) => state.delivery.isOpen
  )
  const isOpenPayment = useSelector(
    (state: RootReducer) => state.payment.isOpen
  )

  return { isOpenCart, isOpenDelivery, isOpenPayment }
}
