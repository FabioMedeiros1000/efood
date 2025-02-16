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

  const linkReal = 'https://efood-backend.onrender.com'
  const linkLocal = 'http://localhost:5000'

  const handleDeleteItem = async (id: number) => {
    try {
      const response = await fetch(`${linkLocal}/api/cart/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Erro ao remover item do carrinho')
      }

      const updatedCart = await response.json() // Adiciona esta linha para obter os itens atualizados da resposta da API
      setCartItems(updatedCart.cartItems) // Atualiza os itens com a resposta da API
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
