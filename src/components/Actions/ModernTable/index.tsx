import React from 'react';

import StatusCell from '../StatusCell';

import {
  listUpdateSearch,
  listUpdatePage,
  listUpdatePageSize,
  listUpdateSorted,
} from '../../../store/actions/views/list';
import { OperationFull } from '../../../store/reducer/entities/types';

import { Sorted, ListSearch } from '../../../store/reducer/views/list/type';
import './ModernTAble.css';

import getValue from './tools/getValue';
import sort from './tools/sort';
import updateSortGenerator from './tools/updateSortGenerator';

import SortArrow from './SortArrow';

interface Props {
  operations: Array<OperationFull>;
  onRowClick: (operation: OperationFull) => void;
  page: number;
  pageSize: number;
  onPageChange: typeof listUpdatePage;
  onPageSizeChange: typeof listUpdatePageSize;
  onSearchChange: typeof listUpdateSearch;
  search: ListSearch;
  sorted: Array<Sorted>;
  updateSorted: typeof listUpdateSorted;
}

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

  const internalSort = updateSortGenerator(sorted, updateSorted);

  const filteredOperations = sort(sorted, operations);

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
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Filtrer"
                  className="input is-small"
                  style={{ width: '100%' }}
                  defaultValue={search.id_dossierprime}
                  onChange={e => onSearchChange({ id_dossierprime: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Filtrer"
                  className="input is-small"
                  style={{ width: '100%' }}
                  defaultValue={search.id_dp_operation}
                  onChange={e => onSearchChange({ id_dp_operation: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Filtrer"
                  className="input is-small"
                  style={{ width: '100%' }}
                  defaultValue={search.etat}
                  onChange={e => onSearchChange({ etat: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Filtrer"
                  className="input is-small"
                  style={{ width: '100%' }}
                  defaultValue={search.delai}
                  onChange={e => onSearchChange({ delai: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Filtrer"
                  className="input is-small"
                  style={{ width: '100%' }}
                  defaultValue={search.moa}
                  onChange={e => onSearchChange({ moa: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Filtrer"
                  className="input is-small"
                  style={{ width: '100%' }}
                  defaultValue={search.code_operation}
                  onChange={e => onSearchChange({ code_operation: e.target.value })}
                />
              </td>
              <td />
            </tr>
            {filteredOperations.slice(start, end).map(o => (
              <tr onClick={() => onRowClick(o)} key={o.id_dp_operation}>
                <td style={{ width: '13%' }}>{getValue(o, 'id_dossierprime')}</td>
                <td style={{ width: '13%' }}>{getValue(o, 'id_dp_operation')}</td>
                <td style={{ width: '10%' }}>{getValue(o, 'etat')}</td>
                <td style={{ width: '10%' }}>
                  {getValue(o, 'delai') !== ' - ' && (
                    <div
                      style={{
                        backgroundColor: '#fa8564',
                        borderRadius: 5,
                        textAlign: 'center',
                        color: '#fff',
                        padding: '3px 2px',
                      }}
                    >
                      {getValue(o, 'delai')}
                    </div>
                  )}
                </td>
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
