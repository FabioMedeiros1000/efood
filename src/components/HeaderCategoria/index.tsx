import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'

import { ButtonCart, Container } from './styles'

import logo from '../../assets/images/logo-efood.svg'
import fundo from '../../assets/images/fundo-header-categoria.png'
import { Link } from 'react-router-dom'

import { openCart } from '../../store/reducers/cart'

const HeaderCategoria = () => {
  const { items } = useSelector((state: RootReducer) => state.cart)
  const dispatch = useDispatch()

  return (
    <Container style={{ backgroundImage: `url(${fundo})` }}>
      <div className="container">
        <p>Restaurantes</p>
        <Link to={'/'}>
          <img src={logo} alt="logo da efood" />
        </Link>
        <ButtonCart onClick={() => dispatch(openCart())}>
          {items.length} produto(s) no carrinho
        </ButtonCart>
      </div>
    </Container>
  )
}

export default HeaderCategoria
