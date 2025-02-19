import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type CartState = {
  isOpen: boolean
  items: DishProps[]
  loading: boolean
  error: string | null
  loadingAddItem: string[]
  loadingRemoveItem: string[]
}

const initialState: CartState = {
  isOpen: false,
  items: [],
  loading: false,
  error: null,
  loadingAddItem: [],
  loadingRemoveItem: []
}

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async () => {
    const userId = localStorage.getItem('userId')
    if (!userId) throw new Error('Usuário não autenticado')

    const response = await fetch(
      `https://efood-backend.onrender.com/api/cart/${userId}`
    )

    if (!response.ok) throw new Error('Erro ao buscar itens no carrinho')

    const data = await response.json()
    return data.items
  }
)

export const addItemToCartAsync = createAsyncThunk(
  'cart/addItem',
  async (item: DishProps, { rejectWithValue }) => {
    const userId = localStorage.getItem('userId')
    if (!userId) throw new Error('Usuário não autenticado')

    const response = await fetch(
      `https://efood-backend.onrender.com/api/cart/add`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, userId })
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      return rejectWithValue(errorData.message)
    }

    return item
  }
)

export const removeItemFromCartAsync = createAsyncThunk(
  'cart/removeItem',
  async (itemId: string) => {
    const userId = localStorage.getItem('userId')
    if (!userId) throw new Error('Usuário não autenticado')

    const response = await fetch(
      `https://efood-backend.onrender.com/api/cart/${userId}/${itemId}`,
      { method: 'DELETE' }
    )

    if (!response.ok) throw new Error('Erro ao remover item do carrinho')

    return itemId
  }
)

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.error = action.error.message || 'Erro ao carregar o carrinho'
        state.loading = false
      })

      .addCase(addItemToCartAsync.pending, (state, action) => {
        state.loadingAddItem.push(action.meta.arg.id.toString())
      })
      .addCase(addItemToCartAsync.fulfilled, (state, action) => {
        state.items.push(action.payload)
        state.loadingAddItem = state.loadingAddItem.filter(
          (id) => id !== action.payload.id.toString()
        )
      })
      .addCase(addItemToCartAsync.rejected, (state, action) => {
        state.loadingAddItem = state.loadingAddItem.filter(
          (id) => id !== action.meta.arg.id.toString()
        )
      })

      .addCase(removeItemFromCartAsync.pending, (state, action) => {
        state.loadingRemoveItem.push(action.meta.arg)
      })
      .addCase(removeItemFromCartAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id.toString() !== action.payload
        )
        state.loadingRemoveItem = state.loadingRemoveItem.filter(
          (id) => id !== action.payload
        )
      })
      .addCase(removeItemFromCartAsync.rejected, (state, action) => {
        state.loadingRemoveItem = state.loadingRemoveItem.filter(
          (id) => id !== action.meta.arg
        )
      })
  }
})

export default cartSlice.reducer
export const { openCart, closeCart } = cartSlice.actions
