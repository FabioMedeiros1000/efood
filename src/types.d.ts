declare interface DishProps {
  id: number
  nome: string
  descricao: string
  porcao: string
  preco: number
  foto: string
}

declare interface AddToCartRequest {
  dish: DishProps
  userId: string
}

declare interface CartItem extends DishProps {
  user_id: string
  dish_id: string
}

declare type RestaurantProps = {
  avaliacao: number
  capa: string
  descricao: string
  destacado: boolean
  id: number
  tipo: string
  titulo: string
}

declare interface DeliveryType {
  delivery: {
    receiver: string
    address: {
      city: string
      complement: string
      description: string
      number: number
      zipCode: string
    }
  }
}

declare interface DeliveryState extends DeliveryType {
  isOpen: boolean
}

declare interface CardDetails {
  name: string
  number: string
  code: number
  expires: {
    month: number
    year: number
  }
}

declare interface PaymentType {
  card: CardDetails
}

declare interface PaymentState {
  isOpen: boolean
  payment: PaymentType
}

declare type PurchaseResponse = {
  orderId: string
}
