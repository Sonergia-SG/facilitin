import React, { ReactNode, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Container.css';
import { denormalize } from 'normalizr';
import idx from 'idx';
import { AppState } from '../../store';
import { Entities, CommentFull } from '../../store/reducer/entities/types';
import { comment } from '../../store/reducer/entities/schema';

interface Props {
  children: ReactNode;
  toggleComments: () => void;
  userId: number | null;
  comments: Array<number> | null;
  entities: Entities;
  commentsOpened: boolean;
}

const Container = ({
  children,
  toggleComments,
  comments,
  entities,
  userId,
  commentsOpened,
}: Props) => {
  const normalizedComments: Array<CommentFull> = denormalize(comments, [comment], entities);
  const lastComment = idx(normalizedComments, _ => _[normalizedComments.length - 1]);

  const lastMsgUserId = idx(lastComment, _ => _.user.id_user);
  const displayLastMessage = lastMsgUserId === undefined ? false : lastMsgUserId !== userId;
  const [hover, updateHover] = useState(false);

  return (
    <div style={{ backgroundColor: '#fff', padding: '10px 20px' }}>
      <div className="Folder-Header">
        <Link to="/actions">{"< Retour à la liste d'opérations"}</Link>
        <div style={{ position: 'relative' }}>
          <button
            onMouseEnter={() => updateHover(true)}
            onMouseLeave={() => updateHover(false)}
            className="button is-medium"
            type="button"
            onClick={toggleComments}
            onKeyDown={toggleComments}
          >
            <span className="icon is-medium">
              <i style={{ color: 'black' }} className="fas fa-envelope" />
            </span>
          </button>
          {displayLastMessage && <div className="Folder-Header-NotigBadge" />}
          {!commentsOpened && displayLastMessage && hover && (
            <p className="Folder-Header-MessageOverlay">{idx(lastComment, _ => _.message)}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

interface ConnectProps {
  folderId: number;
}

export default connect((s: AppState, p: ConnectProps) => ({
  userId: s.user.user ? s.user.user.id_user : null,
  comments: s.views.comments.byFolders[p.folderId]
    ? s.views.comments.byFolders[p.folderId].comments
    : null,
  entities: s.entities,
}))(Container);
