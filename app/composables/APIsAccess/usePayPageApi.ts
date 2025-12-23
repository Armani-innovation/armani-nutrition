import { apiFetch } from '~/core/api.fetch'
import { useI18n } from 'vue-i18n'
import { withAuthRetry } from '~/utils/withAuthRetry'
import type { fetchedPrice } from '~/types/PayPage'

export const usePayPageApi = () => {
  const { locale } = useI18n()

  const getPrice = () =>
    withAuthRetry<fetchedPrice>(() =>
      apiFetch('/payments/discount/', {
        method: 'GET',
        credentials: 'include',
        onRequest({ options }) {
          options.headers.set('Accept-Language', locale.value)
        }
      })
    )

  const checkDiscountCode = (discount_code: string) =>
    withAuthRetry<fetchedPrice>(() =>
      apiFetch('/payments/discount/', {
        method: 'POST',
        credentials: 'include',
        body: { discount_code },
        onRequest({ options }) {
          options.headers.set('Accept-Language', locale.value)
        }
      })
    )

  const sendPayPage = (price: number) =>
    withAuthRetry<any>(() =>
      apiFetch('/payments/request/', {
        method: 'POST',
        credentials: 'include',
        body: { price },
        onRequest({ options }) {
          options.headers.set('Accept-Language', locale.value)
        }
      })
    )

  return { getPrice, checkDiscountCode, sendPayPage }
}