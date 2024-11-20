declare interface DishProps {
  foto: string
  preco: number
  id: number
  nome: string
  descricao: string
  porcao: string
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
  formCompleted: boolean
  payment: PaymentType
}

declare type PurchaseResponse = {
  orderId: string
}
