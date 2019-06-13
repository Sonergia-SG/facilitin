import React from 'react';
import './CommentBox.css';

const CommentBox = () => (
  <div className="Comment-Box-Container">
    <textarea rows={3} placeholder="Ajouter un commentaire" className="textarea has-fixed-size" />
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
