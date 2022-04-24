import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";
import Backdrop from "../Backdrop";
import utils from "../../../utils/utils";
import classes from "./SideDrawer.module.css";

const SideDrawer = (props) => {
  const className = props.className;
  return <div className={className["container"]}>{props.children}</div>;
};

const root = document.getElementById("overlays");

const SideDrawerOverlay = (props) => {
  const { isLightMode } = useSelector((state) => state.ui);
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "container"
  );
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onBackDropClick} />,
        root
      )}
      {ReactDOM.createPortal(
        <SideDrawer className={allClasses}>{props.children}</SideDrawer>,
        root
      )}
    </Fragment>
  );
};

export default SideDrawerOverlay;
