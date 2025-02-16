import { createSlice } from '@reduxjs/toolkit'

type CartState = {
  isOpen: boolean
}

const initialState: CartState = {
  isOpen: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCart: (state) => {
      state.isOpen = true
    },
    closeCart: (state) => {
      state.isOpen = false
    }
  }
})

export default cartSlice.reducer

export const { openCart, closeCart } = cartSlice.actions
