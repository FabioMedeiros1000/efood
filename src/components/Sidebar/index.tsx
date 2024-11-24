import { useDispatch, useSelector } from 'react-redux'

import Cart from '../Cart'
import Delivery from '../Delivery'
import Payment from '../Payment'

import { closeCart } from '../../store/reducers/cart'
import { closeDelivery } from '../../store/reducers/delivery'
import { closePayment } from '../../store/reducers/payment'

import { RootReducer } from '../../store'

import * as S from './styles'
import { closeAndCleanAll } from '../../utils'

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
            closeAndCleanAll(dispatch)
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
