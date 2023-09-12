import clsx from "clsx";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { TextField, Button, DatePicker, Select } from "@/components";
import { InvoiceFormProps, InvoiceFormSchema } from "./invoice-form.types";
import { schema } from "./invoice-form.schema";
import { dateToString, stringToDate } from "../../utils/date";
import { InvoiceFormItem } from "../invoice-form-item/invoice-form-item";
import { composeForm } from "./invoice-form.utils";
import { paymentOptions } from "../../data";
import { useSaveInvoice } from "../../api";
import styles from "./invoice-form.module.scss";

export const InvoiceForm = (props: InvoiceFormProps) => {
  const { defaultValues, onSave, onCancel } = props;
  const { mutate, isLoading } = useSaveInvoice();

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    reset,
    getValues,
  } = useForm<InvoiceFormSchema>({
    defaultValues: defaultValues ?? { items: [] },
    resolver: zodResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const isEditMode = !!defaultValues;

  const handleCancelOrDiscardClick = () => {
    if (isEditMode) return onCancel?.();

    reset();
  };

  const handleSaveDraftClick = async () => {
    const form = getValues();
    const composedForm = composeForm(form, "draft");

    mutate(composedForm, {
      onSuccess: () => {
        onSave?.();
      },
    });
  };

  const submit = handleSubmit((data) => {
    const composedForm = composeForm(data, "pending");

    mutate(composedForm, {
      onSuccess: () => {
        onSave?.();
      },
    });
  });

  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.main_title}>
          {isEditMode ? "Edit " : "New Invoice"}
          {isEditMode && <span>{defaultValues.id}</span>}
        </h1>

        <form id="main-form" className={styles.form} onSubmit={submit}>
          <section className={styles.bill_from_section}>
            <h2 className={styles.section_title}>Bill From</h2>

            <TextField
              label="Street Address"
              errorMessage={errors.senderAddress?.street?.message}
              {...register("senderAddress.street")}
            />

            <TextField
              label="City"
              errorMessage={errors.senderAddress?.city?.message}
              {...register("senderAddress.city")}
            />

            <TextField
              label="Post Code"
              errorMessage={errors.senderAddress?.postCode?.message}
              {...register("senderAddress.postCode")}
            />

            <TextField
              label="Country"
              errorMessage={errors.senderAddress?.country?.message}
              {...register("senderAddress.country")}
            />
          </section>

          <section className={styles.bill_to_section}>
            <h2 className={styles.section_title}>Bill to</h2>

            <TextField
              label="Client's Name"
              errorMessage={errors.clientName?.message}
              {...register("clientName")}
            />

            <TextField
              label="Client's Email"
              errorMessage={errors.clientEmail?.message}
              {...register("clientEmail")}
            />

            <TextField
              label="Street Address"
              errorMessage={errors.clientAddress?.street?.message}
              {...register("clientAddress.street")}
            />

            <TextField
              label="City"
              errorMessage={errors.clientAddress?.city?.message}
              {...register("clientAddress.city")}
            />

            <TextField
              label="Post Code"
              errorMessage={errors.clientAddress?.postCode?.message}
              {...register("clientAddress.postCode")}
            />

            <TextField
              label="Country"
              errorMessage={errors.clientAddress?.country?.message}
              {...register("clientAddress.country")}
            />
          </section>

          <section className={styles.date_section}>
            <Controller
              control={control}
              name="createdAt"
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  label="Invoice Date"
                  name="createdAt"
                  errorMessage={errors.createdAt?.message}
                  selected={value ? stringToDate(value) : null}
                  onChange={(date) => onChange(dateToString(date as Date))}
                  disabled={isEditMode}
                />
              )}
            />

            <Controller
              control={control}
              name="paymentTerms"
              render={({ field: { value, onChange } }) => (
                <Select
                  label="Payment Terms"
                  name="paymentTerms"
                  aria-label="Payment Terms"
                  errorMessage={errors.paymentTerms?.message}
                  options={paymentOptions}
                  value={paymentOptions.find((o) => o.value === value) || null}
                  onChange={(opt) => onChange(opt?.value)}
                />
              )}
            />

            <TextField
              label="Project Description"
              errorMessage={errors.description?.message}
              {...register("description")}
            />
          </section>

          <section className={styles.item_list_section}>
            <h2>Item List</h2>

            {!!fields.length && (
              <div className={styles.form_list}>
                {fields.map((field, index) => (
                  <InvoiceFormItem
                    key={field.id}
                    index={index}
                    control={control}
                    errors={errors}
                    register={register}
                    remove={remove}
                  />
                ))}
              </div>
            )}

            <Button
              variant="secondary"
              type="button"
              onClick={() =>
                append({ id: uuidv4(), name: "", price: 0, quantity: 1 })
              }
            >
              + Add New Item
            </Button>
          </section>
        </form>
      </div>
      <div
        className={clsx(
          styles.form_actions,
          { [styles.form_actions_new]: !isEditMode },
          { [styles.form_actions_edit]: isEditMode }
        )}
      >
        <Button
          variant="secondary"
          type="button"
          onClick={handleCancelOrDiscardClick}
        >
          {isEditMode ? "Cancel" : "Discard"}
        </Button>
        {!isEditMode && (
          <Button
            type="button"
            variant="tertiary"
            loading={isLoading}
            disabled={isLoading}
            onClick={handleSaveDraftClick}
          >
            Save as Draft
          </Button>
        )}
        <Button form="main-form" loading={isLoading} disabled={isLoading}>
          {isEditMode ? "Save Changes" : "Save & Send"}
        </Button>
      </div>
    </>
  );
};
