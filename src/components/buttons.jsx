import React from "react";

const Button = ({ label, type, handleOnClick, qaClass }) => (
  <button className={qaClass} type={type} onClick={handleOnClick}>
    {label}
  </button>
);

export default Button;