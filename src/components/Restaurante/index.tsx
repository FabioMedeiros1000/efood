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
  id: number
}

export const trimDescription = (texto: string, lengthDefault = 190) => {
  if (texto.length > lengthDefault) {
    return texto.slice(0, lengthDefault - 1) + '...'
  }
  return texto
}

const Restaurante = ({
  image,
  title,
  description,
  score,
  infos,
  id
}: Props) => {
  return (
    <Card>
      <img src={image} alt={title} />
      <Container>
        <BoxTitle>
          <h2>{title}</h2>
          <BoxAvaliation>
            {score}
            <img src={estrela} alt="Ícone de uma estrelinha" />
          </BoxAvaliation>
        </BoxTitle>
        <p>{trimDescription(description)}</p>
        <Botao to={`/restaurante/${id}`}>Saiba mais</Botao>
      </Container>
      <TagContainer>
        {infos.map((info) => (
          <Tag key={info}>{info}</Tag>
        ))}
      </TagContainer>
    </Card>
  )
}

export default Restaurante
