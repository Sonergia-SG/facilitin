import React, { ChangeEvent, Fragment } from 'react';
import idx from 'idx';

import './Select.css';

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
  values: Array<{
    key: string;
    value: string;
  }>;
  update:
  | GenericUpdate
  | typeof folderUpdateMoaValue
  | typeof folderUpdateMoeValue
  | typeof folderUpdateSiteValue;
}

const Select = ({
  pending,
  valueKey,
  value,
  values,
  dossierprime,
  label,
  disabled,
  update,
  idDpOperation,
  pendingKey,
}: Props) => {
  const v = idx(pending, _ => _[pendingKey][valueKey]);
  const originalValue = value || dossierprime[valueKey];
  const cleanOriginalValue = originalValue === null || originalValue === undefined ? '' : originalValue;

  const isEdited = v !== undefined;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    update(idDpOperation, valueKey, e.target.value);
  };

  const selected = typeof v === 'string' ? v : cleanOriginalValue;

  return (
    <Fragment>
      <label className="SecondaryData-Select-Label" htmlFor={valueKey}>
        {label}
      </label>
      <select
        name={valueKey}
        value={selected}
        className={`Select-bucket${isEdited ? ' Select-edited' : ''}`}
        onChange={handleChange}
        disabled={disabled}
        placeholder={label}
      >
        {values.map(o => (
          <option key={o.key} value={o.key}>
            {o.value}
          </option>
        ))}
      </select>
    </Fragment>
  );
};

export default Select;
