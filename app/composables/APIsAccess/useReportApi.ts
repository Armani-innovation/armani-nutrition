import { apiFetch } from '~/core/api.fetch'
import { useI18n } from 'vue-i18n'
import { withAuthRetry } from '~/utils/withAuthRetry'
import type { ReportStatusResponse, ReportTaskResponse } from '~/types/Report'

export const useReportApi = () => {
  const { locale } = useI18n()

  const startReport = (questionnaireID: string) =>
    withAuthRetry<ReportTaskResponse>(() =>
      apiFetch(`/reports/start/${questionnaireID}/`, {
        method: 'POST',
        credentials: 'include',
        onRequest({ options }) {
          options.headers.set('Accept-Language', locale.value)
        }
      })
    )

  const checkReport = (questionnaireID: string) =>
    withAuthRetry<ReportStatusResponse>(() =>
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
