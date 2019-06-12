import React from 'react';
import './Comments.css';

interface Props {
  commentsOpened: boolean;
}

const Comments = ({ commentsOpened }: Props) => (
  <div
    style={{ transform: `translate(${commentsOpened ? 0 : '350px'})` }}
    className="Comments-Container"
  >
    <div style={{ padding: 10 }}>
      <p>Comments here</p>
    </div>
  </div>
);

export default Comments;
