import { useSelector } from 'react-redux'
import { useState } from 'react'

import { RootState } from '../store'
import { useAppDispatch } from '../store/hooks'
import {
  useAddItemToCartMutation,
  useGetCartQuery,
  useRemoveCartMutation,
  useRemoveItemFromCartMutation
} from '../services/cartApi'
import { closeCart, openCart } from '../store/reducers/cart'

export const useCart = () => {
  const dispatch = useAppDispatch()
  const userId = useSelector((state: RootState) => state.auth.userId) || ''

  const {
    data: cartItems,
    isLoading,
    refetch
  } = useGetCartQuery(userId, { skip: !userId })

  const [addItemToCartMutation] = useAddItemToCartMutation()
  const [addingItemId, setAddingItemId] = useState<string | null>(null)

  const [removeItemFromCartMutation] = useRemoveItemFromCartMutation()
  const [removingItemId, setRemovingItemId] = useState<string | null>(null)

  const [removeCartMutation] = useRemoveCartMutation()

  const addItemToCart = async (item: DishProps) => {
    if (!userId) {
      alert('Usuário não autenticado!')
      return
    }

    setAddingItemId(item.id.toString())
    try {
      const response = await addItemToCartMutation({
        dish: item,
        userId
      })

      if ('error' in response) {
        throw new Error('Esse item já foi adicionado ao carrinho!')
      }

      refetch()
    } catch (error) {
      alert('Esse item já foi adicionado ao carrinho!')
    } finally {
      setAddingItemId(null)
    }
  }

  const removeItemFromCart = async (itemId: string) => {
    if (!userId) {
      alert('Usuário não autenticado!')
      return
    }

    setRemovingItemId(itemId)

    try {
      const response = await removeItemFromCartMutation({ userId, itemId })

      if ('error' in response) {
        throw new Error(response.error as string)
      }

      refetch()
    } catch (error) {
      alert(error)
    } finally {
      setRemovingItemId(null)
    }
  }

  const removeCartAll = async () => {
    if (!userId) {
      alert('Usuário não autenticado!')
      return
    }

    try {
      const response = await removeCartMutation({ userId })

      if ('error' in response) {
        throw new Error(response.error as string)
      }

      refetch()
    } catch (error) {
      alert(error)
    }
  }

  return {
    cartItems: cartItems?.items || [],
    isLoading,
    openCart: () => dispatch(openCart()),
    closeCart: () => dispatch(closeCart()),
    addItemToCart,
    removeItemFromCart,
    removeCartAll,
    removingItemId,
    addingItemId
  }
}
