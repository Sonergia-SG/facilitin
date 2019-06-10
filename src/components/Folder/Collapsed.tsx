/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
// @ts-ignore
import bulmaAccordion from 'bulma-accordion/dist/js/bulma-accordion';
import 'bulma-accordion/dist/css/bulma-accordion.min.css';
import { FileFull as SonergiaFile } from '../../store/reducer/entities/types';

import Accordion from '../Accordion';
import Loading from '../Loading';

interface Props {
  valeur?: Array<SonergiaFile>;
  loading: boolean;
}

class Collapsed extends Component<Props> {
  accordion = [];

  componentDidMount() {
    this.accordion = bulmaAccordion.attach();
  }

  render() {
    const { valeur, loading } = this.props;

    if (!valeur || valeur.length === 0) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {loading ? <Loading show /> : <h2>Pas de fichier disponible pour ce dossier</h2>}
        </div>
      );
    }

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
