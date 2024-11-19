import logo from '../../assets/images/logo-efood.svg'
import fundo from '../../assets/images/fundo-hero.png'

import * as S from './styles'

const Hero = () => {
  return (
    <S.Container style={{ backgroundImage: `url(${fundo})` }}>
      <img src={logo} alt="logo da efood" title="logo da efood" />
      <S.Title>Viva experiências gastronômicas no conforto da sua casa</S.Title>
    </S.Container>
  )
}

export default Hero
