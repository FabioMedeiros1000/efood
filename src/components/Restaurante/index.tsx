import estrela from '../../assets/images/estrelinha.svg'
import Tag from '../Tag'
import {
  Botao,
  BoxAvaliation,
  BoxTitle,
  Card,
  Container,
  TagContainer
} from './styles'

export type Props = {
  image: string
  title: string
  description: string
  score: number
  infos: string[]
}

const Restaurante = ({ image, title, description, score, infos }: Props) => (
  <Card>
    <img src={image} alt={title} />
    <Container>
      <BoxTitle>
        <h2>Hioki Sushi</h2>
        <BoxAvaliation>
          {score}
          <img src={estrela} alt="Ícone de uma estrelinha" />
        </BoxAvaliation>
      </BoxTitle>
      <p>{description}</p>
      <Botao to={'/categoria'}>Saiba mais</Botao>
    </Container>
    <TagContainer>
      {infos.map((info) => (
        <Tag key={info}>{info}</Tag>
      ))}
    </TagContainer>
  </Card>
)

export default Restaurante
