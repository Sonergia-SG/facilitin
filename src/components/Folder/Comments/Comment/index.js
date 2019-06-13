import React from 'react';

import './Comment.css';

const Comment = () => (
  <div className="Comment-Container">
    <div className="Comment-Content">
      <div className="Comment-Header">
        <h3 className="Comment-Username">Igor ESCHALIER</h3>
        <h4 className="Comment-Date">05 Mai 2019 - 11h23</h4>
      </div>
      <p className="Comment-Message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at lacinia diam, eu euismod tellus. Quisque at ultricies sem. Nullam eu mollis justo, ac vehicula nulla.</p>
    </div>
  </div>
);

export default Comment;
