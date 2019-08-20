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
    label: string;
  }>;
  key: keyof FolderMOAString | keyof FolderMOEString | keyof FolderSiteString;
  type: 'list';
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

export interface FormFieldTextPhoneRule {
  format: 'phone';
}

export type FormFieldTextRules =
  | FormFieldTextPhoneRule
  | FormFieldTextBicRule
  | FormFieldTextIbanRule;

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
  | FormFieldList;

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
