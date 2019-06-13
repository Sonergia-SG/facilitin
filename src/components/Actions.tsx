/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
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

import { operation } from '../store/reducer/entities/schema';

import { AppState } from '../store';
import { Entities, OperationFull, MOA } from '../store/reducer/entities/types';
import { ListState, Tab as TabType } from '../store/reducer/views/list/type';
import { UserFonction } from '../store/reducer/user/types';

const COLUMNS = [
  {
    Header: 'N° Dossier',
    id: 'id_dossierprime',
    accessor: (d: OperationFull) => d.id_dossierprime, // String-based value accessors!
  },
  {
    Header: 'N° Action',
    id: 'id_dp_operation',
    accessor: (d: OperationFull) => d.id_dp_operation,
    // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  },
  {
    Header: 'Etat',
    id: 'label_public',
    accessor: (d: OperationFull) => d.statut ? d.statut.label_public : ' - ',
  },
  {
    Header: 'Nb Jours res',
    id: 'delai_instruction',
    accessor: (d: OperationFull) => d.moderemuneration.delai_instruction,
  },
  {
    Header: 'MOA',
    id: 'moa_nom',
    accessor: (d: OperationFull) => d.dossierprime ? `${d.dossierprime.moa_nom} ${d.dossierprime.moa_prenom} ${d.dossierprime.moa_denomination}` : ' - ',
  },
  {
    Header: 'FOST',
    id: 'code_operation',
    accessor: (d: OperationFull) => d.code_operation,
  },
  {
    Header: ' ',
    id: 'stats',
    accessor: 'TODO',
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
  userFonction: UserFonction | null;
  entities: Entities;
  listState: ListState;
}

class Actions extends Component<Props> {
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
        this.props.history.push(`/actions/${rowInfo.original.id_dp_operation}`);
      }
    },
  });

  handleData = async (tab: TabType) => {
    this.props.loadList(tab);
  };

  render() {
    const { listState, entities, userFonction } = this.props;
    const {
      selectedTab, tab, search, pageSize,
    } = listState;
    const {
      loading, data, page, sorted,
    } = tab[selectedTab];

    const mappedData: [OperationFull] = denormalize(data, [operation], entities);
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
            <Tab>{userFonction === 'instructeur_initial' ? 'A traiter' : 'Incomplet'}</Tab>
            <Tab>{userFonction === 'instructeur_initial' ? 'Incomplet' : 'A traiter'}</Tab>
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
    entities: s.entities,
    userFonction: s.user.user && s.user.user.fonction,
  }),
  {
    loadList,
    listUpdateSearch,
    listUpdatePage,
    listUpdatePageSize,
    listUpdateSorted,
  },
)(withRouter(Actions));
