import validateFormat from '../validateFormat';

describe('validateFormat', () => {
  it('valid phone (06.06.06.06.06)', () => {
    const valid = validateFormat({ format: 'phone' }, '06.06.06.06.06');

    expect(valid).toBe(true);
  });

  it('invalid phone (tel : 06.06.06.06.06)', () => {
    const valid = validateFormat({ format: 'phone' }, 'tel : 06.06.06.06.06');

    expect(valid).toBe(false);
  });

  it('invalid phone (06.06.06.06.06 )', () => {
    const valid = validateFormat({ format: 'phone' }, '06.06.06.06.06 ');

    expect(valid).toBe(false);
  });

  it('invalid phone (0606060606)', () => {
    const valid = validateFormat({ format: 'phone' }, '0606060606');

    expect(valid).toBe(false);
  });

  it('invalid phone (+33606060606)', () => {
    const valid = validateFormat({ format: 'phone' }, '+33606060606');

    expect(valid).toBe(false);
  });

  it('invalid phone (4524)', () => {
    const valid = validateFormat({ format: 'phone' }, '4524');

    expect(valid).toBe(false);
  });

  it('valid BIC (COBADEFF060)', () => {
    const valid = validateFormat({ format: 'bic' }, 'COBADEFF060');

    expect(valid).toBe(true);
  });

  it('valid BIC (bic : COBADEFF060)', () => {
    const valid = validateFormat({ format: 'bic' }, 'bic : COBADEFF060');

    expect(valid).toBe(false);
  });

  it('valid BIC (COBADEFF060 )', () => {
    const valid = validateFormat({ format: 'bic' }, 'COBADEFF060 ');

    expect(valid).toBe(false);
  });

  it('valid BIC (BKAUATWW)', () => {
    const valid = validateFormat({ format: 'bic' }, 'BKAUATWW');

    expect(valid).toBe(true);
  });

  it('invalid BIC (COBADEFF0)', () => {
    const valid = validateFormat({ format: 'bic' }, 'COBA');

    expect(valid).toBe(false);
  });

  it('valid IBAN (ES3912341234250123456789)', () => {
    const valid = validateFormat(
      { format: 'iban' },
      'ES3912341234250123456789',
    );

    expect(valid).toBe(true);
  });

  // eslint-disable-next-line no-tabs
  it('valid IBAN (ES	39	1234	1234	25	0123456789)', () => {
    const valid = validateFormat(
      { format: 'iban' },
      // eslint-disable-next-line no-tabs
      'ES	39	1234	1234	25	0123456789',
    );

    expect(valid).toBe(true);
  });

  // eslint-disable-next-line no-tabs
  it('valid IBAN (ES 39 1234 1234 25 0123456789)', () => {
    const valid = validateFormat(
      { format: 'iban' },
      'ES 39 1234 1234 25 0123456789',
    );

    expect(valid).toBe(true);
  });

  it('valid IBAN (iban : ES3912341234250123456789)', () => {
    const valid = validateFormat(
      { format: 'iban' },
      'iban : ES3912341234250123456789',
    );

    expect(valid).toBe(false);
  });

  it('valid IBAN (ES3912341234250123456789 )', () => {
    const valid = validateFormat(
      { format: 'iban' },
      'ES3912341234250123456789 ',
    );

    expect(valid).toBe(false);
  });

  // eslint-disable-next-line no-tabs
  it('valid IBAN (ES 39 1234 1234)', () => {
    const valid = validateFormat({ format: 'iban' }, 'ES 39 1234 1234');

    expect(valid).toBe(false);
  });

  it('valid SIRET (78953453400019)', () => {
    const valid = validateFormat({ format: 'siret' }, '78953453400019');

    expect(valid).toBe(true);
  });

  it('invalid SIRET (78953453400018)', () => {
    const valid = validateFormat({ format: 'siret' }, '78953453400018');

    expect(valid).toBe(false);
  });

  it('invalid SIRET (7895345340001)', () => {
    const valid = validateFormat({ format: 'siret' }, '7895345340001');

    expect(valid).toBe(false);
  });

  it('invalid SIRET (7895345340001A)', () => {
    const valid = validateFormat({ format: 'siret' }, '7895345340001A');

    expect(valid).toBe(false);
  });

  it('valid fiscal number (1234567897654)', () => {
    const valid = validateFormat({ format: 'num_fiscal' }, '1234567897654');

    expect(valid).toBe(true);
  });

  it('invalid fiscal number (123456789765)', () => {
    const valid = validateFormat({ format: 'num_fiscal' }, '123456789765');

    expect(valid).toBe(false);
  });

  it('valid postal code (04210)', () => {
    const valid = validateFormat({ format: 'code_postal' }, '04210');

    expect(valid).toBe(true);
  });

  it('invalid postal code (0421)', () => {
    const valid = validateFormat({ format: 'code_postal' }, '0421');

    expect(valid).toBe(false);
  });

  it('valid email (igor.eschalier@sonergia.fr)', () => {
    const valid = validateFormat(
      { format: 'email' },
      'igor.eschalier@sonergia.fr',
    );

    expect(valid).toBe(true);
  });

  it('invalid email (igor.eschalier@sonergia)', () => {
    const valid = validateFormat(
      { format: 'email' },
      'igor.eschalier@sonergia',
    );

    expect(valid).toBe(false);
  });

  it('invalid email (igor.eschalier)', () => {
    const valid = validateFormat({ format: 'email' }, 'igor.eschalier');

    expect(valid).toBe(false);
  });

  it('valid email (John23@example.com)', () => {
    const valid = validateFormat({ format: 'email' }, 'John23@example.com');

    expect(valid).toBe(true);
  });

  it('valid email (John+-@example.com)', () => {
    const valid = validateFormat({ format: 'email' }, 'John23+-@example.com');

    expect(valid).toBe(true);
  });

  it('valid email (John/@example.com)', () => {
    const valid = validateFormat({ format: 'email' }, 'John23/@example.com');

    expect(valid).toBe(true);
  });
});