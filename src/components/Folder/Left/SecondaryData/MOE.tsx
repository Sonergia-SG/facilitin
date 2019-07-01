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
  updateMoe: typeof folderUpdateMoeValue;
  post: any;
  clean: typeof folderCleanMoeValue;
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
  locked,
}: Props) => {
  if (!dossierprime) return <p>Unavailable</p>;

  const loading = !!pending && !!pending.moeLoading;
  const edited = !!pending && !!pending.moe;

  const disabledInput = !edit || loading || locked;


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Input
        label="Denomination :"
        valueKey="moe_denomination"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="moe"
        update={updateMoe}
      />
      <Input
        label="Siret :"
        valueKey="moe_siret"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="moe"
        update={updateMoe}
      />
      <Input
        label="Télèphone :"
        valueKey="moe_tel"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="moe"
        update={updateMoe}
      />
      <Input
        label="Fax :"
        valueKey="moe_fax"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="moe"
        update={updateMoe}
      />
      <Input
        label="Rue :"
        valueKey="moe_rue"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="moe"
        update={updateMoe}
      />
      <Input
        label="Code postal :"
        valueKey="moe_cp"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="moe"
        update={updateMoe}
      />
      <Input
        label="Ville :"
        valueKey="moe_ville"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="moe"
        update={updateMoe}
      />
      <Input
        label="Commentaire :"
        valueKey="moe_commentaire"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="moe"
        update={updateMoe}
      />
      <Input
        label="Email :"
        valueKey="moe_individu_email"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="moe"
        update={updateMoe}
      />
      <Input
        label="Contact :"
        valueKey="moe_contact"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="moe"
        update={updateMoe}
      />
      <Input
        label="Contact prenom :"
        valueKey="moe_contact_prenom"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="moe"
        update={updateMoe}
      />
      <Input
        label="Contact mobile :"
        valueKey="moe_contact_mobile"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="moe"
        update={updateMoe}
      />
      <Input
        label="Contact fonction :"
        valueKey="moe_contact_fonction"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="moe"
        update={updateMoe}
      />
      <Input
        label="BIC :"
        valueKey="moe_bic"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="moe"
        update={updateMoe}
      />
      <Input
        label="Iban :"
        valueKey="moe_iban"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="moe"
        update={updateMoe}
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
  { updateMoe: folderUpdateMoeValue, clean: folderCleanMoeValue, post: updateMoeValues },
)(MOE);
