import React from "react";
import classes from "./Badge.module.css";

const Badge = (props) => {
  const { label, color, className } = props;

  const badgeClassName = `${classes["badge"]} ${
    classes["badge--" + color]
  } ${className}`;

  return <span className={badgeClassName}>{label}</span>;
};

export default Badge;
