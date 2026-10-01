import { apiFetch } from '~/core/api.fetch'
import { useI18n } from 'vue-i18n'
import { withAuthRetry } from '~/utils/withAuthRetry'
import type { ReportsHistory } from '~/types/History'

export const useDashboardApi = () => {
  const { locale } = useI18n()

  const getReports = () =>
    withAuthRetry<ReportsHistory[]>(() =>
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
