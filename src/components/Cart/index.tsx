import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'

import Button from '../Button'

import { closeCart, deleteFromCart } from '../../store/reducers/cart'
import { openDelivery } from '../../store/reducers/delivery'
import { convertToCurrency } from '../../utils'
import { TotalPrice } from '../../utils'

import * as S from './styles'
import CartItem from '../CartItem'

const Cart = () => {
  const { items } = useSelector((state: RootReducer) => state.cart)
  const dispatch = useDispatch()

  const handleDeleteItem = (id: number) => dispatch(deleteFromCart(id))

  const handleProceedToDelivery = () => {
    dispatch(closeCart())
    if (items.length) dispatch(openDelivery())
  }

  if (items.length === 0) {
    return <S.P>Sem itens no carrinho. Adicione algum item!</S.P>
  }

  return (
    <>
      <ul>
        {items.map((item) => (
          <CartItem key={item.id} item={item} onDelete={handleDeleteItem} />
        ))}
      </ul>
      <S.PriceContainer>
        <p>Valor Total</p>
        <p>{convertToCurrency(TotalPrice(items))}</p>
      </S.PriceContainer>
      <Button
        marginBottom="24px"
        title="Clique aqui para fornecer informações de entrega"
        type="button"
        onClick={handleProceedToDelivery}
      >
        Continuar com a entrega
      </Button>
    </>
  )
}

export default Cart
