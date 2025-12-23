interface reportsHistory {
  created_at: string
  id: number
  is_paid: boolean
  is_reported: boolean
  user: number
}

interface transactionHistory {
  date: string
  time: string
  amount: string
  payment: "paid" | "unpaid"
  status: "done" | "pending"
  description: string
}

export type {reportsHistory, transactionHistory};