import numeral from "numeral";

const dollarFilter = function(value) {
  if (!value) {
    return "$ 0";
  } else {
    return numeral(value).format("($ 0.00a)");
  }
};
const percentFilter = function(value) {
  if (value) {
    return `${Number(value).toFixed(2)}%`;
  } else {
    return "0%";
  }
};

export { dollarFilter, percentFilter };
