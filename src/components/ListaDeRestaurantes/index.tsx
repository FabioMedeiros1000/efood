import Restaurante from '../Restaurante'
import { Container } from './styles'

import pratoJapones from '../../assets/images/prato-japones.png'
import pratoItaliano from '../../assets/images/prato-italiano.png'
import RestauranteClass from '../../models/RestauranteClass'

const restaurantes: RestauranteClass[] = [
  {
    id: 1,
    title: 'Hioki Sushi',
    image: pratoJapones,
    description:
      'Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega rápida, embalagens cuidadosas e qualidade garantida.Experimente o Japão sem sair do lar com nosso delivery!',
    score: 4.9,
    infos: ['Destaque da Semana', 'Japonesa']
  },
  {
    id: 2,
    title: 'La Dolce Vita Trattoria',
    image: pratoItaliano,
    description:
      'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    score: 4.6,
    infos: ['Italiana']
  },
  {
    id: 3,
    title: 'La Dolce Vita Trattoria',
    image: pratoItaliano,
    description:
      'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    score: 4.6,
    infos: ['Italiana']
  },
  {
    id: 4,
    title: 'La Dolce Vita Trattoria',
    image: pratoItaliano,
    description:
      'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    score: 4.6,
    infos: ['Italiana']
  },
  {
    id: 5,
    title: 'La Dolce Vita Trattoria',
    image: pratoItaliano,
    description:
      'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    score: 4.6,
    infos: ['Italiana']
  },
  {
    id: 6,
    title: 'La Dolce Vita Trattoria',
    image: pratoItaliano,
    description:
      'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    score: 4.6,
    infos: ['Italiana']
  }
]

const ListaDeRestaurantes = () => (
  <div className="container">
    <Container>
      {restaurantes.map((restaurante) => (
        <Restaurante
          key={restaurante.id}
          title={restaurante.title}
          description={restaurante.description}
          image={restaurante.image}
          score={restaurante.score}
          infos={restaurante.infos}
        />
      ))}
    </Container>
  </div>
)

export default ListaDeRestaurantes
