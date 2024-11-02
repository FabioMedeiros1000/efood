import Restaurante from '../Restaurante'
import { Container } from './styles'
import { useGetRestaurantQuery } from '../../services/api'

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
  const { data: restaurante } = useGetRestaurantQuery()

  const getTags = (item: RestauranteProps) => {
    const tags = []

    if (item.destacado) {
      tags.push('Destaque da semana')
    }
    tags.push(item.tipo)

    return tags
  }

  if (!restaurante) {
    return <h2>Carregando...</h2>
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
