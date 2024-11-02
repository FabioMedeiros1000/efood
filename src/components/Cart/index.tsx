import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'

import excluir from '../../assets/images/excluir.svg'

import { closeCart, deleteToCart } from '../../store/reducers/cart'

import { convertToCurrency } from '../ListaDePratos'

import {
  Aside,
  Button,
  CartContainer,
  Item,
  Overlay,
  PriceContainer
} from './styles'

const Cart = () => {
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart)
  const dispatch = useDispatch()

  const TotalPrice = () => {
    return items.reduce((acumulador, valorAtual) => {
      return (acumulador += valorAtual.preco)
    }, 0)
  }

  return (
    <CartContainer className={isOpen ? 'is-open' : ''}>
      <Overlay onClick={() => dispatch(closeCart())} />
      <Aside>
        <ul>
          {items.map((item) => (
            <Item key={item.id}>
              <img src={item.foto} alt={item.nome} />
              <div>
                <h3>{item.nome}</h3>
                <p>{convertToCurrency(item.preco)}</p>
              </div>
              <img
                onClick={() => dispatch(deleteToCart(item.id))}
                src={excluir}
                alt="Botão para excluir do carrinho"
              />
            </Item>
          ))}
        </ul>
        <PriceContainer>
          <p>Valor Total</p>
          <p>{convertToCurrency(TotalPrice())}</p>
        </PriceContainer>
        <Button>Continuar com a entrega</Button>
      </Aside>
    </CartContainer>
  )
}

export default Cart
