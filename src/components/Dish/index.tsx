import Button from '../Button'
import * as S from './styles'

type Props = {
  image: string
  title: string
  description: string
  onClick: () => void
  onAddToCart: () => void
}

const Dish = ({ image, title, description, onClick, onAddToCart }: Props) => {
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
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onAddToCart()
        }}
      >
        Adicionar ao carrinho
      </Button>
    </S.Card>
  )
}

export default Dish
