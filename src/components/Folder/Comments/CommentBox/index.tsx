import React, { ChangeEvent } from 'react';

import './CommentBox.css';
import { updateNewCommentMessage } from '../../../../store/actions';

interface Props {
  message: string;
  loading: boolean;
  update: typeof updateNewCommentMessage;
  idDpFolder: number;
  post: () => void;
}

const CommentBox = ({
  message, update, idDpFolder, post, loading,
}: Props) => (
  <div className="Comment-Box-Container">
    <textarea
      value={message}
      disabled={loading}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
        update(e.target.value, idDpFolder);
      }}
      rows={3}
      placeholder="Ajouter un commentaire"
      className="textarea has-fixed-size"
    />
    <div className="Comment-Box-SendButton-Container">
      <button
        type="button"
        disabled={loading || !message}
        onClick={post}
        className="button is-small"
      >
        <span>Send</span>
        <span className="icon is-small">
          <i className="fas fa-paper-plane" />
        </span>
      </button>
    </div>
  </div>
);

export default CommentBox;
