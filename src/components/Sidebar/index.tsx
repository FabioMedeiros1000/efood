import { useDispatch, useSelector } from 'react-redux'

import Cart from '../Cart'
import Delivery from '../Delivery'
import Payment from '../Payment'

import { clearCart, closeCart } from '../../store/reducers/cart'
import {
  clearDelivery,
  closeDelivery,
  setFormCompleted as setFormCompletedDelivery
} from '../../store/reducers/delivery'
import {
  clearPayment,
  closePayment,
  setFormCompleted as setFormCompletedPayment
} from '../../store/reducers/payment'
import { closeConfirmed } from '../../store/reducers/confirmed'

import { RootReducer } from '../../store'

import * as S from './styles'

type Props = {
  content: 'cart' | 'delivery' | 'payment' | 'confirmed'
}

const Sidebar = ({ content }: Props) => {
  const dispatch = useDispatch()
  const { isOpen } = useSelector((state: RootReducer) => state.confirmed)

  return (
    <S.CartContainer className={content ? 'is-open' : ''}>
      <S.Overlay
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
            dispatch(setFormCompletedDelivery(false))
            dispatch(setFormCompletedPayment(false))
          }
        }}
      />
      <S.Aside>
        {content === 'cart' && <Cart />}
        {content === 'delivery' && <Delivery />}
        {content === 'payment' && <Payment />}
      </S.Aside>
    </S.CartContainer>
  )
}

export default Sidebar
