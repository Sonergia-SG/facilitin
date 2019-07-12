import React from 'react';
import { connect } from 'react-redux';

import {
  folderUpdateSiteValue,
  folderCleanSiteValue,
  updateSiteValues,
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
  updateSite: typeof folderUpdateSiteValue;
  post: any;
  clean: typeof folderCleanSiteValue;
}

const Site = ({
  idDpOperation,
  idDossierPrime,
  edit,
  dossierprime,
  cancel,
  post,
  pending,
  updateSite,
  clean,
  locked,
}: Props) => {
  if (!dossierprime) return <p>Unavailable</p>;

  const loading = !!pending && !!pending.siteLoading;
  const edited = !!pending && !!pending.site;

  const disabledInput = !edit || loading || locked;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Input
        label="Nom du site :"
        valueKey="adresse_travaux_nomsite"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="site"
        update={updateSite}
      />
      <Input
        label="Rue :"
        valueKey="adresse_travaux_rue"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="site"
        update={updateSite}
      />
      <Input
        label="Rue complément :"
        valueKey="adresse_travaux_rue2"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="site"
        update={updateSite}
      />
      <Input
        label="Code postal :"
        valueKey="adresse_travaux_cp"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="site"
        update={updateSite}
      />
      <Input
        label="Ville :"
        valueKey="adresse_travaux_ville"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="site"
        update={updateSite}
      />
      <Input
        label="Début des travaux :"
        valueKey="date_debut_travaux"
        type="date"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="site"
        update={
          (id: number, key: string, value: string) => {
            updateSite(id, key, value === '' ? null : value);
          }
        }
      />
      <Input
        label="Fin des travaux :"
        type="date"
        valueKey="date_fin_travaux"
        idDpOperation={idDpOperation}
        disabled={disabledInput}
        dossierprime={dossierprime}
        pending={pending}
        pendingKey="site"
        update={
          (id: number, key: string, value: string) => {
            updateSite(id, key, value === '' ? null : value);
          }
        }
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
  { updateSite: folderUpdateSiteValue, clean: folderCleanSiteValue, post: updateSiteValues },
)(Site);
