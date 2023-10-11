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

export { requestValidator };
