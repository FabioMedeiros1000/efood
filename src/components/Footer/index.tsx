import logo from '../../assets/images/logo-efood.svg'
import instagram from '../../assets/images/instagram.svg'
import facebook from '../../assets/images/facebook.svg'
import twitter from '../../assets/images/twitter.svg'
import fundo from '../../assets/images/fundo-footer.png'
import { BoxSocialMedia, Container } from './styles'

const Footer = () => (
  <Container style={{ backgroundImage: `url(${fundo})` }}>
    <img src={logo} alt="Logo da efood" />
    <BoxSocialMedia>
      <img src={instagram} alt="Logo do instagram" />
      <img src={facebook} alt="Logo do facebook" />
      <img src={twitter} alt="Logo do twitter" />
    </BoxSocialMedia>
    <p>
      A efood é uma plataforma para divulgação de estabelecimentos, a
      responsabilidade pela entrega, qualidade <br />
      dos produtos é toda do estabelecimento contratado.
    </p>
  </Container>
)

export default Footer
