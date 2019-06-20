import React, { ChangeEvent, Fragment } from 'react';
import idx from 'idx';

import { folderUpdateMoaValue, folderUpdateMoeValue } from '../../../../store/actions/views/folder';
import { FolderFull, FolderMOAString, FolderMOEString } from '../../../../store/reducer/entities/types';
import { FolderPendingItem } from '../../../../store/reducer/views/folder/types';

interface Props {
  idDpOperation: number;
  valueKey: keyof FolderMOAString | keyof FolderMOEString;
  label: string;
  disabled: boolean;
  dossierprime: FolderFull;
  pending?: FolderPendingItem;
  pendingKey: 'moe' | 'moa';
  update: typeof folderUpdateMoaValue | typeof folderUpdateMoeValue;
}

const Input = ({
  pending,
  valueKey,
  dossierprime,
  label,
  disabled,
  update,
  idDpOperation,
  pendingKey,
}: Props) => {
  const value = idx(pending, _ => _[pendingKey][valueKey]);
  const originalValue = dossierprime[valueKey];
  const cleanOriginalValue = originalValue === null ? undefined : originalValue;

  const isEdited = value !== undefined;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    update(idDpOperation, valueKey, e.target.value);
  };

  return (
    <Fragment>
      <label htmlFor={valueKey}>{label}</label>
      <input
        type="text"
        name={valueKey}
        placeholder={label}
        className={`input${isEdited ? ' is-info' : ''}`}
        disabled={disabled}
        value={typeof value === 'string' ? value : cleanOriginalValue}
        onChange={handleChange}
      />
    </Fragment>
  );
};

export default Input;
