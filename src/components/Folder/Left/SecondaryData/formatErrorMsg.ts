import idx from 'idx';
import { FormFieldTextRules } from './types';
import validateFormat from './validateFormat';

const formatErrorMsg = (rules?: FormFieldTextRules, value?: string | null) => {
  if (validateFormat(rules, value)) return '';

  const format = idx(rules, _ => _.format);

  switch (format) {
    case 'phone':
      return 'Format invalide (XX.XX.XX.XX.XX)';
    default:
      return '';
  }
};

export default formatErrorMsg;
