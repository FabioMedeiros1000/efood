import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'

import excluir from '../../assets/images/excluir.svg'

import { closeCart, deleteToCart } from '../../store/reducers/cart'
import { openDelivery } from '../../store/reducers/delivery'

import { convertToCurrency } from '../../utils'

import { Item, PriceContainer, P } from './styles'
import { TotalPrice } from '../../utils'
import ButtonSidebar from '../ButtonSidebar'

const Cart = () => {
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart)
  const dispatch = useDispatch()

  if (items.length === 0) {
    return <P>Sem itens no carrinho. Adicione algum item!</P>
  }

  return (
    <>
      <ul>
        {items.map((item) => (
          <Item key={item.id}>
            <img src={item.foto} alt={item.nome} />
            <div>
              <h3>{item.nome}</h3>
              <p>{convertToCurrency(item.preco)}</p>
            </div>
            <img
              title="Clique para excluir esse item do carrinho"
              onClick={() => dispatch(deleteToCart(item.id))}
              src={excluir}
              alt="Botão para excluir do carrinho"
            />
          </Item>
        ))}
      </ul>
      <PriceContainer>
        <p>Valor Total</p>
        <p>{convertToCurrency(TotalPrice(items))}</p>
      </PriceContainer>
      <ButtonSidebar
        title="Clique aqui para fornecer informações de entrega"
        type="button"
        onClick={() => {
          if (items.length != 0) {
            dispatch(closeCart())
            dispatch(openDelivery())
          } else {
            dispatch(closeCart())
          }
        }}
      >
        Continuar com a entrega
      </ButtonSidebar>
    </>
  )
}

export default Cart
