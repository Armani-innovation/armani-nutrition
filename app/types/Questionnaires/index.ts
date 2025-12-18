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
}

export type {Question, RawQuestion, QuestionnaireAnswers, CreateQuestionnaireResponse}