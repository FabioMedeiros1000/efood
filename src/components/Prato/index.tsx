import { Botao, Card, Title } from './styles'

type Props = {
  image: string
  title: string
  description: string
}

const Prato = ({ image, title, description }: Props) => (
  <Card className="container">
    <img src={image} alt={title} />
    <Title>{title}</Title>
    <p>{description}</p>
    <Botao>Adicionar ao carrinho</Botao>
  </Card>
)

export default Prato
