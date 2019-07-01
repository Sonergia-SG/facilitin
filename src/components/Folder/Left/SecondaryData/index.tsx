import React, { Component } from 'react';
import './SecondataData.css';

import { OperationFull } from '../../../../store/reducer/entities/types';

import MOA from './MOA';
import MOE from './MOE';
import Site from './Site';

interface Props {
  data: OperationFull;
  locked: boolean;
}

type Selected = 'MOA' | 'MOE' | 'SITE';

interface State {
  selected?: Selected;
  edit: boolean;
}

class SecondaryData extends Component<Props, State> {
  state = {
    selected: undefined,
    edit: false,
  };

  select = (selected: Selected) => () => {
    if (this.state.edit !== true) {
      this.setState({ selected });
    }
  };

  editMode = () => {
    this.setState({ edit: true });
  };

  cancel = () => {
    this.setState({ edit: false, selected: undefined });
  };

  clearSelected = () => {
    if (this.state.edit !== true) {
      this.setState({ selected: undefined, edit: false });
    }
  };

  render() {
    const { data, locked } = this.props;
    const { selected, edit } = this.state;

    const moaSelected = selected === 'MOA';
    const moeSelected = selected === 'MOE';
    const siteSelected = selected === 'SITE';

    const someoneSelected = !!edit;

    return (
      <div
        onMouseLeave={this.clearSelected}
        className="tile is-child notification SecondaryData-Container"
      >
        <div className="SecondaryData-Items">
          <div
            onMouseEnter={this.select('MOA')}
            onClick={this.editMode}
            onKeyPress={this.editMode}
            className={`SecondaryData-Item${someoneSelected ? '' : ' SecondaryDataSelectable'}${
              moaSelected ? ' SecondaryData-Item-Selected' : ''
            }`}
            role="button"
            tabIndex={0}
          >
            {'MOA'}
          </div>
          <div
            onMouseEnter={this.select('MOE')}
            onClick={this.editMode}
            onKeyPress={this.editMode}
            className={`SecondaryData-Item${someoneSelected ? '' : ' SecondaryDataSelectable'}${
              moeSelected ? ' SecondaryData-Item-Selected' : ''
            }`}
            role="button"
            tabIndex={0}
          >
            {'Installateur'}
          </div>
          <div
            onMouseEnter={this.select('SITE')}
            onClick={this.editMode}
            onKeyPress={this.editMode}
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
              cancel={this.cancel}
              locked={locked}
            />
          )}
          {moeSelected && (
            <MOE
              edit={edit}
              dossierprime={data.dossierprime}
              idDpOperation={data.id_dp_operation}
              idDossierPrime={data.id_dossierprime}
              cancel={this.cancel}
              locked={locked}
            />
          )}
          {siteSelected && (
            <Site
              edit={edit}
              dossierprime={data.dossierprime}
              idDpOperation={data.id_dp_operation}
              idDossierPrime={data.id_dossierprime}
              cancel={this.cancel}
              locked={locked}
            />
          )}
        </div>
      </div>
    );
  }
}

export default SecondaryData;
