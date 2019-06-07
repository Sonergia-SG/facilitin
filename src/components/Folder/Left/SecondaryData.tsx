import React, { Component } from 'react';
import './SecondataData.css';

import { OperationFull } from '../../../store/reducer/entities/types';

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
    this.setState({ edit: false });
    setTimeout(() => this.setState({ selected: undefined }), 300);
  };

  save = () => {
    this.setState({ edit: false });
    setTimeout(() => this.setState({ selected: undefined }), 300);
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

    return (
      <div
        onMouseLeave={this.clearSelected}
        className="tile is-child notification SecondaryData-Container"
      >
        <div className="SecondaryData-Items">
          <div
            onMouseEnter={this.select(Selected.MOA)}
            onClick={this.editMode}
            className={`SecondaryData-Item${
              moaSelected ? ' SecondaryData-Item-Selected' : ''
            }`}
          >
            MOA
          </div>
          <div
            onMouseEnter={this.select(Selected.MOE)}
            onClick={this.editMode}
            className={`SecondaryData-Item${
              moeSelected ? ' SecondaryData-Item-Selected' : ''
            }`}
          >
            MOE
          </div>
          <div
            onMouseEnter={this.select(Selected.SITE)}
            onClick={this.editMode}
            className={`SecondaryData-Item${
              siteSelected ? ' SecondaryData-Item-Selected' : ''
            }`}
          >
            Travaux
          </div>
        </div>
        <div>
          {moaSelected && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="moa_nom">Nom MOA : </label>
              <input
                type="text"
                name="moa_nom"
                disabled={!edit}
                defaultValue={data.dossierprime.moa_nom}
              />
              <label htmlFor="moa_prenom"> Prénom MOA : </label>
              <input
                type="text"
                name="moa_prenom"
                disabled={!edit}
                defaultValue={data.dossierprime.moa_prenom}
              />
              <label htmlFor="moa_fonction">Fonction MOA : </label>
              <input
                type="text"
                name="moa_fonction"
                disabled={!edit}
                defaultValue={data.dossierprime.moa_fonction || ''}
              />
              <label htmlFor="moa_rue"> Adresse rue : </label>
              <input
                type="text"
                name="moa_rue"
                disabled={!edit}
                defaultValue={data.dossierprime.moa_rue}
              />
              <label htmlFor="moa_rue2">Adresse Rue 2 : </label>
              <input
                type="text"
                name="moa_rue2"
                disabled={!edit}
                defaultValue={data.dossierprime.moa_rue2}
              />
              <label htmlFor="moa_cp"> Code Postal : </label>
              <input
                type="text"
                name="moa_cp"
                disabled={!edit}
                defaultValue={data.dossierprime.moa_cp}
              />
              <label htmlFor="moa_ville"> Ville : </label>
              <input
                type="text"
                name="moa_ville"
                disabled={!edit}
                defaultValue={data.dossierprime.moa_ville}
              />
              <label htmlFor="moa_prenom"> Prénom MOA : </label>
              <input
                type="text"
                name="moa_prenom"
                disabled={!edit}
                defaultValue={data.dossierprime.moa_prenom}
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
                  onClick={this.cancel}
                  style={{ margin: '0 3px' }}
                  disabled={!edit}
                  className="button is-rounded is-small"
                >
                  {'Annuler WIP'}
                </button>
                <button
                  type="button"
                  onClick={this.save}
                  style={{ margin: '0 3px' }}
                  disabled={!edit}
                  className="button is-success is-rounded is-small"
                >
                  {'Save WIP'}
                </button>
              </div>
            </div>
          )}
          {moeSelected && <div>MOE</div>}
          {siteSelected && <div>Site</div>}
        </div>
      </div>
    );
  }
}

export default SecondaryData;
