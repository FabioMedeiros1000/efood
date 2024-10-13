import { Container } from './styles'

import fundo from '../../assets/images/fundo-hero-categoria.png'

const HeroCategoria = () => (
  <Container style={{ backgroundImage: `url(${fundo})` }}>
    <div className="container">
      <p>Italiana</p>
      <h2>La Dolce Vita Trattoria</h2>
    </div>
  </Container>
)

export default HeroCategoria
