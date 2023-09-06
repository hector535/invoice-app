import clsx from "clsx";
import { type TextFieldProps } from "./text-field.type";

export const TextField = (props: TextFieldProps) => {
  const { className, type = "text", ...restProps } = props;

  return (
    <input
      className={clsx("input_field", className)}
      type={type}
      {...restProps}
    />
  );
};
