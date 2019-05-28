/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { API_PATH } from '../variables';
import HeaderNav from './Header';
import Collapsed from './Collapsed';
import ModalMoa from './modal/ModalMoa';
import ModalMoe from './modal/ModalMoe';
import ModalTravaux from './modal/ModalTravaux';

class Dossierprime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api_key: this.props.location.state === undefined ? false : this.props.location.state.api_key,
      id_dp_operation: this.props.location.state === undefined ? false : this.props.location.state.id_dp_operation,
      data: [],
      open_moa: false,
      open_moe: false,
      open_travaux: false,
    };

    this.onCloseModalType = this.onCloseModalType.bind(this);
  }

  componentWillMount() {
    this.getData(this.state.id_dp_operation);
  }

  getData(id_dp_operation) {
    // a décommenter et a régler pour faire un véritable appel à l'api
    /* this.setState({isLoading: true});
        fetch(API_PATH+'detailaction/'+id_dp_operation, {
            method: 'get',
            headers: new Headers({
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
                'Authorization': 'bearer '+this.state.api_key
            })}).then( (response) => {
            return response.json()
        })
        .then( (json) => {
            if(json.status === 'success'){
                this.setState({
                    data:json.values
                })
                this.setState({isLoading: false});
            }
            this.setState({isLoading: false});
        }); */
    const datahand = {
      id_dossierprime: 13555,
      code_operation: 'BAR-TH-113',
      documents: [
        {
          type: 'AAT', name_file: 'lkdsjf.pdf', id_file: 1, link_document: 'http://www.sonergia.fr/id_image', litige: 0, nb_bad_controle_auto: 0, point_controle: [{ id_controle: 1, nom_controle: 'point de controle 1', controle_valide: 0 }, { id_controle: 4, nom_controle: 'point de controle 2', controle_valide: 0 }, { id_controle: 8, nom_controle: 'point de controle 3', controle_valide: 0 }],
        },
        {
          type: 'Devis', name_file: 'ppppjjj.pdf', id_file: 2, link_document: 'http://www.sonergia.fr/id_image', litige: 0, nb_bad_controle_auto: 1, point_controle: [{ id_controle: 2, nom_controle: 'point de controle 10', controle_valide: 1 }, { id_controle: 5, nom_controle: 'point de controle 7', controle_valide: 1 }, { id_controle: 9, nom_controle: 'point de controle 4', controle_valide: 0 }],
        },
        {
          type: 'Facture', name_file: 'azerty.doc', id_file: 3, link_document: 'http://www.sonergia.fr/id_image', litige: 0, nb_bad_controle_auto: 0, point_controle: [{ id_controle: 3, nom_controle: 'point de controle 11', controle_valide: 1 }, { id_controle: 6, nom_controle: 'point de controle 8', controle_valide: 1 }, { id_controle: 10, nom_controle: 'point de controle 5', controle_valide: 0 }],
        },
        {
          type: 'Doc technique', name_file: 'qsdfgss.pdf', id_file: 4, link_document: 'http://www.sonergia.fr/id_image', litige: 1, nb_bad_controle_auto: 0, point_controle: [{ id_controle: 4, nom_controle: 'point de controle 12', controle_valide: 1 }, { id_controle: 7, nom_controle: 'point de controle 9', controle_valide: 1 }, { id_controle: 11, nom_controle: 'point de controle 6', controle_valide: 0 }],
        },
      ],
      moa: [
        {
          moa_est_societe: 0, moa_civilite: 'Mr', moa_nom: 'POLONA', moa_prenom: 'Jacques', moa_fonction: null, moa_rue: '31 chemin de la clue', moa_rue2: '', moa_cp: 13013, moa_ville: 'Marseille', moa_pays: 'France', moa_tel: '04 04 04 91 91', moa_tel_2: '',
        },
      ],
      moe: [
        { moe_denomination: 'coca cola' },
      ],
      travaux: [
        { adresse_travaux: '18 chemin de la route bleu' },
      ],
    };
    this.setState({ data: datahand });
  }

  onOpenModal(type) {
    if (type === 'moa') {
      this.setState({ open_moa: true });
    } else if (type === 'moe') {
      this.setState({ open_moe: true });
    } else {
      this.setState({ open_travaux: true });
    }
  }

  onCloseModalType(type) {
    if (type === 'moa') {
      this.setState({ open_moa: false });
    } else if (type === 'moe') {
      this.setState({ open_moe: false });
    } else {
      this.setState({ open_travaux: false });
    }
  }

  render() {
    if (this.state.api_key === false) {
      return <Redirect to="/" />;
    }
    const docs = [];
    this.state.data.documents.map((value, index) => docs.push(<h4
      className={`item_menu_gauche ${index === 0 ? 'left-active' : ''}`}
      key={index}
      id={`${index}pp`}
    >
      {value.type}
    </h4>));
    return (
      <div>
        <HeaderNav api_key={this.state.api_key} from="dossier" />
        <div className="tile is-ancestor">
          <div className="tile is-vertical is-3">
            <div className="tile">
              <div className="tile is-parent is-vertical">
                <div className="tile is-child notification has-text-centered">
                  <p className="title">










Dossier N°
                    {this.state.data.id_dossierprime}
                  </p>
                  <p className="subtitle">{this.state.data.code_operation}</p>
                  <div className="content" />
                </div>
                <div className="tile is-child notification ">
                  <div className="content">
                    {docs}
                  </div>
                </div>
                <div className="tile is-child">
                  <div className="content has-text-centered">
                    <button className="button is-primary is-outlined is-medium">










Terminer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tile is-parent">
            <div className="tile is-child">
              <div className="content">
                <div className="content">
                  <Collapsed valeur={this.state.data.documents} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container footersonergia">
          <div className="buttons has-addons is-centered">
            <span
              className="button is-primary is-outlined is-medium"
              onClick={e => this.onOpenModal('moa')}
            >










MOA
            </span>
            <span
              className="button is-primary is-outlined is-medium"
              onClick={e => this.onOpenModal('moe')}
            >










MOE
            </span>
            <span
              className="button is-primary is-outlined is-medium"
              onClick={e => this.onOpenModal('travaux')}
            >










TRAVAUX
            </span>
          </div>
        </div>
        <ModalMoa
          open={this.state.open_moa}
          moaValues={this.state.data.moa}
          onCloseModalType={this.onCloseModalType}
        />
        <ModalMoe
          open={this.state.open_moe}
          moeValues={this.state.data.moe}
          onCloseModalType={this.onCloseModalType}
        />
        <ModalTravaux
          open={this.state.open_travaux}
          travauxValues={this.state.data.travaux}
          onCloseModalType={this.onCloseModalType}
        />
      </div>
    );
  }
}

export default Dossierprime;
