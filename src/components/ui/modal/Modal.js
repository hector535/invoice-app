import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";
import Backdrop from "../Backdrop";
import utils from "../../../utils/utils";
import classes from "./Modal.module.css";

const Modal = (props) => {
  const className = props.className;
  return <div className={className["container"]}>{props.children}</div>;
};

const rootOverlays = document.getElementById("overlays");

const ModalOverlay = (props) => {
  const { isLightMode } = useSelector((state) => state.ui);
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "container"
  );
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, rootOverlays)}
      {ReactDOM.createPortal(
        <Modal className={allClasses}>{props.children}</Modal>,
        rootOverlays
      )}
    </Fragment>
  );
};

export default ModalOverlay;
