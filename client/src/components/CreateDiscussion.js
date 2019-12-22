import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { createDiscussion, resetError } from "../actions/discussionActions";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Validator from "./Validator";
import './create-discussion.scss'

const CreateDiscussionForm = (props) => {

  const { match: { params } } = props;

  const [values, setValues] = useState({ title: "", content: "" });
  const [validationMsg, setValidationMsg] = useState("");

  useEffect(() => {
    if (props.createSuccess) {

      props.history.push(`/forum/${params.forumId}`);
    }
  }, [props.createSuccess]);

  //*************************************  

  useEffect(() => {
    if (!Validator.isEmpty(props.error)) {
      setValidationMsg(props.error);
    }
  }, [props.error]);

  //*************************************

  useEffect(() => {
    setValidationMsg("");
    props.resetError()
  }, []);

  //*************************************

  const handleChange = e => {
    let { name, value } = e.target;
    setValidationMsg("");
    setValues({ ...values, [name]: value });
  };

  //*************************************

  const handleSubmit = e => {
    e.preventDefault();
    setValidationMsg("");

    props.createDiscussion(params.forumId, values.title.trim(), values.content.trim(), props.token);
  };

  //*************************************

  return (
    <div className="create-discussion">
      <div className="row no-gutters">
        <div className="col-4"></div>
        <div className="col-4">
          <form
            className="form"
            // noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            dir="rtl"
          >

            {validationMsg ? (
              <div className="validation-msg">
                <span>{validationMsg}</span>
              </div>
            ) : null}
            <TextField
              error={validationMsg !== ""}
              variant="outlined"
              name="title"
              value={values.title}
              onChange={handleChange}
              // onBlur={handleBlur}                
              // required
              label="عنوان موضوع"
              dir="rtl"
              className="col mb-3"
            />

            <TextField
              variant="outlined"
              name="content"
              value={values.content}
              onChange={handleChange}
              // onBlur={handleBlur}
              // required
              label="پیام شما"
              dir="rtl"
              multiline
              rows={10}
              className="col mb-4"
            />

            <Button
              variant="outlined"
              color="primary"
              type="submit"
              value="Submit"
              className="button"
            >
              ارسال موضوع
            </Button>
          </form>
        </div>
        <div className="col-4"></div>
      </div>

    </div>
  );
}

const mapStateToProps = state => ({
  createSuccess: state.discussion.createSuccess,
  error: state.discussion.error,
  token: state.auth.token,
});

export default connect(mapStateToProps, { createDiscussion, resetError })(CreateDiscussionForm);
