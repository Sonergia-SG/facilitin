/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React from 'react';

import StateToColor from '../../StateToColor';
import DropZone from '../../DropZone';
import CheckPoints from './CheckPoints';

import { FileFull as SonergiaFile, CheckPoint } from '../../../store/reducer/entities/types';

import fileFolderDisplayType from '../helper/fileFolderDisplayType';

import './Accordion.css';
import { FolderPendingItem } from '../../../store/reducer/views/folder/types';

interface Props {
  file: SonergiaFile;
  checkPoints: Array<CheckPoint> | undefined;
  numero: number;
  isSelected: boolean;
  handleClick: () => void;
  folderId: number;
  pending: FolderPendingItem | undefined;
}

const Accordion = ({
  file, isSelected, checkPoints, handleClick, folderId, pending,
}: Props) => {
  const color = StateToColor(file);

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
                  <DropZone />
                </div>
              </div>
              <div style={{ width: 190, marginTop: 5 }} className="notification tilebordered">
                <div className="content has-text-centered bigplus">
                  <i className="fas fa-file-download fa-2x" />
                </div>
              </div>
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
                className="button is-danger is-outlined is-pulled-right"
                id="button-litige"
                onClick={e => alert('not defined')}
              >
                {'Litige'}
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Accordion;
