type QuestionType = "text" | "number" | "multiple-choice"

interface FollowUp {
  if: string
  type: QuestionType
  placeholder: string | null
}

interface Question {
  id: number
  question: string
  type: QuestionType
  required: boolean
  options: string[]
  multipleSelect: boolean
  placeholder: string | null
  followUp: FollowUp | null
}

interface RawQuestion {
  id: number
  questionKey: string
  type: "text" | "number" | "multiple-choice"
  required: boolean
  optionsKeys: string[]
  multipleSelect: boolean
  placeholderKey: string | null
  followUp: {
    ifKey: string
    type: "text" | "number" | "multiple-choice"
    placeholderKey: string | null
  } | null
}

interface QuestionnaireAnswers {
  question: string
  text_answer: string | number | null
  option: string[] | null
}

interface CreateQuestionnaireResponse {
  id: number
  user: number
  created_at: string
  is_paid: boolean
  is_reported: boolean
  question_answer: QuestionnaireAnswers[] | Record<string, unknown>
}

interface QuestionnaireReport {
  id: number
  questionnaire: number
  status: 'pending' | 'processing' | 'done' | 'error'
  result: unknown | null
  created_at: string
  finish: string | null
  task_id: string | null
}

interface QuestionnaireDetail extends CreateQuestionnaireResponse {
  report: QuestionnaireReport | null
}

export type {
  Question,
  RawQuestion,
  QuestionnaireAnswers,
  CreateQuestionnaireResponse,
  QuestionnaireDetail
}
