// export interface Question {
//   id: number;
//   question: string;
//   type: "text" | "number" | "multiple-choice";
//   required: boolean;
//   options: string[];
//   multipleSelect: boolean;
//   placeholder: string | null;
//   followUp: {
//     if: string;
//     type: "text" | "number" | "multiple-choice";
//     placeholder: string | null;
//   } | null;
// }

// export interface RawQuestion {
//   id: number;
//   questionKey: string;
//   type: "text" | "number" | "multiple-choice";
//   required: boolean;
//   optionsKeys: string[];
//   multipleSelect: boolean;
//   placeholderKey: string | null;
//   followUp: {
//     ifKey: string;
//     type: "text" | "number" | "multiple-choice";
//     placeholderKey: string | null;
//   } | null;
// }

type QuestionType = "text" | "number" | "multiple-choice"

interface FollowUp {
  if: string
  type: QuestionType
  placeholder: string | null
}

interface Question {
  id: number
  question: string         // کلید i18n یا متن سؤال
  type: QuestionType
  required: boolean
  options: string[]        // کلید i18n یا متن گزینه‌ها
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
  answer: string | number | string[]
  followUp: string | null
}

interface CreateQuestionnaireResponse {
  id: number
  user: number
  created_at: string
  is_paid: boolean
  is_reported: boolean
}

export type {Question, RawQuestion, QuestionnaireAnswers, CreateQuestionnaireResponse}