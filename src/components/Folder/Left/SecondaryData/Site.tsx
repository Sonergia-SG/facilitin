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

import { GenericForms } from './types';
import Form from './Form';
import SaveButton from './SaveButton';

interface ConnectProps {
  idDpOperation: number;
  idDossierPrime: number;
  edit: boolean;
  dossierprime?: FolderFull;
  cancel: () => void;
  def: GenericForms;
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
  def,
  locked,
}: Props) => {
  if (!dossierprime) return <p>Unavailable</p>;

  const loading = !!pending && !!pending.siteLoading;
  const edited = !!pending && !!pending.site;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Form
        def={def}
        idDpOperation={idDpOperation}
        formKey="site"
        dossierprime={dossierprime}
        pending={pending}
        edit={edit}
        locked={locked}
        loading={loading}
        updater={updateSite}
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
        <SaveButton
          idDpOperation={idDpOperation}
          idDossierPrime={idDossierPrime}
          dossierprime={dossierprime}
          edit={edit}
          edited={edited}
          loading={loading}
          pending={pending}
          post={post}
          pendingKey="site"
          def={def}
        />
      </div>
    </div>
  );
};

export default connect(
  (s: AppState, p: ConnectProps) => ({
    pending: s.views.folder.pending[p.idDpOperation],
  }),
  {
    updateSite: folderUpdateSiteValue,
    clean: folderCleanSiteValue,
    post: updateSiteValues,
  },
)(Site);
