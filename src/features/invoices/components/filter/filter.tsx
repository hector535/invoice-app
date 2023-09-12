import { useEffect, useRef } from "react";
import { Icon } from "@/components/icon/icon";
import { Checkbox } from "@/components/checkbox/checkbox";
import { FilterProps } from "./filter.type";
import styles from "./filter.module.scss";

export const Filter = (props: FilterProps) => {
  const { open, options, onClick, onChange } = props;
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      if (!divRef.current) return;
      if (divRef.current.contains(e.target as Node)) return;

      onClick(false);
    };

    window.addEventListener("click", handler);

    return () => window.removeEventListener("click", handler);
  }, []);

  return (
    <div
      ref={divRef}
      tabIndex={0}
      className={styles.filter}
      onClick={() => onClick(true)}
    >
      <span className={styles.text}></span>
      <Icon name="arrow-down" />

      {open && (
        <div className={styles.options_container}>
          <Checkbox
            label="Draft"
            checked={options.draft}
            onChange={(val) => onChange("draft", val)}
          />
          <Checkbox
            label="Pending"
            checked={options.pending}
            onChange={(val) => onChange("pending", val)}
          />
          <Checkbox
            label="Paid"
            checked={options.paid}
            onChange={(val) => onChange("paid", val)}
          />
        </div>
      )}
    </div>
  );
};