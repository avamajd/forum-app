import React, { useState, useEffect } from 'react';
import "./discussions.scss";
import { connect } from "react-redux";
import { getForumDiscussions } from "../actions/discussionActions";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import PostAddIcon from '@material-ui/icons/PostAdd';
import Validator from "./Validator";

const Discussions = (props) => {

  const { match: { params } } = props;

  const [discussionList, setDiscussionList] = useState([]);

  useEffect(() => {
    setDiscussionList(props.discussions);
  }, [props.discussions]);

  //*************************************

  useEffect(() => {
    props.getForumDiscussions(params.forumId);
  }, []);

  //************************************* 

  const handleAddClick = () => {
    props.history.push(`/forum/${params.forumId}/createDiscussion`);
  }

  //************************************* 

  return (
    <div className="discussions">
      <div className="row no-gutters">
        <div className="col-12">
          <div className="add-button">
            <Button
              variant="contained"
              color="primary"
              className="button"
              onClick={handleAddClick}
            >
              <PostAddIcon />
              موضوع جدید
            </Button>
          </div>
        </div>

        {
          !Validator.isEmpty(discussionList) ?
            <div className="row no-gutters discussion-table">
              {discussionList.map((item, index) => (
                !Validator.isEmpty(item) &&

                <div className="col-12" key={index}>
                  <div className="discussion-item" key={index}>
                    <span className="pl-3">{item.title}</span>
                    {/* <DeleteIcon className="delete-icon" onClick={() => handleDelete(item._id)} /> */}
                  </div>

                  {index !== discussionList.length - 1 ? (
                    <Divider className="divider" />
                  ) : null}
                </div>

              ))}
            </div>
            :
            <div className="col-12">
              <div className="no-item">
                در حال حاضر موضوعی در این انجمن وجود ندارد.
              </div>
            </div>
        }
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  discussions: state.discussion.discussions
});

export default connect(mapStateToProps, { getForumDiscussions })(Discussions);
