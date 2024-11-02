import { Container } from './styles'

type Props = {
  image: string
  type: string
  titulo: string
}

const HeroRestaurante = ({ image, type, titulo }: Props) => {
  const capitalizeInitial = (palavra: string) => {
    return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase()
  }

  return (
    <Container style={{ backgroundImage: `url(${image})` }}>
      <div className="container">
        <p>{capitalizeInitial(type)}</p>
        <h2>{titulo}</h2>
      </div>
    </Container>
  )
}

export default HeroRestaurante
