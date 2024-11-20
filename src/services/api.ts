import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Product {
  id: number
  price: number
}

interface PurchaseType
  extends Omit<PaymentState, 'isOpen' | 'formCompleted'>,
    DeliveryType {
  products: Product[]
}

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fake-api-tau.vercel.app/api/efood'
  }),
  endpoints: (builder) => ({
    getRestaurant: builder.query<RestaurantProps[], void>({
      query: () => 'restaurantes'
    }),
    getFood: builder.query<DishProps[], string>({
      query: (id) => `restaurantes/${id}`,
      transformResponse: (response: { cardapio: DishProps[] }) =>
        response.cardapio
    }),
    getHeroRestaurant: builder.query<RestaurantProps, string>({
      query: (id) => `restaurantes/${id}`
    }),
    purchase: builder.mutation<PurchaseResponse, PurchaseType>({
      query: (body) => ({
        url: 'checkout',
        method: 'POST',
        body
      })
    })
  })
})

export default api
export const {
  useGetRestaurantQuery,
  useGetFoodQuery,
  useGetHeroRestaurantQuery,
  usePurchaseMutation
} = api
