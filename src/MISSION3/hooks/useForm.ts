import { useState } from 'react';
import type {
  FormErrors,
  FormValues,
  ValidationRules,
} from '../types/validation';
import { hasErrors, validateField, validateForm } from '../utils/validation';

export function useForm<T extends FormValues>(
  rules: ValidationRules,
  initialValues: T
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>(() =>
    Object.keys(initialValues).reduce<FormErrors>((acc, key) => {
      acc[key] = '';
      return acc;
    }, {})
  );

  const handleChange = (name: keyof T, value: unknown) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(String(name), value, rules);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit =
    (onSubmit: (formValues: T) => void) => (event?: React.FormEvent) => {
      event?.preventDefault();

      const nextErrors = validateForm(values, rules);
      setErrors(nextErrors);

      if (!hasErrors(nextErrors)) {
        onSubmit(values);
      }
    };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}