import idx from 'idx';
import { FormFieldTextRules } from './types';
import validateFormat from './validateFormat';

const formatErrorMsg = (rules?: FormFieldTextRules, value?: string | null) => {
  if (validateFormat(rules, value)) return '';

  const format = idx(rules, _ => _.format);

  switch (format) {
    case 'phone':
      return 'Format invalide (XX.XX.XX.XX.XX)';
    case 'bic':
      return 'BIC invalide';
    case 'iban':
      return 'IBAN invalide';
    case 'siret':
      return 'SIRET invalide';
    case 'num_fiscal':
      return 'Numéro fiscale invalide';
    case 'code_postal':
      return 'Code postal invalide';
    default:
      return '';
  }
};

export default formatErrorMsg;
