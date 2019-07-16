import {
  FolderMOAString,
  FolderMOEString,
  FolderSiteString,
} from '../../../../store/reducer/entities/types';

export interface FormFieldDef {
  label: string;
  value: string | null;
  key: keyof FolderMOAString | keyof FolderMOEString | keyof FolderSiteString;
  type: 'date' | 'text';
}

export interface FormSectionDef {
  label: string;
  type: 'section';
  fields: Array<FormFieldDef>;
}

export type FormDef = FormFieldDef | FormSectionDef

export type GenericForms = Array<FormDef>;

export interface Forms {
  moa: GenericForms;
  moe: GenericForms;
  site: GenericForms;
}
