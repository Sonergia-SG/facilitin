import React from 'react';

import StatusCell from '../StatusCell';

import {
  listUpdateSearch,
  listUpdatePage,
  listUpdatePageSize,
  listUpdateSorted,
} from '../../../store/actions/views/list';
import { OperationFull } from '../../../store/reducer/entities/types';

import { Sorted, SortedId } from '../../../store/reducer/views/list/type';
import './ModernTAble.css';

interface Props {
  operations: Array<OperationFull>;
  onRowClick: (operation: OperationFull) => void;
  page: number;
  pageSize: number;
  onPageChange: typeof listUpdatePage;
  onPageSizeChange: typeof listUpdatePageSize;
  onSearchChange: typeof listUpdateSearch;
  search: string;
  sorted: Array<Sorted>;
  updateSorted: typeof listUpdateSorted;
}

const SortArrow = ({ sorted }: { sorted?: Sorted }) => (
  <div style={{ float: 'right' }}>
    <div
      style={{
        color: sorted && sorted.desc === false ? '#1fb5ad' : undefined,
        marginTop: -3,
      }}
    >
      <i className="fas fa-caret-up" />
    </div>
    <div
      style={{
        color: sorted && sorted.desc === true ? '#1fb5ad' : undefined,
        marginTop: -12,
      }}
    >
      <i className="fas fa-caret-down" />
    </div>
  </div>
);

const ModernTable = ({
  operations,
  onRowClick,
  search,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onSearchChange,
  sorted,
  updateSorted,
}: Props) => {
  const start = page * pageSize;
  const end = (page + 1) * pageSize;

  const nbOfPages = Math.ceil(operations.length / pageSize);
  const firstVisiblePage = page - 2 < 0 ? 0 : page - 2;
  const humanStart = page * pageSize + 1;
  const humanEnd = Math.min((page + 1) * pageSize, operations.length);
  const pages = Array.from(Array(nbOfPages).keys())
    .slice(0, 5)
    .map((v, i) => firstVisiblePage + i);

  const internalSort = (id: SortedId) => () => {
    const existAtIndex = sorted.findIndex(s => s.id === id);

    // if user use shift key, keep old values
    const useArray: Array<Sorted> = [];

    if (existAtIndex !== -1) {
      if (sorted[existAtIndex].desc) {
        updateSorted([
          ...useArray.slice(0, existAtIndex),
          ...useArray.slice(existAtIndex + 1, useArray.length),
        ]);
      } else {
        updateSorted([
          ...useArray.slice(0, existAtIndex),
          {
            id,
            desc: true,
          },
          ...useArray.slice(existAtIndex + 1, useArray.length),
        ]);
      }
    } else {
      updateSorted([
        ...useArray.slice(0, existAtIndex),
        {
          id,
          desc: false,
        },
        ...useArray.slice(existAtIndex + 1, useArray.length),
      ]);
    }
  };

  const getValue = (v: OperationFull, key: SortedId) => {
    switch (key) {
      case 'etat':
        return v.statut ? v.statut.label_public || ' - ' : ' - ';
      case 'moa':
        return v.dossierprime
          ? `${v.dossierprime.moa_nom} ${v.dossierprime.moa_prenom} ${
            v.dossierprime.moa_denomination
          }`
          : ' - ';
      case 'delai':
        return v.moderemuneration.delai_instruction;
      default:
        return v[key];
    }
  };
  const filteredOperations = sorted.length > 0
    ? operations.sort((a, b) => {
      const key = sorted[0].id;
      const va = getValue(a, key);
      const vb = getValue(b, key);

      if (va === vb) return 0;

      if (sorted[0].desc) return va > vb ? -1 : 1;

      return va > vb ? 1 : -1;
    })
    : operations;

  return (
    <div className="ModernTable-container">
      <div className="ModernTable-container-top">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="ModernTable-select-label" htmlFor="actions-table-select">
          <select
            id="actions-table-select"
            className="ModernTable-select"
            disabled={nbOfPages < 5}
            value={pageSize}
            onChange={e => onPageSizeChange(parseInt(e.target.value, 10))}
          >
            <option value={5}>5</option>
            <option disabled={nbOfPages < 10} value={10}>
              10
            </option>
            <option disabled={nbOfPages < 20} value={20}>
              20
            </option>
            <option disabled={nbOfPages < 50} value={50}>
              50
            </option>
          </select>
          Opérations par page
        </label>
        <label className="ModernTable-search-label" htmlFor="actions-table-select">
          <input
            className="input search-table is-small"
            style={{ width: 'auto' }}
            placeholder="N° Action"
            defaultValue={search}
            onChange={e => onSearchChange(e.target.value)}
          />
          Recherche
        </label>
      </div>
      <div style={{ minHeight: 270 }}>
        <table className="uikit-modernTable">
          <thead>
            <tr>
              <th className="th-with-sort" onClick={internalSort('id_dossierprime')}>
                N° Dossier
                <SortArrow sorted={sorted.find(s => s.id === 'id_dossierprime')} />
              </th>
              <th className="th-with-sort" onClick={internalSort('id_dp_operation')}>
                N° Action
                <SortArrow sorted={sorted.find(s => s.id === 'id_dp_operation')} />
              </th>
              <th className="th-with-sort" onClick={internalSort('etat')}>
                Etat
                <SortArrow sorted={sorted.find(s => s.id === 'etat')} />
              </th>
              <th className="th-with-sort" onClick={internalSort('delai')}>
                Nb Jours res
                <SortArrow sorted={sorted.find(s => s.id === 'delai')} />
              </th>
              <th className="th-with-sort" onClick={internalSort('moa')}>
                MOA
                <SortArrow sorted={sorted.find(s => s.id === 'moa')} />
              </th>
              <th className="th-with-sort" onClick={internalSort('code_operation')}>
                FOST
                <SortArrow sorted={sorted.find(s => s.id === 'code_operation')} />
              </th>
              <th style={{ minWidth: 50 }} />
            </tr>
          </thead>
          <tbody>
            {filteredOperations.slice(start, end).map(o => (
              <tr onClick={() => onRowClick(o)} key={o.id_dp_operation}>
                <td style={{ width: '13%' }}>{getValue(o, 'id_dossierprime')}</td>
                <td style={{ width: '13%' }}>{getValue(o, 'id_dp_operation')}</td>
                <td style={{ width: '10%' }}>{getValue(o, 'etat')}</td>
                <td style={{ width: '10%' }}>{getValue(o, 'delai')}</td>
                <td style={{ width: '34%' }}>{getValue(o, 'moa')}</td>
                <td style={{ width: '12%' }}>{getValue(o, 'code_operation')}</td>
                <td style={{ width: '8%' }}>
                  <StatusCell original={o} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ModernTable-container-bottom">
        <p className="ModernTable-container-counter">
          {`Visualisation de ${humanStart} à ${humanEnd} sur ${operations.length} opérations`}
        </p>
        <div>
          <button type="button" disabled={page === 0} onClick={() => onPageChange(page - 1)}>
            Précédent
          </button>
          {pages.map(v => (
            <button key={v + 1} type="button" disabled={v === page} onClick={() => onPageChange(v)}>
              {v + 1}
            </button>
          ))}
          <button
            type="button"
            disabled={page + 1 === nbOfPages}
            onClick={() => onPageChange(page + 1)}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModernTable;
