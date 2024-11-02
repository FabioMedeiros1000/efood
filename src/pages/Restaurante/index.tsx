import { useParams } from 'react-router-dom'

import HeaderRestaurante from '../../components/HeaderRestaurante'
import HeroRestaurante from '../../components/HeroRestaurante'
import ListaDePratos from '../../components/ListaDePratos'

import Cart from '../../components/Cart'
import { useGetHeroRestaurantQuery } from '../../services/api'

const Restaurante = () => {
  const { id } = useParams()

  const { data: restaurante } = useGetHeroRestaurantQuery(id!)

  if (!id) {
    return null
  }

  if (!restaurante) {
    return null
  }

  return (
    <>
      <HeaderRestaurante />
      <HeroRestaurante
        image={restaurante.capa}
        titulo={restaurante.titulo}
        type={restaurante.tipo}
      />
      <ListaDePratos />
      <Cart />
    </>
  )
}

export default Restaurante
