function containsOnlyMessageProperty(obj) {
  const keys = Object.keys(obj);
  return keys.length === 1 && keys[0] === "message";
}

function requestValidator(data) {
  const errors = data.errors;
  const message = data.message;

  const result = {};

  for (const key in errors) {
    if (errors.hasOwnProperty(key)) {
      result[key] = errors[key][0];
    }
  }

  if (message && containsOnlyMessageProperty(data)) {
    result["message"] = message;
  }

  return result;
}

const firstToUpper = (inputString) => {
  return inputString && inputString[0].toUpperCase() + inputString.slice(1);
};

export { requestValidator, firstToUpper };
