import clsx from "clsx";
import { ButtonProps } from "./button.type";
import styles from "./button.module.scss";

export const Button = (props: ButtonProps) => {
  const {
    variant = "primary",
    icon,
    className,
    children,
    ...restProps
  } = props;

  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        { [styles.icon]: !!icon },
        className
      )}
      {...restProps}
    >
      {!!icon && icon}
      {children}
    </button>
  );
};
