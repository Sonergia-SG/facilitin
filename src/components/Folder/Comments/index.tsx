import React from 'react';
import './Comments.css';

import CommentBox from './CommentBox';
import Comment from './Comment'

interface Props {
  commentsOpened: boolean;
}

const Comments = ({ commentsOpened }: Props) => (
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
);

export default Comments;
