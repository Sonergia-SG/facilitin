import React, { ChangeEvent } from 'react';
import idx from 'idx';

import { FormFieldRadio } from './types';
import UIRadio from '../../../../Common/UIKIT/Form/Radio';
import { FolderFull } from '../../../../store/reducer/entities/types';
import { FolderPendingItem } from '../../../../store/reducer/views/folder/types';
import {
  folderUpdateMoaValue,
  folderUpdateMoeValue,
  folderUpdateSiteValue,
} from '../../../../store/actions';

import './Radio.css';

type GenericUpdate = (idDpOperation: number, key: string, value: string) => void;

interface Props {
  data: FormFieldRadio;
  idDpOperation: number;
  disabled: boolean;
  dossierprime: FolderFull;
  pending?: FolderPendingItem;
  pendingKey: 'moe' | 'moa' | 'site';
  update:
  | GenericUpdate
  | typeof folderUpdateMoaValue
  | typeof folderUpdateMoeValue
  | typeof folderUpdateSiteValue;
}

const Radio = ({
  data,
  update,
  idDpOperation,
  pendingKey,
  pending,
  dossierprime,
  disabled,
}: Props) => {
  const v = idx(pending, _ => _[pendingKey][data.key]);
  const originalValue = data.value || dossierprime[data.key];
  const cleanOriginalValue = originalValue === null || originalValue === undefined ? '' : originalValue;

  // const isEdited = v !== undefined;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    update(idDpOperation, data.key, e.target.value);
  };

  const selected = typeof v === 'string' ? v : cleanOriginalValue;

  return (
    <div>
      <p className="SecondaryData-Radio-Label">{data.label}</p>
      {data.values.map(value => (
        <div className="SecondaryData-Radio" key={value.key}>
          <UIRadio
            checked={selected === value.key}
            id={value.key}
            name={value.key}
            onChange={handleChange}
            disabled={disabled}
            value={value.key}
          />
          <label htmlFor={value.key}>{value.value}</label>
        </div>
      ))}
    </div>
  );
};

export default Radio;
