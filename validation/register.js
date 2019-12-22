const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "لطفاً نام خود را وارد نمایید.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "لطفاً ایمیل خود را وارد نمایید.";
  }

  if (!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)) {
    errors.email = "لطفاً یک ایمیل معتبر را وارد نمایید.";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "رمز عبور باید بین 6 تا 30 کاراکتر باشد.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "لطفاً رمز عبور خود را وارد نمایید.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
