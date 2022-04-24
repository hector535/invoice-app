import React, { useEffect, useCallback } from "react";
import Input from "../../ui/form/Input";
import useInput from "../../../hooks/use-input";
import { ReactComponent as DeleteIcon } from "../../../assets/icon-delete.svg";
import * as validators from "../../../utils/validators";
import classes from "./InvoiceItemForm.module.css";

const InvoiceItemForm = (props) => {
  const {
    id,
    isEditing,
    name,
    quantity,
    price,
    triggerBlur,
    onNameBlur,
    onQtyBlur,
    onPriceBlur,
  } = props;

  const {
    value: enteredName,
    isValueValid: nameIsvalid,
    inputFieldHasError: nameFieldHasError,
    errorMessage: nameErrorMessage,
    valueChangeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
  } = useInput(
    isEditing ? name : "",
    validators.isEmpty,
    validators.isMinLengthInvalid.bind(this, 3),
    validators.isMaxLengthInvalid.bind(this, 50)
  );

  const {
    value: enteredQty,
    isValueValid: qtyIsvalid,
    inputFieldHasError: qtyFieldHasError,
    errorMessage: qtyErrorMessage,
    valueChangeHandler: qtyChangeHandler,
    blurHandler: qtyBlurHandler,
  } = useInput(
    isEditing ? quantity : "",
    validators.isEmpty,
    validators.isMaxLengthInvalid.bind(this, 3)
  );

  const {
    value: enteredPrice,
    isValueValid: priceIsvalid,
    inputFieldHasError: priceFieldHasError,
    errorMessage: priceErrorMessage,
    valueChangeHandler: priceChangeHandler,
    blurHandler: priceBlurHandler,
  } = useInput(
    isEditing ? price : "",
    validators.isEmpty,
    validators.isMaxLengthInvalid.bind(this, 9)
  );

  const itemNameChangeHandler = (id, event) => {
    nameChangeHandler(event);
    props.onNameChange(id, event.target.value);
  };

  const itemNameBlurHandler = useCallback(
    (id, event) => {
      nameBlurHandler();
      onNameBlur(id, nameIsvalid);
    },
    [nameBlurHandler, nameIsvalid, onNameBlur]
  );

  const itemQtyChangeHandler = (id, event) => {
    qtyChangeHandler(event);
    props.onQtyChange(id, event.target.value);
  };

  const itemQtyBlurHandler = useCallback(
    (id, event) => {
      qtyBlurHandler();
      onQtyBlur(id, qtyIsvalid);
    },
    [qtyBlurHandler, onQtyBlur, qtyIsvalid]
  );

  const itemPriceChangeHandler = (id, event) => {
    priceChangeHandler(event);
    props.onPriceChange(id, event.target.value);
  };

  const itemPriceBlurHandler = useCallback(
    (id, event) => {
      priceBlurHandler();
      onPriceBlur(id, priceIsvalid);
    },
    [priceBlurHandler, onPriceBlur, priceIsvalid]
  );

  useEffect(() => {
    if (triggerBlur) {
      itemNameBlurHandler(id, null);
      itemQtyBlurHandler(id, null);
      itemPriceBlurHandler(id, null);
    }
  }, [
    id,
    triggerBlur,
    itemNameBlurHandler,
    itemQtyBlurHandler,
    itemPriceBlurHandler,
  ]);

  return (
    <div className={classes["container"]}>
      <Input
        label="Item Name"
        className={classes["name"]}
        input={{
          id: "name",
          type: "input",
          value: enteredName,
          onChange: itemNameChangeHandler.bind(this, id),
          onBlur: itemNameBlurHandler.bind(this, id),
        }}
        error={{
          hasError: nameFieldHasError,
          message: nameErrorMessage,
        }}
      />

      <Input
        label="Qty."
        className={classes["qty"]}
        input={{
          id: "qty",
          type: "number",
          step: 1,
          min: 1,
          max: 99,
          value: enteredQty,
          onChange: itemQtyChangeHandler.bind(this, id),
          onBlur: itemQtyBlurHandler.bind(this, id),
          onKeyPress: validators.preventMinus,
        }}
        error={{
          hasError: qtyFieldHasError,
          message: qtyErrorMessage,
        }}
      />
      <Input
        label="Price"
        className={classes["price"]}
        input={{
          id: "price",
          type: "number",
          step: 1,
          min: 1,
          max: 99,
          value: enteredPrice,
          onChange: itemPriceChangeHandler.bind(this, id),
          onBlur: itemPriceBlurHandler.bind(this, id),
          onKeyPress: validators.preventMinus,
        }}
        error={{
          hasError: priceFieldHasError,
          message: priceErrorMessage,
        }}
      />
      <div className={classes["label-total-container"]}>
        <label className={classes["item-label"]}>Total</label>
        <p className={classes["item-total"]}>
          {(+enteredQty * +enteredPrice).toFixed(2)}
        </p>
      </div>
      <div className={classes["button-container"]}>
        <button type="button" onClick={props.onDelete.bind(this, id)}>
          <DeleteIcon className={classes["delete-icon"]} />
        </button>
      </div>
    </div>
  );
};

export default InvoiceItemForm;
