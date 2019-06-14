import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Comments.css';

import { denormalize } from 'normalizr';
import {
  loadComments,
  updateNewCommentMessage,
  postComment,
} from '../../../store/actions/views/comments';

import Empty from '../Empty';

import CommentBox from './CommentBox';
import Comment from './Comment';
import { Operation, Entities, CommentFull } from '../../../store/reducer/entities/types';
import { AppState } from '../../../store';
import { CommentsByFolders } from '../../../store/reducer/views/comments/types';
import { comment } from '../../../store/reducer/entities/schema';

interface Props {
  action: Operation;
  commentsOpened: boolean;
  loadComments: any;
  postComment: any;
  updateNewCommentMessage: typeof updateNewCommentMessage;
  commentState?: CommentsByFolders;
  entities: Entities;
}

class Comments extends Component<Props> {
  componentDidMount() {
    const { action } = this.props;
    this.props.loadComments(action.id_dp_operation, action.id_dossierprime);
  }

  render() {
    const {
      commentsOpened, commentState, entities, action,
    } = this.props;

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

    const normalizedComments: Array<CommentFull> = denormalize(
      commentState.comments,
      [comment],
      entities,
    );

    return (
      <div
        className={`Comments-Container Comments-Container_${commentsOpened ? 'Opened' : 'Closed'}`}
      >
        <div className="Comments-Container-Inner">
          <div className="Comments-List">
            {normalizedComments.reverse().map(c => (
              <Comment key={c.id_log} comment={c} />
            ))}
          </div>
          <CommentBox
            idDpFolder={action.id_dp_operation}
            update={this.props.updateNewCommentMessage}
            post={() => this.props.postComment(action.id_dp_operation, action.id_dossierprime)}
            message={commentState.pending.newMessage}
            loading={commentState.pending.postLoading}
          />
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
  { loadComments, updateNewCommentMessage, postComment },
)(Comments);
