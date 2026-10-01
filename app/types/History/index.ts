interface ReportsHistory {
  created_at: string
  id: number
  is_paid: boolean
  is_reported: boolean
  user: number
}

interface PaymentUser {
  id: number
  phone: string
  first_name: string
  last_name: string
}

interface PaymentHistory {
  id: number
  price: number
  questionnaire: number
  date: string
  pid: number
  created_at: string
  successful: boolean
  user: PaymentUser
  description: string
  authority: string | null
}

export type { ReportsHistory, PaymentHistory };
