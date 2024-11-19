import * as S from './styles'

type Props = {
  image: string
  title: string
  description: string
  onClick: () => void
}

const Prato = ({ image, title, description, onClick }: Props) => {
  return (
    <S.Card
      title="Clique aqui para ter mais informações sobre esse prato"
      onClick={onClick}
      className="container"
    >
      <img src={image} alt={title} />
      <S.Title>{title}</S.Title>
      <p>{description}</p>
      <S.Botao>Adicionar ao carrinho</S.Botao>
    </S.Card>
  )
}

export default Prato
