import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';

import { folderUpdateMoaValue, folderCleanMoaValue } from '../../../../store/actions/views/folder';

import { FolderFull } from '../../../../store/reducer/entities/types';
import { FolderPendingItem } from '../../../../store/reducer/views/folder/types';
import { AppState } from '../../../../store';

import Input from './Input';

interface ConnectProps {
  idDpOperation: number;
  edit: boolean;
  dossierprime?: FolderFull;
  cancel: () => void;
  save: () => void;
}

interface Props extends ConnectProps {
  pending?: FolderPendingItem;
  updateMoa: typeof folderUpdateMoaValue;
  clean: typeof folderCleanMoaValue;
}

const MOA = ({
  idDpOperation,
  edit,
  dossierprime,
  cancel,
  save,
  pending,
  updateMoa,
  clean,
}: Props) => {
  if (!dossierprime) return <p>Unavailable</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Input
        label="Nom MOA : "
        valueKey="moa_nom"
        idDpOperation={idDpOperation}
        disabled={!edit}
        dossierprime={dossierprime}
        pending={pending}
        update={updateMoa}
      />
      <Input
        label="Prénom MOA : "
        valueKey="moa_prenom"
        idDpOperation={idDpOperation}
        disabled={!edit}
        dossierprime={dossierprime}
        pending={pending}
        update={updateMoa}
      />
      <Input
        label="Fonction MOA : "
        valueKey="moa_fonction"
        idDpOperation={idDpOperation}
        disabled={!edit}
        dossierprime={dossierprime}
        pending={pending}
        update={updateMoa}
      />
      <Input
        label="Adresse rue : "
        valueKey="moa_rue"
        idDpOperation={idDpOperation}
        disabled={!edit}
        dossierprime={dossierprime}
        pending={pending}
        update={updateMoa}
      />
      <Input
        label="Adresse rue 2 : "
        valueKey="moa_rue2"
        idDpOperation={idDpOperation}
        disabled={!edit}
        dossierprime={dossierprime}
        pending={pending}
        update={updateMoa}
      />
      <Input
        label="Code Postal : "
        valueKey="moa_cp"
        idDpOperation={idDpOperation}
        disabled={!edit}
        dossierprime={dossierprime}
        pending={pending}
        update={updateMoa}
      />
      <Input
        label="Ville : "
        valueKey="moa_ville"
        idDpOperation={idDpOperation}
        disabled={!edit}
        dossierprime={dossierprime}
        pending={pending}
        update={updateMoa}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '4px 10px',
        }}
      >
        <button
          type="button"
          onClick={() => {
            clean(idDpOperation);
            cancel();
          }}
          style={{ margin: '0 3px' }}
          disabled={!edit}
          className="button is-rounded is-small"
        >
          {'Annuler'}
        </button>
        <button
          type="button"
          onClick={save}
          style={{ margin: '0 3px' }}
          disabled={!edit}
          className="button is-success is-rounded is-small"
        >
          {'Save WIP'}
        </button>
      </div>
    </div>
  );
};

export default connect(
  (s: AppState, p: ConnectProps) => ({
    pending: s.views.folder.pending[p.idDpOperation],
  }),
  { updateMoa: folderUpdateMoaValue, clean: folderCleanMoaValue },
)(MOA);
