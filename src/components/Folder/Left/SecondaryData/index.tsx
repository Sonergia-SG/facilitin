import React, { useState } from 'react';
import './SecondataData.css';

import { OperationFull } from '../../../../store/reducer/entities/types';

import forms from './mockedForms';

import Card from '../../../../Common/UIKIT/Card';
import MOA from './MOA';
import MOE from './MOE';
import Site from './Site';
import AnimatedHeight from '../../../../Common/AnimateHeight';

interface Props {
  data: OperationFull;
  locked: boolean;
}

type Selected = 'MOA' | 'MOE' | 'SITE';

interface State {
  selected?: Selected | undefined;
  edit: boolean;
}

const SecondaryData = ({ data, locked }: Props) => {
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

  const editMode = () => {
    setState({ ...state, edit: true });
  };

  const cancel = () => {
    setState({ edit: false, selected: undefined });
  };

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
    <Card onMouseLeave={clearSelected} className="SecondaryData-Container">
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
          <div style={{ padding: '12px 8px 5px' }}>
            <MOA
              edit={edit}
              dossierprime={data.dossierprime}
              idDpOperation={data.id_dp_operation}
              idDossierPrime={data.id_dossierprime}
              cancel={cancel}
              locked={locked}
              def={forms.moa}
            />
          </div>
        )}
        {moeSelected && (
          <div style={{ padding: '12px 8px 5px' }}>
            <MOE
              edit={edit}
              dossierprime={data.dossierprime}
              idDpOperation={data.id_dp_operation}
              idDossierPrime={data.id_dossierprime}
              cancel={cancel}
              locked={locked}
              def={forms.moe}
            />
          </div>
        )}
        {siteSelected && (
          <div style={{ padding: '12px 8px 5px' }}>
            <Site
              edit={edit}
              dossierprime={data.dossierprime}
              idDpOperation={data.id_dp_operation}
              idDossierPrime={data.id_dossierprime}
              cancel={cancel}
              locked={locked}
              def={forms.site}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default SecondaryData;
