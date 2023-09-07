import { Link } from "react-router-dom";
import clsx from "clsx";
import { AnchorProps, ButtonProps, ElementProps } from "./button.type";
import styles from "./button.module.scss";

export const Button = (props: ElementProps) => {
  const {
    as = "button",
    variant = "primary",
    icon,
    className,
    children,
  } = props;

  const classes = {
    className: clsx(
      styles.button,
      styles[variant],
      { [styles.icon]: !!icon },
      className
    ),
  };

  const content = (
    <>
      {!!icon && icon}
      {children}
    </>
  );

  if (as === "a") {
    return (
      <Link {...(props as AnchorProps)} {...classes}>
        {content}
      </Link>
    );
  }

  return (
    <button {...(props as ButtonProps)} {...classes}>
      {content}
    </button>
  );
};
