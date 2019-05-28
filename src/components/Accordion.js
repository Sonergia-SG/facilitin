/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
import StateToColor from './StateToColor';
import DropZone from './DropZone';

class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: this.props.valeur,
      numero: this.props.numero,
      color: StateToColor(this.props.valeur),
    };
  }

    currentAccordion= (e) => {
      e.preventDefault();
      // suppression left_active menu de gauche
      const els = document.querySelectorAll('.left-active');
      for (let i = 0; i < els.length; i++) {
        els[i].classList.remove('left-active');
      }

      // si active on passe le background color du menu de gauche en bleu
      const target = e.currentTarget.closest('.accordion') || e.currentTarget;
      if (target.classList.contains('is-active')) {
        const title_left = document.getElementById(`${this.state.numero}pp`);
        title_left.className += ' left-active';
      }
    }

    litigeDocument= (e) => {
      e.preventDefault();

      // routine pour voir si le litige est un incomplet ou un rejet

      // update
    }

    render() {
      const input = this.state.val.point_controle.map((value, index) => {
        let checked = '';
        if (value.controle_valide) {
          checked = ' checked ';
        }
        return (
          <div key={index}>
            <input type="checkbox" name={value.id_controle} defaultChecked={checked} />
            <label htmlFor={value.id_controle}>
              {' '}
              {value.nom_controle}
            </label>
          </div>
        );
      });
      return (
        <div className="divAccordion">
          <article className={`accordion ${this.state.numero === 0 ? 'is-active' : ''}`}>
            <div className={`accordion-header ${this.state.color}`}>
              <div>
                <button className="toggle togglesonergia" aria-label="toggle" onClick={e => this.currentAccordion(e)} />
                {' '}
                {this.state.val.type}
              </div>
              <div className="floatlink"><a href="https://www.google.fr" target="_blank" rel="noopener noreferrer">{this.state.val.name_file}</a></div>
            </div>
            <div className="accordion-body">
              <div className="accordion-content">
                <div className="tile is-ancestor">
                  <div className="tile is-vertical is-3">
                    <div className="tile is-parent is-vertical">
                      <div className="tile is-child notification has-text-centered tilebordered">
                        <div className="content">
                          <DropZone id_file={this.state.val.id_file} />
                        </div>
                      </div>
                      <div className="tile is-child notification tilebordered">
                        <div className="content has-text-centered bigplus">
                          <i className="fas fa-file-download fa-2x" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tile is-parent is-vertical">
                    <div className="tile is-child">
                      <div className="content">
                        {input}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tile is-parent is-vertical" id="div-but-litige">
                  <div className="tile is-child">
                    <div className="content">
                      <button className="button is-danger is-outlined is-pulled-right" id="button-litige" onClick={e => this.litigeDocument(e)}>Litige</button>
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
