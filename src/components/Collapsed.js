/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
import bulmaAccordion from 'bulma-accordion/dist/js/bulma-accordion.js';
import 'bulma-accordion/dist/css/bulma-accordion.min.css';
import Accordion from './Accordion';

class Collapsed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accordions: [],
      documents: this.props.valeur,
    };
  }

  componentDidMount() {
    this.setState({ accordions: bulmaAccordion.attach() });
  }

  render() {
    let accordion = [];
    accordion = this.state.documents.map((value, index) => <Accordion valeur={value} key={index} numero={index} />);

    return (
      <div>
        <section className="accordions">
          {accordion}
        </section>
      </div>
    );
  }
}

export default Collapsed;
