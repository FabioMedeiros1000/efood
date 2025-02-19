import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useAppDispatch } from '../store/hooks'
import {
  fetchCartItems,
  addItemToCartAsync,
  removeItemFromCartAsync
} from '../store/reducers/cart'

export const useCart = () => {
  const {
    loading,
    error,
    items: cartItems,
    loadingAddItem,
    loadingRemoveItem
  } = useSelector((state: RootState) => state.cart)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCartItems())
  }, [dispatch])

  const addItemToCart = async (item: DishProps) => {
    await dispatch(addItemToCartAsync(item)).unwrap()
  }

  const removeItemFromCart = async (itemId: string) => {
    dispatch(removeItemFromCartAsync(itemId))
  }

  return {
    cartItems,
    loading,
    error,
    loadingAddItem,
    loadingRemoveItem,
    addItemToCart,
    removeItemFromCart
  }
}
