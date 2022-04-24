import { useSelector, useDispatch } from "react-redux";
import actions from "../../actions";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as SunIcon } from "../../assets/icon-sun.svg";
import { ReactComponent as MoonIcon } from "../../assets/icon-moon.svg";
import Avatar from "../../assets/image-avatar.jpg";
import classes from "./Header.module.css";

const Header = () => {
  const { isLightMode } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const toggleThemeMode = () => {
    if (!isLightMode) {
      document.body.style = "background: #F8F8FB;";
    } else {
      document.body.style = "background: #141625;";
    }

    dispatch(actions.ui.toggleMode());
  };

  return (
    <header className={classes["header"]}>
      <div className={classes["logo-container"]}>
        <Logo className={classes["logo"]} viewBox="0 0 28 26" />
      </div>
      {isLightMode ? (
        <MoonIcon
          viewBox="0 0 20 20"
          className={classes["theme-icon"]}
          onClick={toggleThemeMode}
        />
      ) : (
        <SunIcon
          viewBox="0 0 20 20"
          className={classes["theme-icon"]}
          onClick={toggleThemeMode}
        />
      )}
      <div className={classes["vertical-bar"]}></div>
      <img src={Avatar} className={classes["avatar"]} />
    </header>
  );
};

export default Header;
