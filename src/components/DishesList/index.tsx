import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import Dish from '../Dish'
import Loading from '../Loading'
import Modal from '../Modal'

import { trimDescription } from '../Restaurant'
import { addToCart, openCart } from '../../store/reducers/cart'
import { useGetFoodQuery } from '../../services/api'
import { convertToCurrency } from '../../utils'

import * as S from './styles'

import { colors } from '../../styles'
import Button from '../Button'

interface ModalType extends DishProps {
  visible: boolean
}

const DishesList = () => {
  const [modal, setModal] = useState<ModalType | null>(null)
  const { id } = useParams()
  const dispatch = useDispatch()

  const { data: pratos, isFetching } = useGetFoodQuery(id as string)

  if (!id) return null
  if (isFetching) return <Loading color={colors.red} height={400} />

  const handleAddToCart = (prato: DishProps) => {
    dispatch(addToCart(prato))
    dispatch(openCart())
    setModal(null)
  }

  return (
    <div>
      <S.Section className="container">
        {pratos?.map((prato) => (
          <Dish
            onClick={() =>
              setModal({
                id: prato.id,
                nome: prato.nome,
                descricao: prato.descricao,
                foto: prato.foto,
                porcao: prato.porcao,
                preco: prato.preco,
                visible: true
              })
            }
            onAddToCart={() => handleAddToCart(prato)}
            key={prato.id}
            image={prato.foto}
            title={prato.nome}
            description={trimDescription(prato.descricao)}
          />
        ))}
      </S.Section>
      {modal?.visible && (
        <Modal isVisible={modal.visible} onClose={() => setModal(null)}>
          <img src={modal.foto} alt={modal.nome} />
          <div>
            <h1>{modal.nome}</h1>
            <p>
              {modal.descricao} <br />
              <br />
              {modal.porcao.includes('1 pessoa')
                ? 'Serve: 1 pessoa'
                : `Serve: de ${modal.porcao}`}
            </p>
            <Button
              width="adjusted"
              type="button"
              title="Clique aqui para adicionar ao carrinho"
              onClick={() => handleAddToCart(modal)}
            >
              Adicionar ao carrinho - {convertToCurrency(modal.preco)}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default DishesList
