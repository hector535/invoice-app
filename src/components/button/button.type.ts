export type ButtonProps = {
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"button">;
