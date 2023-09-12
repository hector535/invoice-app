import ReactDOM from "react-dom";
import { useEffect } from "react";
import { DrawerProps } from "./drawer.types";
import styles from "./drawer.module.scss";
import clsx from "clsx";

const root = document.getElementById("overlays");

export const Drawer = (props: DrawerProps) => {
  const { open, children, onOutsideClick } = props;

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return ReactDOM.createPortal(
    <>
      <div className={clsx(styles.drawer, { [styles.drawer__open]: open })}>
        {children}
      </div>
      <div
        className={clsx(styles.backdrop, { [styles.backdrop__visible]: open })}
        onClick={onOutsideClick}
      ></div>
    </>,
    root!
  );
};
