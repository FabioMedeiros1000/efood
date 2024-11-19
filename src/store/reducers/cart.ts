import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DishProps } from '../../components/DishesList'

type CartState = {
  items: DishProps[]
  isOpen: boolean
}

const initialState: CartState = {
  items: [],
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
    },
    clearCart: (state) => {
      state.items = []
    }
  }
})

export default cartSlice.reducer

export const { addToCart, openCart, closeCart, deleteFromCart, clearCart } =
  cartSlice.actions
