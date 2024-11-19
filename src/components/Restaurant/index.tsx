import Tag from '../Tag'

import starIcon from '../../assets/images/estrelinha.svg'

import * as S from './styles'

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

const Restaurant = ({ image, title, description, score, infos, id }: Props) => {
  return (
    <S.Card>
      <img src={image} alt={title} />
      <S.Container>
        <S.BoxTitle>
          <h2>{title}</h2>
          <S.BoxAvaliation>
            {score}
            <img src={starIcon} alt="Ícone de uma estrelinha" />
          </S.BoxAvaliation>
        </S.BoxTitle>
        <p>{trimDescription(description)}</p>
        <S.Botao
          title="Clique aqui para saber mais sobre o restaurante"
          to={`/restaurante/${id}`}
        >
          Saiba mais
        </S.Botao>
      </S.Container>
      <S.TagContainer>
        {infos.map((info) => (
          <Tag key={info}>{info}</Tag>
        ))}
      </S.TagContainer>
    </S.Card>
  )
}

export default Restaurant
