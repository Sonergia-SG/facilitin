import React, { useState } from 'react';
import './SecondataData.css';

import idx from 'idx';
import { OperationFull } from '../../../../store/reducer/entities/types';

import forms from './mockedForms';

import Card from '../../../../Common/UIKIT/Card';
import MOA from './MOA';
import MOE from './MOE';
import Site from './Site';

import AnimatedHeight from '../../../../Common/AnimateHeight';
import { FolderPendingItem } from '../../../../store/reducer/views/folder/types';

interface Props {
  data: OperationFull;
  locked: boolean;
  pending: FolderPendingItem | undefined;
}

type Selected = 'MOA' | 'MOE' | 'SITE';

interface State {
  selected?: Selected | undefined;
  edit: boolean;
}

const SecondaryData = ({ data, locked, pending }: Props) => {
  const [state, setState] = useState<State>({
    selected: undefined,
    edit: false,
  });
  const { selected, edit } = state;

  const cantChangeSection = idx(pending, _ => _.moa)
    || idx(pending, _ => _.moe)
    || idx(pending, _ => _.site);

  const select = (s: Selected) => () => {
    if (state.edit !== true) {
      setState({ ...state, selected: s });
    }
  };

  const editMode = (s: Selected) => () => {
    if (!cantChangeSection) {
      const clear = state.selected === s && state.edit === true;
      setState({
        ...state,
        edit: true,
        selected: clear ? undefined : s,
      });
    }
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

  return (
    <Card onMouseLeave={clearSelected} className="SecondaryData-Container">
      <div className="SecondaryData-Items">
        <div
          onMouseEnter={select('MOA')}
          onClick={editMode('MOA')}
          onKeyPress={editMode('MOA')}
          className={`SecondaryData-Item${
            cantChangeSection ? '' : ' SecondaryDataSelectable'
          }${moaSelected ? ' SecondaryData-Item-Selected' : ''}`}
          role="button"
          tabIndex={0}
        >
          {'Bénéficiaire'}
        </div>
        <div className="SecondaryData-Separator" />
        <div
          onMouseEnter={select('MOE')}
          onClick={editMode('MOE')}
          onKeyPress={editMode('MOE')}
          className={`SecondaryData-Item${
            cantChangeSection ? '' : ' SecondaryDataSelectable'
          }${moeSelected ? ' SecondaryData-Item-Selected' : ''}`}
          role="button"
          tabIndex={0}
        >
          {'Installateur'}
        </div>
        <div className="SecondaryData-Separator" />
        <div
          onMouseEnter={select('SITE')}
          onClick={editMode('SITE')}
          onKeyPress={editMode('SITE')}
          className={`SecondaryData-Item${
            cantChangeSection ? '' : ' SecondaryDataSelectable'
          }${siteSelected ? ' SecondaryData-Item-Selected' : ''}`}
          role="button"
          tabIndex={0}
        >
          {'Travaux'}
        </div>
      </div>
      <AnimatedHeight>
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
                def={data.forms.moa}
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
      </AnimatedHeight>
    </Card>
  );
};

export default SecondaryData;
