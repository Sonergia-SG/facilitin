/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
// @ts-ignore
import bulmaAccordion from 'bulma-accordion/dist/js/bulma-accordion';
import 'bulma-accordion/dist/css/bulma-accordion.min.css';
import { FileFull as SonergiaFile } from '../../store/reducer/entities/types';

import Accordion from '../Accordion';

interface Props {
  valeur?: Array<SonergiaFile>;
}

class Collapsed extends Component<Props> {
  accordion = []

  componentDidMount() {
    this.accordion = bulmaAccordion.attach();
  }

  render() {
    const { valeur } = this.props;

    if (!valeur) return null

    return (
      <div>
        <section className="accordions">
          {valeur.map((value, index) => (
            <Accordion valeur={value} key={value.id_file} numero={index} />
          ))}
        </section>
      </div>
    );
  }
}

export default Collapsed;
