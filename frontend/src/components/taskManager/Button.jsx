import clsx from "clsx";
import React from "react";

const Button = ({ icon, className, label, type, onClick = () => {} }) => {
  return (
    <button
      type={type || "button"}
      className={clsx("btn px-3 py-2 border-0", className)}
      onClick={onClick}
    >
      <span>{label}</span>
      {icon && <span className="ms-2">{icon}</span>}
    </button>
  );
};

export default Button;
