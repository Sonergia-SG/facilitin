import React from 'react';
import { connect } from 'react-redux';

import {
  folderUpdateMoeValue,
  folderCleanMoeValue,
  updateMoeValues,
} from '../../../../store/actions/views/folder';

import { FolderFull } from '../../../../store/reducer/entities/types';
import { FolderPendingItem } from '../../../../store/reducer/views/folder/types';
import { AppState } from '../../../../store';

import Input from './Input';
import { GenericForms } from './types';

interface ConnectProps {
  idDpOperation: number;
  idDossierPrime: number;
  edit: boolean;
  dossierprime?: FolderFull;
  cancel: () => void;
}

interface Props extends ConnectProps {
  pending?: FolderPendingItem;
  updateMoe: typeof folderUpdateMoeValue;
  post: any;
  clean: typeof folderCleanMoeValue;
  def: GenericForms;
}

const MOE = ({
  idDpOperation,
  idDossierPrime,
  edit,
  dossierprime,
  cancel,
  post,
  pending,
  updateMoe,
  clean,
  def,
}: Props) => {
  if (!dossierprime) return <p>Unavailable</p>;

  const loading = !!pending && !!pending.moeLoading;
  const edited = !!pending && !!pending.moe;

  const disabledInput = !edit || loading;


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {def.map(d => (
        <Input
          key={d.key}
          label={`${d.label} :`}
          valueKey={d.key}
          value={d.value}
          type={d.type}
          idDpOperation={idDpOperation}
          disabled={disabledInput}
          dossierprime={dossierprime}
          pending={pending}
          pendingKey="moe"
          update={updateMoe}
        />
      ))}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '4px 10px',
        }}
      >
        {edited ? (
          <button
            type="button"
            onClick={() => {
              clean(idDpOperation);
            }}
            style={{ margin: '0 3px' }}
            disabled={!edit || loading}
            className="button is-rounded is-small"
          >
            {'Annuler'}
          </button>
        ) : (
          <button
            type="button"
            onClick={cancel}
            style={{ margin: '0 3px' }}
            disabled={!edit || loading}
            className="button is-rounded is-small"
          >
            {'Fermer'}
          </button>
        )}
        <button
          type="button"
          onClick={() => post(idDossierPrime, idDpOperation)}
          style={{ margin: '0 3px' }}
          disabled={!edit || !edited}
          className={`button is-success is-rounded is-small ${loading ? 'is-loading' : ''}`}
        >
          {'Save'}
        </button>
      </div>
    </div>
  );
};

export default connect(
  (s: AppState, p: ConnectProps) => ({
    pending: s.views.folder.pending[p.idDpOperation],
  }),
  { updateMoe: folderUpdateMoeValue, clean: folderCleanMoeValue, post: updateMoeValues },
)(MOE);
