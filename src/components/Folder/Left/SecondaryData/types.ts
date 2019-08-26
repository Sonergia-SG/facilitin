import {
  FolderMOAString,
  FolderMOEString,
  FolderSiteString,
} from '../../../../store/reducer/entities/types';

export interface FormFieldList {
  label: string;
  value: string | null;
  values: Array<{
    key: string;
    value: string;
  }>;
  key: keyof FolderMOAString | keyof FolderMOEString | keyof FolderSiteString;
  type: 'list';
}

export interface FormFieldRadio {
  label: string;
  value: string | null;
  values: Array<{
    key: string;
    value: string;
  }>;
  key: keyof FolderMOAString | keyof FolderMOEString | keyof FolderSiteString;
  type: 'radio';
}

export interface FormFieldDate {
  label: string;
  value: string | null;
  key: keyof FolderMOAString | keyof FolderMOEString | keyof FolderSiteString;
  type: 'date';
}

export interface FormFieldTextBicRule {
  format: 'bic';
}

export interface FormFieldTextIbanRule {
  format: 'iban';
}

export interface FormFieldTextSiretRule {
  format: 'siret';
}

export interface FormFieldTextFiscalNumRule {
  format: 'num_fiscal';
}

export interface FormFieldTextPhoneRule {
  format: 'phone';
}

export interface FormFieldTextPostalCodeRule {
  format: 'code_postal';
}

export interface FormFieldTextEmailRule {
  format: 'email';
}

export type FormFieldTextRules =
  | FormFieldTextPhoneRule
  | FormFieldTextBicRule
  | FormFieldTextIbanRule
  | FormFieldTextSiretRule
  | FormFieldTextPostalCodeRule
  | FormFieldTextEmailRule
  | FormFieldTextFiscalNumRule;

export interface FormFieldText {
  label: string;
  value: string | null;
  key: keyof FolderMOAString | keyof FolderMOEString | keyof FolderSiteString;
  type: 'text';
  rules?: FormFieldTextRules;
}

export interface FormFieldNumber {
  label: string;
  value: string | null;
  key: keyof FolderMOAString | keyof FolderMOEString | keyof FolderSiteString;
  type: 'number';
}

export type FormFieldDef =
  | FormFieldDate
  | FormFieldText
  | FormFieldNumber
  | FormFieldList
  | FormFieldRadio;

export interface FormSectionDef {
  label: string;
  type: 'section';
  fields: Array<FormFieldDef>;
}

export type FormDef = FormFieldDef | FormSectionDef;

export type GenericForms = Array<FormDef>;

export interface Forms {
  moa: GenericForms;
  moe: GenericForms;
  site: GenericForms;
}
