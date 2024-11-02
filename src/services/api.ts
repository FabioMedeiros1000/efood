import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RestauranteProps } from '../components/ListaDeRestaurantes'
import { PratoProps } from '../components/ListaDePratos'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fake-api-tau.vercel.app/api/efood'
  }),
  endpoints: (builder) => ({
    getRestaurant: builder.query<RestauranteProps[], void>({
      query: () => 'restaurantes'
    }),
    getFood: builder.query<PratoProps[], string>({
      query: (id) => `restaurantes/${id}`,
      transformResponse: (response: { cardapio: PratoProps[] }) =>
        response.cardapio
    }),
    getHeroRestaurant: builder.query<RestauranteProps, string>({
      query: (id) => `restaurantes/${id}`
    })
  })
})

export default api
export const {
  useGetRestaurantQuery,
  useGetFoodQuery,
  useGetHeroRestaurantQuery
} = api
