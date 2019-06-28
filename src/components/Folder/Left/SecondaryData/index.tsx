import React, { useState } from 'react';
import './SecondataData.css';

import { OperationFull } from '../../../../store/reducer/entities/types';

import MOA from './MOA';
import MOE from './MOE';
import Site from './Site';

interface Props {
  data: OperationFull;
}

type Selected = 'MOA' | 'MOE' | 'SITE';

interface State {
  selected?: Selected | undefined;
  edit: boolean;
}

const SecondaryData = ({ data }: Props) => {
  const [state, setState] = useState<State>({
    selected: undefined,
    edit: false,
  });
  const { selected, edit } = state;

  const select = (s: Selected) => () => {
    if (state.edit !== true) {
      setState({ ...state, selected: s });
    }
  };

  const editMode = () => { setState({ ...state, edit: true }); };

  const cancel = () => { setState({ edit: false, selected: undefined }); };

  const clearSelected = () => {
    if (state.edit !== true) {
      setState({ selected: undefined, edit: false });
    }
  };

  const moaSelected = selected === 'MOA';
  const moeSelected = selected === 'MOE';
  const siteSelected = selected === 'SITE';

  const someoneSelected = !!edit;

  return (
    <div
      onMouseLeave={clearSelected}
      className="tile is-child notification SecondaryData-Container"
    >
      <div className="SecondaryData-Items">
        <div
          onMouseEnter={select('MOA')}
          onClick={editMode}
          onKeyPress={editMode}
          className={`SecondaryData-Item${someoneSelected ? '' : ' SecondaryDataSelectable'}${
            moaSelected ? ' SecondaryData-Item-Selected' : ''
          }`}
          role="button"
          tabIndex={0}
        >
          {'MOA'}
        </div>
        <div
          onMouseEnter={select('MOE')}
          onClick={editMode}
          onKeyPress={editMode}
          className={`SecondaryData-Item${someoneSelected ? '' : ' SecondaryDataSelectable'}${
            moeSelected ? ' SecondaryData-Item-Selected' : ''
          }`}
          role="button"
          tabIndex={0}
        >
          {'Installateur'}
        </div>
        <div
          onMouseEnter={select('SITE')}
          onClick={editMode}
          onKeyPress={editMode}
          className={`SecondaryData-Item${someoneSelected ? '' : ' SecondaryDataSelectable'}${
            siteSelected ? ' SecondaryData-Item-Selected' : ''
          }`}
          role="button"
          tabIndex={0}
        >
          {'Travaux'}
        </div>
      </div>
      <div>
        {moaSelected && (
          <MOA
            edit={edit}
            dossierprime={data.dossierprime}
            idDpOperation={data.id_dp_operation}
            idDossierPrime={data.id_dossierprime}
            cancel={cancel}
          />
        )}
        {moeSelected && (
          <MOE
            edit={edit}
            dossierprime={data.dossierprime}
            idDpOperation={data.id_dp_operation}
            idDossierPrime={data.id_dossierprime}
            cancel={cancel}
          />
        )}
        {siteSelected && (
          <Site
            edit={edit}
            dossierprime={data.dossierprime}
            idDpOperation={data.id_dp_operation}
            idDossierPrime={data.id_dossierprime}
            cancel={cancel}
          />
        )}
      </div>
    </div>
  );
};

export default SecondaryData;
