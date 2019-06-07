/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component, SyntheticEvent } from 'react';

import StateToColor from './StateToColor';
import DropZone from './DropZone';

import { FileFull as SonergiaFile } from '../store/reducer/entities/types';

import fileFolderDisplayType from './Folder/helper/fileFolderDisplayType';

interface Props {
  valeur: SonergiaFile;
  numero: number;
}

class Accordion extends Component<Props> {
  currentAccordion = (e: SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    // ! quand store migrer les conditions de class en fonction du state

    // suppression left_active menu de gauche
    const els = document.querySelectorAll('.left-active');
    els.forEach(el => {
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
    const { valeur: val, numero } = this.props;
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
              />{' '}
              {fileFolderDisplayType(val)}
            </div>
            {/* <div className="floatlink">
              <a href="https://www.google.fr" target="_blank" rel="noopener noreferrer">
                {val.name_file}
              </a>
            </div> */}
          </div>
          <div className="accordion-body">
            <div className="accordion-content">
              <div className="tile is-ancestor">
                <div className="tile is-vertical is-3">
                  <div className="tile is-parent is-vertical">
                    <div
                      style={{ width: 190 }}
                      className="tile is-child notification has-text-centered tilebordered"
                    >
                      <div className="content">
                        <DropZone />
                      </div>
                    </div>
                    <div
                      style={{ width: 190 }}
                      className="tile is-child notification tilebordered"
                    >
                      <div className="content has-text-centered bigplus">
                        <i className="fas fa-file-download fa-2x" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tile is-parent is-vertical">
                  <div className="tile is-child">
                    <div className="content">
                      {/* {val.point_controle.map((value) => {
                        let checked = '';
                        if (value.controle_valide) {
                          checked = ' checked ';
                        }
                        return (
                          <div key={value.id_controle}>
                            <label htmlFor={`{value.id_controle}`}>
                              <input
                                type="checkbox"
                                name={`{value.id_controle}`}
                                defaultChecked={!!checked}
                              />
                              {' '}
                              {value.nom_controle}
                            </label>
                          </div>
                        );
                      })} */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="tile is-parent is-vertical" id="div-but-litige">
                <div className="tile is-child">
                  <div className="content">
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
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default Accordion;
