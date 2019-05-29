/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PropTypes from 'prop-types';

import Loading from './Loading';
import HeaderNav from './Header';

import { loadList, listUpdateSearch } from '../store/actions/views/list';

const COLUMNS = [
  {
    Header: 'N° Dossier',
    accessor: 'id_dossierprime', // String-based value accessors!
  },
  {
    Header: 'N° Action',
    accessor: 'id_dp_operation',
    // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  },
  {
    Header: 'Etat',
    accessor: 'label_public',
  },
  {
    Header: 'Nb Jours res',
    accessor: 'delai_instruction',
  },
  {
    Header: 'MOA',
    id: 'moa_nom',
    accessor: d => `${d.moa_nom} ${d.moa_prenom} ${d.moa_denomination}`,
  },
  {
    Header: 'FOST',
    accessor: 'code_operation',
  },
  {
    Header: ' ',
    accessor: 'ddddd',
  },
];

const TRANSLATIONS = {
  previousText: 'Précédent',
  nextText: 'Suivant',
  loadingText: 'Chargement...',
  ofText: 'sur',
  rowsText: 'lignes',
};

class Liste extends Component {
  componentDidMount() {
    this.props.loadList();
  }

  /* eslint-disable no-underscore-dangle */
  getTrProps = (state, rowInfo) => {
    if (rowInfo) {
      if (rowInfo.row._original.statut_operation === 13) {
        return { style: { background: '#FF7878', color: 'white' } };
      }
      if (rowInfo.row._original.statut_operation === 0) {
        if (rowInfo.row._original.is_avant_projet === 0) {
          return { style: { background: '#16A0E0', color: 'white' } };
        }
      }
    }
    return {};
  };
  /* eslint-enable */

  onRowClick = (state, rowInfo) => ({
    onClick: () => {
      if (rowInfo) {
        this.props.history.push('/dossierprime', {
          id_dp_operation: rowInfo.original.id_dp_operation,
        });
      }
    },
  });

  handleData = async (tab) => {
    this.props.loadList(tab);
  };

  render() {
    /* eslint-disable camelcase */
    const {
      selectedTab, tab, search,
    } = this.props.listState;
    const { loading, tempData } = tab[selectedTab];

    const filteredData = search
      ? tempData.filter(row => String(row.id_dp_operation).includes(search))
      : tempData;

    return (
      <div>
        <HeaderNav from="liste" />
        <div className="has-text-centered content-loading">
          <div id="loading_liste">
            <Loading show={loading} type="ThreeDots" />
          </div>
        </div>
        <input
          className="input search-table"
          placeholder="N° Action"
          onChange={e => this.props.listUpdateSearch(e.target.value)}
        />
        <Tabs defaultIndex={selectedTab} onSelect={index => this.handleData(index)}>
          <TabList>
            <Tab>A traiter</Tab>
            <Tab>Incomplet</Tab>
            <Tab>Rejet</Tab>
            <Tab>Validés</Tab>
          </TabList>

          <TabPanel>
            <ReactTable
              {...TRANSLATIONS}
              data={filteredData}
              defaultPageSize={10}
              className="-striped -highlight cur_pointer"
              noDataText="Aucun traitement pour cet onglet"
              columns={COLUMNS}
              getTdProps={this.onRowClick}
              getTrProps={this.getTrProps}
            />
          </TabPanel>
          <TabPanel>
            <ReactTable
              {...TRANSLATIONS}
              data={filteredData}
              defaultPageSize={10}
              className="-striped -highlight cur_pointer"
              noDataText="Aucun traitement pour cet onglet"
              columns={COLUMNS}
              getTdProps={this.onRowClick}
              getTrProps={this.getTrProps}
            />
          </TabPanel>
          <TabPanel>
            <ReactTable
              {...TRANSLATIONS}
              data={filteredData}
              defaultPageSize={10}
              className="-striped -highlight cur_pointer"
              noDataText="Aucun traitement pour cet onglet"
              columns={COLUMNS}
              getTdProps={this.onRowClick}
              getTrProps={this.getTrProps}
            />
          </TabPanel>
          <TabPanel>
            <ReactTable
              {...TRANSLATIONS}
              data={filteredData}
              defaultPageSize={10}
              className="-striped -highlight cur_pointer"
              noDataText="Aucun traitement pour cet onglet"
              columns={COLUMNS}
              getTdProps={this.onRowClick}
              getTrProps={this.getTrProps}
            />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

Liste.propTypes = {
  loadList: PropTypes.func.isRequired,
  listUpdateSearch: PropTypes.func.isRequired,
  apiKey: PropTypes.string.isRequired,
  listState: PropTypes.shape({
    selectedTab: PropTypes.bool.isRequired,
    tab: PropTypes.shape({}).isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  s => ({
    apiKey: s.user.apiKey,
    listState: s.views.list,
  }),
  { loadList, listUpdateSearch },
)(withRouter(Liste));
