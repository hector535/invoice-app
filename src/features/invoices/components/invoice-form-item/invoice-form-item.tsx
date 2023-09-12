import { Icon, IconButton, TextField } from "@/components";
import { InvoiceFormItemProps } from "./invoice-form-item.types";
import styles from "./invoice-form-item.module.scss";
import { useWatch } from "react-hook-form";
import { currencyFormatter } from "@/lib/intl-number";

export const InvoiceFormItem = (props: InvoiceFormItemProps) => {
  const { index, control, errors, register, remove } = props;

  const items = useWatch({
    control,
    name: "items",
  });

  const total = items[index].quantity * items[index].price || 0;

  return (
    <div className={styles.form_list_item}>
      <TextField
        label="Item Name"
        errorMessage={errors?.items?.[index]?.name?.message}
        {...register(`items.${index}.name`)}
      />
      <TextField
        label="Qty"
        errorMessage={errors?.items?.[index]?.quantity?.message}
        {...register(`items.${index}.quantity`, { valueAsNumber: true })}
      />
      <TextField
        label="Price"
        errorMessage={errors?.items?.[index]?.price?.message}
        {...register(`items.${index}.price`, { valueAsNumber: true })}
      />
      <div className={styles.total_container}>
        <label className={styles.label}>Total</label>
        <span>{currencyFormatter.format(total)}</span>
      </div>

      <IconButton icon={<Icon name="delete" />} onClick={() => remove(index)} />
    </div>
  );
};
