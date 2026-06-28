import React, { useState } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [bgColor, setBgColor] = useState("");

  const handleProgressBar = (add) => {
    if (add) {
      setProgress((prev) => {
        if (prev === 100) return prev;
        else return prev + 10;
      });
    } else {
      setProgress((prev) => {
        if (prev === 0) return prev;
        else return prev - 10;
      });
    }
    if (progress < 40) setBgColor("red");
    else if (progress >= 40 && progress < 80) setBgColor("orange");
    else setBgColor("green");
  };

  return (
    <div>
      ProgressBar
      <div className="outer">
        <div
          className="inner"
          style={{
            //width: `${progress}%`,
            transform: `translateX(${progress - 100}%)`,
            backgroundColor: `${bgColor}`,
          }}
        >
          {progress}%
        </div>
      </div>
      <button onClick={() => handleProgressBar(false)}>-10%</button>
      <button onClick={() => handleProgressBar(true)}>+10%</button>
    </div>
  );
};

export default ProgressBar;
