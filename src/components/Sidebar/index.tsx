import { useDispatch, useSelector } from 'react-redux'

import Cart from '../Cart'
import Delivery from '../Delivery'
import Payment from '../Payment'

import { closeCart } from '../../store/reducers/cart'
import { closeDelivery } from '../../store/reducers/delivery'
import { closePayment } from '../../store/reducers/payment'
import { RootState } from '../../store'
import { closeAndCleanAll } from '../../utils/functions'

import * as S from './styles'

type Props = {
  content: 'cart' | 'delivery' | 'payment' | 'confirmed'
}

const Sidebar = ({ content }: Props) => {
  const dispatch = useDispatch()
  const { isOpen } = useSelector((state: RootState) => state.confirmed)

  const handleCloseSidebar = (content: string, isOpen: boolean) => {
    if (content === 'cart') {
      dispatch(closeCart())
    } else if (content === 'delivery') {
      dispatch(closeDelivery())
    } else if (content === 'payment') {
      dispatch(closePayment())
    }

    if (isOpen) {
      closeAndCleanAll(dispatch)
    }
  }

  return (
    <S.CartContainer className={content ? 'is-open' : ''}>
      <S.Overlay onClick={() => handleCloseSidebar(content, isOpen)} />
      <S.Aside>
        {content === 'cart' && <Cart />}
        {content === 'delivery' && <Delivery />}
        {content === 'payment' && <Payment />}
      </S.Aside>
    </S.CartContainer>
  )
}

export default Sidebar
