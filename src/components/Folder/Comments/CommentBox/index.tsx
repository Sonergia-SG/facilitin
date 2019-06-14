import React, { ChangeEvent } from 'react';

import './CommentBox.css';
import { updateNewCommentMessage } from '../../../../store/actions';

interface Props {
  message: string;
  update: typeof updateNewCommentMessage;
  idDpFolder: number;
}

const CommentBox = ({ message, update, idDpFolder }: Props) => (
  <div className="Comment-Box-Container">
    <textarea
      value={message}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
        update(e.target.value, idDpFolder)
      }}
      rows={3}
      placeholder="Ajouter un commentaire"
      className="textarea has-fixed-size"
    />
    <div className="Comment-Box-SendButton-Container">
      <a className="button is-small">
        <span>Send</span>
        <span className="icon is-small">
          <i className="fas fa-paper-plane" />
        </span>
      </a>
    </div>
  </div>
);

export default CommentBox;
