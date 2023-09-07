import BaseSelect from "react-select";

export type SelectProps<T> = Omit<
  React.ComponentProps<typeof BaseSelect<T>>,
  "onKeyDown" | "styles"
>;
