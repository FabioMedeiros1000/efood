import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import HeaderCategoria from '../../components/HeaderCategoria'
import HeroCategoria from '../../components/HeroCategoria'
import ListaDePratos from '../../components/ListaDePratos'

import { RestauranteProps } from '../../components/ListaDeRestaurantes'
import Cart from '../../components/Cart'

const Restaurante = () => {
  const { id } = useParams()
  const [restaurante, setRestaurante] = useState<RestauranteProps>()

  useEffect(() => {
    fetch(`https://fake-api-tau.vercel.app/api/efood/restaurantes/${id}`)
      .then((res) => res.json())
      .then((res) => setRestaurante(res))
  }, [id])

  if (!restaurante) {
    return null
  }

  return (
    <>
      <HeaderCategoria />
      <HeroCategoria
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
