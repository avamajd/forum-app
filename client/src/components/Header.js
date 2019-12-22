import React, { useEffect } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";
import { Button } from "@material-ui/core";
import './header.scss';
import { withRouter } from "react-router";

const Header = (props) => {

  //************************************* 

  const handleLogout = () => {
    props.logout();
    props.history.push(`/`);
  }

  //*************************************

  return (
    <div className="header">
      <div className="row no-gutters">
        <div className="col-12">

          <div>

            {props.isAuthenticated ?
              <Button
                variant="outlined"
                color="secondary"
                className="button"
                onClick={handleLogout}
              >
                خروج
              </Button>
              : null
            }
          </div>

        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default compose(withRouter, connect(mapStateToProps, { logout }))(Header);

