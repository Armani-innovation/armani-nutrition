// import { apiFetch } from '~/core/api.fetch'
// import { useI18n } from 'vue-i18n'
// import type {fetchedPrice} from "~/types/PayPage";
//
// export const usePayPageApi = () => {
//   const { locale } = useI18n()
//   const lang = locale.value
//
//   const getPrice = () => {
//     return apiFetch<fetchedPrice>('/payments/discount/', {
//       method: 'GET',
//       credentials: 'include',
//       async onRequest({ options }) {
//         options.headers.set('Accept-Language', lang)
//       }
//     })
//   }
//
//   const checkDiscountCode = (discount_code:string) => {
//     return apiFetch<fetchedPrice>('payments/discount/', {
//       method: 'POST',
//       credentials: 'include',
//       body: {
//         discount_code
//       },
//       async onRequest({ options }) {
//         options.headers.set('Accept-Language', lang)
//       }
//     })
//   }
//
//   const sendPayPage = (price:number) => {
//     return apiFetch('payments/request/', {
//       method: 'POST',
//       credentials: 'include',
//       body: {
//         price
//       },
//       async onRequest({ options }) {
//         options.headers.set('Accept-Language', lang)
//       }
//     })
//   }
//
//   return { getPrice, checkDiscountCode, sendPayPage }
// }


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