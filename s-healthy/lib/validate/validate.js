import { ERROR_CHECK_LIST_TYPE } from "./listError";

export const Validate = (
  type = "email",
  inputValue,
  listError = {},
  password
) => {
  let error = null;
  const reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  for (let key in listError) {
    switch (key) {
      case "required":
        error = !inputValue ? ERROR_CHECK_LIST_TYPE[key] + type : null;
        break;
      case "toUpperCase":
        error =
          inputValue[0] !== inputValue[0].toUpperCase()
            ? ERROR_CHECK_LIST_TYPE[key]
            : null;
        break;
      case "minLength":
        error =
          inputValue.length < +listError[key]
            ? ERROR_CHECK_LIST_TYPE[key] + listError[key] + " kí tự"
            : null;
        break;
      case "maxLength":
        error =
          inputValue.length > +listError[key]
            ? ERROR_CHECK_LIST_TYPE[key] + listError[key] + " kí tự"
            : null;
        break;
      case "regEmail":
        error = !reg.test(inputValue) ? ERROR_CHECK_LIST_TYPE[key] : null;
        break;
      case "checkPw":
        error = inputValue !== password ? ERROR_CHECK_LIST_TYPE[key] : null;
        break;
      case "checkNumber":
        error = !isNaN(parseFloat(inputValue))
          ? null
          : ERROR_CHECK_LIST_TYPE[key];
        break;
      default:
    }

    if (error) {
      break;
    }
  }
  return error;
};
