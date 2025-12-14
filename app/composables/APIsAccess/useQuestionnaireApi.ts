import { apiFetch } from '~/core/api.fetch'
import { useI18n } from 'vue-i18n'
import type {RawQuestion, CreateQuestionnaireResponse} from "~/types/Questionnaires"

export const useQuestionnaireApi = () => {
  const { locale } = useI18n()
  const lang = locale.value

  const getQuestions = () => {
    return apiFetch<RawQuestion[]>('/questionnaires/questions/', {
      method: 'GET',
      credentials: 'include',
      async onRequest({ options }) {
        options.headers.set('Accept-Language', lang)
      }
    })
  }

  const createQuestionnaire = () => {
    return apiFetch<CreateQuestionnaireResponse>('/questionnaires/questionnaires/create/', {
      method: 'POST',
      body: {},
      credentials: 'include',
      async onRequest({ options }) {
        options.headers.set('Accept-Language', lang)
      }
    })
  }

  return { getQuestions, createQuestionnaire }
}
