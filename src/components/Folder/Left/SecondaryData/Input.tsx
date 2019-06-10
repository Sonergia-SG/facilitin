import React, { ChangeEvent } from 'react';
import idx from 'idx';

import { folderUpdateMoaValue } from '../../../../store/actions/views/folder';
import { FolderFull, FolderMOAString } from '../../../../store/reducer/entities/types';
import { FolderPendingItem } from '../../../../store/reducer/views/folder/types';

interface Props {
  idDpOperation: number;
  valueKey: keyof FolderMOAString;
  label: string;
  disabled: boolean;
  dossierprime: FolderFull;
  pending?: FolderPendingItem;
  update: typeof folderUpdateMoaValue;
}

const Input = ({
  pending, valueKey, dossierprime, label, disabled, update, idDpOperation,
}: Props) => {
  const value = idx(pending, _ => _.moa[valueKey]);
  const originalValue = dossierprime[valueKey]
  const cleanOriginalValue = originalValue === null ? undefined : originalValue

  return (
    <>
     <label htmlFor={valueKey}>{label}</label>
     <input
       type="text"
       name={valueKey}
       disabled={disabled}
       value={typeof value === 'string' ? value : cleanOriginalValue}
       onChange={(e: ChangeEvent<HTMLInputElement>) => update(idDpOperation, valueKey, e.target.value)
        }
     />
   </>
  );
};

export default Input
