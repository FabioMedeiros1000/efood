import logo from '../../assets/images/logo-efood.svg'
import instagram from '../../assets/images/instagram.svg'
import facebook from '../../assets/images/facebook.svg'
import twitter from '../../assets/images/twitter.svg'
import backgroundPng from '../../assets/images/fundo-footer.png'

import * as S from './styles'

const Footer = () => (
  <S.Container style={{ backgroundImage: `url(${backgroundPng})` }}>
    <img src={logo} alt="Logo da efood" />
    <S.BoxSocialMedia>
      <img src={instagram} alt="Logo do instagram" />
      <img src={facebook} alt="Logo do facebook" />
      <img src={twitter} alt="Logo do twitter" />
    </S.BoxSocialMedia>
    <p>
      A efood é uma plataforma para divulgação de estabelecimentos, a
      responsabilidade pela entrega, qualidade <br />
      dos produtos é toda do estabelecimento contratado.
    </p>
  </S.Container>
)

export default Footer
