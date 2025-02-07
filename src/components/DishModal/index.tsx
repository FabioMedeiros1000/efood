import Button from '../Button'
import Modal from '../Modal'

import { convertToCurrency } from '../../utils/functions'

type DishModalProps = {
  prato: DishProps
  onAddToCart: (prato: DishProps) => void
  onClose: () => void
}

const DishModal = ({ prato, onAddToCart, onClose }: DishModalProps) => (
  <Modal isVisible={true} onClose={onClose}>
    <img src={prato.foto} alt={prato.nome} />
    <div>
      <h1>{prato.nome}</h1>
      <p>
        {prato.descricao} <br />
        <br />
        {prato.porcao.includes('1 pessoa')
          ? 'Serve: 1 pessoa'
          : `Serve: de ${prato.porcao}`}
      </p>
      <Button
        width="adjusted"
        type="button"
        title="Clique aqui para adicionar ao carrinho"
        onClick={() => onAddToCart(prato)}
      >
        Adicionar ao carrinho - {convertToCurrency(prato.preco)}
      </Button>
    </div>
  </Modal>
)

export default DishModal
