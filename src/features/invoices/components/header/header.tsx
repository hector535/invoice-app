import { ReactComponent as Logo } from "@/assets/logo/logo.svg";
import styles from "./header.module.scss";
import { ToggleSwitch } from "../toggle-switch/toggle-switch";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.company_logo_container}>
        <Logo className={styles.logo} />
      </div>

      <ToggleSwitch />

      <hr className={styles.divider} />

      <img
        className={styles.avatar}
        width={32}
        height={32}
        src="/img/avatar.jpg"
        alt="avatar"
      />
    </header>
  );
};
