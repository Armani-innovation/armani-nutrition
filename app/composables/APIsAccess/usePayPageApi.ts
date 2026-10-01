import { apiFetch } from '~/core/api.fetch'
import { useI18n } from 'vue-i18n'
import { withAuthRetry } from '~/utils/withAuthRetry'
import type { PaymentHistory } from '~/types/History'
import type {
  FetchedPrice,
  StartPaymentRequest,
  StartPaymentResponse
} from '~/types/PayPage'

export const usePayPageApi = () => {
  const { locale } = useI18n()

  const getPrice = () =>
    withAuthRetry<FetchedPrice>(() =>
      apiFetch('/payments/discount/', {
        method: 'GET',
        credentials: 'include',
        onRequest({ options }) {
          options.headers.set('Accept-Language', locale.value)
        }
      })
    )

  const checkDiscountCode = (discount_code: string) =>
    withAuthRetry<FetchedPrice>(() =>
      apiFetch('/payments/discount/', {
        method: 'POST',
        credentials: 'include',
        body: { discount_code },
        onRequest({ options }) {
          options.headers.set('Accept-Language', locale.value)
        }
      })
    )

  const startPayment = (payload: StartPaymentRequest) =>
    withAuthRetry<StartPaymentResponse>(() =>
      apiFetch('/payments/request/', {
        method: 'POST',
        credentials: 'include',
        body: payload,
        onRequest({ options }) {
          options.headers.set('Accept-Language', locale.value)
        }
      })
    )

  const getPayments = (username: string) =>
    withAuthRetry<PaymentHistory[]>(() =>
      apiFetch('/payments/payment/list/', {
        method: 'GET',
        credentials: 'include',
        query: { username },
        onRequest({ options }) {
          options.headers.set('Accept-Language', locale.value)
        }
      })
    )

  return { getPrice, checkDiscountCode, startPayment, getPayments }
}
