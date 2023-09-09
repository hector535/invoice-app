import { IconButtonProps } from "./icon-button.type";
import styles from "./icon-button.module.scss";

export const IconButton = (props: IconButtonProps) => {
  const { icon, ...restProps } = props;

  return (
    <button className={styles.icon_button} {...restProps}>
      {icon}
    </button>
  );
};
