import { useDispatch } from 'react-redux'

import Button from '../Button'
import CartItem from '../CartItem'

import { closeCart } from '../../store/reducers/cart'
import { openDelivery } from '../../store/reducers/delivery'
import { convertToCurrency } from '../../utils/functions'
import { TotalPrice } from '../../utils/functions'
import { useSidebarItems } from '../../hooks/useSidebar'

import * as S from './styles'

const Cart = () => {
  const { cartItems: items, setCartItems, setError } = useSidebarItems()
  const dispatch = useDispatch()

  const handleDeleteItem = async (dishId: number) => {
    try {
      const userId = Number(localStorage.getItem('userId'))

      if (!userId) {
        throw new Error('Usuário não autenticado')
      }

      const response = await fetch(
        `https://efood-backend.onrender.com/api/cart/${userId}/${dishId}`,
        {
          method: 'DELETE'
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao remover item do carrinho')
      }

      const updatedCart = await response.json()

      setCartItems([...updatedCart.items])
    } catch (error: any) {
      console.error('Erro ao deletar item:', error.message)
      setError(error.message)
    }
  }

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
            onDelete={() => handleDeleteItem(item.id)}
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
