import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Comments.css';

import { loadComments } from '../../../store/actions/views/comments';

import Empty from '../Empty';

import CommentBox from './CommentBox';
import Comment from './Comment';
import { Operation, Entities, CommentFull } from '../../../store/reducer/entities/types';
import { AppState } from '../../../store';
import { CommentsByFolders } from '../../../store/reducer/views/comments/types';
import { denormalize } from 'normalizr';
import { comment } from '../../../store/reducer/entities/schema';

interface Props {
  action: Operation;
  commentsOpened: boolean;
  loadComments: any;
  commentState?: CommentsByFolders;
  entities: Entities;
}

class Comments extends Component<Props> {
  componentDidMount() {
    const { loadComments, action } = this.props;
    loadComments(action.id_dp_operation, action.id_dossierprime);
  }

  render() {
    const { commentsOpened, commentState, entities } = this.props;

    const loading = commentState ? commentState.pending.loading : true;

    if (!commentState) {
      return (
        <div
          className={`Comments-Container Comments-Container_${
            commentsOpened ? 'Opened' : 'Closed'
          }`}
        >
          <Empty loading={loading} />
        </div>
      );
    }

    const normalizedComments: Array<CommentFull> = denormalize(commentState.comments, [comment], entities);

    return (
      <div
        className={`Comments-Container Comments-Container_${commentsOpened ? 'Opened' : 'Closed'}`}
      >
        <div className="Comments-Container-Inner">
          <div className="Comments-List">
            {normalizedComments.map(c => (
              <Comment key={c.id_log} comment={c} />
            ))}
          </div>
          <CommentBox />
        </div>
      </div>
    );
  }
}

interface ConnectProps {
  action: Operation;
}

export default connect(
  (s: AppState, { action }: ConnectProps) => ({
    commentState: s.views.comments.byFolders[action.id_dp_operation],
    entities: s.entities,
  }),
  { loadComments },
)(Comments);
