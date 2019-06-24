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

import Input from './Input';

interface ConnectProps {
  idDpOperation: number;
  idDossierPrime: number;
  edit: boolean;
  dossierprime?: FolderFull;
  cancel: () => void;
}

interface Props extends ConnectProps {
  pending?: FolderPendingItem;
  updateMoa: typeof folderUpdateMoaValue;
  post: any;
  clean: typeof folderCleanMoaValue;
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
}: Props) => {
  if (!dossierprime) return <p>Unavailable</p>;

  const loading = !!pending && !!pending.moaLoading;
  const edited = !!pending && !!pending.moa;

  const disabledInput = !edit || loading;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Input
        label="Nom MOA : "
        valueKey="moa_nom"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="moa"
        update={updateMoa}
      />
      <Input
        label="Prénom MOA : "
        valueKey="moa_prenom"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="moa"
        update={updateMoa}
      />
      <Input
        label="Fonction MOA : "
        valueKey="moa_fonction"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="moa"
        update={updateMoa}
      />
      <Input
        label="Adresse rue : "
        valueKey="moa_rue"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="moa"
        update={updateMoa}
      />
      <Input
        label="Adresse rue 2 : "
        valueKey="moa_rue2"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="moa"
        update={updateMoa}
      />
      <Input
        label="Code Postal : "
        valueKey="moa_cp"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="moa"
        update={updateMoa}
      />
      <Input
        label="Ville : "
        valueKey="moa_ville"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="moa"
        update={updateMoa}
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
