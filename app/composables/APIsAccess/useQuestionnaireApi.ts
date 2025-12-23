import { apiFetch } from '~/core/api.fetch'
import { useI18n } from 'vue-i18n'
import { withAuthRetry } from '~/utils/withAuthRetry'
import type { RawQuestion, CreateQuestionnaireResponse, QuestionnaireAnswers } from '~/types/Questionnaires'

export const useQuestionnaireApi = () => {
  const { locale } = useI18n()

  const getQuestions = () =>
    withAuthRetry<RawQuestion[]>(() =>
      apiFetch('/questionnaires/questions/', {
        method: 'GET',
        credentials: 'include',
        onRequest({ options }) {
          options.headers.set('Accept-Language', locale.value)
        }
      })
    )

  const postQuestions = (data: QuestionnaireAnswers[], questionnaireID: number) =>
    withAuthRetry<any>(() =>
      apiFetch(`/questionnaires/questionnaires/${questionnaireID}/answers/`, {
        method: 'POST',
        credentials: 'include',
        body: data,
        onRequest({ options }) {
          options.headers.set('Accept-Language', locale.value)
        }
      })
    )

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

  return { getQuestions, postQuestions, createQuestionnaire }
}