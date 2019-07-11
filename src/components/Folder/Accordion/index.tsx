/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import idx from 'idx';

import DropZone from '../../DropZone';
import CheckPoints from './CheckPoints';
import DownloadFile from './DownloadFile';
import Validation from './Validation';
import ToggleViewer from './ToggleViewer';
import Preview from './Preview';

import { folderEnding } from '../../../store/actions/views/folder';

import { FileFull as SonergiaFile, CheckPoint } from '../../../store/reducer/entities/types';

import fileFolderDisplayType from '../helper/fileFolderDisplayType';

import './Accordion.css';
import { FolderPendingItem } from '../../../store/reducer/views/folder/types';

import useOpenModalAfterLoading from './useOpenModalAfterLoading';

import MissingFile from './MissingFile';

import statusColor from './tools/statusColor';

interface Props {
  file: SonergiaFile;
  checkPoints: Array<CheckPoint> | undefined;
  numero: number;
  isSelected: boolean;
  handleClick: () => void;
  goNext: () => void;
  folderId: number;
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
  goNext,
  ending,
}: Props) => {
  const selfRef = useRef(null);

  const litigeLoading = idx(pending, _ => _.litige[file.id_dp_file].loading) || false;
  const [displayModal, toggleModal] = useOpenModalAfterLoading(litigeLoading, file.statut, goNext);

  const [previewOppened, togglePreview] = useState(false);

  useEffect(() => {
    if (isSelected) togglePreview(true);
  }, [isSelected]);

  const toggleAndCroll = () => {
    togglePreview(!previewOppened);

    setTimeout(() => {
      if (selfRef !== null && selfRef.current) {
        idx(selfRef, (_: any) => _.current.scrollIntoView());
      }
    }, 10);
  };

  return (
    <div ref={selfRef} className="divAccordion">
      <article className={`accordion ${isSelected ? 'is-active' : ''}`}>
        <div
          style={{ backgroundColor: statusColor(file) }}
          className="accordion-header"
        >
          <div
            onClick={handleClick}
            onKeyPress={handleClick}
            style={{ cursor: 'pointer', width: '100%' }}
            role="button"
            tabIndex={0}
          >
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
          </div>
        </div>
        <div className="accordion-body">
          {file.id_file ? (
            <div className="Accordion-Box">
              <div className="Accordion-File-Header">
                <ToggleViewer toggle={toggleAndCroll} viewerOpened={previewOppened} />
                <DownloadFile file={file} />
                <DropZone file={file} idDpOperation={folderId} />
                <h3 className="Accordion-File-name">{file.filename}</h3>
              </div>
              <div className="Accordion-Content">
                {previewOppened && (
                  <div className="Accordion-Document-Viewer">
                    <Preview file={file} />
                  </div>
                )}
                <div className="Accordion-CheckPoints">
                  <CheckPoints
                    pending={pending}
                    folderId={folderId}
                    checkPoints={checkPoints}
                    fileId={file.id_dp_file}
                  />
                </div>
              </div>
              <div className="Accordion-Button-Position">
                <Validation
                  file={file}
                  loading={litigeLoading}
                  folderId={folderId}
                  checkPoints={checkPoints}
                />
              </div>
            </div>
          ) : (
            <MissingFile file={file} loading={false} folderId={folderId} />
          )}
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
            <button
              className="button"
              type="button"
              onClick={() => {
                toggleModal(false);
                goNext();
              }}
            >
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
  { ending: folderEnding },
)(Accordion);
