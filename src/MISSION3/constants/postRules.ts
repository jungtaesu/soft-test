import type { ValidationRules } from '../types/validation';

export const postRules: ValidationRules = {
  title: {
    required: true,
    minLength: 5,
    maxLength: 100,
  },
  content: {
    required: true,
    minLength: 20,
  },
  tags: {
    maxCount: 5,
    pattern: '^[a-zA-Z0-9]+$',
  },
  likesThreshold: {
    required: false,
    type: 'number',
    min: 0,
    max: 9999,
  },
};