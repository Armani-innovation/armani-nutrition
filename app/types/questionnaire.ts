export interface Question {
  id: number;
  question: string;
  type: "text" | "number" | "multiple-choice";
  required: boolean;
  options: string[];
  multipleSelect: boolean;
  placeholder: string | null;
  followUp: {
    if: string;
    type: "text" | "number" | "multiple-choice";
    placeholder: string | null;
  } | null;
}
