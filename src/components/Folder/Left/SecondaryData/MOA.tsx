import React from 'react';

import { FolderFull } from '../../../../store/reducer/entities/types'

interface Props {
  edit: boolean,
  dossierprime?: FolderFull,
  cancel: () => void,
  save: () => void,
}

const MOA = ({ edit, dossierprime, cancel, save }: Props) => {

  if (!dossierprime) return <p>Unavailable</p>

  return <div style={{ display: 'flex', flexDirection: 'column' }}>
  <label htmlFor="moa_nom">Nom MOA : </label>
  <input type="text" name="moa_nom" disabled={!edit} defaultValue={dossierprime.moa_nom} />
  <label htmlFor="moa_prenom"> Prénom MOA : </label>
  <input
    type="text"
    name="moa_prenom"
    disabled={!edit}
    defaultValue={dossierprime.moa_prenom}
  />
  <label htmlFor="moa_fonction">Fonction MOA : </label>
  <input
    type="text"
    name="moa_fonction"
    disabled={!edit}
    defaultValue={dossierprime.moa_fonction || ''}
  />
  <label htmlFor="moa_rue"> Adresse rue : </label>
  <input type="text" name="moa_rue" disabled={!edit} defaultValue={dossierprime.moa_rue} />
  <label htmlFor="moa_rue2">Adresse Rue 2 : </label>
  <input type="text" name="moa_rue2" disabled={!edit} defaultValue={dossierprime.moa_rue2} />
  <label htmlFor="moa_cp"> Code Postal : </label>
  <input type="text" name="moa_cp" disabled={!edit} defaultValue={dossierprime.moa_cp} />
  <label htmlFor="moa_ville"> Ville : </label>
  <input
    type="text"
    name="moa_ville"
    disabled={!edit}
    defaultValue={dossierprime.moa_ville}
  />
  <label htmlFor="moa_prenom"> Prénom MOA : </label>
  <input
    type="text"
    name="moa_prenom"
    disabled={!edit}
    defaultValue={dossierprime.moa_prenom}
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
      onClick={cancel}
      style={{ margin: '0 3px' }}
      disabled={!edit}
      className="button is-rounded is-small"
    >
      {'Annuler WIP'}
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
};

export default MOA;
