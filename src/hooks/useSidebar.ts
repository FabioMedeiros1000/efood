import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../store'

export const useSidebarState = () => {
  const isOpenCart = useSelector((state: RootState) => state.cart.isOpen)
  const isOpenDelivery = useSelector(
    (state: RootState) => state.delivery.isOpen
  )
  const isOpenPayment = useSelector((state: RootState) => state.payment.isOpen)

  return { isOpenCart, isOpenDelivery, isOpenPayment }
}

export const useSidebarItems = () => {
  const [cartItems, setCartItems] = useState<DishProps[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const payment = useSelector((state: RootState) => state.payment.payment)
  const delivery = useSelector((state: RootState) => state.delivery.delivery)

  const linkReal = 'https://efood-backend.onrender.com'
  const linkLocal = 'http://localhost:5000'

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`${linkLocal}/api/cart`)

        if (!response.ok) {
          throw new Error('Erro ao buscar os itens do carrinho')
        }

        const data = await response.json()
        setCartItems([...data.cartItems])
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCartItems()
  }, [cartItems])

  return {
    cartItems,
    setCartItems,
    payment,
    delivery,
    loading,
    error,
    setError
  }
}
