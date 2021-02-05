const { isUndefined, isNaN, isNull } = require("lodash");

function isValEmpty(value) {
  return (
    isUndefined(value) ||
    isNaN(value) ||
    isNull(value) ||
    value === "" ||
    value === "null"
  );
}

exports.omitWithNull = function omitWithNull(object) {
  const result = Object.keys(object).reduce((result, value) => {
    const o = object[value];
    if (!isValEmpty(o) && typeof o === "object" && Object.keys(o).length) {
      result[value] = omitWithNull(o);
    } else if (!isValEmpty(o)) {
      result[value] = o;
    }

    return result;
  }, {});
  return result;
};
