import React from 'react';
import { connect } from 'react-redux';

import {
  folderUpdateMoaValue,
  folderCleanMoaValue,
  updateMoaValues,
} from '../../../../store/actions/views/folder';

import { FolderFull } from '../../../../store/reducer/entities/types';
import { FolderPendingItem } from '../../../../store/reducer/views/folder/types';
import { AppState } from '../../../../store';

import Form from './Form';

import { GenericForms } from './types';

interface ConnectProps {
  idDpOperation: number;
  idDossierPrime: number;
  edit: boolean;
  dossierprime?: FolderFull;
  cancel: () => void;
  locked: boolean;
}

interface Props extends ConnectProps {
  pending?: FolderPendingItem;
  updateMoa: typeof folderUpdateMoaValue;
  post: any;
  clean: typeof folderCleanMoaValue;
  def: GenericForms;
}

const MOA = ({
  idDpOperation,
  idDossierPrime,
  edit,
  dossierprime,
  cancel,
  post,
  pending,
  updateMoa,
  clean,
  def,
  locked,
}: Props) => {
  if (!dossierprime) return <p>Unavailable</p>;

  const loading = !!pending && !!pending.moaLoading;
  const edited = !!pending && !!pending.moa;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Form
        def={def}
        idDpOperation={idDpOperation}
        formKey="moa"
        dossierprime={dossierprime}
        pending={pending}
        edit={edit}
        locked={locked}
        loading={loading}
        updater={updateMoa}
      />
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
  { updateMoa: folderUpdateMoaValue, clean: folderCleanMoaValue, post: updateMoaValues },
)(MOA);
