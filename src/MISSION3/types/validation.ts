export type RuleType = 'string' | 'number';

export type FieldRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  maxCount?: number;
  pattern?: string;
  type?: RuleType;
  min?: number;
  max?: number;
};

export type ValidationRules = Record<string, FieldRule>;

export type FormValues = Record<string, unknown>;
export type FormErrors = Record<string, string>;