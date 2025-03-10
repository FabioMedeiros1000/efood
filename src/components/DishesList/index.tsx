import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import Dish from '../Dish'
import Loading from '../Loading'
import DishModal from '../DishModal'

import { trimDescription } from '../Restaurant'
import { openCart } from '../../store/reducers/cart'
import { useGetFoodQuery } from '../../services/restaurantApi'
import { useCart } from '../../hooks/useCart'

import * as S from './styles'

import { colors } from '../../styles'

interface ModalType extends DishProps {
  visible: boolean
}

const DishesList = () => {
  const [modal, setModal] = useState<ModalType | null>(null)
  const { id } = useParams()
  const dispatch = useDispatch()

  const { data: pratos, isFetching } = useGetFoodQuery(id as string)

  const { addItemToCart, addingItemId } = useCart()

  if (!id) return null
  if (isFetching) return <Loading color={colors.red} height={400} />

  const openDishModal = (prato: DishProps) => {
    setModal({
      ...prato,
      visible: true
    })
  }

  const handleAddToCart = async (prato: DishProps) => {
    await addItemToCart(prato)
    dispatch(openCart())

    if (modal) {
      setModal({ ...prato, visible: false })
    }
  }

  return (
    <div>
      <S.Section className="container">
        {pratos?.map((prato) => (
          <Dish
            id={prato.id.toString()}
            key={prato.id}
            image={prato.foto}
            title={prato.nome}
            description={trimDescription(prato.descricao)}
            onClick={() => openDishModal(prato)}
            onAddToCart={() => handleAddToCart(prato)}
            isLoading={addingItemId === prato.id.toString()}
          />
        ))}
      </S.Section>
      {modal?.visible && (
        <DishModal
          prato={modal}
          onAddToCart={handleAddToCart}
          onClose={() => setModal(null)}
          isLoading={addingItemId === modal.id.toString()}
        />
      )}
    </div>
  )
}

export default DishesList
