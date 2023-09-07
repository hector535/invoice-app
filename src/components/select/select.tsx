import { useRef } from "react";
import BaseSelect, { SelectInstance } from "react-select";
import { SelectProps } from "./select.type";
import { styles } from "./select.styles";

export function Select<T>(props: SelectProps<T>) {
  const ref = useRef<SelectInstance<T>>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code !== "Enter") return;

    if (!ref.current) return;

    ref.current.onMenuOpen();
  };

  return (
    <BaseSelect
      {...props}
      styles={styles}
      onKeyDown={handleKeyDown}
      ref={ref}
    />
  );
}
