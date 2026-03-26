import type {
  FieldRule,
  FormErrors,
  FormValues,
  ValidationRules,
} from '../types/validation';

function isEmptyValue(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

function validateRequired(value: unknown): string {
  return isEmptyValue(value) ? '필수 입력 항목입니다.' : '';
}

function validateStringLength(value: unknown, rule: FieldRule): string {
  if (typeof value !== 'string') return '';

  if (rule.minLength != null && value.length < rule.minLength) {
    return `최소 ${rule.minLength}자 이상 입력하세요.`;
  }

  if (rule.maxLength != null && value.length > rule.maxLength) {
    return `최대 ${rule.maxLength}자까지 입력 가능합니다.`;
  }

  return '';
}

function validateArrayRules(value: unknown, rule: FieldRule): string {
  if (!Array.isArray(value)) return '';

  if (rule.maxCount != null && value.length > rule.maxCount) {
    return `최대 ${rule.maxCount}개까지 입력할 수 있습니다.`;
  }

  if (rule.pattern) {
    const regex = new RegExp(rule.pattern);
    const hasInvalidTag = value.some(
      (item) => typeof item !== 'string' || !regex.test(item)
    );

    if (hasInvalidTag) {
      return '태그는 영문자와 숫자만 입력할 수 있습니다.';
    }
  }

  return '';
}

function validateNumberRules(value: unknown, rule: FieldRule): string {
  if (isEmptyValue(value)) return '';

  const numericValue =
    typeof value === 'number' ? value : Number(String(value).trim());

  if (Number.isNaN(numericValue)) {
    return '숫자만 입력할 수 있습니다.';
  }

  if (rule.min != null && numericValue < rule.min) {
    return `${rule.min} 이상 입력해야 합니다.`;
  }

  if (rule.max != null && numericValue > rule.max) {
    return `${rule.max} 이하로 입력해야 합니다.`;
  }

  return '';
}

export function validateField(
  name: string,
  value: unknown,
  rules: ValidationRules
): string {
  const rule = rules[name];
  if (!rule) return '';

  if (rule.required) {
    const requiredError = validateRequired(value);
    if (requiredError) return requiredError;
  }

  if (isEmptyValue(value)) return '';

  if (rule.type === 'number') {
    const numberError = validateNumberRules(value, rule);
    if (numberError) return numberError;
  }

  const stringError = validateStringLength(value, rule);
  if (stringError) return stringError;

  const arrayError = validateArrayRules(value, rule);
  if (arrayError) return arrayError;

  return '';
}

export function validateForm(
  values: FormValues,
  rules: ValidationRules
): FormErrors {
  return Object.keys(rules).reduce<FormErrors>((acc, fieldName) => {
    acc[fieldName] = validateField(fieldName, values[fieldName], rules);
    return acc;
  }, {});
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.values(errors).some((error) => error !== '');
}