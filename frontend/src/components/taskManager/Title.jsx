import clsx from "clsx";
import React from "react";

const Title = ({ title, className }) => {
  return (
    <h2 className={clsx("fs-4 fw-semibold text-capitalize", className)}>
      {title}
    </h2>
  );
};

export default Title;
