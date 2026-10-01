interface ReportPromptResult {
  prompt_id: number
  prompt_text: string
  response: string
  filled_prompt: string
}

interface ReportResult {
  generated_at: string
  prompts: ReportPromptResult[]
}

interface ReportRecord {
  id: number
  questionnaire: number
  status: 'pending' | 'processing' | 'done' | 'error'
  task_id: string | null
  created_at: string
  finish: string | null
  result: ReportResult | { error: string } | null
}

interface ReportTaskResponse {
  detail: string
  report: ReportRecord
  task_id?: string
}

type ReportStatusResponse =
  | {
      status: 'pending' | 'processing'
      detail: string
      celery_state?: string
    }
  | {
      status: 'done'
      result: ReportResult
    }
  | {
      status: 'error'
      error: string
    }

export type { ReportTaskResponse, ReportStatusResponse }
