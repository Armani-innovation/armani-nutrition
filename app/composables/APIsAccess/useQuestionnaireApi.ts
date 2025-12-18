import {apiFetch} from '~/core/api.fetch'
import {useI18n} from 'vue-i18n'
import type {RawQuestion, CreateQuestionnaireResponse, QuestionnaireAnswers} from "~/types/Questionnaires"

export const useQuestionnaireApi = () => {
  const {locale} = useI18n()
  const lang = locale.value

  const getQuestions = () => {
    return apiFetch<RawQuestion[]>('/questionnaires/questions/', {
      method: 'GET',
      credentials: 'include',
      async onRequest({options}) {
        options.headers.set('Accept-Language', lang)
      }
    })
  }

  const postQuestions = (data: QuestionnaireAnswers[], questionnaireID: number) => {
    return apiFetch(`/questionnaires/questionnaires/${questionnaireID}/answers/`, {
      method: 'POST',
      credentials: 'include',
      body: {
        ...data
      },
      async onRequest({options}) {
        options.headers.set('Accept-Language', lang)
      }
    })
  }

  const createQuestionnaire = (question_answer:QuestionnaireAnswers[]) => {
    console.log(question_answer)
    return apiFetch<CreateQuestionnaireResponse>('/questionnaires/questionnaires/create/', {
      method: 'POST',
      body: {
        question_answer,
      },
      credentials: 'include',
      async onRequest({options}) {
        options.headers.set('Accept-Language', lang)
      }
    })
  }

  return {getQuestions, postQuestions, createQuestionnaire}
}
