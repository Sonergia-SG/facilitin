/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
// @ts-ignore
import bulmaAccordion from 'bulma-accordion/dist/js/bulma-accordion';
import 'bulma-accordion/dist/css/bulma-accordion.min.css';
import { FileFull as SonergiaFile, CheckPoint } from '../../store/reducer/entities/types';

import Accordion from './Accordion';
import Loading from '../Loading';
import { FolderPendingItem } from '../../store/reducer/views/folder/types';

interface Props {
  files?: Array<SonergiaFile>;
  checkPoints?: Array<CheckPoint>;
  loading: boolean;
  selectedAccordion: number | undefined;
  handleAccordionClick: (index: number) => () => void;
  folderId: number;
  pending: FolderPendingItem | undefined;
}

class Collapsed extends Component<Props> {
  accordion = [];

  componentDidMount() {
    this.accordion = bulmaAccordion.attach();
  }

  render() {
    const {
      files, checkPoints, loading, selectedAccordion, handleAccordionClick, folderId, pending,
    } = this.props;

    if (!files || files.length === 0) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {loading ? <Loading show /> : <h2>Pas de fichier disponible pour ce dossier</h2>}
        </div>
      );
    }

    return (
      <div>
        <section className="accordions">
          {files.map((file, index) => (
            <Accordion
              file={file}
              checkPoints={checkPoints}
              key={file.id_dp_file}
              numero={index}
              isSelected={selectedAccordion === index}
              handleClick={handleAccordionClick(index)}
              folderId={folderId}
              pending={pending}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default Collapsed;
