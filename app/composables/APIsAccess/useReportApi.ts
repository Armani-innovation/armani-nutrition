// import {apiFetch} from '~/core/api.fetch'
// import {useI18n} from 'vue-i18n'
//
// export const useReportApi = () => {
//   const {locale} = useI18n()
//   const lang = locale.value
//
//   const startReport = (questionnaireID:string) => {
//     return apiFetch(`/reports/start/${questionnaireID}/`, {
//       method: 'Post',
//       credentials: 'include',
//       async onRequest({options}) {
//         options.headers.set('Accept-Language', lang)
//       }
//     })
//   }
//
//   const checkReport = (questionnaireID:string) => {
//     return apiFetch(`/reports/status/${questionnaireID}/`, {
//       method: 'GET',
//       credentials: 'include',
//       async onRequest({options}) {
//         options.headers.set('Accept-Language', lang)
//       }
//     })
//
//   }
//
//   return {startReport, checkReport}
// }


import { apiFetch } from '~/core/api.fetch'
import { useI18n } from 'vue-i18n'
import { withAuthRetry } from '~/utils/withAuthRetry'

export const useReportApi = () => {
  const { locale } = useI18n()

  const startReport = (questionnaireID: string) =>
    withAuthRetry<any>(() =>
      apiFetch(`/reports/start/${questionnaireID}/`, {
        method: 'POST',
        credentials: 'include',
        onRequest({ options }) {
          options.headers.set('Accept-Language', locale.value)
        }
      })
    )

  const checkReport = (questionnaireID: string) =>
    withAuthRetry<any>(() =>
      apiFetch(`/reports/status/${questionnaireID}/`, {
        method: 'GET',
        credentials: 'include',
        onRequest({ options }) {
          options.headers.set('Accept-Language', locale.value)
        }
      })
    )

  return { startReport, checkReport }
}
