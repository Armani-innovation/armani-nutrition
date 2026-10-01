interface FetchedPrice {
  price: number
}

interface StartPaymentRequest {
  price: number
  description: string
  username: string
}

interface StartPaymentResponse {
  status: boolean
  url: string
  authority: string
}

export type { FetchedPrice, StartPaymentRequest, StartPaymentResponse }
