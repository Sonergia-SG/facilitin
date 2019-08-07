/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';

import Tabs from './TabModule/Tabs';
import Tab from './TabModule/Tab';

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
import { ListState, Tab as TabType, ListSearch } from '../../store/reducer/views/list/type';
import { UserFonction } from '../../store/reducer/user/types';
import getValue from './ModernTable/tools/getValue';

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
  useEffect(() => {
    load();
  }, []);

  const {
    selectedTab, tab, search, pageSize,
  } = listState;
  const {
    loading, data, page, sorted,
  } = tab[selectedTab];

  const mappedData: [OperationFull] = denormalize(data, [operation], entities);

  const mustFilter = Object.values(search).some(v => !!v);
  const filteredData = mustFilter
    ? mappedData.filter(row => (
      Object.keys(search).every(key => (
        String(getValue(row, (key as keyof ListSearch)))
          .includes(search[(key as keyof ListSearch)])
      ))
    ))
    : mappedData;

  return (
    <div style={{
      backgroundColor: '#f1f2f7',
      marginBottom: 30,
      borderRadius: 2,
      overflow: 'hidden',
    }}
    >
      <div className="has-text-centered content-loading">
        <div id="loading_liste">
          <Loading show={loading} type="ThreeDots" />
        </div>
      </div>
      <Tabs>
        <Tab selected={selectedTab} index={0} onClick={load}>{userFonction === 'instructeur_initial' ? 'A traiter' : 'Incomplet'}</Tab>
        <Tab selected={selectedTab} index={1} onClick={load}>{userFonction === 'instructeur_initial' ? 'Incomplet' : 'A traiter'}</Tab>
        <Tab selected={selectedTab} index={2} onClick={load}>Rejet</Tab>
        <Tab selected={selectedTab} index={3} onClick={load}>Validés</Tab>
      </Tabs>
      <div style={{ backgroundColor: '#fff', padding: 10 }}>
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
      </div>
      {/* <Tabs defaultIndex={selectedTab} onSelect={(index: TabType) => load(index)}>
        <TabList>
          <Tab>{userFonction === 'instructeur_initial' ? 'A traiter' : 'Incomplet'}</Tab>
          <Tab>{userFonction === 'instructeur_initial' ? 'Incomplet' : 'A traiter'}</Tab>
          <Tab>Rejet</Tab>
          <Tab>Validés</Tab>
        </TabList>
      </Tabs> */}
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
