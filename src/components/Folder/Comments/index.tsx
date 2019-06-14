import React, { Component } from 'react';
import { connect } from 'react-redux'

import './Comments.css';

import { loadComments } from '../../../store/actions/views/comments'

import CommentBox from './CommentBox';
import Comment from './Comment'
import { Operation } from '../../../store/reducer/entities/types';

interface Props {
  action: Operation;
  commentsOpened: boolean;
  loadComments: any;
}

class Comments extends Component<Props> {
  componentDidMount() {
    const { loadComments, action } = this.props
    loadComments(action.id_dp_operation, action.id_dossierprime);
  }

  render() {
    const { commentsOpened } = this.props;
    return (
      <div className={`Comments-Container Comments-Container_${commentsOpened ? 'Opened' : 'Closed'}`}>
        <div className="Comments-Container-Inner">
          <div className="Comments-List">
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </div>
          <CommentBox />
        </div>
      </div>
    )
  }
}

export default connect(null, { loadComments })(Comments);
