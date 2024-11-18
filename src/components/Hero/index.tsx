import logo from '../../assets/images/logo-efood.svg'
import fundo from '../../assets/images/fundo-hero.png'
import { Container, Title } from './styles'

const Hero = () => {
  return (
    <Container style={{ backgroundImage: `url(${fundo})` }}>
      <img src={logo} alt="logo da efood" title="logo da efood" />
      <Title>Viva experiências gastronômicas no conforto da sua casa</Title>
    </Container>
  )
}

export default Hero
