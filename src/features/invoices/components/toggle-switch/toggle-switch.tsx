import { useEffect, useState } from "react";
import { Icon } from "@/components/icon/icon";
import { IconButton } from "@/components/icon-button/icon-button";

const currentTheme = (localStorage.getItem("theme") || "light") as
  | "light"
  | "dark";

export const ToggleSwitch = () => {
  const [theme, setTheme] = useState<"light" | "dark">(currentTheme);

  const handleToggle = (theme: "light" | "dark") => {
    setTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      {theme === "dark" ? (
        <IconButton
          icon={<Icon name="sun" />}
          onClick={() => handleToggle("light")}
        />
      ) : (
        <IconButton
          icon={<Icon name="moon" />}
          onClick={() => handleToggle("dark")}
        />
      )}
    </>
  );
};
