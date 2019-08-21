import idx from 'idx';

import { FormFieldTextRules } from './types';
import phone from '../../../../Common/regex/phone';
import bic from '../../../../Common/regex/bic';
import iban from '../../../../Common/regex/iban';
import fiscalNumber from '../../../../Common/regex/fiscalNumber';
import siret from '../../../../Common/validator/siret';

const validateFormat = (rules?: FormFieldTextRules, value?: string | null) => {
  const format = idx(rules, _ => _.format);

  switch (format) {
    case 'phone':
      return phone.test(value || '');
    case 'bic':
      return bic.test(value || '');
    case 'iban':
      return iban.test(value || '');
    case 'siret':
      return siret.test(value || '');
    case 'num_fiscal':
      return fiscalNumber.test(value || '');
    default:
      return true;
  }
};

export default validateFormat;
