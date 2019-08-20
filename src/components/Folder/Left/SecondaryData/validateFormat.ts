import idx from 'idx';
import { FormFieldTextRules } from './types';
import phone from '../../../../Common/regex/phone';

const validateFormat = (rules?: FormFieldTextRules, value?: string | null) => {
  const format = idx(rules, _ => _.format);

  switch (format) {
    case 'phone':
      return phone.test(value || '');
    default:
      return true;
  }
};

export default validateFormat;
