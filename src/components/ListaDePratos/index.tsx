import PratoClass from '../../models/PratoClass'
import Prato from '../Prato'
import { Container } from './styles'

import pizza from '../../assets/images/pizza.png'

const pratos: PratoClass[] = [
  {
    id: 1,
    image: pizza,
    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    title: 'Pizza Marguerita'
  },
  {
    id: 2,
    image: pizza,
    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    title: 'Pizza Marguerita'
  },
  {
    id: 3,
    image: pizza,
    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    title: 'Pizza Marguerita'
  },
  {
    id: 4,
    image: pizza,
    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    title: 'Pizza Marguerita'
  },
  {
    id: 5,
    image: pizza,
    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    title: 'Pizza Marguerita'
  },
  {
    id: 6,
    image: pizza,
    description:
      'A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!',
    title: 'Pizza Marguerita'
  }
]

const ListaDePratos = () => (
  <Container className="container">
    {pratos.map((prato) => (
      <Prato
        key={prato.id}
        image={prato.image}
        title={prato.title}
        description={prato.description}
      />
    ))}
  </Container>
)

export default ListaDePratos
