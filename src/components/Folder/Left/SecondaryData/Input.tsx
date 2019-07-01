import React, { ChangeEvent, Fragment } from 'react';
import idx from 'idx';

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

type GenericUpdate = (idDpOperation: number, key: string, value: string) => void;

interface Props {
  idDpOperation: number;
  valueKey: keyof FolderMOAString | keyof FolderMOEString | keyof FolderSiteString;
  label: string;
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

const Input = ({
  pending,
  valueKey,
  value,
  dossierprime,
  label,
  disabled,
  update,
  idDpOperation,
  pendingKey,
  type,
}: Props) => {
  const v = idx(pending, _ => _[pendingKey][valueKey]);
  const originalValue = value || dossierprime[valueKey];
  const cleanOriginalValue = originalValue === null ? undefined : originalValue;

  const isEdited = v !== undefined;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    update(idDpOperation, valueKey, e.target.value);
  };

  return (
    <Fragment>
      <label htmlFor={valueKey}>{label}</label>
      <input
        type={type || 'text'}
        name={valueKey}
        placeholder={label}
        className={`input${isEdited ? ' is-info' : ''}`}
        disabled={disabled}
        value={typeof v === 'string' ? v : cleanOriginalValue}
        onChange={handleChange}
      />
    </Fragment>
  );
};

export default Input;
