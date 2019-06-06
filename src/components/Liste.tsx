/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
// @ts-ignore
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  // @ts-ignore
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Loading from './Loading';

import {
  loadList,
  listUpdateSearch,
  listUpdatePage,
  listUpdatePageSize,
  listUpdateSorted,
} from '../store/actions/views/list';

import { AppState } from '../store';
import { Folders, MOA } from '../store/reducer/entities/types';
import { ListState, Tab as TabType } from '../store/reducer/views/list/type';

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
    accessor: (d: MOA) => `${d.moa_nom} ${d.moa_prenom} ${d.moa_denomination}`,
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

interface Props extends RouteComponentProps {
  loadList: any;
  listUpdateSearch: typeof listUpdateSearch;
  listUpdatePage: typeof listUpdatePage;
  listUpdatePageSize: typeof listUpdatePageSize;
  listUpdateSorted: typeof listUpdateSorted;
  apiKey: string | null;
  allFolders: Folders;
  listState: ListState;
}

class Liste extends Component<Props> {
  componentDidMount() {
    this.props.loadList();
  }

  /* eslint-disable no-underscore-dangle */
  getTrProps = (state: any, rowInfo: any) => {
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

  onRowClick = (state: any, rowInfo: any) => ({
    onClick: () => {
      if (rowInfo) {
        // this.props.history.push(`/folder/${rowInfo.original.id_dp_operation}`);
        this.props.history.push('/folder/60839');
      }
    },
  });

  handleData = async (tab: TabType) => {
    this.props.loadList(tab);
  };

  render() {
    const { listState, allFolders } = this.props;
    const {
      selectedTab, tab, search, pageSize,
    } = listState;
    const {
      loading, data, page, sorted,
    } = tab[selectedTab];

    const mappedData = data.map(id => allFolders[id]);
    const filteredData = search
      ? mappedData.filter(row => String(row.id_dp_operation).includes(search))
      : mappedData;

    return (
      <div>
        <div className="has-text-centered content-loading">
          <div id="loading_liste">
            <Loading show={loading} type="ThreeDots" />
          </div>
        </div>
        <input
          className="input search-table"
          placeholder="N° Action"
          defaultValue={search}
          onChange={e => this.props.listUpdateSearch(e.target.value)}
        />
        <Tabs defaultIndex={selectedTab} onSelect={(index: TabType) => this.handleData(index)}>
          <TabList>
            <Tab>A traiter</Tab>
            <Tab>Incomplet</Tab>
            <Tab>Rejet</Tab>
            <Tab>Validés</Tab>
          </TabList>

          <TabPanel>
            <ReactTable
              {...TRANSLATIONS}
              filterable
              data={filteredData}
              defaultPageSize={10}
              className="-striped -highlight cur_pointer"
              noDataText="Aucun traitement pour cet onglet"
              columns={COLUMNS}
              page={page}
              onPageChange={this.props.listUpdatePage}
              pageSize={pageSize}
              onPageSizeChange={this.props.listUpdatePageSize}
              sorted={sorted}
              onSortedChange={this.props.listUpdateSorted}
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
              page={page}
              onPageChange={this.props.listUpdatePage}
              pageSize={pageSize}
              onPageSizeChange={this.props.listUpdatePageSize}
              sorted={sorted}
              onSortedChange={this.props.listUpdateSorted}
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
              page={page}
              onPageChange={this.props.listUpdatePage}
              pageSize={pageSize}
              onPageSizeChange={this.props.listUpdatePageSize}
              sorted={sorted}
              onSortedChange={this.props.listUpdateSorted}
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
              page={page}
              onPageChange={this.props.listUpdatePage}
              pageSize={pageSize}
              onPageSizeChange={this.props.listUpdatePageSize}
              sorted={sorted}
              onSortedChange={this.props.listUpdateSorted}
              getTdProps={this.onRowClick}
              getTrProps={this.getTrProps}
            />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default connect(
  (s: AppState) => ({
    apiKey: s.user.apiKey,
    listState: s.views.list,
    allFolders: s.entities.folders,
  }),
  {
    loadList,
    listUpdateSearch,
    listUpdatePage,
    listUpdatePageSize,
    listUpdateSorted,
  },
)(withRouter(Liste));
