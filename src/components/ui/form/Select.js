import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import utils from "../../../utils/utils";
import { isObject } from "../../../utils/validators";
import classes from "./Select.module.css";

let initSelectedOption = {
  value: null,
  name: "Select an option",
};

const Select = (props) => {
  const {
    label,
    className,
    options,
    propertyDisplay,
    propertyValue,
    value,
    onChange,
    error,
  } = props;

  const { isLightMode } = useSelector((state) => state.ui);
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "label",
    "select-selected",
    "select-items"
  );
  const containerClasses = `${classes["container"]} ${className}`;
  const { hasError, message: errorMessage } = error;
  let mappedOptions = [];
  let optionsAreObjects = false;

  if (options.length !== 0) {
    optionsAreObjects = isObject(options[0]);

    mappedOptions = options.map((option) => {
      return {
        value: optionsAreObjects ? option[propertyValue] : option,
        name: optionsAreObjects ? option[propertyDisplay] : option,
        class: optionsAreObjects
          ? option[propertyValue] === value
            ? classes["same-as-selected"]
            : ""
          : option === value
          ? classes["same-as-selected"]
          : "",
      };
    });
  }

  const [showItems, setShowItems] = useState(false);
  const [selectOptions, setSelectOptions] = useState(mappedOptions);
  const [selectedOption, setSelectedOption] = useState(initSelectedOption);
  const [optionWasSelected, setOptionWasSelected] = useState(false);
  const { value: selectedValue } = selectedOption;

  useEffect(() => {
    if (showItems && optionWasSelected) {
      setShowItems(false);
      setOptionWasSelected(false);
      if (onChange) {
        onChange(selectedValue);
      }
    }
  }, [
    showItems,
    setShowItems,
    onChange,
    selectOptions,
    selectedValue,
    optionWasSelected,
  ]);

  useEffect(() => {
    //Value receive from props to be used as initial value
    if (value) {
      const foundOption = selectOptions.find(
        (option) => option.value === value
      );

      if (foundOption) {
        const updatedOption = { ...foundOption };
        setSelectedOption(updatedOption);
      }
    } else {
      setSelectedOption(initSelectedOption);
    }
  }, [value, selectOptions, setSelectedOption]);

  const toggleSelectHandler = () => {
    setShowItems((prevState) => !prevState);
  };

  const selectOptionHandler = (option) => {
    const optionIndex = selectOptions.findIndex(
      (opt) => opt.value === option.value
    );
    const updatedOption = { ...option };
    let updatedOptions = [...selectOptions];
    updatedOptions = updatedOptions.map((option) => {
      return { ...option, class: "" };
    });

    updatedOption.class = classes["same-as-selected"];
    updatedOptions[optionIndex] = updatedOption;

    setSelectedOption(updatedOption);
    setSelectOptions(updatedOptions);
    setOptionWasSelected(true);
    setShowItems(false);
  };

  const hideItemsHandler = () => {
    setShowItems(false);
    if (props.onBlur) {
      props.onBlur();
    }
  };

  return (
    <div className={containerClasses}>
      <label className={allClasses["label"]}>{label}</label>
      <div
        tabIndex={0}
        className={classes["select"]}
        onClick={toggleSelectHandler}
        onBlur={hideItemsHandler}
      >
        <div className={allClasses["select-selected"]}>
          {selectedOption.name}
        </div>
        {showItems && options.length > 0 && (
          <div className={allClasses["select-items"]}>
            {selectOptions.map((option) => (
              <div
                key={option.value}
                className={option.class}
                onClick={selectOptionHandler.bind(this, option)}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
      {hasError && <p className={classes["error"]}>{errorMessage}</p>}
    </div>
  );
};

export default Select;
