import { useEffect, useState } from 'react'

import Restaurante from '../Restaurante'
import { Container } from './styles'

export type RestauranteProps = {
  avaliacao: number
  capa: string
  descricao: string
  destacado: boolean
  id: number
  tipo: string
  titulo: string
}

const ListaDeRestaurantes = () => {
  const [restaurante, setRestaurante] = useState<RestauranteProps[]>([])

  useEffect(() => {
    fetch('https://fake-api-tau.vercel.app/api/efood/restaurantes').then(
      (res) =>
        res.json().then((res) => {
          setRestaurante(res)
          console.log(res)
        })
    )
  }, [])

  const getTags = (item: RestauranteProps) => {
    const tags = []

    if (item.destacado) {
      tags.push('Destaque da semana')
    }
    tags.push(item.tipo)

    return tags
  }

  return (
    <div className="container">
      <Container>
        {restaurante.map((item) => (
          <Restaurante
            key={item.id}
            title={item.titulo}
            description={item.descricao}
            image={item.capa}
            score={item.avaliacao}
            infos={getTags(item)}
            id={item.id}
          />
        ))}
      </Container>
    </div>
  )
}

export default ListaDeRestaurantes
