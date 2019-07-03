import React, { useState } from 'react';

import './Footer.css';
import logo from '../../images/lono_sonergia_inline_BS.png';

const Footer = () => {
  const [open, setOpen] = useState(false);

  const icon = open ? 'down' : 'up';

  return (
    <div>
      <div className="Footer-hacked-space" />
      <div className="Footer-fixed">
        <div className="Footer-selector">
          <button
            className="button is-small"
            type="button"
            tabIndex={0}
            onClick={() => setOpen(!open)}
            onKeyPress={() => setOpen(!open)}
          >
            <span className={`icon is-small Footer-selector-icon Footer-${icon}`}>
              <i className="fas fa-chevron-up" />
            </span>
          </button>
        </div>
        <div className="Footer-container">
          <div className="Footer-always-visible">
            <img src={logo} alt="Sonergia logo" style={{ height: 40 }} />
            <p>
              {"Simplifie vos économies d'énergie & Donne de l'avenir à vos projets"}
            </p>
            <button className="button is-small is-outline" type="button">
              Déclarer un bug
            </button>
          </div>
          {open && (
            <div className="Footer-usefull-links">
              Des liens utiles bientôt disponible ici
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
