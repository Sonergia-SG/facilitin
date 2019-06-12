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

interface Params {
  folderId: string;
}

interface Props extends RouteComponentProps<Params> {
  fetchFolder: any;
}

interface State {
  commentsOpened: boolean;
}

class Folder extends Component<Props, State> {
  state: Readonly<State> = {
    commentsOpened: true,
  };

  componentWillMount() {
    this.props.fetchFolder(parseInt(this.props.match.params.folderId, 0));
  }

  toggleComments = () => {
    const { commentsOpened } = this.state;

    this.setState({ commentsOpened: !commentsOpened });
  };

  render() {
    const { commentsOpened } = this.state;
    return (
      <Container toggleComments={this.toggleComments}>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <Edit />
          </div>
          <Comments commentsOpened={commentsOpened} />
        </div>
      </Container>
    );
  }
}

export default connect(
  null,
  { fetchFolder },
)(Folder);
