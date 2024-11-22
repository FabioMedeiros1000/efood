import Button from '../Button'
import * as S from './styles'

type Props = {
  image: string
  title: string
  description: string
  onClick: () => void
  onAddToCart: () => void // Nova prop para adicionar ao carrinho
}

const Dish = ({ image, title, description, onClick, onAddToCart }: Props) => {
  return (
    <S.Card
      title="Clique aqui para ter mais informações sobre esse prato"
      onClick={onClick} // Abrir a modal
      className="container"
    >
      <img src={image} alt={title} />
      <S.Title>{title}</S.Title>
      <p>{description}</p>
      {/* O botão agora usa sua própria função */}
      <Button
        type="button"
        onClick={(e) => {
          e.stopPropagation() // Prevenir o evento de abrir modal
          onAddToCart()
        }}
      >
        Adicionar ao carrinho
      </Button>
    </S.Card>
  )
}

export default Dish
