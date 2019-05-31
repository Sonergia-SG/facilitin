/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { API_PATH } from '../variables';
import HeaderNav from './Header';
import Collapsed from './Collapsed';
import ModalMoa from './modal/ModalMoa';
import ModalMoe from './modal/ModalMoe';
import ModalTravaux from './modal/ModalTravaux';
import { datahand } from './mockApi';
import { fetchFolder } from '../store/actions/views/folder';

class Dossierprime extends Component {
  state = {
    data: [],
    open_moa: false,
    open_moe: false,
    open_travaux: false,
  };

  componentWillMount() {
    this.getData(this.props.match.params.dpId);
    this.props.fetchFolder(this.props.match.params.dpId);
  }

  onOpenModal = type => () => {
    if (type === 'moa') {
      this.setState({ open_moa: true });
    } else if (type === 'moe') {
      this.setState({ open_moe: true });
    } else {
      this.setState({ open_travaux: true });
    }
  };

  onCloseModalType = (type) => {
    if (type === 'moa') {
      this.setState({ open_moa: false });
    } else if (type === 'moe') {
      this.setState({ open_moe: false });
    } else {
      this.setState({ open_travaux: false });
    }
  };

  getData = () => {
    this.setState({ data: datahand });
  };

  render() {
    /* eslint-disable camelcase */
    const {
      data, open_moa, open_moe, open_travaux,
    } = this.state;

    const title = `Dossier N° ${data.id_dossierprime}`;

    return (
      <div>
        <HeaderNav from="dossier" />
        <div className="tile is-ancestor">
          <div className="tile is-vertical is-3">
            <div className="tile">
              <div className="tile is-parent is-vertical">
                <div className="tile is-child notification has-text-centered">
                  <p className="title">{title}</p>
                  <p className="subtitle">{data.code_operation}</p>
                  <div className="content" />
                </div>
                <div className="tile is-child notification ">
                  <div className="content">
                    {data.documents.map((value, index) => (
                      <h4
                        className={`item_menu_gauche ${index === 0 ? 'left-active' : ''}`}
                        key={value.id_file}
                        id={`${index}pp`}
                      >
                        {value.type}
                      </h4>
                    ))}
                  </div>
                </div>
                <div className="tile is-child">
                  <div className="content has-text-centered">
                    <button type="button" className="button is-primary is-outlined is-medium">
                      {'Terminer'}
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
                  <Collapsed valeur={data.documents} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container footersonergia">
          <div className="buttons has-addons is-centered">
            <span
              role="button"
              tabIndex={0}
              className="button is-primary is-outlined is-medium"
              onClick={this.onOpenModal('moa')}
              onKeyUp={this.onOpenModal('moa')}
            >
              {'MOA'}
            </span>
            <span
              role="button"
              tabIndex={0}
              className="button is-primary is-outlined is-medium"
              onClick={this.onOpenModal('moe')}
              onKeyUp={this.onOpenModal('moe')}
            >
              {'MOE'}
            </span>
            <span
              role="button"
              tabIndex={0}
              className="button is-primary is-outlined is-medium"
              onClick={this.onOpenModal('travaux')}
              onKeyUp={this.onOpenModal('travaux')}
            >
              {'TRAVAUX'}
            </span>
          </div>
        </div>
        <ModalMoa open={open_moa} moaValues={data.moa} onCloseModalType={this.onCloseModalType} />
        <ModalMoe open={open_moe} moeValues={data.moe} onCloseModalType={this.onCloseModalType} />
        <ModalTravaux
          open={open_travaux}
          travauxValues={data.travaux}
          onCloseModalType={this.onCloseModalType}
        />
      </div>
    );
  }
}

Dossierprime.propTypes = {
  fetchFolder: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      dpId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(
  () => ({}),
  { fetchFolder },
)(Dossierprime);
