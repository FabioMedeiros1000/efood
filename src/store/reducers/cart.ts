import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CartState = {
  items: DishProps[]
  isOpen: boolean
}

const loadCartFromLocalStorage = (): DishProps[] => {
  const savedCart = localStorage.getItem('cart')
  return savedCart ? JSON.parse(savedCart) : []
}

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
  isOpen: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<DishProps>) => {
      const itemFound = state.items.find(
        (item) => item.id === action.payload.id
      )

      if (!itemFound) {
        state.items.push(action.payload)
        localStorage.setItem('cart', JSON.stringify(state.items))
      } else {
        alert('Esse item já foi adicionado ao carrinho')
      }
    },
    openCart: (state) => {
      state.isOpen = true
    },
    closeCart: (state) => {
      state.isOpen = false
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    clearCart: (state) => {
      state.items = []
      localStorage.removeItem('cart')
    }
  }
})

export default cartSlice.reducer

export const { addToCart, openCart, closeCart, deleteFromCart, clearCart } =
  cartSlice.actions
