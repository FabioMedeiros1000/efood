import { useSelector } from 'react-redux'

import { RootState } from '../store'

export const useSidebar = () => {
  const isOpenCart = useSelector((state: RootState) => state.cart.isOpen)
  const isOpenDelivery = useSelector(
    (state: RootState) => state.delivery.isOpen
  )
  const isOpenPayment = useSelector((state: RootState) => state.payment.isOpen)

  return { isOpenCart, isOpenDelivery, isOpenPayment }
}
