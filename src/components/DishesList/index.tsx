import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import Dish from '../Dish'
import Loading from '../Loading'

import { trimDescription } from '../Restaurant'
import { addToCart, openCart } from '../../store/reducers/cart'
import { useGetFoodQuery } from '../../services/api'

import * as S from './styles'

import { colors } from '../../styles'
import DishModal from '../DishModal'

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

  const openDishModal = (prato: DishProps) => {
    setModal({
      ...prato,
      visible: true
    })
  }

  return (
    <div>
      <S.Section className="container">
        {pratos?.map((prato) => (
          <Dish
            key={prato.id}
            image={prato.foto}
            title={prato.nome}
            description={trimDescription(prato.descricao)}
            onClick={() => openDishModal(prato)}
            onAddToCart={() => handleAddToCart(prato)}
          />
        ))}
      </S.Section>
      {modal?.visible && (
        <DishModal
          prato={modal}
          onAddToCart={handleAddToCart}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}

export default DishesList
