import {
  FolderMOAString,
  FolderMOEString,
  FolderSiteString,
} from '../../../../store/reducer/entities/types';

export interface FormDef {
  label: string;
  value: string | null;
  key: keyof FolderMOAString | keyof FolderMOEString | keyof FolderSiteString;
  type: 'date' | 'text';
}

export type GenericForms = Array<FormDef>;

export interface Forms {
  moa: GenericForms;
  moe: GenericForms;
  site: GenericForms;
}
