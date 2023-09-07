import { Link } from "react-router-dom";

export type ButtonProps = {
  as?: "button";
} & React.ComponentPropsWithoutRef<"button">;

export type AnchorProps = {
  as?: "a";
} & React.ComponentProps<typeof Link>;

export type ElementProps = {
  icon?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "tertiary" | "danger";
  children?: React.ReactNode;
} & (ButtonProps | AnchorProps);
