import { useDispatch } from 'react-redux'

import Button from '../Button'
import CartItem from '../CartItem'

import { closeCart } from '../../store/reducers/cart'
import { openDelivery } from '../../store/reducers/delivery'
import { convertToCurrency } from '../../utils/functions'
import { TotalPrice } from '../../utils/functions'
import { useCart } from '../../hooks/useCart'

import * as S from './styles'

const Cart = () => {
  const { cartItems: items, removeItemFromCart, loadingRemoveItem } = useCart()
  const dispatch = useDispatch()

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
          <CartItem
            key={item.id}
            item={item}
            isDeleting={loadingRemoveItem.includes(item.id.toString())}
            onDelete={() => removeItemFromCart(item.id.toString())}
          />
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
