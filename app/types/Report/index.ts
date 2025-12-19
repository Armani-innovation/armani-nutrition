interface ReportTaskResponse {
  detail: string;
  report: {
    id: number;
    questionnaire: number;
    status: 'processing' | 'finished' | 'failed';
    task_id: string;
    created_at: string;
    finish: string | null;
    result: unknown | null;
  };
  task_id: string;
}

export type { ReportTaskResponse };