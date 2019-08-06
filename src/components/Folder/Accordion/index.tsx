/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { useState, useRef, useEffect } from 'react';
import { connect, HandleThunkActionCreator } from 'react-redux';
import idx from 'idx';

import UploadButton from './UploadButton';
import CheckPoints from './CheckPoints';
import DownloadFile from './DownloadFile';
import Validation from './Validation';
import ToggleViewer from './ToggleViewer';
import Preview from './Preview';
import DropZone from './DropZone';

import { folderEnding, folderFileEnding } from '../../../store/actions/views/folder';

import { FileFull as SonergiaFile, CheckPoint } from '../../../store/reducer/entities/types';

import fileFolderDisplayType from '../helper/fileFolderDisplayType';
import lockedByStatus from './tools/lockedByStatus';

import './Accordion.css';
import { FolderPendingItem } from '../../../store/reducer/views/folder/types';

import useOpenModalAfterLoading from './useOpenModalAfterLoading';

import MissingFile from './MissingFile';

import statusColor from './tools/statusColor';
import DeleteFile from './DeleteFile';

interface Props {
  file: SonergiaFile;
  checkPoints: Array<CheckPoint> | undefined;
  numero: number;
  isSelected: boolean;
  handleClick: () => void;
  goNext: () => void;
  folderId: number;
  ending: HandleThunkActionCreator<typeof folderEnding>;
  fileEnding: HandleThunkActionCreator<typeof folderFileEnding>;
  pending: FolderPendingItem | undefined;
  locked: boolean;
}

export const AccordionComponent = ({
  file,
  isSelected,
  checkPoints,
  handleClick,
  folderId,
  pending,
  goNext,
  ending,
  fileEnding,
  locked,
}: Props) => {
  const selfRef = useRef(null);
  const selectedRef = useRef(isSelected);

  const litigeLoading = idx(pending, _ => _.litige[file.id_dp_file].loading) || false;
  const [displayModal, toggleModal] = useOpenModalAfterLoading(litigeLoading, file.statut, goNext);

  const [previewOppened, togglePreview] = useState(false);

  const isLockedByStatus = lockedByStatus(file);

  useEffect(() => {
    if (isSelected && !isLockedByStatus) togglePreview(true);

    if (selectedRef.current === true && isSelected === false) {
      togglePreview(false);
    }
    selectedRef.current = isSelected;
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
          style={{
            backgroundColor: statusColor(file),
          }}
          className={`accordion-header${isSelected ? ' accordion-header-is-active' : ' '}`}
        >
          <div
            className="AccordionHeader-Button"
            onClick={handleClick}
            onKeyPress={handleClick}
            role="button"
            tabIndex={0}
          >
            <div>{fileFolderDisplayType(file)}</div>
            <div
              className="AccordionHeader-Ico"
              style={{ transform: `rotateX(${isSelected ? '180deg' : '0deg'})` }}
            >
              <i className="fa fa-chevron-up" />
            </div>
          </div>
        </div>
        <div className="accordion-body">
          <DropZone file={file} idDpOperation={folderId}>
            {file.id_file ? (
              <div className="Accordion-Box">
                <div className="Accordion-File-Header">
                  <ToggleViewer toggle={toggleAndCroll} viewerOpened={previewOppened} />
                  <DownloadFile file={file} />
                  <UploadButton file={file} idDpOperation={folderId} />
                  {' '}
                  <DeleteFile file={file} />
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
                      lockedByStatus={isLockedByStatus}
                      locked={locked}
                    />
                  </div>
                </div>
                <div className="Accordion-Button-Position">
                  {!isLockedByStatus && (
                    <Validation
                      file={file}
                      loading={litigeLoading}
                      folderId={folderId}
                      checkPoints={checkPoints}
                      locked={locked}
                    />
                  )}
                </div>
              </div>
            ) : (
              <MissingFile
                file={file}
                loading={false}
                folderId={folderId}
                fileEnding={fileEnding}
              />
            )}
          </DropZone>
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
  { ending: folderEnding, fileEnding: folderFileEnding },
)(AccordionComponent);
