import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeftIcon } from "../../../assets/icon-arrow-left.svg";
import utils from "../../../utils/utils";
import classes from "./BackButton.module.css";

const BackButton = (props) => {
  const { isLightMode } = useSelector((state) => state.ui);
  const allClasses = utils.getClassesFromTheme(isLightMode, classes, "btn");
  return (
    <Link to={props.to} className={allClasses["btn"]} onClick={props.onClick}>
      <ArrowLeftIcon viewBox="0 0 7 10" />
      {props.label}
    </Link>
  );
};

export default BackButton;
