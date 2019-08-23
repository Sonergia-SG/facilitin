import formatErrorMsg from '../formatErrorMsg';

describe('formatErrorMsg', () => {
  it('display good message with invalid phone', () => {
    const message = formatErrorMsg({ format: 'phone' }, '06');

    expect(message).toEqual('Format invalide (XX.XX.XX.XX.XX)');
  });

  it('display good message with valid phone', () => {
    const message = formatErrorMsg({ format: 'phone' }, '06.06.06.06.06');

    expect(message).toEqual('');
  });

  it('display good message with invalid bic', () => {
    const message = formatErrorMsg({ format: 'bic' }, 'QSD');

    expect(message).toEqual('BIC invalide');
  });

  it('display good message with valid bic', () => {
    const message = formatErrorMsg({ format: 'bic' }, 'COBADEFF060');

    expect(message).toEqual('');
  });

  it('display good message with invalid iban', () => {
    const message = formatErrorMsg({ format: 'iban' }, 'QSD');

    expect(message).toEqual('IBAN invalide');
  });

  it('display good message with valid iban', () => {
    const message = formatErrorMsg(
      { format: 'iban' },
      // eslint-disable-next-line no-tabs
      'ES	39	1234	1234	25	0123456789',
    );

    expect(message).toEqual('');
  });

  it('display good message with no rules', () => {
    const message = formatErrorMsg(undefined, 'qsdf');

    expect(message).toEqual('');
  });

  it('display good message with invalid siret', () => {
    const message = formatErrorMsg({ format: 'siret' }, '78953453400018');

    expect(message).toEqual('SIRET invalide');
  });

  it('display good message with valid siret', () => {
    const message = formatErrorMsg({ format: 'siret' }, '78953453400019');

    expect(message).toEqual('');
  });

  it('display good message with invalid fiscal number', () => {
    const message = formatErrorMsg({ format: 'num_fiscal' }, '123456789765');

    expect(message).toEqual('Numéro fiscale invalide');
  });

  it('display good message with valid fiscal number', () => {
    const message = formatErrorMsg({ format: 'num_fiscal' }, '1234567897654');

    expect(message).toEqual('');
  });

  it('display good message with invalid postal code', () => {
    const message = formatErrorMsg({ format: 'code_postal' }, '0421');

    expect(message).toEqual('Code postal invalide');
  });

  it('display good message with valid postal code', () => {
    const message = formatErrorMsg({ format: 'code_postal' }, '04210');

    expect(message).toEqual('');
  });
});
