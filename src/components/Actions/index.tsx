/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  // @ts-ignore
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Loading from '../Loading';

import ModernTable from './ModernTable';

import {
  loadList,
  listUpdateSearch,
  listUpdatePage,
  listUpdatePageSize,
  listUpdateSorted,
} from '../../store/actions/views/list';

import { operation } from '../../store/reducer/entities/schema';

import { AppState } from '../../store';
import { Entities, OperationFull } from '../../store/reducer/entities/types';
import { ListState, Tab as TabType } from '../../store/reducer/views/list/type';
import { UserFonction } from '../../store/reducer/user/types';

interface Props extends RouteComponentProps {
  load: any;
  updateSearch: typeof listUpdateSearch;
  updatePage: typeof listUpdatePage;
  updatePageSize: typeof listUpdatePageSize;
  updateSorted: typeof listUpdateSorted;
  apiKey: string | null;
  userFonction: UserFonction | null;
  entities: Entities;
  listState: ListState;
}

const Actions = ({
  load,
  updateSearch,
  updatePage,
  updatePageSize,
  updateSorted,
  listState,
  entities,
  userFonction,
  history,
}: Props) => {
  useEffect(() => load(), []);

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
    <div style={{ backgroundColor: '#f1f2f7', padding: '10px 20px', marginBottom: 30 }}>
      <div className="has-text-centered content-loading">
        <div id="loading_liste">
          <Loading show={loading} type="ThreeDots" />
        </div>
      </div>
      <Tabs defaultIndex={selectedTab} onSelect={(index: TabType) => load(index)}>
        <TabList>
          <Tab>{userFonction === 'instructeur_initial' ? 'A traiter' : 'Incomplet'}</Tab>
          <Tab>{userFonction === 'instructeur_initial' ? 'Incomplet' : 'A traiter'}</Tab>
          <Tab>Rejet</Tab>
          <Tab>Validés</Tab>
        </TabList>
        <ModernTable
          operations={filteredData}
          onRowClick={(o) => {
            history.push(`/actions/${o.id_dp_operation}`);
          }}
          page={page}
          pageSize={pageSize}
          onPageChange={updatePage}
          onPageSizeChange={updatePageSize}
          search={search}
          onSearchChange={updateSearch}
          sorted={sorted}
          updateSorted={updateSorted}
        />
      </Tabs>
    </div>
  );
};

export default connect(
  (s: AppState) => ({
    apiKey: s.user.apiKey,
    listState: s.views.list,
    entities: s.entities,
    userFonction: s.user.user && s.user.user.fonction,
  }),
  {
    load: loadList,
    updateSearch: listUpdateSearch,
    updatePage: listUpdatePage,
    updatePageSize: listUpdatePageSize,
    updateSorted: listUpdateSorted,
  },
)(withRouter(Actions));
