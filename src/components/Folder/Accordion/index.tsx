/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React from 'react';
import { connect } from 'react-redux';
import idx from 'idx';

import StateToColor from '../../StateToColor';
import DropZone from '../../DropZone';
import CheckPoints from './CheckPoints';
import DownloadFile from './DownloadFile';

import { folderFileInLitige, folderEnding } from '../../../store/actions/views/folder';

import { FileFull as SonergiaFile, CheckPoint } from '../../../store/reducer/entities/types';

import fileFolderDisplayType from '../helper/fileFolderDisplayType';

import './Accordion.css';
import { FolderPendingItem } from '../../../store/reducer/views/folder/types';

import useOpenModalAfterLoading from './useOpenModalAfterLoading';

interface Props {
  file: SonergiaFile;
  checkPoints: Array<CheckPoint> | undefined;
  numero: number;
  isSelected: boolean;
  handleClick: () => void;
  folderId: number;
  inLitige: any;
  ending: any;
  pending: FolderPendingItem | undefined;
}

const Accordion = ({
  file,
  isSelected,
  checkPoints,
  handleClick,
  folderId,
  pending,
  ending,
  inLitige,
}: Props) => {
  const color = StateToColor(file);

  const litigeLoading = idx(pending, _ => _.litige[file.id_dp_file].loading) || false;
  const isLitige = file.statut === 10;

  const [displayModal, toggleModal] = useOpenModalAfterLoading(litigeLoading);

  return (
    <div className="divAccordion">
      <article className={`accordion ${isSelected ? 'is-active' : ''}`}>
        <div className={`accordion-header ${color}`}>
          <div>
            <button
              type="button"
              className="toggle togglesonergia"
              aria-label="toggle"
              onClick={handleClick}
            />
            {' '}
            {fileFolderDisplayType(file)}
          </div>
          {/* <div className="floatlink">
              <a href="https://www.google.fr" target="_blank" rel="noopener noreferrer">
                {file.name_file}
              </a>
            </div> */}
        </div>
        <div className="accordion-body">
          <div className="Accordion-Box">
            <div className="Accordion-Files">
              <div style={{ width: 190 }} className="notification has-text-centered tilebordered">
                <div className="content">
                  <DropZone file={file} idDpOperation={folderId} />
                </div>
              </div>
              <DownloadFile file={file} />
            </div>
            <div className="Accordion-CheckPoints">
              <CheckPoints
                pending={pending}
                folderId={folderId}
                checkPoints={checkPoints}
                fileId={file.id_dp_file}
              />
            </div>
            <div className="Accordion-Button-Position">
              <button
                type="button"
                style={{ transition: 'opacity 0.5s ease' }}
                className={`button is-danger${isLitige ? '' : ' is-outlined'} is-pulled-right${
                  litigeLoading ? ' is-loading' : ''
                }`}
                id="button-litige"
                disabled={file.statut === 15 || isLitige}
                onClick={() => inLitige(folderId, file.id_dp_file)}
              >
                {'Litige'}
              </button>
            </div>
          </div>
        </div>
      </article>
      <div className={`modal ${isSelected && displayModal ? ' is-active' : ''}`}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              {"Terminer l'instruction"}
            </p>
          </header>
          <section className="modal-card-body">
            {"Le document est en rejet. Voulez vous terminer l'instruction ?"}
          </section>
          <footer className="modal-card-foot">
            <button
              className="button is-success"
              type="button"
              onClick={() => {
                ending(folderId);
                toggleModal(false);
              }}
            >
              {"Terminer l'instruction"}
            </button>
            <button className="button" type="button" onClick={() => toggleModal(false)}>
              {"Continuer l'instruction"}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default connect(
  null,
  { inLitige: folderFileInLitige, ending: folderEnding },
)(Accordion);
