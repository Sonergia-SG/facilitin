import React, { ChangeEvent, Fragment } from 'react';
import idx from 'idx';

import './Input.css';

import {
  folderUpdateMoaValue,
  folderUpdateMoeValue,
  folderUpdateSiteValue,
} from '../../../../store/actions/views/folder';
import {
  FolderFull,
  FolderMOAString,
  FolderMOEString,
  FolderSiteString,
} from '../../../../store/reducer/entities/types';
import { FolderPendingItem } from '../../../../store/reducer/views/folder/types';
import { FormFieldTextRules } from './types';
import validateFormat from './validateFormat';
import inputStatusClass from './inputStatusClass';
import formatErrorMsg from './formatErrorMsg';
import resolveInputValue from './resolveInputValue';

type GenericUpdate = (
  idDpOperation: number,
  key: string,
  value: string
) => void;

interface Props {
  idDpOperation: number;
  valueKey:
  | keyof FolderMOAString
  | keyof FolderMOEString
  | keyof FolderSiteString;
  label: string;
  rules?: FormFieldTextRules;
  disabled: boolean;
  dossierprime: FolderFull;
  pending?: FolderPendingItem;
  pendingKey: 'moe' | 'moa' | 'site';
  value?: string | null;
  type?: string;
  update:
  | GenericUpdate
  | typeof folderUpdateMoaValue
  | typeof folderUpdateMoeValue
  | typeof folderUpdateSiteValue;
}

const format = (value?: string, rules?: FormFieldTextRules) => {
  if (rules && rules.format === 'num_fiscal') {
    if (/^[0-9]+$/.test(value || '')) {
      return (value || '').split('').reduce((r, v, i) => {
        if (i === 2 || i === 4 || i === 7 || i === 10) return `${r} ${v}`;

        return `${r}${v}`;
      }, '');
    }
  }

  return value;
};

const unformat = (newvalue?: string, rules?: FormFieldTextRules) => {
  if (rules && rules.format === 'num_fiscal') {
    if (/^[0-9\s]+$/.test(newvalue || '')) {
      return (newvalue || '').replace(/\s/g, '');
    }
  }

  return newvalue || '';
};

const Input = ({
  pending,
  valueKey,
  value,
  rules,
  dossierprime,
  label,
  disabled,
  update,
  idDpOperation,
  pendingKey,
  type,
}: Props) => {
  const v = idx(pending, _ => _[pendingKey][valueKey]);
  const inputValue = resolveInputValue({
    pending,
    pendingKey,
    valueKey,
    defValue: value,
    dossierprime,
  });

  const isEdited = v !== undefined;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    update(idDpOperation, valueKey, unformat(e.target.value, rules));
  };

  const valid = validateFormat(rules, inputValue);

  return (
    <Fragment>
      <label className="Input-Label" htmlFor={valueKey}>
        {label}
      </label>
      <input
        type={type || 'text'}
        name={valueKey}
        placeholder={label}
        className={`Input input${inputStatusClass(isEdited, !valid)}`}
        disabled={disabled}
        value={format(inputValue, rules)}
        onChange={handleChange}
      />
      <p className="Input-Error-Msg">{formatErrorMsg(rules, inputValue)}</p>
    </Fragment>
  );
};

export default Input;
