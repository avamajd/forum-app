import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { login, register, resetErrors } from "../actions/authActions";
import Validator from "./Validator";
import "./login.scss";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
      // width: 200
    }
  }
}));

const LoginForm = props => {
  const classes = useStyles();

  // login form:
  const [values, setValues] = useState({ email: "", password: "" });
  const [validationMsg, setValidationMsg] = useState({ email: "", password: "" });

  // register form:
  const [regValues, setRegValues] = useState({ regName: "", regEmail: "", regPassword: "" });
  const [regValidationMsg, setRegValidationMsg] = useState({ regName: "", regEmail: "", regPassword: "" });

  //*************************************

  useEffect(() => {
    const { errors, regErrors } = props.auth;

    // for login:
    if (!Validator.isEmpty(errors)) {
      setValidationMsg({ email: errors.email, password: errors.password });
    }

    // for register:    
    if (!Validator.isEmpty(regErrors)) {
      setRegValidationMsg({ regName: regErrors.name, regEmail: regErrors.email, regPassword: regErrors.password });
    }
  }, [props.auth.errors, props.auth.regErrors]);

  //*************************************

  useEffect(() => {
    if (!Validator.isEmpty(props.auth.token)) {
      setValidationMsg({ email: "", password: "" });
      props.history.push("/home");
    }
  }, [props.auth.token]);

  //*************************************

  useEffect(() => {
    setValidationMsg({ email: "", password: "" });
    setRegValidationMsg({ regName: "", regEmail: "", regPassword: "" });
    props.resetErrors()
  }, []);

  //*************************************

  useEffect(() => {

    const { regEmail, regPassword } = regValues;

    if (props.auth.registerSuccess) {
      setValues({ email: regEmail, password: regPassword });
    }
  }, [props.auth.registerSuccess]);

  //*************************************

  const handleChange = e => {
    let { name, value } = e.target;

    if (name === "email") {
      if (Validator.isEmail(value))
        setValidationMsg({ ...validationMsg, email: "" });
      else
        setValidationMsg({ ...validationMsg, email: "لطفاً یک ایمیل معتبر وارد نمایید." });
    }

    setValues({ ...values, [name]: value });
  };

  //*************************************

  const handleBlur = e => {
    let { name, value } = e.target;
    if (name === "email") {
      if (Validator.isEmail(value))
        setValidationMsg({ ...validationMsg, email: "" });
      else
        setValidationMsg({ ...validationMsg, email: "لطفاً یک ایمیل معتبر وارد نمایید." });

    } else if (name === "password") {
      if (!Validator.isShorterThan(value, 6)) {
        setValidationMsg({ ...validationMsg, password: "" });
      }
      else
        setValidationMsg({ ...validationMsg, password: "رمز عبور باید حداقل شامل 6 کاراکتر باشد." });
    }
  };

  //*************************************

  const handleSubmit = e => {
    e.preventDefault();
    setValidationMsg({ email: "", password: "" });

    props.login(values.email, values.password);
  };

  //*************************************

  const regHandleChange = e => {
    let { name, value } = e.target;

    if (name === "regEmail") {
      if (Validator.isEmail(value))
        setRegValidationMsg({ ...regValidationMsg, regEmail: "" });
      else
        setRegValidationMsg({ ...regValidationMsg, regEmail: "لطفاً یک ایمیل معتبر وارد نمایید." });
    }

    setRegValues({ ...regValues, [name]: value });
  };

  //*************************************

  const regHandleBlur = e => {
    let { name, value } = e.target;
    if (name === "regEmail") {
      if (Validator.isEmail(value))
        setRegValidationMsg({ ...regValidationMsg, regEmail: "" });
      else
        setRegValidationMsg({ ...regValidationMsg, regEmail: "لطفاً یک ایمیل معتبر وارد نمایید." });

    } else if (name === "regPassword") {
      if (!Validator.isShorterThan(value, 6)) {
        setRegValidationMsg({ ...regValidationMsg, regPassword: "" });
      }
      else
        setRegValidationMsg({ ...regValidationMsg, regPassword: "رمز عبور باید حداقل شامل 6 کاراکتر باشد." });
    }
  };

  //*************************************

  const regHandleSubmit = e => {
    e.preventDefault();
    setRegValidationMsg({ regName: "", regEmail: "", regPassword: "" });

    props.register(regValues.regName, regValues.regEmail, regValues.regPassword);
  };

  //*************************************

  return (
    <div className="login-form">
      <div className="row no-gutters">
        <div className="col-5">
          <form
            className={classes.root}
            // noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            dir="rtl"
          >
            <div>
              <TextField
                error={validationMsg.email !== ""}
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                label="ایمیل"
                dir="rtl"
              />
              {validationMsg.email !== "" ? (
                <div className="validation-msg">
                  <span>{validationMsg.email}</span>
                </div>
              ) : null}
            </div>

            <div>
              <TextField
                error={validationMsg.password !== ""}
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                label="رمز عبور"
                dir="rtl"
              />
              {validationMsg.password !== "" ? (
                <div className="validation-msg">
                  <span>{validationMsg.password}</span>
                </div>
              ) : null}
            </div>

            <div className="submit-button">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                value="Submit"
                className="login-button"
              >
                ورود
            </Button>
            </div>
          </form>
        </div>

        <div className="col-7">
          <form
            className={classes.root}
            // noValidate
            autoComplete="off"
            onSubmit={regHandleSubmit}
            dir="rtl"
          >
            <div>
              <TextField
                error={!Validator.isEmpty(regValidationMsg.regName)}
                name="regName"
                value={regValues.regName}
                onChange={regHandleChange}
                onBlur={regHandleBlur}
                label="نام"
                dir="rtl"
              />
              {!Validator.isEmpty(regValidationMsg.regName) ? (
                <div className="validation-msg">
                  <span>{regValidationMsg.regName}</span>
                </div>
              ) : null}
            </div>

            <div>
              <TextField
                error={!Validator.isEmpty(regValidationMsg.regEmail)}
                name="regEmail"
                value={regValues.regEmail}
                onChange={regHandleChange}
                onBlur={regHandleBlur}
                label="ایمیل"
                dir="rtl"
              />
              {!Validator.isEmpty(regValidationMsg.regEmail) ? (
                <div className="validation-msg">
                  <span>{regValidationMsg.regEmail}</span>
                </div>
              ) : null}
            </div>

            <div>
              <TextField
                error={!Validator.isEmpty(regValidationMsg.regPassword)}
                name="regPassword"
                type="password"
                value={regValues.regPassword}
                onChange={regHandleChange}
                onBlur={regHandleBlur}
                label="رمز عبور"
                dir="rtl"
              />
              {!Validator.isEmpty(regValidationMsg.regPassword) ? (
                <div className="validation-msg">
                  <span>{regValidationMsg.regPassword}</span>
                </div>
              ) : null}
            </div>

            <div className="submit-button">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                value="Submit"
                className="register-button"
              >
                ثبت نام
            </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login, register, resetErrors })(LoginForm);
