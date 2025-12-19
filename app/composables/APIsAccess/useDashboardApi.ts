// import {apiFetch} from '~/core/api.fetch'
// import {useI18n} from 'vue-i18n'
// import type {RawQuestion} from "~/types/Questionnaires";
//
// export const useDashboardApi = () => {
//   const {locale} = useI18n()
//   const lang = locale.value
//
//   const getReports = () => {
//     return apiFetch('/questionnaires/questionnaires/list/', {
//       method: 'GET',
//       credentials: 'include',
//       async onRequest({options}) {
//         options.headers.set('Accept-Language', lang)
//       }
//     })
//   }
//
//   return {getReports}
// }

import { apiFetch } from '~/core/api.fetch'
import { useI18n } from 'vue-i18n'
import { withAuthRetry } from '~/utils/withAuthRetry'
import type { reportsHistory } from '~/types/History'

export const useDashboardApi = () => {
  const { locale } = useI18n()

  const getReports = () =>
    withAuthRetry<reportsHistory[]>(() =>
      apiFetch('/questionnaires/questionnaires/list/', {
        method: 'GET',
        credentials: 'include',
        onRequest({ options }) {
          options.headers.set('Accept-Language', locale.value)
        }
      })
    )

  return { getReports }
}