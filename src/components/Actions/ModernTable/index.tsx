import React from 'react';

import StatusCell from '../StatusCell';

import {
  listUpdateSearch,
  listUpdatePage,
  listUpdatePageSize,
  listUpdateSorted,
} from '../../../store/actions/views/list';
import { OperationFull } from '../../../store/reducer/entities/types';
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
}: Props) => {
  const start = page * pageSize;
  const end = (page + 1) * pageSize;

  const nbOfPages = Math.ceil(operations.length / pageSize);
  const firstVisiblePage = page - 2 < 0 ? 0 : page - 2;
  // const lastVisiblePage = page + 2 < nbOfPages ? nbOfPages : page + 2;
  const humanStart = page * pageSize + 1;
  const humanEnd = Math.min((page + 1) * pageSize, operations.length);
  const pages = Array.from(Array(nbOfPages).keys())
    .slice(0, 5)
    .map((v, i) => firstVisiblePage + i);

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
            <option disabled={nbOfPages < 10} value={10}>10</option>
            <option disabled={nbOfPages < 20} value={20}>20</option>
            <option disabled={nbOfPages < 50} value={50}>50</option>
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
              <th>N° Dossier</th>
              <th>N° Action</th>
              <th>Etat</th>
              <th>Nb Jours res</th>
              <th>MOA</th>
              <th>FOST</th>
              <th style={{ minWidth: 50 }} />
            </tr>
          </thead>
          <tbody>
            {operations.slice(start, end).map(o => (
              <tr onClick={() => onRowClick(o)} key={o.id_dp_operation}>
                <td style={{ width: '8%' }}>{o.id_dossierprime}</td>
                <td style={{ width: '8%' }}>{o.id_dp_operation}</td>
                <td style={{ width: '10%' }}>{o.statut ? o.statut.label_public : ' - '}</td>
                <td style={{ width: '15%' }}>{o.moderemuneration.delai_instruction}</td>
                <td style={{ width: '35%' }}>
                  {o.dossierprime
                    ? `${o.dossierprime.moa_nom} ${o.dossierprime.moa_prenom} ${
                      o.dossierprime.moa_denomination
                    }`
                    : ' - '}
                </td>
                <td style={{ width: '12%' }}>{o.code_operation}</td>
                <td style={{ width: '12%' }}><StatusCell original={o} /></td>
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
          <button
            type="button"
            disabled={page === 0}
            onClick={() => onPageChange(page - 1)}
          >
            Précédent
          </button>
          {pages.map(v => (
            <button
              key={v + 1}
              type="button"
              disabled={v === page}
              onClick={() => onPageChange(v)}
            >
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
