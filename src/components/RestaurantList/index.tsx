import Restaurant from '../Restaurant'
import { Container } from './styles'
import { useGetRestaurantQuery } from '../../services/api'
import Loading from '../Loading'
import { colors } from '../../styles'

const RestaurantList = () => {
  const { data: restaurant } = useGetRestaurantQuery()

  const getTags = (item: RestaurantProps) => {
    const tags = []

    if (item.destacado) {
      tags.push('Destaque da semana')
    }
    tags.push(item.tipo)

    return tags
  }

  if (!restaurant) {
    return <Loading color={colors.red} />
  }

  return (
    <div className="container">
      <Container>
        {restaurant.map((item) => (
          <Restaurant
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

export default RestaurantList
