import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./home.scss"

const Home = () => {
  return (
    <div className="row">
      <div className="col">
        <div className="home">
          <div className="forum-link">
            <Button
              className="button"
              variant="contained"
              color="primary"
              value="forumLink"
            >
              <Link
                className="link"
                to="/forums"
              >
                تالار گفتمان
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home