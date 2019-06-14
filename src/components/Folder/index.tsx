/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import Container from './Container';
import Edit from './Edit';
import Comments from './Comments'

import { fetchFolder } from '../../store/actions/views/folder';
import { Entities } from '../../store/reducer/entities/types';
import { AppState } from '../../store';

interface Params {
  folderId: string;
}

interface Props extends RouteComponentProps<Params> {
  fetchFolder: any;
  entities: Entities;
}

interface State {
  commentsOpened: boolean;
  selectedAccordion: number | undefined;
}

class Folder extends Component<Props, State> {
  state: Readonly<State> = {
    commentsOpened: true,
    selectedAccordion: 0,
  };

  handleAccordionClick = (index: number) => () => {
    const { selectedAccordion } = this.state;
    if (selectedAccordion === index) {
      this.setState({ selectedAccordion: undefined })
    } else {
      this.setState({ selectedAccordion: index })
    }
  }

  componentWillMount() {
    this.props.fetchFolder(parseInt(this.props.match.params.folderId, 0));
  }

  toggleComments = () => {
    const { commentsOpened } = this.state;

    this.setState({ commentsOpened: !commentsOpened });
  };

  render() {
    const { match, entities } = this.props;
    const { commentsOpened, selectedAccordion } = this.state;
    const folderId = parseInt(match.params.folderId, 10);
    const action = entities.operations[folderId];

    return (
      <Container toggleComments={this.toggleComments}>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <Edit selectedAccordion={selectedAccordion} handleAccordionClick={this.handleAccordionClick} />
          </div>
          <Comments action={action} commentsOpened={commentsOpened} />
        </div>
      </Container>
    );
  }
}

export default connect(
  (s: AppState) => ({ entities: s.entities }),
  { fetchFolder },
)(Folder);
