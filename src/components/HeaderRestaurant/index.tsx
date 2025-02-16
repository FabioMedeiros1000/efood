import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { openCart } from '../../store/reducers/cart'

import logo from '../../assets/images/logo-efood.svg'
import backgroundPng from '../../assets/images/fundo-header-categoria.png'

import * as S from './styles'
import { useSidebarItems } from '../../hooks/useSidebar'

const HeaderRestaurant = () => {
  const { cartItems } = useSidebarItems()

  const dispatch = useDispatch()

  return (
    <S.Container style={{ backgroundImage: `url(${backgroundPng})` }}>
      <div className="container">
        <p>Restaurantes</p>
        <Link to={'/'}>
          <img
            src={logo}
            alt="logo da efood"
            title="Clique aqui para voltar à Home"
          />
        </Link>
        <S.ButtonCart
          role="button"
          title="Clique aqui para ver os itens no carrinho"
          onClick={() => dispatch(openCart())}
        >
          {cartItems.length} produto(s) no carrinho
        </S.ButtonCart>
      </div>
    </S.Container>
  )
}

export default HeaderRestaurant
