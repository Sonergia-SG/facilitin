/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component, SyntheticEvent } from 'react';

import StateToColor from '../../StateToColor';
import DropZone from '../../DropZone';
import CheckPoints from './CheckPoints';

import { FileFull as SonergiaFile, CheckPoint } from '../../../store/reducer/entities/types';

import fileFolderDisplayType from '../helper/fileFolderDisplayType';

import './Accordion.css';

interface Props {
  file: SonergiaFile;
  checkPoints: Array<CheckPoint> | undefined;
  numero: number;
}

class Accordion extends Component<Props> {
  currentAccordion = (e: SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    // ! quand store migrer les conditions de class en fonction du state

    // suppression left_active menu de gauche
    const els = document.querySelectorAll('.left-active');
    els.forEach((el) => {
      el.classList.remove('left-active');
    });

    // si active on passe le background color du menu de gauche en bleu
    const target = e.currentTarget.closest('.accordion') || e.currentTarget;
    if (target.classList.contains('is-active')) {
      const titleLeft = document.getElementById(`${this.props.numero}pp`);
      if (titleLeft) titleLeft.className += ' left-active';
    }
  };

  litigeDocument = (e: SyntheticEvent<HTMLElement>) => {
    e.preventDefault();

    // routine pour voir si le litige est un incomplet ou un rejet
    alert('not defined');

    // update
  };

  render() {
    const { file: val, numero, checkPoints } = this.props;
    const color = StateToColor(val);

    return (
      <div className="divAccordion">
        <article className={`accordion ${numero === 0 ? 'is-active' : ''}`}>
          <div className={`accordion-header ${color}`}>
            <div>
              <button
                type="button"
                className="toggle togglesonergia"
                aria-label="toggle"
                onClick={e => this.currentAccordion(e)}
              />
              {' '}
              {fileFolderDisplayType(val)}
            </div>
            {/* <div className="floatlink">
              <a href="https://www.google.fr" target="_blank" rel="noopener noreferrer">
                {val.name_file}
              </a>
            </div> */}
          </div>
          <div className="accordion-body">
            <div className="Accordion-Box">
              <div className="Accordion-Files">
                <div
                  style={{ width: 190 }}
                  className="notification has-text-centered tilebordered"
                >
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
                <CheckPoints checkPoints={checkPoints} fileId={val.id_dp_file} />
              </div>
              <div className="Accordion-Button-Position">
                <button
                  type="button"
                  className="button is-danger is-outlined is-pulled-right"
                  id="button-litige"
                  onClick={e => this.litigeDocument(e)}
                >
                  {'Litige'}
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default Accordion;
