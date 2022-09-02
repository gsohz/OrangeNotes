import React from "react";

import "./style.css";

function Button({ children, secundario, icon, ...props }) {
  return (
    <button
      className={secundario ? "Button_Seundario" : "Button_Primario"}
      {...props}
    >
      {children}
      {icon}
    </button>
  );
}

export default Button;
