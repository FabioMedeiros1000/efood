import Cart from '../Cart'
import Delivery from '../Delivery'
import { Aside, CartContainer, Overlay } from './styles'

import { useDispatch, useSelector } from 'react-redux'

import { clearCart, closeCart } from '../../store/reducers/cart'
import {
  clearDelivery,
  closeDelivery,
  setFormCompletedToFalse
} from '../../store/reducers/delivery'
import {
  clearPayment,
  closePayment,
  setFormCompleted
} from '../../store/reducers/payment'

import { closeConfirmed } from '../../store/reducers/confirmed'

import Payment from '../Payment'
import { RootReducer } from '../../store'

type Props = {
  content: 'cart' | 'delivery' | 'payment' | 'confirmed'
}

const Sidebar = ({ content }: Props) => {
  const dispatch = useDispatch()
  const { isOpen } = useSelector((state: RootReducer) => state.confirmed)

  return (
    <CartContainer className={content ? 'is-open' : ''}>
      <Overlay
        onClick={() => {
          if (content === 'cart') {
            dispatch(closeCart())
          }
          if (content === 'delivery') {
            dispatch(closeDelivery())
          }
          if (content === 'payment') {
            dispatch(closePayment())
          }
          if (isOpen) {
            dispatch(closeConfirmed())
            dispatch(closeDelivery())
            dispatch(closePayment())
            dispatch(clearCart())
            dispatch(clearDelivery())
            dispatch(clearPayment())
            dispatch(setFormCompletedToFalse())
            dispatch(setFormCompleted(false))
          }
        }}
      />
      <Aside>
        {content === 'cart' && <Cart />}
        {content === 'delivery' && <Delivery />}
        {content === 'payment' && <Payment />}
      </Aside>
    </CartContainer>
  )
}

export default Sidebar
