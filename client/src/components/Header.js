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

          {props.isAuthenticated ?

            <div className="auth-part">
              <span className="p-3">
                {props.name} خوش آمدید
                </span>
              <Button
                variant="outlined"
                color="secondary"
                className="button"
                onClick={handleLogout}
              >
                خروج
              </Button>
            </div>
            : null
          }

        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  name: state.auth.name,
});

export default compose(withRouter, connect(mapStateToProps, { logout }))(Header);

