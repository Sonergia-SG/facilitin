/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import idx from 'idx';

import Container from './Container';
import Edit from './Edit';
import Comments from './Comments';

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
  state: State = {
    commentsOpened: false,
    selectedAccordion: 0,
  };

  componentWillMount() {
    const { fetchFolder: fetch, match } = this.props;
    fetch(parseInt(match.params.folderId, 0));
  }

  handleAccordionClick = (index: number) => () => {
    const { selectedAccordion } = this.state;
    if (selectedAccordion === index) {
      this.setState({ selectedAccordion: undefined });
    } else {
      this.setState({ selectedAccordion: index });

      setTimeout(() => {
        const el = document.querySelector(`.divAccordion:nth-child(${index + 1})`);

        if (el) {
          el.scrollIntoView({
            behavior: 'auto',
          });
        }
      }, 250);
    }
  };

  toggleComments = () => {
    const { commentsOpened } = this.state;

    this.setState({ commentsOpened: !commentsOpened });
  };

  render() {
    const { match, entities, location } = this.props;
    const { commentsOpened, selectedAccordion } = this.state;
    const folderId = parseInt(match.params.folderId, 10);
    const action = entities.operations[folderId];

    const lockedStatus = [2, 3, 8, 10, 15, 16, 17, 18];
    // ! during dev process we can use this option to unlock action
    const locked = location.search.includes('unlock')
      ? false
      : !!idx(action, _ => lockedStatus.includes(_.statut.code_statut));

    return (
      <Container
        commentsOpened={commentsOpened}
        toggleComments={this.toggleComments}
        folderId={folderId}
      >
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ width: 'calc(100% - 12px)' }}>
            <Edit
              selectedAccordion={selectedAccordion}
              handleAccordionClick={this.handleAccordionClick}
              locked={locked}
            />
          </div>
          {action && (
            <Comments
              action={action}
              commentsOpened={commentsOpened}
              toggleComments={this.toggleComments}
            />
          )}
        </div>
      </Container>
    );
  }
}

export default connect(
  (s: AppState) => ({ entities: s.entities }),
  { fetchFolder },
)(Folder);
