import React, { Component } from 'react';
import './SecondataData.css';

import { OperationFull } from '../../../../store/reducer/entities/types';

import MOA from './MOA';

interface Props {
  data: OperationFull;
}

interface State {
  selected?: Selected;
  edit: boolean;
}

enum Selected {
  MOA,
  MOE,
  SITE,
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
    const { data } = this.props;
    const { selected, edit } = this.state;

    const moaSelected = selected === Selected.MOA;
    const moeSelected = selected === Selected.MOE;
    const siteSelected = selected === Selected.SITE;

    const someoneSelected = !!edit;

    return (
      <div
        onMouseLeave={this.clearSelected}
        className="tile is-child notification SecondaryData-Container"
      >
        <div className="SecondaryData-Items">
          <div
            onMouseEnter={this.select(Selected.MOA)}
            onClick={this.editMode}
            className={`SecondaryData-Item${someoneSelected  ? '' : ' SecondaryDataSelectable'}${moaSelected ? ' SecondaryData-Item-Selected' : ''}`}
          >
            {'MOA'}
          </div>
          <div
            onMouseEnter={this.select(Selected.MOE)}
            onClick={this.editMode}
            className={`SecondaryData-Item${someoneSelected  ? '' : ' SecondaryDataSelectable'}${moeSelected ? ' SecondaryData-Item-Selected' : ''}`}
          >
            {'MOE'}
          </div>
          <div
            onMouseEnter={this.select(Selected.SITE)}
            onClick={this.editMode}
            className={`SecondaryData-Item${someoneSelected  ? '' : ' SecondaryDataSelectable'}${siteSelected ? ' SecondaryData-Item-Selected' : ''}`}
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
            />
          )}
          {moeSelected && <div>MOE</div>}
          {siteSelected && <div>Site</div>}
        </div>
      </div>
    );
  }
}

export default SecondaryData;
