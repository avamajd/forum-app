const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "لطفاً ایمیل خود را وارد نمایید.";
  }

  if (!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)) {
    errors.email = "لطفاً یک ایمیل معتبر را وارد نمایید.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "لطفاً رمز عبور خود را وارد نمایید.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
