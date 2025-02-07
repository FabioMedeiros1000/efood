import Restaurant from '../Restaurant'
import Loading from '../Loading'

import { getTags } from '../../utils/functions'
import { useGetRestaurantQuery } from '../../services/api'

import { Container } from './styles'

import { colors } from '../../styles'

const RestaurantList = () => {
  const { data: restaurant } = useGetRestaurantQuery()

  const renderContent = () => {
    if (!restaurant) {
      return <Loading color={colors.red} />
    }

    return (
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
    )
  }

  return <div className="container">{renderContent()}</div>
}

export default RestaurantList
