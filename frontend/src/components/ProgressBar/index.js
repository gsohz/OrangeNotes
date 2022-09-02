import { useState } from "react";
import "./style.css";

function ProgressBar({ done }) {
  const [style, setStyle] = useState();

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${done}%`,
    };

    setStyle(newStyle);
  }, 200);

  return (
    <div className="bar">
      <div className="progress">
        <div className="progress-done" style={style}></div>
      </div>
      <div className="percentage">
        {done === 100 ? "Concluído" : done + "%"}
      </div>
    </div>
  );
}

export default ProgressBar;
