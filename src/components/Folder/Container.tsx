import React, { ReactNode, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Container.css';
import { denormalize } from 'normalizr';
import idx from 'idx';
import { AppState } from '../../store';
import { Entities, CommentFull } from '../../store/reducer/entities/types';
import { comment } from '../../store/reducer/entities/schema';
import sortComments from './helpers/sortComments';

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
  const normalizedComments: Array<CommentFull> = denormalize(
    comments,
    [comment],
    entities,
  );
  const sortedComments = sortComments(normalizedComments);
  const lastComment = idx(sortedComments, _ => _[sortedComments.length - 1]);

  const lastMsgUserId = idx(lastComment, _ => _.user.id_user);
  const displayLastMessage = lastMsgUserId === undefined ? false : lastMsgUserId !== userId;
  const [hover, updateHover] = useState(false);

  const scrollView = useRef(null);

  return (
    <div style={{ backgroundColor: '#f1f2f7', padding: '10px 20px' }}>
      <div className="Folder-Header">
        <Link to="/actions">
          <i className="fa fa-chevron-left" />
          {" Retour à la liste d'opérations"}
        </Link>
        <div style={{ position: 'relative' }}>
          <button
            onMouseEnter={() => updateHover(true)}
            onMouseLeave={() => updateHover(false)}
            className="button is-medium Folder-Header-Button-Icon"
            type="button"
            onClick={toggleComments}
            onKeyDown={toggleComments}
          >
            <i style={{ color: '#767676' }} className="far fa-envelope" />
          </button>
          {displayLastMessage && <div className="Folder-Header-NotigBadge" />}
          {!commentsOpened && displayLastMessage && hover && (
            <div className="Folder-Header-MessageOverlay">
              <p>Dernier commentaire</p>
              <div>
                <div>
                  <h2>
                    {idx(lastComment, _ => _.user.nom)}
                    {' '}
                    {idx(lastComment, _ => _.user.prenom)}
                  </h2>
                  <h3>{idx(lastComment, _ => _.date_log)}</h3>
                </div>
                <p>{idx(lastComment, _ => _.message)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        ref={scrollView}
        className="Folder-ScrollView"
        style={{
          height: 'calc(100vh - 130px - 80px - 6px)',
          overflowY: 'auto',
        }}
        onScroll={() => {
          const scollTop = idx(scrollView, (_: any) => _.current.scrollTop);
          const header = document.querySelector('.Folder-Header');

          if (header) {
            if (scollTop > 0) {
              header.classList.add('Folder-Header-border');
            } else {
              header.classList.remove('Folder-Header-border');
            }
          }
        }}
      >
        {children}
      </div>
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
