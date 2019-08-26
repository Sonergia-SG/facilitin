import React from 'react';
import idx from 'idx';
import { GenericForms } from './types';
import { FolderFull } from '../../../../store/reducer/entities/types';
import validateFormat from './validateFormat';
import { FolderPendingItem } from '../../../../store/reducer/views/folder/types';
import resolveInputValue from './resolveInputValue';

interface Props {
  idDpOperation: number;
  idDossierPrime: number;
  dossierprime: FolderFull;
  edit: boolean;
  edited: boolean;
  loading: boolean;
  pending?: FolderPendingItem;
  post: any;
  pendingKey: 'moe' | 'moa' | 'site';
  def: GenericForms;
}

const SaveButton = ({
  idDpOperation,
  idDossierPrime,
  post,
  edit,
  edited,
  def,
  pendingKey,
  dossierprime,
  pending,
  loading,
}: Props) => {
  const invalid = def.some((d) => {
    if (d.type === 'text') {
      const inputValue = resolveInputValue({
        pending,
        pendingKey,
        valueKey: d.key,
        defValue: d.value,
        dossierprime,
      });

      return !validateFormat(d.rules, inputValue);
    }

    return false;
  });

  return (
    <button
      type="button"
      onClick={() => post(idDossierPrime, idDpOperation)}
      style={{ margin: '0 3px' }}
      disabled={!edit || !edited || invalid}
      className={`button ${
        invalid ? 'is-danger' : 'is-success'
      } is-rounded is-small ${loading ? 'is-loading' : ''}`}
    >
      {'Save'}
    </button>
  );
};

export default SaveButton;
