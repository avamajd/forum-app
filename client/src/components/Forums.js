import React, { useState, useEffect } from 'react';
import "./forum.scss"
import { connect } from "react-redux";
import { getAllForums, deleteForum } from "../actions/forumActions";
// import { logout } from "../actions/authActions";
import Divider from "@material-ui/core/Divider";
import AddForumModal from "./AddForumModal";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import ForumIcon from '@material-ui/icons/Forum';
import Validator from "./Validator";
import { Link } from "react-router-dom";

const Forums = props => {

  const [open, setOpen] = React.useState(false);
  const [forumList, setForumList] = useState([])

  useEffect(() => {
    setForumList(props.forums);
  }, [props.forums]);

  //*************************************

  useEffect(() => {
    props.getAllForums();
  }, []);

  //*************************************

  useEffect(() => {
    if (props.createSuccess) {
      props.getAllForums();
    }
  }, [props.createSuccess]);

  //*************************************  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    props.deleteForum(id)
  }

  //*************************************

  return (
    <div className="forum">
      <div className="row no-gutters">
        <div className="col-12">
          <div className="add-button">
            <Button
              variant="contained"
              color="primary"
              className="button"
              onClick={handleOpen}
            >
              ایجاد یک انجمن جدید
            </Button>
          </div>
        </div>

        <AddForumModal open={open} handleClose={handleClose}
        // newForumSet={handleNewForumSet}
        />

        {
          !Validator.isEmpty(forumList) ?
            <div className="row no-gutters forum-table">
              {forumList.map((item, index) => (
                !Validator.isEmpty(item) &&

                <div className="col-12" key={index}>
                  <div className="forum-item" key={index}>
                    <Link
                      className="forum-link"
                      to={`/forum/${item._id}`}
                    >
                      <span className="pl-3">{item.title}</span>
                      <ForumIcon />
                    </Link>
                    <DeleteIcon className="delete-icon" onClick={() => handleDelete(item._id)} />
                  </div>

                  {index !== forumList.length - 1 ? (
                    <Divider className="divider" />
                  ) : null}
                </div>

              ))}
            </div>
            :
            <div className="col-12">
              <div className="no-item">
                انجمنی برای نمایش وجود ندارد.
              </div>
            </div>
        }
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  createSuccess: state.forum.createSuccess,
  forums: state.forum.forums
  // token: state.auth.token
});

export default connect(mapStateToProps, { getAllForums, deleteForum })(Forums);
