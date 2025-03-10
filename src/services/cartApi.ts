import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { RootState } from '../store'
import {
  addItemToCartState,
  removeItemToCartState,
  setCartItems
} from '../store/reducers/cart'

interface ApiResponse {
  message: string
  items: CartItem[]
}

const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://efood-backend.onrender.com/api/cart',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState
      const token = state.auth.token

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    }
  }),
  endpoints: (builder) => ({
    getCart: builder.query<ApiResponse, string>({
      query: (userId) => {
        if (!userId) {
          throw new Error('Usuário não autenticado')
        }
        return `/${userId}`
      }
    }),
    addItemToCart: builder.mutation({
      query: ({ dish, userId }: AddToCartRequest) => ({
        url: 'add',
        method: 'POST',
        body: { ...dish, userId }
      }),
      async onQueryStarted(item, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (!data) {
            throw new Error('Erro ao adicionar item no carrinho')
          }

          dispatch(addItemToCartState(item))
        } catch (error) {
          console.error(error)
        }
      }
    }),
    removeItemFromCart: builder.mutation({
      query: ({ userId, itemId }) => ({
        url: `/${userId}/${itemId}`,
        method: 'DELETE'
      }),
      async onQueryStarted({ userId, itemId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (!data) {
            throw new Error('Erro ao remover item do carrinho')
          }

          dispatch(removeItemToCartState({ userId, itemId }))
        } catch (error) {
          console.error(error)
        }
      }
    }),
    removeCart: builder.mutation({
      query: ({ userId }) => ({
        url: `/${userId}`,
        method: 'DELETE'
      }),
      async onQueryStarted({ userId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (!data) {
            throw new Error(
              'Não foi possível deletar todos os itens do carrinho'
            )
          }

          dispatch(setCartItems([]))
        } catch (error) {
          console.error(error)
        }
      }
    })
  })
})

export const {
  useGetCartQuery,
  useAddItemToCartMutation,
  useRemoveItemFromCartMutation,
  useRemoveCartMutation
} = cartApi
export default cartApi
