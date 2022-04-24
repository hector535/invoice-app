const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const isObject = (val) => {
  if (val === null) {
    return false;
  }

  return typeof val === "object";
};

export const isEmailInvalid = (data) => [
  !emailRegex.test(data),
  "Invalid email",
];
export const isEmpty = (data) => [data.trim().length === 0, "Can't be empty"];
export const isMinLengthInvalid = (minLength, data) => [
  data.trim().length < minLength,
  `Min length: ${minLength}`,
];
export const isMaxLengthInvalid = (maxLength, data) => [
  data.trim().length > maxLength,
  `Max length: ${maxLength}`,
];

// export const validateTextField = (data) => {
//   const isEmptyResult = isEmpty(data);

//   if (isEmptyResult) {
//     return [false, "Can't be empty"];
//   }

//   const isLengthInvalidResult = isLengthInvalid(data, 3, 50);

//   if (isLengthInvalidResult) {
//     return [false, "Length between 3-50"];
//   }
//   return [true, ""];
// };

// export const validateEmailField = (data) => {
//   const [result, isTextFieldValidMessage] = validateTextField(data);

//   if (!result) {
//     return [false, isTextFieldValidMessage];
//   }

//   const isEmailInvalidResult = isEmailInvalid(data);

//   if (isEmailInvalidResult) {
//     return [false, "Invalid email"];
//   }

//   return [true, ""];
// };

// export const validateQtyField = (val) => {
//   const isValEmpty = isEmpty(val);

//   if (isValEmpty) {
//     return [false, "Can't be empty"];
//   }

//   if (val.length > 3) {
//     return [false, "Max value: 999"];
//   }

//   return [true, ""];
// };

// export const validatePriceField = (val) => {
//   const isValEmpty = isEmpty(val);

//   if (isValEmpty) {
//     return [false, "Can't be empty"];
//   }

//   if (val.length > 9) {
//     return [false, "Max value: 999999999"];
//   }

//   return [true, ""];
// };

export const preventMinus = (event) => {
  const prohibitedSymbols = [
    "Period",
    "NumpadDecimal",
    "Minus",
    "NumpadAdd",
    "NumpadSubtract",
    "Equal",
  ];

  if (prohibitedSymbols.findIndex((symbol) => symbol === event.code) !== -1) {
    event.preventDefault();
  }
};
