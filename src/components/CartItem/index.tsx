import Loading from '../Loading'

import removeIcon from '../../assets/images/excluir.svg'
import { convertToCurrency } from '../../utils/functions'

import * as S from './styles'
import { colors } from '../../styles'

type CartItemProps = {
  item: DishProps
  onDelete: (id: number) => void
  isDeleting: boolean
}

const CartItem = ({ item, onDelete, isDeleting }: CartItemProps) => {
  return (
    <S.Item key={item.id}>
      <img className="photoDish" src={item.foto} alt={item.nome} />
      <div>
        <h3>{item.nome}</h3>
        <p>{convertToCurrency(item.preco)}</p>
      </div>
      <div className="deleteFromCart">
        {isDeleting ? (
          <Loading color={colors.red} height={20} />
        ) : (
          <img
            src={removeIcon}
            alt="Botão para excluir do carrinho"
            onClick={() => onDelete(item.id)}
            title="Clique para excluir esse item do carrinho"
          />
        )}
      </div>
    </S.Item>
  )
}

export default CartItem
