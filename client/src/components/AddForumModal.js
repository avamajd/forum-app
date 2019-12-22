import React, { useState, useEffect } from 'react';
import Dialog from "@material-ui/core/Dialog";
import Close from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import './add-forum-modal.scss';
import Validator from "./Validator";
import { connect } from "react-redux";
import { createForum } from "../actions/forumActions";

const AddForumModal = (props) => {
  const { handleClose, open } = props;

  const [forumTitle, setForumTitle] = useState("");
  const [errorForum, setErrorForum] = useState("");


  useEffect(() => {
    if (props.createSuccess) {
      onHandleClose()
    }
  }, [props.createSuccess]);

  //*************************************

  useEffect(() => {
    setErrorForum(props.error);
  }, [props.error]);

  //*************************************

  const handleChange = (e) => {
    const { value } = e.target;
    setForumTitle(value)
  }

  //*************************************

  const handleAddForum = () => {
    props.createForum(forumTitle)
  };

  //*************************************

  const onHandleClose = () => {
    setErrorForum("");
    setForumTitle("")

    handleClose && handleClose();
  };

  //*************************************

  return (
    <Dialog
      open={open}
      onClose={onHandleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    //   className="add-forum-dialog-modal"
    >
      <div className="add-forum-modal">
        <div className="add-forum-modal-header">
          <div className="add-forum-modal-header-text">
            <span className="modal-title">ایجاد یک انجمن جدید</span>
            <Close
              onClick={onHandleClose}
              fontSize="small"
              className="modal-close-icon"
            />
          </div>
          <span className="modal-text">عنوان انجمن موردنظر خود را وارد نمایید:</span>

          <TextField
            error={!Validator.isEmpty(errorForum)}
            id="title"
            label="عنوان انجمن"
            name="title"
            value={forumTitle}
            onChange={handleChange}
            // onBlur={handleBlur}
            margin="normal"
            variant="outlined"
            className="col custom-input"
            type="text"
            dir="rtl"
          />
          {/* {validationMsg.email !== "" ? (
            <div className="validation-msg">
              <span>{validationMsg.email}</span>
            </div>
          ) : null} */}

          {
            !Validator.isEmpty(errorForum) ?
              <div className="error-msg">
                {errorForum}
              </div>
              : null
          }

          <div className="buttons">
            <Button
              variant="contained"
              color="secondary"
              onClick={onHandleClose}
              className="cancel-button"
            >
              انصراف
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddForum}
              className="confirm-button"
            >
              ایجاد انجمن
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

const mapStateToProps = state => ({
  createSuccess: state.forum.createSuccess,
  error: state.forum.error
});

export default connect(mapStateToProps, { createForum })(AddForumModal);
