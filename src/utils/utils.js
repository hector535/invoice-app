import { SCREEN_SIZE } from "./constants";

const toDate = (dateString) => {
  const dateSplitted = dateString.split("-");
  return new Date(dateSplitted[0], dateSplitted[1] - 1, dateSplitted[2]);
};

const getDate = (date) => {
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  return `${date.getFullYear()}-${month}-${day}`;
};

const getBadgeColor = (status) => {
  if (status === "paid") return "green";
  else if (status === "pending") return "orange";
  else return "silver";
};

const contains = (parent, child) => {
  if (!child || !child.parentElement) return false;
  if (parent === child) return true;
  if (parent === child.parentElement) return true;

  return contains(parent, child.parentElement);
};

const getViewPortDimensions = () => {
  const vw = document.documentElement.clientWidth || 0;
  const vh = document.documentElement.clientHeight || 0;

  return {
    width: vw,
    height: vh,
  };
};

const getViewPortScreenSize = () => {
  const dimensions = getViewPortDimensions();

  if (dimensions.width >= 1440) {
    return SCREEN_SIZE.LARGE;
  } else if (dimensions.width >= 768) {
    return SCREEN_SIZE.MEDIUM;
  } else {
    return SCREEN_SIZE.SMALL;
  }
};

const getClassesFromTheme = (isLightMode, wpClassObj, ...classes) => {
  let obj = {};

  for (let i = 0; i < classes.length; i++) {
    const propertyName = isLightMode
      ? classes[i] + "--light"
      : classes[i] + "--dark";
    obj[classes[i]] = wpClassObj[propertyName];
  }
  return obj;
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const generateInvoiceId = () => {
  const firstLetter = String.fromCharCode(getRandomNumber(65, 91));
  const secondLetter = String.fromCharCode(getRandomNumber(65, 91));

  let generatedId = String(Math.floor(Math.random() * 10000));
  if (generatedId.length !== 4) {
    generatedId = new Array(4 - generatedId.length)
      .fill("0")
      .join("")
      .concat(generatedId);
  }

  return firstLetter + secondLetter + generatedId;
};

const utils = {
  toDate,
  getDate,
  getBadgeColor,
  contains,
  getViewPortScreenSize,
  getClassesFromTheme,
  generateInvoiceId,
};

export default utils;
