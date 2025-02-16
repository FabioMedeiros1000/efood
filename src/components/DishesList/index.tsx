import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import Dish from '../Dish'
import Loading from '../Loading'

import { trimDescription } from '../Restaurant'
import { openCart } from '../../store/reducers/cart'
import { useGetFoodQuery } from '../../services/api'

import * as S from './styles'

import { colors } from '../../styles'
import DishModal from '../DishModal'
import { useSidebarItems } from '../../hooks/useSidebar'

interface ModalType extends DishProps {
  visible: boolean
}

const DishesList = () => {
  const [modal, setModal] = useState<ModalType | null>(null)
  const { id } = useParams()
  const dispatch = useDispatch()

  const { data: pratos, isFetching } = useGetFoodQuery(id as string)

  const { setCartItems } = useSidebarItems()

  if (!id) return null
  if (isFetching) return <Loading color={colors.red} height={400} />

  const handleAddToCart = async (prato: DishProps) => {
    try {
      const userId = localStorage.getItem('userId')
      if (!userId) {
        throw new Error('Usuário não autenticado')
      }

      const response = await fetch(
        `https://efood-backend.onrender.com/api/cart/add`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...prato, userId })
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao adicionar item ao carrinho')
      }

      const cartResponse = await fetch(
        `https://efood-backend.onrender.com/api/cart/${userId}`
      )
      const cartData = await cartResponse.json()

      setCartItems(cartData.items)
      dispatch(openCart())
      setModal(null)
    } catch (error: any) {
      console.error('Erro ao adicionar item:', error.message)
      alert('Erro ao adicionar item ao carrinho')
    }
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
