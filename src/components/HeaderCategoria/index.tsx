import { Container } from './styles'

import logo from '../../assets/images/logo-efood.svg'
import fundo from '../../assets/images/fundo-header-categoria.png'
import { Link } from 'react-router-dom'

const HeaderCategoria = () => (
  <Container style={{ backgroundImage: `url(${fundo})` }}>
    <div className="container">
      <p>Restaurantes</p>
      <Link to={'/'}>
        <img src={logo} alt="logo da efood" />
      </Link>
      <p>0 produto(s) no carrinho</p>
    </div>
  </Container>
)

export default HeaderCategoria
