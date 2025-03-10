import Button from '../Button'
import Loading from '../Loading'

import * as S from './styles'

import { colors } from '../../styles'

type Props = {
  id: string
  image: string
  title: string
  description: string
  onClick: () => void
  onAddToCart: () => void
  isLoading: boolean
}

const Dish = ({
  id,
  image,
  title,
  description,
  onClick,
  onAddToCart,
  isLoading
}: Props) => {
  return (
    <S.Card
      title="Clique aqui para ter mais informações sobre esse prato"
      onClick={onClick}
      className="container"
    >
      <img src={image} alt={title} />
      <S.Title>{title}</S.Title>
      <p>{description}</p>
      <Button
        disabled={isLoading}
        title="Clique aqui para adicionar ao carrinho"
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onAddToCart()
        }}
      >
        {isLoading ? (
          <Loading color={colors.red} height={15} />
        ) : (
          'Adicionar ao carrinho'
        )}
      </Button>
    </S.Card>
  )
}

export default Dish
