import removeIcon from '../../assets/images/excluir.svg'

import { convertToCurrency } from '../../utils'

import * as S from './styles'

type CartItemProps = {
  item: DishProps
  onDelete: (id: number) => void
}

const CartItem = ({ item, onDelete }: CartItemProps) => (
  <S.Item key={item.id}>
    <img src={item.foto} alt={item.nome} />
    <div>
      <h3>{item.nome}</h3>
      <p>{convertToCurrency(item.preco)}</p>
    </div>
    <img
      title="Clique para excluir esse item do carrinho"
      onClick={() => onDelete(item.id)}
      src={removeIcon}
      alt="Botão para excluir do carrinho"
    />
  </S.Item>
)

export default CartItem
