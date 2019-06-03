import React from 'react';
import PropTypes from 'prop-types';

const Left = ({ data }) => {
  const title = `Dossier N° ${data.id_dossierprime}`;

  return (
    <div className="tile is-vertical is-3">
      <div className="tile">
        <div className="tile is-parent is-vertical">
          <div className="tile is-child notification has-text-centered">
            <p className="title">{title}</p>
            <p className="subtitle">{data.code_operation}</p>
            <div className="content" />
          </div>
          <div className="tile is-child notification ">
            <div className="content">
              {data.documents.map((value, index) => (
                <h4
                  className={`item_menu_gauche ${index === 0 ? 'left-active' : ''}`}
                  key={value.id_file}
                  id={`${index}pp`}
                >
                  {value.type}
                </h4>
              ))}
            </div>
          </div>
          <div className="tile is-child">
            <div className="content has-text-centered">
              <button type="button" className="button is-primary is-outlined is-medium">
                {'Terminer'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Left.propTypes = {
  data: PropTypes.shape({
    code_operation: PropTypes.string.isRequired,
    id_dossierprime: PropTypes.number.isRequired,
    documents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
};

export default Left;
