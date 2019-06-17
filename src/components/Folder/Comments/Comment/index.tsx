import React from 'react';

import { CommentFull } from '../../../../store/reducer/entities/types'

import './Comment.css';

interface Props {
  comment: CommentFull
}

const Comment = ({ comment }: Props) => (
  <div className="Comment-Container">
    <div className="Comment-Content">
      <div className="Comment-Header">
        <h3 className="Comment-Username">{comment.user.nom} {comment.user.prenom}</h3>
        <h4 className="Comment-Date">{comment.date_log}</h4>
      </div>
      <p className="Comment-Message">{comment.message}.</p>
    </div>
  </div>
);

export default Comment;
