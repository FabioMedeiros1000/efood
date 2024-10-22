import { Botao, Card, Title } from './styles'

type Props = {
  image: string
  title: string
  description: string
  onClick: () => void
}

const Prato = ({ image, title, description, onClick }: Props) => (
  <Card onClick={onClick} className="container">
    <img src={image} alt={title} />
    <Title>{title}</Title>
    <p>{description}</p>
    <Botao>Adicionar ao carrinho</Botao>
  </Card>
)

export default Prato
