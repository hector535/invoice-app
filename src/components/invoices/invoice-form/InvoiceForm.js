import React, { useState, useCallback, Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Input from "../../ui/form/Input";
import useInput from "../../../hooks/use-input";
import useCustomSelect from "../../../hooks/use-custom-select";
import InvoiceID from "../InvoiceID";
import InvoiceItemForm from "./InvoiceItemForm";
import Button from "../../ui/buttons/Button";
import Select from "../../ui/form/Select";
import utils from "../../../utils/utils";
import countries from "../../../utils/countries.json";
import * as validators from "../../../utils/validators";
import InvoiceActionsBar from "../InvoiceActionsBar";
import DatePicker from "../../ui/form/date-picker/DatePicker";
import { SCREEN_SIZE } from "../../../utils/constants";
import classes from "./InvoiceForm.module.css";

const InvoiceForm = (props) => {
  const { isEditing, invoice, onSubmit, onCancel } = props;
  const initialItems = isEditing
    ? invoice.items.map((item) => {
        return {
          id: item.id,
          nameFieldConfig: { value: String(item.name), isValid: true },
          qtyFieldConfig: { value: String(item.quantity), isValid: true },
          priceFieldConfig: { value: String(item.price), isValid: true },
          triggerBlur: false,
        };
      })
    : [];
  const [items, setItems] = useState(initialItems);
  const history = useHistory();
  const viewPortScreenSize = utils.getViewPortScreenSize();
  const { isLightMode } = useSelector((state) => state.ui);
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "title",
    "item-title"
  );

  const {
    value: senderStreet,
    isValueValid: isSenderStreetValid,
    inputFieldHasError: senderStreetFieldHasError,
    errorMessage: senderStreetErrorMessage,
    valueChangeHandler: senderStreetChangeHandler,
    blurHandler: senderStreetBlurHandler,
    resetField: resetSenderStreetField,
  } = useInput(
    isEditing ? invoice.senderAddress.street : "",
    validators.isEmpty,
    validators.isMinLengthInvalid.bind(this, 3),
    validators.isMaxLengthInvalid.bind(this, 50)
  );

  const {
    value: senderCity,
    isValueValid: isSenderCityValid,
    inputFieldHasError: senderCityFieldHasError,
    errorMessage: senderCityErrorMessage,
    valueChangeHandler: senderCityChangeHandler,
    blurHandler: senderCityBlurHandler,
    resetField: resetSenderCityField,
  } = useInput(
    isEditing ? invoice.senderAddress.city : "",
    validators.isEmpty,
    validators.isMinLengthInvalid.bind(this, 3),
    validators.isMaxLengthInvalid.bind(this, 50)
  );

  const {
    value: senderPostCode,
    isValueValid: isSenderPostCodeValid,
    inputFieldHasError: senderPostCodeFieldHasError,
    errorMessage: senderPostCodeErrorMessage,
    valueChangeHandler: senderPostCodeChangeHandler,
    blurHandler: senderPostCodeBlurHandler,
    resetField: resetSenderPostCodeField,
  } = useInput(
    isEditing ? invoice.senderAddress.postCode : "",
    validators.isEmpty,
    validators.isMinLengthInvalid.bind(this, 3),
    validators.isMaxLengthInvalid.bind(this, 50)
  );

  const {
    value: senderCountry,
    isValid: isSenderCountryValid,
    fieldHasError: senderCountryFieldHasError,
    errorMessage: senderCountryErrorMessage,
    onChangeHandler: senderCountryChangeHandler,
    onBlurHandler: senderCountryBlurHandler,
    resetField: resetSenderCountryField,
  } = useCustomSelect(isEditing ? invoice.senderAddress.country : null);

  const {
    value: clientName,
    isValueValid: isClientNameValid,
    inputFieldHasError: clientNameFieldHasError,
    errorMessage: clientNameErrorMessage,
    valueChangeHandler: clientNameChangeHandler,
    blurHandler: clientNameBlurHandler,
    resetField: resetClientNameField,
  } = useInput(
    isEditing ? invoice.clientName : "",
    validators.isEmpty,
    validators.isMinLengthInvalid.bind(this, 3),
    validators.isMaxLengthInvalid.bind(this, 50)
  );

  const {
    value: clientEmail,
    isValueValid: isClientEmailValid,
    inputFieldHasError: clientEmailFieldHasError,
    errorMessage: clientEmailErrorMessage,
    valueChangeHandler: clientEmailChangeHandler,
    blurHandler: clientEmailBlurHandler,
    resetField: resetClientEmailField,
  } = useInput(
    isEditing ? invoice.clientEmail : "",
    validators.isEmpty,
    validators.isMinLengthInvalid.bind(this, 3),
    validators.isEmailInvalid
  );

  const {
    value: clientStreet,
    isValueValid: isClientStreetValid,
    inputFieldHasError: clientStreetFieldHasError,
    errorMessage: clientStreetErrorMessage,
    valueChangeHandler: clientStreetChangeHandler,
    blurHandler: clientStreetBlurHandler,
    resetField: resetClientStreetField,
  } = useInput(
    isEditing ? invoice.clientAddress.street : "",
    validators.isEmpty,
    validators.isMinLengthInvalid.bind(this, 3),
    validators.isMaxLengthInvalid.bind(this, 50)
  );

  const {
    value: clientCity,
    isValueValid: isClientCityValid,
    inputFieldHasError: clientCityFieldHasError,
    errorMessage: clientCityErrorMessage,
    valueChangeHandler: clientCityChangeHandler,
    blurHandler: clientCityBlurHandler,
    resetField: resetClientCityField,
  } = useInput(
    isEditing ? invoice.clientAddress.city : "",
    validators.isEmpty,
    validators.isMinLengthInvalid.bind(this, 3),
    validators.isMaxLengthInvalid.bind(this, 50)
  );

  const {
    value: clientPostCode,
    isValueValid: isClientPostCodeValid,
    inputFieldHasError: clientPostCodeFieldHasError,
    errorMessage: clientPostCodeErrorMessage,
    valueChangeHandler: clientPostCodeChangeHandler,
    blurHandler: clientPostCodeBlurHandler,
    resetField: resetClientPostCodeField,
  } = useInput(
    isEditing ? invoice.clientAddress.postCode : "",
    validators.isEmpty,
    validators.isMinLengthInvalid.bind(this, 3),
    validators.isMaxLengthInvalid.bind(this, 50)
  );

  const {
    value: clientCountry,
    isValid: clientCountryIsValid,
    fieldHasError: clientCountryFieldHasError,
    errorMessage: clientCountryErrorMessage,
    onChangeHandler: clientCountryChangeHandler,
    onBlurHandler: clientCountryBlurHandler,
    resetField: resetClientCountryField,
  } = useCustomSelect(isEditing ? invoice.clientAddress.country : null);

  const {
    value: invoiceDate,
    isValueValid: isInvoiceDateValid,
    inputFieldHasError: invoiceDateFieldHasError,
    errorMessage: invoiceDateErrorMessage,
    valueChangeHandler: invoiceDateChangeHandler,
    blurHandler: invoiceDateBlurHandler,
    resetField: resetInvoiceDateField,
  } = useInput(
    isEditing
      ? utils.toDate(invoice.createdAt).toLocaleDateString("en-us")
      : "",
    validators.isEmpty
  );

  const {
    value: paymentTerms,
    isValid: paymentTermsIsValid,
    fieldHasError: paymentTermsFieldHasError,
    errorMessage: paymentTermsErrorMessage,
    onChangeHandler: paymentTermsChangeHandler,
    onBlurHandler: paymentTermsBlurHandler,
    resetField: resetPaymentTermsField,
  } = useCustomSelect(isEditing ? invoice.paymentTerms : null);

  const {
    value: projectDescription,
    isValueValid: isProjectDescriptionValid,
    inputFieldHasError: projectDescriptionFieldHasError,
    errorMessage: projectDescriptionErrorMessage,
    valueChangeHandler: projectDescriptionChangeHandler,
    blurHandler: projectDescriptionBlurHandler,
    resetField: resetProjectDescriptionField,
  } = useInput(
    isEditing ? invoice.description : "",
    validators.isEmpty,
    validators.isMinLengthInvalid.bind(this, 3),
    validators.isMaxLengthInvalid.bind(this, 50)
  );

  const addNewItemHandler = () => {
    const updatedItems = [...items];

    updatedItems.push({
      id: "item_" + Math.floor(Math.random() * 1000),
      nameFieldConfig: {
        value: "",
        isValid: false,
      },
      qtyFieldConfig: {
        value: "",
        isValid: false,
      },
      priceFieldConfig: {
        value: "",
        isValid: false,
      },
      triggerBlur: false,
    });
    setItems(updatedItems);
  };

  const updateItemProperty = useCallback(
    (id, property, innerProperty, value) => {
      const itemIndex = items.findIndex((item) => item.id === id);
      const updatedItems = [...items];
      const updatedItem = { ...updatedItems[itemIndex] };

      updatedItem[property][innerProperty] = value;
      updatedItem.triggerBlur = false;
      updatedItems[itemIndex] = updatedItem;

      setItems(updatedItems);
    },
    [setItems, items]
  );

  const itemNameChangeHandler = (id, value) => {
    updateItemProperty(id, "nameFieldConfig", "value", value);
  };

  const itemNameBlurHandler = useCallback(
    (id, value) => {
      updateItemProperty(id, "nameFieldConfig", "isValid", value);
    },
    [updateItemProperty]
  );

  const itemQtyChangeHandler = (id, value) => {
    updateItemProperty(id, "qtyFieldConfig", "value", value);
  };

  const itemQtyBlurHandler = useCallback(
    (id, value) => {
      updateItemProperty(id, "qtyFieldConfig", "isValid", value);
    },
    [updateItemProperty]
  );

  const itemPriceChangeHandler = (id, value) => {
    updateItemProperty(id, "priceFieldConfig", "value", value);
  };

  const itemPriceBlurHandler = useCallback(
    (id, value) => {
      updateItemProperty(id, "priceFieldConfig", "isValid", value);
    },
    [updateItemProperty]
  );

  const removeItemHandler = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const submitHandler = (saveAsDraft) => {
    setAllFieldsBlur();

    const itemsMapped = items.map((item) => {
      let obj = {
        id: isEditing
          ? item.id
          : "invoice_item_" + Math.floor(Math.random() * 1000),
        name: item.nameFieldConfig.value,
        quantity: +item.qtyFieldConfig.value,
        price: +item.priceFieldConfig.value,
      };

      obj.total = obj.quantity * obj.price;
      return obj;
    });

    const onlyTotalValues = itemsMapped.map((item) => item.total);
    let totalSum = 0;

    if (onlyTotalValues.length > 0) {
      totalSum = onlyTotalValues.reduce((start, next) => {
        return start + next;
      });
    }

    const formObj = {
      id: isEditing ? invoice.id : utils.generateInvoiceId(),
      // createdAt: utils.getDate(new Date()),
      description: projectDescription,
      paymentTerms: paymentTerms,
      clientName: clientName,
      clientEmail: clientEmail,
      status: saveAsDraft ? "draft" : "pending",
      senderAddress: {
        street: senderStreet,
        city: senderCity,
        postCode: senderPostCode,
        country: senderCountry,
      },
      clientAddress: {
        street: clientStreet,
        city: clientCity,
        postCode: clientPostCode,
        country: clientCountry,
      },
      items: itemsMapped,
      total: totalSum,
    };

    if (saveAsDraft) {
      formObj.createdAt = utils.getDate(new Date());
      formObj.paymentDue = utils.getDate(new Date());

      if (invoiceDate) {
        const invoiceDateFormat = new Date(invoiceDate);
        formObj.createdAt = utils.getDate(invoiceDateFormat);
        formObj.paymentDue = utils.getDate(
          new Date(
            invoiceDateFormat.getFullYear(),
            invoiceDateFormat.getMonth(),
            invoiceDateFormat.getDate() + +paymentTerms
          )
        );
      }

      if (onSubmit) {
        onSubmit(formObj);
      }

      clearAllFields();
      return;
    }

    if (
      !isSenderStreetValid ||
      !isSenderCityValid ||
      !isSenderPostCodeValid ||
      !isSenderCountryValid ||
      !isClientNameValid ||
      !isClientEmailValid ||
      !isClientStreetValid ||
      !isClientCityValid ||
      !isClientPostCodeValid ||
      !clientCountryIsValid ||
      !isInvoiceDateValid ||
      !paymentTermsIsValid ||
      !isProjectDescriptionValid
    ) {
      console.log("Uno de los campos es invalido");
      return;
    }

    if (items.length === 0) {
      console.log("Debe de agregarse al menos un item");
      return;
    }

    const someItemHasError = items.some(
      (item) =>
        !item.nameFieldConfig.isValid ||
        !item.qtyFieldConfig.isValid ||
        !item.priceFieldConfig.isValid
    );

    if (someItemHasError) {
      console.log("Uno de los campos de los items es invalido");
      return;
    }

    const invoiceDateFormat = new Date(invoiceDate);
    formObj.createdAt = utils.getDate(invoiceDateFormat);
    formObj.paymentDue = utils.getDate(
      new Date(
        invoiceDateFormat.getFullYear(),
        invoiceDateFormat.getMonth(),
        invoiceDateFormat.getDate() + +paymentTerms
      )
    );

    if (onSubmit) {
      onSubmit(formObj);
    }

    clearAllFields();
  };

  const setAllFieldsBlur = () => {
    senderStreetBlurHandler();
    senderCityBlurHandler();
    senderPostCodeBlurHandler();
    senderCountryBlurHandler();
    clientNameBlurHandler();
    clientEmailBlurHandler();
    clientStreetBlurHandler();
    clientCityBlurHandler();
    clientPostCodeBlurHandler();
    clientCountryBlurHandler();
    invoiceDateBlurHandler();
    paymentTermsBlurHandler();
    projectDescriptionBlurHandler();

    const updatedItems = items.map((item) => {
      return { ...item, triggerBlur: true };
    });
    setItems(updatedItems);
  };

  const clearAllFields = () => {
    resetSenderStreetField();
    resetSenderCityField();
    resetSenderPostCodeField();
    resetSenderCountryField();
    resetClientNameField();
    resetClientEmailField();
    resetClientStreetField();
    resetClientCityField();
    resetClientPostCodeField();
    resetClientCountryField();
    resetInvoiceDateField();
    resetPaymentTermsField();
    resetProjectDescriptionField();
    setItems([]);
  };

  const discardHandler = () => {
    clearAllFields();
  };

  const cancelHandler = () => {
    if (
      viewPortScreenSize === SCREEN_SIZE.MEDIUM ||
      viewPortScreenSize === SCREEN_SIZE.LARGE
    ) {
      if (onCancel) {
        onCancel();
      }
    } else {
      history.goBack();
    }
  };

  return (
    <form className={classes["invoice-form"]} autoComplete="off">
      <h1 className={allClasses["title"]}>
        {isEditing ? (
          <Fragment>
            Edit <InvoiceID id={invoice.id} />
          </Fragment>
        ) : (
          "New Invoice"
        )}
      </h1>

      <h3>Bill From</h3>

      <Input
        label="Street Address"
        className={classes["bill-street"]}
        input={{
          id: "street",
          type: "input",
          value: senderStreet,
          onChange: senderStreetChangeHandler,
          onBlur: senderStreetBlurHandler,
        }}
        error={{
          hasError: senderStreetFieldHasError,
          message: senderStreetErrorMessage,
        }}
      />

      <Input
        label="City"
        className={classes["bill-city"]}
        input={{
          id: "city",
          type: "input",
          value: senderCity,
          onChange: senderCityChangeHandler,
          onBlur: senderCityBlurHandler,
        }}
        error={{
          hasError: senderCityFieldHasError,
          message: senderCityErrorMessage,
        }}
      />

      <Input
        label="Post Code"
        className={classes["bill-post-code"]}
        input={{
          id: "post-code",
          type: "input",
          value: senderPostCode,
          onChange: senderPostCodeChangeHandler,
          onBlur: senderPostCodeBlurHandler,
        }}
        error={{
          hasError: senderPostCodeFieldHasError,
          message: senderPostCodeErrorMessage,
        }}
      />

      <Select
        label="Country"
        className={classes["bill-country"]}
        options={countries}
        propertyDisplay="name"
        propertyValue="name"
        value={senderCountry}
        onChange={senderCountryChangeHandler}
        onBlur={senderCountryBlurHandler}
        error={{
          hasError: senderCountryFieldHasError,
          message: senderCountryErrorMessage,
        }}
      ></Select>

      <h3>Bill to</h3>

      <Input
        label="Client's Name"
        className={classes["client-name"]}
        input={{
          id: "client-name",
          type: "input",
          value: clientName,
          onChange: clientNameChangeHandler,
          onBlur: clientNameBlurHandler,
        }}
        error={{
          hasError: clientNameFieldHasError,
          message: clientNameErrorMessage,
        }}
      />

      <Input
        label="Client's Email"
        className={classes["client-email"]}
        input={{
          id: "client-email",
          type: "input",
          value: clientEmail,
          onChange: clientEmailChangeHandler,
          onBlur: clientEmailBlurHandler,
        }}
        error={{
          hasError: clientEmailFieldHasError,
          message: clientEmailErrorMessage,
        }}
      />

      <Input
        label="Street Address"
        className={classes["client-street"]}
        input={{
          id: "client-address",
          type: "input",
          value: clientStreet,
          onChange: clientStreetChangeHandler,
          onBlur: clientStreetBlurHandler,
        }}
        error={{
          hasError: clientStreetFieldHasError,
          message: clientStreetErrorMessage,
        }}
      />

      <Input
        label="City"
        className={classes["client-city"]}
        input={{
          id: "client-city",
          type: "input",
          value: clientCity,
          onChange: clientCityChangeHandler,
          onBlur: clientCityBlurHandler,
        }}
        error={{
          hasError: clientCityFieldHasError,
          message: clientCityErrorMessage,
        }}
      />

      <Input
        label="Post Code"
        className={classes["client-post-code"]}
        input={{
          id: "client-post-code",
          type: "input",
          value: clientPostCode,
          onChange: clientPostCodeChangeHandler,
          onBlur: clientPostCodeBlurHandler,
        }}
        error={{
          hasError: clientPostCodeFieldHasError,
          message: clientPostCodeErrorMessage,
        }}
      />

      <Select
        label="Country"
        className={classes["client-country"]}
        options={countries}
        propertyDisplay="name"
        propertyValue="name"
        value={clientCountry}
        onChange={clientCountryChangeHandler}
        onBlur={clientCountryBlurHandler}
        error={{
          hasError: clientCountryFieldHasError,
          message: clientCountryErrorMessage,
        }}
      ></Select>

      <DatePicker
        label="Invoice Date"
        className={classes["invoice-date"]}
        value={invoiceDate}
        onChange={invoiceDateChangeHandler}
        onBlur={invoiceDateBlurHandler}
        error={{
          hasError: invoiceDateFieldHasError,
          message: invoiceDateErrorMessage,
        }}
      />

      <Select
        label="Payment Terms"
        className={classes["payment-terms"]}
        options={[
          { value: 0, name: "Select an option" },
          { value: 1, name: "Net 1 Day" },
          { value: 7, name: "Net 7 Days" },
          { value: 14, name: "Net 14 Days" },
          { value: 30, name: "Net 30 Days" },
        ]}
        propertyDisplay="name"
        propertyValue="value"
        value={paymentTerms}
        onChange={paymentTermsChangeHandler}
        onBlur={paymentTermsBlurHandler}
        error={{
          hasError: paymentTermsFieldHasError,
          message: paymentTermsErrorMessage,
        }}
      ></Select>

      <Input
        label="Project / Description"
        className={classes["project-description"]}
        input={{
          id: "project-description",
          type: "input",
          value: projectDescription,
          onChange: projectDescriptionChangeHandler,
          onBlur: projectDescriptionBlurHandler,
        }}
        error={{
          hasError: projectDescriptionFieldHasError,
          message: projectDescriptionErrorMessage,
        }}
      />
      <h2 className={allClasses["item-title"]}>Item List</h2>

      {items.map((item) => (
        <InvoiceItemForm
          key={item.id}
          isEditing={isEditing}
          id={item.id}
          name={item.nameFieldConfig.value}
          quantity={item.qtyFieldConfig.value}
          price={item.priceFieldConfig.value}
          triggerBlur={item.triggerBlur}
          onNameChange={itemNameChangeHandler}
          onNameBlur={itemNameBlurHandler}
          onQtyChange={itemQtyChangeHandler}
          onQtyBlur={itemQtyBlurHandler}
          onPriceChange={itemPriceChangeHandler}
          onPriceBlur={itemPriceBlurHandler}
          onDelete={removeItemHandler}
        />
      ))}

      <Button
        label="+ Add New Item"
        color={isLightMode ? "light-gray" : "dark-blue"}
        className={classes["col-span"]}
        onClick={addNewItemHandler}
      />

      <InvoiceActionsBar className={classes["actions"]}>
        {isEditing && (
          <Button label="Cancel" color="dark-blue" onClick={cancelHandler} />
        )}
        {!isEditing && (
          <Button
            label="Discard"
            color={isLightMode ? "light-gray" : "dark-blue"}
            onClick={discardHandler}
            className={classes["discard"]}
          />
        )}
        {!isEditing && (
          <Button
            label="Save as Draft"
            color="dark-gray"
            onClick={submitHandler.bind(this, true)}
          />
        )}
        <Button
          label="Save Changes"
          color="violet"
          onClick={submitHandler.bind(this, false)}
        />
      </InvoiceActionsBar>
    </form>
  );
};

export default InvoiceForm;
