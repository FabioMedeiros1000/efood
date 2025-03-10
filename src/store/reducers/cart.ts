import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CartState = {
  isOpen: boolean
  items: AddToCartRequest[]
}

const initialState: CartState = {
  isOpen: false,
  items: []
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
    },
    setCartItems: (state, action: PayloadAction<AddToCartRequest[]>) => {
      state.items = action.payload
    },
    addItemToCartState: (state, action: PayloadAction<AddToCartRequest>) => {
      state.items.push(action.payload)
    },
    removeItemToCartState: (
      state,
      action: PayloadAction<{ userId: string; itemId: string }>
    ) => {
      state.items = state.items.filter(
        (item) => item.dish.id.toString() !== action.payload.itemId
      )
    }
  }
})

export default cartSlice.reducer
export const {
  openCart,
  closeCart,
  setCartItems,
  addItemToCartState,
  removeItemToCartState
} = cartSlice.actions
