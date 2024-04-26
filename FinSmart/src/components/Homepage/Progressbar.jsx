import React from 'react';
import "../../App.css";

const Progressbar = () => {
  return (
    <div className="container">
      <h1 className="title-text">React Progress Bar</h1>

      <div className="skill-box">
        <span className="title">HTML</span>
        <div className="skill-bar">
          <span className="skill-per html">
            <span className="tooltip">95%</span>
          </span>
        </div>
      </div>
      <div className="skill-box">
        <span className="title">CSS</span>
        <div className="skill-bar">
          <span className="skill-per css">
            <span className="tooltip">80%</span>
          </span>
        </div>
      </div>
      <div className="skill-box">
        <span className="title">JavaScript</span>
        <div className="skill-bar">
          <span className="skill-per javascript">
            <span className="tooltip">60%</span>
          </span>
        </div>
      </div>     
    </div>
  );
}

export default Progressbar;