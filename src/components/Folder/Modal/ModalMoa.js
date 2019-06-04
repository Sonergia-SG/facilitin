// @flow

/**
 * Created by stephane.mallaroni on 15/04/2019.
 */

/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

import { type MOA } from '../../../store/reducer/entities/flowTypes';

type Props = {
  open: boolean,
  moaValues: Array<MOA>,
  onCloseModalType: (type: 'moa') => void,
};

type State = {
  moa: Array<MOA>,
};

class ModalMoa extends Component<Props, State> {
  state = {
    moa: this.props.moaValues,
  };

  onCloseModal = () => {
    this.props.onCloseModalType('moa');
  };

  render() {
    if (!this.state.moa[0]) return null;
    return (
      <div>
        <Modal
          open={this.props.open}
          onClose={this.onCloseModal}
          center
          styles={{ modal: { border: '2px #00D1B2 solid' } }}
        >
          <h1 className="modal_title">MOA</h1>
          <table className="modal_table">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="moa_nom">Nom MOA : </label>
                </td>
                <td>
                  <input type="text" name="moa_nom" defaultValue={this.state.moa[0].moa_nom} />
                </td>
                <td>
                  <label htmlFor="moa_prenom"> Prénom MOA : </label>
                </td>
                <td>
                  {' '}
                  <input
                    type="text"
                    name="moa_prenom"
                    defaultValue={this.state.moa[0].moa_prenom}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="moa_fonction">Fonction MOA : </label>
                </td>
                <td>
                  {' '}
                  <input
                    type="text"
                    name="moa_fonction"
                    defaultValue={this.state.moa[0].moa_fonction}
                  />
                </td>
                <td>
                  <label htmlFor="moa_rue"> Adresse rue : </label>
                </td>
                <td>
                  {' '}
                  <input type="text" name="moa_rue" defaultValue={this.state.moa[0].moa_rue} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="moa_rue2">Adresse Rue 2 : </label>
                </td>
                <td>
                  {' '}
                  <input type="text" name="moa_rue2" defaultValue={this.state.moa[0].moa_rue2} />
                </td>
                <td>
                  <label htmlFor="moa_cp"> Code Postal : </label>
                </td>
                <td>
                  {' '}
                  <input type="text" name="moa_cp" defaultValue={this.state.moa[0].moa_cp} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="moa_ville"> Ville : </label>
                </td>
                <td>
                  {' '}
                  <input type="text" name="moa_ville" defaultValue={this.state.moa[0].moa_ville} />
                </td>
                <td>
                  <label htmlFor="moa_prenom"> Prénom MOA : </label>
                </td>
                <td>
                  {' '}
                  <input type="text" name="moa_prenom" />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="button" className="button is-primary is-outlined is-medium">
            {'Enregistrer'}
          </button>
        </Modal>
      </div>
    );
  }
}

export default ModalMoa;
