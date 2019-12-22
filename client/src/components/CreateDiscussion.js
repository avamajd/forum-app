import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { createDiscussion } from "../actions/discussionActions";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Validator from "./Validator";
import './create-discussion.scss'

const CreateDiscussionForm = (props) => {

  const { match: { params } } = props;

  const [values, setValues] = useState({ title: "", content: "" });

  useEffect(() => {
    if (props.createSuccess) {
      console.log("called", props.createSuccess)

      props.history.push(`/forum/${params.forumId}`);
    }
  }, [props.createSuccess]);

  //*************************************  

  const handleChange = e => {
    let { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  //*************************************

  const handleSubmit = e => {
    e.preventDefault();
    // setValidationMsg("");

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

            <TextField
              // error={validationMsg !== ""}
              variant="outlined"
              name="title"
              value={values.title}
              onChange={handleChange}
              // onBlur={handleBlur}                
              // required
              label="عنوان موضوع"
              dir="rtl"
              className="col mt-4 mb-3 "
            />
            {/* 
              {validationMsg ? (
                <div className="validation-msg">
                  <span>{validationMsg}</span>
                </div>
              ) : null} */}

            <TextField
              // error={validationMsg !== ""}
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
              className="col mt-4 mb-3"

            />

            {/* {validationMsg ? (
                <div className="validation-msg">
                  <span>{validationMsg}</span>
                </div>
              ) : null} */}

            <Button
              variant="outlined"
              color="primary"
              type="submit"
              value="Submit"
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
  token: state.auth.token,
});

export default connect(mapStateToProps, { createDiscussion })(CreateDiscussionForm);
