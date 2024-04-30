import React from "react";

const ProgressBar = ({ titles }) => {
  // Define progress bar width (adjust as needed)
  const progressBarWidth = "80%";

  // Calculate individual bar width
  const barWidth = `${100 / titles.length}%`;

  return (
    <div className="progress-bar-container">
      {titles.map((title, index) => (
        <span
          key={index}
          className="progress-bar-item"
          style={{ width: barWidth }}
        >
          {title}
        </span>
      ))}
    </div>
  );
};

export default ProgressBar;
