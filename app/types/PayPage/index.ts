interface FetchedPrice {
  price: number
}

interface StartPaymentRequest {
  questionnaire_id: number
  description: string
  discount_code?: string
}

interface StartPaymentResponse {
  status: boolean
  url: string
  authority: string | null
  payment_id: number
  amount: number
}

export type { FetchedPrice, StartPaymentRequest, StartPaymentResponse }
