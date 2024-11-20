import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'

import Button from '../Button'

import { closeCart, deleteFromCart } from '../../store/reducers/cart'
import { openDelivery } from '../../store/reducers/delivery'
import { convertToCurrency } from '../../utils'
import { TotalPrice } from '../../utils'

import removeIcon from '../../assets/images/excluir.svg'

import * as S from './styles'

const Cart = () => {
  const { items } = useSelector((state: RootReducer) => state.cart)
  const dispatch = useDispatch()

  if (items.length === 0) {
    return <S.P>Sem itens no carrinho. Adicione algum item!</S.P>
  }

  return (
    <>
      <ul>
        {items.map((item) => (
          <S.Item key={item.id}>
            <img src={item.foto} alt={item.nome} />
            <div>
              <h3>{item.nome}</h3>
              <p>{convertToCurrency(item.preco)}</p>
            </div>
            <img
              title="Clique para excluir esse item do carrinho"
              onClick={() => dispatch(deleteFromCart(item.id))}
              src={removeIcon}
              alt="Botão para excluir do carrinho"
            />
          </S.Item>
        ))}
      </ul>
      <S.PriceContainer>
        <p>Valor Total</p>
        <p>{convertToCurrency(TotalPrice(items))}</p>
      </S.PriceContainer>
      <Button
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
      </Button>
    </>
  )
}

export default Cart
