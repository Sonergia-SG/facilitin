/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
import bulmaAccordion from 'bulma-accordion/dist/js/bulma-accordion';
import 'bulma-accordion/dist/css/bulma-accordion.min.css';
import PropTypes from 'prop-types';

import Accordion from './Accordion';

class Collapsed extends Component {
  accordion = [];

  componentDidMount() {
    this.accordion = bulmaAccordion.attach();
  }

  render() {
    const { valeur } = this.props;

    return (
      <div className="tile is-parent">
        <div className="tile is-child">
          <div className="content">
            <div className="content">
              <div>
                <section className="accordions">
                  {valeur.map((value, index) => (
                    <Accordion
                      valeur={value}
                      key={value.id_file}
                      numero={index}
                    />
                  ))}
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Collapsed.propTypes = {
  valeur: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Collapsed;
