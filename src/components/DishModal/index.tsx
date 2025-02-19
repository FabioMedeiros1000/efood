import Button from '../Button'
import Modal from '../Modal'
import Loading from '../Loading'

import { convertToCurrency } from '../../utils/functions'

import { colors } from '../../styles'

type DishModalProps = {
  prato: DishProps
  onAddToCart: (prato: DishProps) => void
  onClose: () => void
  isLoading: boolean
}

const DishModal = ({
  isLoading,
  prato,
  onAddToCart,
  onClose
}: DishModalProps) => (
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
        disabled={isLoading}
      >
        {isLoading ? (
          <Loading color={colors.red} height={15} />
        ) : (
          `Adicionar ao carrinho - ${convertToCurrency(prato.preco)}`
        )}
      </Button>
    </div>
  </Modal>
)

export default DishModal
