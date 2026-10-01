import { apiFetch } from '~/core/api.fetch'
import { useI18n } from 'vue-i18n'
import { withAuthRetry } from '~/utils/withAuthRetry'
import type {
  CreateQuestionnaireResponse,
  QuestionnaireAnswers,
  QuestionnaireDetail
} from '~/types/Questionnaires'

export const useQuestionnaireApi = () => {
  const { locale } = useI18n()

  const createQuestionnaire = (question_answer: QuestionnaireAnswers[]) =>
    withAuthRetry<CreateQuestionnaireResponse>(() =>
      apiFetch('/questionnaires/questionnaires/create/', {
        method: 'POST',
        body: { question_answer },
        credentials: 'include',
        onRequest({ options }) {
          options.headers.set('Accept-Language', locale.value)
        }
      })
    )

  const getQuestionnaire = (questionnaireID: number | string) =>
    withAuthRetry<QuestionnaireDetail>(() =>
      apiFetch(`/questionnaires/questionnaires/${questionnaireID}/`, {
        method: 'GET',
        credentials: 'include',
        onRequest({ options }) {
          options.headers.set('Accept-Language', locale.value)
        }
      })
    )

  return { createQuestionnaire, getQuestionnaire }
}
